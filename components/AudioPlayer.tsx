"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl?: string;
  isPlaying: boolean;
  onEnded?: () => void;
}

export default function AudioPlayer({
  audioUrl,
  isPlaying,
  onEnded,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying && !isPaused) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isPaused, audioUrl]);

  const handleToggle = () => {
    setIsPaused(!isPaused);
  };

  if (!audioUrl) {
    return (
      <div className="text-center text-tea-accent text-sm py-4">
        Nessun audio disponibile per questa storia
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <audio ref={audioRef} src={audioUrl} onEnded={onEnded} />
      <button
        onClick={handleToggle}
        className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-tea-dark text-white flex items-center justify-center hover:bg-tea-accent active:bg-tea-accent transition-colors touch-manipulation"
        aria-label={isPaused ? "Riproduci" : "Pausa"}
      >
        {isPaused ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        )}
      </button>
      <span className="text-sm text-tea-dark">
        {isPaused ? "In pausa" : "In riproduzione"}
      </span>
    </div>
  );
}
