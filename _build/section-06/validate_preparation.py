"""Exercise the documented recovery route in a fresh prepared disposable lab.

Usage: python3 _build/section-06/validate_preparation.py /path/to/fresh/lab
This restores only that lab's filter after preserving the documented snapshot.
No OMP/provider/subagent run is performed. Bun parses the example frontmatter.
"""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
from urllib.parse import unquote, urlsplit


COURSE = Path(__file__).resolve().parents[2]
BUILD = Path(__file__).resolve().parent
lab = Path(sys.argv[1]).resolve()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(*args, cwd=COURSE):
    return subprocess.run(args, cwd=cwd, capture_output=True, text=True, check=True).stdout.strip()


# Refuse arbitrary or already-repaired folders before any fixture mutation.
index = json.loads((lab / '.runs/prepared/index.json').read_text())
assert index['current_stage'] == 'attempt-2-copy-and-sort'
assert '# Recovery task — draft v0' in (lab / 'notes/task.md').read_text()
assert not (lab / '.runs/final').exists(), 'Use a fresh lab for a new validation.'
current = json.loads((lab / '.runs/prepared/attempt-2-copy-and-sort/evidence.json').read_text())
for relative, expected in current['sha256'].items():
    assert digest(lab / relative) == expected, f'Prepared state changed: {relative}'
assert run('git', 'rev-parse', 'HEAD', cwd=lab) == current['baseline_commit']
assert run('git', 'diff', '--name-only', cwd=lab) == 'public/filter.mjs'
assert run('git', 'diff', '--cached', '--name-only', cwd=lab) == ''
assert run('git', 'ls-files', '--others', '--exclude-standard', cwd=lab) == 'notes/keep-me.md'
note_hash = digest(lab / 'notes/keep-me.md')
prepared_hashes = {str(p.relative_to(lab)): digest(p)
                   for p in (lab / '.runs/prepared').rglob('*') if p.is_file()}
for relative, expected in json.loads((BUILD / 'unchanged-files.json').read_text()).items():
    assert digest(COURSE / relative) == expected, f'Unintended course edit: {relative}'

agent = COURSE / 'demo/agents/course-contract-auditor.md'
bun = shutil.which('bun')
assert bun, 'Bun is required for the author-side YAML parse.'
parser = '''const s=await Bun.file(process.argv[1]).text();
const m=s.match(/^---\\r?\\n([\\s\\S]*?)\\r?\\n---(?:\\r?\\n|$)/);
if(!m)throw new Error("Missing frontmatter");
console.log(JSON.stringify(Bun.YAML.parse(m[1])));'''
metadata = json.loads(run(bun, '-e', parser, str(agent)))
assert metadata['name'] == agent.stem and metadata['description'].strip()
assert metadata['tools'] == ['read', 'grep', 'glob'] and metadata['spawns'] == []

guide = (COURSE / 'demo/section-06-recovery-lab.md').read_text()
shell_blocks = re.findall(r'^```sh\n(.*?)^```', guide, flags=re.M | re.S)
for block in shell_blocks:
    subprocess.run(['zsh', '-n'], input=block, text=True, capture_output=True, check=True)

# Linked receipt is explicitly incomplete until all checks below succeed.
(BUILD / 'verification.json').write_text('{"status":"validation_in_progress"}\n')
documents = ['sections/06-reliable-execution.md', 'demo/section-06-recovery-lab.md',
             'README.md', 'OUTLINE.md', 'PROJECT.md', 'demo/README.md',
             '_build/README.md', '_build/section-06/review.md']
checked_links = 0
for relative in documents:
    path = COURSE / relative
    source = path.read_text()
    assert len(re.findall(r'^```', source, re.M)) % 2 == 0, f'Unclosed fence: {relative}'
    source = re.sub(r'^```[^\n]*\n.*?^```\s*$', '', source, flags=re.M | re.S)
    for target in re.findall(r'\[[^\]\n]+\]\(([^)\n]+)\)', source):
        parsed = urlsplit(target)
        if parsed.scheme or parsed.netloc:
            continue
        destination = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path
        assert destination.exists(), f'Missing local link in {relative}: {target}'
        if parsed.fragment and destination.suffix == '.md':
            headings = re.findall(r'^#{1,6}\s+(.+?)\s*$', destination.read_text(), re.M)
            anchors = {re.sub(r'[^\w\- ]', '', h.lower()).replace(' ', '-') for h in headings}
            assert unquote(parsed.fragment) in anchors, f'Missing anchor: {target}'
        checked_links += 1


def block_containing(marker):
    matches = [block for block in shell_blocks if marker in block]
    assert len(matches) == 1, f'Ambiguous guide block: {marker}'
    return matches[0]


markers = [
    'mkdir -p .runs/diagnosis',
    'recovery_bundle=$(mktemp',
    'git restore --source HEAD',
    'mkdir -p .runs/final',
    'cmp "$recovery_bundle/notes/keep-me.md"',
]
script = '\n'.join(block_containing(marker) for marker in markers)
execution = subprocess.run(['zsh', '-f'], cwd=lab, input=script, text=True,
                           capture_output=True, check=True)
assert (lab / '.runs/diagnosis/test-exit.txt').read_text().strip() != '0'
assert '# fail 1\n' in (lab / '.runs/diagnosis/test-output.txt').read_text()
assert (lab / '.runs/final/focused-exit.txt').read_text().strip() == '0'
assert (lab / '.runs/final/test-exit.txt').read_text().strip() == '0'
assert '# pass 12\n' in (lab / '.runs/final/test-output.txt').read_text()
assert '# fail 0\n' in (lab / '.runs/final/test-output.txt').read_text()
bundles = list((lab / '.runs').glob('recovery-*'))
assert len(bundles) == 1
bundle = bundles[0]
assert digest(bundle / 'notes/keep-me.md') == digest(lab / 'notes/keep-me.md') == note_hash
assert digest(bundle / 'public/filter.mjs') == current['sha256']['public/filter.mjs']
assert run('git', 'diff', 'HEAD', '--', cwd=lab) == '', 'Tracked state did not recover.'
assert run('git', 'ls-files', '--others', '--exclude-standard', cwd=lab) == 'notes/keep-me.md'
for relative, expected in prepared_hashes.items():
    assert digest(lab / relative) == expected, f'Prepared history altered: {relative}'
run('node', '--check', 'public/filter.mjs', cwd=lab)

validation = BUILD / 'validation'
validation.mkdir(exist_ok=True)
shutil.copytree(lab / '.runs/prepared', validation / 'prepared', dirs_exist_ok=True)
shutil.copytree(lab / '.runs/diagnosis', validation / 'diagnosis', dirs_exist_ok=True)
shutil.copytree(lab / '.runs/final', validation / 'final', dirs_exist_ok=True)
(validation / 'documented-route-output.txt').write_text(execution.stdout + execution.stderr)
(validation / 'preserved-note.md').write_bytes((lab / 'notes/keep-me.md').read_bytes())
record = {
    'status': 'passed', 'checked_at_utc': datetime.now(timezone.utc).isoformat(),
    'lab': str(lab), 'baseline_commit': current['baseline_commit'],
    'prepared_results': index['stages'],
    'documented_diagnosis_capture': '1 failed, nonzero exit retained',
    'documented_snapshot_and_selected_file_restore': 'passed',
    'final_tests': {'passed': 12, 'failed': 0, 'exit_code': 0},
    'untracked_note_preserved': True, 'untracked_note_sha256': note_hash,
    'accepted_tests_data_and_contract_preserved': True,
    'prepared_history_preserved': True, 'other_course_assets_preserved': True,
    'example_frontmatter_parse': 'passed with Bun.YAML.parse',
    'learner_shell_blocks_syntax_checked': len(shell_blocks),
    'local_links_checked': checked_links,
    'node': run('node', '--version'), 'omp': run('omp', '--version'),
    'live_model_run': False, 'live_interrupt_test': False,
    'live_subagent_run': False, 'browser_test': False,
}
(BUILD / 'verification.json').write_text(json.dumps(record, indent=2) + '\n')
print(json.dumps({'result': 'passed', 'local_links_checked': checked_links,
                  'final_tests': record['final_tests'], 'receipt': str(BUILD / 'verification.json')}, indent=2))
