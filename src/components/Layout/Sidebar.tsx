import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Stethoscope, TowerControl as GameController2, Activity, BookOpen, Pill, Users, Shield, Settings, LogOut, Zap, Eye, Scan, Target } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuthStore();

  const doctorNavigation = [
    { id: 'dashboard', icon: Activity, label: 'AI Dashboard', color: 'text-quantum-600' },
    { id: 'diagnosis', icon: Scan, label: 'AI Diagnosis', color: 'text-neural-600' },
    { id: 'patients', icon: Users, label: 'Patient Management', color: 'text-secure-600' },
    { id: 'research', icon: BookOpen, label: 'Research Hub', color: 'text-biometric-600' },
    { id: 'privacy', icon: Shield, label: 'Privacy Center', color: 'text-threat-600' },
  ];

  const patientNavigation = [
    { id: 'dashboard', icon: Activity, label: 'Health Dashboard', color: 'text-neuro-600' },
    { id: 'games', icon: GameController2, label: 'Vision Games', color: 'text-wellness-600' },
    { id: 'monitoring', icon: Eye, label: 'Eye Monitoring', color: 'text-innovation-600' },
    { id: 'education', icon: BookOpen, label: 'Learn & Research', color: 'text-quantum-600' },
    { id: 'medications', icon: Pill, label: 'Medications', color: 'text-secure-600' },
  ];

  const navigation = user?.role === 'Doctor' ? doctorNavigation : patientNavigation;

  const sidebarVariants = {
    hidden: { x: -280 },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-72 bg-white dark:bg-gray-900 h-screen flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-neural"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-quantum-500 to-neuro-600 rounded-lg flex items-center justify-center shadow-quantum">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secure-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-quantum-600 to-neuro-600 bg-clip-text text-transparent">
              NeuroVision AI
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role === 'Doctor' ? 'Medical Platform' : 'Health Companion'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <motion.div 
          className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <img
              src={user?.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2`}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-quantum-200"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secure-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item, index) => (
          <motion.button
            key={item.id}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            onClick={() => onSectionChange(item.id)}
            className={`w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-quantum-50 to-neuro-50 dark:from-quantum-900/20 dark:to-neuro-900/20 text-quantum-700 dark:text-quantum-300 shadow-lg border border-quantum-200 dark:border-quantum-700'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <item.icon className={`mr-3 h-5 w-5 ${activeSection === item.id ? item.color : 'text-gray-400 dark:text-gray-500'}`} />
            {item.label}
            {activeSection === item.id && (
              <motion.div
                className="ml-auto w-2 h-2 bg-quantum-500 rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
        <motion.button
          onClick={() => onSectionChange('settings')}
          className="w-full group flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          Settings
        </motion.button>
        
        <motion.button
          onClick={logout}
          className="w-full group flex items-center px-4 py-3 text-sm font-medium text-threat-600 dark:text-threat-400 rounded-xl hover:bg-threat-50 dark:hover:bg-threat-900/20 transition-all duration-200"
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;