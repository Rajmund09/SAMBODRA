export type Particle = "goldDust" | "dew" | "embers" | "petals" | "silverMist" | "sparks";

export interface StateWeave {
  id: string;
  name: string;
  weave: string;
  tagline: string;
  description: string;
  motif: "chakra" | "lotus" | "temple" | "paisley" | "conch" | "sun";
  particle: Particle;
  image?: string;
  palette: {
    from: string;
    via: string;
    to: string;
    accent: string;
  };
}

import saree1 from "@/assets/sarees/saree1.jpg";
import saree2 from "@/assets/sarees/saree2.jpg";
import saree3 from "@/assets/sarees/saree3.jpg";
import saree4 from "@/assets/sarees/saree4.jpg";
import saree5 from "@/assets/sarees/saree5.jpg";
import saree6 from "@/assets/sarees/saree6.jpg";

export const STATES: StateWeave[] = [
  {
    id: "odisha",
    name: "Odisha",
    weave: "Sambalpuri Ikat",
    tagline: "The bound thread",
    description:
      "Warp and weft tied and dyed before a single pick is thrown — the motif exists in the yarn long before it exists in the cloth.",
    motif: "chakra",
    particle: "embers",
    image: saree1,
    palette: {
      from: "oklch(0.24 0.09 32)",
      via: "oklch(0.17 0.05 30)",
      to: "oklch(0.12 0.01 40)",
      accent: "oklch(0.76 0.126 85.5)",
    },
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    weave: "Jamdani & Baluchari",
    tagline: "Woven air",
    description:
      "Discontinuous supplementary weft floated by hand, epics narrated across a pallu in fine muslin so light it drifts.",
    motif: "conch",
    particle: "silverMist",
    image: saree2,
    palette: {
      from: "oklch(0.26 0.06 258)",
      via: "oklch(0.18 0.045 262)",
      to: "oklch(0.12 0.012 260)",
      accent: "oklch(0.82 0.03 250)",
    },
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    weave: "Kanjeevaram Silk",
    tagline: "Temple gold",
    description:
      "Three-ply mulberry silk interlocked with pure zari at the korvai join — a border that outlives the wearer.",
    motif: "temple",
    particle: "goldDust",
    image: saree3,
    palette: {
      from: "oklch(0.3 0.11 22)",
      via: "oklch(0.2 0.07 30)",
      to: "oklch(0.13 0.02 45)",
      accent: "oklch(0.8 0.13 85)",
    },
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    weave: "Banarasi Brocade",
    tagline: "Mughal reverie",
    description:
      "Kadhwa brocade lifted on a jacquard loom in Varanasi, where a six-yard shikargah can take half a year of dawns.",
    motif: "paisley",
    particle: "sparks",
    image: saree4,
    palette: {
      from: "oklch(0.27 0.075 300)",
      via: "oklch(0.19 0.05 310)",
      to: "oklch(0.12 0.015 300)",
      accent: "oklch(0.78 0.12 88)",
    },
  },
  {
    id: "kerala",
    name: "Kerala",
    weave: "Kasavu Handloom",
    tagline: "Monsoon ivory",
    description:
      "Unbleached cotton bordered in kasavu gold — restraint as ornament, cool as the backwaters at first light.",
    motif: "lotus",
    particle: "dew",
    image: saree5,
    palette: {
      from: "oklch(0.26 0.055 165)",
      via: "oklch(0.18 0.035 168)",
      to: "oklch(0.12 0.012 170)",
      accent: "oklch(0.88 0.07 95)",
    },
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    weave: "Bandhani & Leheriya",
    tagline: "Desert light",
    description:
      "Thousands of tied points resisted against dye, unfurled into waves of saffron, indigo and dusk-rose.",
    motif: "sun",
    particle: "goldDust",
    image: saree6,
    palette: {
      from: "oklch(0.31 0.1 62)",
      via: "oklch(0.21 0.06 50)",
      to: "oklch(0.13 0.02 55)",
      accent: "oklch(0.83 0.13 78)",
    },
  },
];
