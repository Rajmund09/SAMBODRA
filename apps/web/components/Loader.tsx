'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [hide, setHide] = useState(false);
  const warpRef = useRef<SVGGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    // draw warp lines + stitch the wordmark
    if (!warpRef.current || !textRef.current) return;

    const n = 26;
    for (let i = 0; i < n; i++) {
      const x = (600 / n) * i + 8;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(x));
      line.setAttribute('y1', '0');
      line.setAttribute('x2', String(x));
      line.setAttribute('y2', '140');
      line.setAttribute('stroke', i % 2 === 0 ? '#C9A227' : '#7C1F2C');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-opacity', '0.35');
      line.style.transformOrigin = 'center';
      warpRef.current.appendChild(line);
    }

    gsap.from(warpRef.current.children, { scaleY: 0, duration: 0.8, stagger: 0.02, ease: 'power2.out' });

    const text = textRef.current;
    const len = text.getComputedTextLength ? text.getComputedTextLength() : 900;
    text.style.strokeDasharray = String(len);
    text.style.strokeDashoffset = String(len);
    
    gsap.to(text, {
      strokeDashoffset: 0,
      duration: 1.6,
      delay: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(text, { fill: '#F0D27E', stroke: 'transparent', duration: 0.5 });
      }
    });

    const timer = setTimeout(() => {
      setHide(true);
      document.body.style.overflow = 'auto';
      // Give a tiny delay for CSS transition before calling onComplete
      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div id="loader" className={hide ? 'hide' : ''}>
      <svg viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg">
        <g id="warp" ref={warpRef}></g>
        <text 
          x="300" y="90" 
          textAnchor="middle" 
          className="loom-word" 
          fill="none" 
          stroke="#C9A227" 
          strokeWidth="1.2" 
          id="loomText" 
          ref={textRef}
        >
          BANDHA
        </text>
      </svg>
      <div className="loom-caption">Tying the first thread</div>
    </div>
  );
}
