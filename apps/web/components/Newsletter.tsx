'use client';

import React from 'react';
import { useModal } from '../providers/ModalProvider';

export default function Newsletter() {
  const { showToast } = useModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Thank you for subscribing! You are now woven in.');
    e.currentTarget.reset();
  };

  return (
    <div id="loom" className="loom-cta tex-emerald">
      <span className="eyebrow">Join the Loom</span>
      <h2 className="stitched">Be first to the new weave</h2>
      <p>A quiet note, a few times a season, when a new bandha pattern comes off the loom.</p>
      <form className="loom-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Your email" required />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
