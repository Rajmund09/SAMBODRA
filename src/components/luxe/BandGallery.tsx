import { FlowingBand } from "./FlowingBand";
import bandImg from "@/assets/band.png";
import band2Img from "@/assets/band2.png";
import band3Img from "@/assets/band3.png";
import band4Img from "@/assets/band4.png";
import band5Img from "@/assets/band5.png";
import band6Img from "@/assets/band6.png";
import band7Img from "@/assets/band7.png";
import band8Img from "@/assets/band8.png";
import band9Img from "@/assets/band9.png";

export function BandGallery() {
  const bands = [
    { src: bandImg, reverse: false },
    { src: band2Img, reverse: true },
    { src: band3Img, reverse: false },
    { src: band4Img, reverse: true },
    { src: band5Img, reverse: false },
    { src: band6Img, reverse: true },
    { src: band7Img, reverse: false },
    { src: band8Img, reverse: true },
    { src: band9Img, reverse: false },
  ];

  return (
    <section className="py-24 relative z-10 bg-charcoal/40 backdrop-blur-sm border-y border-gold/20">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="font-display text-3xl md:text-5xl text-ivory drop-shadow-md">
          Heritage Borders
        </h2>
        <p className="mt-4 max-w-2xl mx-auto font-sans text-sm leading-relaxed text-ivory/60">
          A collection of intricate, hand-woven and painted border motifs.
        </p>
      </div>

      <div className="flex flex-col gap-0 border-y border-gold/30">
        {bands.map((band, idx) => (
          <FlowingBand key={idx} image={band.src} reverse={band.reverse} />
        ))}
      </div>
    </section>
  );
}
