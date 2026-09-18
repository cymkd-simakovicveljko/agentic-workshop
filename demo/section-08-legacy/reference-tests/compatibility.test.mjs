import test from 'node:test';
import assert from 'node:assert/strict';
import {exportTickets} from '../src/exporter.mjs';
import {readV1} from '../src/consumer-v1.mjs';
import {readV2} from '../src/consumer-v2.mjs';

test('consumer compatibility: upgraded reader handles v1 and v2', async () => {
  assert.deepEqual(readV2(await exportTickets()), {open: 2, closed: 1, paused: 0});
  assert.deepEqual(readV2(await exportTickets({formatVersion: 2})), {open: 1, closed: 1, paused: 1});
});

test('consumer compatibility: old reader rejects v2 instead of silently miscounting', async () => {
  const report = await exportTickets({formatVersion: 2});
  assert.throws(() => readV1(report), /Unsupported format/);
});

test('consumer compatibility: a new status cannot masquerade as v1', () => {
  const mislabeled = {formatVersion: 1, rows: [{id: 'X', status: 'paused'}]};
  assert.throws(() => readV1(mislabeled), /Unsupported status/);
  assert.throws(() => readV2(mislabeled), /Unsupported status/);
});
