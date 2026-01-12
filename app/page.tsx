"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TimerSelector from "@/components/TimerSelector";
import StorySelector from "@/components/StorySelector";
import InstallPrompt from "@/components/InstallPrompt";
import { Story, TimerSettings } from "@/lib/types";
import { getStories } from "@/lib/stories";

export default function Home() {
  const [duration, setDuration] = useState(3);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [mode, setMode] = useState<"text" | "audio">("text");
  const [stories, setStories] = useState<Story[]>([]);
  const router = useRouter();

  useEffect(() => {
    setStories(getStories());
  }, []);

  const handleStart = () => {
    if (!selectedStory) return;

    const settings: TimerSettings = {
      duration,
      story: selectedStory,
      mode,
    };

    // Salva le impostazioni in sessionStorage
    sessionStorage.setItem("timerSettings", JSON.stringify(settings));
    router.push("/countdown");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <InstallPrompt />

      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-tea-dark mb-3 sm:mb-4">
            ReadYourTea
          </h1>
          <p className="text-base sm:text-xl text-tea-accent px-2">
            Scegli il tempo di infusione e accompagna l&apos;attesa con una
            storia
          </p>
        </div>

        <TimerSelector
          selectedDuration={duration}
          onDurationChange={setDuration}
        />

        <StorySelector
          stories={stories}
          selectedStory={selectedStory}
          onStorySelect={setSelectedStory}
          duration={duration}
        />

        {/* {selectedStory && (
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center text-tea-dark">
              Modalità
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setMode("text")}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${
                    mode === "text"
                      ? "bg-tea-dark text-white shadow-lg"
                      : "bg-white text-tea-dark border-2 border-tea-medium hover:border-tea-dark"
                  }
                `}
              >
                📖 Testo
              </button>
              <button
                onClick={() => setMode("audio")}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${
                    mode === "audio"
                      ? "bg-tea-dark text-white shadow-lg"
                      : "bg-white text-tea-dark border-2 border-tea-medium hover:border-tea-dark"
                  }
                `}
              >
                🎧 Audio
              </button>
            </div>
          </div>
        )} */}

        <div className="flex justify-center pt-4">
          <button
            onClick={handleStart}
            disabled={!selectedStory}
            className={`
              px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-lg sm:text-xl transition-all touch-manipulation min-h-[48px]
              ${
                selectedStory
                  ? "bg-tea-green text-white shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Inizia Infusione
          </button>
        </div>

        {/* <div className="text-center pt-8">
          <a
            href="/admin"
            className="text-tea-accent hover:text-tea-dark underline text-sm"
          >
            Pannello Admin
          </a>
        </div> */}
      </div>
    </main>
  );
}
