import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const p=JSON.parse(await readFile('plugins/spec-coach/.claude-plugin/plugin.json'));
assert.equal(p.name,'spec-coach');assert.equal(p.version,'1.0.0');
const a=await readFile('skills/spec-review/SKILL.md','utf8');
const b=await readFile('plugins/spec-coach/skills/spec-review/SKILL.md','utf8');assert.equal(a,b);
assert.match(a,/^---\nname: spec-review\ndescription:/);
console.log('Local files and skill copies consistent. This does NOT prove host loading or skill behavior.');
console.log('Node '+process.version);
