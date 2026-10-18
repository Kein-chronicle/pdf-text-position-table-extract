# pdf-text-position-table-extract

**Rebuild a rectangular table from positioned text fragments (x, baseline, size, text), keeping empty cells in place.**

[![test](https://github.com/Kein-chronicle/pdf-text-position-table-extract/actions/workflows/test.yml/badge.svg)](https://github.com/Kein-chronicle/pdf-text-position-table-extract/actions/workflows/test.yml) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Why

PDF and canvas text layers give you fragments with coordinates, not rows. This clusters x positions into column anchors and baselines into rows, then fills the grid. A missing cell stays an empty string instead of shifting the later columns left.

## Install

**As a Claude Code skill** (Claude uses it when the task matches the skill description):

```sh
git clone https://github.com/Kein-chronicle/pdf-text-position-table-extract.git ~/.claude/skills/positional-table-extract
```

For a single project, clone into `<project>/.claude/skills/positional-table-extract` instead, then start a new Claude Code session.

**As a library** (Node.js 22+, no dependencies):

```sh
npm install github:Kein-chronicle/pdf-text-position-table-extract
```

or copy the one file you need: `scripts/table.mjs` is self-contained.

**Requires:** Node.js 22+.

## Quick start

Run the quickstart:

```console
$ node examples/quickstart.mjs
[["Item","Qty","Price"],["Bolt","","1.20"],["Nut","40","0.30"]]
[] <- empty input is an empty table, not a document
```

The output above is real: it is produced by the files in `examples/`.

## API

```js
import { tableRows } from 'pdf-text-position-table-extract';

tableRows([
  { x: 10,  baseline: 20, size: 10, text: 'Item' }, { x: 100, baseline: 20, size: 10, text: 'Qty' },
  { x: 10,  baseline: 34, size: 10, text: 'Bolt' },                                              // Qty missing
]); // [['Item','Qty'], ['Bolt','']]
```

`tableRows(regions)` takes at most 10,000 regions of `{ x, baseline, size, text }` and returns `string[][]`. Invalid regions throw `TypeError`. Fragments closer than `max(3, 0.35 x size)` share a column; identical duplicates are not removed. Coordinates beyond +-1e7 are rejected. Empty input returns `[]`.

## Limits

- A positional heuristic: merged cells, rotated text and multi-line cells need a real layout model.
- Empty input is an empty table, not a successful extraction.

## Related projects

These solve neighbouring problems; use them when they fit better.

- **pdfplumber, Camelot, Tabula**: full PDF table extractors; this is the small positional core

## More from the same collection

Small, tested tools that grew out of running AI agents and game/app pipelines for months:

- [**pdf-page-range-parser**](https://github.com/Kein-chronicle/pdf-page-range-parser): Parse "1-3, 5, 8-" page selections into exact ranges without silently sorting or deduplicating, and reject anything ambiguous.
- [**pdf-annotation-rotation**](https://github.com/Kein-chronicle/pdf-annotation-rotation): Rotate PDF/canvas annotations (boxes, lines, ink, source masks) a quarter turn in display coordinates, without mutating the input.
- [**csv-injection-safe-export**](https://github.com/Kein-chronicle/csv-injection-safe-export): Encode CSV that is safe to open in Excel and Sheets: quoting plus neutralization of formula prefixes (=, +, -, @, tab, CR, LF).

## Development

```sh
node --test tests/run.mjs
```

The tests include inputs that are supposed to be rejected, so a green run also shows the checks can fail. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

If this saved you a debugging session, a star helps other people find it. Bug reports and failing test cases are even better.

<sub>Keywords: pdf, table-extraction, ocr, javascript, esm, csv, text-layout, zero-dependencies</sub>
