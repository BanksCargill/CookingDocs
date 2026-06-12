Add a dish to the dinner rotation in `dinnerStaples.md`.

## Steps

1. **Get the recipe name.** If a name was passed inline with this command, use it. Otherwise ask:
   > "What's the name of the dish you'd like to add?"

2. **Ask for an optional note** (description, substitutions, family preferences, or tips):
   > "Any notes? (or press enter to skip)"

3. **Suggest tags** based on the name and note — comma-separated, no `#`. Confirm with the user before proceeding.

   Tag categories:
   - Cuisine: `italian`, `japanese`, `mexican`, `american`, `spanish`, `cajun`, `korean`, `asian`, etc.
   - Protein: `chicken`, `beef`, `pork`, `fish`, `vegetarian`, `sausage`, etc.
   - Character: `quick`, `comfort`, `fancy`, `onepan`, etc.

4. **Insert a new row alphabetically** (by Dish name) into the pipe table in `dinnerStaples.md`.

   Row format:
   ```
   | Dish Name | tag1, tag2, tag3 | Note text or — if none |
   ```

   After inserting, re-pad the Dish and Tags columns across the header, separator, and every row if the new entry is wider than the current column width (per FORMAT.md: pad all columns except the last).

5. **Confirm:** "Added [Dish Name] to dinnerStaples.md."

## Usage

```
/project:add-staple
/project:add-staple "Sheet Pan Sausage and Vegetables"
```
