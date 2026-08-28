import { useEffect, useState } from "react";

interface Props {
  color: string;
  label: string;
  found: boolean;
  onSelect: () => void;
}

/**
 * The secret 7th stone — floats near the last gift.
 * Starts very dim, then gradually becomes more visible.
 */
export function HiddenStone({ color, label, found, onSelect }: Props) {
  const [revealing, setRevealing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealing(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={found ? `${label} (found)` : `A faint glow — ${label}`}
      className="group absolute -top-8 -right-3 z-10 flex cursor-pointer flex-col items-center outline-none sm:-top-10 sm:-right-8"
    >
      <span
        className="stone-float relative block"
        style={{ animationDuration: "9s", animationDelay: "0.4s" }}
      >
        {/* comfortable tap target */}
        <span className="absolute -inset-5 rounded-full" />

        <span
          className={`relative block h-[clamp(16px,4vw,22px)] w-[clamp(16px,4vw,22px)] rounded-full blur-[0.3px] transition-[opacity,transform,filter] duration-1000 ease-out group-hover:scale-125 group-hover:opacity-100 ${
            found
              ? "opacity-90"
              : revealing
                ? "opacity-20 hidden-glow"
                : "opacity-60 hidden-glow"
          }`}
          style={{
            background: `radial-gradient(circle at 40% 32%, #ffffff 0%, #d9ffe7 18%, ${color} 55%, ${color}55 85%, transparent 100%)`,
            boxShadow: `0 0 14px 3px ${color}66, 0 0 28px 8px ${color}33`,
          }}
        >
          {found ? (
            <span
              className="ring-pulse pointer-events-none absolute -inset-2 rounded-full border"
              style={{ borderColor: `${color}88` }}
            />
          ) : null}
        </span>
      </span>

      <span
        className="mt-3 block text-[0.5rem] tracking-[0.32em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ color }}
      >
        {label}
      </span>
    </button>
  );
}
