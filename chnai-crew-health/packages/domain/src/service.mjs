// Local API adapter. The original tested domain engine remains the single rule owner.
import * as D from './domain.mjs';
import * as S from './simulation.mjs';

export const ACTORS=Object.freeze({crew:D.actorFor('crew'),primary:D.actorFor('onboard'),backup:D.actorFor('onboard','SIM-C03','SIM-A06'),ground:D.actorFor('ground'),technical:D.actorFor('technical')});
const subjectId='SIM-C03';
function actor(key){if(!Object.hasOwn(ACTORS,key))D.fail('Unknown fictional actor.','forbidden');return ACTORS[key];}
export function seed(){const state=S.createScenario('handover');state.simulation.running=true;S.advance(state,15);state.simulation.running=false;return state;}

export function project(state,key){
 const a=actor(key),read=D.canRead(state,a,subjectId);
 const common={version:state.version,actor:{...a,key},simulation:true,source:D.SOURCE,faults:D.clone(state.faults),reviewers:D.clone(state.operations.reviewers),clock:state.simulation?.elapsed??0,task:D.clone(state.operations.task),canRead:read,canEdit:D.ownsReview(state,a,subjectId)};
 if(a.role==='ground')return {...common,packets:D.groundPackets(state,a).map(p=>({id:p.id,hash:p.hash,bytes:p.bytes,payload:D.clone(p.payload),receipt:D.clone(p.receipt),groundReview:D.clone(p.groundReview)}))};
 if(a.role==='technical')return {...common,queue:state.packets.map(p=>({id:p.id,hash:p.hash,status:p.state,attempts:p.attempts,acknowledged:!!p.receipt})),counts:{records:state.records.length,episodes:state.episodes.length,events:state.events.length}};
 if(!read)return common;
 return {...common,comparison:D.comparison(state,subjectId),dependency:D.dependency(state,subjectId),episode:D.clone(D.episodeFor(state,subjectId)),review:D.clone(D.currentReview(state,subjectId)),records:state.records.filter(r=>r.subjectId===subjectId).map(D.clone),drafts:state.drafts.filter(d=>d.subjectId===subjectId&&!d.released).map(D.clone),packets:state.packets.filter(p=>p.subjectId===subjectId).map(D.clone)};
}

export function execute(state,key,c){
 const a=actor(key);
 switch(c.name){
  case 'fixture.import':return D.importFixture(state,a,subjectId);
  case 'review.request':return D.requestReview(state,a,subjectId);
  case 'assignment.offer':return D.offerHandover(state,a,subjectId,c.to,c.reason);
  case 'assignment.accept':return D.acceptReview(state,a,subjectId,c.assignmentId,c.expectedDependency);
  case 'review.record':return D.recordReview(state,a,subjectId,c);
  case 'assessment.correct':return D.correctAssessment(state,a,subjectId,c);
  case 'packet.preview':return D.previewPacket(state,a,subjectId,c);
  case 'packet.approve':return D.approvePacket(state,a,c.draftId,c.expectedHash);
  case 'packet.deliver':return D.deliverPacket(state,a,c.packetId);
  case 'ground.review':return D.recordGroundReview(state,a,c.packetId,c.note);
  case 'followup.complete':return D.resolveFollowUp(state,a,subjectId,c.followupId,c.outcome);
  case 'duty.set':return D.setReviewerAvailability(state,a,c.reviewerId,c.available);
  case 'link.set':
   if(a.role!=='technical')D.fail('Only the fictional technical operator can control links.','forbidden');
   if(!['earth','lan','node','grant'].includes(c.link)||typeof c.available!=='boolean')D.fail('Invalid link control.');
   state.faults[c.link]=c.available;return null;
  case 'scenario.step':
   if(a.role!=='technical')D.fail('Only the fictional technical operator can advance the scenario.','forbidden');
   state.simulation.running=true;try{return S.advance(state,c.seconds);}finally{state.simulation.running=false;}
  default:D.fail('Unknown command.');
 }
}
