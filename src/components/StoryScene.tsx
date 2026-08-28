import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  "The universe is full of messages.",
  "Some are written in stars.",
  "Some are written in memories.",
  "And some are written by the people we meet along the way.",
  "Six stones were scattered across the universe.",
  "Each one carries a message.",
];

interface Props {
  onDone: () => void;
}

export function StoryScene({ onDone }: Props) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const duration = reduced ? 2600 : 4600;

  useEffect(() => {
    if (index >= LINES.length) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), duration);
    return () => clearTimeout(t);
  }, [index, duration, onDone]);

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center px-7 text-center">
      {LINES.map((line, i) =>
        i === index ? (
          <p
            key={line}
            className="story-line max-w-2xl font-display text-[clamp(1.25rem,5.4vw,2.35rem)] leading-relaxed font-light text-star"
            style={{ animationDuration: `${duration}ms` }}
          >
            {line}
          </p>
        ) : null,
      )}

      <button
        type="button"
        onClick={onDone}
        className="absolute bottom-10 cursor-pointer text-[0.6rem] tracking-[0.35em] text-star-dim/60 uppercase transition-colors duration-300 hover:text-star"
      >
        Skip
      </button>
    </div>
  );
}
