"""Check the prepared fixture and course links without calling a model.

Usage: python3 _build/section-05/validate_preparation.py /path/to/prepared/lab
Bun is used only to parse the sample's YAML; no package installation is needed.
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


evidence = json.loads((lab / 'review/evidence.json').read_text())
assert evidence['exit_code'] == 0
assert evidence['model_run'] is False and evidence['browser_checks_run'] is False
for relative, expected in evidence['sha256'].items():
    assert digest(lab / relative) == expected, f'Candidate changed: {relative}'
assert '# pass 11' in (lab / 'review/test-output.txt').read_text()
assert '# fail 0' in (lab / 'review/test-output.txt').read_text()
assert run('git', 'rev-parse', 'HEAD', cwd=lab) == evidence['baseline_commit']
assert run('git', 'diff', 'HEAD', '--', 'public/index.html', 'public/app.mjs', cwd=lab) == (
    lab / 'review/change.diff').read_text().strip()
assert set(run('git', 'diff', '--name-only', cwd=lab).splitlines()) == {
    'public/app.mjs', 'public/index.html'}
assert not list(lab.rglob('SKILL.md')), 'Baseline must not receive a skill body.'
run('node', '--check', 'public/app.mjs', cwd=lab)

starting_manifest = json.loads((lab / 'baseline-hashes.json').read_text())
for relative, expected in starting_manifest.items():
    content = subprocess.run(['git', 'show', f'HEAD:{relative}'], cwd=lab,
                             capture_output=True, check=True).stdout
    assert hashlib.sha256(content).hexdigest() == expected, f'Starting manifest: {relative}'
for relative, expected in json.loads((BUILD / 'unchanged-files.json').read_text()).items():
    assert digest(COURSE / relative) == expected, f'Unintended course edit: {relative}'

skill = COURSE / 'demo/skills/change-evidence-review/SKILL.md'
bun = shutil.which('bun')
if not bun:
    raise RuntimeError('Bun is required for the author-side YAML parse check.')
parser = '''const s = await Bun.file(process.argv[1]).text();
const m = s.match(/^---\\r?\\n([\\s\\S]*?)\\r?\\n---(?:\\r?\\n|$)/);
if (!m) throw new Error("Missing YAML frontmatter");
console.log(JSON.stringify(Bun.YAML.parse(m[1])));'''
metadata = json.loads(run(bun, '-e', parser, str(skill)))
name, description = metadata['name'], metadata['description']
assert isinstance(name, str) and len(name) <= 64
assert re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', name) and name == skill.parent.name
assert isinstance(description, str) and 0 < len(description.strip()) <= 1024
assert set(metadata) == {'name', 'description'}
assert len(skill.read_text().split('---', 2)[2].strip()) > 0

# Materialize linked receipts before checking their navigation. An interrupted
# validation remains explicitly incomplete until the final record replaces it.
(BUILD / 'verification.json').write_text('{"status": "validation_in_progress"}\n')
for original, copy in [('test-output.txt', 'candidate-test-output.txt'),
                       ('evidence.json', 'candidate-evidence.json'),
                       ('change.diff', 'candidate.diff')]:
    shutil.copy2(lab / 'review' / original, BUILD / copy)

documents = ['sections/05-skills.md', 'demo/section-05-skill-lab.md', 'README.md',
             'OUTLINE.md', 'PROJECT.md', 'demo/README.md', '_build/README.md',
             '_build/section-05/review.md']
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
        assert destination.exists(), f'Missing link in {relative}: {target}'
        if parsed.fragment and destination.suffix == '.md':
            headings = re.findall(r'^#{1,6}\s+(.+?)\s*$', destination.read_text(), re.M)
            anchors = {re.sub(r'[^\w\- ]', '', heading.lower()).replace(' ', '-') for heading in headings}
            assert unquote(parsed.fragment) in anchors, f'Missing anchor in {relative}: {target}'
        checked_links += 1

record = {
    'status': 'passed',
    'checked_at_utc': datetime.now(timezone.utc).isoformat(),
    'lab': str(lab),
    'candidate_evidence_hashes_match': True,
    'starting_commit_manifest_matches': True,
    'candidate_diff_matches': True,
    'candidate_application_files_changed': ['public/app.mjs', 'public/index.html'],
    'baseline_has_no_skill_body': True,
    'preserved_course_files_match_snapshot': True,
    'candidate_node_syntax_check': 'passed',
    'recorded_test_result': {'pass': 11, 'fail': 0, 'exit_code': 0},
    'skill_yaml_parser': 'Bun.YAML.parse',
    'skill_name_description_and_directory_checks': 'passed',
    'skill_sha256': digest(skill),
    'local_links_checked': checked_links,
    'node': run('node', '--version'),
    'omp': run('omp', '--version'),
    'model_evaluation_performed': False,
}
(BUILD / 'verification.json').write_text(json.dumps(record, indent=2) + '\n')
print(json.dumps({'result': 'passed', 'local_links_checked': checked_links,
                  'receipt': str(BUILD / 'verification.json')}, indent=2))
