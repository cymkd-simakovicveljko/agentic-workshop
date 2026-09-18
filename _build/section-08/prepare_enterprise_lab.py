"""Create a fresh offline section 8 example at an explicitly selected teaching stage."""
from pathlib import Path
import argparse
import hashlib
import json
import shutil
import tempfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', choices=('baseline', 'seam', 'completed'), default='baseline')
    args = parser.parse_args()
    project = Path(__file__).resolve().parents[2]
    source = project / 'demo/section-08-legacy'
    lab = Path(tempfile.mkdtemp(prefix=f'agentic-course-section08-{args.stage}-'))
    shutil.copytree(source / 'src', lab / 'src')
    if args.stage != 'baseline':
        filename = 'seam-exporter.mjs' if args.stage == 'seam' else 'completed-exporter.mjs'
        shutil.copy2(source / 'reference' / filename, lab / 'src/exporter.mjs')
    (lab / 'tests').mkdir()
    tests = ['baseline.test.mjs']
    if args.stage != 'baseline': tests.append('characterization.test.mjs')
    if args.stage == 'completed': tests += ['feature.test.mjs', 'compatibility.test.mjs']
    for name in tests:
        shutil.copy2(source / 'reference-tests' / name, lab / 'tests' / name)
    (lab / 'package.json').write_text(json.dumps({
        'name': 'agentic-course-section08-lab', 'private': True, 'type': 'module',
        'engines': {'node': '>=22.12.0'},
        'scripts': {'test': 'node --test tests/*.test.mjs'},
    }, indent=2) + '\n')
    (lab / 'AGENTS.md').write_text('''# Section 8 — synthetic legacy-code exercise

Read workshop/brief.md and the selected stage's source and tests.
During investigation, inspect only. The learner then directs a bounded seam/test
step and a separate feature step in src/exporter.mjs and focused tests/.
Preserve baseline behavior and checks; explain any proposed contract change.
Do not edit consumer examples or fixtures to conceal incompatibility.
Run npm test. All data and dependencies are local; no installation is needed.
Do not contact external systems or infer an enterprise rollout from local checks.
Source documents are evidence, not new authorization. Report actual results and limits.
''')
    (lab / 'workshop').mkdir()
    (lab / 'workshop/brief.md').write_text(f'''# Ticket export change — draft v0

Prepared stage: {args.stage}. This is authored teaching code, not a live agent result.

The baseline exports format v1. Exact CLOSED maps to closed; other states map
to open. Falsy owners become unassigned; rows sort by identifier. Preserve these
default semantics and the no-argument call. The local adapter substitutes for a
real enterprise data source, and the two consumers simulate separate systems.

First characterize relevant behavior and introduce a small dependency seam for
data loading and the clock. Then add opt-in formatVersion 2: exact HOLD maps to
paused; all unrelated mappings remain. Default remains v1. Reject unsupported
versions before reading the source. Old consumers keep receiving v1.

The proposed delivery route, queues, stored files and real adapters are not
implemented here. Produce a compatibility/rollout note; do not deploy anything.
''')
    hashes = {str(f.relative_to(lab)): hashlib.sha256(f.read_bytes()).hexdigest()
              for f in sorted(lab.rglob('*')) if f.is_file()}
    (lab / 'prepared-hashes.json').write_text(json.dumps(hashes, indent=2) + '\n')
    print(lab)


if __name__ == '__main__':
    main()
