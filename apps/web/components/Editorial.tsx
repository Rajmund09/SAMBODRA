'use client';

import React from 'react';
import { SAREE_IMAGES } from '../utils/sareeImages';

const ARTICLES = [
  {
    tag: 'Artisan Portrait',
    title: 'The Hands of Bargarh: 40 Years at the Pit Loom',
    excerpt: 'Master Weaver Narottam Meher reflects on four decades of calculation, memory, and the rhythm of the wooden shuttle.',
    readTime: '6 min read',
    img: SAREE_IMAGES[0]?.productImages?.closeUp?.url
  },
  {
    tag: 'Haute Couture',
    title: 'The Palloo Unfolded: Architectural Pleating in Royal Silk',
    excerpt: 'How contemporary Indian designers are re-imagining the dramatic weight and fall of traditional Bandha borders for global red carpets.',
    readTime: '4 min read',
    img: SAREE_IMAGES[1]?.productImages?.border?.url
  },
  {
    tag: 'Dyeing Secrets',
    title: 'Alchemy of Madder & Indigo: Extracting Sacred Hues',
    excerpt: 'Steeped in copper cauldrons over woodfires, natural plant extracts give Sambalpuri Ikat its luminous depth.',
    readTime: '5 min read',
    img: SAREE_IMAGES[2]?.productImages?.palloo?.url
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
          <div key={idx} className="editorial-card lux-glass-panel reveal" style={{ padding: 0, overflow: 'hidden' }}>
            {article.img && (
              <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                <img 
                  src={article.img} 
                  alt={article.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                />
              </div>
            )}
            <div style={{ padding: '32px 28px' }}>
              <div className="editorial-tag">{article.tag} • {article.readTime}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div style={{ marginTop: '20px' }}>
                <a 
                  href="#editorial" 
                  style={{ 
                    color: 'var(--gold-bright)', 
                    textDecoration: 'none', 
                    fontSize: '0.78rem', 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase', 
                    fontWeight: 600 
                  }}
                >
                  Read Essay →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


