'use client';

import React from 'react';
import { useModal } from '../providers/ModalProvider';

export default function CompareDrawer() {
  const { compareItems, removeFromCompare, isCompareOpen, setIsCompareOpen, openCheckout, playSound } = useModal();

  if (!isCompareOpen) return null;

  return (
    <div 
      className="modal-overlay open"
      style={{ zIndex: 1050 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
          setIsCompareOpen(false);
        }
      }}
    >
      <div className="modal-content lux-glass-panel" style={{ width: 'min(96vw, 1100px)', padding: '40px', gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid rgba(201,162,39,0.2)', paddingBottom: '16px' }}>
          <div>
            <span className="eyebrow">Side-by-Side Heritage Analysis</span>
            <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '2rem', color: 'var(--gold-bright)', margin: '4px 0 0' }}>
              Compare Iconic Weaves ({compareItems.length}/3)
            </h3>
          </div>
          <button 
            className="drawer-close"
            onClick={() => {
              playSound('click');
              setIsCompareOpen(false);
            }}
          >
            &times;
          </button>
        </div>

        {compareItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ivory-dim)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>⚖️</div>
            <p style={{ fontFamily: 'var(--font-royal)', fontSize: '1.3rem', marginBottom: '8px' }}>No Weaves Selected for Comparison</p>
            <p style={{ fontSize: '0.9rem' }}>Click "+ Compare Weave" on any swatch card or product modal to compare up to 3 sarees side-by-side.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px', color: 'var(--gold-dark)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid rgba(201,162,39,0.2)', width: '180px' }}>
                    Specification
                  </th>
                  {compareItems.map(item => (
                    <th key={item.n} style={{ padding: '16px', borderBottom: '1px solid rgba(201,162,39,0.2)', minWidth: '240px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <span className="eyebrow">{item.n}</span>
                        <button 
                          onClick={() => removeFromCompare(item.n)}
                          style={{ background: 'none', border: 'none', color: 'var(--ruby)', cursor: 'pointer', fontSize: '1.2rem' }}
                          title="Remove from compare"
                        >
                          &times;
                        </button>
                      </div>
                      <div style={{ fontFamily: 'var(--font-royal)', fontSize: '1.2rem', color: 'var(--gold-bright)' }}>{item.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Weave Image */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.85rem' }}>Textile Preview</td>
                  {compareItems.map(item => {
                    const imgUrl = item.sareeData?.productImages?.closeUp?.url || item.sareeData?.productImages?.flat?.url || item.sareeData?.modelImages?.fullDrape?.url;
                    return (
                      <td key={item.n} style={{ padding: '16px' }}>
                        <div style={{ width: '100%', height: '140px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(201,162,39,0.2)' }}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', background: 'var(--ink-card)' }} />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 2: Region / Origin */}
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.85rem' }}>Region & State</td>
                  {compareItems.map(item => (
                    <td key={item.n} style={{ padding: '16px', color: 'var(--ivory)' }}>
                      {item.sareeData?.metadata ? `${item.sareeData.metadata.region}, ${item.sareeData.metadata.state}` : item.region || 'Odisha Heritage Guild'}
                    </td>
                  ))}
                </tr>

                {/* Row 3: Weaving Time */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.85rem' }}>Artisan Weaving Time</td>
                  {compareItems.map(item => (
                    <td key={item.n} style={{ padding: '16px', color: 'var(--gold-bright)', fontWeight: 700 }}>
                      ⏳ {item.sareeData?.metadata?.specs?.weavingTime || item.timeToWeave || '60 to 90 Days'}
                    </td>
                  ))}
                </tr>

                {/* Row 4: Pure Zari Grade */}
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.85rem' }}>Pure Zari Grade</td>
                  {compareItems.map(item => (
                    <td key={item.n} style={{ padding: '16px', color: 'var(--ivory)' }}>
                      ✨ {item.sareeData?.metadata?.specs?.zariGrade || item.zari || 'Tested Pure Gold Zari'}
                    </td>
                  ))}
                </tr>

                {/* Row 5: Fabric Grade */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.85rem' }}>Silk / Fabric Grade</td>
                  {compareItems.map(item => (
                    <td key={item.n} style={{ padding: '16px', color: 'var(--ivory)' }}>
                      🌿 {item.sareeData?.metadata?.specs?.fabric || item.fabric || '100% Pure Mulberry Silk'}
                    </td>
                  ))}
                </tr>

                {/* Row 6: Yarn Count */}
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--gold-light)', fontSize: '0.85rem' }}>Yarn Density Count</td>
                  {compareItems.map(item => (
                    <td key={item.n} style={{ padding: '16px', color: 'var(--ivory)' }}>
                      {item.sareeData?.metadata?.specs?.count || '80s/100s Fine Count'}
                    </td>
                  ))}
                </tr>

                {/* Row 7: Actions */}
                <tr>
                  <td style={{ padding: '16px' }}></td>
                  {compareItems.map(item => (
                    <td key={item.n} style={{ padding: '16px' }}>
                      <button 
                        onClick={() => {
                          setIsCompareOpen(false);
                          openCheckout(item);
                        }}
                        style={{
                          width: '100%',
                          background: 'var(--gold)',
                          color: 'var(--ink)',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Order Saree →
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
