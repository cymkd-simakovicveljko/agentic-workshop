"""Rehearse the documented setup and expected failure without a model call."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import tempfile


COURSE = Path(__file__).resolve().parents[2]
BUILD = Path(__file__).resolve().parent
guide = (COURSE / 'demo/section-04-context-and-handoff.md').read_text()
blocks = re.findall(r'```sh\n(.*?)\n```', guide, re.S)
setup = blocks[0]
result = subprocess.run(['/bin/sh', '-c', setup], cwd=COURSE,
                        text=True, capture_output=True, timeout=30)
assert result.returncode == 0, result.stderr
lab = Path(result.stdout.strip().splitlines()[-1])
assert lab.is_dir() and lab.name.startswith('agentic-course-v0-'), result.stdout
receipt = {'date': '2026-09-12', 'lab': str(lab), 'model_run': False,
           'setup': {'exit': result.returncode, 'output': result.stdout}, 'checks': []}


def run(args):
    check = subprocess.run(args, cwd=lab, text=True, capture_output=True, timeout=30)
    receipt['checks'].append({'command': args, 'exit': check.returncode,
                              'stdout': check.stdout, 'stderr': check.stderr})
    return check


assert run(['git', 'status', '--short']).stdout == ''
receipt['starting_commit'] = run(['git', 'rev-parse', 'HEAD']).stdout.strip()
package = json.loads((lab / 'package.json').read_text())
assert 'test:all' not in package['scripts']
assert package['scripts']['test'] == 'node --test tests/*.test.mjs'
for name, expected in json.loads((lab / 'baseline-hashes.json').read_text()).items():
    assert hashlib.sha256((lab / name).read_bytes()).hexdigest() == expected, name

capture = next(block for block in blocks if 'if npm test >' in block)
captured = run(['/bin/sh', '-c', capture])
assert captured.returncode == 0, captured.stderr
log = (lab / 'notes/test-output.txt').read_text()
test_exit = int((lab / 'notes/test-exit.txt').read_text().strip())
assert test_exit == 1, (test_exit, log)
assert re.search(r'^# pass 9$', log, re.M), log
assert re.search(r'^# fail 2$', log, re.M), log
assert re.search(r'^not ok \d+ - R2: trims surrounding spaces$', log, re.M), log
assert re.search(r'^not ok \d+ - R2: whitespace-only input restores the list$', log, re.M), log
assert run(['git', 'diff', 'HEAD', '--name-only']).stdout == ''
receipt['test_summary'] = {'pass': 9, 'fail': 2, 'exit': test_exit,
                           'meaning': 'Expected prepared whitespace defect, not successful application completion.'}

with tempfile.TemporaryDirectory(prefix='section-04-guard-') as scratch:
    failed = subprocess.run(['/bin/sh', '-c', setup], cwd=scratch,
                            text=True, capture_output=True, timeout=30)
    assert 'Lab preparation stopped.' in failed.stdout
    assert not (Path(scratch) / '.git').exists()
receipt['failed_preparation_creates_no_git'] = True

for name, expected in json.loads((BUILD / 'unchanged-files.json').read_text()).items():
    assert hashlib.sha256((COURSE / name).read_bytes()).hexdigest() == expected, name
receipt['other_sections_and_retained_app_unchanged'] = True
(BUILD / 'validation.json').write_text(json.dumps(receipt, indent=2) + '\n')
print('Documented setup and capture passed; expected application result: 9 passed, 2 failed.')
print('Retained app and other sections unchanged. Receipt:', BUILD / 'validation.json')
