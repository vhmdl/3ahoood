import { useState } from "react";
import { celebrantName } from "@/data/stones";

interface Props {
  onStart: () => void;
  /** true once the warp transition has begun */
  launching: boolean;
}

export function IntroScene({ onStart, launching }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={`relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ${
        launching ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1
        className="reveal-up font-display text-[clamp(2.75rem,13vw,7rem)] leading-none tracking-[0.22em] text-star"
        style={{ animationDelay: "0.6s" }}
      >
        {celebrantName}
      </h1>

      <p
        className="reveal-up mt-7 max-w-md text-[clamp(0.8rem,3.4vw,1.05rem)] font-light tracking-[0.32em] text-star-dim uppercase"
        style={{ animationDelay: "2.6s" }}
      >
        A Letter scattered across the universe
      </p>

      <div className="mt-16 sm:mt-20">
        <button
          type="button"
          onClick={() => {
            setPressed(true);
            onStart();
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          className={`gather-in group relative cursor-pointer rounded-full border border-star/25 bg-white/[0.02] px-8 py-4 text-[0.68rem] tracking-[0.42em] text-star uppercase backdrop-blur-sm transition-[transform,box-shadow,background-color] duration-500 hover:border-star/50 hover:bg-white/[0.06] sm:text-[0.75rem] ${
            pressed ? "scale-[0.94]" : "hover:scale-[1.03]"
          }`}
          style={{ animationDelay: "4.4s" }}
        >
          <span className="absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[0_0_60px_-10px_rgba(160,190,255,0.7)]" />
          Start the journey
        </button>
      </div>
    </div>
  );
}
