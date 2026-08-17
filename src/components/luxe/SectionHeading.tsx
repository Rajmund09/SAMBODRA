import { motion } from "motion/react";
import { EASE_SILK } from "@/lib/luxe";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, copy, align = "center", className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE_SILK }}
        className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold/75"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.08, ease: EASE_SILK }}
        className="max-w-3xl font-display text-3xl leading-[1.15] text-ivory md:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_SILK }}
        className="hairline h-px w-40"
      />
      {copy && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.28, ease: EASE_SILK }}
          className="max-w-xl font-sans text-sm leading-relaxed text-muted-foreground"
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}
