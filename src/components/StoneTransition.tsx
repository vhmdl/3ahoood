import type { StoneId } from "@/data/stones";
import { stones } from "@/data/stones";

/**
 * Per-stone signature transition played between the stone scene
 * and the message scene. Purely visual, ~1.4s.
 */
export function StoneTransition({ stoneId }: { stoneId: StoneId }) {
  const color = stones[stoneId].color;

  const common = "pointer-events-none fixed inset-0 z-40 overflow-hidden";

  if (stoneId === "space") {
    return (
      <div className={common}>
        <div
          className="absolute inset-0 animate-[warp-stretch_1.4s_cubic-bezier(0.6,0,0.2,1)_forwards]"
          style={{ background: `radial-gradient(circle, ${color}cc 0%, ${color}22 30%, transparent 65%)` }}
        />
      </div>
    );
  }

  if (stoneId === "mind") {
    return (
      <div className={common}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full animate-[assemble_1.4s_ease-in-out_forwards]"
            style={
              {
                backgroundColor: color,
                boxShadow: `0 0 8px 2px ${color}`,
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
                "--dx": `${50 - ((i * 37) % 100)}%`,
                "--dy": `${50 - ((i * 61) % 100)}%`,
                animationDelay: `${i * 0.03}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (stoneId === "reality") {
    return (
      <div className={common}>
        <div
          className="absolute inset-0 animate-[bend_1.4s_ease-in-out_forwards]"
          style={{
            background: `conic-gradient(from 0deg, ${color}00, ${color}66, ${color}00, ${color}66, ${color}00)`,
          }}
        />
      </div>
    );
  }

  if (stoneId === "power") {
    return (
      <div className={`${common} shake-soft`}>
        <div
          className="absolute inset-0 animate-[pulse-burst_1.4s_ease-out_forwards]"
          style={{ background: `radial-gradient(circle, ${color}dd 0%, ${color}33 35%, transparent 70%)` }}
        />
      </div>
    );
  }

  if (stoneId === "time") {
    return (
      <div className={common}>
        <div
          className="absolute inset-0 animate-[rewind_1.4s_ease-in-out_forwards]"
          style={{
            background: `conic-gradient(from 180deg, transparent 0deg, ${color}55 90deg, transparent 200deg)`,
          }}
        />
      </div>
    );
  }

  // soul — warmest, softest
  return (
    <div className={common}>
      <div
        className="absolute inset-0 animate-[warm_1.4s_ease-out_forwards]"
        style={{ background: `linear-gradient(to top, ${color}66, transparent 70%)` }}
      />
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 h-1.5 w-1.5 rounded-full animate-[float-up_1.4s_ease-out_forwards]"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 9px 2px ${color}aa`,
            left: `${(i * 71) % 100}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
