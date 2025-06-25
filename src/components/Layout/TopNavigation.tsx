import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Shield, 
  Zap,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  Activity,
  Lock
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface TopNavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ isDark, toggleTheme }) => {
  const { user } = useAuthStore();

  const securityStatus = {
    encryption: 'Quantum-Safe',
    privacy: 'Maximum',
    compliance: 'HIPAA + GDPR',
    threats: 0
  };

  return (
    <motion.div 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-6">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={user?.role === 'Doctor' ? "Search patients, diagnoses, or research..." : "Search health topics, games, or insights..."}
              className="pl-12 pr-4 py-3 w-96 text-sm bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-quantum-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
            />
          </motion.div>

          {/* AI Status Indicator */}
          <motion.div 
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-quantum-50 to-neuro-50 dark:from-quantum-900/20 dark:to-neuro-900/20 rounded-lg border border-quantum-200/50 dark:border-quantum-700/50"
            animate={{ 
              boxShadow: [
                "0 0 0 rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-secure-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-quantum-700 dark:text-quantum-300">
              AI Active
            </span>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Security Status */}
          <motion.div 
            className="hidden lg:flex items-center space-x-4 px-4 py-2 bg-secure-50/80 dark:bg-secure-900/20 rounded-xl border border-secure-200/50 dark:border-secure-700/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Shield className="h-4 w-4 text-secure-600 dark:text-secure-400" />
            <div className="text-xs">
              <div className="font-medium text-secure-700 dark:text-secure-300">
                {securityStatus.encryption}
              </div>
              <div className="text-secure-500 dark:text-secure-400">
                {securityStatus.privacy} Privacy
              </div>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* Notifications */}
          <motion.button 
            className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="h-5 w-5" />
            <motion.span 
              className="absolute -top-1 -right-1 h-3 w-3 bg-innovation-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Activity Monitor */}
          <motion.div 
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-wellness-50 to-innovation-50 dark:from-wellness-900/20 dark:to-innovation-900/20 rounded-lg border border-wellness-200/50 dark:border-wellness-700/50"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Activity className="h-4 w-4 text-wellness-600 dark:text-wellness-400" />
            <span className="text-xs font-medium text-wellness-700 dark:text-wellness-300">
              Monitoring
            </span>
          </motion.div>

          {/* Profile Dropdown */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <img
                src={user?.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2`}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-quantum-200 dark:ring-quantum-700"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secure-500 rounded-full border border-white dark:border-gray-900"></div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopNavigation;