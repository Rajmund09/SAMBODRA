interface MotifProps {
  kind: "chakra" | "lotus" | "temple" | "paisley" | "conch" | "sun";
  className?: string;
  stroke?: string;
}

/** Decorative hand-drawn style mandala motifs, rendered as pure SVG line art. */
export function Motif({ kind, className, stroke = "currentColor" }: MotifProps) {
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 0.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g {...common}>
        <circle cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="34" />
        {kind === "chakra" &&
          Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="16"
              x2="50"
              y2="4"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
        {kind === "chakra" && <circle cx="50" cy="50" r="10" />}

        {kind === "lotus" &&
          Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M50 50 C 42 34, 42 22, 50 8 C 58 22, 58 34, 50 50 Z"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}

        {kind === "temple" &&
          Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M44 20 L50 6 L56 20 Z"
              transform={`rotate(${i * 22.5} 50 50)`}
            />
          ))}

        {kind === "paisley" &&
          Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M50 46 C 34 42, 28 26, 42 16 C 54 8, 62 20, 52 28 C 46 33, 46 40, 50 46 Z"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}

        {kind === "conch" && (
          <>
            <path d="M50 8 C 70 20, 78 44, 62 62 C 52 74, 38 72, 34 60 C 30 46, 44 42, 48 52" />
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx="50" cy="14" r="2.4" transform={`rotate(${i * 45} 50 50)`} />
            ))}
          </>
        )}

        {kind === "sun" && (
          <>
            <circle cx="50" cy="50" r="18" />
            {Array.from({ length: 32 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="26"
                x2="50"
                y2={i % 2 ? 14 : 6}
                transform={`rotate(${i * 11.25} 50 50)`}
              />
            ))}
          </>
        )}
      </g>
    </svg>
  );
}
