'use client';

import React, { useEffect, useState } from 'react';
import { patternSVG } from '../utils/patterns';

export default function Heritage() {
  const [svgStr, setSvgStr] = useState('');
  
  useEffect(() => {
    setSvgStr(patternSVG('diamond', '#33132C', '#F0D27E'));
  }, []);

  return (
    <section id="heritage" className="tex-plum">
      <div className="heritage">
        <div className="heritage-copy reveal">
          <span className="eyebrow">The Weavers</span>
          <h2 className="stitched" style={{ fontSize: 'clamp(2.2rem,4vw,3.4rem)' }}>Four generations at one loom</h2>
          <span className="thread-rule left" style={{ margin: '18px 0 26px' }}></span>
          <p>Behind every Bandha saree is a family, not a factory. Our weaving partners in Odisha, Varanasi, Paithan, and Kanchipuram have passed their pit-looms from grandparent to grandchild, each generation adding its own small correction to a pattern centuries old.</p>
          <p>We pay by the saree, not the hour — because a Kanjivaram border deserves the eleven days it asks for, and a Jamdani motif cannot be rushed toward a deadline it does not recognise.</p>
          <div className="heritage-stats">
            <div className="stat"><b>214</b><span>Weaver Families</span></div>
            <div className="stat"><b>11</b><span>Days per Border</span></div>
            <div className="stat"><b>4</b><span>Generations</span></div>
          </div>
        </div>
        <div className="heritage-frame reveal">
          <div className="heritage-frame-inner tex-ikat" id="heritageArt" dangerouslySetInnerHTML={{ __html: svgStr }}>
          </div>
        </div>
      </div>
    </section>
  );
}
