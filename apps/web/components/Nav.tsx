'use client';

import React, { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileNav = () => {
    const nextOpen = !mobileOpen;
    setMobileOpen(nextOpen);
    document.body.style.overflow = nextOpen ? 'hidden' : '';
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="logo-mark">BANDHA</div>
        <ul className="nav-links">
          <li><a href="#craft">The Bandha</a></li>
          <li><a href="#regions">Regions</a></li>
          <li><a href="#weaves">Weaves</a></li>
          <li><a href="#heritage">Heritage</a></li>
          <li><a href="#loom">Atelier</a></li>
        </ul>
        <a href="#weaves" className="nav-cta"><span>Enter the Loom</span></a>
        <button 
          className={`nav-toggle ${mobileOpen ? 'open' : ''}`} 
          id="navToggle" 
          aria-label="Menu"
          onClick={toggleMobileNav}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobileNav">
        <a href="#craft" onClick={closeMobileNav}>The Bandha</a>
        <a href="#regions" onClick={closeMobileNav}>Regions</a>
        <a href="#weaves" onClick={closeMobileNav}>Weaves</a>
        <a href="#heritage" onClick={closeMobileNav}>Heritage</a>
        <a href="#loom" onClick={closeMobileNav}>Atelier</a>
        <a href="#weaves" className="nav-cta" onClick={closeMobileNav}><span>Enter the Loom</span></a>
      </div>
    </>
  );
}
