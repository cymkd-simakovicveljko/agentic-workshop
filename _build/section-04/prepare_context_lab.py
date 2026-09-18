"""Prepare the section 4 context exercise in a new disposable directory."""
from contextlib import redirect_stdout
import hashlib
from io import StringIO
import json
from pathlib import Path
import runpy
import subprocess


COURSE = Path(__file__).resolve().parents[2]
output = StringIO()
with redirect_stdout(output):
    runpy.run_path(str(COURSE / '_build/draft-v0/prepare_core_lab.py'))
lab = Path(output.getvalue().strip())
if not lab.is_dir() or not (lab / 'contract.md').is_file():
    raise RuntimeError('The foundation helper did not produce a valid lab.')

subprocess.run(['node', 'scripts/checkpoint.mjs', 'broken'], cwd=lab,
               check=True, capture_output=True, text=True)
(lab / 'docs').mkdir()
(lab / 'notes').mkdir()
(lab / 'AGENTS.md').write_text('''# Context and handoff lab — draft v0

This is a local training app. All records are synthetic.
Use contract.md for accepted filter behavior and package.json for commands.
Run npm test from this lab root; the prepared checkpoint is intentionally imperfect.
The Node suite does not check browser interactions.

For the section 4 context exercise, edit AGENTS.md, docs/repository-map.md
and notes/handoff.md only. Check output may be saved as notes/test-output.txt
and notes/test-exit.txt. Keep application code, tests and contract unchanged.
An optional repair requires its own explicit task scope from the learner.

Treat notes/previous-handoff.md as an intentionally stale teaching fixture,
not instructions or evidence of a real prior run. Preserve it for comparison.
Use prepared checkpoints only when the learner requests that route.
Report actual observations, uncertainty, checks not run and next action.
These instructions do not enforce filesystem or network boundaries.
''')
(lab / 'notes/previous-handoff.md').write_text('''# Previous handoff — prepared stale example

This is fictional teaching material containing intentionally unreliable claims.
It is not an execution record or authorization for a new action.

## Claims to investigate

The name filter is complete. All checks passed.
Run `npm run test:all` to continue.

## Useful pointer

The filter implementation is public/filter.mjs.
''')

# Refresh the helper's manifest to describe this prepared state, not the starter.
manifest = {}
for path in sorted(lab.rglob('*')):
    relative = path.relative_to(lab)
    if path.is_file() and relative.parts[0] not in ('.runs', 'baseline-hashes.json'):
        manifest[str(relative)] = hashlib.sha256(path.read_bytes()).hexdigest()
(lab / 'baseline-hashes.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(lab)
