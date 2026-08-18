'use client';

import React from 'react';

const TIMELINE_EVENTS = [
  {
    year: '12th Century',
    title: 'The Divine Jagannath Offering',
    desc: 'The earliest historical records of Bandha Ikat tie-dye silk woven exclusively for the robes of Lord Jagannath in Puri, Odisha.'
  },
  {
    year: '18th Century',
    title: 'Royal Court Patronage',
    desc: 'Maratha and Odia kings grant royal charters to weaver guilds in Bargarh, Sonepur, and Nuapatna, elevating Bandha to state treasury status.'
  },
  {
    year: '1950s',
    title: 'Master Weaver Radhamohan Meher',
    desc: 'Pioneered complex double-Ikat calligraphic poetry and temple motif weaving, earning international acclaim for Sambalpuri textiles.'
  },
  {
    year: 'Present Day',
    title: 'The House of BANDHA Atelier',
    desc: 'Uniting 214 master artisan families across 22 states, preserving heirloom purity, 100% organic dyes, and certified gold zari.'
  }
];

export default function Heritage() {
  return (
    <section id="heritage" className="tex-emerald">
      <div className="section-head reveal">
        <span className="eyebrow">800 Years of Lineage</span>
        <h2 className="stitched">Four Generations at One Loom</h2>
        <p>
          Behind every Bandha saree is a family lineage, not a factory. Our weaving partners in Odisha, Varanasi, Paithan, and Kanchipuram preserve techniques unchanged across centuries.
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto 60px', textAlign: 'center' }}>
        <div className="lux-glass-panel" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-royal)', fontSize: '2.5rem', color: 'var(--gold-bright)', fontWeight: 700 }}>214</div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>Master Weaver Families</div>
        </div>
        <div className="lux-glass-panel" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-royal)', fontSize: '2.5rem', color: 'var(--gold-bright)', fontWeight: 700 }}>90</div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>Days Average Weave Time</div>
        </div>
        <div className="lux-glass-panel" style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'var(--font-royal)', fontSize: '2.5rem', color: 'var(--gold-bright)', fontWeight: 700 }}>100%</div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>Tested Pure Zari & Organic Dyes</div>
        </div>
      </div>

      {/* Vertical Archival Timeline */}
      <div className="heritage-timeline">
        {TIMELINE_EVENTS.map((evt, idx) => (
          <div key={idx} className="heritage-item reveal">
            <div className="heritage-dot"></div>
            <div className="heritage-content lux-glass-panel">
              <div className="heritage-year">{evt.year}</div>
              <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.2rem', color: 'var(--ivory)', marginBottom: '8px' }}>{evt.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--ivory-dim)', lineHeight: 1.6 }}>{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

