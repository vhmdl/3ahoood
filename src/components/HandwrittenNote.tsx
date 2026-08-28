import { useState } from "react";
import type { Stone } from "@/data/stones";

export function HandwrittenNote({ stone }: { stone: Stone }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="note-enter mx-auto mt-14 w-full max-w-lg">
      <div className="paper relative mx-auto overflow-hidden p-3 sm:p-4">
        {failed ? (
          <div className="flex min-h-40 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
            <p className="text-[0.6rem] tracking-[0.3em] text-[#4a4237] uppercase">
              Handwritten note
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-[#6b6154]">
              Add the scan at{" "}
              <span className="font-mono break-all">{stone.noteImage}</span>
            </p>
          </div>
        ) : (
          <img
            src={stone.noteImage}
            alt={`Handwritten note from ${stone.friend}`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="mx-auto block max-h-[70svh] w-full object-contain"
          />
        )}
        <span className="paper-edge pointer-events-none absolute inset-x-0 bottom-0 h-4" />
      </div>
    </figure>
  );
}
