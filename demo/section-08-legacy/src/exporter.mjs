import {loadTickets} from './data-adapter.mjs';

export async function exportTickets() {
  const tickets = await loadTickets();
  const generatedAt = new Date().toISOString();
  const rows = tickets.map(ticket => ({
    id: ticket.id,
    status: ticket.state === 'CLOSED' ? 'closed' : 'open',
    owner: ticket.owner || 'unassigned',
  })).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  return {formatVersion: 1, generatedAt, rows};
}
