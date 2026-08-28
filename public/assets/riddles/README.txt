RIDDLE WRONG-ANSWER PHOTOS

Drop one image at each path below. These are shown for 5 seconds after a wrong answer:

spacewrong.jpg
mindwrong.jpg
realitywrong.jpg
powerwrong.jpg
timewrong.jpg
soulwrong.jpg
secretwrong.jpg

You can replace the files at any time without changing the React code.
The site also shows a small fallback message if an image is missing.

OPTIONAL AUDIO

To replace the built-in synthesized wrong-answer sound, add:
  public/assets/audio/wrong.mp3


DISPLAY NOTE
The wrong-answer photo is optional and configured separately for each stone in src/data/stoneRiddles.ts.

When a stone has a wrongImage path, BOTH the photo and wrongText are shown together, centered in the riddle area for 5 seconds.
When wrongImage is empty or omitted, ONLY wrongText is shown, centered in the same area.

The retry message is also centered.
