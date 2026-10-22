// Fixed parser boundary. Reads the two already-verified source texts, never paths or code.
import {inspectCBC,CBC_PARSER_VERSION} from '../packages/domain/src/cbc.mjs';
let raw='';
for await(const part of process.stdin){raw+=part;if(raw.length>1000000)throw Error('Research request exceeds its bound.');}
try{
 const input=JSON.parse(raw);
 if(!Array.isArray(input.texts)||input.texts.length!==2)throw Error('Two retained CBC sources are required.');
 const report=inspectCBC(...input.texts);
 process.stdout.write(JSON.stringify({ok:true,parserVersion:CBC_PARSER_VERSION,nodeVersion:process.versions.node,report}));
}catch(error){process.stdout.write(JSON.stringify({ok:false,error:'Research parsing failed: '+error.message}));}
