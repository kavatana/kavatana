// Browser loading only; the parser is shared with the durable research importer.
import {RESEARCH_SOURCE,inspectCBC} from './cbc.mjs';
export {RESEARCH_SOURCE,CBC_PARSER_VERSION,TIME_ORDER,parseCSV,inspectCBC,seriesFor} from './cbc.mjs';
export async function loadCBC(){
 const texts=await Promise.all(RESEARCH_SOURCE.files.map(async f=>{const response=await fetch('./data/'+f.name);if(!response.ok)throw Error('Research file unavailable: '+f.name);const b=await response.arrayBuffer();if(b.byteLength!==f.bytes)throw Error('Unexpected research file length.');return new TextDecoder('utf-8',{ignoreBOM:true}).decode(b);}));
 return inspectCBC(...texts);
}
