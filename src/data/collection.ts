import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";

export interface Piece {
  id: string;
  name: string;
  house: string;
  weave: string;
  origin: string;
  price: string;
  loomDays: number;
  image: string;
  note: string;
  edition: string;
}

export const PIECES: Piece[] = [
  {
    id: "rakta-shikargah",
    name: "Rakta Shikargah",
    house: "Bridal Vault",
    weave: "Kadhwa Banarasi",
    origin: "Varanasi, Uttar Pradesh",
    price: "₹4,85,000",
    loomDays: 186,
    image: saree1,
    note: "A hunting-forest pallu in pure silver-gilt zari, cut-work woven rather than floated.",
    edition: "1 of 3",
  },
  {
    id: "korvai-mayil",
    name: "Korvai Mayil",
    house: "The Gold Register",
    weave: "Kanjeevaram Silk",
    origin: "Kanchipuram, Tamil Nadu",
    price: "₹3,20,000",
    loomDays: 94,
    image: saree2,
    note: "Contrast korvai border interlocked by three weavers working a single loom in tandem.",
    edition: "1 of 6",
  },
  {
    id: "bandha-suta",
    name: "Bandha Suta",
    house: "Archive Revivals",
    weave: "Sambalpuri Ikat",
    origin: "Bargarh, Odisha",
    price: "₹1,64,000",
    loomDays: 71,
    image: saree3,
    note: "Double ikat rebuilt from a 19th-century temple cloth held in a family archive.",
    edition: "1 of 8",
  },
  {
    id: "mulmul-bhor",
    name: "Mulmul Bhor",
    house: "Everyday Heirloom",
    weave: "Jamdani Muslin",
    origin: "Shantipur, West Bengal",
    price: "₹96,000",
    loomDays: 48,
    image: saree4,
    note: "Featherweight 120-count muslin, motifs floated by hand without a single drawn cartoon.",
    edition: "1 of 12",
  },
];
