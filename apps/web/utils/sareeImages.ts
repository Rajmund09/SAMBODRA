/**
 * SAMBODRA Saree & Model Image Repository
 * A structured, strongly-typed asset catalog containing curated high-resolution
 * product close-ups, flat weaves, and editorial model photography for various traditional Indian sarees.
 */

export interface ImageAsset {
  url: string;
  alt: string;
  credit?: string;
  width?: number;
  height?: number;
}

export interface SareeProductGallery {
  flat: ImageAsset;      // Complete view of the saree
  closeUp: ImageAsset;   // Close-up showing warp/weft weave, texture, and feel
  border: ImageAsset;    // Intricate border/zari details
  palloo: ImageAsset;    // Detail of the decorative endpiece
  additional?: ImageAsset[];
}

export interface SareeModelGallery {
  fullDrape: ImageAsset; // Model posing to show the entire drape and fall of the saree
  portrait: ImageAsset;  // Close-up model shot focusing on styling, blouse, and jewelry
  editorial: ImageAsset; // Artistic, atmospheric context/editorial shot
  additional?: ImageAsset[];
}

export interface SareeSpecs {
  fabric: string;        // Silk grade, cotton type, etc.
  zariGrade: string;     // tested pure gold zari, half-fine, imitation, etc.
  weavingTime: string;   // days/months required to hand-weave
  count: string;         // warp/weft yarn count (e.g. 100s, 120s, 80/100)
}

export interface SareeMetadata {
  id: string;            // unique identifier (e.g., 'odisha-sambalpuri')
  name: string;          // Name of the weave (e.g., 'Sambalpuri Bandha')
  region: string;        // Region of origin
  state: string;         // State of origin
  primaryColor: string;  // Primary dominant hue hex code
  secondaryColor: string;// Secondary accent hue hex code
  occasions: string[];   // Suitable events
  description: string;   // Historical/cultural context and weaving style description
  specs: SareeSpecs;     // Weaving specifications
}

export interface SareeCollectionItem {
  metadata: SareeMetadata;
  productImages: SareeProductGallery;
  modelImages: SareeModelGallery;
}

export const SAREE_IMAGES: SareeCollectionItem[] = [
  {
    metadata: {
      id: 'odisha-sambalpuri',
      name: 'Sambalpuri Bandha',
      region: 'Bargarh & Sonepur',
      state: 'Odisha',
      primaryColor: '#4E1420', // Deep Maroon
      secondaryColor: '#F1E6CE', // Ivory
      occasions: ['Heritage Collection', 'Festive Sarees', 'Royal Collection'],
      description: 'A masterclass in double ikat (Bandha), where warp and weft threads are individually tie-dyed with geometric precision before weaving. Known for shell, wheel, and floral motifs representing the local culture.',
      specs: {
        fabric: '100% Pure Mulberry Silk (Gari Silk)',
        zariGrade: 'Tested Pure Gold Zari Borders',
        weavingTime: '60 to 90 Days',
        count: '80s/100s fine count'
      }
    },
    productImages: {
      flat: {
        url: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=1200&auto=format&fit=crop',
        alt: 'Sambalpuri Bandha Saree flat lay displaying the elaborate geometric double-ikat patterns',
        credit: 'Sambodra Archive'
      },
      closeUp: {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
        alt: 'Macro shot of Sambalpuri double ikat weave showing individual dyed threads on the loom'
      },
      border: {
        url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
        alt: 'Border detail of Sambalpuri saree with traditional fish and conch motifs'
      },
      palloo: {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
        alt: 'Sambalpuri Palloo containing hand-tied knot signatures and elaborate story motifs'
      }
    },
    modelImages: {
      fullDrape: {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Model in a Sambalpuri Bandha Saree draped in traditional Odia style'
      },
      portrait: {
        url: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=800&auto=format&fit=crop',
        alt: 'Close up portrait of model styling the Sambalpuri saree with temple jewelry'
      },
      editorial: {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Artistic shot of Sambalpuri silk reflecting golden hour light at a pit loom'
      }
    }
  },
  {
    metadata: {
      id: 'up-banarasi',
      name: 'Banarasi Brocade',
      region: 'Varanasi',
      state: 'Uttar Pradesh',
      primaryColor: '#5A1420', // Rich Ruby Red
      secondaryColor: '#C9A227', // Bright Gold
      occasions: ['Bridal Sarees', 'Wedding Sarees', 'Royal Collection', 'Heritage Collection'],
      description: 'Woven with gold and silver zari threads (Zari Kalabattu) on pure silk, Banarasi sarees feature Persian-inspired designs like the Mughal Jaal, floral bel, and kalga (paisley).',
      specs: {
        fabric: 'Banarasi Katan Silk',
        zariGrade: '24k Gold electroplated Silver Zari',
        weavingTime: '45 to 120 Days',
        count: '2/120s double ply warp'
      }
    },
    productImages: {
      flat: {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop',
        alt: 'Royal Banarasi Katan Silk Brocade Saree displaying heavy gold zari work'
      },
      closeUp: {
        url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
        alt: 'Brocade weave detail showing Mughal floral creepers (Asharfi booti)'
      },
      border: {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
        alt: 'Heavy zari border of Banarasi Silk Saree'
      },
      palloo: {
        url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800&auto=format&fit=crop',
        alt: 'Banarasi Palloo filled with intricate hunting scenes (Shikargah) and paisleys'
      }
    },
    modelImages: {
      fullDrape: {
        url: 'https://images.unsplash.com/photo-1605697040924-850d97bfedd9?q=80&w=1200&auto=format&fit=crop',
        alt: 'Model elegant pose highlighting the heavy fold and royal fall of a red Banarasi Brocade'
      },
      portrait: {
        url: 'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=800&auto=format&fit=crop',
        alt: 'Model close portrait in red and gold Banarasi, styled with traditional North Indian bridal jewelry'
      },
      editorial: {
        url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1200&auto=format&fit=crop',
        alt: 'Banarasi Brocade glowing softly against an ancient stone archway back drop'
      }
    }
  },
  {
    metadata: {
      id: 'tn-kanjivaram',
      name: 'Kanjivaram Silk',
      region: 'Kanchipuram',
      state: 'Tamil Nadu',
      primaryColor: '#153A2C', // Deep Emerald
      secondaryColor: '#F0D27E', // Warm Gold
      occasions: ['Wedding Sarees', 'Temple Sarees', 'Festive Sarees', 'Royal Collection'],
      description: 'Distinguished by its wide, solid contrast borders and palloo, woven separately and joined to the body with a zigzag joints (Korvai). Employs pure mulberry silk thread twisted into three plies (Murukku pattu).',
      specs: {
        fabric: 'Three-Ply Pure South Indian Mulberry Silk',
        zariGrade: 'Tested Gold-Wrapped Silver Thread',
        weavingTime: '30 to 60 Days',
        count: '3-ply mulberry thread structure'
      }
    },
    productImages: {
      flat: {
        url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1200&auto=format&fit=crop',
        alt: 'Deep emerald Kanjivaram silk saree with signature temple borders'
      },
      closeUp: {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
        alt: 'Macro shot of heavy 3-ply silk weave showing high density and distinct color contrast'
      },
      border: {
        url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop',
        alt: 'Solid Korvai temple border (thazhampoo reku) in shimmering gold'
      },
      palloo: {
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        alt: 'Heavy gold pattu palloo with traditional peacock (mayil) and coin (butta) borders'
      }
    },
    modelImages: {
      fullDrape: {
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
        alt: 'Model showcasing the pleats and grand fall of a Kanjivaram silk saree'
      },
      portrait: {
        url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop',
        alt: 'Model close-up in emerald Kanjivaram, styled with jasmine flowers and heavy temple choker'
      },
      editorial: {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Editorial visual showing a temple pillar framing the silk drape of a Kanjivaram'
      }
    }
  },
  {
    metadata: {
      id: 'mh-paithani',
      name: 'Paithani Silk',
      region: 'Paithan & Yeola',
      state: 'Maharashtra',
      primaryColor: '#33132C', // Royal Eggplant
      secondaryColor: '#F0D27E', // Gold
      occasions: ['Festive Sarees', 'Wedding Sarees', 'Heritage Collection'],
      description: 'Characterized by its square design borders and a palloo featuring peacocks, parrots, and lotus flower motifs. Woven on handlooms with a tapestry-like technique, they are identical on both sides.',
      specs: {
        fabric: 'Fine Mulberry Silk with zero-twist warp',
        zariGrade: 'Tested Silver-Gold Zari Borders',
        weavingTime: '90 to 180 Days',
        count: 'Hand-dyed 100/120 denier silk'
      }
    },
    productImages: {
      flat: {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop',
        alt: 'Traditional Paithani Silk Saree flat display, showing the signature peacock palloo'
      },
      closeUp: {
        url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
        alt: 'Closeup of Paithani tapestry weave showing the seamless integration of gold thread and colored silk'
      },
      border: {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
        alt: 'Square design border (narali border) in gold zari'
      },
      palloo: {
        url: 'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=800&auto=format&fit=crop',
        alt: 'Heavy gold palloo featuring colorful thread peacocks (mor) and flowering vines'
      }
    },
    modelImages: {
      fullDrape: {
        url: 'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=1200&auto=format&fit=crop',
        alt: 'Model in a traditional Maharashtrian Nauvari drape showcasing a royal plum Paithani'
      },
      portrait: {
        url: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=800&auto=format&fit=crop',
        alt: 'Close-up of model styled with traditional Maharashtrian nath (nose ring) and green glass bangles'
      },
      editorial: {
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
        alt: 'Aesthetic shot highlighting the rich drape and identical backing of a Paithani weave'
      }
    }
  },
  {
    metadata: {
      id: 'gj-patola',
      name: 'Patola Double Ikat',
      region: 'Patan',
      state: 'Gujarat',
      primaryColor: '#7C1F2C', // Madder Red
      secondaryColor: '#F1E6CE', // Cream
      occasions: ['Heritage Collection', 'Royal Collection', 'Limited Edition Sarees'],
      description: 'A legendary double ikat fabric where both warp and weft are dyed in matching patterns prior to weaving. Requires complex mathematical planning; a mistake in a single thread ruins the design.',
      specs: {
        fabric: 'Natural Degummed Patan Silk',
        zariGrade: 'No Zari (Pure Textile-Art Focus)',
        weavingTime: '180 to 365 Days',
        count: '2-ply twisted silk warp and weft'
      }
    },
    productImages: {
      flat: {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Patan Patola Saree showing perfectly aligned geometric parrots and elephants'
      },
      closeUp: {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
        alt: 'Macro shot showing double-ikat intersections where warp and weft pigments merge precisely'
      },
      border: {
        url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800&auto=format&fit=crop',
        alt: 'Patola borders featuring traditional checkerboards and structural guard patterns'
      },
      palloo: {
        url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop',
        alt: 'Patola Palloo (palla) featuring massive geometric frames and traditional leaf shapes'
      }
    },
    modelImages: {
      fullDrape: {
        url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1200&auto=format&fit=crop',
        alt: 'Model showcasing the heavy structure and vibrant red patterns of Patola'
      },
      portrait: {
        url: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop',
        alt: 'Portrait of model with Patola drape, wearing ancestral silver jewelry'
      },
      editorial: {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
        alt: 'Atmospheric shot of Patola silk reflecting natural daylight on a rustic wooden patio'
      }
    }
  },
  {
    metadata: {
      id: 'bengal-jamdani',
      name: 'Jamdani Muslin',
      region: 'Kalna & Shantipur',
      state: 'West Bengal',
      primaryColor: '#E7D8B7', // Champagne/Muslin Cream
      secondaryColor: '#8B5E2E', // Antique Bronze
      occasions: ['Summer Collections', 'Casual Sarees', 'Heritage Collection'],
      description: 'A featherlight, highly breathable sheer cotton/muslin fabric. The patterns (flowers, geometry) are woven directly into the fabric using a supplementary weft technique by hand as the weaving progresses.',
      specs: {
        fabric: 'Superfine Muslin Cotton with Silk blends',
        zariGrade: 'Delicate Fine Zari threads',
        weavingTime: '90 to 240 Days',
        count: '150s to 200s ultra-fine thread'
      }
    },
    productImages: {
      flat: {
        url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop',
        alt: 'Jamdani Muslin Saree displaying floating floral motifs in sheer fabric'
      },
      closeUp: {
        url: 'https://images.unsplash.com/photo-1572204096076-00404e573a5a?q=80&w=800&auto=format&fit=crop',
        alt: 'Detail of sheer supplementary weft weaving, showing the float patterns on cotton'
      },
      border: {
        url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
        alt: 'Soft, sheer, hand-picked Jamdani borders with delicate leaf (panna) borders'
      },
      palloo: {
        url: 'https://images.unsplash.com/photo-1572204096076-00404e573a5a?q=80&w=800&auto=format&fit=crop',
        alt: 'Sheer Jamdani palloo displaying the large tree of life (Kalka) motif'
      }
    },
    modelImages: {
      fullDrape: {
        url: 'https://images.unsplash.com/photo-1572204096076-00404e573a5a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Model in a sheer ivory Jamdani Muslin, capturing the lightweight fall and transparency'
      },
      portrait: {
        url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
        alt: 'Minimalist portrait of model wearing Jamdani with simple pearls and soft makeup'
      },
      editorial: {
        url: 'https://images.unsplash.com/photo-1572204096076-00404e573a5a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Jamdani fabric catching the sunlight, showcasing its legendary weightless quality'
      }
    }
  }
];

/**
 * Utility functions to search, filter, and extract saree image assets.
 */

/**
 * Find a saree item by its ID.
 */
export function getSareeById(id: string): SareeCollectionItem | undefined {
  return SAREE_IMAGES.find(s => s.metadata.id === id);
}

/**
 * Find a saree item by its name (loose match).
 */
export function getSareeByName(name: string): SareeCollectionItem | undefined {
  return SAREE_IMAGES.find(s => s.metadata.name.toLowerCase().includes(name.toLowerCase()));
}

/**
 * Filter sarees by state of origin.
 */
export function getSareesByState(state: string): SareeCollectionItem[] {
  return SAREE_IMAGES.filter(s => s.metadata.state.toLowerCase() === state.toLowerCase());
}

/**
 * Filter sarees by suitable occasion.
 */
export function getSareesByOccasion(occasion: string): SareeCollectionItem[] {
  return SAREE_IMAGES.filter(s => 
    s.metadata.occasions.some(o => o.toLowerCase().includes(occasion.toLowerCase()))
  );
}

/**
 * Returns all available model images as a flat list for carousels or editorial grids.
 */
export function getAllModelImages(): ImageAsset[] {
  return SAREE_IMAGES.flatMap(s => [
    s.modelImages.fullDrape,
    s.modelImages.portrait,
    s.modelImages.editorial
  ]);
}

/**
 * Returns all product images as a flat list for textile galleries.
 */
export function getAllProductImages(): ImageAsset[] {
  return SAREE_IMAGES.flatMap(s => [
    s.productImages.flat,
    s.productImages.closeUp,
    s.productImages.border,
    s.productImages.palloo
  ]);
}
