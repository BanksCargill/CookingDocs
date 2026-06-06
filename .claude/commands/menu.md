Generate a 6-day dinner menu following all rules in CLAUDE.md.

## Steps

1. **Enter plan mode — do not generate a menu immediately.**
   - If the invocation did not include specific ingredients or cuisine preferences, ask:
     > "Are there any specific ingredients you'd like to use or cuisines you're in the mood for this week?"
   - Propose a rough plan: proteins across the week, cuisine variety, any constraints noted
   - Wait for user approval before writing anything

2. **Check `menus/` for recently generated menus** to avoid repeating dishes or protein sequences.

3. **Reference `pantryStaples.md`** as the source of truth for what is on hand. Reference `dinnerStaples.md` to anchor the week with known favorites where appropriate.

4. **Apply all rules in `CLAUDE.md`:**
   - No same protein two nights in a row
   - Vary cuisines across the week
   - Active cook time ~30 minutes
   - Serves ~4, weeknight-practical

5. **Generate the 6-day menu** using the output format below. Flag any non-pantry shopping needs per meal.

6. **Save the menu** to `menus/menu_YYYY-MM-DD.md` (using today's date) and print it to the terminal.

## Output Format

```markdown
# Dinner Menu — [Date]

**Monday** — [Dish Name] *(Shopping: item1, item2 — or omit line if pantry only)*
> Optional note if needed. Max 2 lines.

**Tuesday** — [Dish Name]

**Wednesday** — [Dish Name]

**Thursday** — [Dish Name]

**Friday** — [Dish Name]

**Saturday** — [Dish Name]
```
