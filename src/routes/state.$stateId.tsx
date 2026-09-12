import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/luxe/Navigation";
import { Footer } from "@/components/luxe/Footer";

export const Route = createFileRoute("/state/$stateId")({
  component: StatePage,
});

function StatePage() {
  const { stateId } = Route.useParams();
  
  // Format the ID into a title
  const title = stateId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <Navigation />
      <main className="min-h-[90svh] pt-32 pb-24 px-5 md:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-2xl">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold/80 mb-4">
            Woven Geographies
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-ivory mb-8">
            {title}
          </h1>
          <p className="font-serif italic text-ivory/70 text-lg md:text-xl leading-relaxed mb-12">
            Discover the looms, master weavers, and heritage motifs native to {title}. Every warp and weft here holds generations of devotion.
          </p>
        </div>
        
        <div className="h-[40vh] w-full border border-gold/20 rounded-md grid place-items-center bg-charcoal/40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581005232145-2070f80e0c19?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity transition-transform duration-[2s] group-hover:scale-105" />
          <p className="font-sans text-[0.75rem] uppercase tracking-luxe text-ivory/60 relative z-10 backdrop-blur-md px-6 py-3 rounded-full border border-ivory/10">
            Regional showcase coming soon
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
