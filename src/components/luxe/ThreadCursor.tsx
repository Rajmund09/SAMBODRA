import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Golden thread cursor: a ring that trails the pointer plus a fine motif dot. */
export function ThreadCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div className="cursor-luxe pointer-events-none fixed inset-0 z-[120]">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -left-6 -top-6 h-12 w-12"
      >
        <motion.div
          animate={{ scale: active ? 1.7 : 1, opacity: active ? 0.9 : 0.55 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="h-full w-full rounded-full border border-gold/70"
        />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute -left-[3px] -top-[3px]">
        <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />
      </motion.div>
    </div>
  );
}
