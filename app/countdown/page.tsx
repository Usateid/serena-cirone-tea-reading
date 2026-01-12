"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TeaCupAnimation from "@/components/TeaCupAnimation";
import StoryDisplay from "@/components/StoryDisplay";
import AudioPlayer from "@/components/AudioPlayer";
import { TimerSettings } from "@/lib/types";

export default function CountdownPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<TimerSettings | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    // Carica le impostazioni da sessionStorage
    const stored = sessionStorage.getItem("timerSettings");
    if (!stored) {
      router.push("/");
      return;
    }

    try {
      const parsed: TimerSettings = JSON.parse(stored);
      setSettings(parsed);
      setSecondsRemaining(parsed.duration * 60);
    } catch {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (!isActive || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = settings
    ? ((settings.duration * 60 - secondsRemaining) / (settings.duration * 60)) *
      100
    : 0;

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-tea-dark">Caricamento...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-b from-tea-light to-white pt-24 sm:pt-28">
      {/* Timer circolare - sempre visibile */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="#D4C4B0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="#8B5A3C"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl sm:text-3xl font-bold text-tea-dark">
                {formatTime(secondsRemaining)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-8 mt-8">
        {/* Tazzina */}
        <div className="pt-8">
          <TeaCupAnimation isActive={isActive && !isComplete} />
        </div>

        {/* Display storia o audio */}
        {settings.mode === "text" ? (
          <div>
            <StoryDisplay
              story={settings.story}
              elapsedSeconds={elapsedSeconds}
              totalSeconds={settings.duration * 60}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center px-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-tea-dark mb-2">
                {settings.story.title}
              </h2>
              <p className="text-lg sm:text-xl text-tea-accent italic">
                {settings.story.subtitle}
              </p>
            </div>
            <AudioPlayer
              audioUrl={settings.story.audioUrl}
              isPlaying={isActive && !isComplete}
            />
          </div>
        )}

        {/* Messaggio completamento */}
        {isComplete && (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-tea-dark">
              Il tuo tè è pronto!
            </h2>
            <p className="text-base sm:text-lg text-tea-accent">
              Buona degustazione e buona lettura
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-tea-dark text-white rounded-lg font-semibold hover:bg-tea-accent transition-colors touch-manipulation min-h-[48px]"
              >
                Nuova Infusione
              </button>
            </div>
          </div>
        )}

        {/* Pulsante pausa/riprendi */}
        {/* {!isComplete && (
          <div className="flex justify-center pb-8">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-6 py-3 bg-tea-accent text-white rounded-lg font-semibold hover:bg-tea-dark transition-colors touch-manipulation min-h-[48px]"
            >
              {isActive ? "⏸ Pausa" : "▶ Riprendi"}
            </button>
          </div>
        )} */}
      </div>
    </main>
  );
}
