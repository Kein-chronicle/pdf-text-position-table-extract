---
name: positional-table-extract
description: Extract aligned text regions into a rectangular table while preserving empty cells. Use when turning positioned document text into CSV rows.
---

# positional-table-extract

Extract aligned text regions into a rectangular table while preserving empty cells.

## Workflow

1. Confirm the input contract and exclusions below before transforming user data.
2. Import the named exports from `scripts/table.mjs`. Node.js 22+; no npm dependencies. Browser use requires a modern ES module runtime.
3. Run `node --test tests/run.mjs` from this skill folder. The tests contain concrete inputs, expected outputs and rejection cases.
4. Integrate the pure function into the caller. Surface thrown errors as an invalid input result; do not replace failure with empty success.
5. Preserve the original data and inspect a representative output before adding writes or exports.

## Contract and limits

Input regions have x, baseline, size, text. Output is string[][]. This is a positional heuristic: merged cells, rotated text, multi-line cells and table semantics need a separate layout model. Empty input returns an empty table, not a successful document extraction.

## Verification

Run `node --test tests/run.mjs` after copying this folder into an agent's skill directory. Keep `scripts/` and `tests/` together; there are no references to a private source repository. The assertions in `tests/run.mjs` are executable usage examples.
