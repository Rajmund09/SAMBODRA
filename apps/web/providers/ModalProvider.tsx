'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ModalData = {
  n: string;
  name: string;
  desc: string;
  c1: string;
  c2: string;
  pat: string;
} | null;

interface ModalContextType {
  showToast: (msg: string) => void;
  openModal: (data: NonNullable<ModalData>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [modalData, setModalData] = useState<ModalData>(null);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalData]);

  const showToast = (msg: string) => setToastMsg(msg);
  const openModal = (data: NonNullable<ModalData>) => setModalData(data);
  const closeModal = () => setModalData(null);

  // Dynamically import patternSVG to avoid hydration mismatch if needed, but it's pure logic
  // we can just import it in the component. We'll leave the rendering to the Modal content component.

  return (
    <ModalContext.Provider value={{ showToast, openModal, closeModal }}>
      {children}
      
      {/* Toast */}
      <div id="toast" className={toastMsg ? 'show' : ''}>
        {toastMsg}
      </div>

      {/* Modal Overlay */}
      {modalData && (
        <div className="modal-overlay open" id="productModal" onClick={(e) => { if ((e.target as HTMLElement).id === 'productModal') closeModal(); }}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-image" id="modalImage">
              {/* Render pattern here. Wait, we need patternSVG from utils. */}
              {/* For now, just a placeholder or we can import it. */}
              {/* Actually, let's render an img or SVG wrapper. */}
              <PatternSVGWrapper pat={modalData.pat} c1={modalData.c1} c2={modalData.c2} />
            </div>
            <div className="modal-details">
              <span className="eyebrow" id="modalNum">{modalData.n}</span>
              <h3 id="modalTitle">{modalData.name}</h3>
              <p id="modalDesc">{modalData.desc}</p>
              <button className="modal-cta" onClick={() => showToast('Added to your atelier collection')}>Add to Collection</button>
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

// A helper to render the SVG pattern via dangerouslySetInnerHTML
import { patternSVG } from '../utils/patterns';
function PatternSVGWrapper({ pat, c1, c2 }: { pat: string; c1: string; c2: string }) {
  const [svgStr, setSvgStr] = useState('');
  useEffect(() => {
    setSvgStr(patternSVG(pat, c1, c2));
  }, [pat, c1, c2]);
  
  if (!svgStr) return null;
  return <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svgStr }} />;
}
