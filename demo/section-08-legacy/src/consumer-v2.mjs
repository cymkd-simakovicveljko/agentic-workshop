export function readV2(report) {
  if (![1, 2].includes(report.formatVersion)) throw new Error('Unsupported format');
  const counts = {open: 0, closed: 0, paused: 0};
  for (const row of report.rows) {
    const allowed = report.formatVersion === 1 ? ['open', 'closed'] : ['open', 'closed', 'paused'];
    if (!allowed.includes(row.status)) throw new Error('Unsupported status');
    counts[row.status]++;
  }
  return counts;
}
