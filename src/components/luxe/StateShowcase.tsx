import { AnimatePresence, motion } from "motion/react";
import { STATES } from "@/data/states";
import { useBoutique } from "@/store/useBoutique";
import { EASE_SILK } from "@/lib/luxe";
import { Motif } from "./Motif";
import { Particles } from "./Particles";
import { MagneticButton } from "./MagneticButton";

export function StateShowcase() {
  const { activeState, setActiveState } = useBoutique();
  const state = (STATES.find((s) => s.id === activeState) ?? STATES[0])!;

  return (
    <section id="states" className="relative min-h-[100svh] overflow-hidden py-28 md:py-36">
      <AnimatePresence mode="sync">
        <motion.div
          key={state.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_SILK }}
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(120% 90% at 70% 15%, ${state.palette.from}, ${state.palette.via} 45%, ${state.palette.to} 100%)`,
          }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.id}-motif`}
          initial={{ opacity: 0, scale: 0.85, rotate: -25 }}
          animate={{ opacity: 0.16, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotate: 20 }}
          transition={{ duration: 0.7, ease: EASE_SILK }}
          className="pointer-events-none absolute -right-[18%] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2"
          style={{ color: state.palette.accent }}
        >
          <Motif kind={state.motif} className="animate-spin-slow h-full w-full" />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.id}-particles`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Particles kind={state.particle} />
        </motion.div>
      </AnimatePresence>

      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background: `linear-gradient(to bottom, ${state.palette.accent}22, transparent)`,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1300px] gap-14 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold/75">
            Woven Geographies
          </p>
          <h2 className="mt-6 font-display text-3xl leading-[1.1] text-ivory md:text-5xl">
            Six states. Six ways of holding light in cloth.
          </h2>

          <ul className="mt-12 space-y-1">
            {STATES.map((s) => {
              const on = s.id === state.id;
              return (
                <li key={s.id}>
                  <button
                    onMouseEnter={() => setActiveState(s.id)}
                    onFocus={() => setActiveState(s.id)}
                    onClick={() => setActiveState(s.id)}
                    data-cursor="hover"
                    className="group flex w-full items-baseline gap-4 border-b border-ivory/10 py-4 text-left transition-colors duration-400"
                  >
                    <span
                      className={`font-display text-2xl transition-all duration-400 ease-[cubic-bezier(0.43,0.13,0.23,0.96)] md:text-4xl ${
                        on
                          ? "translate-x-3 text-gold-gradient"
                          : "text-ivory/45 group-hover:translate-x-2 group-hover:text-ivory/80"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span
                      className={`ml-auto font-sans text-[0.6rem] uppercase tracking-[0.2em] transition-opacity duration-400 ${
                        on ? "opacity-100 text-gold/80" : "opacity-40 text-ivory"
                      }`}
                    >
                      {s.weave}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative min-h-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: EASE_SILK }}
              className="glass-panel relative rounded-sm p-8 md:p-12 overflow-hidden group"
            >
              {state.image && (
                <>
                  <img 
                    src={state.image} 
                    alt={state.weave} 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-[2s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/30 pointer-events-none" />
                </>
              )}
              
              <div className="relative z-10">
                <div className="mb-8 h-24 w-24 text-gold">
                  <Motif kind={state.motif} className="animate-float-slow h-full w-full" />
                </div>
                <p className="font-serif text-xl italic text-gold/90">{state.tagline}</p>
                <h3 className="mt-3 font-display text-3xl text-ivory md:text-4xl drop-shadow-md">{state.weave}</h3>
                <p className="mt-6 font-sans text-sm leading-[1.9] text-ivory/80 max-w-md drop-shadow">
                  {state.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <MagneticButton href="#collections" variant="outline" className="px-7 py-3">
                    View {state.name} looms
                  </MagneticButton>
                  <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-ivory/60 drop-shadow">
                    Provenance certified
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
