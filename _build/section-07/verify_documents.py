"""Check section 7 preparation records and documentation without rerunning app tests."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import hashlib
import json
import re
import subprocess


def main():
    project = Path(__file__).resolve().parents[2]
    build = Path(__file__).resolve().parent
    errors = []
    preserved = json.loads((build / 'unchanged-files.json').read_text())
    for name, expected in preserved.items():
        path = project / name
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            errors.append(f'Preserved file changed: {name}')
    states = json.loads((build / 'prepared-labs.json').read_text())
    manifests = {}
    for name, record in states.items():
        lab = Path(record['lab'])
        hashes = json.loads((lab / 'baseline-hashes.json').read_text())
        manifests[name] = len(hashes)
        for relative, expected in hashes.items():
            path = lab / relative
            if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
                errors.append(f'Lab source changed: {name}/{relative}')
        output = (build / f'{name}-test-output.txt').read_text()
        if record.get('test_exit') != 0 or '# pass 11\n' not in output or '# fail 0\n' not in output:
            errors.append(f'Unexpected stored test result: {name}')
    validation = json.loads((build / 'openspec-validation.json').read_text())
    if validation['summary']['totals'] != {'items': 2, 'passed': 2, 'failed': 0}:
        errors.append('Unexpected OpenSpec validation result')
    documents = [project / n for n in ('README.md', 'OUTLINE.md', 'PROJECT.md',
                 'demo/README.md', '_build/README.md', 'sections/07-optional-flavors.md',
                 'demo/section-07-flavor-lab.md', '_build/section-07/review.md')]
    documents += sorted((project / 'demo/section-07-examples').rglob('*.md'))
    links = 0
    shell_blocks = 0
    words = {}
    for path in documents:
        content = path.read_text()
        words[str(path.relative_to(project))] = len(content.split())
        in_fence = False
        prose = []
        for line in content.splitlines():
            if line.startswith('```'):
                in_fence = not in_fence
            elif not in_fence:
                prose.append(line)
        if in_fence:
            errors.append(f'Unclosed code fence: {path}')
        for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', '\n'.join(prose)):
            parsed = urlsplit(target.strip('<>'))
            if parsed.scheme or not parsed.path:
                continue
            links += 1
            if not (path.parent / unquote(parsed.path)).exists():
                errors.append(f'Broken local link: {path.name}: {target}')
        for block in re.findall(r'```(?:bash|sh)\n(.*?)\n```', content, re.S):
            shell_blocks += 1
            check = subprocess.run(['zsh', '-n'], input=block, text=True, capture_output=True)
            if check.returncode:
                errors.append(f'Shell syntax: {path.name}: {check.stderr.strip()}')
    result = {
        'status': 'passed' if not errors else 'failed',
        'preserved_files': len(preserved), 'prepared_manifest_files': manifests,
        'baseline_tests': {'plain': {'pass': 11, 'fail': 0}, 'openspec': {'pass': 11, 'fail': 0}},
        'openspec_cli_version': '1.13.0', 'openspec_items_valid': 2,
        'markdown_files': len(documents), 'local_links': links,
        'shell_blocks_syntax_checked': shell_blocks, 'word_counts': words,
        'provider_backed_run': False, 'owner_search_implemented': False,
        'errors': errors,
    }
    (build / 'verification.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(errors))


if __name__ == '__main__':
    main()
