'use client';

import React from 'react';
import { useModal } from '../providers/ModalProvider';
import { patternSVG } from '../utils/patterns';

export default function AtelierDrawer() {
  const { atelierItems, removeFromAtelier, isAtelierOpen, setIsAtelierOpen, showToast, openModal } = useModal();

  return (
    <div className={`atelier-drawer ${isAtelierOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <div>
          <span className="eyebrow">Your Personal Collection</span>
          <h3>The Saved Atelier</h3>
        </div>
        <button 
          className="drawer-close" 
          onClick={() => setIsAtelierOpen(false)}
          aria-label="Close Atelier Drawer"
        >
          &times;
        </button>
      </div>

      <div className="drawer-body">
        {atelierItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ivory-dim)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>⚜️</div>
            <p style={{ fontFamily: 'var(--font-royal)', fontSize: '1.2rem', marginBottom: '8px' }}>Your Atelier is Empty</p>
            <p style={{ fontSize: '0.85rem' }}>Click "+ Save to Atelier Collection" on any swatch card or modal to curate your custom collection.</p>
          </div>
        ) : (
          atelierItems.map(item => (
            <div key={item.n} className="atelier-item">
              <div 
                className="atelier-item-preview"
                dangerouslySetInnerHTML={{ __html: patternSVG(item.pat, item.c1, item.c2) }}
              />
              <div className="atelier-item-info">
                <h4>{item.name}</h4>
                <p>Iconic Weave {item.n}</p>
                <button 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold-bright)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    marginTop: '4px',
                    padding: 0
                  }}
                  onClick={() => {
                    setIsAtelierOpen(false);
                    openModal(item);
                  }}
                >
                  View Details →
                </button>
              </div>
              <button 
                className="remove-btn"
                title="Remove from Atelier"
                onClick={() => removeFromAtelier(item.n)}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {atelierItems.length > 0 && (
        <div className="drawer-footer">
          <button 
            className="drawer-cta"
            onClick={() => {
              setIsAtelierOpen(false);
              showToast('Atelier consultation request submitted to Master Weaver Concierge.');
            }}
          >
            Request Private Consultation ({atelierItems.length} items)
          </button>
        </div>
      )}
    </div>
  );
}
