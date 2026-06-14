# CookingDocs

A personal cooking documentation system designed for interaction with Claude. It manages weekly dinner menus, a recipe library, and a dinner staple rotation — all stored as Markdown with a static web viewer for browsing.

---

## Purpose

The repo serves two functions:

1. **A knowledge base Claude reads** to generate weekly menus, suggest recipes, and manage a shopping list — informed by a fixed pantry inventory and the cook's preferences.
2. **A static web viewer** (`docs/`) that renders that same Markdown into a browsable site (no build step, pure vanilla JS).

The cook has a professional culinary background. Technique explanations are not needed. The target is weeknight-practical meals for a family of 4, ~30 minutes active cook time.

---

## Repository Structure

```
CookingDocs/
├── CLAUDE.md               # Project instructions and rules for Claude
├── pantryStaples.md        # Source-of-truth ingredient inventory (always available)
├── dinnerStaples.md        # Dinner rotation — known favorites with tags and notes
├── FORMAT.md               # Table formatting conventions
├── menus/
│   ├── index.md            # Archive index of all generated menus
│   ├── latest.md           # Symlink/copy of most recent menu (consumed by web viewer)
│   └── menu_YYYY-MM-DD.md  # One file per generated week (Sun–Sat)
├── recipes/
│   ├── _template.md        # Required schema for all recipes
│   ├── index.md            # Metadata table of all recipes
│   └── *.md                # Individual recipe files
├── docs/                   # Static web viewer
│   ├── index.html          # Recipe index page
│   ├── menu.html           # Current menu page
│   ├── menus.html          # Menu archive page
│   ├── staples.html        # Dinner staples page
│   ├── viewer.js           # Render engine (parseTables, loadMenu, loadStaples, etc.)
│   └── broadsheet.css      # Editorial print-inspired stylesheet
└── .claude/commands/       # Slash command definitions
    ├── menu.md             # /menu — generate a 7-day menu
    ├── add-staple.md       # /add-staple — add a dish to the rotation
    └── web-layer.md        # /web-layer — architecture reference for docs/
```

---

## Data Model

All source data is Markdown. Tables use GFM pipe syntax and are parsed by `viewer.js` at runtime.

### pantryStaples.md
Categorized list of always-available ingredients. Proteins, produce, dry goods, condiments, oils, vinegars, and equipment (including immersion circulator, smoker, KitchenAid, air fryer, grill). Claude never asks about these — they are assumed in scope.

### dinnerStaples.md
Pipe table of rotation-ready dinners: `| Dish | Tags | Notes |`. Currently 2 entries (Carbonara, Japanese Chicken with Cucumber and Rice).

### recipes/index.md
Pipe table of all recipes: `| Title | Cuisine | Protein | Key Ingredients | Cook Time |`. Currently 10 recipes across Spanish, Mexican, Cajun, Japanese, and Asian cuisines.

### Recipe files
Required frontmatter: `cuisine`, `protein`, `key_ingredients`, `cook_time_minutes`, `servings`, `last_made`. Body follows `recipes/_template.md`: Description, Ingredients, Instructions, Notes & Tips, Variations.

### menus/menu_YYYY-MM-DD.md
One file per week. Lists Sunday through Saturday with dish name, cuisine, and a brief note per night. The web viewer reads `menus/latest.md` for the current menu page, and `menus/index.md` for the archive.

---

## Slash Commands

| Command | What it does |
| ------------ | ------------------------------------------------------------------- |
| `/menu` | Generates a full Sun–Sat menu. Checks recent menus to avoid repeats, enforces no same protein on consecutive nights, varies cuisines, asks for preferences first, then saves to `menus/`. |
| `/add-staple` | Interactive flow to add a dish to `dinnerStaples.md` with tags and a note, inserted alphabetically. |
| `/web-layer` | Returns architecture reference for `docs/` before editing any HTML/CSS/JS. |

---

## Web Viewer

Static site in `docs/`. Serve locally with `python3 -m http.server` from the repo root, or deploy to GitHub Pages.

**Pages:**
- `menu.html` — Current week's menu in a timeline layout. Accepts `?file=` param to load any menu from the archive.
- `menus.html` — Archive of all generated menus as clickable links.
- `staples.html` — Dinner staples table with tag chips.
- `index.html` — Recipe index in a 2-column layout.

**Renderer (`viewer.js`):** Exposes `window.CD` with `parseTables()`, `loadMenu()`, `loadIndex()`, `loadStaples()`, and `loadArchive()`. Reads Markdown files via `fetch()` — no preprocessing required.

**Stylesheet (`broadsheet.css`):** Editorial print aesthetic. CSS variables for palette (paper, ink, terra, olive, clay). Responsive breakpoints at 620px.

---

## Current Content State

- **Pantry:** ~50 staple ingredients + full equipment list
- **Dinner staples:** 2 entries
- **Recipes:** 10 (indexed; individual files not yet created)
- **Menus generated:** 1 (week of June 7, 2026)
- **Web viewer:** Fully implemented — nav, 4 pages, renderer, CSS

---

## Rules & Constraints Claude Follows

- Never repeat the same protein on consecutive nights.
- Vary cuisines across the week.
- Draw from `dinnerStaples.md` to anchor the week with known favorites.
- Flag any ingredient not in `pantryStaples.md` as a required purchase.
- Always ask for ingredient/cuisine preferences before generating a menu or recipe.
- Save every generated menu to `menus/menu_YYYY-MM-DD.md` and update `menus/latest.md` and `menus/index.md`.
- All recipes must include required frontmatter and follow `_template.md`.
