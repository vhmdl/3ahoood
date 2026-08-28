/**
 * EDIT THIS FILE ONLY.
 *
 * Everything personal about the experience lives here:
 * friend name, message text and the handwritten note image.
 * Drop the real note scans into `public/assets/notes/` using the
 * same filenames (or point `noteImage` somewhere else).
 */

export type StoneId = "space" | "mind" | "reality" | "power" | "time" | "soul";

export interface Stone {
  id: StoneId;
  name: string;
  /** Accent color for glow, particles and typography. */
  color: string;
  friend: string;
  message: string;
  noteImage: string;
}

export const stoneOrder: StoneId[] = ["space", "mind", "reality", "power", "time", "soul"];

export const stones: Record<StoneId, Stone> = {
  space: {
    id: "space",
    name: "Space Stone",
    color: "#4aa8ff",
    friend: "الجحش",
    message: `

Happy birthday 3HOODA!

`,
    noteImage: "/assets/notes/space.jpg",
  },
  mind: {
    id: "mind",
    name: "Mind Stone",
    color: "#ffd54a",
    friend: "ببلاوي",
    message: `

Happy birthday 3HOODA!

 .`,
    noteImage: "/assets/notes/mind.jpg",
  },
  reality: {
    id: "reality",
    name: "Reality Stone",
    color: "#ff4d5e",
    friend: "NANCY",
    message: ` 

Happy birthday 3HOODA!

 .`,
    noteImage: "/assets/notes/reality.jpg",
  },
  power: {
    id: "power",
    name: "Power Stone",
    color: "#a86bff",
    friend: "SHAHTOZA",
    message: `
Happy birthday 3HOODA!


.`,
    noteImage: "/assets/notes/power.jpg",
  },
  time: {
    id: "time",
    name: "Time Stone",
    color: "#4ade9b",
    friend: "الست اللي مانقدرش نزعلها",
    message: `
Happy birthday 3HOODA!

`,
    noteImage: "/assets/notes/time.jpg",
  },
  soul: {
    id: "soul",
    name: "Soul Stone",
    color: "#ff914a",
    friend: "Special appearance",
    message: ` 

Happy birthday 3HOODA!

 .`,
    noteImage: "/assets/notes/soul.jpg",
  },
};

/**
 * Optional personal photo for the final scene.
 * Set `enabled: true` and drop the file in public/assets/ to switch it on.
 */
export const finalPhoto = {
  enabled: false,
  src: "/assets/final-photo.jpg",
  alt: "3HOODA",
};

/**
 * THE GIFT (very last thing she sees).
 *
 * HOW TO REPLACE IT — everything is in this one block:
 *  - title / subtitle / body : the words on the gift card
 *  - image                   : optional picture (put the file in
 *                              public/assets/gift.jpg, or set image: "")
 *  - link / linkLabel        : optional button (gift card code, voucher,
 *                              Spotify playlist, Google Drive folder…).
 *                              Leave link: "" to hide the button.
 * Set enabled: false to hide the gift entirely.
 */
export const gift = {
  enabled: true,
  title: "One last thing…",
  subtitle: "Your gift",
  body: ``,
  image: "/assets/gift.jpg",
  imageAlt: "Your gift",
  /**
   * GIF that plays automatically the moment the card opens.
   * TO SWAP IT LATER: just drop a new file at public/assets/gift.gif
   * with the exact same filename — no code changes needed, it autoplays
   * and loops on its own since it's a GIF.
   * Set gif: "" to show none.
   */
  gif: "/assets/gift.gif",
  gifAlt: "A little something",
  /** Text on the button she taps to open the card. */
  openLabel: "One last gift",
  link: "",
  linkLabel: "Open it",
};

/**
 * THE HIDDEN STONE (a secret 7th stone, floating near the last gift).
 *
 * It shows up dim and glowing — findable, not fully invisible — next to
 * the "one last gift" button. Clicking it opens a little note with its
 * own letter and picture, completely separate from the gift card above.
 *
 * HOW TO REPLACE IT:
 *  - letter : the text inside the note (line breaks are kept as typed)
 *  - image  : put the file at public/assets/notes/secret.jpg
 *             (or set image: "" to show no picture)
 * Set enabled: false to remove the hidden stone entirely.
 */
export const secretStone = { 
  enabled: true,
  color: "#39ff8f",
  label: "Hidden Stone",
  title: "You found the final (محبة ومدح وتلزيق).",
  subtitle: "One more secret",
  letter: `To the person who made a better man before even being a better friend,
  to my dear (Dedv);
  مع تجميعة الافينجرز الخطيرة اللي جمعتها دي كنت بس عايز اقولك ان اننا بنتمنالك
  تكوني دايمًا كويسة، والأهم تكوني دايمًا مرتاحة في مكانك
  و خليكي عارفة ان فيه قلوب بس بتنبض عشان انت موجودة
  وعشان انت السبب في إن الواحد يحس بالحياة وبإن فيه في الدنياحاجة حلوة تستاهل تتعاش
مع تحيات نيمو وببلاوي وست الكل والجحش وشهطوزة والاردن ونانسي( اسم غريب جدًا )  .
و شكرًا لإنك صاحبي`,
  image: "/assets/notes/secret.jpg",
  imageAlt: "A little secret",
};

export const celebrantName = "3HOODA";
