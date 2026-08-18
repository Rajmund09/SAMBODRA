'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { STATES } from '../utils/data';
import { patternSVG } from '../utils/patterns';
import { useModal } from '../providers/ModalProvider';

export default function RegionExplorer() {
  const [activeRegionId, setActiveRegionId] = useState('odisha');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useModal();
  
  const activeRegion = STATES.find(s => s.id === activeRegionId) || STATES[0];
  const [svgStr, setSvgStr] = useState('');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredStates = STATES.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sig.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sarees.some(saree => saree.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  useEffect(() => {
    const str = patternSVG(activeRegion.pat, activeRegion.c1, activeRegion.c2);
    setSvgStr(str);
    
    if (contentRef.current && listRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo(listRef.current.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' });
    }
  }, [activeRegion]);

  const handleRegionChange = (id: string) => {
    if (id === activeRegionId) return;
    
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
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
        <p>
          Every region ties, dyes, and weaves in its own dialect. Select a state to dynamically change the atelier backdrop to match that region's sacred weave.
        </p>
      </div>

      <div className="region-filter-bar">
        <input 
          type="text" 
          placeholder="Filter 22+ states or sarees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="region-search-input"
        />
      </div>

      <div className="region-pills">
        {filteredStates.map(s => (
          <button 
            key={s.id} 
            className={`region-pill ${activeRegionId === s.id ? 'active' : ''}`}
            onClick={() => handleRegionChange(s.id)}
          >
            <span className="ic">{s.ic}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      <div className="region-panel reveal" id="regionPanel">
        <div className="region-panel-bg" dangerouslySetInnerHTML={{ __html: svgStr }}></div>
        <div className="region-panel-veil"></div>
        <div className="region-panel-content" ref={contentRef}>
          <span className="eyebrow">{activeRegion.ic} {activeRegion.name} Heritage</span>
          <h3>{activeRegion.name}</h3>
          <div className="region-signature">Signature Technique: {activeRegion.sig}</div>
          <div className="region-count">
            ✦ {activeRegion.sarees.length} registered weaves in this state archive
          </div>
          <div className="region-saree-list" ref={listRef}>
            {activeRegion.sarees.map(saree => (
              <span 
                key={saree} 
                className="region-chip"
                onClick={() => showToast(`Selected "${saree}" from ${activeRegion.name}`)}
                style={{ cursor: 'pointer' }}
              >
                {saree}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

