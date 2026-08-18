'use client';

import React, { useState } from 'react';
import { FABRICS, WEAVE_STYLES, OCCASIONS } from '../utils/data';
import { useModal } from '../providers/ModalProvider';

function ChipCloud({ 
  items, 
  activeItems, 
  onToggle 
}: { 
  items: string[]; 
  activeItems: Set<string>; 
  onToggle: (item: string) => void;
}) {
  return (
    <div className="chip-cloud">
      {items.map(item => (
        <span 
          key={item} 
          className={`chip ${activeItems.has(item) ? 'active' : ''}`}
          onClick={() => onToggle(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Refine() {
  const [selectedFabrics, setSelectedFabrics] = useState<Set<string>>(new Set());
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
  const [selectedOccasions, setSelectedOccasions] = useState<Set<string>>(new Set());
  const { showToast } = useModal();

  const toggleItem = (set: Set<string>, setter: (s: Set<string>) => void, item: string) => {
    const next = new Set(set);
    if (next.has(item)) {
      next.delete(item);
      showToast(`Removed filter "${item}"`);
    } else {
      next.add(item);
      showToast(`Filtered by "${item}"`);
    }
    setter(next);
  };

  const totalActive = selectedFabrics.size + selectedStyles.size + selectedOccasions.size;

  const resetAll = () => {
    setSelectedFabrics(new Set());
    setSelectedStyles(new Set());
    setSelectedOccasions(new Set());
    showToast('Cleared all custom filters');
  };

  return (
    <section id="refine" className="tex-ivory">
      <div className="section-head reveal">
        <span className="eyebrow">Refine & Curation Engine</span>
        <h2 className="stitched">By Fabric, Weave & Occasion</h2>
        <p>Beyond geography, find your perfect saree by material, centuries-old technique, or royal ceremony.</p>
      </div>

      <div className="refine-grid">
        <div className="refine-col reveal">
          <h4>By Fabric ({selectedFabrics.size})</h4>
          <ChipCloud 
            items={FABRICS} 
            activeItems={selectedFabrics}
            onToggle={(item) => toggleItem(selectedFabrics, setSelectedFabrics, item)}
          />
        </div>

        <div className="refine-col reveal">
          <h4>By Weaving Style ({selectedStyles.size})</h4>
          <ChipCloud 
            items={WEAVE_STYLES} 
            activeItems={selectedStyles}
            onToggle={(item) => toggleItem(selectedStyles, setSelectedStyles, item)}
          />
        </div>

        <div className="refine-col reveal">
          <h4>By Occasion ({selectedOccasions.size})</h4>
          <ChipCloud 
            items={OCCASIONS} 
            activeItems={selectedOccasions}
            onToggle={(item) => toggleItem(selectedOccasions, setSelectedOccasions, item)}
          />
        </div>
      </div>

      {totalActive > 0 && (
        <button className="filter-reset-btn" onClick={resetAll}>
          Reset {totalActive} Active Filter{totalActive > 1 ? 's' : ''} ↺
        </button>
      )}
    </section>
  );
}

