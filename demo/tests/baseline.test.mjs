import test from 'node:test';
import assert from 'node:assert/strict';
import {projects} from '../public/projects.mjs';
import {filterProjects} from '../public/filter.mjs';
import {createServer} from '../server.mjs';
test('empty query preserves all IDs and order',()=>{
 assert.deepEqual(filterProjects(projects,'').map(p=>p.id),['atlas','atlas-api','borealis','cafe']);
});
test('HTTP serves application and modules, rejects unknown paths',async()=>{
 const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try {const base=`http://127.0.0.1:${server.address().port}`;
  const page=await fetch(base);assert.equal(page.status,200);assert.match(await page.text(),/Filter by project name/);
  for(const p of ['/app.mjs','/filter.mjs','/projects.mjs','/style.css']) assert.equal((await fetch(base+p)).status,200);
  assert.equal((await fetch(base+'/secret')).status,404);
 } finally {await new Promise(r=>server.close(r));}
});
