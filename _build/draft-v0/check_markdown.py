"""Check navigation and code fences for current draft Markdown."""
from pathlib import Path
import re,json,urllib.parse,hashlib
PROJECT=Path(__file__).resolve().parents[2]
ROOT=PROJECT.parents[1]
files=[PROJECT/x for x in ['COURSE.md','README.md','OMP.md','FACILITATOR.md','REVIEW.md','demo/README.md','_build/README.md']]
files += [ROOT/'README.md',ROOT/'30-resources/README.md',ROOT/'40-archive/2026-09-12-agentic-course-pre-v0/README.md']
errors=[];count=0
for f in files:
 text=f.read_text();fenced=False;visible=[]
 for line in text.splitlines():
  if line.startswith('```'):fenced=not fenced
  elif not fenced:visible.append(line)
 if fenced:errors.append(f'{f}: unclosed code fence')
 for label,target in re.findall(r'\[([^\]]+)\]\(([^)]+)\)','\n'.join(visible)):
  if re.match(r'^[a-zA-Z][a-zA-Z+.-]*:',target):continue
  path,_,anchor=target.partition('#');dest=(f.parent/urllib.parse.unquote(path)).resolve() if path else f
  count+=1
  if not dest.exists():errors.append(f'{f}: missing {target}')
  if anchor and dest.suffix=='.md' and dest.exists():
   headings=[re.sub(r'[^\w\- ]','',x.lower()).replace(' ','-') for x in re.findall(r'^#+\s+(.+)$',dest.read_text(),re.M)]
   if anchor not in headings:errors.append(f'{f}: missing anchor {target}')
assert not errors,'\n'.join(errors)
assert (PROJECT/'research/2026-09-12-deep-research-report.md').read_bytes()==Path('/Users/petar/Downloads/deep-research-report.md').read_bytes()
archive=ROOT/'40-archive/2026-09-12-agentic-course-pre-v0'
manifest=json.loads((archive/'move-manifest.json').read_text())
for row in manifest:
 assert hashlib.sha256((ROOT/row['new']).read_bytes()).hexdigest()==row['sha256_archived'],row['new']
summary={'markdown_files_checked':len(files),'local_links_checked':count,'errors':errors,'archive_files_verified':len(manifest),'supplied_report_byte_identical':True,'course_words':len((PROJECT/'COURSE.md').read_text().split()),'core_minutes':sum([30,90,90,90,90,90,120,60,120]),'optional_minutes':4*90}
(PROJECT/'_build/draft-v0/markdown-validation.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
