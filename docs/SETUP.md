# CookingDocs Viewer — Setup

A small static site that renders your `.md` files in an editorial "Broadsheet" style.
**Your markdown stays the source of truth** — this only reads and displays it. Edit or
regenerate the `.md` files with Claude as usual; refresh the page to see changes.

## Files

```
docs/
  index.html      Recipe Index   →  reads ../recipes/index.md
  menu.html       This week       →  reads ../menus/latest.md  (or ?file=…)
  menus.html      Archive         →  reads ../menus/index.md
  staples.html    Dinner staples  →  reads ../dinnerStaples.md
  broadsheet.css  styles
  viewer.js       markdown-table parser + renderers
```

The viewer reads files **above** `docs/`, so the site must be served with the repo
root as its root.

## Deploy to GitHub Pages

1. Commit everything (the `.md` files **and** the `docs/` folder).
2. Repo → **Settings → Pages**.
3. **Build and deployment → Source: Deploy from a branch.**
4. Branch: `main` (or your default), **Folder: `/ (root)`** — not `/docs`.
   This is what lets the viewer reach `recipes/`, `menus/`, and `dinnerStaples.md`.
5. Save. After it builds, open:
   `https://<you>.github.io/<repo>/docs/`

> Free GitHub Pages is **public** — anyone with the URL can see these pages.
> For private viewing, run it locally (below) or host on Netlify/Vercel/Cloudflare with access control.

## Run locally

Browsers block `file://` pages from reading sibling files, so use a tiny server from the **repo root**:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/docs/
```

## Keeping it in sync (small command tweaks)

The viewer reads two helper files that your slash commands should maintain:

- **`menus/latest.md`** — the current week. Have `/project:menu` write the menu to both
  `menus/menu_YYYY-MM-DD.md` *and* `menus/latest.md` (identical copy).
- **`menus/index.md`** — the archive list. Have `/project:menu` prepend a line:
  `- [Week of <Month D, YYYY>](menu_YYYY-MM-DD.md)`

Everything else (Recipe Index, Dinner Staples) renders straight from the existing files —
just keep using the aligned-table format (see `FORMAT.md`).

## Format the viewer expects

- **index.md** — one GFM table with columns `Dish · Cuisine · Protein · Min · Shopping`.
- **menu files** — one table `Day · Dish · Cuisine · Protein · Shopping`, plus an optional
  `**Shopping list** — …` line that becomes the rollup box.
- **dinnerStaples.md** — one table `Dish · Tags · Notes` (Tags comma-separated).
- `Shopping` cells: list non-pantry items, or `—` for pantry-only.

Column order is flexible — the parser matches by header name, not position.
