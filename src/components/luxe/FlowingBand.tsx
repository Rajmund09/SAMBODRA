import { motion } from "motion/react";
import bandImg from "@/assets/band.png";

export function FlowingBand({ reverse = false, image }: { reverse?: boolean; image?: string }) {
  const imgSrc = image || bandImg;

  return (
    <div className="w-full overflow-hidden h-10 md:h-16 flex border-y border-gold/30 relative z-20">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap w-max bg-charcoal/40 backdrop-blur-md"
      >
        {[...Array(20)].map((_, i) => (
          <img 
            key={i} 
            src={imgSrc} 
            alt="Decorative golden band" 
            className="h-10 md:h-16 w-auto object-cover brightness-150 contrast-125" 
          />
        ))}
      </motion.div>
    </div>
  );
}
