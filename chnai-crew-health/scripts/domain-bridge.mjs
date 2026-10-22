// Bounded stdin/stdout process adapter; never executes supplied code or shell text.
import {seed,project,execute} from '../packages/domain/src/service.mjs';
let raw='';for await(const part of process.stdin){raw+=part;if(raw.length>4_000_000)throw Error('Bridge request too large.');}
try{
 const input=JSON.parse(raw);let result;
 if(input.operation==='seed')result={state:seed()};
 else if(input.operation==='view')result={view:project(input.state,input.actor)};
 else if(input.operation==='command'){execute(input.state,input.actor,input.command);input.state.version++;result={state:input.state,view:project(input.state,input.actor)};}
 else throw Error('Unknown bridge operation.');
 process.stdout.write(JSON.stringify({ok:true,...result}));
}catch(error){process.stdout.write(JSON.stringify({ok:false,error:{code:error.code??'invalid',message:error.message}}));}
