'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { ZoomIn, ZoomOut, Home, Info } from 'lucide-react';

/** ====== REGIONS (istersen kendi listenle değiştir) ====== **/
const regionData = [
  {
    id: 'northFajah',
    name: 'North Fajah Federation',
    position: { top: '19%', left: '21%' },
    icon: 'fas fa-mountain',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '4 Million',
    capital: 'Megoran'
  },
  {
    id: 'blizzardKingdom',
    name: 'Blizzard Kingdom',
    position: { top: '19%', left: '31%' },
    icon: 'fas fa-snowflake',
    color: 'bg-pink-300',
    description: 'Information Unknown',
    population: '3.4 Million',
    capital: 'Snoval'
  },
  {
    id: 'hahunEmpire',
    name: 'Hahun Empire',
    position: { top: '28%', left: '45%' },
    icon: 'fas fa-crown',
    color: 'bg-amber-200',
    description: 'Known for their fearsome military prowess and warrior culture. Actively expanding their territories in pursuit of vital natural resources.',
    population: '7 Million',
    capital: 'Hanook'
  },
  {
    id: 'falhjeimEmpire',
    name: 'Falhejim Empire',
    position: { top: '29%', left: '64%' },
    icon: 'fas fa-snowflake',
    color: 'bg-pink-300',
    description: 'Information Unknown.',
    population: '8 Million',
    capital: 'Fallhall'
  },
  {
    id: 'poliraKingdom',
    name: 'Polira Kingdom',
    position: { top: '33%', left: '26%' },
    icon: 'fas fa-dove',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '10 Million',
    capital: 'Pyronisk'
  },
  {
    id: 'poliland',
    name: 'Polaris Kingdom',
    position: { top: '38%', left: '12%' },
    icon: 'fas fa-leaf',
    color: 'bg-amber-200',
    description: 'Information Unknown',
    population: '700K',
    capital: 'Poliland'
  },
  {
    id: 'elarisEmpire',
    name: 'Elaris Empire',
    position: { top: '53%', left: '22%' },
    icon: 'fas fa-cog',
    color: 'bg-pink-300',
    description: 'Information Unknown.',
    population: '10 Million',
    capital: 'Arapol'
  },
  {
    id: 'elysianFederation',
    name: 'Elysian Federation',
    position: { top: '72%', left: '20%' },
    icon: 'fas fa-scroll',
    color: 'bg-amber-100',
    description: 'A federation of 3 small states, known for their global crystal market. They value magic.',
    population: '12 Million',
    capital: 'Rakam'
  },
  {
    id: 'aurelKingdom',
    name: 'Aurel Kingdom',
    position: { top: '49%', left: '48%' },
    icon: 'fas fa-ship',
    color: 'bg-pink-300',
    description: 'A kingdom with a long history of naval power. Their ships are renowned throughout the world.',
    population: '10 Million',
    capital: 'Aurelia'
  },
  {
    id: 'serethielKingdom',
    name: 'Serethiel Kingdom',
    position: { top: '43%', left: '75%' },
    icon: 'fas fa-moon',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '14 Million',
    capital: 'Great City'
  },
  {
    id: 'holyDominionLetfia',
    name: 'The Holy Dominion of Letfia',
    position: { top: '66%', left: '71%' },
    icon: 'fas fa-place-of-worship',
    color: 'bg-blue-200',
    description: 'Information Unknown',
    population: '10 Million',
    capital: 'Letfis'
  },
  {
    id: 'aristelAristocracy',
    name: 'Aristel Aristocracy',
    position: { top: '41%', left: '40%' },
    icon: 'fas fa-chess-queen',
    color: 'bg-pink-300',
    description: 'A region governed by a circle of noble houses that compete for influence and power.',
    population: '7 Million',
    capital: 'Krea'
  },
  {
    id: 'eastTalorath',
    name: 'East Talorath',
    position: { top: '50%', left: '89%' },
    icon: 'fas fa-compass',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '6 Million',
    capital: 'Raito'
  },
  {
    id: 'westTalorath',
    name: 'West Talorath',
    position: { top: '32%', left: '85%' },
    icon: 'fas fa-wheat-awn',
    color: 'bg-pink-300',
    description: 'Information Unknown',
    population: '7 Million',
    capital: 'Kara'
  },
  {
    id: 'goldenCouncil',
    name: 'Golden Council',
    position: { top: '36%', left: '59%' },
    icon: 'fas fa-coins',
    color: 'bg-amber-100',
    description: 'A region ruled by a few high ranked soldiers.',
    population: 'Information Unknown',
    capital: 'Goldenheart'
  },
  {
    id: 'freecityRepublic',
    name: 'Freecity (???)',
    position: { top: '52%', left: '62%' },
    icon: 'fas fa-city',
    color: 'bg-pink-300',
    description: 'Information Unknown',
    population: 'Information Unknown',
    capital: 'Freehaven'
  },
  {
    id: 'kingdomOfAlegia',
    name: 'Kingdom of Alegia',
    position: { top: '58%', left: '80%' },
    icon: 'fas fa-hat-wizard',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '5 Million',
    capital: 'Talash'
  },
  {
    id: 'thalesTheocracy',
    name: 'Thales Theocracy',
    position: { top: '67%', left: '33%' },
    icon: 'fas fa-pray',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '900k',
    capital: 'Sanctuarium'
  },
  {
    id: 'aetherKingdom',
    name: 'Aether Kingdom',
    position: { top: '72%', left: '39%' },
    icon: 'fas fa-ghost',
    color: 'bg-pink-300',
    description: 'Information Unknown',
    population: '5 Million',
    capital: 'Aitria'
  },
  {
    id: 'aaronKingdom',
    name: 'Aaron Kingdom',
    position: { top: '66%', left: '47%' },
    icon: 'fas fa-book',
    color: 'bg-amber-100',
    description: 'A kingdom built on a foundation of ancient knowledge and arcane studies.',
    population: '5 Million',
    capital: 'Urayu'
  },
  {
    id: 'valoraKingdom',
    name: 'Valora Kingdom',
    position: { top: '52%', left: '35%' },
    icon: 'fas fa-shield-alt',
    color: 'bg-amber-100',
    description: 'Information Unknown',
    population: '9 Million',
    capital: 'Vulcan'
  },
  {
    id: 'nomandLand',
    name: 'Information Forbidden',
    position: { top: '35%', left: '35%' },
    icon: 'fas fa-ban',
    color: 'bg-stone-200',
    description: 'Information Forbidden',
    population: 'Information Forbidden',
    capital: 'Information Forbidden'
  }
];

/** ====== SABİTLER ====== **/
const BASE_W = 1200;           // harita görselinin doğal boyutu (px)
const BASE_H = 800;
const MIN_SCALE = 0.75;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 1.15;        // zoom çarpanı
const PAN_SLACK = 100;         // kenarlarda serbestlik (px)

const MapSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // translate
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mapRef = useRef<HTMLDivElement | null>(null);     // container
  const contentRef = useRef<HTMLDivElement | null>(null); // içeriği taşıyan div

  // Pinch-to-zoom takibi
  const [isPinching, setIsPinching] = useState(false);
  const [pinchDistance, setPinchDistance] = useState(0);

  /** ====== SINIR HESABI & KISITLAMA ====== **/
  const getBounds = useCallback((s: number) => {
    const cw = mapRef.current?.clientWidth ?? 0;
    const ch = mapRef.current?.clientHeight ?? 0;
    const w = BASE_W * s;
    const h = BASE_H * s;

    const centerX = (cw - w) / 2;
    const centerY = (ch - h) / 2;

    const minX = w > cw ? (cw - w) - PAN_SLACK : centerX - PAN_SLACK;
    const maxX = w > cw ? 0 + PAN_SLACK       : centerX + PAN_SLACK;
    const minY = h > ch ? (ch - h) - PAN_SLACK : centerY - PAN_SLACK;
    const maxY = h > ch ? 0 + PAN_SLACK        : centerY + PAN_SLACK;

    return { minX, maxX, minY, maxY, centerX, centerY, cw, ch, w, h };
  }, []);

  const clampPos = useCallback((pos: {x:number; y:number}, s = scale) => {
    const { minX, maxX, minY, maxY } = getBounds(s);
    return {
      x: Math.min(maxX, Math.max(minX, pos.x)),
      y: Math.min(maxY, Math.max(minY, pos.y)),
    };
  }, [getBounds, scale]);

  const centerAtScale = useCallback((s: number) => {
    const { centerX, centerY } = getBounds(s);
    return { x: centerX, y: centerY };
  }, [getBounds]);

  /** ====== MONTAJ ====== **/
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // SADECE İLK YÜKLEMEDE ortala (scale dependency YOK)
  useEffect(() => {
    if (!isMounted) return;
    setPosition(centerAtScale(1));
  }, [isMounted, centerAtScale]);

  // Resize olursa sadece mevcut konumu clamp et (asla yeniden ortalama)
  useEffect(() => {
    if (!isMounted) return;
    const ro = new ResizeObserver(() => {
      setPosition(p => clampPos(p));
    });
    const node = mapRef.current;
    if (node) ro.observe(node);
    return () => ro.disconnect();
  }, [isMounted, clampPos]);

  /** ====== ZOOM HESABI (imleç noktasına göre) ====== **/
  const applyZoomAtPoint = useCallback((containerX: number, containerY: number, nextScale: number) => {
    const newS = Math.max(MIN_SCALE, Math.min(MAX_SCALE, nextScale));
    const ratio = newS / scale;

    // (containerX - newX) = ratio * (containerX - oldX)
    const newX = containerX - (containerX - position.x) * ratio;
    const newY = containerY - (containerY - position.y) * ratio;

    const clamped = clampPos({ x: newX, y: newY }, newS);
    setScale(newS);
    setPosition(clamped);
  }, [scale, position.x, position.y, clampPos]);

  /** ====== KONTROLLER ====== **/
  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
    setIsDialogOpen(true);
  };

  const handleZoomIn = () => {
    const { cw, ch } = getBounds(scale);
    applyZoomAtPoint(cw / 2, ch / 2, scale * ZOOM_STEP);
  };
  const handleZoomOut = () => {
    const { cw, ch } = getBounds(scale);
    applyZoomAtPoint(cw / 2, ch / 2, scale / ZOOM_STEP);
  };
  const resetView = () => {
    const s = 1;
    setScale(s);
    setPosition(centerAtScale(s));
  };

  /** ====== MOUSE PAN ====== **/
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Bölge pin’ine tıklamayı görmezden gel
    if ((e.target as HTMLElement).closest('.region')) return;
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.preventDefault();
  };
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!dragging) return;
    const next = { x: e.clientX - startPos.x, y: e.clientY - startPos.y };
    setPosition(clampPos(next));
  };
  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);

  /** ====== WHEEL ZOOM (sayfa kaymasın) ====== **/
  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // body scroll’u durdur
      const rect = node.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const dir = e.deltaY < 0 ? 1 : -1;
      const next = dir > 0 ? scale * ZOOM_STEP : scale / ZOOM_STEP;
      applyZoomAtPoint(cx, cy, next);
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [scale, applyZoomAtPoint]);

  /** ====== DOUBLE-CLICK ZOOM ====== **/
  const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const next = e.shiftKey ? scale / ZOOM_STEP : scale * ZOOM_STEP;
    applyZoomAtPoint(cx, cy, next);
  };

    /** ====== TOUCH: PAN + PINCH ZOOM ====== **/
  // React ve DOM dokunuş tiplerini birlikte destekle
  type AnyTouch = Touch | React.Touch;              // <- ctype DEĞİL, type
  type AnyTouchList = TouchList | React.TouchList;

  const getDistance = (touches: AnyTouchList) => {
    const t0 = (touches as any)[0] as AnyTouch | undefined;
    const t1 = (touches as any)[1] as AnyTouch | undefined;
    if (!t0 || !t1) return 0;
    const dx = t0.clientX - t1.clientX;
    const dy = t0.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  };

  const getMidpoint = (touches: AnyTouchList, rect: DOMRect) => {
    const t0 = (touches as any)[0] as AnyTouch | undefined;
    const t1 = (touches as any)[1] as AnyTouch | undefined;
    if (!t0 || !t1) return { x: 0, y: 0 };
    const x = (t0.clientX + t1.clientX) / 2 - rect.left;
    const y = (t0.clientY + t1.clientY) / 2 - rect.top;
    return { x, y };
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length === 1) {
      setDragging(true);
      setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    } else if (e.touches.length === 2) {
      setIsPinching(true);
      setPinchDistance(getDistance(e.touches));
    }
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (dragging && e.touches.length === 1) {
      const next = { x: e.touches[0].clientX - startPos.x, y: e.touches[0].clientY - startPos.y };
      setPosition(clampPos(next));
    } else if (isPinching && e.touches.length === 2 && mapRef.current) {
      const currentDistance = getDistance(e.touches);
      if (pinchDistance > 0) {
        const ratio = currentDistance / pinchDistance;
        const rect = mapRef.current.getBoundingClientRect();
        const mid = getMidpoint(e.touches, rect);
        applyZoomAtPoint(mid.x, mid.y, scale * ratio);
        setPinchDistance(currentDistance);
      }
    }
    e.preventDefault();
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length < 2) setIsPinching(false);
    if (e.touches.length === 0) setDragging(false);
  };

  /** ====== KLAVYE KISAYOLLARI ====== **/
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const step = 60;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'].includes(e.key)) {
        e.preventDefault();
        const delta =
          e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' ? { x: step, y: 0 } :
          e.key === 'ArrowRight'|| e.key === 'd' || e.key === 'D' ? { x: -step, y: 0 } :
          e.key === 'ArrowUp'  || e.key === 'w' || e.key === 'W' ? { x: 0, y: step } :
          { x: 0, y: -step };
        setPosition(p => clampPos({ x: p.x + delta.x, y: p.y + delta.y }));
      } else if (e.key === '+' || e.key === '=') {
        const { cw, ch } = getBounds(scale);
        applyZoomAtPoint(cw/2, ch/2, scale * ZOOM_STEP);
      } else if (e.key === '-') {
        const { cw, ch } = getBounds(scale);
        applyZoomAtPoint(cw/2, ch/2, scale / ZOOM_STEP);
      } else if (e.key === '0') {
        resetView();
      } else if (e.key.toLowerCase() === 'l') {
        setShowLegend(v => !v);
      }
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [clampPos, getBounds, scale, applyZoomAtPoint]);

  /** ====== UI ====== **/
  if (!isMounted) return <div className="container mx-auto py-8" />;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <i className="fas fa-map text-primary" />
            World Map
          </h2>
          <p className="text-muted-foreground mt-2">
            Drag to pan • Wheel/Pinch to zoom • Double-click to zoom • 0 to reset
          </p>
        </div>
      </div>

      <div className="relative border rounded-lg overflow-hidden bg-sky-900/20 h-[600px]">
        {/* Kontroller */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <button onClick={handleZoomIn}  className="w-10 h-10 flex items-center justify-center bg-background/90 rounded-full shadow-lg hover:bg-accent transition-colors text-foreground" aria-label="Zoom in">
            <ZoomIn size={18} />
          </button>
          <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center bg-background/90 rounded-full shadow-lg hover:bg-accent transition-colors text-foreground" aria-label="Zoom out">
            <ZoomOut size={18} />
          </button>
          <button onClick={resetView} className="w-10 h-10 flex items-center justify-center bg-background/90 rounded-full shadow-lg hover:bg-accent transition-colors text-foreground" aria-label="Reset view">
            <Home size={18} />
          </button>
          <button onClick={() => setShowLegend(v => !v)} className="w-10 h-10 flex items-center justify-center bg-background/90 rounded-full shadow-lg hover:bg-accent transition-colors text-foreground" aria-label="Toggle legend">
            <Info size={18} />
          </button>
        </div>

        {/* Legend */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute left-4 top-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg z-30 shadow-lg"
            >
              <div className="text-sm font-semibold mb-3">Map Legend</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-sky-600 rounded" /><span>Sea</span></div>
                <div className="flex items-center gap-2"><div className="w-8 border-t border-dashed border-white/70" /><span>Sea Route</span></div>
                <div className="flex items-center gap-2"><div className="w-8 border-t border-white/70" /><span>Land Border</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <div
          ref={mapRef}
          className="map-container relative w-full h-full overflow-hidden select-none overscroll-none"
          style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={onDoubleClick}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={contentRef}
            className="absolute transition-transform duration-200 ease-out will-change-transform"
            style={{
              width: BASE_W,
              height: BASE_H,
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: '0 0',
            }}
          >
            {/* Harita */}
            <Image
              src="/images/world-map.png"
              alt="Ironforce World Map"
              width={BASE_W}
              height={BASE_H}
              quality={100}
              className="block w-[1200px] h-[800px] object-contain"
              priority
            />

            {/* Pinler */}
            {regionData.map((region) => (
              <motion.div
                key={region.id}
                className="absolute region"
                style={{ top: region.position.top, left: region.position.left }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleRegionClick(region)}
              >
                <div className={`w-12 h-12 rounded-full ${region.color} flex items-center justify-center shadow-lg cursor-pointer border-2 border-white/80 hover:border-white transition-colors`}>
                  <i className={`${region.icon} text-lg text-slate-800`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bölge Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedRegion && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${selectedRegion.color} flex items-center justify-center shadow-md`}>
                    <i className={`${selectedRegion.icon} text-2xl text-slate-800`} />
                  </div>
                  <DialogTitle className="text-2xl">{selectedRegion.name}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="mt-4 space-y-3">
                <p>{selectedRegion.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Population</p>
                    <p className="font-medium">{selectedRegion.population}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Capital</p>
                    <p className="font-medium">{selectedRegion.capital}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapSection;
