import { useState, type FormEvent } from "react";
import { riddle } from "@/data/riddle";
import { playSound } from "@/lib/audio";

interface Props {
  onSolved: () => void;
}

const normalize = (v: string) => v.replace(/\s+/g, "").toLowerCase();

export function RiddleScene({ onSolved }: Props) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (solved) return;
    if (normalize(value) === normalize(riddle.answer)) {
      setSolved(true);
      setWrong(false);
      playSound("activate", 0.45);
      setTimeout(onSolved, 1600);
    } else {
      setWrong(true);
      playSound("transition", 0.25);
    }
  };

  return (
    <div
      className={`relative flex min-h-[100svh] flex-col items-center justify-center px-7 text-center transition-opacity duration-700 ${
        solved ? "opacity-0" : "opacity-100"
      }`}
    >
      <p
        className="reveal-up text-[0.6rem] tracking-[0.42em] text-star-dim uppercase sm:text-[0.7rem]"
        style={{ animationDelay: "0.2s" }}
      >
        {riddle.intro}
      </p>

      <p
        className="reveal-up mt-8 max-w-xl font-display text-[clamp(1.05rem,4.6vw,1.8rem)] leading-relaxed font-light whitespace-pre-line text-star"
        style={{ animationDelay: "0.8s" }}
      >
        {riddle.question}
      </p>

      <form
        onSubmit={submit}
        className="gather-in mt-12 flex w-full max-w-xs flex-col items-center gap-5"
        style={{ animationDelay: "2s" }}
      >
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setWrong(false);
          }}
          placeholder={riddle.placeholder}
          inputMode="numeric"
          autoComplete="off"
          className={`w-full rounded-full border bg-white/[0.03] px-6 py-4 text-center text-[0.95rem] tracking-[0.3em] text-star backdrop-blur-sm outline-none transition-colors duration-500 placeholder:text-star-dim/50 focus:bg-white/[0.06] ${
            wrong ? "border-[#ff5f7a]/60 shake-soft" : "border-star/25 focus:border-star/50"
          }`}
        />

        <button
          type="submit"
          className="cursor-pointer rounded-full border border-star/25 bg-white/[0.02] px-8 py-3.5 text-[0.65rem] tracking-[0.4em] text-star uppercase backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] hover:border-star/50 hover:bg-white/[0.06]"
        >
          Unlock
        </button>
      </form>

      <div className="mt-8 min-h-[3.5rem]">
        {wrong ? (
          <p className="text-[0.62rem] tracking-[0.3em] text-[#ff5f7a]/80 uppercase">{riddle.wrongText}</p>
        ) : null}
        {solved ? (
          <p className="text-[0.62rem] tracking-[0.3em] text-star uppercase">{riddle.successText}</p>
        ) : null}

        {!solved &&
          (showHint ? (
            <p className="reveal-up mx-auto mt-3 max-w-sm text-[0.78rem] leading-relaxed text-star-dim italic">
              {riddle.hint}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="mt-3 cursor-pointer text-[0.6rem] tracking-[0.35em] text-star-dim/70 uppercase transition-colors duration-300 hover:text-star"
            >
              Need a hint?
            </button>
          ))}
      </div>
    </div>
  );
}
