import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/luxe/Navigation";
import { Footer } from "@/components/luxe/Footer";
import { MagneticButton } from "@/components/luxe/MagneticButton";

export const Route = createFileRoute("/heritage")({
  component: HeritagePage,
});

function HeritagePage() {
  return (
    <div className="bg-charcoal min-h-screen text-ivory">
      <Navigation />
      <main className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
        
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold/60 mb-6">
          Heritage & Legacy
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] text-gold-gradient">
          Centuries of<br />Craftsmanship
        </h1>
        <p className="font-serif italic text-ivory/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          An exploration of the ancient techniques and unbroken lineages that define our collections. 
          The full heritage exhibition is currently being curated.
        </p>
        
        <MagneticButton href="/" variant="outline">
          Return to Atelier
        </MagneticButton>
      </main>
      <Footer />
    </div>
  );
}
