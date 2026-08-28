import type { Stone } from "@/data/stones";
import { HandwrittenNote } from "./HandwrittenNote";

interface Props {
  stone: Stone;
  onReturn: () => void;
  leaving: boolean;
}

export function MessageScene({ stone, onReturn, leaving }: Props) {
  return (
    <div
      className={`relative min-h-[100svh] px-6 py-20 transition-[opacity,transform] duration-700 ease-out sm:px-10 ${
        leaving ? "translate-y-4 scale-[0.97] opacity-0" : "opacity-100"
      }`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p
          className="reveal-up text-[0.58rem] tracking-[0.42em] uppercase sm:text-[0.66rem]"
          style={{ color: stone.color, animationDelay: "0.15s" }}
        >
          A message from {stone.friend}
        </p>

        <div
          className="reveal-up mx-auto mt-5 h-px w-16"
          style={{
            background: `linear-gradient(to right, transparent, ${stone.color}, transparent)`,
            animationDelay: "0.35s",
          }}
        />

        <p
          className="reveal-up mt-10 font-display text-[clamp(1.05rem,4.4vw,1.6rem)] leading-[1.9] font-light whitespace-pre-line text-star"
          style={{ animationDelay: "0.6s" }}
        >
          {stone.message}
        </p>

        <HandwrittenNote stone={stone} />

        <button
          type="button"
          onClick={onReturn}
          className="reveal-up mt-16 cursor-pointer text-[0.58rem] tracking-[0.36em] text-star-dim uppercase transition-colors duration-300 hover:text-star"
          style={{ animationDelay: "1.4s" }}
        >
          &larr;&nbsp;&nbsp;Return to the stones
        </button>
      </div>
    </div>
  );
}
