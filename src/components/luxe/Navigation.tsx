import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { EASE_SILK } from "@/lib/luxe";
import { STATES } from "@/data/states";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";
import GlassSurface from "@/components/effects/GlassSurface";
import { scrollToId } from "@/lib/scroll";
import { useBoutique } from "@/store/useBoutique";

const COLLECTIONS = [
  { title: "Bridal Vault", note: "Ceremonial silks, kadhwa zari" },
  { title: "Everyday Heirloom", note: "Featherweight cottons & mulmul" },
  { title: "The Gold Register", note: "Pure zari, limited looms" },
  { title: "Archive Revivals", note: "Reconstructed 19th-century motifs" },
];

export function Navigation() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const { setIsBookingOpen } = useBoutique();

  const handleNavClick = (e: React.MouseEvent, key: string) => {
    if (key === "collections" || key === "states") {
      e.preventDefault();
      scrollToId(`#${key}`);
    } else {
      // Allow normal link navigation for other items
    }
  };
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 60));

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 2.4, ease: EASE_SILK }}
      onMouseLeave={() => setOpen(null)}
      className="fixed inset-x-0 top-0 z-[100] flex justify-center pt-0 md:pt-4 pointer-events-none"
    >
      <div
        className={cn(
          "pointer-events-auto relative w-full transition-all duration-700 ease-[cubic-bezier(0.43,0.13,0.23,0.96)]",
          solid
            ? "max-w-[1100px] mx-4 rounded-full py-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] border border-gold/40 ring-1 ring-gold/20"
            : "max-w-[1400px] py-6"
        )}
      >
        {solid && (
          <div className="absolute inset-0 z-[-1] overflow-hidden rounded-full">
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={9999}
              borderWidth={0}
              brightness={40}
              opacity={0.8}
              blur={15}
              displace={0}
              backgroundOpacity={0.6}
              saturation={1.2}
              className="h-full w-full"
            />
          </div>
        )}
        <nav className="relative z-10 mx-auto flex w-full items-center justify-between px-5 md:px-8">
          <a href="#top" className="group flex items-center gap-3" data-cursor="hover">
            <span className="font-display text-lg tracking-luxe text-gold-gradient md:text-xl">
              SAMBODRA
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
          {[
            { label: "Collections", key: "collections" },
            { label: "States", key: "states" },
          ].map((item) => (
            <li key={item.key} className="relative">
              <a
                href={item.key === "collections" || item.key === "states" ? `#${item.key}` : `/${item.key}`}
                onClick={(e) => handleNavClick(e, item.key)}
                onMouseEnter={() => setOpen(item.key)}
                className={cn(
                  "font-sans text-[0.65rem] uppercase tracking-luxe transition-colors duration-500",
                  open === item.key ? "text-gold" : "text-ivory/80 hover:text-gold"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          {["Heritage", "Artisans", "Atelier"].map((l) => (
            <li key={l} onMouseEnter={() => setOpen(null)}>
              <a
                href={`#${l.toLowerCase()}`}
                className="font-sans text-[0.68rem] uppercase tracking-luxe text-ivory/75 transition-colors duration-500 hover:text-gold"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <MagneticButton variant="outline" className="px-6 py-3" onClick={() => setIsBookingOpen(true)}>
            Book a Viewing
          </MagneticButton>
        </div>

        <button
          onClick={() => setMobile(true)}
          className="text-gold lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: EASE_SILK }}
            className="glass-panel absolute inset-x-0 top-full hidden border-t border-gold/15 lg:block"
          >
            <div className="mx-auto grid max-w-[1400px] gap-10 px-10 py-12 md:grid-cols-[1.1fr_2fr]">
              <div>
                <p className="font-display text-3xl text-gold-gradient">
                  {open === "collections" ? "The Collections" : "Woven Geographies"}
                </p>
                <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
                  {open === "collections"
                    ? "Curated ranges, each limited to the output of a single cluster of looms."
                    : "Six weaving regions, six vocabularies of thread, dye and devotion."}
                </p>
              </div>
              <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                {(open === "collections"
                  ? COLLECTIONS.map((c) => ({ title: c.title, note: c.note, href: "#collections" }))
                  : STATES.map((s) => ({ title: s.name, note: s.weave, href: "#states" }))
                ).map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpen(null)}
                    className="group border-b border-gold/10 pb-3 transition-colors duration-500 hover:border-gold/50"
                    data-cursor="hover"
                  >
                    <p className="font-serif text-lg text-ivory transition-transform duration-700 ease-[cubic-bezier(0.43,0.13,0.23,0.96)] group-hover:translate-x-1.5 group-hover:text-gold">
                      {item.title}
                    </p>
                    <p className="mt-1 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.note}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_SILK }}
            className="fixed inset-0 z-[110] bg-charcoal/97 px-6 py-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display tracking-luxe text-gold-gradient">SAMBODRA</span>
              <button onClick={() => setMobile(false)} aria-label="Close menu" className="text-gold">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-14 space-y-6">
              {["Collections", "States", "Heritage", "Artisans", "Atelier"].map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.7, ease: EASE_SILK }}
                >
                  <a
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setMobile(false)}
                    className="font-display text-3xl text-ivory"
                  >
                    {l}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-14">
              <MagneticButton onClick={() => setIsBookingOpen(true)}>Book a Viewing</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.header>
  );
}
