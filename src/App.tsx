import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { PenggunaView } from './components/views/PenggunaView';
import { DriverView } from './components/views/DriverView';
import { AdminView } from './components/views/AdminView';
import { FullMapModal } from './components/shared/InteractiveMap';
import { ChatModal } from './components/shared/ChatModal';
import { CallModal, SupportModal, ReportModal } from './components/shared/ModalHelpers';
import { LoginModal } from './components/auth/LoginModal';
import { Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, isMapModalOpen, setIsMapModalOpen } = useApp();

  const renderActiveView = () => {
    if (!currentUser) {
      return <PenggunaView />;
    }
    if (currentUser.role === 'driver') {
      return <DriverView />;
    }
    if (currentUser.role === 'admin') {
      return <AdminView />;
    }
    return <PenggunaView />;
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans">
      {/* Dark Navy Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {renderActiveView()}

          {/* Footer Disclaimer matching exact screenshot copy */}
          <footer className="mt-12 pt-6 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Konsep demonstrasi · Seluruh data fiktif. Bukan layanan resmi atau bentuk dukungan pemerintah.
            </span>
          </footer>
        </main>
      </div>

      {/* Global Modals */}
      <FullMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />
      <ChatModal />
      <CallModal />
      <SupportModal />
      <ReportModal />
      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
