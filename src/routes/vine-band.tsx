import { createFileRoute, Link } from "@tanstack/react-router";
import { FlowingBand } from "@/components/luxe/FlowingBand";
import band9Img from "@/assets/band9.png";
import { Navigation } from "@/components/luxe/Navigation";
import { Footer } from "@/components/luxe/Footer";

export const Route = createFileRoute("/vine-band")({
  component: VineBandPage,
});

function VineBandPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col justify-center gap-16 py-32">
        <div className="text-center px-4">
          <p className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold/80 mb-6">
            The Golden Tapestry Showcase
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-ivory drop-shadow-md">
            Golden Vine Border
          </h1>
          <p className="mt-6 max-w-xl mx-auto font-sans text-sm leading-relaxed text-muted-foreground">
            An elegant golden vine twisting across a rich crimson field, punctuated by delicate blossoms.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <FlowingBand image={band9Img} />
          
          <div className="text-center text-ivory/60 font-serif italic">
            Flowing in alternating directions
          </div>
          
          <FlowingBand image={band9Img} reverse={true} />
        </div>
        
        <div className="text-center mt-12">
           <Link 
             to="/" 
             className="inline-flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 px-8 py-3 uppercase tracking-widest text-[0.65rem] transition-colors rounded-sm"
           >
             Return Home
           </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
