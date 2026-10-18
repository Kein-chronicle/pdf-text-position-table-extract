export function tableRows(regions) {
  if(!Array.isArray(regions)||regions.length>10000)throw new TypeError('at most 10000 regions required');
  for(const r of regions)if(!r || ![r.x,r.baseline,r.size].every(Number.isFinite)||Math.abs(r.x)>1e7||Math.abs(r.baseline)>1e7||r.size<=0||r.size>1e5||typeof r.text!=='string')throw new TypeError('invalid text region (finite x, baseline within +-1e7, 0 < size <= 1e5, text string)');
  const anchors=[];
  for(const r of [...regions].sort((a,b)=>a.x-b.x)){
    const prev=anchors.at(-1);
    if(prev && Math.abs(prev.x-r.x)<=Math.max(3,r.size*.35)){prev.x=(prev.x*prev.n+r.x)/(prev.n+1);prev.n++;}
    else anchors.push({x:r.x,n:1});
  }
  const rows=[];
  for(const r of [...regions].sort((a,b)=>a.baseline-b.baseline||a.x-b.x)){
    let row=rows.findLast(row=>Math.abs(row.y-r.baseline)<Math.min(3,r.size*.3));
    if(!row){row={y:r.baseline,cells:[]};rows.push(row);}
    let col=0;for(let i=1;i<anchors.length;i++)if(Math.abs(anchors[i].x-r.x)<Math.abs(anchors[col].x-r.x))col=i;
    row.cells[col]=row.cells[col]?row.cells[col]+' '+r.text:r.text;
  }
  return rows.map(r=>Array.from({length:anchors.length},(_,i)=>r.cells[i]||''));
}
