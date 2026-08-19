'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { patternSVG } from '../utils/patterns';
import { SAREE_IMAGES, SareeCollectionItem, getSareeByName } from '../utils/sareeImages';

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
  sareeData?: SareeCollectionItem;
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
  const [activeTab, setActiveTab] = useState<'drape' | 'flat' | 'closeUp' | 'border' | 'palloo' | 'svg'>('drape');
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
  
  const openModal = (data: WeaveItem) => {
    // Find matching saree asset from SAREE_IMAGES if not directly attached
    const enrichedData = { ...data };
    if (!enrichedData.sareeData) {
      const matched = getSareeByName(data.name) || SAREE_IMAGES.find(s => s.metadata.name.toLowerCase().includes(data.name.toLowerCase()));
      if (matched) {
        enrichedData.sareeData = matched;
      }
    }
    setModalData(enrichedData);
    setActiveTab('drape');
  };

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

  const sareeInfo = modalData?.sareeData;
  const meta = sareeInfo?.metadata;
  const productImgs = sareeInfo?.productImages;
  const modelImgs = sareeInfo?.modelImages;

  // Determine current image URL based on activeTab
  const getCurrentImage = () => {
    if (!modalData) return null;
    if (activeTab === 'drape' && modelImgs?.fullDrape?.url) return modelImgs.fullDrape;
    if (activeTab === 'flat' && productImgs?.flat?.url) return productImgs.flat;
    if (activeTab === 'closeUp' && productImgs?.closeUp?.url) return productImgs.closeUp;
    if (activeTab === 'border' && productImgs?.border?.url) return productImgs.border;
    if (activeTab === 'palloo' && productImgs?.palloo?.url) return productImgs.palloo;
    return modelImgs?.fullDrape || productImgs?.flat || null;
  };

  const currentImg = getCurrentImage();

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
          <div className="modal-content lux-glass-panel" style={{ width: 'min(94vw, 1080px)' }}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">&times;</button>
            
            {/* Gallery Main Container */}
            <div className="gallery-container">
              <div className="gallery-main-view">
                {activeTab === 'svg' || !currentImg ? (
                  <PatternSVGWrapper pat={modalData.pat} c1={modalData.c1} c2={modalData.c2} />
                ) : (
                  <img 
                    src={currentImg.url} 
                    alt={currentImg.alt || modalData.name} 
                    className="gallery-main-img" 
                  />
                )}
                <div className="modal-watermark">
                  {meta ? `${meta.state} · ${meta.region}` : 'BANDHA HAUTE COUTURE'}
                </div>
              </div>

              {/* Gallery View Tabs */}
              <div className="gallery-tabs-bar">
                {modelImgs?.fullDrape && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'drape' ? 'active' : ''}`}
                    onClick={() => setActiveTab('drape')}
                  >
                    Full Drape 👗
                  </button>
                )}
                {productImgs?.flat && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'flat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('flat')}
                  >
                    Flat Lay 📜
                  </button>
                )}
                {productImgs?.closeUp && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'closeUp' ? 'active' : ''}`}
                    onClick={() => setActiveTab('closeUp')}
                  >
                    Weave Detail 🔍
                  </button>
                )}
                {productImgs?.border && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'border' ? 'active' : ''}`}
                    onClick={() => setActiveTab('border')}
                  >
                    Zari Border ✨
                  </button>
                )}
                {productImgs?.palloo && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'palloo' ? 'active' : ''}`}
                    onClick={() => setActiveTab('palloo')}
                  >
                    Palloo 𑁍
                  </button>
                )}
                <button 
                  className={`gallery-tab-btn ${activeTab === 'svg' ? 'active' : ''}`}
                  onClick={() => setActiveTab('svg')}
                >
                  Pattern Vector 📐
                </button>
              </div>
            </div>

            {/* Modal Details & Specs */}
            <div className="modal-details">
              <div className="modal-header">
                <span className="eyebrow">Iconic Weave {modalData.n}</span>
                <span className="modal-badge">GI Certified & Handloom Mark</span>
              </div>
              <h3 id="modalTitle">{modalData.name}</h3>
              <p id="modalDesc">{meta?.description || modalData.desc}</p>

              {/* Craft Specs */}
              <div className="modal-specs">
                <div className="spec-item">
                  <span className="spec-label">Crafting Time</span>
                  <span className="spec-val">{meta?.specs?.weavingTime || modalData.timeToWeave || '60 to 90 Days'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Pure Zari Grade</span>
                  <span className="spec-val">{meta?.specs?.zariGrade || modalData.zari || 'Tested Pure Gold Zari'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fabric / Thread Grade</span>
                  <span className="spec-val">{meta?.specs?.fabric || modalData.fabric || '100% Mulberry & Tussar Silk'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Yarn Count</span>
                  <span className="spec-val">{meta?.specs?.count || '80s/100s Fine Density'}</span>
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
                    showToast(`Concierge inquiry sent for ${modalData.name} custom curation.`);
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


