import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  Calendar,
  ShieldCheck,
  Headphones,
  Settings,
  Users,
  Bike,
  FileCheck2,
  BarChart3,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentUser,
    activeNavTab,
    setActiveNavTab,
    setIsSupportModalOpen,
    setIsLoginModalOpen,
    approvals,
    resetToDemo,
  } = useApp();

  const role = currentUser?.role || 'pengguna';
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'menunggu').length;

  const renderNavItems = () => {
    if (role === 'pengguna') {
      return (
        <>
          <div className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            Ruang Pengguna
          </div>
          <button
            onClick={() => setActiveNavTab('beranda')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'beranda'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-300" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => setActiveNavTab('perjalanan')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'perjalanan'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Navigation className="w-4 h-4 text-slate-300" />
            <span>Perjalanan saya</span>
          </button>
          <button
            onClick={() => setActiveNavTab('jadwal')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'jadwal'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Calendar className="w-4 h-4 text-slate-300" />
            <span>Jadwal</span>
          </button>
          <button
            onClick={() => setActiveNavTab('profil')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'profil'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-300" />
            <span>Profil & akses</span>
          </button>
        </>
      );
    }

    if (role === 'driver') {
      return (
        <>
          <div className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            Ruang Pengemudi
          </div>
          <button
            onClick={() => setActiveNavTab('beranda')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'beranda'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-300" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => setActiveNavTab('tugas')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'tugas'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Navigation className="w-4 h-4 text-slate-300" />
            <span>Tugas perjalanan</span>
          </button>
          <button
            onClick={() => setActiveNavTab('aktivitas')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'aktivitas'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-300" />
            <span>Aktivitas harian</span>
          </button>
          <button
            onClick={() => setActiveNavTab('profil-dokumen')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activeNavTab === 'profil-dokumen'
                ? 'bg-[#1b3a61] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-300" />
            <span>Profil & dokumen</span>
          </button>
        </>
      );
    }

    // Admin role
    return (
      <>
        <div className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
          Pusat Operasional
        </div>
        <button
          onClick={() => setActiveNavTab('ringkasan')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
            activeNavTab === 'ringkasan'
              ? 'bg-[#1b3a61] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-slate-300" />
          <span>Ringkasan</span>
        </button>
        <button
          onClick={() => setActiveNavTab('admin-perjalanan')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
            activeNavTab === 'admin-perjalanan'
              ? 'bg-[#1b3a61] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Navigation className="w-4 h-4 text-slate-300" />
          <span>Perjalanan</span>
        </button>
        <button
          onClick={() => setActiveNavTab('admin-pengguna')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
            activeNavTab === 'admin-pengguna'
              ? 'bg-[#1b3a61] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Users className="w-4 h-4 text-slate-300" />
          <span>Pengguna</span>
        </button>
        <button
          onClick={() => setActiveNavTab('admin-driver')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
            activeNavTab === 'admin-driver'
              ? 'bg-[#1b3a61] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bike className="w-4 h-4 text-slate-300" />
          <span>Driver</span>
        </button>
        <button
          onClick={() => setActiveNavTab('admin-persetujuan')}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
            activeNavTab === 'admin-persetujuan'
              ? 'bg-[#1b3a61] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <FileCheck2 className="w-4 h-4 text-slate-300" />
            <span>Persetujuan</span>
          </div>
          <span className="text-xs bg-[#c2842e]/20 text-[#e9ab4e] border border-[#c2842e]/30 px-1.5 py-0.5 rounded font-mono font-semibold">
            {pendingApprovalsCount < 10 ? `0${pendingApprovalsCount}` : pendingApprovalsCount}
          </span>
        </button>
        <button
          onClick={() => setActiveNavTab('admin-laporan')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
            activeNavTab === 'admin-laporan'
              ? 'bg-[#1b3a61] text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-slate-300" />
          <span>Laporan</span>
        </button>
      </>
    );
  };

  return (
    <aside className="w-64 bg-[#10243e] text-slate-200 flex flex-col justify-between shrink-0 select-none min-h-screen border-r border-slate-800/60">
      <div className="p-4 flex flex-col">
        {/* Brand header matching screenshot */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-700/50 pb-5">
          <div className="w-9 h-9 rounded-xl border border-amber-400/50 bg-[#162e4f] flex items-center justify-center shadow-inner text-amber-300">
            <svg
              className="w-5 h-5 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="18" r="3" />
              <path d="M6 15h7l3-6h-5l-2 3" />
              <path d="M14 9V6h3" />
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-white tracking-tight leading-none">
              Ojek Online
            </h1>
            <p className="text-[13px] font-bold text-slate-200 mt-0.5 tracking-tight">
              Istana
            </p>
          </div>
        </div>

        {/* Dynamic navigation links */}
        <nav className="space-y-1">{renderNavItems()}</nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 space-y-3">
        {/* Help Card */}
        <div className="bg-[#162a45]/90 border border-slate-700/60 rounded-xl p-3.5 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5 text-slate-300">
            <Headphones className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-semibold text-white">Butuh bantuan?</h4>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
            Pusat bantuan tersedia selama jam layanan.
          </p>
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="text-xs font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
          >
            Hubungi operator <span className="text-[10px]">↗</span>
          </button>
        </div>

        {/* Account settings / Reset demo / Logout */}
        <div className="space-y-1 pt-1">
          <button
            onClick={() => setActiveNavTab('profil')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors text-left"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Pengaturan akun</span>
          </button>
          <button
            onClick={resetToDemo}
            title="Kembalikan data pesanan dan status ke kondisi awal sesuai screenshot"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-amber-300 hover:bg-slate-800/40 transition-colors text-left"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
            <span>Reset data demo</span>
          </button>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-slate-800/40 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Ganti akun / Masuk</span>
          </button>
        </div>

        <div className="pt-2 px-1 text-[10px] font-mono tracking-wider text-slate-500 uppercase">
          OOI / KONSEP LAYANAN v1.0
        </div>
      </div>
    </aside>
  );
};
