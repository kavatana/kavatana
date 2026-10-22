import * as D from './domain.mjs';
import * as S from './simulation.mjs';
import {plot} from './views.mjs';

const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,primary=false,extra='')=>`<button class="btn ${primary?'primary':''}" data-action="${action}" ${extra}>${esc(label)} <span aria-hidden="true">→</span></button>`;
const tag=(label,tone='')=>`<span class="badge ${tone}">${esc(label)}</span>`;

export function responsibilityPanel({state,actor,subjectId='SIM-C03'}){
 const ep=D.episodeFor(state,subjectId),h=ep?.handover,owner=D.reviewerFor(state,ep?.owner),review=D.currentReview(state,subjectId);
 const candidate=D.reviewerFor(state,h?.to),canOffer=ep&&(actor.role==='crew'||ep.owner===actor.id);
 let title,description,action='';
 if(!ep){title='Request an onboard review';description='The crew member starts this context review. No reviewer has accepted responsibility.';
  if(actor.role==='crew')action=button('Request onboard review','request-review',true,D.comparison(state,subjectId).current?'':'disabled');
 }else if(h?.state==='offered'){
  title=owner?'Handover awaiting acceptance':'Awaiting an accepted owner';
  description=owner?`${owner.label} retains responsibility until ${candidate.label} accepts.`:`${candidate.label} has been offered this case. A roster assignment alone does not mean it has been accepted.`;
  if(actor.id===h.to&&actor.role==='onboard')action=button(candidate.available?'Accept responsibility':'Reviewer currently occupied','accept-review',true,`data-id="${esc(h.id)}" ${candidate.available?'':'disabled'}`);
  else action=button('Open '+candidate.label+' workspace','switch-reviewer',true,`data-id="${esc(h.to)}"`);
  if(h.dependency!==D.dependency(state,subjectId))description+=' Evidence changed after this offer. The sender must refresh the handover.';
 }else{
  title=owner?.available?'Responsibility accepted':'Owner is currently occupied';
  description=`${owner?.label??ep.owner} owns this review. ${ep.followUps.some(f=>f.state==='pending')?'Follow-up remains pending. ':review?'The follow-up outcome is recorded. ':''}${owner?.available?'An accepted owner can review the evidence.':'Ownership remains visible; it does not silently move to someone else.'}`;
  if(D.ownsReview(state,actor,subjectId))action=review?button('Open follow-up','go-care',true):button('Record onboard review','record-review',true);
  else if(owner)action=button('Open '+owner.label+' workspace','switch-reviewer',true,`data-id="${esc(owner.id)}"`);
 }
 return `<section class="panel ownership-panel"><div class="panel-heading"><h2>Review ownership</h2>${tag(ep?.acceptance?'Accepted owner':'Unaccepted',ep?.acceptance?'blue':'amber')}</div>
 <div class="ownership-main"><div class="owner-monogram">${esc((ep?.owner??'03').slice(-2))}</div><div><div class="eyebrow">${ep?.owner?'CURRENT OWNER':'NEXT RESPONSIBLE ACTOR'}</div><h3>${esc(ep?.owner??(ep?'Crew 03 · coordinate assignment':'Crew 03'))}</h3><p>${esc(owner?.assignment??'Crew responsibility remains until acceptance')}</p></div></div>
 <div class="ownership-content"><h3>${esc(title)}</h3><p>${esc(description)}</p>${h?.state==='offered'?`<div class="handover-reason"><strong>Handover reason</strong><p>${esc(h.reason)}</p></div>`:''}${action}${canOffer?`<div class="secondary-action">${button(h?.dependency!==D.dependency(state,subjectId)?'Refresh handover':'Request a different reviewer','offer-handover')}</div>`:''}</div>
 <div class="reviewer-roster">${state.operations.reviewers.map(r=>`<div><span class="roster-avatar">${esc(r.id.slice(-2))}</span><div><strong>${esc(r.label)} <small>${r.id===ep?.owner?'· current owner':''}</small></strong><span>${esc(r.assignment)}</span><span>${esc(r.duty)}</span></div>${tag(r.available?'Available':'Occupied',r.available?'':'amber')}</div>`).join('')}</div>
 <div class="scope-note">Fictional CMO qualification and care grants. The simulation role selector is not authentication.</div></section>`;
}

export function todayPage({state,actor,subjectId='SIM-C03'}){
 if(!D.canRead(state,actor,subjectId))return `<div class="page-heading"><div><div class="eyebrow">ASSIGNMENT SCOPE</div><h1>No active care relationship</h1><p>This reviewer has no accepted or offered assignment for Crew 03.</p></div></div><section class="panel empty"><h2>Use the assigned workspace</h2><p>Changing a simulation role does not automatically assign the case.</p>${button('Open Crew 03 workspace','switch-crew',true)}</section>`;
 const r=D.comparison(state,subjectId),ep=D.episodeFor(state,subjectId),review=D.currentReview(state,subjectId),pending=ep?.followUps.filter(f=>f.state==='pending')??[];
 const packet=state.packets.findLast(p=>p.subjectId===subjectId),sim=state.simulation;
 const stages=[
  ['Assessment',r.current?'Source retained':'Waiting for input',!!r.current],
  ['Responsibility',ep?.acceptance?'Accepted':ep?'Acceptance needed':'Not requested',!!ep?.acceptance],
  ['Context review',review?'Recorded':ep?'Requested':'Not requested',!!review],
  ['Follow-up',pending.length?`${pending.length} owned task`:review?'Outcome recorded':'Not assigned',!!review&&!pending.length]
 ];
 const quality=!r.current?'Input not yet received':!r.evaluable?'Context unresolved':'Structural checks complete';
 return `<div class="page-heading mission-heading"><div><div class="eyebrow">CREW 03 / MISSION DAY 030 / FICTIONAL TRANSIT</div><h1>One assessment. A clear next step.</h1><p>Evidence, mission context and the person responsible for follow-through.</p></div>${button('Replay assessment day','load-scenario',false,'data-id="handover"')}</div>
 <section class="task-strip" aria-label="Current task context"><div class="task-index">030<span>MISSION DAY</span></div><div class="task-title"><span class="eyebrow">CURRENT TASK · SIM-TASK-030</span><h2>${esc(state.operations.task.title)}</h2><p>${esc(state.operations.task.phase)} · Crew 03 / systems engineer</p></div><div class="task-resource"><span>Assessment recorder</span><strong>${sim?.recorder===false?'Unavailable':sim?.buffered?'Input buffered':r.current?'Record retained':'Awaiting intake'}</strong><small>Fictional adapter · no flight API</small></div></section>
 <ol class="episode-rail" aria-label="Episode progress">${stages.map(([label,status,done],i)=>`<li class="${done?'complete':''}"><span class="rail-mark">${done?'✓':String(i+1).padStart(2,'0')}</span><div><strong>${label}</strong><small>${esc(status)}</small></div></li>`).join('')}</ol>
 <div class="mission-grid"><div class="stack"><section class="panel episode-evidence"><div class="brief-card-top"><div><div class="eyebrow">ASSESSMENT / ORIGINAL EVIDENCE</div><h2>${!r.current?'Waiting for the completed record':r.evaluable?'A change to review':'Comparison withheld'}</h2><p>${r.evaluable?'Two discrete assessments · mL/min/kg':r.current?esc(r.missing.join(' · ')):'Run or step the scenario to import the fictional assessment.'}</p></div>${r.evaluable?`<div class="retained"><strong>${esc(r.percent)}<small>%</small></strong><span>of selected pre-mission baseline</span></div>`:tag('Awaiting context','amber')}</div>
 ${r.evaluable?plot(r):`<div class="episode-empty"><span aria-hidden="true">—</span><h3>${r.current?'Source record preserved':'Acquisition is pending'}</h3><p>${r.current?'A number without reliable identity, method and baseline cannot support this comparison.':'An unreceived record is not a normal result.'}</p>${button(r.current?'Inspect input checks':'Open replay controls',r.current?'evidence-detail':'go-lab')}</div>`}
 <div class="quality-strip"><div><span>Input quality</span><strong>${esc(quality)}</strong></div><div><span>Uncertainty</span><strong>Not specified</strong></div><div><span>Clinical applicability</span><strong>Unreviewed</strong></div></div>
 <div class="evidence-source"><a href="${D.SOURCE.url}" target="_blank" rel="noopener noreferrer">NASA-STD-3001 / V1 4003 ↗</a><span>In-mission aerobic capacity ≥ 80% of pre-mission capacity</span></div>
 <div class="scope-note">Fictional arithmetic and assumed method comparability. This is not a diagnosis, acute alert or fitness-for-duty decision.</div>
 <div class="episode-actions">${button('Inspect original evidence','evidence-detail')}${actor.role==='onboard'&&D.ownsReview(state,actor,subjectId)&&r.current?button('Append correction','correct'):''}</div></section>
 <section class="panel operation-summary"><div class="panel-heading"><h2>Follow-through</h2><span class="muted">Care and transport keep separate states</span></div><div class="operation-columns"><div><div class="eyebrow">ONBOARD FOLLOW-UP</div><h3>${pending.length?`${pending.length} pending task`:review?'Outcome recorded':'Awaiting context review'}</h3><p>${pending.length?esc(pending[0].owner+' · '+pending[0].trigger):review?'Completion records the observed check. It does not declare the crew healthy.':'The accepted reviewer records a follow-up owner and due event.'}</p>${button('Review episode','go-care')}</div><div><div class="eyebrow">EARTH SUPPORT</div><h3>${packet?packet.groundReview?'Ground review recorded':packet.receipt?'Received · review pending':sim?.transit[packet.id]?'In transit · receipt pending':'Approved packet queued':'No approved packet'}</h3><p>${packet?esc(packet.id)+' · exact approved snapshot retained.':'Only an approved evidence snapshot enters the transmission queue.'} ${sim?'Acknowledgement is modeled with a 60-second virtual delay.':'No real communication link is connected.'}</p>${button('Inspect handoff','go-transfer')}</div></div></section>
 </div><div class="stack">${responsibilityPanel({state,actor,subjectId})}<section class="panel automation-summary"><div class="eyebrow">AUTOMATION STATUS</div><h3>${sim?.running?'Replay running':sim?'Replay paused':'Ready for a scenario'}</h3><p>Automatic: intake, duplicate detection and approved-packet retry.<br>Human: acceptance, review, release and outcome.</p><div class="automation-clock">${sim?'+'+S.clockLabel(sim.elapsed):'NO LIVE FEED'}<span>synthetic event time</span></div><div class="card-actions">${sim?button(sim.running?'Pause replay':'Run replay','toggle-replay'):button('Load assessment day','load-scenario',false,'data-id="handover"')}${sim&&!sim.running?button('+15 seconds','step-replay'):''}</div></section></div></div>
 <div class="coverage-summary"><strong>Monitoring coverage</strong><span>Cardiovascular: ${r.evaluable?'one fictional fitness comparison':r.current?'comparison withheld':'awaiting input'}</span><span>Immune: separate research only</span><span>Bone / muscle: no crew input</span><span>Behavior / sleep: no crew input</span></div>`;
}

export function staffingControls(state){return `<section class="panel staffing-controls"><div class="panel-heading"><h2>Reviewer duty simulation</h2>${tag('Metadata only')}</div><div class="panel-pad">${state.operations.reviewers.map(r=>`<div class="toggle-row"><div><strong>${esc(r.label)} · ${esc(r.assignment)}</strong><p>${esc(r.duty)} · qualification is fictional</p></div><button class="toggle ${r.available?'on':'off'}" data-action="reviewer-duty" data-id="${esc(r.id)}" aria-pressed="${r.available}">${r.available?'Available':'Occupied'}</button></div>`).join('')}</div><div class="scope-note">Changing duty availability never transfers care responsibility.</div></section>`;}
