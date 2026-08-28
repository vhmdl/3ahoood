import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { IntroScene } from "@/components/IntroScene";
import { RiddleScene } from "@/components/RiddleScene";
import { StoryScene } from "@/components/StoryScene";
import { InfinityStones } from "@/components/InfinityStones";
import { MessageScene } from "@/components/MessageScene";
import { StoneRiddleGate } from "@/components/StoneRiddleGate";
import { StoneTransition } from "@/components/StoneTransition";
import { WarpTransition } from "@/components/WarpTransition";
import { FinalScene } from "@/components/FinalScene";
import { riddle } from "@/data/riddle";
import { stoneRiddles } from "@/data/stoneRiddles";
import { stoneOrder, stones, type StoneId } from "@/data/stones";
import { playSound, unlockAudio } from "@/lib/audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "3HOODA — A Story Written Across the Universe" },
      {
        name: "description",
        content:
          "An interactive cosmic birthday experience for 3HOODA: gather the six stones and unlock a message hidden inside each one.",
      },
      { property: "og:title", content: "3HOODA — A Story Written Across the Universe" },
      {
        property: "og:description",
        content: "Six stones. Six messages. One cinematic birthday journey for 3HOODA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

type Scene = "intro" | "riddle" | "story" | "stones" | "stone-riddle" | "message" | "final";

function Experience() {
  const [scene, setScene] = useState<Scene>("intro");
  const [warping, setWarping] = useState(false);
  const [selected, setSelected] = useState<StoneId | null>(null);
  const [focused, setFocused] = useState<StoneId | null>(null);
  const [stoneFx, setStoneFx] = useState<StoneId | null>(null);
  const [leavingMessage, setLeavingMessage] = useState(false);
  const [collected, setCollected] = useState<StoneId[]>([]);

  const start = useCallback(() => {
    unlockAudio();
    setWarping(true);
    setTimeout(() => {
      setScene(riddle.enabled ? "riddle" : "story");
      setWarping(false);
    }, 1600);
  }, []);

  const openStone = useCallback((id: StoneId) => {
    playSound("activate", 0.45);
    setSelected(id);
    setFocused(id);
    setStoneFx(null);
    setScene("stone-riddle");
  }, []);

  const solveStoneRiddle = useCallback(() => {
    if (!selected) return;

    const id = selected;
    setCollected((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFocused(id);
    setStoneFx(id);
    playSound("transition", 0.4);

    window.setTimeout(() => {
      setFocused(null);
      setStoneFx(null);
      setScene("message");
    }, 1700);
  }, [selected]);

  const returnToStones = useCallback(() => {
  setLeavingMessage(true);

  setTimeout(() => {
    setLeavingMessage(false);
    setSelected(null);

    setCollected((current) => {
      setScene(
        current.length === stoneOrder.length ? "final" : "stones"
      );

      return current;
    });
  }, 750);
}, []);

  const tint =
    (scene === "message" || scene === "stone-riddle") && selected
      ? stones[selected].color
      : focused
        ? stones[focused].color
        : undefined;

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <CosmicBackground
        tint={tint}
        intensity={scene === "final" ? 1 : focused ? 0.5 : 0}
        paused={focused !== null || stoneFx !== null}
      />

      {scene === "intro" && <IntroScene onStart={start} launching={warping} />}
      {scene === "riddle" && <RiddleScene onSolved={() => setScene("story")} />}
      {scene === "story" && <StoryScene onDone={() => setScene("stones")} />}
      {scene === "stones" && (
        <InfinityStones collected={collected} focusedStone={focused} onSelect={openStone} />
      )}
      {scene === "stone-riddle" && selected && (
        <StoneRiddleGate
          key={selected}
          riddle={stoneRiddles[selected]}
          accent={stones[selected].color}
          onSolved={solveStoneRiddle}
        />
      )}
      {scene === "message" && selected && (
        <MessageScene
          key={selected}
          stone={stones[selected]}
          onReturn={returnToStones}
          leaving={leavingMessage}
        />
      )}
      {scene === "final" && <FinalScene />}

      {stoneFx && <StoneTransition stoneId={stoneFx} />}
      <WarpTransition active={warping} />
    </main>
  );
}
