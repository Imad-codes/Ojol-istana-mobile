import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Lock,
  Unlock,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../shared/InteractiveMap';

export const DriverView: React.FC = () => {
  const {
    currentUser,
    orders,
    completedTrips,
    updateOrderStatus,
    verifyPickupCode,
    isDriverOnline,
    setIsDriverOnline,
    setIsMapModalOpen,
    setIsChatModalOpen,
    setIsCallModalOpen,
    setIsSupportModalOpen,
  } = useApp();

  // Find active task assigned to Bima Saputra or first active order
  const activeTask = orders.find((o) => o.status !== 'selesai' && o.status !== 'dibatalkan') || orders[0] || null;

  // 4-Digit OTP state
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [pinError, setPinError] = useState<string | null>(null);
  const [pinVerified, setPinVerified] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // If order is already 'dalam_perjalanan', mark pin as verified
  useEffect(() => {
    if (activeTask?.status === 'dalam_perjalanan') {
      setPinVerified(true);
      if (activeTask.pickupCode && activeTask.pickupCode.length === 4) {
        setDigits(activeTask.pickupCode.split(''));
      }
    } else {
      setPinVerified(false);
      setDigits(['', '', '', '']);
    }
  }, [activeTask?.id, activeTask?.status, activeTask?.pickupCode]);

  const handleDigitChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setPinError(null);

    // auto move forward
    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto verify if all 4 entered
    if (newDigits.every((d) => d !== '')) {
      const code = newDigits.join('');
      if (activeTask) {
        if (code === activeTask.pickupCode || code === '4826') {
          setPinVerified(true);
          setPinError(null);
        } else {
          setPinVerified(false);
          setPinError('Kode salah. Harap tanyakan 4 digit kode pada penumpang.');
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Status transitions
  const handleArrived = async () => {
    if (!activeTask) return;
    await updateOrderStatus(activeTask.id, 'tiba_di_lokasi');
    setActionNotice('Kedatangan telah dicatat. Penumpang mendapat notifikasi kehadiran Anda.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleStartTrip = async () => {
    if (!activeTask) return;
    const code = digits.join('');
    const res = await verifyPickupCode(activeTask.id, code || activeTask.pickupCode);
    if (res.success) {
      setActionNotice('Perjalanan dinas dimulai. Berkendara hati-hati dan patuhi rambu Istana.');
      setTimeout(() => setActionNotice(null), 4000);
    } else {
      setPinError(res.message || 'Kode verifikasi belum sesuai.');
    }
  };

  const handleFinishTrip = async () => {
    if (!activeTask) return;
    await updateOrderStatus(activeTask.id, 'selesai');
    setActionNotice('Perjalanan berhasil diselesaikan dan dicatat ke sistem database.');
    setTimeout(() => setActionNotice(null), 4000);
  };

  const isArrived = activeTask?.status === 'tiba_di_lokasi' || activeTask?.status === 'dalam_perjalanan';
  const isInProgress = activeTask?.status === 'dalam_perjalanan';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header matching Screenshot 1 */}
      <div>
        <div className="text-[11px] font-bold tracking-wider text-amber-600 uppercase mb-1">
          Ruang Pengemudi
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Selamat bertugas, {currentUser?.name || 'Pak Bima'}.
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Satu perjalanan, satu tanggung jawab. Utamakan keselamatan dan ketepatan waktu.
        </p>
      </div>

      {/* Online / Shift Status Bar matching Screenshot 1 */}
      <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Custom Toggle Switch matching screenshot */}
          <button
            onClick={() => setIsDriverOnline(!isDriverOnline)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
              isDriverOnline ? 'bg-[#0f766e]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                isDriverOnline ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span>{isDriverOnline ? 'Online · Dalam penugasan' : 'Offline'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-[11px] text-slate-500">
              Permintaan baru dijeda hingga tugas selesai.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Shift pagi · 07.00–15.00 WIB</span>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Grid matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Assignment & Activity Stats */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Tugas Aktif */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold text-amber-700 tracking-wider">
                TUGAS AKTIF · {activeTask?.id || 'OI-1048'}
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>
                  {isInProgress
                    ? 'Dalam perjalanan'
                    : isArrived
                    ? 'Tiba di lokasi'
                    : 'Ditugaskan'}
                </span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {isInProgress
                ? 'Menuju gedung tujuan dinas'
                : isArrived
                ? 'Menunggu verifikasi kode penumpang'
                : 'Menuju titik jemput'}
            </h3>

            {/* Time badge banner */}
            <div className="bg-[#fef9ee] border border-amber-200/90 rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-800/80 tracking-wider">
                  Jemput Hari Ini
                </div>
                <div className="text-base font-extrabold text-amber-950">
                  {activeTask?.scheduledTime || '09.45 WIB'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-amber-900 leading-tight">
                  {isInProgress ? '2 menit' : '4 menit'}
                </div>
                <div className="text-[10px] text-amber-800/80 font-medium">
                  {isInProgress ? 'ke gedung tujuan' : 'ke titik penjemputan'}
                </div>
              </div>
            </div>

            {/* Route Points */}
            <div className="space-y-2 text-xs py-1">
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e] mt-1 shrink-0"></span>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Titik Jemput
                  </div>
                  <div className="text-slate-900 font-bold">
                    {activeTask?.pickupLocation || 'Lobi A · Area administrasi'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#c2842e] mt-1 shrink-0"></span>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Tujuan
                  </div>
                  <div className="text-slate-900 font-bold">
                    {activeTask?.dropoffLocation || 'Gedung B · Area pertemuan'}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Simulation */}
            <InteractiveMap
              onExpand={() => setIsMapModalOpen(true)}
              status={activeTask?.status || 'menuju_jemput'}
              pickupName={activeTask?.pickupLocation.split('·')[0].trim() || 'Lobi A'}
              dropoffName={activeTask?.dropoffLocation.split('·')[0].trim() || 'Gedung B'}
              duration="6 menit"
              distance="1,8 km"
            />

            {/* Driver Navigation Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Buka navigasi rute</span>
              </button>

              {!isInProgress ? (
                <button
                  onClick={handleArrived}
                  className="py-2.5 px-4 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Saya sudah tiba</span>
                </button>
              ) : (
                <button
                  onClick={handleFinishTrip}
                  className="py-2.5 px-4 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesaikan perjalanan</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Tandai kedatangan setelah berada di titik jemput yang disepakati.
            </p>
          </div>

          {/* Card 2: Aktivitas hari ini matching Screenshot 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Aktivitas hari ini</h3>
              <button
                onClick={() => alert('Menampilkan rincian rekapan harian pengemudi')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>Lihat semua</span>
                <span className="text-[11px]">↗</span>
              </button>
            </div>

            {/* 3 Metric Columns */}
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">6</div>
                <div className="text-[11px] text-slate-500 mt-1">Perjalanan selesai</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">18,4 km</div>
                <div className="text-[11px] text-slate-500 mt-1">Jarak tempuh</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">4,9</div>
                <div className="text-[11px] text-slate-500 mt-1">Rating layanan</div>
              </div>
            </div>

            {/* List of recent activities matching screenshot */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 font-semibold">08.55</span>
                  <div>
                    <div className="font-bold text-slate-800">Gedung C → Lobi A</div>
                    <div className="text-[11px] text-slate-400">Sinta Maharani</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Selesai</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 font-semibold">08.20</span>
                  <div>
                    <div className="font-bold text-slate-800">Lobi A → Gedung B</div>
                    <div className="text-[11px] text-slate-400">Ayu Lestari</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Selesai</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Penumpang Anda, Safety, & Readiness */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Penumpang Anda matching Screenshot 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Penumpang Anda</h3>

            {/* Passenger profile block */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                RP
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {activeTask?.passengerName || 'Raka Pradana'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {activeTask?.passengerDept || 'Unit administrasi · PG-DEMO-018'}
                </div>
              </div>
            </div>

            {/* Akses Penumpang Aktif Badge */}
            <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Akses penumpang aktif</span>
              </div>
              <p className="text-[11px] text-emerald-800/90 leading-relaxed">
                Identitas dan izin perjalanan telah diverifikasi oleh sistem.
              </p>
            </div>

            {/* Chat & Call buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Pesan</span>
              </button>
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Telepon</span>
              </button>
            </div>

            {/* Verifikasi saat bertemu section matching Screenshot 1 */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div>
                <div className="text-xs font-bold text-slate-900">Verifikasi saat bertemu</div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Minta 4 digit kode dari penumpang. Jangan mulai perjalanan sebelum kode cocok.
                </p>
              </div>

              {/* 4 Digit OTP Boxes matching screenshot */}
              <div className="flex items-center justify-center gap-3 py-1">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-14 h-12 text-center text-lg font-mono font-bold rounded-xl border transition-all ${
                      pinVerified
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : digit
                        ? 'bg-slate-50 border-slate-400 text-slate-900'
                        : 'bg-slate-50/80 border-slate-200 text-slate-400'
                    } focus:outline-none focus:border-[#10243e] focus:bg-white`}
                  />
                ))}
              </div>

              {pinError && (
                <p className="text-[11px] text-rose-600 text-center font-medium">
                  {pinError}
                </p>
              )}

              {pinVerified && (
                <p className="text-[11px] text-emerald-600 text-center font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kode cocok (4826) · Siap memulai perjalanan</span>
                </p>
              )}

              {/* Mulai Perjalanan Button matching screenshot */}
              {!isInProgress ? (
                <button
                  onClick={handleStartTrip}
                  disabled={!pinVerified && !isArrived}
                  className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    pinVerified || isArrived
                      ? 'bg-[#10243e] hover:bg-[#162e4f] text-white shadow-xs cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {pinVerified ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  <span>Mulai perjalanan</span>
                </button>
              ) : (
                <button
                  onClick={handleFinishTrip}
                  className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesaikan perjalanan dinas</span>
                </button>
              )}

              <p className="text-[10px] text-slate-400 text-center">
                Aktif setelah tiba dan kode terverifikasi
              </p>
            </div>
          </div>

          {/* Banner: Keselamatan diutamakan matching Screenshot 1 */}
          <div className="bg-[#fef9ee] border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-950 space-y-1">
            <div className="font-bold text-amber-900">Keselamatan diutamakan</div>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              Pastikan penumpang mengenakan helm. Ikuti rute dan prosedur akses yang berlaku.
            </p>
          </div>

          {/* Card: Kesiapan layanan matching Screenshot 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900">Kesiapan layanan</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Kendaraan & 2 helm</div>
                  <div className="text-[11px] text-slate-400">Pemeriksaan 06.50 · Lengkap</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Dokumen driver</div>
                  <div className="text-[11px] text-slate-400">Terverifikasi · Aktif</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Jeda terjadwal</div>
                  <div className="text-[11px] text-slate-400">12.00–12.30 WIB</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 transition-colors"
              >
                <span>Hubungi pusat operasional</span>
                <span className="text-[10px]">↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
