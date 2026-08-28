import { useEffect, useRef, useState } from "react";
import type { StoneRiddle } from "@/data/stoneRiddles";
import { playSound, playWrongSound } from "@/lib/audio";

interface Props {
  riddle: StoneRiddle;
  accent: string;
  onSolved: () => void;
  /** "scene" sits directly on the cosmic background (default). "overlay" is a
   *  fixed full-screen modal, used for the hidden stone on the final scene. */
  variant?: "scene" | "overlay";
  /** Only shown for the "overlay" variant — lets her back out without answering. */
  onClose?: () => void;
}

const LOCK_MS = 7000;

export function StoneRiddleGate({ riddle, accent, onSolved, variant = "scene", onClose }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintAvailable, setHintAvailable] = useState(false);
  const [solved, setSolved] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [hintImgFailed, setHintImgFailed] = useState(false);
  const lockTimer = useRef<number | undefined>(undefined);
  const solveTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(lockTimer.current);
      window.clearTimeout(solveTimer.current);
    },
    [],
  );

  const choose = (i: number) => {
    if (locked || solved) return;

    if (i === riddle.correctIndex) {
      setPicked(i);
      setSolved(true);
      setShowRetry(false);
      setShowHint(false);
      playSound("activate", 0.45);
      solveTimer.current = window.setTimeout(onSolved, 1300);
      return;
    }

    setPicked(i);
    setLocked(true);
    setShowRetry(false);
    setShowHint(false);
    setHintAvailable(true);
    setImgFailed(false);
    setHintImgFailed(false);
    playWrongSound(0.5);

    lockTimer.current = window.setTimeout(() => {
      setLocked(false);
      setShowRetry(true);
      setShowHint(Boolean(riddle.hint) && hintAvailable);
      setPicked(null);
    }, LOCK_MS);
  };

  const content = (
    <div
      className={`relative flex w-full flex-col items-center px-2 text-center transition-opacity duration-700 ${
        solved ? "opacity-0" : "opacity-100"
      }`}
    >
      <p
        className="reveal-up text-[0.58rem] tracking-[0.42em] uppercase sm:text-[0.66rem]"
        style={{ color: accent, animationDelay: "0.1s" }}
      >
        {riddle.intro ?? "Answer to unlock this stone"}
      </p>

      <div
        className="reveal-up mx-auto mt-4 h-px w-16"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
          animationDelay: "0.25s",
        }}
      />

      <p
        className="reveal-up mt-7 max-w-xl font-display text-[clamp(1rem,4.2vw,1.5rem)] leading-relaxed font-light whitespace-pre-line text-star"
        style={{ animationDelay: "0.45s" }}
      >
        {riddle.question}
      </p>

      <div
        className="gather-in mt-9 grid w-full max-w-sm grid-cols-1 gap-3"
        style={{ animationDelay: "0.9s" }}
      >
        {riddle.choices.map((choice, i) => {
          const isWrongPick = picked === i && locked;
          return (
            <button
              key={i}
              type="button"
              disabled={locked || solved}
              onClick={() => choose(i)}
              className={`cursor-pointer rounded-2xl border px-5 py-3.5 text-left text-[0.8rem] leading-snug text-star backdrop-blur-sm transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                isWrongPick
                  ? "border-[#ff5f7a]/70 bg-[#ff5f7a]/[0.07] shake-soft"
                  : "border-star/20 bg-white/[0.02] hover:border-star/45 hover:bg-white/[0.05]"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 min-h-[12rem] w-full">
        {locked ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="note-enter flex w-full max-w-md flex-col items-center justify-center text-center" style={{ animationDelay: "0s" }}>
              {riddle.wrongImage && !imgFailed ? (
                <>
                  <img
                    src={riddle.wrongImage}
                    alt={riddle.wrongImageAlt ?? "Wrong answer"}
                    loading="lazy"
                    onError={() => setImgFailed(true)}
                    className="photo-zoom max-h-[38svh] max-w-[min(78vw,28rem)] rounded object-contain"
                  />
                  <p className="mt-5 max-w-sm px-4 text-[0.62rem] leading-relaxed tracking-[0.3em] text-[#ff5f7a]/80 uppercase">
                    {riddle.wrongText}
                  </p>
                </>
              ) : (
                <p className="max-w-sm px-4 text-[0.62rem] leading-relaxed tracking-[0.3em] text-[#ff5f7a]/80 uppercase">
                  {riddle.wrongText}
                </p>
              )}
            </div>
          </div>
        ) : null}

        {showRetry ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
            <p className="reveal-up max-w-sm text-[0.62rem] leading-relaxed tracking-[0.3em] text-[#ff5f7a]/80 uppercase">
              {riddle.retryText}
            </p>
            {riddle.hint && hintAvailable && !showHint ? (
              <button
                type="button"
                onClick={() => {
                  setHintAvailable(true);
                  setShowHint(true);
                }}
                className="reveal-up cursor-pointer rounded-full border border-star/20 bg-white/[0.02] px-5 py-2 text-[0.55rem] tracking-[0.28em] text-star-dim uppercase backdrop-blur-sm transition-all duration-300 hover:border-star/45 hover:bg-white/[0.05] hover:text-star"
              >
                Need a hint?
              </button>
            ) : null}
            {showHint && (riddle.hint || riddle.hintImage) ? (
              <div className="note-enter flex max-w-md flex-col items-center justify-center text-center">
                {riddle.hintImage && !hintImgFailed ? (
                  <img
                    src={riddle.hintImage}
                    alt={riddle.hintImageAlt ?? "Hint"}
                    loading="lazy"
                    onError={() => setHintImgFailed(true)}
                    className="photo-zoom max-h-[30svh] max-w-[min(72vw,24rem)] rounded object-contain"
                  />
                ) : null}
                {riddle.hint ? (
                  <p className={`max-w-sm px-4 text-[0.68rem] leading-relaxed text-star-dim italic ${riddle.hintImage && !hintImgFailed ? "mt-5" : ""}`}>
                    {riddle.hint}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );

  const success = solved ? (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
      <p className="note-enter max-w-sm text-[0.62rem] leading-relaxed tracking-[0.3em] text-star uppercase opacity-100 transition-opacity duration-700">
        {riddle.successText}
      </p>
    </div>
  ) : null;

  if (variant === "overlay") {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-sm">
        <div className="note-enter relative w-full max-w-md" style={{ animationDelay: "0s" }}>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-10 right-0 cursor-pointer text-[0.6rem] tracking-[0.35em] text-star-dim uppercase transition-colors duration-300 hover:text-star"
            >
              Close &nbsp;&times;
            </button>
          ) : null}
          <div className="relative overflow-hidden rounded-lg border border-star/20 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            {content}
            {success}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-4 py-10 sm:px-6">
      {content}
      {success}
    </div>
  );
}
