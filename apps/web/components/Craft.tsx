'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Craft() {
  const svgRef = useRef<SVGSVGElement>(null);
  const weftRef = useRef<SVGGElement>(null);
  const warpRef = useRef<SVGGElement>(null);
  const diamondsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Generate the SVG internals dynamically (like the original)
    if (!weftRef.current || !warpRef.current || !diamondsRef.current) return;
    
    // Clear first in case of React Strict Mode double-render
    weftRef.current.innerHTML = '';
    warpRef.current.innerHTML = '';
    diamondsRef.current.innerHTML = '';

    for (let i = 0; i < 20; i++) {
      const y = i * 20 + 10;
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', '0'); l.setAttribute('y1', String(y)); l.setAttribute('x2', '400'); l.setAttribute('y2', String(y));
      weftRef.current.appendChild(l);
    }
    for (let i = 0; i < 20; i++) {
      const x = i * 20 + 10;
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', String(x)); l.setAttribute('y1', '0'); l.setAttribute('x2', String(x)); l.setAttribute('y2', '400');
      warpRef.current.appendChild(l);
    }
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const cx = 60 + c * 100, cy = 60 + r * 100, s = 34;
        const pts = `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`;
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', pts);
        poly.setAttribute('opacity', '0.55');
        diamondsRef.current.appendChild(poly);
      }
    }

    gsap.set([weftRef.current.children, warpRef.current.children], { scale: 0, transformOrigin: '0 0' });
    
    ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(warpRef.current!.children, { scaleX: 1, duration: 0.9, stagger: 0.02, ease: 'power2.out' });
        gsap.to(weftRef.current!.children, { scaleY: 1, duration: 0.9, stagger: 0.02, ease: 'power2.out', delay: 0.3 });
        gsap.from(diamondsRef.current!.children, { opacity: 0, scale: 0, duration: 0.6, stagger: 0.04, delay: 1, ease: 'back.out(1.7)' });
      },
      once: true
    });
    
  }, []);

  return (
    <section id="craft" className="tex-emerald">
      <div className="craft">
        <div className="craft-copy reveal">
          <span className="eyebrow">The Art of the Tie</span>
          <h2 className="stitched" style={{ fontSize: 'clamp(2.2rem,4vw,3.4rem)' }}>Bound before it is born</h2>
          <span className="thread-rule left" style={{ margin: '18px 0 26px' }}></span>
          <p>In the villages of Bargarh and Sonepur, thread is bound in tight resist-knots long before it touches a single drop of dye. This is <em>bandha</em> — the tie — and it is the reason no two Sambalpuri sarees are ever quite the same.</p>
          <p>The weaver ties, dyes, unties, re-ties, and dyes again — sometimes seven or eight times — calculating, entirely by memory, exactly where each colour must fall once the cloth is finally woven. The pattern lives in the thread before it ever reaches the loom.</p>
          <p>We take our name from this single, patient act of binding — a philosophy of craft we carry into every saree we weave.</p>
        </div>
        <div className="loom-figure reveal">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
            <rect x="0" y="0" width="400" height="400" fill="none"/>
            <g ref={weftRef} stroke="#C9A227" strokeOpacity="0.55" strokeWidth="1"></g>
            <g ref={warpRef} stroke="#F0D27E" strokeOpacity="0.7" strokeWidth="1"></g>
            <g ref={diamondsRef} fill="none" stroke="#7C1F2C" strokeWidth="2"></g>
          </svg>
        </div>
      </div>
    </section>
  );
}
