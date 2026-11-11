import React, { useState } from 'react';
import {
  Download,
  ShieldCheck,
  Navigation,
  Bike,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApprovalRequest } from '../../types';

export const AdminView: React.FC = () => {
  const {
    orders,
    approvals,
    stats,
    trends,
    serviceStatus,
    reviewApproval,
    setIsReportModalOpen,
  } = useApp();

  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'pengguna' | 'driver'>('all');
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Filter pending approvals
  const pendingApprovals = approvals.filter((a) => a.status === 'menunggu');
  const pendingPenggunaCount = pendingApprovals.filter((a) => a.role === 'pengguna').length;
  const pendingDriverCount = pendingApprovals.filter((a) => a.role === 'driver').length;

  const filteredApprovals =
    filterRole === 'all'
      ? pendingApprovals
      : pendingApprovals.filter((a) => a.role === filterRole);

  const handleReviewAction = async (action: 'approve' | 'reject') => {
    if (!selectedApproval) return;
    await reviewApproval(selectedApproval.id, action);
    setIsReviewOpen(false);
    setSelectedApproval(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'menuju_jemput':
        return (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Menuju jemput</span>
          </span>
        );
      case 'dalam_perjalanan':
        return (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Dalam perjalanan</span>
          </span>
        );
      case 'tiba_di_lokasi':
        return (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Tiba di lokasi</span>
          </span>
        );
      case 'menunggu_jemput':
      case 'menunggu_driver':
      default:
        return (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Menunggu jemput</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header matching Screenshot 3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-amber-600 uppercase mb-1">
            Pusat Operasional
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Ringkasan operasional
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pantau mobilitas, kelola akses, dan jaga layanan tetap berjalan.
          </p>
        </div>

        {/* Unduh Laporan Button */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Unduh laporan</span>
        </button>
      </div>

      {/* Status banner matching Screenshot 3 */}
      <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-2.5 text-emerald-900 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Layanan beroperasi normal. Seluruh perjalanan aktif menggunakan pengguna dan driver terverifikasi.
          </span>
        </div>
        <div className="font-semibold text-emerald-950 font-mono text-xs shrink-0">
          06.00–20.00 WIB
        </div>
      </div>

      {/* 4 Metric Cards matching Screenshot 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Perjalanan hari ini */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Perjalanan hari ini</span>
            <Navigation className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {stats.totalTripsToday}
          </div>
          <div className="text-[11px] text-slate-500">
            {stats.completedTripsToday} selesai · {orders.length} berlangsung
          </div>
        </div>

        {/* Card 2: Driver tersedia */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Driver tersedia</span>
            <Bike className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {stats.availableDrivers}
          </div>
          <div className="text-[11px] text-slate-500">
            {stats.totalOnlineDrivers} online dari {stats.totalRegisteredDrivers} driver
          </div>
        </div>

        {/* Card 3: Pengguna berizin */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Pengguna berizin</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {stats.authorizedUsers}
          </div>
          <div className="text-[11px] text-slate-500">
            {stats.pendingAccessRequests} permohonan akses baru
          </div>
        </div>

        {/* Card 4: Waktu jemput rata-rata */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
            <span>Waktu jemput rata-rata</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {stats.avgPickupMinutes} mnt
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            Target layanan ≤ 5 menit
          </div>
        </div>
      </div>

      {/* Main Grid matching Screenshot 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (span 8): Perjalanan aktif Table & Tren perjalanan Chart */}
        <div className="lg:col-span-8 space-y-6">
          {/* Table: Perjalanan aktif */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Perjalanan aktif</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {orders.length} perjalanan berlangsung · Diperbarui {serviceStatus.lastSync}
                </p>
              </div>
              <button
                onClick={() => alert('Menampilkan seluruh data perjalanan')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>Lihat semua</span>
                <span className="text-[11px]">↗</span>
              </button>
            </div>

            {/* Table structure matching screenshot */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/80 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    <th className="py-2.5 px-3 rounded-l-lg">ID / WAKTU</th>
                    <th className="py-2.5 px-3">PENGGUNA / DRIVER</th>
                    <th className="py-2.5 px-3">RUTE</th>
                    <th className="py-2.5 px-3 rounded-r-lg">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => {
                    const pickupShort = order.pickupLocation.split('·')[0].trim();
                    const dropoffShort = order.dropoffLocation.split('·')[0].trim();
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50/60 transition-colors group"
                      >
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{order.id}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {order.scheduledTime}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{order.passengerName}</div>
                          <div className="text-[11px] text-slate-400">
                            {order.driverName || 'Menunggu penugasan'}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-700">
                            {pickupShort} → {dropoffShort}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {getStatusBadge(order.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tren perjalanan Chart matching Screenshot 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900">Tren perjalanan</h3>
              <button
                onClick={() => alert('Menampilkan analitik bulanan')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>7 hari terakhir</span>
                <span className="text-[11px]">↗</span>
              </button>
            </div>

            {/* Bar chart matching exact heights and colors from Screenshot 3 */}
            <div className="h-44 flex items-end justify-between gap-3 px-4 pt-4 border-b border-slate-100">
              {trends.map((item, idx) => {
                // Max count is 42 (100% height = 120px)
                const heightPercent = Math.max(25, (item.count / 42) * 100);
                const isSelected = item.isCurrent || item.day === 'Kam';
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group"
                  >
                    <span className="text-[11px] font-bold text-slate-600 mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.count}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[42px] rounded-t-md transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#10243e] shadow-xs'
                          : 'bg-[#e5ede5] hover:bg-[#d8e5d8]'
                      }`}
                    />
                    <span
                      className={`text-[11px] font-semibold mt-2.5 ${
                        isSelected ? 'text-[#10243e] font-bold' : 'text-slate-500'
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (span 4): Perlu persetujuan & Status layanan */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Perlu persetujuan matching Screenshot 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Perlu persetujuan</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {pendingApprovals.length} permohonan menunggu tinjauan
              </p>
            </div>

            {/* Filter pills matching screenshot */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterRole(filterRole === 'pengguna' ? 'all' : 'pengguna')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  filterRole === 'pengguna'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-[#fef9ee] text-amber-800 border border-amber-200/80 hover:bg-amber-100/70'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{pendingPenggunaCount} pengguna</span>
              </button>

              <button
                onClick={() => setFilterRole(filterRole === 'driver' ? 'all' : 'driver')}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  filterRole === 'driver'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-[#fef9ee] text-amber-800 border border-amber-200/80 hover:bg-amber-100/70'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{pendingDriverCount} driver</span>
              </button>
            </div>

            {/* Approval Items list */}
            <div className="divide-y divide-slate-100 space-y-3 pt-1">
              {filteredApprovals.slice(0, 3).map((item) => {
                const initials = item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2);
                return (
                  <div key={item.id} className="pt-3 first:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {item.role === 'pengguna' ? 'Pengguna' : 'Driver'} · {item.department}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedApproval(item);
                          setIsReviewOpen(true);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs transition-colors"
                      >
                        Tinjau
                      </button>
                    </div>

                    <div className="text-[11px] text-amber-700 flex items-center gap-1.5 pl-10 font-medium">
                      <span>Menunggu verifikasi</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setFilterRole('all')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>Lihat semua permohonan</span>
                <span className="text-[10px]">↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: Status layanan matching Screenshot 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900">Status layanan</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Sistem pemesanan</span>
                <span className="font-semibold text-emerald-700">Normal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Verifikasi akses</span>
                <span className="font-semibold text-emerald-700">Normal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Jam operasional</span>
                <span className="font-semibold text-slate-800 font-mono">06.00–20.00</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-400">Sinkronisasi terakhir {serviceStatus.lastSync}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Review Modal */}
      {isReviewOpen && selectedApproval && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-[#10243e] text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Verifikasi Permohonan Akses Dinas</h3>
                <p className="text-xs text-slate-300">
                  Otorisasi personil Ojek Online Istana
                </p>
              </div>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Personil</span>
                  <span className="font-bold text-slate-900">{selectedApproval.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipe Akses</span>
                  <span className="font-bold text-slate-900 capitalize">{selectedApproval.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unit Kerja / Dokumen</span>
                  <span className="font-bold text-slate-900">{selectedApproval.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Catatan</span>
                  <span className="font-medium text-slate-700 text-right max-w-[200px]">
                    {selectedApproval.notes}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed">
                Menyetujui permohonan ini akan memberikan otorisasi telemetri kedinasan dan menambahkan personil ke database real-time.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleReviewAction('approve')}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Setujui Otorisasi</span>
                </button>
                <button
                  onClick={() => handleReviewAction('reject')}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Tolak</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
