import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="temple-border"></div>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="logo-mark">BANDHA</span>
          <p>A house of handwoven sarees, built on the Odia art of bandha — the tie that comes before the dye, the dye that comes before the weave.</p>
        </div>
        <div className="footer-col">
          <h4>Weaves</h4>
          <a href="#weaves">Sambalpuri Bandha</a>
          <a href="#weaves">Kanjivaram</a>
          <a href="#weaves">Banarasi</a>
          <a href="#weaves">Paithani</a>
        </div>
        <div className="footer-col">
          <h4>House</h4>
          <a href="#craft">The Bandha</a>
          <a href="#heritage">Our Weavers</a>
          <a href="#loom">Atelier Notes</a>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <a href="#">Bhubaneswar Atelier</a>
          <a href="#">Book an Appointment</a>
          <a href="#">Care &amp; Storage</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Bandha. Every saree, tied by hand.</span>
        <span>Woven in Odisha</span>
      </div>
    </footer>
  );
}
