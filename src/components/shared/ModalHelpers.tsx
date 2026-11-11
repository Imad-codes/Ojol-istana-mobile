import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CallModal: React.FC = () => {
  const { isCallModalOpen, setIsCallModalOpen, currentUser, orders } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isCallModalOpen) {
      setSeconds(0);
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isCallModalOpen]);

  if (!isCallModalOpen) return null;

  const isDriver = currentUser?.role === 'driver';
  const partnerName = isDriver ? 'Raka Pradana' : 'Bima Saputra';
  const partnerRole = isDriver ? 'Unit Administrasi PG-DEMO-018' : 'Driver Terverifikasi DEMO 024';

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#10243e] rounded-3xl shadow-2xl border border-slate-700/80 w-full max-w-sm overflow-hidden text-center text-white p-6 relative">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-medium mb-6">
          <Shield className="w-3.5 h-3.5" />
          <span>Interkom Kedinasan Terenkripsi</span>
        </div>

        {/* Avatar with animated waves */}
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full bg-[#1b3a61] border-2 border-amber-400/80 flex items-center justify-center text-2xl font-bold text-white shadow-xl mx-auto">
            {partnerName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping pointer-events-none"></div>
        </div>

        <h3 className="text-lg font-bold text-white">{partnerName}</h3>
        <p className="text-xs text-slate-300 mt-1">{partnerRole}</p>
        <div className="font-mono text-sm text-emerald-400 font-semibold mt-3">
          {formatTime(seconds)}
        </div>

        {/* Audio Wave Bars Simulation */}
        <div className="flex items-center justify-center gap-1.5 h-8 my-6">
          {[40, 75, 55, 90, 60, 30, 80, 50, 95, 45, 70].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="w-1 bg-amber-400/80 rounded-full transition-all duration-300 animate-pulse"
            />
          ))}
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
            title={isMuted ? 'Buka Mikrofon' : 'Bisukan'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsCallModalOpen(false)}
            className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title="Akhiri Panggilan"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button
            className="w-12 h-12 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center transition-colors"
            title="Pengeras Suara"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SupportModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen } = useApp();
  const [operatorMsg, setOperatorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isSupportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        <div className="px-5 py-4 bg-[#10243e] text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Pusat Bantuan & Operator Istana</h3>
            <p className="text-[11px] text-slate-300">
              Saluran siaga operasional mobilitas dinas internal
            </p>
          </div>
          <button
            onClick={() => {
              setIsSupportModalOpen(false);
              setSubmitted(false);
            }}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-5 text-xs text-slate-600 space-y-4">
          {submitted ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-center space-y-2">
              <p className="font-semibold text-sm">Laporan Terkirim ke Operator Siaga</p>
              <p className="text-xs">
                Operator Pusat Operasional (Nadia Putri) telah menerima tiket kendala Anda dan sedang melakukan koordinasi telemetri.
              </p>
              <button
                onClick={() => {
                  setIsSupportModalOpen(false);
                  setSubmitted(false);
                }}
                className="mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold"
              >
                Kembali ke Aplikasi
              </button>
            </div>
          ) : (
            <>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Kontak Operator Darurat</div>
                <div className="text-slate-500">Ekstensi Dalam: 021-384-8800 (Ext. 204)</div>
                <div className="text-slate-500">Frekuensi HT Pamdal: CH-08 Operasional</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kirim Pesan Kendala / Permintaan Bantuan Cepat
                </label>
                <textarea
                  value={operatorMsg}
                  onChange={(e) => setOperatorMsg(e.target.value)}
                  placeholder="Contoh: Perlu penyesuaian titik jemput karena ada pengamanan VIP di Lobi Utama..."
                  rows={4}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#10243e] text-xs text-slate-800"
                />
              </div>

              <button
                onClick={() => {
                  if (operatorMsg.trim()) setSubmitted(true);
                }}
                disabled={!operatorMsg.trim()}
                className="w-full py-2.5 bg-[#10243e] hover:bg-[#152e4d] disabled:opacity-50 text-white rounded-xl font-semibold transition-colors"
              >
                Kirim ke Pusat Operasional
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, orders, completedTrips, stats } = useApp();

  if (!isReportModalOpen) return null;

  const handleDownloadCsv = () => {
    const headers = 'ID,Waktu,Rute,Penumpang,Driver,Status,Tanggal\n';
    const rows = completedTrips
      .map(
        (t) =>
          `"${t.id}","${t.time}","${t.route}","${t.passenger}","${t.driver}","${t.status}","${t.date}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `laporan-operasional-istana-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsReportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 bg-[#10243e] text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Unduh Laporan Operasional Mobilitas</h3>
            <p className="text-xs text-slate-300">
              Rekapitulasi perjalanan dinas roda dua lingkungan Istana
            </p>
          </div>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-600">
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400">Total Perjalanan Hari Ini</span>
              <p className="text-lg font-bold text-slate-900">{stats.totalTripsToday} perjalanan</p>
            </div>
            <div>
              <span className="text-slate-400">Selesai Berhasil</span>
              <p className="text-lg font-bold text-emerald-600">{stats.completedTripsToday} trip</p>
            </div>
            <div>
              <span className="text-slate-400">Rata-rata Waktu Jemput</span>
              <p className="text-lg font-bold text-slate-900">{stats.avgPickupMinutes} menit</p>
            </div>
            <div>
              <span className="text-slate-400">Pengguna Terotorisasi</span>
              <p className="text-lg font-bold text-slate-900">{stats.authorizedUsers} personil</p>
            </div>
          </div>

          <p className="leading-relaxed">
            Laporan mencakup log lengkap riwayat penjemputan, verifikasi PIN 4 digit, rute antar gedung, waktu tempuh, dan catatan kelayakan armada.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleDownloadCsv}
              className="flex-1 py-2.5 bg-[#10243e] hover:bg-[#152e4d] text-white rounded-xl font-semibold shadow-xs transition-colors"
            >
              Unduh Format CSV / Excel
            </button>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
