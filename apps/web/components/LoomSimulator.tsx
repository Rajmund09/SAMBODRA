'use client';

import React, { useState } from 'react';
import { useModal } from '../providers/ModalProvider';

const DYES = [
  { id: 'madder', name: 'Madder Root (Ruby Maroon)', color: '#7C1F2C', accent: '#F0D27E' },
  { id: 'indigo', name: 'Neel Indigo (Royal Emerald)', color: '#153A2C', accent: '#FFE082' },
  { id: 'lac', name: 'Lac Insect Resin (Deep Plum)', color: '#33132C', accent: '#F1E6CE' },
  { id: 'marigold', name: 'Marigold & Turmeric (Burnished Gold)', color: '#C9A227', accent: '#3A0F1C' }
];

export default function LoomSimulator() {
  const [warpTension, setWarpTension] = useState(85);
  const [weftOffset, setWeftOffset] = useState(4);
  const [selectedDye, setSelectedDye] = useState(DYES[0]);
  const [loomSpeed, setLoomSpeed] = useState(2);
  const [isWeaving, setIsWeaving] = useState(true);
  const { playSound, showToast } = useModal();

  const handleDyeChange = (dye: typeof DYES[0]) => {
    setSelectedDye(dye);
    playSound('click');
  };

  return (
    <section id="simulator" className="tex-ikat" style={{ background: '#0e0607' }}>
      <div className="section-head reveal">
        <span className="eyebrow">Interactive Studio Playground</span>
        <h2 className="stitched">Double-Ikat Loom Tension Simulator</h2>
        <p>
          Experience the delicate physics of Bandha weaving. Adjust thread tension, weft alignment, and natural dye vats to see how micro-fractures in yarn create iconic softened Ikat borders.
        </p>
      </div>

      <div className="lux-glass-panel reveal" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px', borderRadius: '8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* Live Simulator Viewport */}
          <div style={{ background: '#070304', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '6px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', zIndex: 5 }}>
              ● Live Loom Canvas · {warpTension}% Tension
            </div>

            {/* Canvas Thread Geometry */}
            <div style={{ width: '100%', height: '260px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="100%" viewBox="0 0 400 240">
                <defs>
                  <pattern id="loomThreadPat" width={20 - (weftOffset * 0.5)} height={20 - (weftOffset * 0.5)} patternUnits="userSpaceOnUse">
                    <rect width="100%" height="100%" fill={selectedDye.color} />
                    <circle cx="10" cy="10" r={warpTension * 0.08} fill={selectedDye.accent} opacity="0.8" />
                    <line x1="0" y1="0" x2="20" y2="20" stroke={selectedDye.accent} strokeWidth={weftOffset * 0.25} strokeDasharray="2,2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#loomThreadPat)" rx="6" />
                
                {/* Loom Shuttle Motion Indicator */}
                {isWeaving && (
                  <line 
                    x1="0" 
                    y1="120" 
                    x2="400" 
                    y2="120" 
                    stroke="var(--gold-bright)" 
                    strokeWidth="2" 
                    strokeDasharray="10, 10" 
                    style={{ animation: `marqueeScroll ${6 / loomSpeed}s linear infinite` }}
                  />
                )}
              </svg>
            </div>

            {/* Status Footer */}
            <div style={{ marginTop: '16px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--ivory-dim)' }}>
              <span>Warp Yarn: 100s Mulberry</span>
              <span style={{ color: 'var(--gold-bright)' }}>Calculated Alignment Error: {(weftOffset * 0.12).toFixed(2)}mm</span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Control 1: Warp Tension */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  Warp Thread Tension ({warpTension}%)
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)' }}>Optimal: 80-90%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={warpTension} 
                onChange={(e) => {
                  setWarpTension(Number(e.target.value));
                  playSound('click');
                }}
                style={{ width: '100%', accentColor: 'var(--gold)' }}
              />
            </div>

            {/* Control 2: Weft Offset */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  Weft Alignment Offset ({weftOffset}px)
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)' }}>Simulates Handloom Feathering</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="16" 
                value={weftOffset} 
                onChange={(e) => {
                  setWeftOffset(Number(e.target.value));
                  playSound('click');
                }}
                style={{ width: '100%', accentColor: 'var(--gold)' }}
              />
            </div>

            {/* Control 3: Natural Dye Vat Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '10px' }}>
                Natural Dye Vat Selection
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {DYES.map(dye => (
                  <button 
                    key={dye.id}
                    onClick={() => handleDyeChange(dye)}
                    style={{
                      background: selectedDye.id === dye.id ? dye.color : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedDye.id === dye.id ? 'var(--gold-bright)' : 'rgba(201,162,39,0.25)'}`,
                      color: 'var(--ivory)',
                      padding: '10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ● {dye.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Loom Shuttle Action */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                onClick={() => {
                  setIsWeaving(!isWeaving);
                  playSound('shuttle');
                  showToast(isWeaving ? 'Loom shuttle paused' : 'Loom shuttle active');
                }}
                style={{
                  flex: 1,
                  background: isWeaving ? 'var(--gold)' : 'transparent',
                  color: isWeaving ? 'var(--ink)' : 'var(--gold-bright)',
                  border: '1px solid var(--gold)',
                  padding: '14px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isWeaving ? '⏸ Pause Shuttle' : '▶ Throw Shuttle'}
              </button>

              <button 
                onClick={() => {
                  setWarpTension(85);
                  setWeftOffset(4);
                  setSelectedDye(DYES[0]);
                  playSound('click');
                  showToast('Reset loom geometry parameters');
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(201,162,39,0.3)',
                  color: 'var(--ivory-dim)',
                  padding: '14px 20px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Reset ↺
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
