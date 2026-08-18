'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { patternSVG } from '../utils/patterns';

export type WeaveItem = {
  n: string;
  name: string;
  desc: string;
  c1: string;
  c2: string;
  pat: string;
  region?: string;
  fabric?: string;
  zari?: string;
  timeToWeave?: string;
};

interface ModalContextType {
  showToast: (msg: string) => void;
  openModal: (data: WeaveItem) => void;
  closeModal: () => void;
  atelierItems: WeaveItem[];
  addToAtelier: (item: WeaveItem) => void;
  removeFromAtelier: (n: string) => void;
  isInAtelier: (n: string) => boolean;
  isAtelierOpen: boolean;
  setIsAtelierOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [modalData, setModalData] = useState<WeaveItem | null>(null);
  const [atelierItems, setAtelierItems] = useState<WeaveItem[]>([]);
  const [isAtelierOpen, setIsAtelierOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  useEffect(() => {
    if (modalData || isAtelierOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalData, isAtelierOpen, isSearchOpen]);

  const showToast = (msg: string) => setToastMsg(msg);
  const openModal = (data: WeaveItem) => setModalData(data);
  const closeModal = () => setModalData(null);

  const addToAtelier = (item: WeaveItem) => {
    if (atelierItems.some(i => i.n === item.n)) {
      showToast(`"${item.name}" is already in your Atelier Collection`);
      return;
    }
    setAtelierItems(prev => [...prev, item]);
    showToast(`Added "${item.name}" to your Atelier Collection`);
  };

  const removeFromAtelier = (n: string) => {
    setAtelierItems(prev => prev.filter(item => item.n !== n));
    showToast('Removed item from Atelier');
  };

  const isInAtelier = (n: string) => atelierItems.some(item => item.n === n);

  return (
    <ModalContext.Provider value={{
      showToast,
      openModal,
      closeModal,
      atelierItems,
      addToAtelier,
      removeFromAtelier,
      isInAtelier,
      isAtelierOpen,
      setIsAtelierOpen,
      isSearchOpen,
      setIsSearchOpen,
    }}>
      {children}
      
      {/* Toast Notification */}
      <div id="toast" className={`lux-toast ${toastMsg ? 'show' : ''}`}>
        <span className="toast-icon">✨</span>
        <span className="toast-msg">{toastMsg}</span>
      </div>

      {/* Product Swatch Modal */}
      {modalData && (
        <div 
          className="modal-overlay open" 
          id="productModal" 
          onClick={(e) => { if ((e.target as HTMLElement).id === 'productModal') closeModal(); }}
        >
          <div className="modal-content lux-glass-panel">
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">&times;</button>
            <div className="modal-image" id="modalImage">
              <PatternSVGWrapper pat={modalData.pat} c1={modalData.c1} c2={modalData.c2} />
              <div className="modal-watermark">BANDHA HAULTE COUTURE</div>
            </div>
            <div className="modal-details">
              <div className="modal-header">
                <span className="eyebrow">Iconic Weave {modalData.n}</span>
                <span className="modal-badge">Geographical Indication (GI) Certified</span>
              </div>
              <h3 id="modalTitle">{modalData.name}</h3>
              <p id="modalDesc">{modalData.desc}</p>

              {/* Craft Specs */}
              <div className="modal-specs">
                <div className="spec-item">
                  <span className="spec-label">Crafting Time</span>
                  <span className="spec-val">{modalData.timeToWeave || '60 to 90 Days'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Pure Zari Grade</span>
                  <span className="spec-val">{modalData.zari || 'Tested Pure Gold Zari'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Silk Origin</span>
                  <span className="spec-val">{modalData.fabric || '100% Mulberry & Tussar Silk'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Authenticity</span>
                  <span className="spec-val">Handloom Mark Verified</span>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className={`modal-cta ${isInAtelier(modalData.n) ? 'in-atelier' : ''}`} 
                  onClick={() => {
                    if (isInAtelier(modalData.n)) {
                      removeFromAtelier(modalData.n);
                    } else {
                      addToAtelier(modalData);
                    }
                  }}
                >
                  <span>{isInAtelier(modalData.n) ? '✓ Saved in Atelier' : '+ Save to Atelier Collection'}</span>
                </button>
                <button 
                  className="modal-secondary-cta"
                  onClick={() => {
                    closeModal();
                    showToast('Concierge inquiry sent for custom curation.');
                  }}
                >
                  Request Atelier Bespoke Fitting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

function PatternSVGWrapper({ pat, c1, c2 }: { pat: string; c1: string; c2: string }) {
  const [svgStr, setSvgStr] = useState('');
  useEffect(() => {
    setSvgStr(patternSVG(pat, c1, c2));
  }, [pat, c1, c2]);
  
  if (!svgStr) return null;
  return <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svgStr }} />;
}

