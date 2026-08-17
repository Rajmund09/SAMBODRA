import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import heritage1 from "@/assets/heritage-1.jpg";
import heritage2 from "@/assets/heritage-2.jpg";
import { EASE_SILK, fadeUp } from "@/lib/luxe";
import { SectionHeading } from "./SectionHeading";

const ERAS = [
  {
    year: "2800 BCE",
    title: "Cotton at Mohenjo-daro",
    body: "Spindle whorls and dyed cotton fragments place Indian weaving among the oldest continuous crafts on earth.",
    image: heritage1,
  },
  {
    year: "300 BCE",
    title: "The Silk Routes",
    body: "Kausheya silk travels west; Roman senators complain of gold draining east for cloth 'woven of woven wind'.",
  },
  {
    year: "16th C.",
    title: "Mughal Karkhanas",
    body: "Imperial workshops in Varanasi fuse Persian floral geometry with Indian brocade, birthing the Banarasi.",
    image: heritage2,
  },
  {
    year: "1905",
    title: "Swadeshi Looms",
    body: "The handloom becomes a political instrument; village clusters organise, and regional identities harden into signatures.",
  },
  {
    year: "Today",
    title: "SAMBODRA",
    body: "Direct commissions to master weavers, full provenance on every saree, and prices set by the loom — not the middleman.",
  },
];

export function HeritageTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="heritage" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHeading
          eyebrow="The Heritage Timeline"
          title="Five thousand years, one continuous thread"
          copy="Every saree in the register descends from a lineage that predates most nations. This is where the thread begins."
        />

        <div ref={ref} className="relative mt-24">
          <div className="absolute left-[7px] top-0 h-full w-px bg-gold/12 md:left-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-[7px] top-0 w-px bg-[image:var(--gradient-gold)] md:left-1/2"
          />

          <div className="space-y-24">
            {ERAS.map((era, i) => (
              <motion.div
                key={era.year}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className={`relative grid gap-8 pl-10 md:grid-cols-2 md:gap-16 md:pl-0 ${
                  i % 2 ? "md:[direction:rtl]" : ""
                }`}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE_SILK }}
                  className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border border-gold bg-charcoal shadow-[0_0_18px_var(--gold)] md:left-1/2 md:-translate-x-1/2"
                />

                <div className={`[direction:ltr] ${i % 2 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                  <p className="font-sans text-[0.62rem] uppercase tracking-luxe text-gold/70">
                    {era.year}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-ivory md:text-3xl">{era.title}</h3>
                  <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:inline-block">
                    {era.body}
                  </p>
                </div>

                <div className="[direction:ltr]">
                  {era.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.08 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE_SILK }}
                      className={`silk-sheen overflow-hidden border border-gold/15 ${
                        i % 2 ? "md:mr-16" : "md:ml-16"
                      }`}
                    >
                      <img
                        src={era.image}
                        alt={era.title}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="h-56 w-full object-cover opacity-80 transition-transform duration-[1400ms] ease-[cubic-bezier(0.43,0.13,0.23,0.96)] hover:scale-105 md:h-64"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
