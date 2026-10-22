import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from '../../dist/domain.mjs';
import * as S from '../../dist/simulation.mjs';
import * as M from '../../dist/mission.mjs';

const sid='SIM-C03',crew=D.actorFor('crew'),primary=D.actorFor('onboard'),backup=D.actorFor('onboard',sid,'SIM-A06'),tech=D.actorFor('technical');
const request=s=>D.requestReview(s,crew,sid);
const accept=(s,a=primary)=>D.acceptReview(s,a,sid,D.episodeFor(s,sid).handover.id,D.dependency(s,sid));
const review=(s,a=primary)=>D.recordReview(s,a,sid,{note:'Check source method and unknown uncertainty.',trigger:'When source context is verified',expectedDependency:D.dependency(s,sid)});
const offer=(s,to='SIM-A06')=>D.offerHandover(s,crew,sid,to,'Primary reviewer is occupied.');
function accepted(){const s=D.createState();request(s);accept(s);return s;}

test('An offer grants scoped inspection but does not silently accept responsibility',()=>{
 const s=D.createState();request(s);assert.equal(s.episodes[0].owner,null);
 assert.equal(D.canRead(s,primary,sid),true);assert.equal(D.canRead(s,backup,sid),false);
 assert.throws(()=>review(s),{code:'ownership_required'});
 offer(s);assert.equal(s.episodes[0].owner,null);assert.equal(D.canRead(s,backup,sid),true);assert.equal(D.canRead(s,primary,sid),false);
 assert.throws(()=>review(s,backup),{code:'ownership_required'});
});
test('Occupied, wrong recipient and unqualified reviewers cannot accept',()=>{
 const s=S.createScenario('handover');request(s);
 assert.throws(()=>accept(s),{code:'unavailable'});assert.throws(()=>accept(s,backup),{code:'forbidden'});
 offer(s);s.operations.reviewers[1].qualification='unverified';assert.throws(()=>accept(s,backup),{code:'unavailable'});
 assert.equal(s.episodes[0].owner,null);
});
test('Backup acceptance is idempotent and owns the resulting follow-up',()=>{
 const s=S.createScenario('handover');s.simulation.running=true;S.advance(s,15);request(s);offer(s);accept(s,backup);accept(s,backup);review(s,backup);
 assert.equal(s.episodes[0].owner,'SIM-A06');assert.equal(s.episodes[0].ownershipRevision,1);
 assert.equal(s.events.filter(e=>e.code==='responsibility_accepted').length,1);
 assert.equal(s.episodes[0].followUps[0].owner,'SIM-A06');assert.equal(D.canRead(s,primary,sid),false);
});
test('Pending handover retains original owner; acceptance moves only unfinished tasks',()=>{
 const s=accepted();review(s);const f=s.episodes[0].followUps[0];
 offer(s);assert.equal(s.episodes[0].owner,'SIM-A02');assert.equal(f.owner,'SIM-A02');
 accept(s,backup);assert.equal(f.owner,'SIM-A06');assert.equal(f.assignmentHistory[0].from,'SIM-A02');
 assert.throws(()=>D.resolveFollowUp(s,primary,sid,f.id,'Complete'),{code:'forbidden'});
 D.resolveFollowUp(s,backup,sid,f.id,'Context checked; no clinical conclusion.');
 offer(s,'SIM-A02');accept(s,primary);assert.equal(f.owner,'SIM-A06');assert.equal(f.state,'complete');
});
test('Evidence revision during a pending handover requires a renewed offer',()=>{
 const s=accepted();offer(s);const old=s.episodes[0].handover.id;
 D.correctAssessment(s,primary,sid,{value:'40',unit:'mL/min/kg',reason:'Synthetic correction',expectedCurrentId:'SIM-C03-current-r1'});
 assert.throws(()=>accept(s,backup),{code:'stale'});offer(s);assert.notEqual(s.episodes[0].handover.id,old);accept(s,backup);assert.equal(s.episodes[0].owner,'SIM-A06');
});
test('Handover invalidates unreleased previews without altering approved bytes',()=>{
 const s=accepted();review(s);const a=D.previewPacket(s,primary,sid,{question:'Released'}),p=D.approvePacket(s,primary,a.id,a.hash),bytes=p.bytes;
 const b=D.previewPacket(s,primary,sid,{question:'Unreleased'});offer(s);accept(s,backup);
 assert.equal(b.stale,true);assert.equal(p.bytes,bytes);assert.equal(p.payload.workflowContext.owner,'SIM-A02');
 assert.throws(()=>D.approvePacket(s,backup,b.id,b.hash),{code:'stale'});
 const c=D.previewPacket(s,backup,sid);assert.equal(c.payload.workflowContext.owner,'SIM-A06');assert.equal(c.payload.followUp[0].owner,'SIM-A06');
});
test('Completing a follow-up invalidates a preview that still says pending',()=>{
 const s=accepted();review(s);const d=D.previewPacket(s,primary,sid);
 D.resolveFollowUp(s,primary,sid,s.episodes[0].followUps[0].id,'Source context checked.');
 assert.throws(()=>D.approvePacket(s,primary,d.id,d.hash),{code:'stale'});
 assert.deepEqual(D.previewPacket(s,primary,sid).payload.followUp,[]);
});
test('Availability controls do not transfer ownership or grant access',()=>{
 const s=accepted();D.setReviewerAvailability(s,tech,'SIM-A02',false);
 assert.equal(s.episodes[0].owner,'SIM-A02');assert.equal(D.canRead(s,backup,sid),false);
 assert.throws(()=>review(s),{code:'ownership_required'});
 assert.throws(()=>D.setReviewerAvailability(s,crew,'SIM-A02',true),{code:'forbidden'});
});
test('Revoked grant and local failures block assignment acceptance',()=>{
 for(const [fault,code] of [['grant','forbidden'],['lan','lan_offline'],['node','node_offline']]){
  const s=D.createState();request(s);s.faults[fault]=false;assert.throws(()=>accept(s),{code});assert.equal(s.episodes[0].owner,null);
 }
});
test('Unconfirmed wearer stays non-evaluable and cannot enter a comparison packet',()=>{
 const s=S.createScenario('binding');s.simulation.running=true;S.advance(s,15);const r=D.comparison(s,sid);
 assert.equal(r.current.value,'39');assert.equal(r.evaluable,false);assert.ok(r.missing.includes('Fictional wearer binding'));
 request(s);accept(s);review(s);assert.throws(()=>D.previewPacket(s,primary,sid),/Resolve the assessment context/);
});
test('Recorder outage after receipt preserves historical evidence rather than erasing it',()=>{
 const s=S.createScenario();s.simulation.running=true;S.advance(s,15);s.simulation.recorder=false;
 assert.equal(D.comparison(s,sid).percent,'78');assert.equal(D.comparison(s,sid).current.time,'MET+030d');
});
test('Migration preserves old packets and notes without inventing prior acceptance',()=>{
 const s=accepted();review(s);const d=D.previewPacket(s,primary,sid),p=D.approvePacket(s,primary,d.id,d.hash),bytes=p.bytes;
 s.schema=1;delete s.operations;for(const ep of s.episodes){delete ep.acceptance;delete ep.handover;delete ep.assignmentHistory;delete ep.ownershipRevision;}
 const migrated=D.migrateState(s);assert.equal(migrated.schema,2);assert.equal(migrated.packets[0].bytes,bytes);assert.equal(migrated.episodes[0].acceptance,null);
 assert.equal(migrated.episodes[0].reviews.length,1);assert.throws(()=>review(migrated),{code:'ownership_required'});accept(migrated);assert.equal(migrated.episodes[0].owner,'SIM-A02');
 assert.equal(s.schema,1);assert.equal(s.operations,undefined);
});
test('Serialization retains accepted handover, exact packet and owned pending work',()=>{
 const s=S.createScenario('handover');s.simulation.running=true;S.advance(s,15);request(s);offer(s);accept(s,backup);review(s,backup);
 const d=D.previewPacket(s,backup,sid),p=D.approvePacket(s,backup,d.id,d.hash),restored=D.migrateState(JSON.parse(JSON.stringify(s)));
 assert.equal(restored.episodes[0].acceptance.actor,'SIM-A06');assert.equal(restored.episodes[0].followUps[0].owner,'SIM-A06');assert.equal(restored.packets[0].bytes,p.bytes);
 S.advance(restored,75);S.advance(restored,60);assert.ok(restored.packets[0].receipt);assert.equal(restored.episodes[0].followUps[0].state,'pending');
});
test('Mission UI withholds the percentage for unresolved input and blocks unrelated reviewer',()=>{
 const s=S.createScenario('binding');s.simulation.running=true;S.advance(s,15);
 const html=M.todayPage({state:s,actor:crew});assert.match(html,/Comparison withheld/);assert.doesNotMatch(html,/<strong>78/);
 assert.match(M.todayPage({state:s,actor:backup}),/No active care relationship/);
});
