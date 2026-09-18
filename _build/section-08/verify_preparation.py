"""Verify section 8 authored artifacts and recorded local execution results."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import ast
import hashlib
import json
import re
import subprocess


def main():
    build = Path(__file__).resolve().parent
    project = build.parents[1]
    output_path = build / 'verification.json'
    errors = []
    preserved = json.loads((build / 'unchanged-files.json').read_text())
    for name, expected in preserved.items():
        path = project / name
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            errors.append(f'Preserved file changed: {name}')
    stages = json.loads((build / 'prepared-labs.json').read_text())
    expected_results = {'baseline': (3, 0, 0), 'seam': (9, 0, 0),
                        'completed': (15, 0, 0), 'feature_before_implementation': (1, 2, 1)}
    result_summary = {}
    for name, (passed, failed, exit_code) in expected_results.items():
        record = stages[name]
        log_name = 'feature-before-implementation.txt' if name == 'feature_before_implementation' else f'{name}-test-output.txt'
        text = (build / log_name).read_text()
        if (record['test_exit'] != exit_code or f'# pass {passed}\n' not in text
                or f'# fail {failed}\n' not in text or '# skipped 0\n' not in text):
            errors.append(f'Unexpected stored result: {name}')
        lab = Path(record['lab'])
        manifest = json.loads((lab / 'prepared-hashes.json').read_text())
        for relative, expected in manifest.items():
            file = lab / relative
            if not file.is_file() or hashlib.sha256(file.read_bytes()).hexdigest() != expected:
                errors.append(f'Prepared source changed: {name}/{relative}')
        # The expected-red copy intentionally adds the new feature check.
        actual = {str(f.relative_to(lab)): hashlib.sha256(f.read_bytes()).hexdigest()
                  for f in sorted(lab.rglob('*')) if f.is_file() and f.name != 'prepared-hashes.json'}
        (build / f'{name}-source-hashes.json').write_text(json.dumps(actual, indent=2) + '\n')
        result_summary[name] = {'passed': passed, 'failed': failed, 'exit': exit_code}
    documents = [project / name for name in (
        'README.md', 'OUTLINE.md', 'PROJECT.md', 'demo/README.md', '_build/README.md',
        'sections/08-advanced-harness-design-and-enterprise-scale-work.md',
        'demo/section-08-harness-and-enterprise-lab.md',
        'demo/section-08-legacy/README.md', '_build/section-08/review.md')]
    local_links = shell_blocks = 0
    word_counts = {}
    for path in documents:
        text = path.read_text()
        word_counts[str(path.relative_to(project))] = len(text.split())
        prose = []
        in_fence = False
        for line in text.splitlines():
            if line.startswith('```'): in_fence = not in_fence
            elif not in_fence: prose.append(line)
        if in_fence: errors.append(f'Unclosed fence: {path.name}')
        for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', '\n'.join(prose)):
            parsed = urlsplit(target.strip('<>'))
            if parsed.scheme or not parsed.path: continue
            local_links += 1
            resolved = (path.parent / unquote(parsed.path)).resolve()
            if not resolved.exists() and resolved != output_path:
                errors.append(f'Broken local link: {path.name}: {target}')
        for block in re.findall(r'```(?:bash|sh)\n(.*?)\n```', text, re.S):
            shell_blocks += 1
            result = subprocess.run(['zsh', '-n'], input=block, capture_output=True, text=True)
            if result.returncode: errors.append(f'Shell syntax: {path.name}: {result.stderr}')
    javascript = sorted((project / 'demo/section-08-legacy').rglob('*.mjs'))
    for path in javascript:
        result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
        if result.returncode: errors.append(f'JavaScript syntax: {path.name}: {result.stderr}')
    for path in build.glob('*.py'):
        ast.parse(path.read_text())
    summary = {
        'status': 'passed' if not errors else 'failed', 'preserved_files': len(preserved),
        'prepared_results': result_summary, 'markdown_files': len(documents),
        'local_links': local_links, 'shell_blocks_syntax_checked': shell_blocks,
        'javascript_files_syntax_checked': len(javascript), 'word_counts': word_counts,
        'live_omp_run': False, 'harness_controller_implemented': False,
        'enterprise_deployment_tested': False, 'errors': errors,
    }
    output_path.write_text(json.dumps(summary, indent=2) + '\n')
    print(json.dumps(summary, indent=2))
    raise SystemExit(bool(errors))


if __name__ == '__main__':
    main()
