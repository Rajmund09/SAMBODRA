import { create } from "zustand";

interface BoutiqueState {
  activeState: string;
  setActiveState: (id: string) => void;
  megaMenu: string | null;
  setMegaMenu: (id: string | null) => void;
  quickView: string | null;
  setQuickView: (id: string | null) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

export const useBoutique = create<BoutiqueState>((set) => ({
  activeState: "odisha",
  setActiveState: (id) => set({ activeState: id }),
  megaMenu: null,
  setMegaMenu: (id) => set({ megaMenu: id }),
  quickView: null,
  setQuickView: (id) => set({ quickView: id }),
  wishlist: [],
  toggleWishlist: (id) =>
    set((s) => ({
      wishlist: s.wishlist.includes(id)
        ? s.wishlist.filter((w) => w !== id)
        : [...s.wishlist, id],
    })),
}));
