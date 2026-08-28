/**
 * THE RIDDLE (shown right after she presses "Start the journey").
 *
 * HOW TO EDIT — everything is in this one block:
 *  - intro       : the small line above the riddle
 *  - question    : the riddle itself (line breaks are kept exactly as typed)
 *  - answer      : the correct answer ("314" by default). Spaces are ignored
 *                  and letters are compared without caring about capitals.
 *  - hint        : the text shown when she taps "Need a hint?"
 *  - placeholder : the grey text inside the answer box
 *  - wrongText   : what appears when the answer is wrong
 *  - successText : what appears when the answer is right
 *  - enabled     : set to false to skip the riddle completely
 */
export const riddle = {
  enabled: true,
  intro: "Before we start our journey",
  question: `A number you can't Forget?`,
  answer: "314",
  hint: "410/ ?.",
  placeholder: "Your answer",
  wrongText: "A7A. Try again.",
  successText: "that's my 'Sa7by'…",
};
