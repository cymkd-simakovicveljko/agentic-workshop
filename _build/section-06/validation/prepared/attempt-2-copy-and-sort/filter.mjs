export function filterProjects(projects, query) {
  const normalized = query.trim().toLowerCase();
  return [...projects].sort((a, b) => a.name.localeCompare(b.name)).filter(project => project.name.toLowerCase().includes(normalized));
}
