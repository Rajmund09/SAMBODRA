import { AnimatePresence, motion } from "motion/react";
import { Heart, Plus, X } from "lucide-react";
import { PIECES } from "@/data/collection";
import { EASE_SILK, fadeUp } from "@/lib/luxe";
import { useBoutique } from "@/store/useBoutique";
import { SectionHeading } from "./SectionHeading";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function CollectionGrid() {
  const { quickView, setQuickView, wishlist, toggleWishlist } = useBoutique();
  const piece = PIECES.find((p) => p.id === quickView) ?? null;

  return (
    <section id="collections" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          eyebrow="The Register"
          title="Pieces currently on the loom floor"
          copy="Each saree is registered, numbered and released only once its weaver signs the selvedge. No restocks, no reruns."
        />

        <div className="mt-16 flex flex-col gap-8 md:grid md:gap-8 md:grid-cols-2 xl:grid-cols-4 relative pb-20 md:pb-0">
          {PIECES.map((p, i) => {
            const loved = wishlist.includes(p.id);
            return (
              <motion.article
                key={p.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="group relative sticky top-32 md:static md:top-auto h-[75vh] md:h-auto mb-10 md:mb-0 shadow-2xl md:shadow-none bg-charcoal md:bg-transparent rounded-sm overflow-hidden md:overflow-visible"
                data-cursor="hover"
              >
                <div className="relative h-[60%] md:h-auto md:aspect-[3/4] overflow-hidden rounded-t-sm md:rounded-sm">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.weave} saree from ${p.origin}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.43,0.13,0.23,0.96)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent opacity-80" />

                  <button
                    onClick={() => toggleWishlist(p.id)}
                    aria-label={loved ? `Remove ${p.name} from wishlist` : `Save ${p.name}`}
                    className="glass-panel absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition-transform duration-500 hover:scale-110"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors duration-500",
                        loved ? "fill-gold text-gold" : "text-ivory/70",
                      )}
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.43,0.13,0.23,0.96)] group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={() => setQuickView(p.id)}
                      className="silk-sheen flex w-full items-center justify-center gap-2 rounded-full border border-gold/45 py-3 font-sans text-[0.62rem] uppercase tracking-luxe text-gold"
                    >
                      <Plus className="h-3 w-3" /> Quick view
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-2 p-5 md:p-0">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold/80">
                    {p.house} <span className="opacity-50">·</span> {p.edition}
                  </p>
                  <h3 className="font-serif text-2xl text-ivory tracking-wide">{p.name}</h3>
                  <p className="font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">{p.weave}</p>
                  <p className="pt-2 font-display text-lg tracking-wide text-gold-gradient">{p.price}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {piece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_SILK }}
            className="fixed inset-0 z-[120] grid place-items-center bg-charcoal/90 px-4 py-10 backdrop-blur-xl"
            onClick={() => setQuickView(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.8, ease: EASE_SILK }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative grid max-h-[86svh] w-full max-w-4xl overflow-y-auto rounded-sm md:grid-cols-2"
            >
              <img
                src={piece.image}
                alt={piece.name}
                loading="lazy"
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="relative p-8 md:p-10">
                <button
                  onClick={() => setQuickView(null)}
                  aria-label="Close quick view"
                  className="absolute right-5 top-5 text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
                <p className="font-sans text-[0.58rem] uppercase tracking-luxe text-gold/70">
                  {piece.edition} · {piece.origin}
                </p>
                <h3 className="mt-4 font-display text-3xl text-ivory">{piece.name}</h3>
                <div className="hairline my-6 h-px w-32" />
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {piece.note}
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-5 font-sans text-xs">
                  <div>
                    <dt className="uppercase tracking-[0.2em] text-muted-foreground">Weave</dt>
                    <dd className="mt-1.5 text-ivory">{piece.weave}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.2em] text-muted-foreground">Loom days</dt>
                    <dd className="mt-1.5 text-ivory">{piece.loomDays}</dd>
                  </div>
                </dl>
                <p className="mt-8 font-display text-2xl text-gold-gradient">{piece.price}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton
                    onClick={() => {
                      toast.success(`Reserved: ${piece.name}`, {
                        description: "An artisan consultant will contact you shortly to complete the reservation.",
                      });
                    }}
                  >
                    Reserve this piece
                  </MagneticButton>
                  <MagneticButton 
                    variant="outline" 
                    onClick={() => {
                      const wishlisted = wishlist.includes(piece.id);
                      toggleWishlist(piece.id);
                      if (!wishlisted) {
                        toast("Added to Wishlist", {
                          description: `${piece.name} has been saved to your private collection.`,
                        });
                      }
                    }}
                  >
                    {wishlist.includes(piece.id) ? "Saved" : "Save"}
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
