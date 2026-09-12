import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/luxe/Navigation";
import { Footer } from "@/components/luxe/Footer";
import { MagneticButton } from "@/components/luxe/MagneticButton";

export const Route = createFileRoute("/weavers")({
  component: WeaversPage,
});

function WeaversPage() {
  return (
    <div className="bg-charcoal min-h-screen text-ivory">
      <Navigation />
      <main className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />
        
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold/60 mb-6">
          Meet the Artisans
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] text-gold-gradient">
          The Hands Behind<br />The Loom
        </h1>
        <p className="font-serif italic text-ivory/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Every thread holds the spirit of its maker. We are currently documenting 
          the intimate portraits of the master weavers who bring SAMBODRA to life.
        </p>
        
        <MagneticButton href="/" variant="outline">
          Return to Atelier
        </MagneticButton>
      </main>
      <Footer />
    </div>
  );
}
