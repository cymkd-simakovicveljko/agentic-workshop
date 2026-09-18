"""One-time, collision-checked archival of superseded course WIP."""
from pathlib import Path
import hashlib,json,shutil,os,re
PROJECT=Path(__file__).resolve().parents[2]
ROOT=PROJECT.parents[1]
ARCHIVE=ROOT/'40-archive/2026-09-12-agentic-course-pre-v0'
assert not ARCHIVE.exists(), 'Archive exists: inspect rather than overwrite'
assert (PROJECT/'_build/draft-v0/course.md').is_file(), 'Draft must exist first'
items={'COURSE.md':'COURSE.md','agentic-engineering-foundations-course.md':'agentic-engineering-foundations-course.md','RESEARCH.md':'RESEARCH.md','SUGGESTIONS.md':'SUGGESTIONS.md','README.md':'project-readme.md','slides':'slides','_build/slides':'_build/slides','_build/demo':'_build/demo','_build/README.md':'_build/README.md'}
source_rows=json.loads((PROJECT/'_build/draft-v0/source-inventory.json').read_text())
expected={x['path']:x['sha256'] for x in source_rows}
records=[]
for old,new in items.items():
 src=PROJECT/old
 assert src.exists(), src
 for f in ([src] if src.is_file() else sorted(src.rglob('*'))):
  if not f.is_file():continue
  rel=str(f.relative_to(PROJECT)); sha=hashlib.sha256(f.read_bytes()).hexdigest()
  if rel in expected: assert sha==expected[rel], f'Source changed since review: {f}'
  records.append({'old':str(f.relative_to(ROOT)),'new':str((ARCHIVE/new/(f.relative_to(src) if src.is_dir() else Path())).relative_to(ROOT)),'sha256_before':sha})
ARCHIVE.mkdir(parents=True)
for old,new in items.items():
 dest=ARCHIVE/new; assert not dest.exists();dest.parent.mkdir(parents=True,exist_ok=True)
 shutil.move(str(PROJECT/old),str(dest))
for row in records:
 assert hashlib.sha256((ROOT/row['new']).read_bytes()).hexdigest()==row['sha256_before']
# Keep original Markdown bytes before repairing local links in reading copies.
for old,new in items.items():
 if not old.endswith('.md'):continue
 f=ARCHIVE/new; original=ARCHIVE/'before'/new;original.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,original)
 def fix(m):
  dest=m.group(2)
  if re.match(r'^[a-zA-Z][a-zA-Z+.-]*:',dest) or dest.startswith('#'):return m.group(0)
  path,sep,anchor=dest.partition('#');resolved=((PROJECT/old).parent/path).resolve()
  replacement=resolved
  for src_rel,dst_rel in sorted(items.items(),key=lambda x:len(x[0]),reverse=True):
   source=PROJECT/src_rel
   if resolved==source or (source.suffix=='' and source in resolved.parents):
    replacement=ARCHIVE/dst_rel/(resolved.relative_to(source) if resolved!=source else Path());break
  newdest=os.path.relpath(replacement,f.parent)+(sep+anchor if sep else '')
  return '['+m.group(1)+']('+newdest+')'
 f.write_text(re.sub(r'\[([^\]]+)\]\(([^)]+)\)',fix,f.read_text()))
for row in records:row['sha256_archived']=hashlib.sha256((ROOT/row['new']).read_bytes()).hexdigest()
(ARCHIVE/'move-manifest.json').write_text(json.dumps(records,indent=2)+'\n')
shutil.move(str(PROJECT/'_build/draft-v0/course.md'),str(PROJECT/'COURSE.md'))
print(f'Archived {len(records)} files with checksum verification; published COURSE.md')
