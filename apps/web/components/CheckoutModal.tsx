'use client';

import React, { useState } from 'react';
import { useModal } from '../providers/ModalProvider';

export default function CheckoutModal() {
  const { checkoutItem, isCheckoutOpen, closeCheckout, showToast, playSound } = useModal();
  const [sareeLength, setSareeLength] = useState<'standard' | 'blouse'>('blouse');
  const [zariCert, setZariCert] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<null | { orderId: string; date: string }>(null);

  if (!isCheckoutOpen || !checkoutItem) return null;

  const basePrice = 45000;
  const blousePrice = sareeLength === 'blouse' ? 4500 : 0;
  const certPrice = zariCert ? 1200 : 0;
  const totalPrice = basePrice + blousePrice + certPrice;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) {
      showToast('Please complete all required shipping details.');
      return;
    }
    playSound('chime');
    const orderId = `BND-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setOrderConfirmed({ orderId, date });
    showToast(`Order ${orderId} placed successfully!`);
  };

  return (
    <div 
      className="modal-overlay open"
      style={{ zIndex: 1150 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
          closeCheckout();
        }
      }}
    >
      <div className="modal-content lux-glass-panel" style={{ width: 'min(94vw, 920px)', padding: '36px' }}>
        <button className="modal-close" onClick={closeCheckout}>&times;</button>

        {orderConfirmed ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>⚜️</div>
            <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Order Confirmed · Handloom Mark Verified</span>
            <h2 style={{ fontFamily: 'var(--font-royal)', fontSize: '2.4rem', color: 'var(--gold-bright)', margin: '12px 0 16px' }}>
              Thank You, {fullName}
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ivory-dim)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto 28px' }}>
              Your order for <strong>"{checkoutItem.name}"</strong> has been registered with the Master Weaver Guild.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--gold)', borderRadius: '6px', padding: '24px', maxWidth: '520px', margin: '0 auto 32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order Reference ID:</span>
                <span style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>{orderConfirmed.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date of Order:</span>
                <span style={{ color: 'var(--ivory)' }}>{orderConfirmed.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estimated Dispatch:</span>
                <span style={{ color: 'var(--ivory)' }}>14 Business Days (Insured Express)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(201,162,39,0.3)', paddingTop: '10px', marginTop: '10px', fontSize: '1rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--gold-bright)' }}>Total Paid:</span>
                <span style={{ color: 'var(--gold-bright)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                closeCheckout();
                setOrderConfirmed(null);
              }}
              style={{
                background: 'var(--gold)',
                color: 'var(--ink)',
                border: 'none',
                padding: '16px 36px',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Done & Return to Atelier
            </button>
          </div>
        ) : (
          <div>
            <span className="eyebrow">Bespoke Atelier Ordering</span>
            <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '2rem', color: 'var(--gold-bright)', margin: '6px 0 24px' }}>
              Order "{checkoutItem.name}"
            </h3>

            <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left Column: Saree Configuration & Options */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-royal)', fontSize: '1rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid rgba(201,162,39,0.2)' }}>
                  1. Saree Configuration
                </h4>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '8px' }}>
                    Saree Length & Blouse Piece
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', border: `1px solid ${sareeLength === 'blouse' ? 'var(--gold)' : 'rgba(201,162,39,0.2)'}`, borderRadius: '4px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="length" 
                        checked={sareeLength === 'blouse'} 
                        onChange={() => setSareeLength('blouse')} 
                      />
                      <span style={{ fontSize: '0.88rem', color: 'var(--ivory)' }}>
                        6.3 Meters (Includes Unstitched Matching Blouse Piece) (+₹4,500)
                      </span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', border: `1px solid ${sareeLength === 'standard' ? 'var(--gold)' : 'rgba(201,162,39,0.2)'}`, borderRadius: '4px', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="length" 
                        checked={sareeLength === 'standard'} 
                        onChange={() => setSareeLength('standard')} 
                      />
                      <span style={{ fontSize: '0.88rem', color: 'var(--ivory)' }}>
                        5.5 Meters (Standard Saree Only)
                      </span>
                    </label>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '14px 16px', border: '1px solid rgba(201,162,39,0.2)', borderRadius: '4px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={zariCert} 
                      onChange={(e) => setZariCert(e.target.checked)} 
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--gold-bright)', fontWeight: 600 }}>
                        Include Tested Pure Gold Zari Certificate (+₹1,200)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)' }}>
                        Includes government-accredited metallurgical purity test report.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Price Breakdown */}
                <div style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.25)', padding: '20px', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--ivory-dim)' }}>Base Saree Craft Price:</span>
                    <span style={{ color: 'var(--ivory)' }}>₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  {sareeLength === 'blouse' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--ivory-dim)' }}>Unstitched Blouse Piece:</span>
                      <span style={{ color: 'var(--ivory)' }}>+₹4,500</span>
                    </div>
                  )}
                  {zariCert && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--ivory-dim)' }}>Zari Metallurgical Certificate:</span>
                      <span style={{ color: 'var(--ivory)' }}>+₹1,200</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201,162,39,0.3)', paddingTop: '10px', marginTop: '10px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                    <span>Total Investment:</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Shipping & Delivery Info */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-royal)', fontSize: '1rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid rgba(201,162,39,0.2)' }}>
                  2. Shipping & Atelier Delivery
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '4px' }}>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maharani Gayatri Devi" 
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '4px' }}>Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. concierge@domain.com" 
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '4px' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210" 
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '4px' }}>Shipping Address *</label>
                    <textarea 
                      required 
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Full street address, city, state, postal code..." 
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'var(--gold)',
                    color: 'var(--ink)',
                    border: 'none',
                    padding: '18px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(201,162,39,0.3)'
                  }}
                >
                  Confirm & Place Order (₹{totalPrice.toLocaleString('en-IN')})
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
