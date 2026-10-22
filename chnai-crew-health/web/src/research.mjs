import {sha256} from './domain.mjs';
export const RESEARCH_SOURCE={study:'OSD-569',url:'https://osdr.nasa.gov/bio/repo/data/studies/OSD-569',namespace:'RESEARCH:OSD-569',origin:'Public human spaceflight research; not live crew telemetry',files:[
 {name:'LSDS-7_Complete_Blood_Count_CBC.upload_SUBMITTED.csv',sha256:'10a878b009eb2ea11a13fe92ad698098858639e8ed02f5ee849431313b9457d3',bytes:26138},
 {name:'LSDS-7_Complete_Blood_Count_CBC_TRANSFORMED.csv',sha256:'32e4f9c97d3b636b5d5c2e72dab8c4d3319dee64c437508b092dad04603b2b8f',bytes:9317}
]};
export const TIME_ORDER=['L-92','L-44','L-3','R+1','R+45','R+82','R+194'];
export function parseCSV(text){
 if(typeof text!=='string'||text.length>2_000_000)throw Error('CSV size or input type is unsupported.');
 text=text.replace(/^\uFEFF/,'');const rows=[];let row=[],field='',quoted=false,closed=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
  if(c==='"'){if(field||closed)throw Error('Unexpected quote in CSV.');quoted=true;continue;}
  if(closed&&!['\r','\n',','].includes(c))throw Error('Unexpected content after quoted field.');
  if(c===','){row.push(field);field='';closed=false;continue;}
  if(c==='\r'||c==='\n'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v!==''))rows.push(row);row=[];field='';closed=false;continue;}
  field+=c;
 }
 if(quoted)throw Error('Unterminated CSV field.');
 if(field||row.length||closed){row.push(field);if(row.some(v=>v!==''))rows.push(row);}
 if(!rows.length)throw Error('Empty CSV.');const headers=rows.shift();
 if(new Set(headers).size!==headers.length)throw Error('Duplicate CSV header.');
 return rows.map((r,i)=>{if(r.length!==headers.length)throw Error(`CSV row ${i+2} has an unexpected column count.`);return Object.fromEntries(headers.map((h,j)=>[h,r[j]]));});
}
const number=x=>typeof x==='string'&&/^-?\d+(\.\d+)?$/.test(x)?Number(x):null;
export function inspectCBC(submittedText,transformedText){
 const actual=[sha256(submittedText),sha256(transformedText)];
 if(actual.some((h,i)=>h!==RESEARCH_SOURCE.files[i].sha256))throw Error('Source checksum mismatch. Research import stopped; no rows accepted.');
 const raw=parseCSV(submittedText),wide=parseCSV(transformedText);
 for(const k of ['ANALYTE','VALUE','UNITS','SUBJECT_ID','TEST_DATE','RANGE_MIN','RANGE_MAX'])if(!(k in(raw[0]??{})))throw Error('Required source column missing: '+k);
 const rows=[],seen=new Set(),quarantine=[],conflicts=[];
 for(const [i,r] of raw.entries()){
  const key=[r.SUBJECT_ID,r.TEST_DATE,r.ANALYTE].join('|'),value=number(r.VALUE);
  const issue=value===null?'Non-numeric source value':!/^C\d{3}$/.test(r.SUBJECT_ID)?'Unknown subject key':!TIME_ORDER.includes(r.TEST_DATE)?'Unknown relative time':!r.UNITS?'Missing unit':seen.has(key)?'Duplicate logical row':null;
  if(issue){quarantine.push({row:i+2,reason:issue});continue;}seen.add(key);
  rows.push({id:'OSD569:submitted:'+String(i+2),subjectId:r.SUBJECT_ID,namespace:RESEARCH_SOURCE.namespace,analyte:r.ANALYTE,value,rawValue:r.VALUE,unit:r.UNITS,relativeTime:r.TEST_DATE,rangeMin:r.RANGE_MIN,rangeMax:r.RANGE_MAX,sourceRow:i+2,sourceFile:RESEARCH_SOURCE.files[0].name,sourceOrigin:'research_observation'});
 }
 // Join overlapping representations by explicit source identifiers, never by array position.
 for(const r of rows.filter(x=>x.analyte.startsWith('HEMOGLOBIN'))){
  const w=wide.find(x=>x['Sample Name']===`${r.subjectId}_whole-blood_${r.relativeTime}_cbc`);
  if(w&&'hemoglobin_value_percent' in w&&r.unit!=='%')conflicts.push({subjectId:r.subjectId,relativeTime:r.relativeTime,analyte:r.analyte,submittedValue:r.rawValue,submittedUnit:r.unit,transformedValue:w.hemoglobin_value_percent,transformedUnit:'%',sourceColumn:'hemoglobin_value_percent',decision:'Cross-file normalization quarantined; original submitted value preserved.'});
 }
 return {source:RESEARCH_SOURCE,rows,rawRowCount:raw.length,wideRowCount:wide.length,wideColumns:Object.keys(wide[0]??{}).length,subjects:[...new Set(rows.map(r=>r.subjectId))].sort(),analytes:[...new Set(rows.map(r=>r.analyte))].sort(),times:TIME_ORDER,quarantine,conflicts,hashes:actual,normalization:'No clinical normalization; no merge of overlapping representations',loadedAt:new Date().toISOString()};
}
export function seriesFor(report,subject,analyte){return report.rows.filter(r=>r.subjectId===subject&&r.analyte===analyte).sort((a,b)=>TIME_ORDER.indexOf(a.relativeTime)-TIME_ORDER.indexOf(b.relativeTime));}
export async function loadCBC(){
 const texts=await Promise.all(RESEARCH_SOURCE.files.map(async f=>{const response=await fetch('./data/'+f.name);if(!response.ok)throw Error('Research file unavailable: '+f.name);const b=await response.arrayBuffer();if(b.byteLength!==f.bytes)throw Error('Unexpected research file length.');return new TextDecoder('utf-8',{ignoreBOM:true}).decode(b);}));
 return inspectCBC(...texts);
}
