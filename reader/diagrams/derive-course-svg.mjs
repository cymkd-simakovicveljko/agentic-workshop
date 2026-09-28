import { writeFile } from 'node:fs/promises';

const [kind, output] = process.argv.slice(2);
if (!kind || !output || !['agent-loop', 'workflow', 'context'].includes(kind)) {
  throw new Error('usage: node derive-course-svg.mjs agent-loop|workflow|context output.svg');
}

const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const colors = {
  external: ['#172338', '#bfdbfe'],
  backend: ['#092c2e', '#5eead4'],
  cloud: ['#332514', '#fcd34d'],
  messagebus: ['#38211c', '#fdba74'],
  database: ['#241d45', '#c4b5fd'],
  warning: ['#3a2018', '#fb923c']
};
const css = `
  svg { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #020617; }
  .bg { fill: #020617; }
  .grid { stroke: #122033; stroke-width: 1; }
  .frame { fill: rgba(8, 20, 36, .62); stroke: #28405d; stroke-width: 1.4; stroke-dasharray: 6 5; }
  .frame-label { fill: #8aa2b4; font-size: 12px; font-weight: 650; letter-spacing: .04em; }
  .node { stroke-width: 2.2; }
  .node-title { fill: #f8fafc; font-size: 18px; font-weight: 700; text-anchor: middle; }
  .node-sub { fill: #b7c6d8; font-size: 14px; text-anchor: middle; }
  .node-tag { fill: #5eead4; font-size: 12px; font-weight: 700; text-anchor: middle; }
  .edge { fill: none; stroke: #94a3b8; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  .edge-emphasis { stroke: #2dd4bf; stroke-width: 2.8; }
  .edge-dashed { stroke: #c4b5fd; stroke-dasharray: 7 5; }
  .edge-label { fill: #d7e2ef; font-size: 15px; font-weight: 650; text-anchor: middle; paint-order: stroke; stroke: #020617; stroke-width: 7px; stroke-linejoin: round; }
  .edge-label-emphasis { fill: #5eead4; }
  .edge-label-warning { fill: #fdba74; }
`;
const defs = `<defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" class="grid" fill="none"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#94a3b8"/></marker><marker id="arrow-emphasis" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#2dd4bf"/></marker><marker id="arrow-dashed" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#c4b5fd"/></marker></defs>`;
function node({ id, x, y, w = 100, h = 70, label, sub, type = 'backend', tag }) {
  const [fill, stroke] = colors[type];
  return `<g id="node-${id}" data-node-id="${id}" data-node-label="${esc(label)}" data-node-kind="${type}" role="group"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" class="node"/><text x="${x + w / 2}" y="${y + 29}" class="node-title">${esc(label)}</text><text x="${x + w / 2}" y="${y + 49}" class="node-sub">${esc(sub)}</text>${tag ? `<text x="${x + w / 2}" y="${y + 64}" class="node-tag">${esc(tag)}</text>` : ''}</g>`;
}
function edge({ from, to, d, label = '', x, y, variant = 'default', marker = 'arrow' }) {
  const edgeClass = variant === 'emphasis' ? 'edge edge-emphasis' : variant === 'dashed' ? 'edge edge-dashed' : 'edge';
  const labelClass = variant === 'emphasis' ? 'edge-label edge-label-emphasis' : variant === 'warning' ? 'edge-label edge-label-warning' : 'edge-label';
  const labelMarkup = label ? `<text x="${x}" y="${y}" class="${labelClass}">${esc(label)}</text>` : '';
  return `<path data-edge-from="${from}" data-edge-to="${to}" data-edge-label="${esc(label)}" d="${d}" class="${edgeClass}" marker-end="url(#${marker})"/>${labelMarkup}`;
}
function shell({ title, description, width, height, body }) {
  return `<svg data-theme="dark" data-course-export="compact-readable" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc" xmlns="http://www.w3.org/2000/svg"><style>${css}</style>${defs}<title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc><rect width="100%" height="100%" class="bg"/><rect width="100%" height="100%" fill="url(#grid)"/>${body}</svg>`;
}
function agentLoop() {
  const body = [
    edge({ from: 'human', to: 'omp', d: 'M128 235H154', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'omp', to: 'model', d: 'M209 200V160H348V145', label: 'context', x: 268, y: 184, variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'model', to: 'omp', d: 'M292 110H140V220H154', label: 'call / reply', x: 215, y: 98, marker: 'arrow' }),
    edge({ from: 'omp', to: 'tools', d: 'M240 270V440H348V425', marker: 'arrow' }),
    edge({ from: 'tools', to: 'omp', d: 'M292 390H275V250H264', label: 'result', x: 300, y: 334, marker: 'arrow' }),
    edge({ from: 'omp', to: 'review', d: 'M264 235H292', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'review', to: 'omp', d: 'M348 270V308H209V270', label: 'verify / revise', x: 208, y: 332, variant: 'dashed', marker: 'arrow-dashed' }),
    node({ id: 'human', x: 16, y: 200, w: 112, label: 'Human', sub: 'goal', type: 'external' }),
    node({ id: 'omp', x: 154, y: 200, w: 110, label: 'OMP', sub: 'assemble + run', tag: 'harness', type: 'backend' }),
    node({ id: 'model', x: 292, y: 75, w: 112, label: 'Model', sub: 'next step', type: 'cloud' }),
    node({ id: 'tools', x: 292, y: 355, w: 112, label: 'Tools', sub: 'permitted', type: 'messagebus' }),
    node({ id: 'review', x: 292, y: 200, w: 112, label: 'Review', sub: 'human decision', type: 'external' })
  ].join('');
  return shell({ title: 'The Agent Loop', description: 'A human defines the goal; OMP assembles context and executes permitted requests; the model proposes calls or replies; tools return results; a human verifies or revises.', width: 420, height: 500, body });
}
function workflow() {
  const body = [
    edge({ from: 'understand', to: 'specify', d: 'M144 104V150', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'specify', to: 'plan', d: 'M144 214V260', marker: 'arrow' }),
    edge({ from: 'plan', to: 'execute', d: 'M144 324V370', marker: 'arrow' }),
    edge({ from: 'execute', to: 'verify', d: 'M144 434V480', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'verify', to: 'accept', d: 'M144 544V650', label: 'meets request', x: 144, y: 600, variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'verify', to: 'revise', d: 'M264 512H300', label: 'not yet', x: 284, y: 468, variant: 'dashed', marker: 'arrow-dashed' }),
    edge({ from: 'revise', to: 'plan', d: 'M350 480V292H264', label: 'revise plan', x: 350, y: 360, variant: 'dashed', marker: 'arrow-dashed' }),
    node({ id: 'understand', x: 24, y: 40, w: 240, h: 64, label: 'Understand', sub: 'goal + constraints', type: 'external' }),
    node({ id: 'specify', x: 24, y: 150, w: 240, h: 64, label: 'Specify', sub: 'definition of done', type: 'backend' }),
    node({ id: 'plan', x: 24, y: 260, w: 240, h: 64, label: 'Plan', sub: 'small next step', type: 'backend' }),
    node({ id: 'execute', x: 24, y: 370, w: 240, h: 64, label: 'Execute', sub: 'permitted change', type: 'messagebus' }),
    node({ id: 'verify', x: 24, y: 480, w: 240, h: 64, label: 'Verify', sub: 'inspect outcome', type: 'external' }),
    node({ id: 'accept', x: 24, y: 650, w: 240, h: 64, label: 'Accept', sub: 'meets the bar', type: 'external' }),
    node({ id: 'revise', x: 300, y: 480, w: 100, h: 64, label: 'Revise', sub: 'replan', type: 'external' })
  ].join('');
  return shell({ title: 'From Intent to Accepted Change', description: 'Understand, specify, plan, execute, verify, and accept work. A failed verification returns through revision to the plan.', width: 420, height: 740, body });
}
function context() {
  const body = [
    '<text x="12" y="28" class="frame-label">SUPPLIED CONTEXT, NOT THE WHOLE DISK</text>',
    edge({ from: 'request', to: 'context', d: 'M135 210H155', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'filesystem', to: 'context', d: 'M135 390H145V230H155', marker: 'arrow' }),
    edge({ from: 'untrusted', to: 'context', d: 'M305 390H290V225H280', variant: 'warning', marker: 'arrow' }),
    edge({ from: 'context', to: 'model', d: 'M217 250V500', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'model', to: 'tools', d: 'M217 580V630', marker: 'arrow' }),
    edge({ from: 'tools', to: 'model', d: 'M155 670H145V540H155', label: 'tool result', x: 94, y: 600, marker: 'arrow' }),
    edge({ from: 'model', to: 'answer', d: 'M280 540H305', marker: 'arrow-emphasis', variant: 'emphasis' }),
    edge({ from: 'answer', to: 'review', d: 'M362 580V650', variant: 'emphasis', marker: 'arrow-emphasis' }),
    edge({ from: 'review', to: 'context', d: 'M362 730V748H4V125H217V170', label: 'revise', x: 210, y: 110, variant: 'dashed', marker: 'arrow-dashed' }),
    node({ id: 'request', x: 10, y: 170, w: 125, h: 80, label: 'Human task', sub: 'goal + rules', type: 'external' }),
    node({ id: 'filesystem', x: 10, y: 350, w: 125, h: 80, label: 'Filesystem', sub: 'not all read', tag: 'untouched', type: 'database' }),
    node({ id: 'context', x: 155, y: 170, w: 125, h: 80, label: 'Context', sub: 'selected material', tag: 'prompt-visible', type: 'backend' }),
    node({ id: 'untrusted', x: 305, y: 350, w: 115, h: 80, label: 'Web / body', sub: 'retrieved text', tag: 'untrusted', type: 'warning' }),
    node({ id: 'model', x: 155, y: 500, w: 125, h: 80, label: 'Model', sub: 'uses context', type: 'cloud' }),
    node({ id: 'tools', x: 155, y: 630, w: 125, h: 80, label: 'Tools', sub: 'permitted work', type: 'messagebus' }),
    node({ id: 'answer', x: 305, y: 500, w: 115, h: 80, label: 'Draft', sub: '+ evidence', type: 'backend' }),
    node({ id: 'review', x: 305, y: 650, w: 115, h: 80, label: 'Review', sub: 'human decision', type: 'external' })
  ].join('');
  return shell({ title: 'What Reaches the Model Context', description: 'Human instructions and selected files reach assembled context; untouched filesystem content does not. Retrieved material is untrusted data. Tool results return to the model for human review.', width: 440, height: 760, body });
}

const outputSvg = kind === 'agent-loop' ? agentLoop() : kind === 'workflow' ? workflow() : context();
await writeFile(output, outputSvg);
