/**
 * Audio layer.
 *
 * Music starts ONLY after the user presses "Start the journey"
 * (browsers block autoplay before a real click). There are no
 * sound settings inside the site on purpose.
 *
 * To change the music: drop your own file at
 *   public/assets/audio/ambient.mp3
 * See public/assets/audio/README.txt for details.
 *
 * If that file is missing, a soft synthesized space pad plays instead,
 * so the experience is never silent.
 */

export const AUDIO_SOURCES = {
  ambient: "/assets/audio/ambient.mp3",
  activate: "/assets/audio/stone-activate.mp3",
  transition: "/assets/audio/stone-transition.mp3",
  final: "/assets/audio/final.mp3",
  wrong: "/assets/audio/wrong.mp3",
} as const;

export type AudioKey = keyof typeof AUDIO_SOURCES;

let unlocked = false;
let ambient: HTMLAudioElement | null = null;
let synthCtx: AudioContext | null = null;
const cache = new Map<AudioKey, HTMLAudioElement>();

function get(key: AudioKey): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  let el = cache.get(key);
  if (!el) {
    el = new Audio(AUDIO_SOURCES[key]);
    el.preload = "none";
    el.addEventListener("error", () => cache.delete(key));
    cache.set(key, el);
  }
  return el;
}

/** Warm, slowly drifting pad used when no ambient.mp3 is provided. */
function startSynthPad() {
  if (synthCtx || typeof window === "undefined") return;
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  try {
    const ctx = new Ctx();
    synthCtx = ctx;
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 6);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(master);

    // A gentle minor-ish chord that breathes.
    [110, 164.81, 220, 329.63].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.value = 0.16 / (i + 1);

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.09 / (i + 1);
      lfo.connect(lfoGain).connect(gain.gain);

      osc.connect(gain).connect(filter);
      osc.start();
      lfo.start();
    });
    void ctx.resume().catch(() => {});
  } catch {
    /* ignore */
  }
}

/** Call once, from a real user gesture. */
export function unlockAudio() {
  unlocked = true;
  if (typeof window === "undefined") return;
  ambient = get("ambient");
  if (!ambient) {
    startSynthPad();
    return;
  }
  ambient.loop = true;
  ambient.volume = 0.28;
  const el = ambient;
  el.addEventListener("error", () => startSynthPad(), { once: true });
  void el.play().catch(() => startSynthPad());
}

export function playSound(key: AudioKey, volume = 0.4) {
  if (!unlocked) return;
  const el = get(key);
  if (!el) return;
  try {
    el.volume = volume;
    el.currentTime = 0;
    void el.play().catch(() => {});
  } catch {
    /* ignore */
  }
}

/**
 * Funny descending "sad trombone" fail sound for a wrong riddle answer.
 * Tries `public/assets/audio/wrong.mp3` first (drop a file there to use
 * your own sound); if it's missing, a synthesized "wah-wah-wah-waaah"
 * plays instead, so a wrong answer is never silent.
 */
function synthWrongSound(volume: number) {
  if (typeof window === "undefined") return;
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  try {
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = Math.min(Math.max(volume, 0), 1) * 0.5;
    master.connect(ctx.destination);

    // Descending "wah wah wah waaah" trombone-style notes.
    const notes = [349.23, 329.63, 293.66, 246.94];
    let t = ctx.currentTime + 0.02;
    notes.forEach((freq, i) => {
      const isLast = i === notes.length - 1;
      const dur = isLast ? 0.6 : 0.3;

      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * (isLast ? 0.82 : 0.94), t + dur);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(master.gain.value, t + 0.03);
      gain.gain.linearRampToValueAtTime(0, t + dur);

      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + dur + 0.05);

      t += dur;
    });

    window.setTimeout(() => void ctx.close().catch(() => {}), (t + 0.4) * 1000);
  } catch {
    /* ignore */
  }
}

export function playWrongSound(volume = 0.5) {
  if (!unlocked) return;
  const el = get("wrong");
  if (el) {
    try {
      el.volume = volume;
      el.currentTime = 0;
      const p = el.play();
      if (p && typeof p.then === "function") {
        p.catch(() => synthWrongSound(volume));
        return;
      }
      return;
    } catch {
      /* fall through to synth */
    }
  }
  synthWrongSound(volume);
}

export function stopAmbient() {
  try {
    ambient?.pause();
    void synthCtx?.close();
    synthCtx = null;
  } catch {
    /* ignore */
  }
}
