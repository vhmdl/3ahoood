RIDDLE HINT IMAGES

Each stone can have its own optional hint image.

In src/data/stoneRiddles.ts, each stone has:
  hint: "Your hint text here",
  hintImage: "/assets/riddles/spacehint.jpg",
  hintImageAlt: "A visual hint",

Leave hintImage as "" (or omit it) if you only want text.
Leave hint empty if you do not want a hint at all.

The hint button appears after the first wrong answer, once the fail screen finishes.
If hintImage is provided, the hint screen shows BOTH the picture and hint text.
If hintImage is empty, it shows ONLY the hint text.

Suggested no-hyphen filenames:
  spacehint.jpg
  mindhint.jpg
  realityhint.jpg
  powerhint.jpg
  timehint.jpg
  soulhint.jpg
  secrethint.jpg

Put the actual files under:
  public/assets/riddles/
