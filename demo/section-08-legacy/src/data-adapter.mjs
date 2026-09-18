import {readFile} from 'node:fs/promises';

// A local stand-in for an enterprise data adapter; no external service is called.
export async function loadTickets() {
  return JSON.parse(await readFile(new URL('./tickets.json', import.meta.url), 'utf8'));
}
