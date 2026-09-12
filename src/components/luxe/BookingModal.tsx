import { motion, AnimatePresence } from "motion/react";
import { EASE_SILK } from "@/lib/luxe";
import { MagneticButton } from "./MagneticButton";
import { useEffect } from "react";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_SILK }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_SILK, delay: 0.1 }}
            className="relative w-full max-w-lg overflow-hidden rounded-md bg-charcoal/85 backdrop-blur-3xl border border-gold/15 shadow-2xl"
          >
            
            <div className="relative z-10 p-8 md:p-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-ivory/50 hover:text-gold transition-colors"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="text-center mb-8">
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-gold/60 mb-4">
                  Private Atelier
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-4">
                  Book a Viewing
                </h2>
                <p className="font-serif italic text-ivory/70 text-sm">
                  Experience the drape, weight, and luminous quality of our heritage weaves in person.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                toast.success("Private Viewing Requested", {
                  description: "Our concierge will contact you shortly to coordinate details.",
                });
                onClose();
              }}>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                  />
                  <select 
                    required
                    className="w-full bg-transparent border-b border-ivory/20 py-3 text-ivory/80 focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option value="" disabled selected className="bg-charcoal text-ivory/50">Select Area of Interest</option>
                    <option value="bridal" className="bg-charcoal text-ivory">Bridal Trousseau</option>
                    <option value="heirloom" className="bg-charcoal text-ivory">Heirloom Collection</option>
                    <option value="custom" className="bg-charcoal text-ivory">Custom Commission</option>
                  </select>
                </div>
                
                <div className="pt-4 flex justify-center">
                  <MagneticButton className="w-full">
                    Request Appointment
                  </MagneticButton>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
