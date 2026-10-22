// Engineering inspection of public research; no connection to the crew episode.
const app=document.querySelector('#registry'),notice=document.querySelector('#research-status');
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let overview=null,items=null,busy=false,error='',message='',tab='observations',subject='',analyte='',history=[0];
const btn=(label,action,disabled=false)=>`<button class="btn" data-action="${action}" ${busy||disabled?'disabled':''}>${e(label)}</button>`;
async function request(path,body){
 const response=await fetch(path,{method:body?'POST':'GET',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json','X-CHNAI-Actor':'technical','X-CHNAI-Request':'local-simulation'},...(body?{body:JSON.stringify(body)}:{})});
 let result;try{result=await response.json();}catch{throw Error('The local research API returned no readable response.');}
 if(!response.ok)throw Error((result.error?.message??'Research request rejected.')+(result.error?.attemptId?' Attempt '+result.error.attemptId:''));
 return result;
}
async function loadPage(){
 items=null;
 const job=overview?.latestJob;if(!job)return;
 const params=new URLSearchParams({after:history.at(-1),limit:25});
 if(tab==='observations'){if(subject)params.set('subject',subject);if(analyte)params.set('analyte',analyte);}
 items=await request(`/api/research/imports/${job.id}/${tab}?${params}`);
}
async function run(operation){
 if(busy)return;
 busy=true;error='';message='';render();
 try{await operation();}
 catch(err){error=err.message;notice.textContent=error;}
 finally{busy=false;render();}
}
async function refresh(){
 const previous=overview?.latestJob?.id;
 overview=await request('/api/research');
 if(previous!==overview.latestJob?.id){history=[0];subject='';analyte='';}
 await loadPage();
}
function sourceFiles(){return overview.catalog.files.map(f=>`<div class="registry-file"><span class="local-eyebrow">${e(f.role)} representation</span><strong>${e(f.filename)}</strong><p class="local-small">${f.bytes.toLocaleString()} retained bytes · public-file flags recorded</p><code>SHA-256 ${e(f.sha256)}</code><a href="${e(f.url)}" target="_blank" rel="noopener noreferrer">Original download reference ↗</a></div>`).join('');}
function table(){
 if(!items)return '<p class="local-small">No page loaded. Refresh the registry to retry.</p>';
 if(!items.items.length)return '<p class="local-small">No observations match these source filters.</p>';
 if(tab==='observations')return `<div class="registry-table-wrap"><table class="registry-table"><thead><tr><th>Research ID</th><th>Source analyte</th><th>Raw value</th><th>Source unit</th><th>Relative time</th><th>CSV record</th></tr></thead><tbody>${items.items.map(r=>`<tr><td>${e(r.subjectId)}</td><td>${e(r.analyte)}</td><td class="number">${e(r.rawValue)}</td><td>${e(r.unit)}</td><td>${e(r.relativeTime)}</td><td>${r.sourceRow}<details><summary>Provenance</summary><p class="registry-identity">${e(r.sourceFile)}<br>Object: ${e(r.sourceObjectSha256)}<br>Source interval: ${e(r.rangeMin)} – ${e(r.rangeMax)}<br>Namespace: ${e(r.namespace)}</p></details></td></tr>`).join('')}</tbody></table></div>`;
 return `<div class="registry-table-wrap"><table class="registry-table"><thead><tr><th>Research ID / time</th><th>Quality issue</th><th>Submitted</th><th>Transformed</th><th>Disposition</th></tr></thead><tbody>${items.items.map(i=>`<tr><td>${e(i.subjectId??'—')}<br>${e(i.relativeTime??'—')}</td><td>${e(i.kind)}<br>${e(i.analyte??i.reason)}</td><td>${e(i.submittedValue??'—')} ${e(i.submittedUnit??'')}<br>CSV record ${e(i.submittedSourceRow??i.sourceRow)}</td><td>${e(i.transformedValue??'—')} ${e(i.transformedUnit??'')}<br>CSV record ${e(i.transformedSourceRow??'—')}</td><td>${e(i.decision??'Structural row quarantined')}<details><summary>Exact issue record</summary><pre class="registry-manifest">${e(JSON.stringify(i,null,2))}</pre></details></td></tr>`).join('')}</tbody></table></div>`;
}
function render(){
 const job=overview?.latestJob,s=job?.summary,a=overview?.lastAttempt;
 notice.textContent=busy?'Loading research evidence.':error||message;
 app.innerHTML=`<header class="registry-header"><div class="registry-brand">CHNAI <span>RESEARCH INGESTION</span></div><a href="./">Return to local crew workspace ↗</a></header><main class="registry-main" id="main" aria-busy="${busy}"><div class="registry-intro"><div><div class="local-eyebrow">Engineering workspace · retained public research</div><h1>Every observation has a source.</h1><p>Inspect the exact OSD-569 files, the parser that processed them, and unresolved quality issues. Public research IDs remain separate from fictional crew identities.</p></div><div class="registry-actions">${btn('Refresh','refresh')}${btn(job?'Verify & reuse import':'Verify & import files','import',!overview)}</div></div>${error?`<div class="registry-error" role="status">${e(error)}<br>For an unconfirmed import, refresh and verify again. The same source and parser fingerprint reuses its existing job.</div>`:''}${message?`<div class="local-status" role="status">${e(message)}</div>`:''}${!overview?'<section class="registry-panel"><h2>Connect to the local research service</h2><p>Start this repository with <code>npm run dev</code>, then refresh. The hosted static mock has no research database.</p></section>':`${a?`<div class="registry-attempt ${a.status==='rejected'?'rejected':''}"><strong>Last attempt: ${e(a.status)}</strong> · ${e(a.attemptedAt)}<br>${e(a.code)} · ${e(a.id)}${a.status==='rejected'?'<br>The last accepted snapshot below remains historical evidence. This latest attempt accepted no new rows.':''}</div>`:''}<div class="registry-grid"><div class="registry-stat"><span>Retained research rows</span><strong>${s?s.acceptedRows:'—'}</strong><span>Submitted representation</span></div><div class="registry-stat"><span>Public research IDs</span><strong>${s?s.subjects.length:'—'}</strong><span>One short-duration cohort</span></div><div class="registry-stat warn"><span>Unit-label conflicts</span><strong>${s?s.unitConflicts:'—'}</strong><span>Cross-file normalization withheld</span></div><div class="registry-stat"><span>Original files</span><strong>${overview.catalog.files.length}</strong><span>Overlapping representations</span></div></div><section class="registry-panel"><h2>Retained source snapshot</h2><p class="local-small">${e(overview.catalog.snapshotId)} · ${e(overview.catalog.snapshotMeaning)}</p><div class="registry-files">${sourceFiles()}</div><p class="local-small">${e(overview.catalog.acquisition)}. Verification compares retained bytes; it does not contact NASA or establish clinical validity.</p><a class="registry-source" href="${e(overview.catalog.studyUrl)}" target="_blank" rel="noopener noreferrer">Study and contributor citation ↗</a> · <a class="registry-source" href="${e(overview.catalog.termsUrl)}" target="_blank" rel="noopener noreferrer">Source terms ↗</a></section>${job?`<section class="registry-panel"><h2>Last accepted import</h2><p class="registry-identity">${e(job.id)}<br>Recorded ${e(job.completedAt)} · ${e(job.manifest.pipeline.version)} · ${e(s.namespace)}</p><div class="registry-tabs"><button class="btn" data-tab="observations" aria-pressed="${tab==='observations'}" ${busy?'disabled':''}>Retained observations</button><button class="btn" data-tab="issues" aria-pressed="${tab==='issues'}" ${busy?'disabled':''}>Quality issues · ${s.unitConflicts+s.structuralQuarantine}</button></div>${tab==='observations'?`<form id="research-filters" class="registry-filters"><label>Research participant<select name="subject" ${busy?'disabled':''}><option value="">All source IDs</option>${s.subjects.map(id=>`<option ${id===subject?'selected':''}>${e(id)}</option>`).join('')}</select></label><label>Source analyte<select name="analyte" ${busy?'disabled':''}><option value="">All source analytes</option>${s.analytes.map(v=>`<option ${v===analyte?'selected':''}>${e(v)}</option>`).join('')}</select></label><button class="btn" ${busy?'disabled':''}>Apply filters</button></form>`:''}${table()}<div class="registry-pager"><span>Page ${history.length} · up to 25 records · fixed import snapshot</span><div class="registry-actions">${btn('Previous','previous',history.length===1)}${btn('Next','next',items?.nextAfter==null)}</div></div></section><section class="registry-panel"><h2>Reproducible provenance</h2><p class="local-small">The manifest binds source URLs and hashes to parser artifacts, runtime versions and the CHNAI snapshot label. Raw objects and accepted rows are retained separately.</p>${btn('Download manifest','manifest')}<details><summary class="local-summary">Inspect the saved manifest</summary><pre class="registry-manifest">${e(JSON.stringify(job,null,2))}</pre></details></section>`:'<section class="registry-panel"><h2>No accepted import yet</h2><p>Verify the bundled files to create the immutable research job, row provenance and quality report. No network download is required.</p></section>'}`}<footer class="registry-footer">Engineering inspection only. Research does not populate the crew database, generate clinical alerts or authorize model training. Relative labels are source metadata; source intervals are not crew health limits.</footer></main>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-action],[data-tab]');if(!button||button.disabled||busy)return;
 if(button.dataset.tab)return run(async()=>{tab=button.dataset.tab;history=[0];await loadPage();});
 const action=button.dataset.action;
 if(action==='refresh')return run(refresh);
 if(action==='import')return run(async()=>{
  message='';
  let result;try{result=await request('/api/research/imports',{datasetId:'OSD-569',snapshotId:'retained-cbc-2026-10-21'});}catch(err){try{await refresh();}catch{}throw err;}
  message=result.replayed?'Source and parser fingerprint already imported. Existing rows reused.':'Verified import committed. Original values and quality issues are retained.';
  await refresh();
 });
 if(action==='next')return run(async()=>{history.push(items.nextAfter);await loadPage();});
 if(action==='previous')return run(async()=>{history.pop();await loadPage();});
 if(action==='manifest'){
  const link=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(overview.latestJob,null,2)],{type:'application/json'}));
  link.href=url;link.download='CHNAI-OSD569-'+overview.latestJob.id.slice(3,15)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
});
document.addEventListener('submit',event=>{if(event.target.id!=='research-filters')return;event.preventDefault();if(busy)return;const fields=new FormData(event.target);run(async()=>{subject=fields.get('subject');analyte=fields.get('analyte');history=[0];await loadPage();});});
await run(refresh);
