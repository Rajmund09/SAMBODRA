'use client';

import React, { useState } from 'react';
import { FABRICS, WEAVE_STYLES, OCCASIONS } from '../utils/data';

function ChipCloud({ items }: { items: string[] }) {
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    const next = new Set(active);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setActive(next);
  };

  return (
    <div className="chip-cloud">
      {items.map(item => (
        <span 
          key={item} 
          className={`chip ${active.has(item) ? 'active' : ''}`}
          onClick={() => toggle(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Refine() {
  return (
    <section id="refine" className="tex-ivory editorial">
      <div className="section-head reveal">
        <span className="eyebrow" style={{ color: '#8B5E2E' }}>Refine</span>
        <h2 className="stitched">By Fabric, Weave & Occasion</h2>
        <p>Beyond geography, the same saree can be found by what it's made of, how it's made, or where you'll wear it.</p>
      </div>
      <div className="refine-grid">
        <div className="refine-col reveal">
          <h4>By Fabric</h4>
          <ChipCloud items={FABRICS} />
        </div>
        <div className="refine-col reveal">
          <h4>By Weaving Style</h4>
          <ChipCloud items={WEAVE_STYLES} />
        </div>
        <div className="refine-col reveal">
          <h4>By Occasion</h4>
          <ChipCloud items={OCCASIONS} />
        </div>
      </div>
    </section>
  );
}
