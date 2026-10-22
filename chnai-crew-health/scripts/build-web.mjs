import {cp, mkdir, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
await rm(root+'dist',{recursive:true,force:true});
await mkdir(root+'dist',{recursive:true});
for(const folder of ['web/public','web/src','packages/domain/src'])await cp(root+folder,root+'dist',{recursive:true});
console.log('Built web assets and the shared domain engine into dist/.');
