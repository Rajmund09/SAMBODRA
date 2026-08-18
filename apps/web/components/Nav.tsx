'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '../providers/ModalProvider';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { atelierItems, setIsAtelierOpen, setIsSearchOpen } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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
        <a href="#" className="logo-mark">
          <span className="logo-icon">𑁍</span>
          <span>BANDHA</span>
        </a>

        <ul className="nav-links">
          <li><a href="#craft">The Craft</a></li>
          <li><a href="#regions">Regions</a></li>
          <li><a href="#weaves">Icons</a></li>
          <li><a href="#refine">Refine</a></li>
          <li><a href="#editorial">Journal</a></li>
          <li><a href="#heritage">Heritage</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            className="icon-btn" 
            title="Search Weaves"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search Weaves"
          >
            🔍
          </button>

          <button 
            className="icon-btn" 
            title="View Atelier Saved Collection"
            onClick={() => setIsAtelierOpen(true)}
            aria-label="Atelier Wishlist"
          >
            ⚜️
            {atelierItems.length > 0 && (
              <span className="atelier-badge">{atelierItems.length}</span>
            )}
          </button>

          <button 
            className="nav-cta"
            onClick={() => setIsAtelierOpen(true)}
          >
            <span>Atelier Collection</span>
          </button>

          <button 
            className={`nav-toggle ${mobileOpen ? 'open' : ''}`} 
            id="navToggle" 
            aria-label="Toggle navigation menu"
            onClick={toggleMobileNav}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobileNav">
        <a href="#craft" onClick={closeMobileNav}>The Craft</a>
        <a href="#regions" onClick={closeMobileNav}>Regions</a>
        <a href="#weaves" onClick={closeMobileNav}>Icons</a>
        <a href="#refine" onClick={closeMobileNav}>Refine</a>
        <a href="#editorial" onClick={closeMobileNav}>Journal</a>
        <a href="#heritage" onClick={closeMobileNav}>Heritage</a>
        <button 
          className="nav-cta" 
          onClick={() => {
            closeMobileNav();
            setIsAtelierOpen(true);
          }}
        >
          <span>Saved Atelier ({atelierItems.length})</span>
        </button>
      </div>
    </>
  );
}

