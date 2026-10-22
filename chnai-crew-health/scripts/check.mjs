import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
async function check(path){for(const e of await readdir(path,{withFileTypes:true})){const p=path+'/'+e.name;if(e.isDirectory())await check(p);else if(p.endsWith('.mjs')){const r=spawnSync(process.execPath,['--check',p],{stdio:'inherit'});if(r.status)process.exit(r.status);}}}
for(const path of ['web/src','packages/domain/src','scripts','tests/unit'])await check(path);
console.log('JavaScript syntax checks passed.');
