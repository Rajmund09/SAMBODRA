'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEAVES } from '../utils/data';
import { patternSVG } from '../utils/patterns';
import { getSareeByName } from '../utils/sareeImages';
import { useModal } from '../providers/ModalProvider';

gsap.registerPlugin(ScrollTrigger);

const BADGES = [
  'GI Certified',
  'Masterpiece',
  'Pure Gold Zari',
  'Heritage Ikat',
  'Double Ikat',
  'Royal Muslin',
  'Sheer Mulberry',
  'Wild Tussar'
];

export default function Weaves() {
  const { openModal } = useModal();

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.swatch').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  }, []);

  return (
    <section id="weaves" className="tex-ikat">
      <div className="section-head reveal">
        <span className="eyebrow">The Masterwork Collection</span>
        <h2 className="stitched">Eight Icons of the House</h2>
        <p>
          Across two hundred weaves in our catalogue, these eight define us — the royal pieces we return to, region after region, season after season.
        </p>
      </div>

      <div className="swatch-grid" id="swatchGrid">
        {WEAVES.map((w, index) => (
          <SwatchCard 
            key={w.n} 
            weave={w} 
            badge={BADGES[index % BADGES.length]}
            onClick={() => openModal(w)} 
          />
        ))}
      </div>
    </section>
  );
}

function SwatchCard({ weave, badge, onClick }: { weave: any; badge: string; onClick: () => void }) {
  const [svgStr, setSvgStr] = useState('');
  const [showPattern, setShowPattern] = useState(false);
  const { addToAtelier, isInAtelier, removeFromAtelier } = useModal();

  const sareeData = getSareeByName(weave.name);
  const photoUrl = sareeData?.productImages?.closeUp?.url || sareeData?.productImages?.flat?.url || sareeData?.modelImages?.fullDrape?.url;

  useEffect(() => {
    setSvgStr(patternSVG(weave.pat, weave.c1, weave.c2));
  }, [weave]);

  const saved = isInAtelier(weave.n);

  return (
    <div className="swatch reveal" onClick={onClick}>
      <div className="swatch-badge">{badge}</div>

      {photoUrl && !showPattern ? (
        <img 
          src={photoUrl} 
          alt={weave.name} 
          className="photo-card-bg"
        />
      ) : (
        <div className="swatch-fold" dangerouslySetInnerHTML={{ __html: svgStr }}></div>
      )}

      <div className="swatch-glow"></div>

      <div className="swatch-label">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span className="num">{weave.n}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPattern(!showPattern);
              }}
              style={{
                background: showPattern ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
                border: '1px solid var(--gold)',
                color: showPattern ? 'var(--ink)' : 'var(--gold-bright)',
                borderRadius: '12px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
              title="Toggle Photo / Vector View"
            >
              {showPattern ? 'Photo 📸' : 'Vector 📐'}
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (saved) removeFromAtelier(weave.n);
                else addToAtelier(weave);
              }}
              style={{
                background: saved ? 'var(--emerald)' : 'rgba(201,162,39,0.25)',
                border: '1px solid var(--gold)',
                color: 'var(--gold-bright)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}
              title={saved ? 'Remove from Atelier' : 'Save to Atelier'}
            >
              {saved ? '✓' : '⚜'}
            </button>
          </div>
        </div>
        <h3>{weave.name}</h3>
        <p>{weave.desc}</p>
      </div>
    </div>
  );
}


