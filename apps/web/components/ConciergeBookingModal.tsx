'use client';

import React, { useState } from 'react';
import { useModal } from '../providers/ModalProvider';

const SALONS = [
  { id: 'bhubaneswar', name: 'Bhubaneswar Heritage Sanctuary', address: 'Temple District, Odisha' },
  { id: 'varanasi', name: 'Varanasi Royal Ghat Salon', address: 'Assi Ghat, Uttar Pradesh' },
  { id: 'delhi', name: 'New Delhi High Couture Suite', address: 'Mehrauli Artisan District' },
  { id: 'mumbai', name: 'Mumbai Sea-Facing Salon', address: 'Colaba, Maharashtra' },
  { id: 'virtual', name: 'Virtual HD Atelier Stream', address: 'Global Interactive Live Video' }
];

const TIME_SLOTS = [
  '11:00 AM - 12:30 PM',
  '02:00 PM - 03:30 PM',
  '04:30 PM - 06:00 PM',
  '06:30 PM - 08:00 PM'
];

export default function ConciergeBookingModal() {
  const { isBookingOpen, setIsBookingOpen, selectedSalonLocation, setSelectedSalonLocation, showToast, playSound } = useModal();
  const [selectedDate, setSelectedDate] = useState('2026-09-05');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState<null | { bookingId: string }>(null);

  if (!isBookingOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please provide your name and phone number.');
      return;
    }
    playSound('chime');
    const bookingId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingConfirmed({ bookingId });
    showToast(`Appointment ${bookingId} reserved!`);
  };

  return (
    <div 
      className="modal-overlay open"
      style={{ zIndex: 1120 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
          setIsBookingOpen(false);
        }
      }}
    >
      <div className="modal-content lux-glass-panel" style={{ width: 'min(94vw, 860px)', padding: '36px' }}>
        <button className="modal-close" onClick={() => setIsBookingOpen(false)}>&times;</button>

        {bookingConfirmed ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🕯️</div>
            <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Concierge Appointment Reserved</span>
            <h2 style={{ fontFamily: 'var(--font-royal)', fontSize: '2.2rem', color: 'var(--gold-bright)', margin: '12px 0 16px' }}>
              We Await Your Visit, {name}
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ivory-dim)', fontStyle: 'italic', maxWidth: '580px', margin: '0 auto 28px' }}>
              Your private fitting consultation has been scheduled at our <strong>{selectedSalonLocation}</strong>.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--gold)', borderRadius: '6px', padding: '24px', maxWidth: '480px', margin: '0 auto 32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold-dark)', textTransform: 'uppercase' }}>Booking ID:</span>
                <span style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>{bookingConfirmed.bookingId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold-dark)', textTransform: 'uppercase' }}>Date & Time:</span>
                <span style={{ color: 'var(--ivory)' }}>{selectedDate} at {selectedTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gold-dark)', textTransform: 'uppercase' }}>Location:</span>
                <span style={{ color: 'var(--ivory)' }}>{selectedSalonLocation}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsBookingOpen(false);
                setBookingConfirmed(null);
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
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            <span className="eyebrow">Master Weaver Private Concierge</span>
            <h3 style={{ fontFamily: 'var(--font-royal)', fontSize: '2rem', color: 'var(--gold-bright)', margin: '6px 0 24px' }}>
              Book Salon Fitting Consultation
            </h3>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Salon Location Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '10px' }}>
                  Select Flagship Salon Location
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {SALONS.map(salon => (
                    <div 
                      key={salon.id}
                      onClick={() => {
                        setSelectedSalonLocation(salon.name);
                        playSound('click');
                      }}
                      style={{
                        background: selectedSalonLocation === salon.name ? 'rgba(201,162,39,0.15)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${selectedSalonLocation === salon.name ? 'var(--gold-bright)' : 'rgba(201,162,39,0.2)'}`,
                        padding: '14px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ivory)' }}>{salon.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>{salon.address}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '6px' }}>Select Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '6px' }}>Select Preferred Time Slot</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{ width: '100%', background: '#160b0d', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }}
                  >
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '6px' }}>Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name" 
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '6px' }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210" 
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '6px' }}>Consultation Focus / Notes (Optional)</label>
                <textarea 
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Bridal Trousseau, Custom Family Motif Heritage Weave, Heirloom Zari Restoration..." 
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,39,0.3)', padding: '12px 16px', borderRadius: '4px', color: 'var(--ivory)', fontSize: '0.9rem' }} 
                />
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
                  cursor: 'pointer'
                }}
              >
                Confirm Salon Reservation →
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
