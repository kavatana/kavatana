import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as R from '../../dist/research.mjs';
import * as D from '../../dist/domain.mjs';
const buffers=await Promise.all(R.RESEARCH_SOURCE.files.map(f=>readFile(new URL('../../dist/data/'+f.name,import.meta.url))));
const texts=buffers.map(b=>b.toString('utf8'));
const report=R.inspectCBC(...texts);

test('Bundled NASA research bytes independently match pinned SHA-256 and lengths',()=>{
 buffers.forEach((b,i)=>{assert.equal(b.length,R.RESEARCH_SOURCE.files[i].bytes);assert.equal(createHash('sha256').update(b).digest('hex'),R.RESEARCH_SOURCE.files[i].sha256);});
});
test('CSV parser preserves quoted commas, escaped quotes, CRLF and embedded newlines',()=>{
 assert.deepEqual(R.parseCSV('\uFEFFid,note\r\n1,"a, b"\r\n2,"he said ""yes""\nnext"\r\n'),[{id:'1',note:'a, b'},{id:'2',note:'he said "yes"\nnext'}]);
});
test('Malformed CSV is rejected rather than silently shifted into columns',()=>{
 for(const bad of ['','a,a\n1,2','a,b\n1','a,b\n1,"open','a,b\n1,"closed"extra','a,b\n1,ba"d'])assert.throws(()=>R.parseCSV(bad));
});
test('A changed source in either representation rejects the entire research import',()=>{
 assert.throws(()=>R.inspectCBC(texts[0]+' ',texts[1]),/checksum mismatch/);
 assert.throws(()=>R.inspectCBC(texts[0],texts[1]+' '),/checksum mismatch/);
});
test('Actual source inventory is 553 long rows, 28 wide rows and four research IDs',()=>{
 assert.equal(report.rows.length,553);assert.equal(report.rawRowCount,553);assert.equal(report.wideRowCount,28);assert.equal(report.wideColumns,61);
 assert.deepEqual(report.subjects,['C001','C002','C003','C004']);assert.equal(report.quarantine.length,0);
 assert.equal(new Set(report.rows.map(r=>r.id)).size,553);
});
test('All 28 hemoglobin unit conflicts are exposed without changing submitted values',()=>{
 assert.equal(report.conflicts.length,28);
 for(const c of report.conflicts){assert.equal(c.submittedUnit,'g/dL');assert.equal(c.transformedUnit,'%');const r=report.rows.find(r=>r.subjectId===c.subjectId&&r.relativeTime===c.relativeTime&&r.analyte===c.analyte);assert.equal(r.rawValue,c.submittedValue);assert.equal(r.unit,'g/dL');}
});
test('Research stays outside fictional crew records; importing does not create clinical actions',()=>{
 const crew=D.createState(),before=JSON.stringify(crew);R.inspectCBC(...texts);
 assert.equal(JSON.stringify(crew),before);assert.ok(report.rows.every(r=>r.namespace==='RESEARCH:OSD-569'&&r.sourceOrigin==='research_observation'));
 assert.ok(report.rows.every(r=>!D.SUBJECTS.some(s=>s.id===r.subjectId)));
});
test('Research series preserve relative ordering and empty series remain empty',()=>{
 const rows=R.seriesFor(report,'C001','WHITE BLOOD CELL COUNT');
 assert.ok(rows.length>1);assert.deepEqual(rows.map(r=>r.relativeTime),R.TIME_ORDER);
 assert.deepEqual(R.seriesFor(report,'SIM-C03','HEMOGLOBIN'),[]);
 assert.ok(rows.every(r=>r.sourceRow>=2&&r.rangeMin!==undefined&&r.sourceFile===R.RESEARCH_SOURCE.files[0].name));
});
