import test from 'node:test';
import assert from 'node:assert/strict';
import {exportTickets} from '../src/exporter.mjs';

const load = async () => [
  {id: 'A', state: 'HOLD', owner: ''},
  {id: 'B', state: 'MYSTERY', owner: null},
  {id: 'C', state: 'CLOSED', owner: 'Mira'},
];

test('new requirement: v2 distinguishes HOLD and preserves unrelated mapping', async () => {
  const report = await exportTickets({load, formatVersion: 2});
  assert.equal(report.formatVersion, 2);
  assert.deepEqual(report.rows, [
    {id: 'A', status: 'paused', owner: 'unassigned'},
    {id: 'B', status: 'open', owner: 'unassigned'},
    {id: 'C', status: 'closed', owner: 'Mira'},
  ]);
});

test('new requirement: omitted and explicit v1 retain old HOLD behavior', async () => {
  for (const options of [{load}, {load, formatVersion: 1}]) {
    const report = await exportTickets(options);
    assert.equal(report.formatVersion, 1);
    assert.equal(report.rows[0].status, 'open');
  }
});

test('new requirement: unsupported versions fail before reading the source', async () => {
  let reads = 0;
  await assert.rejects(exportTickets({
    formatVersion: 3, load: async () => {reads++; return [];},
  }), /Unsupported export format/);
  assert.equal(reads, 0);
});
