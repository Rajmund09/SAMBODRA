'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '../providers/ModalProvider';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { 
    atelierItems, 
    setIsAtelierOpen, 
    setIsSearchOpen, 
    compareItems, 
    setIsCompareOpen,
    setIsBookingOpen,
    soundEnabled,
    setSoundEnabled,
    playSound
  } = useModal();

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
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L20.5 11.5L30 16L20.5 20.5L16 30L11.5 20.5L2 16L11.5 11.5L16 2Z" fill="url(#logoGradNav)" stroke="#FFE082" strokeWidth="1.2"/>
            <circle cx="16" cy="16" r="4" fill="#1B0E0C" stroke="#C9A227" strokeWidth="1"/>
            <defs>
              <linearGradient id="logoGradNav" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F0D27E"/>
                <stop offset="0.5" stopColor="#C9A227"/>
                <stop offset="1" stopColor="#8B5E2E"/>
              </linearGradient>
            </defs>
          </svg>
          <span>BANDHA</span>
        </a>


        <ul className="nav-links">
          <li><a href="#craft">The Craft</a></li>
          <li><a href="#simulator">3D Studio</a></li>
          <li><a href="#regions">Regions</a></li>
          <li><a href="#weaves">Icons</a></li>
          <li><a href="#refine">Refine</a></li>
          <li><a href="#editorial">Journal</a></li>
        </ul>

        <div className="nav-actions">
          {/* Sound FX Toggle */}
          <button 
            className="icon-btn"
            title={soundEnabled ? 'Mute Loom Audio FX' : 'Enable Loom Audio FX'}
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playSound('chime');
            }}
            aria-label="Sound FX Toggle"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Quick Search Button */}
          <button 
            className="icon-btn" 
            title="Search Catalog (Cmd+K)"
            onClick={() => {
              playSound('click');
              setIsSearchOpen(true);
            }}
            aria-label="Search Weaves"
          >
            🔍
            <span className="kbd-pill">⌘K</span>
          </button>

          {/* Compare Button */}
          <button 
            className="icon-btn"
            title="Compare Weaves Side-by-Side"
            onClick={() => {
              playSound('click');
              setIsCompareOpen(true);
            }}
            aria-label="Compare Weaves"
          >
            ⚖️
            {compareItems.length > 0 && (
              <span className="atelier-badge" style={{ background: 'var(--gold-dark)' }}>{compareItems.length}</span>
            )}
          </button>

          {/* Atelier Wishlist Button */}
          <button 
            className="icon-btn" 
            title="View Atelier Saved Collection (Cmd+B)"
            onClick={() => {
              playSound('click');
              setIsAtelierOpen(true);
            }}
            aria-label="Atelier Wishlist"
          >
            ⚜️
            {atelierItems.length > 0 && (
              <span className="atelier-badge">{atelierItems.length}</span>
            )}
          </button>

          {/* Salon Booking Concierge CTA */}
          <button 
            className="nav-cta"
            onClick={() => {
              playSound('shuttle');
              setIsBookingOpen(true);
            }}
          >
            <span>Book Salon Fitting</span>
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
        <a href="#simulator" onClick={closeMobileNav}>3D Studio</a>
        <a href="#regions" onClick={closeMobileNav}>Regions</a>
        <a href="#weaves" onClick={closeMobileNav}>Icons</a>
        <a href="#refine" onClick={closeMobileNav}>Refine</a>
        <a href="#editorial" onClick={closeMobileNav}>Journal</a>
        <button 
          className="nav-cta" 
          onClick={() => {
            closeMobileNav();
            setIsBookingOpen(true);
          }}
        >
          <span>Book Private Salon Fitting</span>
        </button>
      </div>
    </>
  );
}


