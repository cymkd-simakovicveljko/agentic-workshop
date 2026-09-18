import {loadTickets} from './data-adapter.mjs';

// Prepared replacement for src/exporter.mjs, not a module to import from this folder.
export async function exportTickets({load = loadTickets, now = () => new Date()} = {}) {
  const tickets = await load();
  const generatedAt = now().toISOString();
  const rows = tickets.map(ticket => ({
    id: ticket.id,
    status: ticket.state === 'CLOSED' ? 'closed' : 'open',
    owner: ticket.owner || 'unassigned',
  })).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  return {formatVersion: 1, generatedAt, rows};
}
