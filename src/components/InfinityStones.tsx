import type { StoneId } from "@/data/stones";
import { stoneOrder, stones } from "@/data/stones";
import { InfinityStone } from "./InfinityStone";

interface Props {
  collected: StoneId[];
  focusedStone: StoneId | null;
  onSelect: (id: StoneId) => void;
}

/** Scattered across the sky — hidden among the stars. Percentages of the stage. */
const FIELD: Record<StoneId, { x: number; y: number }> = {
  space: { x: 22, y: 16 },
  mind: { x: 74, y: 24 },
  reality: { x: 86, y: 62 },
  power: { x: 38, y: 78 },
  time: { x: 12, y: 55 },
  soul: { x: 58, y: 44 },
};

export function InfinityStones({ collected, focusedStone, onSelect }: Props) {
  const allCollected = collected.length === stoneOrder.length;

  return (
    <div className="relative min-h-[100svh] w-full px-5 py-16">
      <p className="absolute top-10 left-1/2 z-10 w-full -translate-x-1/2 text-center text-[0.58rem] tracking-[0.42em] text-star-dim uppercase">
        {allCollected ? "The collection is complete" : "Find the stones hidden in the stars"}
      </p>

      <div className="absolute inset-x-4 top-24 bottom-24">
        {stoneOrder.map((id, i) => (
          <div
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${FIELD[id].x}%`, top: `${FIELD[id].y}%` }}
          >
            <InfinityStone
              index={i}
              stone={stones[id]}
              collected={collected.includes(id)}
              hidden
              dimmed={focusedStone !== null && focusedStone !== id}
              focused={focusedStone === id}
              onSelect={() => onSelect(id)}
            />
          </div>
        ))}
      </div>

      <p className="absolute bottom-10 left-1/2 w-full -translate-x-1/2 text-center text-[0.55rem] tracking-[0.35em] text-star-dim/60 uppercase">
        {collected.length} / 6 gathered
      </p>
    </div>
  );
}
