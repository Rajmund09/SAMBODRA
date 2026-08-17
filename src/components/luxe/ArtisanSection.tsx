import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import artisan from "@/assets/artisan.jpg";
import { EASE_SILK, fadeUp } from "@/lib/luxe";
import { MagneticButton } from "./MagneticButton";
import { Motif } from "./Motif";

const STATS = [
  { value: "312", label: "Weaving families" },
  { value: "6", label: "Loom clusters" },
  { value: "48–186", label: "Days per saree" },
  { value: "100%", label: "Pure zari" },
];

export function ArtisanSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="artisans" ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute -right-24 top-20 opacity-[0.06]">
        <Motif kind="paisley" className="h-[28rem] w-[28rem] animate-spin-slow text-gold" />
      </div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: EASE_SILK }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <motion.img
            style={{ y }}
            src={artisan}
            alt="A master weaver at a pit loom, hands passing the shuttle through silk warp threads"
            loading="lazy"
            className="h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent" />
          <div className="glass-panel absolute bottom-5 left-5 right-5 p-5">
            <p className="font-serif text-lg text-ivory">Ramesh Meher · Bargarh</p>
            <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-luxe text-gold/75">
              Fourth-generation bandha weaver
            </p>
          </div>
        </motion.div>

        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold/75"
          >
            The Hands
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-5 font-display text-3xl leading-[1.15] text-ivory md:text-5xl"
          >
            Every thread carries
            <span className="block text-gold-gradient">a signature</span>
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-7 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground"
          >
            We commission directly from the loom. No middlemen, no power-loom substitutes, no
            imported zari passed off as pure. Weavers set their own price and keep their name on the
            selvedge — a practice we insist on for every piece in the register.
          </motion.p>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="font-display text-2xl text-gold-gradient md:text-3xl">{s.value}</p>
                <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <MagneticButton variant="outline">Meet the weavers</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
