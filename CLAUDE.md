# Cooking Docs — Project Instructions

---

## About the Cook
- Has a professional or culinary background — do not over-explain techniques, equipment, or terminology. Assume full competence.
- Approaches cooking intuitively — recipes are loose inspiration, not strict instructions. Technique suggestions should be precise and professional.
- Cooks for a family of ~4.
- Enjoys a wide variety of cuisines with no strong exclusions.

## Pantry
- Always reference `pantryStaples.md` as the source of truth for what is on hand.
- Treat everything in `pantryStaples.md` as available at all times — never ask about these items.
- Any ingredient not in `pantryStaples.md` must be explicitly provided by the user or flagged as a required purchase.

## Dinner Preferences
- Serves ~4 people.
- Active cook time ~30 minutes, not counting prep (cutting, soaking, grating, marinating, etc.).
- Weeknight-practical: minimal specialty equipment, achievable on a standard home stovetop and oven.

## Prompting Behavior
- Unless the user has already provided specific ingredients or a cuisine preference, always ask before generating a recipe or menu:
  > "Are there any specific ingredients you'd like to use or cuisines you're in the mood for?"
- Ingredients provided this way are things to prioritize or use up — they are in addition to `pantryStaples.md`, not a replacement.

## Menu Generation
- Before generating a new menu, check `menus/` for recently generated menus to avoid repetition.
- No same protein two nights in a row. Vary cuisines across the week.
- Draw from `dinnerStaples.md` when relevant to anchor the week with known favorites.
- Save every generated menu to `menus/menu_YYYY-MM-DD.md`.

## Recipe Metadata
All recipes must include the following frontmatter tags:
- `cuisine`
- `protein`
- `key_ingredients` (non-pantry only)
- `cook_time_minutes`

## Recipe Template
All recipes must follow the schema in `recipes/_template.md`.

## Web Layer
The site is a static viewer in `docs/` — vanilla JS, no build step. Before editing any file in `docs/` (HTML, CSS, or `viewer.js`), read the `/web-layer` skill for architecture context. It covers the nav array, page shell pattern, renderer API, and CSS class map.
