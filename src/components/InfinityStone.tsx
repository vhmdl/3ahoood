import type { Stone } from "@/data/stones";

interface Props {
  stone: Stone;
  collected: boolean;
  dimmed: boolean;
  focused: boolean;
  index: number;
  /** Hidden-in-the-stars mode: looks like a faint twinkling star until found. */
  hidden: boolean;
  onSelect: () => void;
}

export function InfinityStone({ stone, collected, dimmed, focused, index, hidden, onSelect }: Props) {
  const camouflaged = hidden && !collected && !focused;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${stone.name}${collected ? " (collected)" : ""}`}
      className={`group relative flex cursor-pointer flex-col items-center justify-center outline-none transition-[opacity,filter,transform] duration-700 ease-out ${
        dimmed ? "scale-90 opacity-25 blur-[2px]" : "opacity-100"
      } ${focused ? "z-20 scale-125" : ""}`}
    >
      <span
        className="stone-float relative block"
        style={{ animationDelay: `${index * 0.7}s`, animationDuration: `${7 + index}s` }}
      >
        {/* touch/click target stays comfortable even when the gem is tiny */}
        <span className="absolute -inset-5 rounded-full" />

        <span
          className={`relative block rounded-full transition-[width,height,opacity,transform] duration-700 ease-out ${
            camouflaged
              ? "hidden-twinkle h-[clamp(9px,2.6vw,15px)] w-[clamp(9px,2.6vw,15px)] group-hover:h-[clamp(46px,12vw,84px)] group-hover:w-[clamp(46px,12vw,84px)] group-hover:opacity-100"
              : "h-[clamp(52px,14vw,96px)] w-[clamp(52px,14vw,96px)]"
          } group-hover:scale-105`}
          style={
            {
              background: camouflaged
                ? `radial-gradient(circle at 50% 50%, #ffffff 0%, ${stone.color}cc 55%, transparent 100%)`
                : `radial-gradient(circle at 50% 48%, #ffffff 0%, #ffffffcc 14%, ${stone.color} 40%, ${stone.color}dd 62%, ${stone.color}44 84%, transparent 100%)`,
              boxShadow: camouflaged
                ? `0 0 10px 2px ${stone.color}66`
                : `0 0 ${focused ? 72 : 46}px ${focused ? 18 : 12}px ${stone.color}55, inset 0 0 26px ${stone.color}, inset 0 0 8px #ffffffaa`,
            } as React.CSSProperties
          }
        >
          {/* faceted gem sheen */}
          {!camouflaged ? (
            <>
              <span
                className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen"
                style={{
                  background: `conic-gradient(from 210deg, transparent 0deg, #ffffff55 40deg, transparent 90deg, ${stone.color}88 170deg, transparent 230deg, #ffffff33 300deg, transparent 360deg)`,
                }}
              />
              <span
                className="pointer-events-none absolute top-[14%] left-[20%] h-[22%] w-[34%] rounded-full bg-white/70 blur-[3px]"
              />
              <span
                className="pointer-events-none absolute inset-[18%] rounded-full opacity-80 blur-[6px]"
                style={{ background: `radial-gradient(circle, #ffffff 0%, ${stone.color}00 70%)` }}
              />
            </>
          ) : null}

          <span
            className="pointer-events-none absolute -inset-6 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
            style={{ background: `radial-gradient(circle, ${stone.color}88 0%, transparent 70%)` }}
          />
          {collected ? (
            <span
              className="ring-pulse pointer-events-none absolute -inset-3 rounded-full border"
              style={{ borderColor: `${stone.color}88` }}
            />
          ) : null}
        </span>
      </span>

      <span
        className="mt-4 block text-[0.55rem] tracking-[0.38em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[0.62rem]"
        style={{ color: stone.color }}
      >
        {stone.name}
      </span>
    </button>
  );
}
