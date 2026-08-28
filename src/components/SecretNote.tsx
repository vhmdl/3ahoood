import { useState } from "react";
import { secretStone } from "@/data/stones";

interface Props {
  onClose: () => void;
}

/** The note that opens when the hidden stone near the last gift is clicked. */
export function SecretNote({ onClose }: Props) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="note-enter relative w-full max-w-md"
        style={{ animationDelay: "0s" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close note"
          className="absolute -top-10 right-0 cursor-pointer text-[0.6rem] tracking-[0.35em] text-star-dim uppercase transition-colors duration-300 hover:text-star"
        >
          Close &nbsp;&times;
        </button>

        <div className="paper relative mx-auto overflow-hidden p-6 sm:p-8">
          <p
            className="text-[0.58rem] tracking-[0.42em] uppercase"
            style={{ color: secretStone.color }}
          >
            {secretStone.subtitle}
          </p>
          <h3 className="font-display mt-2 text-[clamp(1.1rem,4.6vw,1.5rem)] tracking-[0.04em] text-[#2c2a22]">
            {secretStone.title}
          </h3>

          <p className="mt-5 text-[clamp(0.82rem,3.2vw,0.95rem)] leading-relaxed whitespace-pre-line text-[#4a4237]">
            {secretStone.letter}
          </p>

          {secretStone.image ? (
            imageFailed ? (
              <div className="mt-6 flex min-h-32 flex-col items-center justify-center gap-2 rounded-sm bg-black/[0.03] px-6 py-8 text-center">
                <p className="text-[0.55rem] tracking-[0.3em] text-[#6b6154] uppercase">
                  Add a picture here
                </p>
                <p className="max-w-xs text-[0.7rem] leading-relaxed text-[#8a8073]">
                  Put it at <span className="font-mono break-all">{secretStone.image}</span>
                </p>
              </div>
            ) : (
              <img
                src={secretStone.image}
                alt={secretStone.imageAlt}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="mx-auto mt-6 max-h-[42svh] w-auto rounded-sm object-contain shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]"
              />
            )
          ) : null}

          <span className="paper-edge pointer-events-none absolute inset-x-0 bottom-0 h-4" />
        </div>
      </div>
    </div>
  );
}
