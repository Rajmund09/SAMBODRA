'use client';

import React, { useState } from 'react';

const CRAFT_STEPS = [
  {
    step: '01',
    title: 'Mathematical Plotting',
    desc: 'Before a single thread is dyed, the master artisan plots intricate geometric motifs onto graph paper, calculating exact warp and weft knot locations.',
    detail: 'Over 200 grid calculations per square inch ensure patterns align precisely across 6 meters of silk.'
  },
  {
    step: '02',
    title: 'Precision Thread Tying',
    desc: 'Thousands of tiny rubber, cotton, or bark ties are wound tightly around groups of raw silk threads to shield specific areas from dye.',
    detail: 'A single saree can feature up to 40,000 individual knots tied entirely by hand.'
  },
  {
    step: '03',
    title: 'Alchemic Dyeing',
    desc: 'The tied hanks of silk are submerged in natural dye vats — indigo, madder root, pomegranate rind, and lac resin.',
    detail: 'Repeated untying and re-dyeing creates multi-colored gradient motifs with iconic softened edges.'
  },
  {
    step: '04',
    title: 'Loom Setup & Tensioning',
    desc: 'Dyed warp threads are mounted onto the traditional wooden pit-loom, requiring 2-3 days of delicate alignment.',
    detail: 'Every warp thread must match its corresponding weft counterpart within sub-millimeter tolerances.'
  },
  {
    step: '05',
    title: 'Master Shuttle Weaving',
    desc: 'The weaver throws the wooden shuttle back and forth, building the pattern row-by-row as the Ikat motifs emerge on cloth.',
    detail: 'It takes 45 to 120 days of continuous artisan labor to produce a single heirloom masterpiece.'
  }
];

export default function CraftTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="craft" className="tex-emerald">
      <div className="section-head reveal">
        <span className="eyebrow">The Alchemy of Bandha</span>
        <h2 className="stitched">Five Steps of Creation</h2>
        <p>In double Ikat and Bandha weaving, the design is not printed or painted — it is born in the thread before the loom ever moves.</p>
      </div>

      <div className="craft-timeline">
        {CRAFT_STEPS.map((item, idx) => (
          <div 
            key={item.step}
            className={`timeline-card lux-glass-panel ${activeStep === idx ? 'active-step' : ''}`}
            onClick={() => setActiveStep(idx)}
            style={{
              borderColor: activeStep === idx ? 'var(--gold-bright)' : 'rgba(201,162,39,0.2)'
            }}
          >
            <div className="timeline-step-num">{item.step}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--gold-light)', opacity: 0.85 }}>
              ✦ {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
