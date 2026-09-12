import { useState } from "react";
import { motion } from "motion/react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { EASE_SILK } from "@/lib/luxe";
import { PIECES } from "@/data/collection";
import { MagneticButton } from "./MagneticButton";
import { Motif } from "./Motif";
import { cn } from "@/lib/utils";
import { useBoutique } from "@/store/useBoutique";
import { scrollToId } from "@/lib/scroll";
import { Link } from "@tanstack/react-router";

const LINKS = [
  {
    title: "Atelier",
    items: ["Book a viewing", "Bespoke commissions", "Drape services", "Restoration"],
  },
  { title: "The House", items: ["Heritage", "Weaver register", "Zari standards", "Journal"] },
  { title: "Care", items: ["Shipping", "Returns", "Silk care", "Contact"] },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { setIsBookingOpen } = useBoutique();

  const handleLinkClick = (e: React.MouseEvent, item: string) => {
    if (item === "Book a viewing") {
      e.preventDefault();
      setIsBookingOpen(true);
    } else if (item === "Heritage") {
      e.preventDefault();
      scrollToId("#heritage");
    }
  };

  return (
    <footer id="atelier" className="relative overflow-hidden border-t border-gold/15 pt-24">
      <div className="pointer-events-none absolute -left-32 -top-32 opacity-[0.05]">
        <Motif kind="lotus" className="h-[30rem] w-[30rem] text-gold" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-2xl tracking-luxe text-gold-gradient">SAMBODRA</p>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
              A private register of handwoven Indian sarees, released in editions of one to twelve.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="relative mt-10 max-w-sm"
            >
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border-b border-gold/25 bg-transparent pb-3 pt-6 font-sans text-sm text-ivory outline-none transition-colors duration-500 focus:border-gold"
                placeholder=" "
              />
              <label
                htmlFor="newsletter"
                className={cn(
                  "pointer-events-none absolute left-0 font-sans text-[0.62rem] uppercase tracking-luxe text-muted-foreground transition-all duration-500 ease-[cubic-bezier(0.43,0.13,0.23,0.96)]",
                  "top-0 peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-[0.62rem] peer-focus:text-gold",
                )}
              >
                Join the private register
              </label>
              <button
                type="submit"
                className="mt-6 font-sans text-[0.62rem] uppercase tracking-luxe text-gold transition-opacity duration-500 hover:opacity-70"
              >
                {sent ? "Welcome — we'll be in touch" : "Subscribe"}
              </button>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {LINKS.map((col) => (
              <div key={col.title}>
                <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold/75">
                  {col.title}
                </p>
                <ul className="mt-6 space-y-3.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href={item === "Book a viewing" ? "#book" : item === "Heritage" ? "#heritage" : item === "Journal" ? "/journal" : item === "Weaver register" ? "/weavers" : "#"}
                        onClick={(e) => handleLinkClick(e, item)}
                        className="font-sans text-sm text-ivory/70 transition-colors duration-500 hover:text-gold"
                        data-cursor="hover"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold/75">
            From the loom floor
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {PIECES.map((p, i) => (
              <motion.a
                key={p.id}
                href="#collections"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_SILK }}
                className="group relative aspect-square overflow-hidden rounded-sm"
                data-cursor="hover"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.43,0.13,0.23,0.96)] group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-charcoal/70 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <Instagram className="h-5 w-5 text-gold" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-gold/12 py-10 font-sans text-xs text-muted-foreground sm:grid-cols-3">
          <p className="flex items-center gap-2.5">
            <MapPin className="h-3.5 w-3.5 text-gold" /> 14 Chowringhee Terrace, Kolkata
          </p>
          <p className="flex items-center gap-2.5">
            <Phone className="h-3.5 w-3.5 text-gold" /> +91 33 4000 1890
          </p>
          <p className="flex items-center gap-2.5">
            <Mail className="h-3.5 w-3.5 text-gold" /> atelier@sambodra.in
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 pb-10">
          <MagneticButton onClick={() => setIsBookingOpen(true)}>Book a private viewing</MagneticButton>
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
            © {new Date().getFullYear()} Sambodra · Handwoven in India
          </p>
        </div>
      </div>
    </footer>
  );
}
