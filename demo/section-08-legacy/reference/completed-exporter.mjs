import {loadTickets} from './data-adapter.mjs';

// Prepared replacement for src/exporter.mjs, not a module to import from this folder.
export async function exportTickets({
  load = loadTickets,
  now = () => new Date(),
  formatVersion = 1,
} = {}) {
  if (![1, 2].includes(formatVersion)) throw new Error('Unsupported export format');
  const tickets = await load();
  const generatedAt = now().toISOString();
  const rows = tickets.map(ticket => ({
    id: ticket.id,
    status: ticket.state === 'CLOSED' ? 'closed'
      : formatVersion === 2 && ticket.state === 'HOLD' ? 'paused' : 'open',
    owner: ticket.owner || 'unassigned',
  })).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  return {formatVersion, generatedAt, rows};
}
