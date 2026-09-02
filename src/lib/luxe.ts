import type { Transition } from "motion/react";

/** Cinematic silk easing used across every SAMBODRA animation. */
export const EASE_SILK = [0.43, 0.13, 0.23, 0.96] as const;

export const silk = (duration = 0.9, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_SILK,
});

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.12, ease: EASE_SILK },
  }),
};

export const revealChars = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: 0.3 + i * 0.05, ease: EASE_SILK },
  }),
};
