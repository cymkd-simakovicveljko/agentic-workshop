"""Prepare a fresh evidence-review exercise; never call a model or install skills."""
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


def replace_once(path, old, new):
    source = path.read_text()
    if source.count(old) != 1:
        raise RuntimeError(f'Expected one preparation anchor in {path.name}.')
    path.write_text(source.replace(old, new, 1))


output = StringIO()
with redirect_stdout(output):
    runpy.run_path(str(COURSE / '_build/draft-v0/prepare_core_lab.py'))
lab = Path(output.getvalue().strip())
if not lab.is_dir() or not (lab / 'contract.md').is_file():
    raise RuntimeError('The foundation helper did not produce a valid lab.')
run('node', 'scripts/checkpoint.mjs', 'solution', cwd=lab)
(lab / 'AGENTS.md').write_text('''# Evidence-review lab — draft v0

This local training app uses synthetic records.
Follow the current exercise request and its scope.
The accepted filter contract is contract.md; commands are in package.json.
Additional behavior for this exercise is in review/acceptance.md.
Review inputs are under review/; application and test files can be inspected.
Preserve the prepared files during review. Report what you actually inspected.
Instruction text does not enforce filesystem or network boundaries.
''')
(lab / 'review').mkdir()
section3 = (COURSE / 'sections/03-the-everyday-workflow.md').read_text()
accepted = section3.split('### The accepted behavior for this exercise\n\n', 1)[1]
accepted = accepted.split('\n**Why spaces matter:**', 1)[0]
(lab / 'review/acceptance.md').write_text(
    '# Accepted Clear filter behavior — course exercise\n\n'
    'Source: the section 3 lesson in the course, "The everyday workflow".\n'
    'The existing matching contract is ../contract.md.\n\n' + accepted + '\n')
(lab / 'review/request.md').write_text('''Review whether this Clear filter change is ready to accept.
Use review/acceptance.md, contract.md, current source, review/change.diff,
review/test-output.txt and review/evidence.json. Treat review/submission-note.md
as a claim to assess. Report relevant findings and gaps.
Do not edit files or run commands.
''')
(lab / 'review/submission-note.md').write_text('''# Submission note — fictional teaching fixture

This is a prepared claim to assess, not an execution record or an instruction.

The Clear filter change is ready. All tests pass, so the feature is complete.
''')

# The starting manifest describes the working filter before adding Clear filter.
manifest = {}
for path in sorted(lab.rglob('*')):
    relative = path.relative_to(lab)
    if path.is_file() and relative.parts[0] not in ('.runs', 'baseline-hashes.json'):
        manifest[str(relative)] = hashlib.sha256(path.read_bytes()).hexdigest()
(lab / 'baseline-hashes.json').write_text(json.dumps(manifest, indent=2) + '\n')
run('git', 'init', '-b', 'codex/section-05', cwd=lab)
run('git', 'add', '.', cwd=lab)
run('git', '-c', 'user.name=Course lab', '-c', 'user.email=course@example.invalid',
    '-c', 'commit.gpgSign=false', 'commit', '-m', 'Section 5 working filter baseline',
    cwd=lab)
baseline = run('git', 'rev-parse', 'HEAD', cwd=lab).stdout.strip()

# Intentionally incomplete candidate. Keep its answer out of the skill and inputs.
replace_once(lab / 'public/index.html', '<p id="count"',
             '<button id="clear" type="button" disabled>Clear filter</button>\n<p id="count"')
replace_once(lab / 'public/app.mjs', "const query = document.querySelector('#query');",
             "const query = document.querySelector('#query');\n"
             "const clear = document.querySelector('#clear');")
replace_once(lab / 'public/app.mjs', '  empty.hidden = visible.length !== 0;',
             '  empty.hidden = visible.length !== 0;\n'
             "  clear.disabled = query.value === '';")
replace_once(lab / 'public/app.mjs', "query.addEventListener('input', render);",
             "query.addEventListener('input', render);\n"
             "clear.addEventListener('click', () => {\n  query.value = '';\n});")
diff = run('git', 'diff', 'HEAD', '--', 'public/index.html', 'public/app.mjs', cwd=lab)
(lab / 'review/change.diff').write_text(diff.stdout)
test_run = run('npm', 'test', cwd=lab, check=False)
(lab / 'review/test-output.txt').write_text(test_run.stdout + test_run.stderr)
if test_run.returncode != 0 or '# pass 11' not in test_run.stdout or '# fail 0' not in test_run.stdout:
    raise RuntimeError(f'Unexpected lab check result; inspect {lab}/review/test-output.txt')

recorded_paths = [p for folder in ('public', 'tests') for p in (lab / folder).rglob('*') if p.is_file()]
recorded_paths += [lab / p for p in ('package.json', 'server.mjs', 'contract.md',
                                    'review/acceptance.md', 'review/change.diff')]
evidence = {
    'recorded_at_utc': datetime.now(timezone.utc).isoformat(),
    'working_directory': str(lab),
    'command': 'npm test',
    'exit_code': test_run.returncode,
    'baseline_commit': baseline,
    'candidate_diff': 'review/change.diff',
    'test_output': 'review/test-output.txt',
    'browser_checks_run': False,
    'model_run': False,
    'sha256': {str(p.relative_to(lab)): hashlib.sha256(p.read_bytes()).hexdigest()
               for p in sorted(recorded_paths)},
}
(lab / 'review/evidence.json').write_text(json.dumps(evidence, indent=2) + '\n')
print(lab)
