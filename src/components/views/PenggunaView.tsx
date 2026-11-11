import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../shared/InteractiveMap';

const LOCATIONS = [
  'Lobi A · Area administrasi',
  'Gedung B · Area pertemuan',
  'Gedung C · Area administrasi',
  'Wisma Negara · Paviliun Barat',
  'Gedung Utama · Sayap Timur',
  'Pos Pamdal Gerbang Utama',
];

export const PenggunaView: React.FC = () => {
  const {
    currentUser,
    orders,
    completedTrips,
    createOrder,
    setIsMapModalOpen,
    setIsChatModalOpen,
    setIsCallModalOpen,
    setIsSupportModalOpen,
  } = useApp();

  // Booking form state
  const [scheduledType, setScheduledType] = useState<'sekarang' | 'jadwalkan'>('jadwalkan');
  const [pickup, setPickup] = useState('Gedung B · Area pertemuan');
  const [dropoff, setDropoff] = useState('Gedung C · Area administrasi');
  const [scheduleTime, setScheduleTime] = useState('Hari ini, 22 Okt 2026 · 13.00 WIB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Active trip for user
  const activeTrip = orders[0] || null;

  const handleBook = async () => {
    setIsSubmitting(true);
    await createOrder({
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      scheduledType,
      scheduledTime: scheduledType === 'sekarang' ? '09.45 WIB' : scheduleTime,
      notes: 'Kedinasan mendesak',
    });
    setIsSubmitting(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title & Status Header matching Screenshot 2 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-amber-600 uppercase mb-1">
            Mobilitas Kedinasan
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Selamat pagi, {currentUser?.name?.startsWith('Pak') || currentUser?.name?.startsWith('Ibu') ? currentUser.name : `Pak ${currentUser?.name?.split(' ')[0] || 'Raka'}`}.
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Perjalanan lebih ringkas, aktivitas tetap lancar.
          </p>
        </div>

        {/* Akses terotorisasi status badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800 shadow-2xs self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Akses terotorisasi</span>
        </div>
      </div>

      {/* Main Grid: 2 columns (Left: Booking & Map & History | Right: Active Trip & Next Schedule) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (span 7 or 8) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Pesan perjalanan */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">Pesan perjalanan</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Transportasi untuk keperluan kedinasan Anda.
              </p>
            </div>

            {bookingSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Perjalanan kedinasan baru berhasil didaftarkan ke sistem real-time! Driver sedang ditugaskan.
                </span>
              </div>
            )}

            {/* Segmented Tab: Sekarang / Jadwalkan */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setScheduledType('sekarang')}
                className={`py-2 rounded-lg transition-all ${
                  scheduledType === 'sekarang'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sekarang
              </button>
              <button
                type="button"
                onClick={() => setScheduledType('jadwalkan')}
                className={`py-2 rounded-lg transition-all ${
                  scheduledType === 'jadwalkan'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Jadwalkan
              </button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Titik Jemput */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Titik jemput
                  </label>
                  <div className="relative">
                    <select
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full text-xs pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:border-[#10243e] focus:bg-white text-slate-800 font-medium"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Tujuan */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Tujuan
                  </label>
                  <div className="relative">
                    <select
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full text-xs pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:border-[#10243e] focus:bg-white text-slate-800 font-medium"
                    >
                      {LOCATIONS.filter((l) => l !== pickup).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Date & Time Picker */}
              {scheduledType === 'jadwalkan' && (
                <div>
                  <div className="relative">
                    <div className="w-full text-xs pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium flex items-center justify-between">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <span>{scheduleTime}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Akses perjalanan Anda aktif</span>
                </div>

                <button
                  type="button"
                  onClick={handleBook}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#10243e] hover:bg-[#162e4f] text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? 'Memproses...'
                      : scheduledType === 'jadwalkan'
                      ? 'Jadwalkan perjalanan'
                      : 'Pesan sekarang'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Rute perjalanan aktif */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900">Rute perjalanan aktif</h3>
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>Perbesar peta</span>
                <span className="text-[11px]">↗</span>
              </button>
            </div>

            <InteractiveMap
              onExpand={() => setIsMapModalOpen(true)}
              status={activeTrip?.status || 'menuju_jemput'}
              pickupName={activeTrip?.pickupLocation.split('·')[0].trim() || 'Lobi A'}
              dropoffName={activeTrip?.dropoffLocation.split('·')[0].trim() || 'Gedung B'}
              duration="6 menit"
              distance="1,8 km"
            />
          </div>

          {/* Card 3: Perjalanan terakhir */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Perjalanan terakhir</h3>
              <button
                onClick={() => alert('Menampilkan seluruh riwayat perjalanan dinas terverifikasi')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>Riwayat</span>
                <span className="text-[11px]">↗</span>
              </button>
            </div>

            <div className="space-y-3">
              {completedTrips.slice(0, 2).map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {trip.route}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {trip.date} · {trip.time} · {trip.driver}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Selesai</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (span 5): Hero Active Trip Card & Next Schedules */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Hero: Perjalanan Aktif (Dark Navy Background) */}
          <div className="bg-[#10243e] rounded-2xl p-5 text-white shadow-lg space-y-5">
            {/* Header: PERJALANAN AKTIF & OI-1048 */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
              <span>Perjalanan Aktif</span>
              <span>{activeTrip?.id || 'OI-1048'}</span>
            </div>

            {/* Big Status & Time */}
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {activeTrip?.status === 'dalam_perjalanan'
                  ? 'Sedang dalam perjalanan ke tujuan'
                  : activeTrip?.status === 'tiba_di_lokasi'
                  ? 'Driver sudah tiba di titik jemput'
                  : 'Driver menuju titik jemput'}
              </h3>
              <div className="text-2xl font-extrabold text-white mt-1">
                4 <span className="text-sm font-normal text-slate-300">menit · tiba {activeTrip?.scheduledTime || '09.45 WIB'}</span>
              </div>
            </div>

            {/* Stepped Progress Bar matching screenshot */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-1.5 rounded-full bg-amber-400"></div>
                <div className={`h-1.5 rounded-full ${activeTrip?.status !== 'menuju_jemput' ? 'bg-amber-400' : 'bg-amber-400/50'}`}></div>
                <div className={`h-1.5 rounded-full ${activeTrip?.status === 'dalam_perjalanan' ? 'bg-amber-400' : 'bg-slate-700'}`}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Driver ditugaskan</span>
                <span>Penjemputan</span>
              </div>
            </div>

            {/* Driver Profile Block (White nested card) */}
            <div className="bg-white rounded-xl p-3.5 text-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                  BS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {activeTrip?.driverName || 'Bima Saputra'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Driver terverifikasi</span>
                    <span>·</span>
                    <span className="text-amber-500 font-semibold">★ 4,9</span>
                  </div>
                </div>
              </div>

              {/* Vehicle info */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                  <svg
                    className="w-4 h-4 stroke-current fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                  >
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="18" r="3" />
                    <path d="M6 15h7l3-6h-5l-2 3" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Honda Vario · Hitam
                  </div>
                  <div className="text-[10px] text-slate-500">
                    DEMO 024 · Helm tersedia
                  </div>
                </div>
              </div>
            </div>

            {/* Route Points */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Titik Jemput
                  </div>
                  <div className="text-white font-medium">
                    {activeTrip?.pickupLocation || 'Lobi A · Area administrasi'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 mt-1 shrink-0"></span>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Tujuan
                  </div>
                  <div className="text-white font-medium">
                    {activeTrip?.dropoffLocation || 'Gedung B · Area pertemuan'}
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup PIN Box (Golden amber card matching screenshot) */}
            <div className="bg-[#fef9ee] border border-amber-200 rounded-xl p-3.5 text-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-amber-900 font-semibold">
                  Kode penjemputan
                </div>
                <div className="text-[10px] text-amber-800/80 mt-0.5 leading-snug max-w-[180px]">
                  Berikan kode hanya kepada driver saat Anda sudah bertemu.
                </div>
              </div>
              <div className="text-2xl font-mono font-bold tracking-widest text-amber-900 bg-white/80 px-3 py-1 rounded-lg border border-amber-300 shadow-2xs">
                {activeTrip?.pickupCode || '4826'}
              </div>
            </div>

            {/* Action Buttons: [ Pesan ] [ Telepon ] */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-[#1b3a61] hover:bg-[#1f4370] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Pesan</span>
              </button>
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Telepon</span>
              </button>
            </div>

            {/* Support link */}
            <div className="text-center pt-1">
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Kendala penjemputan? <span className="underline">Hubungi operator</span>
              </button>
            </div>
          </div>

          {/* Card: Jadwal berikutnya */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Jadwal berikutnya</h3>
            <div className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-800 shadow-2xs">
                  <span className="text-[9px] font-bold uppercase text-slate-400">OKT</span>
                  <span className="text-base font-extrabold leading-none">22</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    14.30 WIB · Hari ini
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Gedung C → Lobi A
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed">
              Driver ditugaskan mendekati waktu jemput.
            </p>
          </div>

          {/* Banner: Aman di setiap perjalanan */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-950 mb-0.5">
                Aman di setiap perjalanan
              </div>
              <div className="text-[11px] text-emerald-800 leading-relaxed">
                Cocokkan identitas driver dan gunakan helm sebelum berangkat.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
