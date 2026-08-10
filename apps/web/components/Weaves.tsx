'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEAVES } from '../utils/data';
import { patternSVG } from '../utils/patterns';
import { useModal } from '../providers/ModalProvider';

gsap.registerPlugin(ScrollTrigger);

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
        <span className="eyebrow">The Collection</span>
        <h2 className="stitched">Eight Icons of the House</h2>
        <p>Across two hundred weaves in our catalogue, these eight define us — the pieces we return to, region after region, season after season.</p>
      </div>
      <div className="swatch-grid" id="swatchGrid">
        {WEAVES.map((w, index) => (
          <SwatchCard key={w.n} weave={w} onClick={() => openModal(w)} />
        ))}
      </div>
    </section>
  );
}

function SwatchCard({ weave, onClick }: { weave: any, onClick: () => void }) {
  const [svgStr, setSvgStr] = useState('');
  useEffect(() => {
    setSvgStr(patternSVG(weave.pat, weave.c1, weave.c2));
  }, [weave]);

  return (
    <div className="swatch reveal" onClick={onClick}>
      <div className="swatch-fold" dangerouslySetInnerHTML={{ __html: svgStr }}></div>
      <div className="swatch-glow"></div>
      <div className="swatch-label">
        <div className="num">{weave.n}</div>
        <h3>{weave.name}</h3>
        <p>{weave.desc}</p>
      </div>
    </div>
  );
}
