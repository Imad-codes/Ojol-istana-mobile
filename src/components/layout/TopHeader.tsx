import React, { useState } from 'react';
import { Bell, ChevronDown, Check, LogOut, RefreshCw, UserCheck, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopHeader: React.FC = () => {
  const {
    currentUser,
    switchRole,
    setIsLoginModalOpen,
    orders,
    approvals,
    resetToDemo,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Active notifications count
  const pendingApprovals = approvals.filter((a) => a.status === 'menunggu').length;
  const activeOrdersCount = orders.filter((o) => o.status !== 'selesai' && o.status !== 'dibatalkan').length;

  // Breadcrumbs text based on role
  const getBreadcrumbs = () => {
    if (!currentUser) return 'Tamu / Masuk';
    if (currentUser.role === 'driver') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Pengemudi</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Beranda</span>
        </div>
      );
    }
    if (currentUser.role === 'admin') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Admin</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Ringkasan</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span>Pengguna</span>
        <span>/</span>
        <span className="font-semibold text-slate-800">Beranda</span>
      </div>
    );
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left breadcrumb */}
      <div>{getBreadcrumbs()}</div>

      {/* Right controls */}
      <div className="flex items-center gap-5">
        {/* Date indicator matching screenshot */}
        <div className="text-xs font-medium text-slate-500 hidden sm:block">
          Kamis, 22 Oktober 2026
        </div>

        {/* Quick Role Switcher for instant tester demo */}
        <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => switchRole('pengguna')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              currentUser?.role === 'pengguna'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Pengguna
          </button>
          <button
            onClick={() => switchRole('driver')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              currentUser?.role === 'driver'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Driver
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              currentUser?.role === 'admin'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors relative"
            aria-label="Pemberitahuan"
          >
            <Bell className="w-4 h-4" />
            {(activeOrdersCount > 0 || pendingApprovals > 0) && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100 font-semibold text-slate-800 flex justify-between items-center">
                <span>Notifikasi Real-time</span>
                <span className="text-[10px] text-emerald-600 font-normal">Sinkron otomatis</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="font-semibold text-slate-800">Pesanan OI-1048 aktif</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Driver Bima Saputra sedang menuju ke titik penjemputan Lobi A.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Baru saja</span>
                </div>
                {pendingApprovals > 0 && (
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="font-semibold text-amber-700">
                      {pendingApprovals} permohonan akses menunggu persetujuan
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Tinjau dokumen driver dan otorisasi pengguna dinas baru.
                    </p>
                  </div>
                )}
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <p className="font-semibold text-slate-800">Sistem Operasional Istana</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Seluruh armada terkoneksi pada frekuensi telemetri internal.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill matching screenshot */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
              {currentUser?.initials || 'TS'}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {currentUser?.name || 'Tamu'}
              </div>
              <div className="text-[11px] text-slate-400 font-normal leading-tight">
                {currentUser?.statusLabel || 'Pengguna'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs"
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="px-4 py-2.5 border-b border-slate-100">
                <div className="font-semibold text-slate-800">{currentUser?.name}</div>
                <div className="text-slate-500 text-[11px]">{currentUser?.department}</div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{currentUser?.idKedinasan} · Terverifikasi</span>
                </div>
              </div>

              <div className="py-1">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                  Ganti Tampilan / Akun
                </div>
                <button
                  onClick={() => {
                    switchRole('pengguna');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-slate-50 text-left flex items-center justify-between text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>Masuk sebagai Raka (Pengguna)</span>
                  </span>
                  {currentUser?.role === 'pengguna' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('driver');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-slate-50 text-left flex items-center justify-between text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-slate-500" />
                    <span>Masuk sebagai Bima (Driver)</span>
                  </span>
                  {currentUser?.role === 'driver' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-slate-50 text-left flex items-center justify-between text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-slate-500" />
                    <span>Masuk sebagai Nadia (Admin)</span>
                  </span>
                  {currentUser?.role === 'admin' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              </div>

              <div className="border-t border-slate-100 py-1">
                <button
                  onClick={() => {
                    resetToDemo();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-slate-50 text-left flex items-center gap-2 text-slate-600"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kembalikan Data Demo</span>
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full px-4 py-2 hover:bg-rose-50 text-left flex items-center gap-2 text-rose-600"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Login / Registrasi Akses Lain</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
