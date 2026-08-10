'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ animateIn }: { animateIn: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateIn) return;

    const tl = gsap.timeline();
    tl.from('.hero .eyebrow', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' })
      .from('.hero h1', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from('.hero .sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
      .from('.silhouette', { opacity: 0, x: 40, duration: 1.2, ease: 'power2.out' }, '-=1')
      .from('.scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.4');
  }, [animateIn]);

  useEffect(() => {
    const CAN_TILT = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const heroEl = heroRef.current;
    
    if (!heroEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to('.silhouette', { x: x * 0.6, y: y * 0.4, duration: 0.6, ease: 'power2.out' });
      gsap.to('.hero h1', { x: x * 0.2, duration: 0.6, ease: 'power2.out' });
      if (CAN_TILT && innerRef.current) {
        gsap.to(innerRef.current, { 
          rotateY: x * 0.15, 
          rotateX: -y * 0.15, 
          duration: 0.7, 
          ease: 'power2.out', 
          transformPerspective: 900 
        });
      }
    };

    const handleMouseLeave = () => {
      if (innerRef.current) {
        gsap.to(innerRef.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'power3.out' });
      }
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <header ref={heroRef} className="hero tex-ikat">
      <div className="hero-vignette"></div>
      <div className="silhouette">
        <svg viewBox="0 0 260 620" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="silGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5E2E" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#1B0E0C" stopOpacity="0.85"/>
            </linearGradient>
          </defs>
          <path fill="url(#silGrad)" d="M132 8c22 0 38 18 38 40 0 14-6 24-14 32 26 10 40 30 46 58 10 46-6 70 4 96 14 36 40 46 46 92 8 60-18 84-18 130 0 40 20 60 20 100 0 30-16 46-40 54-10 4-8 14 2 16 30 6 30 40-2 44H60c-30-4-30-38 0-44 10-2 12-12 2-16-24-8-40-24-40-54 0-40 20-60 20-100 0-46-26-70-18-130 6-46 32-56 46-92 10-26-6-50 4-96 6-28 20-48 46-58-8-8-14-18-14-32 0-22 16-40 38-40z"/>
        </svg>
      </div>
      <div ref={innerRef} className="hero-inner" style={{ visibility: animateIn ? 'visible' : 'hidden' }}>
        <span className="eyebrow">Sambalpuri Ikat · House of Bandha</span>
        <h1 className="stitched">BANDHA</h1>
        <p className="sub">Every thread is tied before it is dyed, dyed before it is woven, and woven before it is worn — the bond that gives Bandha its name.</p>
        <a href="#weaves" className="hero-cta"><span>Discover the Weaves</span></a>
      </div>
      <div className="scroll-cue" style={{ visibility: animateIn ? 'visible' : 'hidden' }}>
        <span>Scroll</span><span className="line"></span>
      </div>
    </header>
  );
}
