"use client";

interface TimerSelectorProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

export default function TimerSelector({
  selectedDuration,
  onDurationChange,
}: TimerSelectorProps) {
  const durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center text-tea-dark">
        Scegli il tempo di infusione
      </h2>
      <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-md mx-auto">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => onDurationChange(duration)}
            className={`
              px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all touch-manipulation
              ${
                selectedDuration === duration
                  ? "bg-tea-dark text-white shadow-lg"
                  : "bg-white text-tea-dark border-2 border-tea-medium hover:border-tea-dark active:bg-tea-light"
              }
            `}
          >
            {duration}
          </button>
        ))}
      </div>
      <p className="text-center mt-4 text-tea-accent text-sm">
        {selectedDuration} {selectedDuration === 1 ? "minuto" : "minuti"}
      </p>
    </div>
  );
}
