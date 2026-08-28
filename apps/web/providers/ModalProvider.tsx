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
  
  // Compare Drawer State
  compareItems: WeaveItem[];
  addToCompare: (item: WeaveItem) => void;
  removeFromCompare: (n: string) => void;
  isInCompare: (n: string) => boolean;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Checkout Modal State
  checkoutItem: WeaveItem | null;
  isCheckoutOpen: boolean;
  openCheckout: (item: WeaveItem) => void;
  closeCheckout: () => void;

  // Salon Concierge Booking Modal State
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  selectedSalonLocation: string;
  setSelectedSalonLocation: (loc: string) => void;

  // Sound FX State
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playSound: (type?: 'click' | 'shuttle' | 'chime') => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [modalData, setModalData] = useState<WeaveItem | null>(null);
  const [activeTab, setActiveTab] = useState<'drape' | 'flat' | 'closeUp' | 'border' | 'palloo' | 'svg'>('drape');
  
  // Atelier Wishlist
  const [atelierItems, setAtelierItems] = useState<WeaveItem[]>([]);
  const [isAtelierOpen, setIsAtelierOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Compare Drawer
  const [compareItems, setCompareItems] = useState<WeaveItem[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Checkout Modal
  const [checkoutItem, setCheckoutItem] = useState<WeaveItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Salon Booking
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSalonLocation, setSelectedSalonLocation] = useState('Bhubaneswar Sanctuary');

  // Sound FX
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Magnifier Lens Position
  const [lensPos, setLensPos] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  useEffect(() => {
    if (modalData || isAtelierOpen || isSearchOpen || isCompareOpen || isCheckoutOpen || isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalData, isAtelierOpen, isSearchOpen, isCompareOpen, isCheckoutOpen, isBookingOpen]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
        playSound('click');
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsAtelierOpen(prev => !prev);
        playSound('click');
      } else if (e.key === 'Escape') {
        closeModal();
        setIsSearchOpen(false);
        setIsAtelierOpen(false);
        setIsCompareOpen(false);
        setIsCheckoutOpen(false);
        setIsBookingOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const playSound = (type: 'click' | 'shuttle' | 'chime' = 'click') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'shuttle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // Audio context fallback silent
    }
  };

  const showToast = (msg: string) => setToastMsg(msg);
  
  const openModal = (data: WeaveItem) => {
    playSound('shuttle');
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
    playSound('chime');
    if (atelierItems.some(i => i.n === item.n)) {
      showToast(`"${item.name}" is already in your Atelier Collection`);
      return;
    }
    setAtelierItems(prev => [...prev, item]);
    showToast(`Added "${item.name}" to your Atelier Collection`);
  };

  const removeFromAtelier = (n: string) => {
    playSound('click');
    setAtelierItems(prev => prev.filter(item => item.n !== n));
    showToast('Removed item from Atelier');
  };

  const isInAtelier = (n: string) => atelierItems.some(item => item.n === n);

  const addToCompare = (item: WeaveItem) => {
    playSound('chime');
    if (compareItems.some(i => i.n === item.n)) {
      showToast(`"${item.name}" is already in your Compare list`);
      return;
    }
    if (compareItems.length >= 3) {
      showToast('You can compare up to 3 weaves side-by-side');
      return;
    }
    setCompareItems(prev => [...prev, item]);
    showToast(`Added "${item.name}" to Compare list`);
  };

  const removeFromCompare = (n: string) => {
    playSound('click');
    setCompareItems(prev => prev.filter(item => item.n !== n));
  };

  const isInCompare = (n: string) => compareItems.some(item => item.n === n);

  const openCheckout = (item: WeaveItem) => {
    playSound('shuttle');
    setCheckoutItem(item);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutItem(null);
    setIsCheckoutOpen(false);
  };

  const sareeInfo = modalData?.sareeData;
  const meta = sareeInfo?.metadata;
  const productImgs = sareeInfo?.productImages;
  const modelImgs = sareeInfo?.modelImages;

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
      compareItems,
      addToCompare,
      removeFromCompare,
      isInCompare,
      isCompareOpen,
      setIsCompareOpen,
      checkoutItem,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      isBookingOpen,
      setIsBookingOpen,
      selectedSalonLocation,
      setSelectedSalonLocation,
      soundEnabled,
      setSoundEnabled,
      playSound
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
              <div 
                className="gallery-main-view"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setLensPos({ x, y, show: true });
                }}
                onMouseLeave={() => setLensPos(prev => ({ ...prev, show: false }))}
              >
                {activeTab === 'svg' || !currentImg ? (
                  <PatternSVGWrapper pat={modalData.pat} c1={modalData.c1} c2={modalData.c2} />
                ) : (
                  <>
                    <img 
                      src={currentImg.url} 
                      alt={currentImg.alt || modalData.name} 
                      className="gallery-main-img" 
                    />
                    {lensPos.show && (
                      <div 
                        className="macro-lens-zoom"
                        style={{
                          left: `${lensPos.x}%`,
                          top: `${lensPos.y}%`,
                          backgroundImage: `url(${currentImg.url})`,
                          backgroundPosition: `${lensPos.x}% ${lensPos.y}%`
                        }}
                      />
                    )}
                  </>
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
                    onClick={() => { playSound('click'); setActiveTab('drape'); }}
                  >
                    Full Drape 👗
                  </button>
                )}
                {productImgs?.flat && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'flat' ? 'active' : ''}`}
                    onClick={() => { playSound('click'); setActiveTab('flat'); }}
                  >
                    Flat Lay 📜
                  </button>
                )}
                {productImgs?.closeUp && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'closeUp' ? 'active' : ''}`}
                    onClick={() => { playSound('click'); setActiveTab('closeUp'); }}
                  >
                    Weave Detail 🔍
                  </button>
                )}
                {productImgs?.border && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'border' ? 'active' : ''}`}
                    onClick={() => { playSound('click'); setActiveTab('border'); }}
                  >
                    Zari Border ✨
                  </button>
                )}
                {productImgs?.palloo && (
                  <button 
                    className={`gallery-tab-btn ${activeTab === 'palloo' ? 'active' : ''}`}
                    onClick={() => { playSound('click'); setActiveTab('palloo'); }}
                  >
                    Palloo 𑁍
                  </button>
                )}
                <button 
                  className={`gallery-tab-btn ${activeTab === 'svg' ? 'active' : ''}`}
                  onClick={() => { playSound('click'); setActiveTab('svg'); }}
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
                  className="modal-cta"
                  style={{ background: 'linear-gradient(90deg, #F0D27E 0%, #C9A227 100%)', color: '#1B0E0C', fontWeight: 800 }}
                  onClick={() => {
                    closeModal();
                    openCheckout(modalData);
                  }}
                >
                  Order Bespoke Saree →
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    className={`modal-secondary-cta ${isInAtelier(modalData.n) ? 'in-atelier' : ''}`} 
                    onClick={() => {
                      if (isInAtelier(modalData.n)) removeFromAtelier(modalData.n);
                      else addToAtelier(modalData);
                    }}
                  >
                    {isInAtelier(modalData.n) ? '✓ Saved in Atelier' : '+ Atelier Wishlist'}
                  </button>

                  <button 
                    className="modal-secondary-cta"
                    onClick={() => {
                      if (isInCompare(modalData.n)) removeFromCompare(modalData.n);
                      else addToCompare(modalData);
                    }}
                  >
                    {isInCompare(modalData.n) ? '✓ In Compare' : '+ Compare Weave'}
                  </button>
                </div>
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



