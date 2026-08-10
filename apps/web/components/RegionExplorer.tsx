'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { STATES } from '../utils/data';
import { patternSVG } from '../utils/patterns';

export default function RegionExplorer() {
  const [activeRegionId, setActiveRegionId] = useState('odisha');
  const activeRegion = STATES.find(s => s.id === activeRegionId) || STATES[0];
  const [svgStr, setSvgStr] = useState('');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Render immediately first time, animate subsequent times
    const str = patternSVG(activeRegion.pat, activeRegion.c1, activeRegion.c2);
    setSvgStr(str);
    
    if (contentRef.current && listRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      gsap.fromTo(listRef.current.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out' });
    }
  }, [activeRegion]);

  const handleRegionChange = (id: string) => {
    if (id === activeRegionId) return;
    
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        onComplete: () => {
          setActiveRegionId(id);
        }
      });
    } else {
      setActiveRegionId(id);
    }
  };

  return (
    <section id="regions" className="tex-plum">
      <div className="section-head reveal">
        <span className="eyebrow">India, Loom by Loom</span>
        <h2 className="stitched">Choose a State, See Its Silk</h2>
        <p>Every region ties, dyes, and weaves in its own language. Select a state and the house changes its cloth to match — the background itself becomes that region's signature weave.</p>
      </div>
      <div className="region-pills">
        {STATES.map(s => (
          <button 
            key={s.id} 
            className={`region-pill ${activeRegionId === s.id ? 'active' : ''}`}
            onClick={() => handleRegionChange(s.id)}
          >
            <span className="ic">{s.ic}</span>{s.name}
          </button>
        ))}
      </div>
      <div className="region-panel reveal" id="regionPanel">
        <div className="region-panel-bg" dangerouslySetInnerHTML={{ __html: svgStr }}></div>
        <div className="region-panel-veil"></div>
        <div className="region-panel-content" ref={contentRef}>
          <span className="eyebrow">{activeRegion.ic} {activeRegion.name}</span>
          <h3>{activeRegion.name}</h3>
          <div className="region-signature">Signature: {activeRegion.sig}</div>
          <div className="region-count">{activeRegion.sarees.length} weave{activeRegion.sarees.length > 1 ? 's' : ''} from this state</div>
          <div className="region-saree-list" ref={listRef}>
            {activeRegion.sarees.map(saree => (
              <span key={saree} className="region-chip">{saree}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
