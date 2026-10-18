import { tableRows } from '../scripts/table.mjs';

// Text fragments as a PDF or canvas text layer reports them: x, baseline, font size, text.
const regions = [
  { x: 10,  baseline: 20, size: 10, text: 'Item' },   { x: 100, baseline: 20, size: 10, text: 'Qty' },   { x: 160, baseline: 20, size: 10, text: 'Price' },
  { x: 10,  baseline: 34, size: 10, text: 'Bolt' },   { x: 160, baseline: 34, size: 10, text: '1.20' },  // Qty cell is empty
  { x: 10,  baseline: 48, size: 10, text: 'Nut' },    { x: 101, baseline: 48, size: 10, text: '40' },    { x: 160, baseline: 48, size: 10, text: '0.30' },
];
console.log(JSON.stringify(tableRows(regions)));
console.log(JSON.stringify(tableRows([])), '<- empty input is an empty table, not a document');
