import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useAuthStore } from './store/authStore';

// Components
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import TopNavigation from './components/Layout/TopNavigation';

// Doctor Components
import DiagnosisUpload from './components/Doctor/DiagnosisUpload';

// Patient Components
import HealthDashboard from './components/Patient/HealthDashboard';
import VisionGames from './components/Patient/VisionGames';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAuthenticated || !user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    if (user.role === 'Doctor') {
      switch (activeSection) {
        case 'diagnosis':
          return <DiagnosisUpload />;
        case 'patients':
          return <div className="p-6">Patient Management - Coming Soon</div>;
        case 'research':
          return <div className="p-6">Research Hub - Coming Soon</div>;
        case 'privacy':
          return <div className="p-6">Privacy Center - Coming Soon</div>;
        case 'settings':
          return <div className="p-6">Settings - Coming Soon</div>;
        default:
          return <div className="p-6">Doctor Dashboard - Coming Soon</div>;
      }
    } else {
      switch (activeSection) {
        case 'dashboard':
          return <HealthDashboard />;
        case 'games':
          return <VisionGames />;
        case 'monitoring':
          return <div className="p-6">Eye Monitoring - Coming Soon</div>;
        case 'education':
          return <div className="p-6">Learn & Research - Coming Soon</div>;
        case 'medications':
          return <div className="p-6">Medications - Coming Soon</div>;
        case 'settings':
          return <div className="p-6">Settings - Coming Soon</div>;
        default:
          return <HealthDashboard />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-quantum-200/10 dark:bg-quantum-800/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neuro-200/10 dark:bg-neuro-800/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secure-200/5 dark:bg-secure-800/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;