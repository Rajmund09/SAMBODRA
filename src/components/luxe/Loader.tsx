import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_SILK } from "@/lib/luxe";
import { Motif } from "./Motif";

export function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / 2200) * 100);
      setCount(Math.floor(p));
      if (p < 100) frame = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 320);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 1.1, ease: EASE_SILK }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal"
        >
          <div className="relative h-40 w-40">
            <Motif kind="chakra" className="animate-spin-slow h-full w-full text-gold/70" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6"
            >
              <Motif kind="lotus" className="h-full w-full text-rose-gold/60" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_SILK }}
            className="mt-10 font-display text-2xl tracking-luxe text-gold-gradient"
          >
            SAMBODRA
          </motion.p>

          <div className="mt-6 h-px w-56 overflow-hidden bg-gold/15">
            <motion.div
              className="h-full bg-[image:var(--gradient-gold)]"
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          <p className="mt-4 font-sans text-[0.6rem] tracking-luxe text-muted-foreground">
            WEAVING {count}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
