export function readV1(report) {
  if (report.formatVersion !== 1) throw new Error('Unsupported format for v1 consumer');
  const counts = {open: 0, closed: 0};
  for (const row of report.rows) {
    if (!Object.hasOwn(counts, row.status)) throw new Error('Unsupported status');
    counts[row.status]++;
  }
  return counts;
}
