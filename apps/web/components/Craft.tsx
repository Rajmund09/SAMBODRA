'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SAREE_IMAGES } from '../utils/sareeImages';

gsap.registerPlugin(ScrollTrigger);

export default function Craft() {
  const svgRef = useRef<SVGSVGElement>(null);
  const weftRef = useRef<SVGGElement>(null);
  const warpRef = useRef<SVGGElement>(null);
  const diamondsRef = useRef<SVGGElement>(null);

  const craftPhoto = SAREE_IMAGES[0]?.productImages?.closeUp?.url || SAREE_IMAGES[0]?.modelImages?.portrait?.url;

  useEffect(() => {
    if (!weftRef.current || !warpRef.current || !diamondsRef.current) return;
    
    weftRef.current.innerHTML = '';
    warpRef.current.innerHTML = '';
    diamondsRef.current.innerHTML = '';

    for (let i = 0; i < 16; i++) {
      const y = i * 25 + 12;
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', '0'); l.setAttribute('y1', String(y)); l.setAttribute('x2', '400'); l.setAttribute('y2', String(y));
      weftRef.current.appendChild(l);
    }
    for (let i = 0; i < 16; i++) {
      const x = i * 25 + 12;
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', String(x)); l.setAttribute('y1', '0'); l.setAttribute('x2', String(x)); l.setAttribute('y2', '400');
      warpRef.current.appendChild(l);
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cx = 80 + c * 120, cy = 80 + r * 120, s = 40;
        const pts = `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`;
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', pts);
        poly.setAttribute('opacity', '0.6');
        diamondsRef.current.appendChild(poly);
      }
    }

    gsap.set([weftRef.current.children, warpRef.current.children], { scale: 0, transformOrigin: '0 0' });
    
    ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(warpRef.current!.children, { scaleX: 1, duration: 0.9, stagger: 0.03, ease: 'power2.out' });
        gsap.to(weftRef.current!.children, { scaleY: 1, duration: 0.9, stagger: 0.03, ease: 'power2.out', delay: 0.3 });
        gsap.from(diamondsRef.current!.children, { opacity: 0, scale: 0, duration: 0.6, stagger: 0.05, delay: 0.8, ease: 'back.out(1.7)' });
      },
      once: true
    });
  }, []);

  return (
    <section id="craft" className="tex-emerald" style={{ padding: '120px 6vw' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Left Column: Copy & Principles */}
        <div className="craft-copy reveal">
          <span className="eyebrow">The Art of the Tie</span>
          <h2 className="stitched" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginTop: '12px', lineHeight: 1.15 }}>
            Bound Before It Is Born
          </h2>
          <span className="thread-rule left" style={{ margin: '20px 0 28px' }}></span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ivory)', fontStyle: 'italic', marginBottom: '20px', lineHeight: 1.6 }}>
            In the villages of Bargarh and Sonepur, thread is bound in tight resist-knots long before it touches a single drop of dye. This is <em>bandha</em> — the tie — and it is the reason no two Sambalpuri sarees are ever quite the same.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--ivory-dim)', lineHeight: 1.8, marginBottom: '16px' }}>
            The weaver ties, dyes, unties, re-ties, and dyes again — sometimes seven or eight times — calculating, entirely by memory, exactly where each colour must fall once the cloth is finally woven. The pattern lives in the thread before it ever reaches the loom.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--ivory-dim)', lineHeight: 1.8 }}>
            We take our name from this single, patient act of binding — a philosophy of craft we carry into every saree we weave.
          </p>
        </div>

        {/* Right Column: 3D Photo & Interactive Loom Wireframe Overlay */}
        <div className="reveal" style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(201,162,39,0.35)', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
          <img 
            src={craftPhoto} 
            alt="Handloom Weaving Craft" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(14,7,7,0.85) 90%)' }} />

          {/* Interactive SVG Wireframe Overlay */}
          <div style={{ position: 'absolute', inset: '40px', pointerEvents: 'none' }}>
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" ref={svgRef} style={{ width: '100%', height: '100%' }}>
              <rect x="0" y="0" width="400" height="400" fill="none"/>
              <g ref={weftRef} stroke="#F0D27E" strokeOpacity="0.6" strokeWidth="1.2"></g>
              <g ref={warpRef} stroke="#C9A227" strokeOpacity="0.75" strokeWidth="1.2"></g>
              <g ref={diamondsRef} fill="none" stroke="#FFE082" strokeWidth="2"></g>
            </svg>
          </div>

          <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(14,7,7,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 18px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              ✦ 100% Pure Bandha Ikat Geometry
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)' }}>Bargarh Guild</span>
          </div>
        </div>

      </div>
    </section>
  );
}

