import { createFileRoute, Link } from "@tanstack/react-router";
import { Navigation } from "@/components/luxe/Navigation";
import { Footer } from "@/components/luxe/Footer";
import { MagneticButton } from "@/components/luxe/MagneticButton";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
});

function JournalPage() {
  return (
    <div className="bg-charcoal min-h-screen text-ivory">
      <Navigation />
      <main className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />
        
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold/60 mb-6">
          The Journal
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] text-gold-gradient">
          Stories Woven<br />In Time
        </h1>
        <p className="font-serif italic text-ivory/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          An intimate look into the lives, rituals, and profound mastery of our artisans. 
          The first volume of the SAMBODRA Journal is currently being crafted.
        </p>
        
        <MagneticButton href="/" variant="outline">
          Return to Atelier
        </MagneticButton>
      </main>
      <Footer />
    </div>
  );
}
