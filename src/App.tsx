import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Layout, PageName } from './components/Layout';
import { VoiceModal } from './components/VoiceModal';
import { QuickActionModal } from './components/QuickActionModal';
import { AuthModal } from './components/AuthModal';

// Pages (Client Only)
import { CommandCenter } from './pages/CommandCenter';
import { VoiceChat } from './pages/VoiceChat';
import { TextChat } from './pages/TextChat';
import { Tasks } from './pages/Tasks';
import { Finances } from './pages/Finances';
import { Habits } from './pages/Habits';
import { Projects } from './pages/Projects';
import { Calendar } from './pages/Calendar';
import { Integrations } from './pages/Integrations';
import { Personalization } from './pages/Personalization';
import { Analytics } from './pages/Analytics';
import { HowToUse } from './pages/HowToUse';
import { News } from './pages/News';
import { Settings } from './pages/Settings';

import { LockScreen } from './components/LockScreen';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('VoiceChat');
  const { isVoiceListening, setIsVoiceListening, activeQuickAction, setActiveQuickAction } = useApp();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#02050e] flex flex-col items-center justify-center text-cyan-400">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-4" />
        <p className="font-rajdhani text-sm tracking-widest uppercase text-slate-300">Inicializando Protocolo JARVES...</p>
      </div>
    );
  }

  // Se o usuário não estiver autenticado ou não tiver plano ativo, mostra a Tela de Bloqueio com Kiwify
  if (!isAuthenticated || !user) {
    return <LockScreen />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Dashboard':
      case 'CommandCenter':
        return <CommandCenter onNavigate={setCurrentPage} />;
      case 'VoiceChat':
        return <VoiceChat />;
      case 'TextChat':
        return <TextChat />;
      case 'Tasks':
        return <Tasks />;
      case 'Finances':
        return <Finances />;
      case 'Habits':
        return <Habits />;
      case 'Projects':
        return <Projects />;
      case 'Calendar':
        return <Calendar />;
      case 'Integrations':
        return <Integrations />;
      case 'Personalization':
        return <Personalization />;
      case 'Analytics':
        return <Analytics />;
      case 'HowToUse':
        return <HowToUse />;
      case 'News':
        return <News />;
      case 'Settings':
        return <Settings />;
      default:
        return <VoiceChat />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderCurrentPage()}

        {/* Global Voice Modal */}
        <VoiceModal
          isOpen={isVoiceListening}
          onClose={() => setIsVoiceListening(false)}
          onCommandProcessed={(cmd) => {
            console.log('Voice command:', cmd);
          }}
        />

        {/* Global Quick Action Creation Modal */}
        <QuickActionModal
          isOpen={activeQuickAction !== null}
          defaultTab={activeQuickAction}
          onClose={() => setActiveQuickAction(null)}
        />
      </Layout>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
