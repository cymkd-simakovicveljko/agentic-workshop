import {projects} from './projects.mjs';
import {filterProjects} from './filter.mjs';
const query = document.querySelector('#query');
const list = document.querySelector('#projects');
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
function render() {
  const visible = filterProjects(projects, query.value);
  list.replaceChildren(...visible.map(project => {
    const row = document.createElement('li');
    const owner = document.createElement('span');
    row.textContent = project.name;
    owner.className = 'owner'; owner.textContent = `Owner: ${project.owner}`;
    row.append(owner); return row;
  }));
  count.textContent = `${visible.length} of ${projects.length} projects`;
  empty.hidden = visible.length !== 0;
}
query.addEventListener('input', render);
render();
