// Durable local mode. Every authoritative mutation passes through the API.
import {plot} from './views.mjs';
import {ACTOR_LABELS,createLocalClient,captureFields,restoreFields} from './local-client.mjs';
const app=document.querySelector('#app'),notice=document.querySelector('#notifications');
const actors=ACTOR_LABELS;
let storage;try{storage=sessionStorage;}catch{}
const client=createLocalClient({storage,onChange:()=>render()});
let {actor,data,busy,message,isError,pending,storageIssue,connection}=client.state;
let page='today';
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(label,action,extra='',kind='primary')=>`<button class="btn ${kind}" data-action="${action}" ${extra} ${busy||(!['refresh','evidence'].includes(action)&&(pending||storageIssue))?'disabled':''}>${e(label)}</button>`;
const panel=(title,body)=>`<section class="panel local-pad"><h2>${e(title)}</h2>${body}</section>`;
const field=(label,name,max=1000)=>`<label>${label}<textarea name="${name}" maxlength="${max}" required></textarea></label>`;
const form=(id,fields,label)=>`<form class="local-form" data-command="${id}"><fieldset ${busy||pending||storageIssue?'disabled':''}>${fields}<button class="btn primary">${label}</button></fieldset></form>`;
const meta=rows=>`<dl class="local-meta">${rows.map(([k,v])=>`<dt>${e(k)}</dt><dd>${e(v??'—')}</dd>`).join('')}</dl>`;
const stamp=()=>`API revision ${data.version} · SQLite committed state`;

const refresh=()=>client.refresh();
const formKey=f=>JSON.stringify([f.dataset.command,...[...f.elements].filter(el=>el.type==='hidden').map(el=>[el.name,el.value])]);
function preserveForms(){return [...document.querySelectorAll('form[data-command]')].map(f=>({key:formKey(f),fields:captureFields(f.elements),open:!!f.closest('details')?.open}));}
function restoreForms(forms){for(const saved of forms){const f=[...document.querySelectorAll('form[data-command]')].find(f=>formKey(f)===saved.key);if(!f)continue;restoreFields(f.elements,saved.fields);if(saved.open&&f.closest('details'))f.closest('details').open=true;}}
async function send(command,retry=false){
 const forms=preserveForms();
 const saved=await client.send(command,retry);
 if(!saved&&data&&(data.canRead||actor==='ground'))restoreForms(forms);
}
function ownership(){
 const ep=data.episode,offer=ep?.handover,owner=ep?.owner;
 let content=meta([['Accepted owner',owner??'Awaiting acceptance'],['Offered to',offer?.to??'No request'],['Evidence',ep?.state??'Ready for review']]);
 if(actor==='crew'&&!ep)content+=button('Request onboard review','request');
 if(ep&&(actor==='crew'||data.canEdit))content+=`<details><summary class="local-summary">Offer responsibility to another reviewer</summary>${form('offer',`<label>Reviewer<select name="to"><option value="SIM-A06">Crew 06 · backup</option><option value="SIM-A02">Crew 02 · primary</option></select></label>${field('Why is reassignment needed?','reason',500)}`,'Offer responsibility')}</details>`;
 if(['primary','backup'].includes(actor)&&offer?.to===data.actor.id&&offer.state==='offered')content+=button('Accept responsibility','accept','', 'primary');
 content+=`<p class="local-small">An offer does not transfer ownership. The recipient must accept. Primary reviewer: ${e(data.reviewers.find(r=>r.id==='SIM-A02')?.duty??'Availability unknown')}.</p>`;
 return panel('Review responsibility',content);
}
function care(){
 let content='';
 if(data.review)content+=`<p class="local-note">${e(data.review.note)}</p><p class="local-small">Recorded by ${e(data.review.actor)} · ${e(data.review.disposition)}</p>`;
 if(data.canEdit&&!data.review)content+=form('review',field('Assessment context to review','note')+field('Follow up when…','trigger',300),'Record context review');
 for(const f of data.episode?.followUps??[])content+=`<div class="local-log"><strong>${e(f.id)} · ${e(f.state)}</strong><p>${e(f.trigger)}</p>${meta([['Owner',f.owner],['Outcome',f.outcome??'Awaiting an observed outcome']])}${f.state==='pending'&&data.canEdit?form('followup',`<input type="hidden" name="followupId" value="${e(f.id)}">${field('Observed follow-up outcome','outcome')}`,'Record outcome'):''}</div>`;
 if(!content)content='<p class="local-small">An accepted onboard reviewer records the context question and owns the follow-up. No care completion is inferred from delivery.</p>';
 return panel('Accountable follow-up',content);
}
function handoff(){
 let content='';
 if(data.canEdit&&data.review)content+=`<details><summary class="local-summary">Prepare an exact ground handoff</summary>${form('preview',`<label>Question for ground<textarea name="question" maxlength="500"></textarea></label><label><span><input type="checkbox" name="includeNote" style="width:auto"> Include the onboard review note</span></label>`,'Prepare preview')}</details>`;
 const draft=data.drafts?.findLast(d=>!d.stale);
 if(draft)content+=`<div class="local-log"><strong>Unreleased preview · ${e(draft.id)}</strong><p>To SIM-GROUND-01 · ${e(draft.payload.purpose)}</p><p class="local-small">${draft.payload.onboardNote?'Includes onboard review note.':'Onboard note excluded.'} The snapshot includes evidence, owner and pending follow-up.</p><div class="local-hash">SHA-256 ${e(draft.hash)}</div><details><summary class="local-summary">Inspect exact payload</summary><pre class="local-code">${e(draft.bytes)}</pre></details>${data.canEdit?button('Approve exact packet','approve',`data-id="${e(draft.id)}" data-hash="${e(draft.hash)}"`):''}</div>`;
 for(const p of data.packets??[])content+=`<div class="local-log"><strong>${e(p.id)} · ${p.receipt?'Acknowledged':'Awaiting receipt'}</strong><p class="local-small">${p.groundReview?'Ground review recorded.':'Ground review pending.'} ${p.historical?'Released snapshot predates a local correction.':''}</p><div class="local-hash">${e(p.hash)}</div><details><summary class="local-summary">Inspect approved evidence</summary><pre class="local-code">${e(p.bytes)}</pre></details></div>`;
 return panel('Ground handoff',content||'<p class="local-small">A reviewed assessment can be packaged for ground. Earth is disconnected. Approved packets remain in the durable local queue.</p>');
}
function evidence(){
 const c=data.comparison;
 return panel('Evidence and applicability',`<div class="local-provenance"><div>${meta([['Source',data.source.id],['Personal baseline',c.baseline?.id],['Current revision',c.current?.id],['Method',c.current?.method],['Original time',c.current?.time],['Time basis',c.current?.timeBasis],['Uncertainty',c.current?.uncertainty]])}<a class="local-source" href="${e(data.source.url)}" target="_blank" rel="noopener noreferrer">Read NASA V1 4003 ↗</a></div><ul class="local-checks">${c.checks.map(([label,pass])=>`<li><span>${e(label)}</span><b>${pass?'Present':'Missing / incompatible'}</b></li>`).join('')}</ul></div><p class="local-small">NASA supplies the reference. The crew, completed assessment, reviewer assignments and scenario are authored simulation fixtures. Method comparability and clinical applicability remain unqualified.</p>${data.canEdit?`<details><summary class="local-summary">Append a corrected assessment revision</summary>${form('correct',`<label>Corrected value<input name="value" required inputmode="decimal" pattern="[0-9]+(\\.[0-9]+)?"></label><label>Original unit<select name="unit"><option>mL/min/kg</option><option>L/min</option></select></label>${field('Reason for correction','reason')}`,'Save a new revision')}</details>`:''}`);
}
function crewPage(){
 if(!data.canRead)return panel('No current care relationship','<p>This reviewer has no offered or accepted assignment for Crew 03. No medical records were returned by the API.</p>');
 const c=data.comparison,ep=data.episode;
 const steps=[['Gather',!!c.current],['Accept responsibility',!!ep?.acceptance],['Review context',!!data.review],['Follow through',!!ep?.followUps.length&&ep.followUps.every(f=>f.state==='complete')]];
 const hero=panel('Completed aerobic-capacity assessment',`<div class="local-hero-row"><div><div class="local-eyebrow">Retained capacity · selected personal baseline</div><div class="local-metric"><strong>${c.evaluable?e(c.percent)+'%':'—'}</strong><span>${c.evaluable?'of baseline':'Comparison withheld'}</span></div><p class="local-unit">${c.current?e(c.current.value)+' '+e(c.current.unit):'Current assessment missing'} · selected baseline ${e(c.baseline?.value??'missing')} ${e(c.baseline?.unit??'')}</p></div><span class="badge amber">${c.evaluable&&c.below?'Context review needed':'Applicability unreviewed'}</span></div>${c.evaluable?plot(c):'<p>Resolve the source context before comparing values.</p>'}<p class="local-small">Reference: NASA V1 4003, ≥ 80% of preflight baseline. This arithmetic does not establish diagnosis or fitness for duty.</p>`);
 const header=`<div class="local-sequence">${steps.map(([label,done],i)=>`<div class="${done?'complete':''}"><b>0${i+1}</b>${label}</div>`).join('')}</div>`;
 if(page==='evidence')return evidence();
 if(page==='handoff')return handoff();
 if(page==='followup')return care();
 return header+`<div class="local-layout"><div class="local-stack">${hero}${care()}</div><div class="local-stack">${ownership()}${handoff()}${panel('Source and context',`<a class="local-source" href="${e(data.source.url)}" target="_blank" rel="noopener noreferrer">NASA-STD-3001 · V1 4003 ↗</a><p class="local-small">Original time, method, unit and revision stay attached to the observation. Uncertainty is unspecified.</p>${button('Inspect evidence','evidence','','')}`)}</div></div>`;
}
function groundPage(){return panel('Received evidence snapshots',(data.packets??[]).map(p=>`<div class="local-log"><strong>${e(p.id)} · ${e(p.payload.subjectId)}</strong>${meta([['Received hash',p.hash],['Retained capacity',p.payload.comparison.percentOfBaseline+'%'],['Accepted owner',p.payload.workflowContext.owner],['Question',p.payload.question||'No additional question']])}<p class="local-note">${e(p.payload.onboardNote??'Note excluded by sender.')}</p><details><summary class="local-summary">Inspect received payload</summary><pre class="local-code">${e(p.bytes)}</pre></details>${p.groundReview?`<p class="local-note">Ground review: ${e(p.groundReview.note)}</p>`:form('ground',`<input type="hidden" name="packetId" value="${e(p.id)}">${field('Ground context review','note')}`,'Record ground review')}<p class="local-small">Reviewing this snapshot does not close onboard follow-up.</p></div>`).join('')||'<div class="local-empty"><h2>No packets received</h2><p>Unsent onboard records and local corrections are not visible here.</p></div>');}
function technicalPage(){return `<div class="local-layout"><div class="local-stack">${panel('Local service and communication',meta([['Database','SQLite · single local API owner'],['Scenario clock','+'+data.clock+' seconds'],['Earth link',data.faults.earth?'Connected (simulated)':'Disconnected (simulated)']])+`<div class="local-actions">${button(data.faults.earth?'Disconnect Earth':'Connect Earth','earth')}${button('Advance 15 seconds','step','','')}</div><p class="local-small">Only already-approved packets can move through simulated transit. Acknowledgement waits 60 scenario seconds after transmission begins.</p>`)}${panel('Packet queue',`<table class="local-queue"><thead><tr><th>Packet</th><th>State</th><th>Attempts</th></tr></thead><tbody>${data.queue.map(p=>`<tr><td>${e(p.id)}</td><td>${e(p.status)}</td><td>${p.attempts}</td></tr>`).join('')||'<tr><td colspan="3">No released packets</td></tr>'}</tbody></table><p class="local-small">Metadata only. No measurement values, questions or medical notes are returned to this role.</p>`)}</div><div class="local-stack">${panel('Duty availability',data.reviewers.map(r=>`<div class="local-log"><strong>${e(r.label)} · ${e(r.assignment)}</strong><p class="local-small">${e(r.duty)}</p>${button(r.available?'Mark occupied':'Mark available','duty',`data-id="${e(r.id)}" data-available="${!r.available}"`,'')}</div>`).join(''))}${panel('Failure controls',`<div class="local-actions">${['lan','node','grant'].map(link=>button((data.faults[link]?'Disable ':'Restore ')+link,'fault',`data-link="${link}"`,'')).join('')}</div><p class="local-small">These simulate unavailable local services and a revoked care relationship. They do not power off the actual host.</p>`)}</div></div>`;}
const actorSelector=()=>`<label class="sr-only" for="local-actor">Fictional actor</label><select id="local-actor" ${busy||pending?'disabled':''}>${Object.entries(actors).map(([key,label])=>`<option value="${key}" ${actor===key?'selected':''}>${e(label)}</option>`).join('')}</select>`;
const recovery=()=>`${storageIssue?`<div class="local-status error" role="status">${e(storageIssue)}</div>`:''}${pending?`<div class="local-status error" role="status">A command has an unconfirmed outcome for ${e(actors[pending.actor])}. <button class="btn" data-action="retry" ${busy?'disabled':''}>Retry same command</button></div>`:''}`;
function render(){
 ({actor,data,busy,message,isError,pending,storageIssue,connection}=client.state);
 notice.textContent=busy?(connection==='connecting'?'Loading workspace…':'Saving…'):'';
 if(!data){app.innerHTML=`<main class="main local-unavailable" id="main" aria-busy="${busy}"><div class="local-eyebrow">CHNAI · Fictional local simulation</div><h1>${connection==='connecting'?'Loading selected workspace…':'Workspace unavailable'}</h1><div class="local-top-actions">${actorSelector()}</div>${message?`<p role="status">${e(message)}</p>`:''}${recovery()}<p>Medical details are hidden until the selected workspace can be verified.</p><p class="local-small">Start this repository with <code>npm run dev</code>. The hosted browser mock has no Python API.</p>${button('Refresh connection','refresh','','')} <a class="local-link" href="./index.html">Open the browser mock</a></main>`;return;}
 const nav=['crew','primary','backup'].includes(actor)?[['today','Crew today'],['evidence','Evidence & sources'],['followup','Follow-up'],['handoff','Ground handoff']]:actor==='ground'?[['ground','Received packets']]:[['technical','System status']];
 if(!nav.some(([key])=>key===page))page=nav[0][0];
 const title=actor==='ground'?'Ground context review':actor==='technical'?'Local system operations':page==='today'?'Assessment day':page==='evidence'?'Evidence behind the comparison':page==='followup'?'Follow-through stays owned':'A precise handoff to Earth';
 app.innerHTML=`<div class="shell"><aside class="sidebar"><div class="brand"><img src="./mark.svg" alt=""><div><div class="brand-name">CHNAI</div><div class="brand-sub">CREW HEALTH</div></div></div><div class="nav-label">LOCAL WORKSPACE</div><nav class="nav" aria-label="Workspace">${nav.map(([key,label])=>`<button data-page="${key}" class="${page===key?'active':''}" ${page===key?'aria-current="page"':''}>${e(label)}</button>`).join('')}</nav><div class="mission-panel"><div class="side-kicker">MISSION CONTEXT</div><strong>Deep-space transit</strong><p>SIM-TRANSIT-01 · Day 030</p><p>Completed assessment</p></div><div class="sidebar-bottom"><b>CHNAI LAB</b>Independent research prototype<br>Fictional crew data only<br><br><a href="./index.html">Browser mock & research lab ↗</a><br><a href="./research-registry.html">Research ingestion · engineering ↗</a><br><a href="./api/openapi.json">API contract ↗</a></div></aside><div class="workspace"><header class="topbar"><div class="topbar-title">Crew health workspace <span>/ Local API</span></div><div class="local-top-actions">${actorSelector()}${button('Refresh','refresh','','')}</div></header><div class="simulation-band"><p><span class="sim-label">LOCAL SIMULATION</span><span>Fictional identities. Role selection is not authentication. Saved through FastAPI and SQLite.</span></p></div><main class="main local-content" id="main"><div class="local-header"><div><div class="local-eyebrow">Mission day 030 · ${e(data.actor.id)}</div><h1>${title}</h1><p>${actor==='technical'?'Data-flow status and duty availability.':actor==='ground'?'Only approved, received evidence is available here.':'Gather the evidence. Understand its limits. Keep the next action owned.'}</p></div><span class="badge ${data.faults.earth?'blue':'amber'}">Earth ${data.faults.earth?'connected':'disconnected'}</span></div>${message?`<div class="local-status ${isError?'error':''}" role="status">${e(message)}</div>`:''}${recovery()}${actor==='ground'?groundPage():actor==='technical'?technicalPage():crewPage()}<footer class="local-footer"><span>Fictional crew · Clinical applicability unreviewed</span><span>${stamp()}</span></footer></main></div></div>`;
}
document.addEventListener('change',async event=>{if(event.target.id==='local-actor')await client.selectActor(event.target.value);});
document.addEventListener('click',async event=>{
 const b=event.target.closest('[data-action],[data-page]');if(!b||b.disabled||busy)return;
 if(b.dataset.page){page=b.dataset.page;render();return;}
 const action=b.dataset.action;
 if(action==='refresh')return refresh();if(action==='retry')return send(null,true);if(action==='evidence'){page='evidence';render();return;}
 if(action==='request')return send({name:'review.request'});
 if(action==='accept')return send({name:'assignment.accept',assignmentId:data.episode.handover.id,expectedDependency:data.dependency});
 if(action==='approve')return send({name:'packet.approve',draftId:b.dataset.id,expectedHash:b.dataset.hash});
 if(action==='earth')return send({name:'link.set',link:'earth',available:!data.faults.earth});
 if(action==='fault')return send({name:'link.set',link:b.dataset.link,available:!data.faults[b.dataset.link]});
 if(action==='duty')return send({name:'duty.set',reviewerId:b.dataset.id,available:b.dataset.available==='true'});
 if(action==='step')return send({name:'scenario.step',seconds:15});
});
document.addEventListener('submit',event=>{
 const f=event.target;if(!f.dataset.command)return;event.preventDefault();if(!f.reportValidity()||busy||pending||storageIssue||!data)return;
 const fields=Object.fromEntries(new FormData(f));let command;
 if(f.dataset.command==='offer')command={name:'assignment.offer',...fields};
 if(f.dataset.command==='review')command={name:'review.record',...fields,expectedDependency:data.dependency};
 if(f.dataset.command==='preview')command={name:'packet.preview',question:fields.question,includeNote:fields.includeNote==='on'};
 if(f.dataset.command==='correct')command={name:'assessment.correct',...fields,expectedCurrentId:data.comparison.current.id};
 if(f.dataset.command==='ground')command={name:'ground.review',...fields};
 if(f.dataset.command==='followup')command={name:'followup.complete',...fields};
 if(command)send(command);
});
await refresh();
