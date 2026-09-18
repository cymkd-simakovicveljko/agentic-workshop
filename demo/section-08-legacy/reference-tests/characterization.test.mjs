import test from 'node:test';
import assert from 'node:assert/strict';
import {exportTickets} from '../src/exporter.mjs';

const fixedDate = '2026-09-12T12:00:00.000Z';
const run = tickets => exportTickets({load: async () => tickets, now: () => new Date(fixedDate)});

test('characterization: only exact CLOSED is closed in default format', async () => {
  const states = ['CLOSED', 'closed', 'HOLD', 'MYSTERY'];
  const report = await run(states.map((state, i) => ({id: String(i), state, owner: 'A'})));
  assert.deepEqual(report.rows.map(row => row.status), ['closed', 'open', 'open', 'open']);
});

test('characterization: empty and null owners fall back; whitespace is preserved', async () => {
  const report = await run(['', null, ' '].map((owner, i) => ({id: String(i), state: 'OPEN', owner})));
  assert.deepEqual(report.rows.map(row => row.owner), ['unassigned', 'unassigned', ' ']);
});

test('characterization: empty input produces empty rows', async () => {
  assert.deepEqual((await run([])).rows, []);
});

test('characterization: sorting retains duplicate occurrences and input data', async () => {
  const tickets = Object.freeze([
    {id: 'Z', state: 'HOLD', owner: 'First'},
    {id: 'A', state: 'CLOSED', owner: 'Middle'},
    {id: 'Z', state: 'OPEN', owner: 'Last'},
  ].map(Object.freeze));
  const before = JSON.stringify(tickets);
  const report = await run(tickets);
  assert.deepEqual(report.rows.map(row => row.owner), ['Middle', 'First', 'Last']);
  assert.equal(JSON.stringify(tickets), before);
});

test('characterization: the substituted clock controls the recorded timestamp', async () => {
  assert.equal((await run([])).generatedAt, fixedDate);
});

test('characterization: a data-source failure propagates without a fabricated report', async () => {
  const failure = new Error('Synthetic data source unavailable');
  let clockCalls = 0;
  await assert.rejects(exportTickets({
    load: async () => {throw failure;},
    now: () => {clockCalls++; return new Date(fixedDate);},
  }), error => error === failure);
  assert.equal(clockCalls, 0);
});
