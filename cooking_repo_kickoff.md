# Cooking Repository — Project Plan

> This is a plan for Claude Code to execute in plan mode.
> Review and iterate before approving execution.

---

## Goal

Set up a personal cooking documentation repository with the following outcomes:
1. All scaffold files created and populated with correct initial content
2. A `CLAUDE.md` that governs all future interactions in this project
3. A `/project:menu` slash command for generating 6-day dinner menus
4. A `/project:add-staple` slash command for adding to the dinner rotation

---

## Step 1 — Create the Repository Structure

Create the following directories and files:

```
/
├── CLAUDE.md
├── pantryStaples.md
├── dinnerStaples.md
├── recipes/
│   ├── _template.md
│   └── index.md
└── menus/
```

---

## Step 2 — Write CLAUDE.md

Write `CLAUDE.md` at the root with the following content:

---

### About the Cook
- Has a professional or culinary background — do not over-explain techniques, equipment, or terminology. Assume full competence.
- Approaches cooking intuitively — recipes are loose inspiration, not strict instructions. Technique suggestions should be precise and professional.
- Cooks for a family of ~4 including kids; one or more are picky eaters.
- "Kid-friendly" means at least one component on the plate the kids will reliably eat — the whole dish does not need to be mild or simple. The kids are eating more adventurously over time.
- Enjoys a wide variety of cuisines with no strong exclusions.

### Pantry
- Always reference `pantryStaples.md` as the source of truth for what is on hand.
- Treat everything in `pantryStaples.md` as available at all times — never ask about these items.
- Any ingredient not in `pantryStaples.md` must be explicitly provided by the user or flagged as a required purchase.

### Dinner Preferences
- Serves ~4 people.
- Active cook time ~30 minutes, not counting prep (cutting, soaking, grating, marinating, etc.).
- Weeknight-practical: minimal specialty equipment, achievable on a standard home stovetop and oven.

### Prompting Behavior
- Unless the user has already provided specific ingredients or a cuisine preference, always ask before generating a recipe or menu:
  > "Are there any specific ingredients you'd like to use or cuisines you're in the mood for?"
- Ingredients provided this way are things to prioritize or use up — they are in addition to `pantryStaples.md`, not a replacement.

### Menu Generation
- Before generating a new menu, check `menus/` for recently generated menus to avoid repetition.
- No same protein two nights in a row. Vary cuisines across the week.
- Draw from `dinnerStaples.md` when relevant to anchor the week with known favorites.
- Save every generated menu to `menus/menu_YYYY-MM-DD.md`.

### Recipe Metadata
All recipes must include the following frontmatter tags:
- `cuisine`
- `protein`
- `key_ingredients` (non-pantry only)
- `kid_friendly` (true/false)
- `cook_time_minutes`

### Recipe Template
All recipes must follow the schema in `recipes/_template.md`.

---

## Step 3 — Write pantryStaples.md

Write `pantryStaples.md` with the following content. This file is the source of truth for what is always on hand.

### Proteins
- Beans (white/cannellini, black, and a variety of others)
- Boneless chicken thighs and breasts
- Ground beef
- Spicy breakfast sausage
- Bacon
- Mexican chorizo
- Spanish chorizo
- Venison loin
- Pulled pork (cooked, frozen)
- Tofu (medium firm and silken)
- Andouille sausage
- Salmon
- Tinned tuna

### Produce & Refrigerator
- Onions
- Potatoes
- Sweet potatoes
- Apples
- Lemons
- Limes
- Eggs
- Milk
- Yogurt
- Bread

### Pantry
- Canned tomatoes (whole, crushed, and diced)
- Canned chipotle in adobo
- Flour, sugar, salt, pepper
- Fully stocked spice cabinet — assume any common dried herb or spice is available (cumin, smoked paprika, oregano, thyme, coriander, chili powder, turmeric, cinnamon, bay leaves, red pepper flakes, etc.)
- Olive oil, neutral cooking oil
- Soy sauce, fish sauce, sesame oil
- Vinegars (red wine, white wine, apple cider)
- Chicken and vegetable stock

---

## Step 4 — Write dinnerStaples.md

Write `dinnerStaples.md` as a lightweight tagged list of dinners in regular rotation or being added to it. Include a brief header explaining the format and how to add entries.

**Entry format:**
```
- **Recipe Name** — One-line description. #tag1 #tag2 #tag3
  > Optional short note: substitutions, family preferences, tips.
```

**Tag conventions:**
- Cuisine: `#italian` `#japanese` `#mexican` `#american` `#spanish` `#cajun` `#korean` etc.
- Protein: `#chicken` `#beef` `#pork` `#fish` `#vegetarian` `#sausage` etc.
- Character: `#quick` `#comfort` `#kidfriendly` `#fancy` `#onepan` etc.

Populate with these initial entries:

```
- **Carbonara** — Pasta, eggs, bacon, parmesan, black pepper. No cream. #italian #pasta #pork #quick
  > Crispy bacon works fine as a guanciale sub.

- **Japanese Chicken with Cucumber and Rice** — Soy-glazed chicken thighs over steamed rice with fresh or quick-pickled cucumber. #japanese #chicken #kidfriendly #quick
```

---

## Step 5 — Write recipes/_template.md

Write `recipes/_template.md` with the following schema. All future recipes must follow this format:

```markdown
---
title:
cuisine:
protein:
key_ingredients: []
kid_friendly:
cook_time_minutes:
servings: 4
last_made:
---

# [Recipe Title]

> Brief one or two sentence description.

## Ingredients

- ...

## Instructions

1. ...

## Notes & Tips

- ...

## Variations

- ...
```

---

## Step 6 — Write recipes/index.md

Write `recipes/index.md` as a metadata table. This is a reference index only — full recipe files are written separately.

Columns: `Recipe Title | Cuisine | Protein | Key Non-Pantry Ingredients | Kid-Friendly | Cook Time`

Populate with the following initial entries. Infer metadata from the recipe names — flag anything uncertain:

1. Pan-Seared Chicken Thighs with Romesco & Wilted Spinach
2. Mexican Chorizo & Zucchini Skillet with Beans
3. Salmon with Romesco over Wilted Spinach
4. Andouille, White Bean & Greens Pasta
5. Andouille & Chicken Thigh Jambalaya Pasta
6. Miso-Glazed Salmon with Daikon & Chard
7. Chicken Thigh Stir-Fry with Daikon & Chard
8. Spanish Chorizo & White Bean Stew with Chard
9. Sausage & Daikon Fried Rice
10. Spanish Chorizo & White Bean Paella with Chard

---

## Step 7 — Create the /project:menu Slash Command

Register a custom slash command at `/project:menu`.

**When invoked:**
1. Enter plan mode — do not generate a menu immediately.
   - Ask: *"Are there any specific ingredients you'd like to use or cuisines you're in the mood for this week?"* (skip if already provided in the invocation)
   - Propose a rough plan: proteins across the week, cuisine variety, any constraints
   - Wait for user approval before writing anything
2. Check `menus/` for recent menus to avoid repetition.
3. Reference `pantryStaples.md` and `dinnerStaples.md`.
4. Apply all rules in `CLAUDE.md`.
5. Generate a 6-day menu:
   - No same protein two nights in a row
   - Varied cuisines across the week
   - Flag any non-pantry shopping needs per meal
6. Save to `menus/menu_YYYY-MM-DD.md` and print to terminal.

**Output format** — one line per day, optional note of max 2 lines only when genuinely needed:

```markdown
# Dinner Menu — [Date]

**Monday** — [Dish Name] *(Shopping: item1, item2 — or omit if pantry only)*
> Optional note if needed. Max 2 lines.

**Tuesday** — [Dish Name]

**Wednesday** — [Dish Name]

**Thursday** — [Dish Name]

**Friday** — [Dish Name]

**Saturday** — [Dish Name]
```

---

## Step 8 — Create the /project:add-staple Slash Command

Register a custom slash command at `/project:add-staple`.

**When invoked:**
1. Check for a recipe name passed inline — if absent, ask: *"What's the name of the dish you'd like to add?"*
2. Ask for a one-line description if not provided.
3. Suggest tags based on the description and confirm with the user.
4. Ask: *"Any notes? (substitutions, family preferences, tips — or press enter to skip)"*
5. Format the entry per the `dinnerStaples.md` schema.
6. Insert alphabetically into `dinnerStaples.md`.
7. Confirm: *"Added [Recipe Name] to dinnerStaples.md."*

**Usage:**
```
/project:add-staple
/project:add-staple "Sheet Pan Sausage and Vegetables"
```

---

## Ongoing Conventions

- When a full recipe file is written and saved, link it from `recipes/index.md`.
- If the user says *"I always have X"*, treat it as a candidate addition to `pantryStaples.md` and suggest updating it.
- After any successful new recipe, suggest adding it to `dinnerStaples.md` via `/project:add-staple`.
- Keep tags in `dinnerStaples.md` consistent — normalize if conventions drift.
