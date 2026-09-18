"""Rehearse the section 1 local setup and prepared solution, without a model call."""
from pathlib import Path
import json
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = Path(__file__).resolve().parent / 'validation.json'
lab = Path(subprocess.check_output(
    ['python3', str(ROOT / '_build/draft-v0/prepare_core_lab.py')], text=True
).strip())
results = {'date': '2026-09-12', 'lab': str(lab), 'checks': []}


def run(args, expected=0):
    process = subprocess.run(args, cwd=lab, capture_output=True, text=True)
    record = {'command': args, 'exit_code': process.returncode,
              'expected_exit_code': expected, 'output': process.stdout + process.stderr}
    results['checks'].append(record)
    OUTPUT.write_text(json.dumps(results, indent=2) + '\n')
    if process.returncode != expected:
        raise RuntimeError(record)
    return record['output']


for command in [['node', '--version'], ['npm', '--version'], ['git', '--version'],
                ['omp', '--version']]:
    run(command)
run(['git', 'init'])
run(['git', 'add', '.'])
run(['git', '-c', 'user.name=Course lab', '-c', 'user.email=course@example.invalid',
     '-c', 'commit.gpgSign=false',
     'commit', '-m', 'Section 1 starter'])
run(['npm', 'run', 'test:baseline'])
run(['npm', 'test'], expected=1)
run(['node', 'scripts/checkpoint.mjs', 'solution'])
run(['npm', 'test'])
run(['git', 'status', '--short'])
run(['git', 'diff', 'HEAD', '--', 'public/filter.mjs'])
run(['git', 'diff', 'HEAD', '--stat'])
assert run(['git', 'diff', 'HEAD', '--name-only']).strip() == 'public/filter.mjs'
run(['git', 'add', 'public/filter.mjs'])
assert run(['git', 'diff', '--', 'public/filter.mjs']).strip() == ''
assert 'trim' in run(['git', 'diff', 'HEAD', '--', 'public/filter.mjs'])
run(['git', 'restore', '--staged', 'public/filter.mjs'])

# Exercise the documented failure path outside the course, with no helper present.
guide = (ROOT / 'demo/section-01-setup.md').read_text()
setup = next(block for block in re.findall(r'```sh\n(.*?)```', guide, re.S)
             if block.startswith('if course_lab='))
with tempfile.TemporaryDirectory(prefix='course-setup-failure-') as scratch:
    process = subprocess.run(['/bin/sh', '-c', setup], cwd=scratch,
                             capture_output=True, text=True)
    assert not (Path(scratch) / '.git').exists()
    assert 'Lab preparation stopped.' in process.stdout
    results['setup_failure_guard'] = {'no_git_created': True,
                                      'reported_preparation_stopped': True}
OUTPUT.write_text(json.dumps(results, indent=2) + '\n')
print(f'Validated local setup and prepared solution in {lab}')
print(f'Receipt: {OUTPUT}')
