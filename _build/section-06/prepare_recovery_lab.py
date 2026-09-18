"""Prepare a disposable recovery lab with recorded, intentionally failed attempts."""
from contextlib import redirect_stdout
from datetime import datetime, timezone
import hashlib
from io import StringIO
import json
from pathlib import Path
import runpy
import subprocess


COURSE = Path(__file__).resolve().parents[2]


def run(*args, cwd, check=True):
    return subprocess.run(args, cwd=cwd, check=check, capture_output=True, text=True)


def hashes(root, paths):
    return {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(paths) if p.is_file()}


output = StringIO()
with redirect_stdout(output):
    runpy.run_path(str(COURSE / '_build/draft-v0/prepare_core_lab.py'))
lab = Path(output.getvalue().strip())
if not lab.is_dir() or not (lab / 'contract.md').is_file():
    raise RuntimeError('The foundation helper did not produce a valid lab.')
run('node', 'scripts/checkpoint.mjs', 'solution', cwd=lab)
(lab / 'notes').mkdir()
(lab / 'AGENTS.md').write_text('''# Reliable execution lab — draft v0

This is a disposable local training app with synthetic records.
Use contract.md for accepted behavior and notes/task.md for this exercise.
The current task controls whether you may investigate, edit or delegate.
The implementation repair is limited to public/filter.mjs.
Preserve the contract, source data, accepted checks and notes/keep-me.md.
You may write notes/handoff.md and save evidence under .runs/.
Use npm test for all checks; npm run test:recovery for the focused order check.
Run these commands from the lab root. The full suite opens a loopback HTTP server.
Prepared history under .runs/prepared/ records authored states, not model runs.
Do not use another checkpoint or restore a path unless the learner selects that route.
Report actual observations, failed attempts, checks not run and the next action.
Instructions do not enforce filesystem, network, process or billing boundaries.
''')
(lab / 'notes/task.md').write_text('''# Recovery task — draft v0

Repair the filter so it satisfies contract.md without changing accepted behavior.
Investigate first; pause and preserve evidence before the repair phase.
When the repair phase is assigned, edit public/filter.mjs only.
Keep every accepted check, the source data and notes/keep-me.md unchanged.
Do not add sorting, owner search, dependencies or UI changes.

The helper prepared two attempted implementations and captured real results.
They are teaching fixtures, not an agent transcript or a performance benchmark.
See .runs/prepared/index.json and each named stage's output and source.
The current working tree contains the second attempted implementation.
''')
(lab / 'tests/recovery.test.mjs').write_text('''import test from 'node:test';
import assert from 'node:assert/strict';
import {filterProjects} from '../public/filter.mjs';

test('R1 recovery: different matching names preserve source order', () => {
  const items = Object.freeze([
    Object.freeze({id: 'z1', name: 'Zebra'}),
    Object.freeze({id: 'a', name: 'Alpha'}),
    Object.freeze({id: 'z2', name: 'Zebra'}),
  ]);
  assert.deepEqual(filterProjects(items, 'a').map(item => item.id), ['z1', 'a', 'z2']);
});
''')
package = json.loads((lab / 'package.json').read_text())
package['scripts']['test:recovery'] = 'node --test tests/recovery.test.mjs'
(lab / 'package.json').write_text(json.dumps(package, indent=2) + '\n')
manifest_paths = [p for p in lab.rglob('*') if p.is_file()
                  and p.relative_to(lab).parts[0] not in ('.runs', 'baseline-hashes.json')]
(lab / 'baseline-hashes.json').write_text(json.dumps(hashes(lab, manifest_paths), indent=2) + '\n')
run('git', 'init', '-b', 'codex/section-06', cwd=lab)
run('git', 'add', '.', cwd=lab)
run('git', '-c', 'user.name=Course lab', '-c', 'user.email=course@example.invalid',
    '-c', 'commit.gpgSign=false', 'commit', '-m', 'Section 6 verified-behavior baseline', cwd=lab)
baseline_commit = run('git', 'rev-parse', 'HEAD', cwd=lab).stdout.strip()
prepared = lab / '.runs/prepared'
prepared.mkdir(parents=True)
stages = []


def capture(stage, expected_pass, expected_fail):
    destination = prepared / stage
    destination.mkdir()
    result = run('npm', 'test', cwd=lab, check=False)
    (destination / 'test-output.txt').write_text(result.stdout + result.stderr)
    (destination / 'filter.mjs').write_bytes((lab / 'public/filter.mjs').read_bytes())
    (destination / 'change.diff').write_text(run('git', 'diff', 'HEAD', '--', cwd=lab).stdout)
    if (f'# pass {expected_pass}\n' not in result.stdout or
            f'# fail {expected_fail}\n' not in result.stdout or
            (result.returncode == 0) != (expected_fail == 0)):
        raise RuntimeError(f'Unexpected setup result; inspect {destination}/test-output.txt')
    relevant = [p for folder in ('public', 'tests') for p in (lab / folder).rglob('*')]
    relevant += [lab / p for p in ('contract.md', 'package.json', 'server.mjs')]
    record = {
        'stage': stage, 'recorded_at_utc': datetime.now(timezone.utc).isoformat(),
        'working_directory': str(lab), 'command': 'npm test',
        'exit_code': result.returncode, 'passed': expected_pass, 'failed': expected_fail,
        'baseline_commit': baseline_commit, 'model_run': False,
        'browser_checks_run': False, 'sha256': hashes(lab, relevant),
    }
    (destination / 'evidence.json').write_text(json.dumps(record, indent=2) + '\n')
    stages.append({'stage': stage, 'passed': expected_pass, 'failed': expected_fail,
                   'exit_code': result.returncode, 'evidence': f'{stage}/evidence.json'})


capture('baseline', 12, 0)
solution = (lab / 'public/filter.mjs').read_text()
anchor = '  return projects.filter('
if solution.count(anchor) != 1:
    raise RuntimeError('Expected one filter implementation anchor.')
(lab / 'public/filter.mjs').write_text(solution.replace(
    anchor, '  return projects.sort((a, b) => a.name.localeCompare(b.name)).filter(', 1))
capture('attempt-1-in-place-sort', 1, 11)
(lab / 'public/filter.mjs').write_text(solution.replace(
    anchor, '  return [...projects].sort((a, b) => a.name.localeCompare(b.name)).filter(', 1))
capture('attempt-2-copy-and-sort', 11, 1)
(prepared / 'index.json').write_text(json.dumps({
    'provenance': 'Authored teaching states with actual local checks; no agent run.',
    'current_stage': 'attempt-2-copy-and-sort', 'stages': stages,
}, indent=2) + '\n')
(lab / 'notes/keep-me.md').write_text('''# Learner draft — preserve this untracked file

For my course presentation, explain why a passing check can still leave
an accepted behavior untested. This note is independent of the filter repair.
''')
print(lab)
