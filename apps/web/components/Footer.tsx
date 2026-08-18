'use client';

import React from 'react';
import { useModal } from '../providers/ModalProvider';

export default function Footer() {
  const { showToast } = useModal();

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col" style={{ gridColumn: 'span 2' }}>
          <a href="#" className="logo-mark" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>
            <span className="logo-icon">𑁍</span>
            <span>BANDHA</span>
          </a>
          <p style={{ color: 'var(--ivory-dim)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '420px', margin: '16px 0 24px' }}>
            The House of BANDHA — A luxury haute couture handloom atelier celebrating the Odia art of Bandha Ikat, GI-certified silks, and 214 master artisan families across India.
          </p>
          <div style={{ display: 'flex', gap: '14px' }}>
            <button className="icon-btn" onClick={() => showToast('Connecting to Instagram Atelier')} aria-label="Instagram">📸</button>
            <button className="icon-btn" onClick={() => showToast('Connecting to Pinterest Archives')} aria-label="Pinterest">📌</button>
            <button className="icon-btn" onClick={() => showToast('Connecting to Youtube Craft Films')} aria-label="YouTube">🎥</button>
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
            <li><a href="#regions">22+ State Archives</a></li>
            <li><a href="#editorial">The Journal & Essays</a></li>
            <li><a href="#heritage">800 Years of Lineage</a></li>
            <li><a href="#loom">Private Concierge Fitting</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Flagship Salons</h4>
          <ul>
            <li><a href="#loom">Bhubaneswar Sanctuary</a></li>
            <li><a href="#loom">Varanasi Heritage House</a></li>
            <li><a href="#loom">New Delhi Couture Salon</a></li>
            <li><a href="#loom">Mumbai Private Suite</a></li>
            <li><a href="#loom">Care & Pure Silk Storage</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 BANDHA Haute Couture Handlooms. Every thread, tied by hand.</span>
        <span>Geographical Indication (GI) & Handloom Mark Certified</span>
      </div>
    </footer>
  );
}

