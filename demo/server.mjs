import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const files = new Map([['/', ['index.html','text/html']],['/style.css',['style.css','text/css']],
  ['/app.mjs',['app.mjs','text/javascript']],['/filter.mjs',['filter.mjs','text/javascript']],
  ['/projects.mjs',['projects.mjs','text/javascript']]]);
export function createServer() {
  return http.createServer(async (req,res) => {
    const entry = files.get(new URL(req.url,'http://localhost').pathname);
    if (!entry || !['GET','HEAD'].includes(req.method)) {res.writeHead(404);res.end('Not found');return;}
    try {const data=await readFile(path.join(root,entry[0]));
      res.writeHead(200,{'Content-Type':entry[1]+'; charset=utf-8','Cache-Control':'no-store'});
      res.end(req.method==='HEAD' ? undefined : data);
    } catch {res.writeHead(500);res.end('Unable to read local asset');}
  });
}
if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const port=Number(process.env.PORT || 4173);
  createServer().listen(port,'127.0.0.1',()=>console.log(`Project directory: http://127.0.0.1:${port}`));
}
