"use client";

import { Story } from "@/lib/types";

interface StoryDisplayProps {
  story: Story;
  elapsedSeconds: number;
  totalSeconds: number;
}

export default function StoryDisplay({ story }: StoryDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="space-y-6">
        {/* Titolo */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tea-dark text-center px-2">
          {story.title}
        </h1>

        {/* Sottotitolo */}
        <h2 className="text-lg sm:text-xl md:text-2xl text-tea-accent text-center italic px-2">
          {story.subtitle}
        </h2>

        {/* Contenuto */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-tea-dark whitespace-pre-wrap px-2">
            {story.content}
          </p>
        </div>
      </div>
    </div>
  );
}
