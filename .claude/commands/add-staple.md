Add a dish to the dinner rotation in `dinnerStaples.md`.

## Steps

1. **Get the recipe name.** If a name was passed inline with this command, use it. Otherwise ask:
   > "What's the name of the dish you'd like to add?"

2. **Get a one-line description** if not already provided.

3. **Suggest tags** based on the name and description (cuisine, protein, character). Confirm with the user before proceeding.

4. **Ask for optional notes:**
   > "Any notes? (substitutions, family preferences, tips — or press enter to skip)"

5. **Format the entry** per the `dinnerStaples.md` schema:
   ```
   - **Recipe Name** — One-line description. #tag1 #tag2 #tag3
     > Optional note (omit line if none provided)
   ```

6. **Insert alphabetically** into the Rotation section of `dinnerStaples.md`.

7. **Confirm:** "Added [Recipe Name] to dinnerStaples.md."

## Usage

```
/project:add-staple
/project:add-staple "Sheet Pan Sausage and Vegetables"
```
