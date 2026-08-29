'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { STATES } from '../utils/data';
import { patternSVG } from '../utils/patterns';
import { getSareesByState, SAREE_IMAGES } from '../utils/sareeImages';
import { useModal } from '../providers/ModalProvider';

export default function RegionExplorer() {
  const [activeRegionId, setActiveRegionId] = useState('odisha');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast, openModal, playSound } = useModal();
  
  const activeRegion = STATES.find(s => s.id === activeRegionId) || STATES[0];
  const [svgStr, setSvgStr] = useState('');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const matchedSarees = getSareesByState(activeRegion.name);
  const photoAsset = matchedSarees[0]?.productImages?.closeUp?.url || 
                    matchedSarees[0]?.productImages?.flat?.url || 
                    SAREE_IMAGES[0]?.productImages?.closeUp?.url;

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
    playSound('click');
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
          Every region ties, dyes, and weaves in its own dialect. Select a state to explore signature techniques and inspect master photography matching that region's sacred weave.
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

      {/* 2-Column Split Panel Layout */}
      <div className="lux-glass-panel reveal" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', minHeight: '480px' }}>
          
          {/* Left Column: Details & Weaves List */}
          <div ref={contentRef} style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="eyebrow">{activeRegion.ic} {activeRegion.name} Heritage Guild</span>
            <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--gold-bright)', margin: '8px 0 12px' }}>
              {activeRegion.name}
            </h3>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ivory)', fontStyle: 'italic', marginBottom: '20px' }}>
              Signature Technique: {activeRegion.sig}
            </div>
            
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '16px', fontWeight: 600 }}>
              ✦ {activeRegion.sarees.length} registered weaves in this state archive
            </div>

            <div className="region-saree-list" ref={listRef}>
              {activeRegion.sarees.map(saree => (
                <span 
                  key={saree} 
                  className="region-chip"
                  onClick={() => {
                    playSound('shuttle');
                    showToast(`Viewing "${saree}" from ${activeRegion.name}`);
                    openModal({
                      n: activeRegion.id.toUpperCase(),
                      name: saree,
                      desc: `Traditional handwoven ${saree} from ${activeRegion.name}, featuring ${activeRegion.sig} craftsmanship.`,
                      c1: activeRegion.c1,
                      c2: activeRegion.c2,
                      pat: activeRegion.pat
                    });
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {saree}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Photo Viewport */}
          <div style={{ position: 'relative', width: '100%', minHeight: '380px', overflow: 'hidden', background: '#0e0607' }}>
            {photoAsset ? (
              <img 
                src={photoAsset} 
                alt={activeRegion.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svgStr }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(14,7,7,0.85) 0%, transparent 40%, rgba(14,7,7,0.4) 100%)' }} />

            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(14,7,7,0.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--gold)', padding: '10px 18px', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--gold-bright)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                {activeRegion.name} Silk Archive
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}



