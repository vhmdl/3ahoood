import { useEffect, useState } from "react";
import { secretStoneRiddle } from "@/data/stoneRiddles";
import { celebrantName, finalPhoto, gift, secretStone, stoneOrder, stones } from "@/data/stones";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playSound } from "@/lib/audio";
import { HiddenStone } from "./HiddenStone";
import { SecretNote } from "./SecretNote";
import { StoneRiddleGate } from "./StoneRiddleGate";

type Phase = "converge" | "flash" | "text";
type CountPhase = "countdown" | "question" | "sure" | "hidden";

const LINES = [
  "All six stones have been gathered.",
  "But there is one thing even the Infinity Stones can't create…",
];

export function FinalScene() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("converge");
  const [step, setStep] = useState(0);
  const [giftOpen, setGiftOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [secretRiddleOpen, setSecretRiddleOpen] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const [countPhase, setCountPhase] = useState<CountPhase>("countdown");
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [stoneAnswer, setStoneAnswer] = useState("");
  const [countWarning, setCountWarning] = useState(false);

  useEffect(() => {
    playSound("final", 0.5);
    const a = setTimeout(() => setPhase("flash"), reduced ? 1600 : 5200);
    const b = setTimeout(() => setPhase("text"), reduced ? 2400 : 6400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduced]);
  useEffect(() => {
  if (phase !== "text" || step >= 4) return;

  const t = setTimeout(
    () => setStep((s) => s + 1),
    reduced ? 2000 : 3600
  );

  return () => clearTimeout(t);
}, [phase, step, reduced]);

  useEffect(() => {
    if (!giftOpen || !gift.gif || countPhase !== "countdown") return;
    setSecondsLeft(10);
    const interval = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(interval);
          setCountPhase("question");
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [giftOpen, gift.gif, countPhase]);

  const handleStoneAnswer = (value: string) => {
    setStoneAnswer(value);
    setCountWarning(false);
    if (value.trim() === "6") {
      setCountPhase("sure");
      window.setTimeout(() => setCountPhase("hidden"), 900);
    } else if (value.trim().length > 0) {
      setCountWarning(true);
    }
  };

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-center">
      {phase === "converge" ? (
        <div className="relative h-[min(70vw,420px)] w-[min(70vw,420px)]">
          {stoneOrder.map((id, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <span
                key={id}
                className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full animate-[converge_5.2s_cubic-bezier(0.5,0,0.5,1)_forwards]"
                style={
                  {
                    background: `radial-gradient(circle at 35% 30%, #fff8, ${stones[id].color})`,
                    boxShadow: `0 0 40px 8px ${stones[id].color}88`,
                    "--sx": `${Math.cos(angle) * 160}px`,
                    "--sy": `${Math.sin(angle) * 160}px`,
                    animationDelay: `${i * 0.08}s`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      ) : null}

      {phase === "flash" ? (
        <div className="pointer-events-none fixed inset-0 z-50 animate-[flash_1.2s_ease-out_forwards] bg-white" />
      ) : null}

      {phase === "text" ? (
        <div className="max-w-2xl">
          {step === 0 && (
            <p
              key="l0"
              className="story-line font-display text-[clamp(1.1rem,4.6vw,1.9rem)] font-light text-star"
            >
              {LINES[0]}
            </p>
          )}
          {step === 1 && (
            <p
              key="l1"
              className="story-line font-display text-[clamp(1.1rem,4.6vw,1.9rem)] font-light text-star"
            >
              {LINES[1]}
            </p>
          )}
          {step >= 2 && (
            <div>
              <h2 className="reveal-up font-display text-[clamp(1.9rem,9vw,4.5rem)] leading-tight tracking-[0.08em] text-star">
                A SOUL KINDER THAN {celebrantName} <span className="text-[#ff5f7a]">❤</span>
              </h2>
              {step >= 3 && (
                <p
                  className="reveal-up mt-8 text-[clamp(0.75rem,3.4vw,1rem)] tracking-[0.34em] text-star-dim uppercase"
                  style={{ animationDelay: "0.2s" }}
                >
                  Happy Birthday My Dearest Friend, and to the only person I can proudly call Sa7by.
                </p>
              )}
              {step >= 3 && finalPhoto.enabled ? (
                <img
                  src={finalPhoto.src}
                  alt={finalPhoto.alt}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="photo-zoom mx-auto mt-12 max-h-[46svh] w-auto rounded-sm object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
                />
              ) : null}

              {step >= 4 && (gift.enabled || secretStone.enabled) ? (
                <div className="relative mx-auto mt-14 inline-block max-w-md">
                  {gift.enabled && !giftOpen ? (
                    <button
                      type="button"
                      onClick={() => {
                        setGiftOpen(true);
                        playSound("activate", 0.4);
                      }}
                      className="gift-in cursor-pointer rounded-full border border-star/30 bg-white/[0.03] px-9 py-4 text-[0.66rem] tracking-[0.4em] text-star uppercase backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] hover:border-star/60 hover:bg-white/[0.07]"
                    >
                      {gift.openLabel}
                    </button>
                  ) : null}

                  {gift.enabled && giftOpen ? (
                    <div className="gift-in max-w-md rounded-lg border border-star/20 bg-white/[0.03] p-7 backdrop-blur-sm">
                      <p className="text-[0.58rem] tracking-[0.42em] text-star-dim uppercase">
                        {gift.subtitle}
                      </p>
                      <h3 className="font-display mt-3 text-[clamp(1.2rem,5vw,1.8rem)] tracking-[0.06em] text-star">
                        {gift.title}
                      </h3>
                      {gift.gif ? (
                        <img
                          key={gift.gif}
                          src={gift.gif}
                          alt={gift.gifAlt}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          className="mx-auto mt-6 max-h-[30svh] w-auto rounded-sm object-contain shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
                        />
                      ) : null}

                      {gift.gif && countPhase === "countdown" ? (
                        <p className="mt-4 text-[0.7rem] tracking-[0.32em] text-star-dim uppercase">
                          {secondsLeft}
                        </p>
                      ) : null}

                      {gift.gif && countPhase === "question" ? (
                        <div className="mt-5">
                          <p
  className="reveal-up mt-8 text-[clamp(0.85rem,3.6vw,1.05rem)] tracking-[0.28em] text-star-dim uppercase"
  style={{ animationDelay: "0.2s" }}
>
  How many stones did you count?
</p>
                          <input
                            value={stoneAnswer}
                            onChange={(e) => handleStoneAnswer(e.target.value)}
                            inputMode="numeric"
                            autoComplete="off"
                            autoFocus
                            className="mx-auto mt-4 block w-full max-w-[190px] rounded-full border border-star/25 bg-white/[0.03] px-5 py-3 text-center text-[0.95rem] tracking-[0.25em] text-star outline-none focus:border-star/50"
                          />
                          {countWarning ? (
                            <p className="mt-3 text-[0.9rem] font-medium tracking-[0.2em] text-[#ff5f7a]">Yabdany</p>
                          ) : null}
                        </div>
                      ) : null}

                      {countPhase === "sure" ? (
                        <p className="mt-5 reveal-up font-display text-[clamp(1.2rem,5vw,1.7rem)] tracking-[0.08em] text-star">
                          are you sure?
                        </p>
                      ) : null}
                      {gift.image ? (
                        <img
                          src={gift.image}
                          alt={gift.imageAlt}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          className="mx-auto mt-6 max-h-[34svh] w-auto rounded-sm object-contain shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
                        />
                      ) : null}
                      <p className="mt-6 text-[clamp(0.8rem,3.4vw,0.95rem)] leading-relaxed whitespace-pre-line text-star-dim">
                        {gift.body}
                      </p>
                      {gift.link ? (
                        <a
                          href={gift.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-7 inline-block rounded-full border border-star/30 px-7 py-3 text-[0.62rem] tracking-[0.38em] text-star uppercase transition-colors duration-500 hover:border-star/60 hover:bg-white/[0.06]"
                        >
                          {gift.linkLabel}
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  {secretStone.enabled && countPhase === "hidden" ? (
                    <HiddenStone
                      color={secretStone.color}
                      label={secretStone.label}
                      found={secretFound}
                      onSelect={() => {
                        setSecretRiddleOpen(true);
                      }}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {secretRiddleOpen ? (
        <StoneRiddleGate
          riddle={secretStoneRiddle}
          accent={secretStone.color}
          variant="overlay"
          onSolved={() => {
            setSecretRiddleOpen(false);
            setSecretFound(true);
            setSecretOpen(true);
          }}
        />
      ) : null}

      {secretOpen ? <SecretNote onClose={() => setSecretOpen(false)} /> : null}
    </div>
  );
}
