export const SCHEMA=2;
export function eventTime(state){return state.simulation?new Date(Date.UTC(2026,0,1)+state.simulation.elapsed*1000).toISOString():new Date().toISOString();}

export const SOURCE={id:'NASA-STD-3001 / V1 4003',url:'https://www.nasa.gov/reference/4-0-human-performance/',label:'In-mission aerobic capacity',fraction:'0.80',state:'Clinical applicability unreviewed'};
export const SUBJECTS=[
 {id:'SIM-C01',label:'Crew 01',role:'Commander',baseline:'50',current:'41'},
 {id:'SIM-C02',label:'Crew 02',role:'Mission specialist',medicalAssignment:'CMO (fictional)',baseline:null,current:'40'},
 {id:'SIM-C03',label:'Crew 03',role:'Systems engineer',baseline:'50',current:'39'},
 {id:'SIM-C04',label:'Crew 04',role:'Science specialist',baseline:'50',current:'39',unit:'L/min'},
 {id:'SIM-C05',label:'Crew 05',role:'Pilot',baseline:'50',current:'40'},
 {id:'SIM-C06',label:'Crew 06',role:'Exercise coordinator',medicalAssignment:'Backup CMO (fictional)',baseline:'50',current:'39.995'},
];
export const LABELS={crew:'Crew member',onboard:'Onboard reviewer',ground:'Ground reviewer',technical:'Technical operator'};
export const SOURCES=[SOURCE,{id:'NASA-STD-3001 / V1 6002–6003',url:'https://www.nasa.gov/reference/6-0-medical-operations/',label:'Private and delayed medical communication'}, {id:'NASA-STD-3001 / V2 10113, 10153, 10161–10164',url:'https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/',label:'Crew interfaces and automation responsibility'}, {id:'NASA Spaceflight Standard Measures',url:'https://www.nasa.gov/reference/standard-measures/',label:'Longitudinal measurement domains'}, {id:'CSA Bio-Monitor',url:'https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp',label:'Wearable, tablet and docking workflow; no flight API connected'}];
export function fail(message,code='invalid'){const e=new Error(message);e.code=code;throw e;}
export const clone=x=>JSON.parse(JSON.stringify(x));
export function decimal(x){
 if(typeof x!=='string'||!/^\d{1,9}(\.\d{1,9})?$/.test(x))return null;
 const [a,b='']=x.split('.');return {n:BigInt(a+b),d:10n**BigInt(b.length)};
}
function measurement(s,kind,value,unit='mL/min/kg'){
 return {id:`${s.id}-${kind}-r1`,subjectId:s.id,namespace:'SIM-CHNAI-01',missionId:'SIM-TRANSIT-01',kind,revision:1,quantity:'aerobic_capacity',value,unit,method:'SIM-CPET-DIRECT-1',time:kind==='baseline'?'L-30':'MET+030d',timeBasis:'Scenario-relative time; UTC unavailable',uncertainty:'Not specified',provenance:'simulated_operational',clinicalApproval:false,qualification:'structural_demo_only'};
}
export function createOperations(){return {
 task:{id:'SIM-TASK-030',subjectId:'SIM-C03',title:'Scheduled aerobic-capacity assessment',phase:'Post-assessment context review',resource:'SIM-ASSESSMENT-RECORDER',provenance:'Fictional task context; not a NASA schedule'},
 reviewers:[
  {id:'SIM-A02',label:'Crew 02',assignment:'Primary onboard reviewer',qualification:'fictional_cmo',subjects:['SIM-C03'],available:true,duty:'Available for context review'},
  {id:'SIM-A06',label:'Crew 06',assignment:'Backup onboard reviewer',qualification:'fictional_cmo',subjects:['SIM-C03'],available:true,duty:'Planning and exercise coordination'}
 ],version:1
};}
export function createState({intake=false}={}){
 const records=[];for(const s of SUBJECTS){if(s.baseline!==null)records.push(measurement(s,'baseline',s.baseline));if(!(intake&&s.id==='SIM-C03'))records.push(measurement(s,'current',s.current,s.unit));}
 return {schema:SCHEMA,version:0,nextId:1,records,episodes:[],drafts:[],packets:[],events:[],imports:[],operations:createOperations(),faults:{earth:false,lan:true,node:true,grant:true},explanation:'deterministic_template',createdAt:new Date().toISOString()};
}
export function migrateState(input){
 const s=clone(input);if(s.schema===SCHEMA)return s;
 if(s.schema!==1)fail('Stored mock data has an unsupported format.');
 s.schema=SCHEMA;s.operations=createOperations();
 for(const ep of s.episodes){
  ep.owner=ep.owner??'SIM-A02';ep.ownershipRevision=0;ep.acceptance=null;
  ep.handover={id:id(s,'ASSIGN'),from:ep.owner,to:ep.owner,state:'offered',reason:'Existing v0.5 responsibility requires explicit acceptance',dependency:dependency(s,ep.subjectId),requestedBy:ep.requestedBy,time:eventTime(s)};
  ep.assignmentHistory=[];
 }
 for(const d of s.drafts)if(!d.released)d.stale=true;
 return s;
}
export function actorFor(role,subjectId='SIM-C03',reviewerId='SIM-A02'){return {role,subjectId,id:role==='crew'?subjectId.replace('C','A'):role==='onboard'?reviewerId:role==='ground'?'SIM-GROUND-01':'SIM-TECH-01'};}
export function reviewerFor(state,id){return state.operations?.reviewers.find(r=>r.id===id)??null;}
export function canRead(state,actor,sid){
 if(actor.role==='crew')return actor.subjectId===sid;
 const reviewer=reviewerFor(state,actor.id),ep=episodeFor(state,sid);
 return !!(actor.role==='onboard'&&state.faults.grant&&reviewer?.subjects.includes(sid)&&(ep?(ep.owner===actor.id||(ep.handover?.state==='offered'&&ep.handover.to===actor.id)):actor.id==='SIM-A02'));
}
export function activeRecords(state,sid){return ['baseline','current'].map(kind=>state.records.filter(r=>r.subjectId===sid&&r.kind===kind).sort((a,b)=>b.revision-a.revision)[0]??null);}
export function comparison(state,sid){
 const [baseline,current]=activeRecords(state,sid);
 const checks=[['Current assessment',!!current],['Selected preflight baseline',!!baseline],['Same fictional subject',!!baseline&&!!current&&baseline.subjectId===current.subjectId],['Same simulation namespace',!!baseline&&!!current&&baseline.namespace==='SIM-CHNAI-01'&&current.namespace===baseline.namespace],['Same mission context',!!baseline&&!!current&&baseline.missionId==='SIM-TRANSIT-01'&&current.missionId===baseline.missionId],['Fictional demonstration provenance',!!baseline&&!!current&&baseline.provenance==='simulated_operational'&&current.provenance===baseline.provenance],['Same quantity',!!baseline&&!!current&&baseline.quantity==='aerobic_capacity'&&current.quantity===baseline.quantity],['Compatible units',!!baseline&&!!current&&baseline.unit==='mL/min/kg'&&current.unit===baseline.unit],['Comparable demo method',!!baseline&&!!current&&baseline.method==='SIM-CPET-DIRECT-1'&&current.method===baseline.method]];
 const b=decimal(baseline?.value),c=decimal(current?.value);
 checks.push(['Valid positive capacity values',!!b&&!!c&&b.n>0n&&c.n>0n]);
 checks.push(['Fictional wearer binding',!!current&&current.wearerBinding!=='unconfirmed']);
 const missing=checks.filter(x=>!x[1]).map(x=>x[0]);
 if(missing.length)return {baseline,current,checks,missing,evaluable:false,below:null,percent:null,clinicalStatus:'Unreviewed'};
 const numerator=c.n*b.d*10000n;const denominator=c.d*b.n;
 const hundredths=(numerator*2n+denominator)/(2n*denominator);
 const percent=(Number(hundredths)/100).toFixed(2).replace(/\.00$/,'');
 const below=c.n*b.d*100n < b.n*c.d*80n;
 return {baseline,current,checks,missing,evaluable:true,below,percent,clinicalStatus:'Unreviewed',source:SOURCE};
}
export function dependency(state,sid){const r=comparison(state,sid);return canonical({subjectId:sid,baseline:r.baseline?.id??null,current:r.current?.id??null,source:SOURCE.id,policy:'SIM-POLICY-0.1'});}
export function episodeFor(state,sid){return state.episodes.find(e=>e.subjectId===sid)??null;}
function id(state,prefix){return `${prefix}-${String(state.nextId++).padStart(3,'0')}`;}
function log(state,code,subjectId,actor,detail){state.events.push({id:id(state,'EVT'),code,subjectId,actor:actor.id,detail,time:eventTime(state)});}
export function requireLocal(state){if(!state.faults.node)fail('The simulated local node is unavailable. This action has not been saved.','node_offline');if(!state.faults.lan)fail('The simulated device link is unavailable. This action has not been saved.','lan_offline');}
function readGuard(state,actor,sid){requireLocal(state);if(!canRead(state,actor,sid))fail('This simulation role has no care relationship for this crew member.','forbidden');}
function onboardGuard(state,actor,sid='SIM-C03'){readGuard(state,actor,sid);if(actor.role!=='onboard')fail('Use the assigned onboard reviewer simulation role.','forbidden');}
export function ownsReview(state,actor,sid){const ep=episodeFor(state,sid),r=reviewerFor(state,actor.id);return !!(canRead(state,actor,sid)&&actor.role==='onboard'&&ep?.owner===actor.id&&ep.acceptance&&r?.available&&r.qualification==='fictional_cmo');}
function ownerGuard(state,actor,sid){onboardGuard(state,actor,sid);if(!ownsReview(state,actor,sid))fail('An available assigned reviewer must explicitly accept responsibility first.','ownership_required');}
function invalidatePreviews(state,sid){for(const d of state.drafts)if(d.subjectId===sid&&!d.released)d.stale=true;}
export function offerHandover(state,actor,sid,to,reason){
 readGuard(state,actor,sid);const ep=episodeFor(state,sid);if(!ep)fail('Request a review before assigning responsibility.');
 if(!((actor.role==='crew'&&actor.subjectId===sid)||(actor.role==='onboard'&&ep.owner===actor.id)))fail('Only the crew member or current owner can request reassignment.','forbidden');
 const target=reviewerFor(state,to);if(!target||!target.subjects.includes(sid)||target.qualification!=='fictional_cmo')fail('No configured qualified care relationship for this recipient.','forbidden');
 if(!reason?.trim()||reason.length>500)fail('Record a handover reason under 500 characters.');
 if(ep.handover?.state==='offered'&&ep.handover.to===to&&ep.handover.dependency===dependency(state,sid))return ep.handover;
 if(ep.handover)ep.assignmentHistory.push(clone(ep.handover));
 ep.handover={id:id(state,'ASSIGN'),from:ep.owner,to,state:'offered',reason:reason.trim(),dependency:dependency(state,sid),requestedBy:actor.id,time:eventTime(state)};
 log(state,'handover_offered',sid,actor,'Responsibility offered to '+to+'; acceptance pending');return ep.handover;
}
export function acceptReview(state,actor,sid,assignmentId,expectedDependency){
 onboardGuard(state,actor,sid);const ep=episodeFor(state,sid),h=ep?.handover,r=reviewerFor(state,actor.id);
 if(!h||h.id!==assignmentId||h.to!==actor.id)fail('This assignment is not addressed to the current reviewer.','forbidden');
 if(expectedDependency!==dependency(state,sid)||h.dependency!==expectedDependency)fail('Evidence changed. Request an updated handover before accepting.','stale');
 if(!r.available||r.qualification!=='fictional_cmo')fail('This reviewer is unavailable or lacks the configured qualification.','unavailable');
 if(h.state==='accepted')return h;
 h.state='accepted';h.acceptedAt=eventTime(state);ep.owner=actor.id;ep.acceptance={assignmentId:h.id,actor:actor.id,time:h.acceptedAt};ep.ownershipRevision++;
 for(const f of ep.followUps.filter(f=>f.state==='pending')){f.assignmentHistory??=[];f.assignmentHistory.push({from:f.owner,to:actor.id,assignmentId:h.id,time:h.acceptedAt});f.owner=actor.id;}
 invalidatePreviews(state,sid);log(state,'responsibility_accepted',sid,actor,'Accepted review and pending follow-up responsibility');return h;
}
export function setReviewerAvailability(state,actor,reviewerId,available){
 requireLocal(state);if(actor.role!=='technical')fail('Use the technical simulation controls.','forbidden');
 const r=reviewerFor(state,reviewerId);if(!r)fail('Reviewer not configured.');r.available=!!available;r.duty=r.available?'Available for context review':'Occupied with a separate mission task';state.operations.version++;
 log(state,'duty_changed',null,actor,reviewerId+' duty availability changed');return r;
}
export function requestReview(state,actor,sid){
 readGuard(state,actor,sid);if(actor.role!=='crew')fail('Only the crew member can make this request.','forbidden');
 if(sid!=='SIM-C03')fail('An onboard reviewer is configured for Crew 03 in this demonstration.','assignment_missing');
 const old=episodeFor(state,sid);if(old)return old;
 const e={id:id(state,'REV'),subjectId:sid,state:'requested',requestedBy:actor.id,dependency:dependency(state,sid),reviews:[],followUps:[],owner:null,acceptance:null,ownershipRevision:0,assignmentHistory:[],handover:null};
 state.episodes.push(e);log(state,'review_requested',sid,actor,'Requested onboard assessment-context review');offerHandover(state,actor,sid,'SIM-A02','Initial onboard review request');return e;
}
export function recordReview(state,actor,sid,{note,trigger,expectedDependency}){
 ownerGuard(state,actor,sid);const e=episodeFor(state,sid);if(!e)fail('No review request is available.');
 if(expectedDependency!==dependency(state,sid))fail('The assessment changed. Reload the evidence before recording this review.','stale');
 if(!note?.trim()||!trigger?.trim())fail('A review note and follow-up trigger are required.');
 if(note.length>1000||trigger.length>300)fail('Keep the review note under 1,000 characters and trigger under 300.');
 const old=e.reviews.find(r=>r.dependency===expectedDependency);if(old)return old;
 const r={id:id(state,'DISP'),dependency:expectedDependency,actor:actor.id,note:note.trim(),disposition:'Assessment context requires clarification',time:eventTime(state)};
 e.reviews.push(r);e.dependency=expectedDependency;e.state='reviewed';
 e.followUps.push({id:id(state,'FOLLOW'),owner:actor.id,trigger:trigger.trim(),state:'pending',outcome:null,reviewId:r.id,assignmentHistory:[]});
 log(state,'onboard_review_recorded',sid,actor,'Recorded context review and assigned follow-up');return r;
}
export function currentReview(state,sid){const e=episodeFor(state,sid);return e?.reviews.findLast(r=>r.dependency===dependency(state,sid))??null;}
export function resolveFollowUp(state,actor,sid,fid,outcome){
 ownerGuard(state,actor,sid);const f=episodeFor(state,sid)?.followUps.find(f=>f.id===fid);if(!f)fail('Follow-up not found.');
 if(f.owner!==actor.id)fail('Only the assigned owner can record this outcome.','forbidden');
 if(!outcome?.trim())fail('Record the follow-up outcome.');if(outcome.length>1000)fail('Keep the outcome under 1,000 characters.');
 if(f.state==='complete')return f;
 f.state='complete';f.outcome=outcome.trim();f.completedAt=eventTime(state);invalidatePreviews(state,sid);log(state,'follow_up_completed',sid,actor,'Owner recorded a follow-up outcome');return f;
}
export function correctAssessment(state,actor,sid,{value,unit,reason,expectedCurrentId}){
 ownerGuard(state,actor,sid);const [,cur]=activeRecords(state,sid);if(!cur||cur.id!==expectedCurrentId)fail('The assessment version changed. Reopen the correction.','stale');
 const n=decimal(value);if(!n||n.n<=0n)fail('Enter a positive plain decimal value.');
 if(!['mL/min/kg','L/min'].includes(unit))fail('Select a supported demonstration unit.');
 if(!reason?.trim())fail('A correction reason is required.');
 const next={...clone(cur),id:`${sid}-current-r${cur.revision+1}`,revision:cur.revision+1,value,unit,reason:reason.trim(),supersedes:cur.id,correctedAt:eventTime(state)};state.records.push(next);
 const e=episodeFor(state,sid);if(e)e.state='needs_review';
 for(const d of state.drafts)if(d.subjectId===sid&&!d.released)d.stale=true;
 for(const p of state.packets)if(p.subjectId===sid)p.historical=true;
 log(state,'assessment_corrected',sid,actor,'Appended a revision; previous reviews and packets retained');return next;
}
export function importFixture(state,actor,sid,kind='primary'){
 readGuard(state,actor,sid);if(kind!=='primary')fail('Unknown fictional fixture.');const key=`fixture:${sid}:${kind}`;const old=state.imports.find(x=>x.key===key);if(old)return {...old,duplicate:true};
 const exists=activeRecords(state,sid)[1];
 if(!exists){const source=SUBJECTS.find(s=>s.id===sid);if(!source)fail('Fictional subject not found.');state.records.push(measurement(source,'current',source.current,source.unit));}
 const item={id:id(state,'IMPORT'),key,status:exists?'duplicate':'accepted',accepted:exists?0:1,quarantined:0,duplicates:exists?1:0,sourceMode:'fictional completed assessment',time:eventTime(state)};
 state.imports.push(item);log(state,'fixture_replayed',sid,actor,'Replayed the retained fictional assessment without duplicating its revision');return item;
}
function packetContext(state,sid){const ep=episodeFor(state,sid);return canonical({owner:ep?.owner,ownershipRevision:ep?.ownershipRevision,reviewId:currentReview(state,sid)?.id,pending:ep?.followUps.filter(f=>f.state==='pending'),task:state.operations.task});}
export function previewPacket(state,actor,sid,{question='',includeNote=true}={}){
 ownerGuard(state,actor,sid);const r=comparison(state,sid),review=currentReview(state,sid);if(!r.evaluable)fail('Resolve the assessment context before creating this comparison packet.');if(!review)fail('Record an onboard review of the current evidence first.');
 if(question.length>500)fail('Keep the ground question under 500 characters.');
 const pending=clone(episodeFor(state,sid).followUps.filter(f=>f.state==='pending'));
 const context=packetContext(state,sid),basis=canonical({dependency:dependency(state,sid),context,reviewId:review.id,question:question.trim(),includeNote,pending});
 const prior=state.drafts.findLast(d=>d.basis===basis&&!d.stale);if(prior)return prior;
 const packetId=id(state,'PKT');const payload={schema:'chnai-mock-packet/1',packetId,simulation:true,recipient:'SIM-GROUND-01',purpose:'Review assessment context and comparison applicability',subjectId:sid,namespace:'SIM-CHNAI-01',mission:'SIM-TRANSIT-01',assessment:{baseline:clone(r.baseline),current:clone(r.current)},comparison:{percentOfBaseline:r.percent,referenceFraction:'0.80',relation:r.below?'below_reference':'at_or_above_reference',clinicalApplicability:'Unreviewed',uncertainty:'Not specified'},source:clone(SOURCE),onboardDisposition:review.disposition,onboardNote:includeNote?review.note:null,question:question.trim(),followUp:pending};
 payload.schema='chnai-mock-packet/2';payload.workflowContext={task:clone(state.operations.task),owner:episodeFor(state,sid).owner,acceptedAssignment:clone(episodeFor(state,sid).acceptance),qualification:'Fictional CMO assignment; operational qualification unverified'};
 const bytes=canonical(payload),d={id:id(state,'DRAFT'),packetId,subjectId:sid,basis,context,dependency:dependency(state,sid),payload,bytes,hash:sha256(bytes),stale:false,released:false};
 state.drafts.push(d);log(state,'packet_previewed',sid,actor,'Prepared an exact simulated packet for approval');return d;
}
export function approvePacket(state,actor,did,expectedHash){
 const d=state.drafts.find(x=>x.id===did);if(!d)fail('Preview not found.');ownerGuard(state,actor,d.subjectId);
 const old=state.packets.find(p=>p.id===d.packetId);if(old)return old;
 if(d.stale||d.dependency!==dependency(state,d.subjectId)||d.context!==packetContext(state,d.subjectId)||!currentReview(state,d.subjectId))fail('The preview is stale. Review the current evidence and prepare a new packet.','stale');
 if(d.hash!==expectedHash||sha256(d.bytes)!==d.hash||canonical(d.payload)!==d.bytes)fail('The preview changed. Approval requires a new preview.','hash_conflict');
 const p={id:d.packetId,subjectId:d.subjectId,payload:clone(d.payload),bytes:d.bytes,hash:d.hash,approvedBy:actor.id,approvedAt:eventTime(state),state:'queued',receipt:null,groundReview:null,historical:false,attempts:0};
 d.released=true;state.packets.push(p);log(state,'packet_released',d.subjectId,actor,'Approved the exact packet; queued in this browser');return p;
}
export function deliverPacket(state,actor,pid){
 requireLocal(state);if(!['onboard','technical'].includes(actor.role))fail('Use the reviewer or technical simulation role.','forbidden');
 const p=state.packets.find(p=>p.id===pid);if(!p)fail('Packet not found.');if(!state.faults.earth)fail('The simulated Earth link is disconnected. Packet remains queued.','earth_offline');
 if(sha256(p.bytes)!==p.hash||canonical(p.payload)!==p.bytes)fail('Packet integrity check failed. No receipt recorded.','hash_conflict');
 if(p.receipt)return p;p.attempts++;p.state='received';p.receipt={packetId:p.id,hash:p.hash,recipient:'SIM-GROUND-01',receivedAt:eventTime(state),simulation:true};
 log(state,'packet_received',p.subjectId,actor,'Simulated receiver acknowledged exact bytes; medical review still pending');return p;
}
export function groundPackets(state,actor){if(actor.role!=='ground')return [];return state.packets.filter(p=>p.receipt&&p.payload.recipient===actor.id);}
export function recordGroundReview(state,actor,pid,note){
 requireLocal(state);const p=groundPackets(state,actor).find(p=>p.id===pid);if(!p)fail('This role has no received packet to review.','forbidden');
 if(!note?.trim())fail('Record a ground review note.');if(note.length>1000)fail('Keep the note under 1,000 characters.');
 if(p.groundReview)return p;p.groundReview={actor:actor.id,packetId:p.id,hash:p.hash,note:note.trim(),disposition:'Context review recorded',reviewedAt:eventTime(state),simulation:true};
 log(state,'ground_review_recorded',p.subjectId,actor,'Recorded simulated review of this packet snapshot');return p;
}
export function canonical(value){if(value===null||typeof value!=='object')return JSON.stringify(value);if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}';}
// SHA-256 over UTF-8. The same exact preview string is approved and retained.
// No crypto.subtle dependency, so the browser-local mock also works on a local preview.
export function sha256(message){
 const b=new TextEncoder().encode(message),len=b.length,words=[];for(let i=0;i<len;i++)words[i>>2]=(words[i>>2]??0)|(b[i]<<(24-(i%4)*8));
 words[len>>2]=(words[len>>2]??0)|(0x80<<(24-(len%4)*8));const end=(((len+9+63)>>6)<<4);while(words.length<end)words.push(0);words[end-2]=Math.floor(len*8/4294967296);words[end-1]=len*8>>>0;
 const K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
 const H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];const ro=(x,n)=>(x>>>n)|(x<<(32-n));
 for(let p=0;p<words.length;p+=16){const W=words.slice(p,p+16);for(let i=16;i<64;i++){const x=W[i-15],y=W[i-2];W[i]=((ro(x,7)^ro(x,18)^(x>>>3))+W[i-16]+(ro(y,17)^ro(y,19)^(y>>>10))+W[i-7])>>>0;}
  let [a,b,c,d,e,f,g,h]=H;for(let i=0;i<64;i++){const t1=(h+(ro(e,6)^ro(e,11)^ro(e,25))+((e&f)^(~e&g))+K[i]+W[i])>>>0;const t2=((ro(a,2)^ro(a,13)^ro(a,22))+((a&b)^(a&c)^(b&c)))>>>0;h=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;}[a,b,c,d,e,f,g,h].forEach((v,i)=>H[i]=(H[i]+v)>>>0);
 }
 return H.map(v=>v.toString(16).padStart(8,'0')).join('');
}
