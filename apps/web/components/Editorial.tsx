'use client';

import React, { useEffect, useState } from 'react';
import { patternSVG } from '../utils/patterns';

export default function Editorial() {
  const edCaps = ['The Palloo, Unfolded','A Study in Zari','Weight of the Border','Silk in Low Light','The Pleat, Held'];
  const edCols = [['#5A1420','#C9A227'],['#153A2C','#F0D27E'],['#33132C','#C9A227'],['#3A0F1C','#8B5E2E'],['#7C1F2C','#F1E6CE']];
  const pats = ['diamond','temple','jaal','stripe','floral'];

  return (
    <section className="editorial">
      <div className="section-head reveal">
        <span className="eyebrow" style={{ color: '#8B5E2E' }}>Lookbook</span>
        <h2 className="stitched">Drape, Season Six</h2>
        <p>A quiet study of pleats, palloos, and the way light moves across zari.</p>
      </div>
      <div className="editorial-scroll" id="editorialScroll">
        {edCaps.map((cap, i) => (
          <EditorialCard 
            key={i} 
            cap={cap} 
            c1={edCols[i][0]} 
            c2={edCols[i][1]} 
            pat={pats[i % 5]} 
          />
        ))}
      </div>
    </section>
  );
}

function EditorialCard({ cap, c1, c2, pat }: { cap: string, c1: string, c2: string, pat: string }) {
  const [svgStr, setSvgStr] = useState('');
  
  useEffect(() => {
    setSvgStr(patternSVG(pat, c1, c2));
  }, [pat, c1, c2]);

  return (
    <div className="editorial-card">
      <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svgStr }}></div>
      <div className="cap">{cap}</div>
    </div>
  );
}
