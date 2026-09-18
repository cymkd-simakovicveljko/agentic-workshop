import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'));
const cfg=JSON.parse(await readFile('harness.json','utf8'));await mkdir('.runs',{recursive:true});
const stateFile='.runs/progress.json';
let s;try{s=JSON.parse(await readFile(stateFile,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
const cmd=process.argv[2]||'status';
async function save(){await writeFile(stateFile+'.tmp',JSON.stringify(s,null,2)+'\n');await rename(stateFile+'.tmp',stateFile);}
if(cmd==='begin') {
 if(s) await writeFile(`.runs/history-${Date.now()}.json`,JSON.stringify(s,null,2));
 s={startedAt:Date.now(),checks:0,repeats:0,status:'unfinished',completed:[],next:'Implement public/filter.mjs from accepted spec',humanAccepted:false};await save();
} else if(cmd==='status') {console.log(JSON.stringify(s||{status:'not-started'},null,2));}
else if(cmd==='check') {
 if(!s) throw Error('Run node scripts/harness.mjs begin first');
 if(s.status==='running-check') {s.status='interrupted';s.next='Previous check interrupted. Inspect log, begin a reviewed retry budget.';await save();process.exit(3);}
 if(s.checks>=cfg.maxChecks || s.repeats>=cfg.maxRepeatedFailure || Date.now()-s.startedAt>cfg.wallBudgetMs) {
  s.status='stopped-budget';s.next='Human inspect evidence, revise plan, then begin a new budget if justified.';await save();console.log(s.next);process.exit(3);
 }
 s.checks++;s.status='running-check';s.humanAccepted=false;s.lastLog=`.runs/check-${s.startedAt}-${s.checks}.log`;await save();
 const r=spawnSync(process.execPath,['--test','--test-reporter=tap','tests/baseline.test.mjs','tests/filter.test.mjs'],{encoding:'utf8',timeout:cfg.checkTimeoutMs});
 const output=(r.stdout||'')+(r.stderr||'')+(r.error?String(r.error):'');await writeFile(s.lastLog,output);
 const failures=output.split('\n').filter(l=>/^not ok/.test(l)).join('\n') || String(r.error||r.status);
 const sig=createHash('sha256').update(failures).digest('hex');
 s.repeats=r.status===0?0:(sig===s.failureSignature?s.repeats+1:1);s.failureSignature=r.status===0?null:sig;
 s.status=r.status===0?'checks-passed-awaiting-review':'failed';
 s.completed=r.status===0?['Automated behavior and HTTP checks passed']:[];
 s.next=r.status===0?'Human inspect UI, diff, tests and spec; record acceptance separately.':'Read '+s.lastLog+'; fix implementation without weakening accepted tests.';
 s.exitCode=r.status;s.checkedAt=new Date().toISOString();s.sourceSHA256=createHash('sha256').update(await readFile('public/filter.mjs')).digest('hex');
 await save();console.log(output);console.log(s.next);process.exit(r.status===0?0:1);
} else if(cmd==='accept') {
 if(s?.status!=='checks-passed-awaiting-review')throw Error('Passing checks required first');
 const hash=createHash('sha256').update(await readFile('public/filter.mjs')).digest('hex');
 if(hash!==s.sourceSHA256)throw Error('Implementation changed since checks; run check again');
 const note=process.argv.slice(3).join(' ');if(!note)throw Error('Supply reviewer name and review evidence');
 s.humanAccepted=true;s.review=note;s.status='accepted';s.next='Update completion record and archive reviewed change';await save();
} else if(cmd!=='begin')throw Error('Use begin|status|check|accept');
