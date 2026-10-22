import {spawn,spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const build=spawnSync(process.execPath,['scripts/build-web.mjs'],{cwd:root,stdio:'inherit'});
if(build.status)process.exit(build.status);
const python=process.env.CHNAI_PYTHON??root+'.venv/bin/python';
if(!existsSync(python)){console.error('Run the Python setup steps in README.md first.');process.exit(1);}
const child=spawn(python,['-m','uvicorn','chnai_api.main:create_app','--factory','--app-dir','api/src','--host',process.env.CHNAI_HOST??'127.0.0.1','--port',process.env.PORT??'4173'],{cwd:root,stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??0));

child.on('error',()=>{console.error('The Python runtime could not start. Run npm run doctor and the README setup steps.');process.exit(1);});
