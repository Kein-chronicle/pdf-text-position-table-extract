import test from 'node:test';
import assert from 'node:assert/strict';

import {tableRows} from '../scripts/table.mjs';
const r=(x,baseline,text)=>({x,baseline,text,size:10});
test('global anchors preserve missing cells; input ordering does not matter',()=>{
 const data=[r(0,10,'A'),r(100,10,'B'),r(100,30,'D')];
 assert.deepEqual(tableRows(data),[['A','B'],['','D']]);
 assert.deepEqual(tableRows([...data].reverse()),[['A','B'],['','D']]);
 assert.deepEqual(tableRows([]),[]);
});
test('reject non-finite input and oversized region lists',()=>{
 assert.throws(()=>tableRows([r(NaN,10,'x')]));assert.throws(()=>tableRows(Array(10001).fill(r(0,0,'x'))));
});

test('absurd coordinates are rejected instead of producing garbage columns',()=>{
 assert.throws(()=>tableRows([{x:1e308,baseline:0,size:10,text:'a'},{x:1e308,baseline:0,size:10,text:'b'}]),TypeError);
 assert.throws(()=>tableRows([{x:0,baseline:0,size:1e9,text:'a'}]),TypeError);
});
test('fragments closer than max(3, 0.35*size) share a column (documented), duplicates are not removed',()=>{
 assert.deepEqual(tableRows([{x:10,baseline:0,size:10,text:'A'},{x:12,baseline:0,size:10,text:'B'}]),[['A B']]);
 assert.deepEqual(tableRows([{x:10,baseline:0,size:10,text:'A'},{x:10,baseline:0,size:10,text:'A'}]),[['A A']]);
});
