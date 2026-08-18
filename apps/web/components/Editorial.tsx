'use client';

import React from 'react';

const ARTICLES = [
  {
    tag: 'Artisan Portrait',
    title: 'The Hands of Bargarh: 40 Years at the Pit Loom',
    excerpt: 'Master Weaver Narottam Meher reflects on four decades of calculation, memory, and the rhythm of the wooden shuttle.',
    readTime: '6 min read'
  },
  {
    tag: 'Haute Couture',
    title: 'The Palloo Unfolded: Architectural Pleating in Royal Silk',
    excerpt: 'How contemporary Indian designers are re-imagining the dramatic weight and fall of traditional Bandha borders for global red carpets.',
    readTime: '4 min read'
  },
  {
    tag: 'Dyeing Secrets',
    title: 'Alchemy of Madder & Indigo: Extracting Sacred Hues',
    excerpt: 'Steeped in copper cauldrons over woodfires, natural plant extracts give Sambalpuri Ikat its luminous depth.',
    readTime: '5 min read'
  }
];

export default function Editorial() {
  return (
    <section id="editorial" className="tex-plum">
      <div className="section-head reveal">
        <span className="eyebrow">The Atelier Journal</span>
        <h2 className="stitched">Essays, Artisans & Aesthetics</h2>
        <p>A quiet study of ancient weaving techniques, master artisans, and how light moves across tested gold zari.</p>
      </div>

      <div className="editorial-grid">
        {ARTICLES.map((article, idx) => (
          <div key={idx} className="editorial-card lux-glass-panel reveal">
            <div className="editorial-tag">{article.tag} • {article.readTime}</div>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <div style={{ marginTop: '24px' }}>
              <a 
                href="#editorial" 
                style={{ 
                  color: 'var(--gold-bright)', 
                  textDecoration: 'none', 
                  fontSize: '0.8rem', 
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase', 
                  fontWeight: 600 
                }}
              >
                Read Essay →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

