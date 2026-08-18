'use client';

import React, { useState } from 'react';
import { useModal } from '../providers/ModalProvider';
import { WEAVES, STATES } from '../utils/data';

export default function QuickSearch() {
  const { isSearchOpen, setIsSearchOpen, openModal } = useModal();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredWeaves = WEAVES.filter(w => 
    w.name.toLowerCase().includes(query.toLowerCase()) || 
    w.desc.toLowerCase().includes(query.toLowerCase())
  );

  const matchedStates = STATES.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.sig.toLowerCase().includes(query.toLowerCase()) ||
    s.sarees.some(saree => saree.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div 
      className="modal-overlay open"
      style={{ zIndex: 1100 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
          setIsSearchOpen(false);
        }
      }}
    >
      <div className="modal-content lux-glass-panel" style={{ gridTemplateColumns: '1fr', padding: '36px' }}>
        <button 
          className="modal-close" 
          onClick={() => setIsSearchOpen(false)}
        >
          &times;
        </button>
        
        <div style={{ marginBottom: '24px' }}>
          <span className="eyebrow">Archive & Catalog Search</span>
          <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '1.8rem', color: 'var(--gold-bright)', margin: '6px 0 16px' }}>
            Find Your Weave
          </h3>
          <input 
            type="text"
            placeholder="Search by weave name, state (e.g. Sambalpuri, Kanjivaram, Odisha)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--gold)',
              padding: '16px 20px',
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontFamily: 'var(--font-royal)', fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Iconic Weaves ({filteredWeaves.length})
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
              {filteredWeaves.map(w => (
                <div 
                  key={w.n}
                  onClick={() => {
                    setIsSearchOpen(false);
                    openModal(w);
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,162,39,0.2)',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>{w.n}</div>
                  <div style={{ fontFamily: 'var(--font-royal)', color: 'var(--ivory)', fontWeight: 600 }}>{w.name}</div>
                </div>
              ))}
            </div>
          </div>

          {matchedStates.length > 0 && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-royal)', fontSize: '0.9rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Regions & State Archives ({matchedStates.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                {matchedStates.map(s => (
                  <div 
                    key={s.id}
                    style={{
                      background: 'rgba(201,162,39,0.06)',
                      border: '1px solid rgba(201,162,39,0.25)',
                      padding: '12px 16px',
                      borderRadius: '4px'
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold-bright)' }}>{s.ic} {s.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ivory-dim)' }}>Signature: {s.sig}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
