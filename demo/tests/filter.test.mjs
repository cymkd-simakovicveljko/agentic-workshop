import test from 'node:test';
import assert from 'node:assert/strict';
import {filterProjects} from '../public/filter.mjs';
import {projects} from '../public/projects.mjs';
const ids=q=>filterProjects(projects,q).map(p=>p.id);
test('R1: case-insensitive name substring',()=>assert.deepEqual(ids('aTlAs'),['atlas','atlas-api']));
test('R2: trims surrounding spaces',()=>assert.deepEqual(ids('  ATLAS  '),['atlas','atlas-api']));
test('R2: whitespace-only input restores the list',()=>assert.deepEqual(ids(' 	 '),['atlas','atlas-api','borealis','cafe']));
test('R1: owner field is excluded',()=>assert.deepEqual(ids('team'),[]));
test('R1: literal input, no regex interpretation',()=>assert.deepEqual(ids('.*'),[]));
test('R1: order and duplicate names preserved',()=>{
 const items=Object.freeze([{id:2,name:'Zebra'},{id:1,name:'Zebra'}].map(Object.freeze));
 assert.deepEqual(filterProjects(items,'ebr').map(p=>p.id),[2,1]);
});
test('R3: no match gives an empty result',()=>assert.deepEqual(ids('zzzz'),[]));
test('R1: accent folding is outside scope',()=>assert.deepEqual(ids('cafe'),[]));
test('R1: input array is not modified',()=>{
 const before=JSON.stringify(projects);const out=filterProjects(projects,'Atlas');
 assert.equal(JSON.stringify(projects),before);assert.notEqual(out,projects);
});
