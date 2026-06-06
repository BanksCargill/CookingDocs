# Doc Format Notes

Conventions for the scannable `.md` docs. Designed to read well **as raw text** and **rendered** (GitHub, editor preview).

## Tables
- **Column-aligned** — pad cells with spaces so pipes line up in raw text. Rendering ignores the padding; raw reading benefits from it.
- Alignment markers carry meaning: `--:` right-aligns numbers (`Min`), `:-:` centers flags (`Kid`).
- Keep the **last column ragged** (don't pad `Shopping`) — variable-length lists would add huge trailing whitespace.

## Scan system
- `Kid` column — `✓` reliable · `~` one safe component · `✕` no.
- `Shopping` column — lists **non-pantry items only**; `—` means pantry-only (nothing to buy).
- `Min` — active cook time, the thing you filter on for a weeknight.

## Recipe Index (`recipes/index.md`)
- One aligned table, **sorted by cuisine** so same-cuisine dishes sit together (visual grouping without repeated headers).
- Dish names kept concise — the full title lives in each recipe file's frontmatter.

## Weekly Menu (`menus/menu_YYYY-MM-DD.md`)
- One table, chronological (`Day` → `Shopping`), plus a deduped **Shopping list** rollup at the bottom for the actual store run.

## Maintaining alignment
When adding/removing rows, re-pad the affected column to the new longest cell. If a row's `Dish`/`Cuisine`/`Protein` is longer than the current column, widen the whole column (header, separator, and every row) to match.
