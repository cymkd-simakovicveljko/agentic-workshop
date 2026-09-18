import test from 'node:test';
import assert from 'node:assert/strict';
import {exportTickets} from '../src/exporter.mjs';
import {readV1} from '../src/consumer-v1.mjs';

test('outer baseline: actual local adapter output preserves known rows', async () => {
  const report = await exportTickets();
  assert.deepEqual(report.rows, [
    {id: 'T-03', status: 'closed', owner: 'Mira'},
    {id: 'T-09', status: 'open', owner: 'unassigned'},
    {id: 'T-20', status: 'open', owner: 'unassigned'},
  ]);
});

test('outer baseline: ordinary call produces v1 and a parseable timestamp', async () => {
  const report = await exportTickets();
  assert.equal(report.formatVersion, 1);
  assert.match(report.generatedAt, /^\d{4}-\d\d-\d\dT/);
  assert.ok(Number.isFinite(Date.parse(report.generatedAt)));
});

test('outer baseline: old consumer can count the default export', async () => {
  assert.deepEqual(readV1(await exportTickets()), {open: 2, closed: 1});
});
