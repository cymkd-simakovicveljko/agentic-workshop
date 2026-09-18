export function filterProjects(projects, query) {
  const normalized = query.trim().toLowerCase();
  return projects.filter(project => project.name.toLowerCase().includes(normalized));
}
