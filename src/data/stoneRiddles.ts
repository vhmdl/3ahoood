import type { StoneId } from "./stones";

/**
 * A RIDDLE FOR EACH STONE (and one for the hidden 7th stone).
 *
 * Every stone now guards its note+message behind a small multiple-choice
 * riddle. Get it right and the note appears like before. Get it wrong and
 * a photo shows up for 5 seconds with a funny fail sound, then she gets a
 * "try again" and can pick another answer.
 *
 * HOW TO EDIT — everything for one stone lives in one block:
 *  - intro        : small line above the question (optional)
 *  - question     : the riddle itself (line breaks are kept exactly as typed)
 *  - choices      : exactly 4 answer options, in any order
 *  - correctIndex : which one of the 4 choices (0, 1, 2 or 3) is correct
 *  - wrongImage   : OPTIONAL photo shown centered for 5 seconds on a wrong answer.
 *                   Leave it empty / omit it to show wrongText centered instead.
 *  - wrongImageAlt: alt text for that photo (optional)
 *  - wrongText    : centered wrong-answer message shown under the wrong image (or by itself)
 *  - hint         : OPTIONAL hint text revealed behind a button after the first wrong answer
 *  - hintImage    : OPTIONAL hint photo shown above the hint text when provided
 *  - hintImageAlt : alt text for the optional hint photo
 *  - retryText    : shown once the 5 seconds are up, inviting another try
 *  - successText  : shown for a beat right after the correct answer
 *
 * The defaults below are real Infinity Stones trivia so everything works
 * out of the box — swap in your own personal / inside-joke riddles whenever
 * you're ready.
 */
export interface StoneRiddle {
  intro?: string;
  question: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  /** Optional wrong-answer photo. Shown together with wrongText while the stone is locked. */
  wrongImage?: string;
  wrongImageAlt?: string;
  wrongText: string;
  hint?: string;
  hintImage?: string;
  hintImageAlt?: string;
  retryText: string;
  successText: string;
}

export const stoneRiddles: Record<StoneId, StoneRiddle> = {
  space: {
    intro: "Efta7 Ya Semsem",
    question: "Shabeeh MO SALA7",
    choices: ["AHMED", "SHAHD", "OTHERS", "YASSMEN"],
    correctIndex: 2,
    wrongImage: "/assets/riddles/spacewrong.jpg",
    wrongImageAlt: "KEFAYA 3ABAT B2A",
    wrongText: " ",
    hint: "MAFEESH HINT.",
    hintImage: "",
    hintImageAlt: "Hint",
    retryText: "Okay, try again.",
    successText: "WADY.",
  },
  mind: {
    intro: "Efta7 Ya Semsem",
    question: "Khatar 3aleena kolena",
    choices: ["SHAHD", "NANCY", "ElKHOKH", "OTHERS"],
    correctIndex: 2,
    wrongImage: "/assets/riddles/mindwrong.jpg",
    wrongImageAlt: "A7A",
    wrongText: "YA3NY EEH.",
    hint: "A7A.",
    hintImage: "",
    hintImageAlt: "Hint",
    retryText: "Okay, try again.",
    successText: "HATDRABEK LW GHLTY.",
  },
  reality: {
    intro: "Efta7 Ya Semsem",
    question: "MAKARONA BEL SOGOQ ",
    choices: ["ELKHOKH", "SHAHD", "NANCY", "AHMMED"],
    correctIndex: 2,
    wrongImage: "/assets/riddles/realitywrong.jpg",
    wrongImageAlt: "5555",
    wrongText: "ezay yaany.",
    hint: "hint?.",
    hintImage: "\public\assets\riddles\reality.jpg",
    hintImageAlt: "Hint",
    retryText: "Okay, try again.",
    successText: "saba7o.",
  },
  power: {
    intro: "Efta7 Ya Semsem",
    question: "KK?",
    choices: ["SHAHD", "AHMED", "OMK", "OTHERS BARDO"],
    correctIndex: 0,
    wrongImage: "/assets/riddles/powerwrong.jpg",
    wrongImageAlt: "EH EL 3ABAT DA",
    wrongText: "EH EL 3ABAT DA",
    hint: "MAFEESH HINT 555.",
    hintImage: "",
    hintImageAlt: "Hint",
    retryText: "Okay, try again.",
    successText: "MA7ABKEESH.",
  },
  time: {
    intro: "Efta7 Ya Semsem",
    question: "MA3NDNASH HINT LEHA - MOSH FADYA…",
    choices: ["EL-KHOKH", "OMK", "YASMEEN", "NANCY"],
    correctIndex: 1,
    wrongImage: "/assets/riddles/timewrong.jpg",
    wrongImageAlt: "EL-3AR",
    wrongText: "EL-3AR",
    hint: "KEFAYA HINTAT WENABY.",
    hintImage: "",
    hintImageAlt: "Hint",
    retryText: "Okay, try again.",
    successText: "EL 3RS FE 3EEN OMO.",
  },
  soul: {
    intro: "MA3NDNASH HINT LEHA - SECRET",
    question: "LA MSH 3AREF WALLAHY…",
    choices: ["SECRET", "SA7BETK", "2AREBTEK", "NoNE OF THE ABOVE"],
    correctIndex: 2,
    wrongImage: "/assets/riddles/soulwrong.jpg",
    wrongImageAlt: "Wrong answer",
    wrongText: "WRBNA MA M3AYA HINT.",
    hint: "WRBNA MA M3AYA HINT.",
    hintImage: "",
    hintImageAlt: "Hint",
    retryText: "Okay, try again.",
    successText: "WADY.",
  },
};

/** The riddle guarding the hidden 7th stone near the final gift. */
export const secretStoneRiddle: StoneRiddle = {
  intro: "Efta7 Ya Semsem",
  question: "A7A ANA MEEN",
  choices: ["SHAHD", "Iron Man", "AHMED", "MARIAM"],
  correctIndex: 1,
  wrongImage: "/assets/riddles/secretwrong.jpg",
  wrongImageAlt: "Wrong answer",
  wrongText: "EH DA YA SA7BY?.",
  hint: "EH EL BAGAHA DE?.",
  hintImage: "",
  hintImageAlt: "Hint",
  retryText: "Okay, try again.",
  successText: "MANGA.",
};
