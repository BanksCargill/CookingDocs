Add a dish to the dinner rotation in `dinnerStaples.md`.

## Steps

1. **Get the recipe name.** If a name was passed inline with this command, use it. Otherwise ask:
   > "What's the name of the dish you'd like to add?"

2. **Ask for an optional note** (description, substitutions, family preferences, or tips):
   > "Any notes? (or press enter to skip)"

3. **Collect structured fields** — suggest values based on name and note; confirm before proceeding.

   - **Cuisine** — suggest (e.g. `Italian`, `Japanese`, `Mexican`, `Spanish`, `Cajun`, `Korean`, `American`)
   - **Protein** — suggest (e.g. `chicken`, `beef`, `pork`, `fish`, `sausage`, `vegetarian`)
   - **Min** — ask: *"Estimated active cook time in minutes?"*
   - **Sides** — ask: *"Typical sides? (or press enter to skip)"* → use `—` if skipped

4. **Insert a new row alphabetically** (by Dish name) into the pipe table in `dinnerStaples.md`.

   Row format:
   ```
   | Dish Name | Cuisine | Protein | Min | Sides or — | Note or — |
   ```

   After inserting, re-pad all columns except Note across the header, separator, and every row if the new entry is wider than the current column width (per FORMAT.md).

5. **Confirm:** "Added [Dish Name] to dinnerStaples.md."

## Usage

```
/project:add-staple
/project:add-staple "Sheet Pan Sausage and Vegetables"
```
