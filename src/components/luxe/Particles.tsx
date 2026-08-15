import { motion } from "motion/react";
import type { Particle } from "@/data/states";

/** Deterministic pseudo-random so SSR and hydration agree. */
function seeded(i: number, salt: number) {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

const CONFIG: Record<
  Particle,
  { count: number; size: [number, number]; color: string; blur: number; rise: boolean }
> = {
  goldDust: { count: 44, size: [1, 3], color: "oklch(0.85 0.13 85)", blur: 0, rise: true },
  dew: { count: 26, size: [3, 7], color: "oklch(0.9 0.05 190)", blur: 1, rise: false },
  embers: { count: 30, size: [1.5, 4], color: "oklch(0.72 0.16 45)", blur: 1, rise: true },
  petals: { count: 20, size: [4, 9], color: "oklch(0.7 0.09 20)", blur: 1, rise: false },
  silverMist: { count: 22, size: [5, 14], color: "oklch(0.85 0.02 250)", blur: 6, rise: true },
  sparks: { count: 36, size: [1, 2.5], color: "oklch(0.9 0.12 92)", blur: 0, rise: true },
};

export function Particles({ kind }: { kind: Particle }) {
  const cfg = CONFIG[kind];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: cfg.count }).map((_, i) => {
        const r = (n: number, d = 3) => Number(n.toFixed(d));
        const left = r(seeded(i, 1) * 100);
        const top = r(seeded(i, 2) * 100);
        const size = r(cfg.size[0]! + seeded(i, 3) * (cfg.size[1]! - cfg.size[0]!));
        const dur = r(6 + seeded(i, 4) * 10);
        const delay = r(seeded(i, 5) * 6);
        const drift = r((seeded(i, 6) - 0.5) * 60);
        return (
          <motion.span
            key={`${kind}-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.85, 0],
              y: cfg.rise ? [0, -140] : [0, 120],
              x: [0, drift],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: cfg.color,
              filter: cfg.blur ? `blur(${cfg.blur}px)` : undefined,
              boxShadow: `0 0 ${size * 4}px ${cfg.color}`,
            }}
            className="absolute rounded-full"
          />
        );
      })}
    </div>
  );
}
