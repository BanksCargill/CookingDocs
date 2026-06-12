Generate a 7-day (Sun–Sat) dinner menu following all rules in CLAUDE.md.

## Steps

1. **If no specific ingredients or cuisine were provided with the command, ask first:**
   > "Are there any specific ingredients you'd like to use or cuisines you're in the mood for this week?"
   Then propose a rough plan (proteins, cuisine variety, constraints) and wait for approval before writing anything.

2. **Check `menus/` for recently generated menus** to avoid repeating dishes or protein sequences.

3. **Reference `pantryStaples.md`** as the source of truth for what is on hand. Reference `dinnerStaples.md` to anchor the week with known favorites where appropriate.

4. **Apply all rules in `CLAUDE.md`:**
   - No same protein two nights in a row
   - Vary cuisines across the week
   - Active cook time ~30 minutes
   - Serves ~4, weeknight-practical

5. **Generate the 7-day menu (Sun–Sat)** using the output format below. Flag any non-pantry shopping needs per meal.

6. **Save the menu** to `menus/menu_YYYY-MM-DD.md` using the Sunday date for the current week.

7. **Overwrite `menus/latest.md`** with the same content (identical copy).

8. **Prepend a new entry to `menus/index.md`** immediately after the header block, keeping newest-first order:
   `- [Week of <Month D, YYYY>](menu_YYYY-MM-DD.md)`

## Output Format

```markdown
# Dinner Menu — Week of [Date]

*Serves 4 · ~30 min active · no protein repeated back-to-back*

| Day | Dish         | Sides        | Cuisine  |
| :-- | :----------- | :----------- | :------- |
| Sun | First Dish   | side1, side2 | Italian  |
| Mon | Second Dish  |              | Japanese |
| Tue | Third Dish   |              | Mexican  |
| Wed | Fourth Dish  |              | Cajun    |
| Thu | Fifth Dish   |              | Spanish  |
| Fri | Sixth Dish   |              | Korean   |
| Sat | Seventh Dish |              | E. Euro  |
```

If Sunday has already passed when generating the menu, record what was made rather than planning it.

Column alignment rules (per FORMAT.md):
- Column order: `Day` · `Dish` · `Sides` · `Cuisine`
- Pad all columns except the last (`Cuisine`) so pipes line up in raw text
- Empty `Sides` cells must be padded with spaces to match the column width
