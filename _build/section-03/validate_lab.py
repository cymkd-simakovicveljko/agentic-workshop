"""Rehearse the documented local setup and reference snippets, without a model."""
from pathlib import Path
import json
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = Path(__file__).resolve().parent / 'validation.json'
guide = (ROOT / 'demo/section-03-workflow-lab.md').read_text()
setup = next(block for block in re.findall(r'```sh\n(.*?)```', guide, re.S)
             if block.startswith('if workflow_lab='))
result = subprocess.run(['/bin/sh', '-c', setup], cwd=ROOT,
                        capture_output=True, text=True)
lab = Path(result.stdout.strip().splitlines()[-1])
assert result.returncode == 0 and lab.is_dir(), result.stdout + result.stderr
assert '# pass 11' in result.stdout and '# fail 0' in result.stdout
receipt = {'date': '2026-09-12', 'lab': str(lab), 'model_run': False,
           'setup_output': result.stdout + result.stderr, 'checks': []}


def run(args, expected=0):
    process = subprocess.run(args, cwd=lab, capture_output=True, text=True)
    receipt['checks'].append({'command': args, 'exit_code': process.returncode,
                              'output': process.stdout + process.stderr})
    OUTPUT.write_text(json.dumps(receipt, indent=2) + '\n')
    assert process.returncode == expected, receipt['checks'][-1]
    return process.stdout


run(['node', '--version'])
run(['omp', '--version'])
html = (lab / 'public/index.html').read_text()
assert 'id="clear-filter"' not in html
html_snippet = re.findall(r'```html\n(.*?)```', guide, re.S)[0].strip()
js_snippets = [s.strip() for s in re.findall(r'```js\n(.*?)```', guide, re.S)]
assert len(js_snippets) == 3
assert html.count('<p id="count"') == 1
html = html.replace('<p id="count"', html_snippet + '\n<p id="count"')
(lab / 'public/index.html').write_text(html)
app = (lab / 'public/app.mjs').read_text()
query_line = "const query = document.querySelector('#query');"
empty_line = '  empty.hidden = visible.length !== 0;'
assert app.count(query_line) == 1 and app.count(empty_line) == 1
app = app.replace(query_line, query_line + '\n' + js_snippets[0])
app = app.replace(empty_line, empty_line + '\n  ' + js_snippets[1])
prefix, suffix = app.rsplit('render();', 1)
app = prefix + js_snippets[2] + '\nrender();' + suffix
(lab / 'public/app.mjs').write_text(app)
run(['node', '--check', 'public/app.mjs'])
run(['npm', 'test'])
run(['git', 'diff', 'HEAD', '--check'])
changed = run(['git', 'diff', 'HEAD', '--name-only']).splitlines()
assert sorted(changed) == ['public/app.mjs', 'public/index.html'], changed
receipt['reference_changes'] = changed

examples = (ROOT / 'demo/section-03-worked-examples.md').read_text()
browser_test = next(block for block in re.findall(r'```js\n(.*?)```', examples, re.S)
                    if "from '@playwright/test'" in block)
with tempfile.TemporaryDirectory(prefix='section-03-source-check-') as scratch:
    test_file = Path(scratch) / 'example.mjs'
    test_file.write_text(browser_test)
    run(['node', '--check', str(test_file)])
    failure = subprocess.run(['/bin/sh', '-c', setup], cwd=scratch,
                             capture_output=True, text=True)
    assert not (Path(scratch) / '.git').exists()
    assert 'Lab preparation stopped.' in failure.stdout
    receipt['failed_preparation_creates_no_git'] = True
receipt['browser_test_status'] = 'Syntax checked; Playwright test not executed.'
OUTPUT.write_text(json.dumps(receipt, indent=2) + '\n')
print(str(lab))
print(f'Reference syntax and existing 11-check suite passed; receipt: {OUTPUT}')
