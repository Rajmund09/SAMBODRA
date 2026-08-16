import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import heroSilk from "@/assets/hero-silk.jpg";
import { EASE_SILK, revealChars } from "@/lib/luxe";
import { MagneticButton } from "./MagneticButton";
import { Motif } from "./Motif";
import { Particles } from "./Particles";
import LightRays from "@/components/effects/LightRays";

const TITLE = "SAMBODRA";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroSilk}
          alt="Deep maroon silk saree with gold zari weaving"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-royal)] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/70" />
        <LightRays
          raysOrigin="top-center"
          raysColor="#D4AF37"
          raysSpeed={1.0}
          lightSpread={0.8}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.05}
          distortion={0.05}
          className="opacity-60 mix-blend-screen"
        />
      </motion.div>

      <Particles kind="goldDust" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -right-24 top-24 h-[26rem] w-[26rem] text-gold/10 md:-right-16"
      >
        <Motif kind="paisley" className="h-full w-full" />
      </motion.div>
      <div className="animate-float-slow absolute -left-20 bottom-10 h-72 w-72 text-rose-gold/10">
        <Motif kind="lotus" className="h-full w-full" />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.5, ease: EASE_SILK }}
          className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold/80 md:text-[0.7rem]"
        >
          Est. Handloom Atelier · India
        </motion.p>

        <h1 className="mt-8 flex flex-wrap justify-center font-display text-[15vw] leading-[0.95] tracking-[0.06em] md:text-[9.5vw] lg:text-[8rem]">
          {TITLE.split("").map((c, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={revealChars}
              initial="hidden"
              animate="show"
              className="text-gold-gradient inline-block"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 3, ease: EASE_SILK }}
          className="hairline mt-8 h-px w-[min(28rem,80vw)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.15, ease: EASE_SILK }}
          className="mt-8 max-w-xl font-serif text-lg italic text-ivory/80 md:text-2xl"
        >
          The Threads of Heritage
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 3.4, ease: EASE_SILK }}
          className="mt-5 max-w-md font-sans text-sm leading-relaxed text-muted-foreground"
        >
          Six regions. Nine hundred looms. One register of sarees woven only to order,
          in silk, zari and time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.6, ease: EASE_SILK }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row"
        >
          <MagneticButton href="#collections">Explore the Royal Collection</MagneticButton>
          <MagneticButton href="#heritage" variant="ghost">
            Our Heritage
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-gold/60"
        >
          <span className="font-sans text-[0.55rem] uppercase tracking-luxe">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
