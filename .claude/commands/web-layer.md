Reference for the CookingDocs web serving layer — nav, pages, renderer, CSS.

TRIGGER — read this skill BEFORE editing any file in `docs/` (`viewer.js`, `broadsheet.css`, `*.html`). Skip only when the task is purely about markdown content in `menus/`, `recipes/`, or root `.md` files.

---

## Architecture

Static site in `docs/`. Markdown files at the repo root are the source of truth. `viewer.js` fetches them at runtime via `../` relative paths and renders into HTML. No build step, no bundler, no npm — pure vanilla JS.

**Must be served from repo root over HTTP** (e.g. `python3 -m http.server` → open `/docs/`). The `../` prefix breaks when served from `docs/` as root, and `file://` is blocked by browser CORS.

---

## File Map

| File | Role |
| :--- | :--- |
| `docs/viewer.js` | Core render engine. Exposes `window.CD`. All nav, fetch, parse, and render logic lives here. |
| `docs/broadsheet.css` | All styling. Editorial/print aesthetic — CSS variables: `--paper`, `--ink`, `--terra`, `--olive`, `--clay`, `--serif`, `--mono`. |
| `docs/menu.html` | Current Menu — loads latest via `menus/index.md`, or a specific file via `?file=menus/foo.md`. |
| `docs/menus.html` | Archive list of all past menus. |
| `docs/index.html` | Recipe index. |
| `docs/staples.html` | Dinner staples. |

---

## Nav

Defined as a single array inside `nav()` in `viewer.js`. All four pages share it — edit here only:

```js
var items = [
  ['menu.html',    'Current Menu', 'menu'],
  ['menus.html',   'Menus',        'menus'],
  ['staples.html', 'Staples',      'staples'],
  ['index.html',   'Index',        'index'],
];
// Each entry: [href, display label, active-key]
```

The `active-key` must match what each page passes to `CD.nav('key')`. To rename, reorder, or add nav items, edit only this array.

---

## Adding a New Page

1. Copy any `docs/*.html` as a shell. Update `<title>`, call `CD.nav('newkey')`, call `CD.loadFoo('../path/to/data.md')`.
2. Add `['newpage.html', 'Label', 'newkey']` to the nav items array.
3. Add `async function loadFoo(path)` to `viewer.js` following the existing pattern:
   - `fetchMd(path)` → `parseTables(md)` → build HTML string → `main.innerHTML = html`
   - Use `header(main, eyebrow, title, subtitle)` for the page header block
   - Wrap in try/catch, call `showError(main, e, path)` on failure
4. Expose it: add `loadFoo: loadFoo` to the `window.CD = { ... }` object at the bottom of the IIFE.
5. Add CSS for new elements to `broadsheet.css`.

---

## viewer.js API (`window.CD`)

| Method | What it does |
| :----- | :----------- |
| `CD.nav(activeKey)` | Renders the nav bar, highlighting the active item. Call once per page. |
| `CD.loadMenu(path)` | Fetches a menu `.md`, renders the timeline layout. |
| `CD.loadLatestMenu(indexPath)` | Reads `menus/index.md`, finds the first `- [label](file)` entry, calls `loadMenu`. |
| `CD.loadArchive(path)` | Fetches `menus/index.md`, renders a clickable archive list. Each row links to `menu.html?file=menus/<file>`. |
| `CD.loadIndex(path)` | Fetches `recipes/index.md`, renders the two-column broadsheet layout. |
| `CD.loadStaples(path)` | Fetches `dinnerStaples.md`, renders the tagged-entry grid. |
| `CD.parseTables(md)` | Parses all GFM pipe tables → `[{ headers: [...], rows: [[...], ...] }]`. |
| `CD.getParam(k)` | `new URLSearchParams(location.search).get(k)` — reads URL query params. |

Internal helpers available inside the IIFE (not on `window.CD`):

- `fetchMd(path)` — `fetch` with `cache: 'no-cache'`, throws on non-2xx
- `parseTables(md)` — see above
- `cell(row, headers, name)` — case-insensitive prefix column lookup
- `getTitle(md)` — first `# H1` line
- `getSubtitle(md)` — first `*italic standalone line*`
- `getShoppingList(md)` — extracts `**Shopping list** — ...` line
- `header(main, eyebrow, title, subtitle)` — builds `.doc-eyebrow` + `.doc-title` + `.doc-rule` HTML
- `shopHtml(val)` — returns `.shop` span or `.pantry` span depending on value
- `inlineMd(s)` — renders inline `code` and **bold** inside escaped HTML
- `showError(main, e, path)` — renders the error state with serving instructions

---

## CSS Class Reference

| Context | Classes |
| :------ | :------ |
| Nav | `.nav` `.nav-inner` `.nav-brand` `.nav a.link` `.nav a.link.active` |
| Page header | `.doc-eyebrow` `.doc-title` `.doc-rule` |
| Recipe Index | `.cols` `.bentry` `.bt` `.bmeta` `.bshop` |
| Current Menu (timeline) | `.timeline` `.tl-row` `.tl-day` `.tl-body` `.tl-dish` `.tl-sides` `.tl-meta-right` |
| Staples | `.staples` `.st-entry` `.st-name` `.st-tags` `.chip` `.st-note` |
| Menus archive | `.archive` `.arch-row` `.arch-label` `.arch-file` `.arch-go` |
| Shared | `.shop` (terracotta, needs purchase) · `.pantry` (olive, pantry-only) · `.status` `.status.err` |

CSS variables used throughout: `--paper` `--paper-2` `--ink` `--ink-2` `--ink-3` `--line` `--line-2` `--terra` `--olive` `--clay` `--serif` `--mono`.
