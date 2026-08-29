'use client';

import React, { useState } from 'react';
import { useModal } from '../providers/ModalProvider';

export default function Newsletter() {
  const { showToast } = useModal();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    showToast('Welcome to the House of SAMBODRA Atelier VIP Circle.');
    setEmail('');
  };

  return (
    <section id="loom" className="tex-plum">
      <div className="newsletter-card lux-glass-panel reveal">
        <span className="eyebrow">Atelier Private Concierge</span>
        <h2 className="stitched" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '12px 0 16px' }}>
          Be First to the New Weave
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ivory-dim)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
          A quiet invitation, delivered a few times a season, whenever a limited-edition master weave comes off the pit-loom.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address for private previews..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit">Join VIP Circle</button>
        </form>
      </div>
    </section>
  );
}

