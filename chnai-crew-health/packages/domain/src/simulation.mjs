import * as D from './domain.mjs';
export const SCENARIOS=[
 {id:'handover',title:'Assessment day · reviewer occupied',description:'A completed assessment arrives while the primary reviewer is on another duty. The backup must accept responsibility.',value:'39',unit:'mL/min/kg',inputAt:15,reconnectAt:90,expected:'No silent transfer. Explicit backup acceptance, owned follow-up and a delayed packet.'},
 {id:'binding',title:'An unconfirmed wearer',description:'A completed record arrives with unresolved wearer binding. The numeric comparison must stay withheld.',value:'39',unit:'mL/min/kg',inputAt:15,reconnectAt:90,expected:'Preserve source evidence; do not infer whose assessment it is.'},
 {id:'nominal',title:'A change to review',description:'A completed assessment arrives, a duplicate is recognized, and Earth returns.',value:'39',unit:'mL/min/kg',inputAt:15,reconnectAt:90,expected:'78% of baseline; a human owns review and follow-up.'},
 {id:'normal',title:'No threshold crossing',description:'A comparable fictional result stays above the selected reference.',value:'41',unit:'mL/min/kg',inputAt:15,reconnectAt:90,expected:'82% of baseline; no below-reference status. This is not a clean bill of health.'},
 {id:'unit',title:'An incompatible unit',description:'The incoming assessment has a different raw unit. No conversion is guessed.',value:'39',unit:'L/min',inputAt:15,reconnectAt:90,expected:'Comparison withheld; preserve the original measurement.'},
 {id:'baseline',title:'The missing baseline',description:'An assessment arrives without a selected personal baseline.',value:'39',unit:'mL/min/kg',inputAt:15,reconnectAt:90,expected:'Not evaluable. Missing evidence is never a normal result.'},
 {id:'buffer',title:'A recorder reconnects',description:'The fictional recorder is unavailable until +00:45. Its completed record then arrives.',value:'39',unit:'mL/min/kg',inputAt:45,reconnectAt:120,expected:'Acquisition gap remains visible; original measurement time is retained.'},
 {id:'lan',title:'A local link fails',description:'The device-to-node connection fails before intake, then returns at +00:45.',value:'39',unit:'mL/min/kg',inputAt:15,reconnectAt:120,expected:'Buffer the input. Import it once after local recovery.'}
];
export function createScenario(id='nominal'){
 const spec=SCENARIOS.find(x=>x.id===id);if(!spec)throw Error('Unknown scenario.');
 const s=D.createState({intake:true});if(id==='handover'){s.operations.reviewers[0].available=false;s.operations.reviewers[0].duty='Habitat maintenance · unable to accept review';}s.createdAt='2026-01-01T00:00:00.000Z';
 if(id==='baseline')s.records=s.records.filter(r=>!(r.subjectId==='SIM-C03'&&r.kind==='baseline'));
 s.simulation={id,elapsed:0,running:false,inputDone:false,duplicateDone:false,ended:false,recorder:id!=='buffer',buffered:false,deliveryDelay:60,transit:{},events:[{at:0,label:'Scenario initialized. Earth unavailable; local service ready.',kind:'start'}],clockOrigin:'Synthetic event clock. Not observation UTC.'};return s;
}
const event=(s,label,kind='info')=>s.simulation.events.push({at:s.simulation.elapsed,label,kind});
export function advance(state,seconds=15){
 const sim=state.simulation;if(!sim||!sim.running)return false;
 if(!Number.isFinite(seconds)||seconds<0||seconds>300)throw Error('Unsupported clock increment.');
 const spec=SCENARIOS.find(x=>x.id===sim.id);if(!spec)throw Error('Unknown scenario state.');
 sim.elapsed+=seconds;let changed=false;
 if(spec.id==='lan'&&sim.elapsed>=10&&sim.elapsed<45&&state.faults.lan){state.faults.lan=false;event(state,'Local device link unavailable. Input will remain buffered.','fault');changed=true;}
 if(spec.id==='lan'&&sim.elapsed>=45&&!sim.lanRestored){state.faults.lan=true;sim.lanRestored=true;event(state,'Local link restored. Buffered input can be qualified.','recovery');changed=true;}
 if(spec.id==='buffer'&&sim.elapsed>=45&&!sim.recorderRestored){sim.recorder=true;sim.recorderRestored=true;event(state,'Recorder reconnected; retained assessment is available.','recovery');changed=true;}
 if(sim.elapsed>=spec.inputAt&&!sim.inputDone){
  if(!state.faults.lan||!state.faults.node||!sim.recorder){if(!sim.buffered){event(state,'Assessment waiting at adapter. No authoritative import yet.','buffer');sim.buffered=true;changed=true;}}
  else{
   D.importFixture(state,D.actorFor('crew'),'SIM-C03');const current=D.activeRecords(state,'SIM-C03')[1];
   current.value=spec.value;current.unit=spec.unit;if(spec.id==='binding')current.wearerBinding='unconfirmed';current.acquiredBy='SIM-REPLAY-ADAPTER';
   sim.inputDone=true;sim.buffered=false;event(state,'Completed fictional assessment imported. Source time and method retained.','input');changed=true;
  }
 }
 if(sim.inputDone&&!sim.duplicateDone&&sim.elapsed>=spec.inputAt+15&&state.faults.lan&&state.faults.node){D.importFixture(state,D.actorFor('crew'),'SIM-C03');sim.duplicateDone=true;event(state,'Duplicate delivery recognized. No additional assessment created.','dedup');changed=true;}
 if(sim.elapsed>=spec.reconnectAt&&!sim.earthRestored){state.faults.earth=true;sim.earthRestored=true;event(state,'Simulated Earth link restored. Released packets may enter transit.','link');changed=true;}
 for(const p of state.packets.filter(p=>!p.receipt)){
  if(!state.faults.earth||!state.faults.lan||!state.faults.node){if(sim.transit[p.id]){delete sim.transit[p.id];event(state,'Transmission interrupted; packet retained for retry.','buffer');changed=true;}continue;}
  if(!sim.transit[p.id]){sim.transit[p.id]={startedAt:sim.elapsed,dueAt:sim.elapsed+sim.deliveryDelay};event(state,'Released packet entered simulated transit. Acknowledgement is still pending.','sent');changed=true;}
  else if(sim.elapsed>=sim.transit[p.id].dueAt){
   try{D.deliverPacket(state,D.actorFor('technical'),p.id);event(state,'Simulated acknowledgement received. Ground review and follow-up remain separate.','receipt');}
   catch(err){sim.running=false;event(state,'Packet delivery blocked: '+err.message,'fault');}
   changed=true;
  }
 }
 return changed;
}
export function clockLabel(t=0){const s=Math.floor(t);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}

// Independent expected outcomes are fixed here; production functions only supply actual results.
function assert(ok,message){if(!ok)throw Error(message);}
function expectError(fn,code){let err;try{fn();}catch(e){err=e;}assert(err&&(!code||err.code===code),'Expected operation to be rejected: '+(code??'invalid'));}
const crew=D.actorFor('crew'),reviewer=D.actorFor('onboard'),ground=D.actorFor('ground');
function reviewed(){const s=createScenario();D.importFixture(s,crew,'SIM-C03');D.requestReview(s,crew,'SIM-C03');D.acceptReview(s,reviewer,'SIM-C03',D.episodeFor(s,'SIM-C03').handover.id,D.dependency(s,'SIM-C03'));D.recordReview(s,reviewer,'SIM-C03',{note:'Synthetic method-context review.',trigger:'After context verification',expectedDependency:D.dependency(s,'SIM-C03')});return s;}
function released(){const s=reviewed(),draft=D.previewPacket(s,reviewer,'SIM-C03'),packet=D.approvePacket(s,reviewer,draft.id,draft.hash);return {s,draft,packet};}
export const CHECKS=[
 {id:'S01',name:'No false threshold crossing',run(){const s=D.createState(),r=D.comparison(s,'SIM-C01');assert(r.percent==='82'&&r.below===false,'82% must not be below the reference.');assert(s.episodes.length===0,'A measurement must not invent a care action.');}},
 {id:'S02',name:'Known baseline comparison',run(){const r=D.comparison(D.createState(),'SIM-C03');assert(r.percent==='78'&&r.below===true,'Expected exact 78% below reference.');}},
 {id:'S03',name:'Boundary and decimal precision',run(){const s=D.createState();assert(D.comparison(s,'SIM-C05').below===false,'Exact 80% is not below.');assert(D.comparison(s,'SIM-C06').percent==='79.99'&&D.comparison(s,'SIM-C06').below,'79.99% must remain below.');}},
 {id:'S04',name:'Missing or incompatible evidence',run(){const s=D.createState();assert(!D.comparison(s,'SIM-C02').evaluable&&!D.comparison(s,'SIM-C04').evaluable,'Both contexts must withhold comparison.');}},
 {id:'S08',name:'Repeated input is idempotent',run(){const s=D.createState({intake:true});D.importFixture(s,crew,'SIM-C03');D.importFixture(s,crew,'SIM-C03');assert(s.records.filter(r=>r.subjectId==='SIM-C03'&&r.kind==='current').length===1,'One logical current assessment required.');}},
 {id:'S10',name:'Earth outage preserves responsibility',run(){const {s,packet}=released();expectError(()=>D.deliverPacket(s,reviewer,packet.id),'earth_offline');assert(packet.receipt===null&&s.episodes[0].followUps[0].state==='pending','Outage cannot imply delivery or close care.');}},
 {id:'S11',name:'Local link blocks false writes',run(){const s=D.createState();s.faults.lan=false;expectError(()=>D.requestReview(s,crew,'SIM-C03'),'lan_offline');assert(s.episodes.length===0,'Rejected write must not create an episode.');}},
 {id:'S12',name:'Serialization preserves pending work',scope:'Browser-state serialization only; not a real crash/backup qualification.',run(){const {s,packet}=released(),restored=JSON.parse(JSON.stringify(s));assert(restored.packets[0].bytes===packet.bytes&&restored.episodes[0].followUps[0].state==='pending','Exact packet and pending responsibility must survive serialization.');}},
 {id:'S13',name:'Correction preserves released evidence',run(){const {s,packet}=released(),before=packet.bytes;D.correctAssessment(s,reviewer,'SIM-C03',{value:'40',unit:'mL/min/kg',reason:'Synthetic correction',expectedCurrentId:'SIM-C03-current-r1'});assert(packet.bytes===before&&packet.payload.assessment.current.value==='39'&&D.currentReview(s,'SIM-C03')===null,'Historical packet immutable; current evidence requires new review.');}},
 {id:'S14',name:'Receipt does not complete care',run(){const {s,packet}=released();s.faults.earth=true;D.deliverPacket(s,reviewer,packet.id);assert(!packet.groundReview&&s.episodes[0].followUps[0].state==='pending','Receipt cannot mean clinical review.');D.recordGroundReview(s,ground,packet.id,'Synthetic ground review.');assert(s.episodes[0].followUps[0].state==='pending','Ground review cannot silently close follow-up.');}},
 {id:'S15',name:'Revoked grant blocks release',run(){const s=reviewed(),draft=D.previewPacket(s,reviewer,'SIM-C03');s.faults.grant=false;expectError(()=>D.approvePacket(s,reviewer,draft.id,draft.hash),'forbidden');assert(s.packets.length===0,'No release after revoked grant.');}},
 {id:'S20',name:'Altered packet is rejected',scope:'Payload integrity only; not complete security or backup testing.',run(){const {s,packet}=released();packet.bytes+=' ';s.faults.earth=true;expectError(()=>D.deliverPacket(s,reviewer,packet.id),'hash_conflict');assert(packet.receipt===null,'Tampered packet cannot receive acknowledgement.');}}
];
export function runChecks(){return CHECKS.map(c=>{try{c.run();return {id:c.id,name:c.name,status:'passed',scope:c.scope??'Deterministic domain contract; not clinical or hardware validation'};}catch(err){return {id:c.id,name:c.name,status:'failed',message:err.message,scope:c.scope??'Domain contract'};}});}
