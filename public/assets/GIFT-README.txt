HOW TO REPLACE THE GIFT (the very last thing she sees)

Everything lives in one block at the bottom of src/data/stones.ts, called `gift`:

  openLabel  - the text on the button she taps first ("One last gift")
  title      - the big line inside the card ("One last thing…")
  subtitle   - the small caps line above it ("Your gift")
  body       - the text of the gift (line breaks are kept exactly as typed)
  gif        - an animated GIF: put your file at public/assets/gift.gif
               (or set gif: "" to show none)
  image      - a still picture: put your file at public/assets/gift.jpg
               (or set image: "" to show no picture)
  link       - optional button link (voucher code page, playlist, Drive folder…)
               leave "" to hide the button
  linkLabel  - the text on that button
  enabled    - set to false to hide the gift completely


HOW TO EDIT THE RIDDLE (shown right after "Start the journey")

Everything lives in src/data/riddle.ts:

  intro        - the small line above the riddle
  question     - the riddle text (line breaks kept as typed)
  answer       - the correct answer, currently "314"
                 (spaces ignored, capitals don't matter)
  hint         - what "Need a hint?" reveals
  placeholder  - grey text inside the answer box
  wrongText    - message when the answer is wrong
  successText  - message when the answer is right
  enabled      - set to false to skip the riddle entirely
