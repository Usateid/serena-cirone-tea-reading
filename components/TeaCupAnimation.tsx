"use client";

interface TeaCupAnimationProps {
  isActive: boolean;
}

export default function TeaCupAnimation({ isActive }: TeaCupAnimationProps) {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 mx-auto">
      {/* Tazzina */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Piattino */}
        <ellipse
          cx="100"
          cy="180"
          rx="70"
          ry="8"
          fill="#D4C4B0"
          opacity="0.6"
        />

        {/* Tazzina */}
        <path
          d="M 60 120 Q 60 100 80 100 L 120 100 Q 140 100 140 120 L 140 160 Q 140 180 120 180 L 80 180 Q 60 180 60 160 Z"
          fill="#8B5A3C"
          stroke="#6B5A3C"
          strokeWidth="2"
        />

        {/* Manico */}
        <path
          d="M 140 130 Q 160 130 160 150 Q 160 170 140 170"
          fill="none"
          stroke="#8B5A3C"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Liquido */}
        <ellipse
          cx="100"
          cy="120"
          rx="40"
          ry="5"
          fill="#6B5A3C"
          opacity="0.8"
        />
      </svg>

      {/* Vapore statico */}
      {isActive && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-1 h-16 bg-white rounded-full opacity-30"
              style={{
                left: `${-20 + i * 20}px`,
                top: "-20px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
