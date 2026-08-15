import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "outline" | "ghost";
  strength?: number;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className,
  variant = "gold",
  strength = 0.35,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    gold: "bg-[image:var(--gradient-gold)] text-[oklch(0.16_0.008_60)] shadow-[var(--shadow-glow)]",
    outline: "border border-gold/45 text-gold hover:border-gold",
    ghost: "text-ivory/80 hover:text-gold",
  }[variant];

  const Inner = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="inline-block"
      data-cursor="hover"
    >
      <Inner
        href={href}
        onClick={onClick}
        className={cn(
          "silk-sheen group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-sans text-[0.72rem] uppercase tracking-luxe transition-all duration-700 ease-[cubic-bezier(0.43,0.13,0.23,0.96)] hover:scale-[1.03]",
          styles,
          className,
        )}
      >
        {children}
      </Inner>
    </motion.div>
  );
}
