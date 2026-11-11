import React, { useState, useEffect } from 'react';
import { Bike, Compass, Maximize2, MapPin, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

interface InteractiveMapProps {
  onExpand?: () => void;
  status?: string;
  pickupName?: string;
  dropoffName?: string;
  duration?: string;
  distance?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onExpand,
  status = 'menuju_jemput',
  pickupName = 'Lobi A',
  dropoffName = 'Gedung B',
  duration = '6 menit',
  distance = '1,8 km',
}) => {
  // Animated progress for bike along the route path
  const [progress, setProgress] = useState(0.45);

  useEffect(() => {
    // Subtle realistic movement along the path
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 0.85) return 0.25;
        return Number((prev + 0.004).toFixed(3));
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Compute bike marker coordinates on the SVG polyline
  // Path points:
  // P1: (180, 260) -> P2: (180, 190) -> P3: (380, 190) -> P4: (380, 175)
  const getBikePos = (t: number) => {
    // 0 to 0.35: vertical leg from Lobi A (180, 260) to corner (180, 190)
    // 0.35 to 0.90: horizontal leg (180, 190) to (380, 190)
    // 0.90 to 1.0: vertical up to Gedung B (380, 175)
    if (t < 0.35) {
      const subT = t / 0.35;
      return { x: 180, y: 260 - subT * 70 };
    } else if (t < 0.9) {
      const subT = (t - 0.35) / 0.55;
      return { x: 180 + subT * 200, y: 190 };
    } else {
      const subT = (t - 0.9) / 0.1;
      return { x: 380, y: 190 - subT * 15 };
    }
  };

  const bikeCoord = getBikePos(progress);

  return (
    <div className="relative w-full aspect-[16/9] min-h-[220px] max-h-[310px] bg-[#f4f7f4] rounded-xl overflow-hidden border border-slate-200/90 select-none shadow-xs group">
      {/* Top Left Badge: Zona layanan · simulasi */}
      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
        <Compass className="w-3.5 h-3.5 text-slate-500" />
        <span>Zona layanan · simulasi</span>
      </div>

      {/* Top Right: Expand button */}
      {onExpand && (
        <button
          onClick={onExpand}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white backdrop-blur-xs p-1.5 rounded-md border border-slate-200/80 shadow-2xs text-slate-600 hover:text-slate-900 transition-colors"
          title="Perbesar peta"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Interactive Map Layout SVG matching exact reference screenshot */}
      <svg
        viewBox="0 0 540 300"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Soft background grid lines */}
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2ece2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#edf3ed" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Campus building blocks matching screenshot */}
        {/* Block Top Left */}
        <rect x="25" y="45" width="80" height="48" rx="6" fill="#e0e8e0" />

        {/* Block Center Top Left */}
        <rect x="135" y="40" width="70" height="42" rx="6" fill="#e0e8e0" />

        {/* Block Center Top Right */}
        <rect x="235" y="45" width="65" height="35" rx="6" fill="#e0e8e0" />

        {/* Block Right Top */}
        <rect x="340" y="40" width="100" height="58" rx="6" fill="#e0e8e0" />

        {/* Park / Green zone in center */}
        <rect x="230" y="95" width="75" height="30" rx="8" fill="#d9e6d9" />

        {/* Block Bottom Left */}
        <rect x="25" y="145" width="75" height="55" rx="6" fill="#e0e8e0" />

        {/* Block Lobi A (building block behind Point A) */}
        <rect x="130" y="150" width="65" height="48" rx="6" fill="#e0e8e0" />

        {/* Block Center Bottom */}
        <rect x="245" y="150" width="55" height="40" rx="6" fill="#e0e8e0" />

        {/* Block Right Bottom */}
        <rect x="360" y="150" width="75" height="45" rx="6" fill="#e0e8e0" />

        {/* Campus Road Corridor Network */}
        {/* Horizontal main boulevard */}
        <line x1="0" y1="120" x2="540" y2="120" stroke="#f6faf6" strokeWidth="18" />
        {/* Secondary horizontal road */}
        <line x1="0" y1="215" x2="540" y2="215" stroke="#f6faf6" strokeWidth="14" />
        {/* Vertical cross avenues */}
        <line x1="115" y1="0" x2="115" y2="300" stroke="#f6faf6" strokeWidth="14" />
        <line x1="215" y1="0" x2="215" y2="300" stroke="#f6faf6" strokeWidth="14" />
        <line x1="320" y1="0" x2="320" y2="300" stroke="#f6faf6" strokeWidth="14" />

        {/* Active Route Path Line (Deep Teal / Forest Green #0f766e) */}
        {/* Path: Point A (180, 220) -> goes left/up through corridor -> horizontal -> Point B (335, 120) */}
        <path
          d="M 180 230 L 180 185 Q 180 180 185 180 L 335 180 Q 340 180 340 175 L 340 120"
          fill="none"
          stroke="#0f766e"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Point A Marker (Lobi A) */}
        <g transform="translate(180, 230)">
          <circle cx="0" cy="0" r="10" fill="#0f766e" />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            A
          </text>
          <rect x="16" y="-9" width="48" height="18" rx="4" fill="#ffffff" fillOpacity="0.8" />
          <text
            x="20"
            y="4"
            fill="#134e4a"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {pickupName}
          </text>
        </g>

        {/* Point B Marker (Gedung B) */}
        <g transform="translate(340, 120)">
          <circle cx="0" cy="0" r="10" fill="#c2842e" />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            B
          </text>
          <rect x="16" y="-9" width="62" height="18" rx="4" fill="#ffffff" fillOpacity="0.8" />
          <text
            x="20"
            y="4"
            fill="#78350f"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {dropoffName}
          </text>
        </g>

        {/* Moving Bike Marker along the route */}
        <g transform={`translate(${bikeCoord.x}, ${bikeCoord.y})`}>
          {/* Subtle pulse effect */}
          <circle cx="0" cy="0" r="14" fill="#0f766e" fillOpacity="0.15">
            <animate
              attributeName="r"
              values="10;17;10"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="0" cy="0" r="10" fill="white" stroke="#0f766e" strokeWidth="2" />
          {/* Bike icon SVG glyph */}
          <g transform="translate(-6, -6) scale(0.5)">
            <path
              d="M5 19a4 4 0 1 0 8 0 4 4 0 1 0-8 0m10 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0M12 19h4l2-8h-6l-2 4M15 11V7h4"
              fill="none"
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>

      {/* Bottom Left Badge: 6 menit · 1,8 km */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs text-[11px] font-bold text-slate-800">
        {duration} · {distance}
      </div>

      {/* Bottom Right Watermark: Bukan peta operasional */}
      <div className="absolute bottom-3 right-3 z-10 text-[10px] text-slate-400 font-medium select-none pointer-events-none">
        Bukan peta operasional
      </div>
    </div>
  );
};

export const FullMapModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Peta Kawasan Istana & Jalur Mobilitas Kedinasan
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulasi rute penjemputan armada roda dua terdaftar OOI
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.min(1.6, z + 0.2))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg ml-2"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Map Body */}
        <div className="p-6 overflow-auto flex-1 bg-[#edf3ed] relative flex items-center justify-center min-h-[420px]">
          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            className="transition-transform duration-200 w-full max-w-3xl"
          >
            <InteractiveMap status="dalam_perjalanan" />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e]"></span>
              <span>Lobi A (Penjemputan)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c2842e]"></span>
              <span>Gedung B (Tujuan dinas)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zona Kecepatan Rendah (Maks. 20 km/jam)</span>
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">TELEMETRI AKTIF</span>
        </div>
      </div>
    </div>
  );
};
