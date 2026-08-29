'use client';

import React from 'react';
import { useModal } from '../providers/ModalProvider';

export default function Footer() {
  const { showToast, setIsBookingOpen, setIsSearchOpen, setIsCompareOpen, soundEnabled, setSoundEnabled, playSound } = useModal();

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col" style={{ gridColumn: 'span 2' }}>
          <a href="#" className="logo-mark" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L20.5 11.5L30 16L20.5 20.5L16 30L11.5 20.5L2 16L11.5 11.5L16 2Z" fill="url(#logoGradFooter)" stroke="#FFE082" strokeWidth="1.2"/>
              <circle cx="16" cy="16" r="4" fill="#1B0E0C" stroke="#C9A227" strokeWidth="1"/>
              <defs>
                <linearGradient id="logoGradFooter" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F0D27E"/>
                  <stop offset="0.5" stopColor="#C9A227"/>
                  <stop offset="1" stopColor="#8B5E2E"/>
                </linearGradient>
              </defs>
            </svg>
            <span>SAMBODRA</span>
          </a>

          <p style={{ color: 'var(--ivory-dim)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '420px', margin: '16px 0 24px' }}>
            The House of SAMBODRA — A luxury haute couture handloom atelier celebrating the Odia art of Bandha Ikat, GI-certified silks, and 214 master artisan families across India.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <button className="icon-btn" onClick={() => showToast('Connecting to Instagram Atelier')} aria-label="Instagram">📸</button>
            <button className="icon-btn" onClick={() => showToast('Connecting to Pinterest Archives')} aria-label="Pinterest">📌</button>
            <button className="icon-btn" onClick={() => showToast('Connecting to Youtube Craft Films')} aria-label="YouTube">🎥</button>
            
            <button 
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSound('chime');
                showToast(next ? 'Sound FX Enabled' : 'Sound FX Muted');
              }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,162,39,0.3)',
                color: 'var(--gold-bright)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {soundEnabled ? '🔊 Audio FX On' : '🔇 Audio Muted'}
            </button>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', display: 'flex', gap: '16px' }}>
            <span><span className="kbd-pill">⌘K</span> Quick Search</span>
            <span><span className="kbd-pill">⌘B</span> Saved Atelier</span>
            <span><span className="kbd-pill">ESC</span> Close Modals</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Iconic Weaves</h4>
          <ul>
            <li><a href="#weaves">Sambalpuri Double Ikat</a></li>
            <li><a href="#weaves">Kanjivaram Temple Silk</a></li>
            <li><a href="#weaves">Banarasi Brocade Jaal</a></li>
            <li><a href="#weaves">Yeola Paithani Peacock</a></li>
            <li><a href="#weaves">Patan Patola Double Ikat</a></li>
            <li><a href="#weaves">Jamdani Feather Muslin</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Atelier & Heritage</h4>
          <ul>
            <li><a href="#craft">The 5 Steps of Creation</a></li>
            <li><a href="#simulator">3D Loom Studio Playground</a></li>
            <li><a href="#regions">22+ State Archives</a></li>
            <li><a href="#editorial">The Journal & Essays</a></li>
            <li><button onClick={() => setIsCompareOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--ivory-dim)', cursor: 'pointer', padding: 0 }}>Compare 3 Weaves Side-by-Side</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Flagship Salons</h4>
          <ul>
            <li><button onClick={() => setIsBookingOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--ivory-dim)', cursor: 'pointer', padding: 0 }}>Bhubaneswar Sanctuary</button></li>
            <li><button onClick={() => setIsBookingOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--ivory-dim)', cursor: 'pointer', padding: 0 }}>Varanasi Heritage House</button></li>
            <li><button onClick={() => setIsBookingOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--ivory-dim)', cursor: 'pointer', padding: 0 }}>New Delhi Couture Salon</button></li>
            <li><button onClick={() => setIsBookingOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--ivory-dim)', cursor: 'pointer', padding: 0 }}>Mumbai Private Suite</button></li>
            <li><button onClick={() => setIsBookingOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--gold-bright)', cursor: 'pointer', padding: 0 }}>✦ Book Private Fitting</button></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 SAMBODRA Haute Couture Handlooms. Every thread, tied by hand.</span>
        <span>Geographical Indication (GI) & Handloom Mark Certified</span>
      </div>
    </footer>
  );
}


