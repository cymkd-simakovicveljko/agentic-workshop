export function filterProjects(projects, query) {
  // Prepared defect: surrounding whitespace is not removed.
  const normalized = query.toLowerCase();
  return projects.filter(project => project.name.toLowerCase().includes(normalized));
}
