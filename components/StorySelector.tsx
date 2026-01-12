"use client";

import { Story } from "@/lib/types";

interface StorySelectorProps {
  stories: Story[];
  selectedStory: Story | null;
  onStorySelect: (story: Story) => void;
  duration: number;
}

export default function StorySelector({
  stories,
  selectedStory,
  onStorySelect,
  duration,
}: StorySelectorProps) {
  // Filtra storie per durata esatta (mostra solo storie con durata === timer selezionato)
  const availableStories = stories.filter((s) => s.duration === duration);

  if (availableStories.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-tea-accent">
          Nessuna storia disponibile per {duration}{" "}
          {duration === 1 ? "minuto" : "minuti"}.
          <br />
          Crea una nuova storia dal pannello admin!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center text-tea-dark">
        Scegli una storia
      </h2>
      <div className="space-y-3 max-w-2xl mx-auto">
        {availableStories.map((story) => (
          <button
            key={story.id}
            onClick={() => onStorySelect(story)}
            className={`
              w-full text-left p-4 rounded-lg transition-all
              ${
                selectedStory?.id === story.id
                  ? "bg-tea-dark text-white shadow-lg"
                  : "bg-white text-tea-dark border-2 border-tea-medium hover:border-tea-dark"
              }
            `}
          >
            <h3 className="font-bold text-lg mb-1">{story.title}</h3>
            <p className="text-sm opacity-80">{story.subtitle}</p>
            <p className="text-xs mt-2 opacity-60">
              Durata: {story.duration}{" "}
              {story.duration === 1 ? "minuto" : "minuti"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
