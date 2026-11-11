import React, { useState } from 'react';
import { Shield, KeyRound, User, Bike, ShieldCheck, CheckCircle2, ArrowRight, UserPlus, Lock } from 'lucide-react';
import { useApp, INITIAL_USERS } from '../../context/AppContext';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    setCurrentUser,
    loginWithCredentials,
    requestNewAccess,
  } = useApp();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [idKedinasan, setIdKedinasan] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState<'pengguna' | 'driver'>('pengguna');
  const [regDept, setRegDept] = useState('Unit administrasi');
  const [regNotes, setRegNotes] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idKedinasan.trim()) {
      setLoginError('Harap masukkan NIP atau ID Kedinasan.');
      return;
    }
    const success = loginWithCredentials(idKedinasan, password);
    if (!success) {
      setLoginError('ID Kedinasan tidak valid.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    await requestNewAccess({
      name: regName,
      role: regRole,
      department: regDept,
      notes: regNotes || 'Permohonan otorisasi akses mobilitas dinas baru',
    });

    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setTab('login');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Presidential Header */}
        <div className="bg-[#10243e] text-white p-6 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl border border-amber-400/50 bg-[#162e4f] flex items-center justify-center text-amber-300">
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
              <h2 className="text-base font-bold tracking-tight">Ojek Online Istana (OOI)</h2>
              <p className="text-xs text-slate-300">Sistem Autentikasi Mobilitas Kedinasan Internal</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => {
              setTab('login');
              setLoginError('');
            }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-[#10243e] text-[#10243e] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Akun Kedinasan
          </button>
          <button
            onClick={() => {
              setTab('register');
              setLoginError('');
            }}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              tab === 'register'
                ? 'border-[#10243e] text-[#10243e] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ajukan Akses Baru (Persetujuan Admin)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {tab === 'login' ? (
            <div className="space-y-5">
              {/* Quick Demo Access Buttons */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Masuk Cepat Demo (Sesuai Screenshot):</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() => {
                      setCurrentUser(INITIAL_USERS[0]);
                      setIsLoginModalOpen(false);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-[#10243e] hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">
                        RP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Raka Pradana (Pengguna)
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Unit administrasi · PG-DEMO-018
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentUser(INITIAL_USERS[1]);
                      setIsLoginModalOpen(false);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-[#10243e] hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">
                        BS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Bima Saputra (Driver)
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Pengemudi Terverifikasi · DRV-102
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentUser(INITIAL_USERS[2]);
                      setIsLoginModalOpen(false);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-[#10243e] hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">
                        NP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Nadia Putri (Administrator)
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Pusat Operasional · ADM-001
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Manual Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Atau Masuk dengan Kredensial
                </div>

                {loginError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIP / ID Kedinasan / Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={idKedinasan}
                      onChange={(e) => setIdKedinasan(e.target.value)}
                      placeholder="Contoh: PG-DEMO-018 atau raka.pradana@istana.go.id"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#10243e] text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kata Sandi Kedinasan
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#10243e] text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#10243e] hover:bg-[#152e4d] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                >
                  Masuk ke Sistem OOI
                </button>
              </form>
            </div>
          ) : (
            <div>
              {regSuccess ? (
                <div className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Permohonan Akses Berhasil Diajukan
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Data Anda telah diteruskan secara real-time ke antrean verifikasi Administrator (Ibu Nadia Putri) pada Pusat Operasional.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Contoh: Maya Kusuma, S.Sos"
                      className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#10243e] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jenis Hak Akses
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegRole('pengguna')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          regRole === 'pengguna'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Pengguna Dinas</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegRole('driver')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          regRole === 'driver'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Bike className="w-3.5 h-3.5" />
                        <span>Pengemudi Armada</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Unit Kerja / Biro Kedinasan
                    </label>
                    <select
                      value={regDept}
                      onChange={(e) => setRegDept(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#10243e] text-slate-800"
                    >
                      <option value="Unit administrasi">Unit administrasi</option>
                      <option value="Biro Protokol & Penjamuan">Biro Protokol & Penjamuan</option>
                      <option value="Biro Pers, Media, & Informasi">Biro Pers, Media, & Informasi</option>
                      <option value="Sekretariat Negara">Sekretariat Negara</option>
                      <option value="Bagian Rumah Tangga Istana">Bagian Rumah Tangga Istana</option>
                      <option value="Operasional Pengamanan Dalam">Operasional Pengamanan Dalam</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Keperluan / Catatan Dinas
                    </label>
                    <textarea
                      value={regNotes}
                      onChange={(e) => setRegNotes(e.target.value)}
                      rows={2}
                      placeholder="Contoh: Penugasan koordinasi mobilitas antar gedung sekretariat..."
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#10243e] text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#10243e] hover:bg-[#152e4d] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    Kirim Permohonan Akses
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer note */}
        <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
          Konsep demonstrasi · Data tersimpan ke sistem database terpadu OOI
        </div>
      </div>
    </div>
  );
};
