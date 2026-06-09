Generate a 7-day (Sun–Sat) dinner menu following all rules in CLAUDE.md.

## Steps

1. **If no specific ingredients or cuisine were provided with the command, ask first:**
   > "Are there any specific ingredients you'd like to use or cuisines you're in the mood for this week?"
   Then wait for a response before proceeding.

2. **Check `menus/` for recently generated menus** to avoid repeating dishes or protein sequences.

3. **Reference `pantryStaples.md`** as the source of truth for what is on hand. Note the full equipment arsenal available (smoker, immersion circulator, KitchenAid with pasta/grinder attachments, grill, air fryer) and draw on it when proposing options.

4. **Generate ~10 meal options** using the Meal Options format below. Apply these rules:
   - At least 6 options must be ~30-minute active cook time
   - Up to 4 options may be longer or equipment-assisted (smoker, sous vide, braise, fresh pasta, etc.)
   - Every option must include at least one side
   - Vary cuisines across the full list

5. **Iterate** — refine the list based on user feedback:
   - Swap out dishes, adjust cuisine variety, change protein distribution, or tweak the time mix as requested
   - Continue until the user signals they're happy with the candidate pool

6. **User selects 7 dishes.** If the user doesn't specify day assignments, propose a Sun–Sat ordering and wait for approval.

7. **Arrange the final 7 selections Sun–Sat**, enforcing the no-same-protein-back-to-back rule. Flag any non-pantry shopping needs per meal.

8. **Save the menu** to `menus/menu_YYYY-MM-DD.md` using the Sunday date for the current week.

9. **Overwrite `menus/latest.md`** with the same content (identical copy).

10. **Prepend a new entry to `menus/index.md`** immediately after the header block, keeping newest-first order:
    `- [Week of <Month D, YYYY>](menu_YYYY-MM-DD.md)`

---

## Meal Options Format

```markdown
## Meal Options

| #  | Dish | Sides | Cuisine | Protein | Time |
| :- | :--- | :---- | :------ | :------ | :--- |
| 1  | Example Quick Dish      | roasted potatoes, green salad | Italian | chicken | ~30 min             |
| 2  | Smoked Pork Shoulder    | cornbread, slaw               | BBQ     | pork    | ~20 min + 4h smoker |
| 3  | Sous Vide Salmon        | lemon-dill crème, asparagus   | French  | fish    | ~15 min + 45 min SV |
...
```

Column alignment rules (per FORMAT.md):
- Pad all columns except the last (`Time`) so pipes line up in raw text

---

## Final Menu Format

```markdown
# Dinner Menu — Week of [Date]

*Serves 4 · no protein repeated back-to-back*

| Day | Dish         | Sides        | Cuisine  |
| :-- | :----------- | :----------- | :------- |
| Sun | First Dish   | side1, side2 | Italian  |
| Mon | Second Dish  | side1        | Japanese |
| Tue | Third Dish   | side1, side2 | Mexican  |
| Wed | Fourth Dish  | side1        | Cajun    |
| Thu | Fifth Dish   | side1, side2 | Spanish  |
| Fri | Sixth Dish   | side1        | Korean   |
| Sat | Seventh Dish | side1, side2 | E. Euro  |
```

If Sunday has already passed when generating the menu, record what was made rather than planning it.

Column alignment rules (per FORMAT.md):
- Column order: `Day` · `Dish` · `Sides` · `Cuisine`
- Pad all columns except the last (`Cuisine`) so pipes line up in raw text
- Empty `Sides` cells must be padded with spaces to match the column width
