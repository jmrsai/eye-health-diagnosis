import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Zap,
  Stethoscope,
  User,
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Doctor' | 'Patient'>('Patient');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password, role);
    } catch (err) {
      setError('Invalid credentials. Try doctor@neurovision.ai or patient@neurovision.ai');
    }
  };

  const demoCredentials = [
    { role: 'Doctor', email: 'doctor@neurovision.ai', password: 'demo123' },
    { role: 'Patient', email: 'patient@neurovision.ai', password: 'demo123' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quantum-50 via-white to-neuro-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-quantum-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neuro-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secure-200/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-quantum-500 to-neuro-600 rounded-2xl flex items-center justify-center shadow-quantum">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-secure-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-quantum-600 to-neuro-600 bg-clip-text text-transparent mb-2">
            NeuroVision AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Next-Generation Eye Health Platform
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            {['Doctor', 'Patient'].map((roleOption) => (
              <motion.button
                key={roleOption}
                onClick={() => setRole(roleOption as 'Doctor' | 'Patient')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  role === roleOption
                    ? 'border-quantum-500 bg-quantum-50 dark:bg-quantum-900/20 text-quantum-700 dark:text-quantum-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  {roleOption === 'Doctor' ? (
                    <Stethoscope className="w-6 h-6" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                  <span className="font-medium">{roleOption}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-neural border border-gray-200/50 dark:border-gray-700/50 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-quantum-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-quantum-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-threat-50 dark:bg-threat-900/20 border border-threat-200 dark:border-threat-700 rounded-lg text-threat-700 dark:text-threat-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-quantum-500 to-neuro-600 text-white py-3 px-4 rounded-xl font-medium hover:from-quantum-600 hover:to-neuro-700 focus:outline-none focus:ring-2 focus:ring-quantum-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In with Quantum Security</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Biometric Login */}
            <motion.button
              type="button"
              className="w-full bg-gradient-to-r from-secure-500 to-wellness-600 text-white py-3 px-4 rounded-xl font-medium hover:from-secure-600 hover:to-wellness-700 focus:outline-none focus:ring-2 focus:ring-secure-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Fingerprint className="w-4 h-4" />
              <span>Biometric Authentication</span>
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Demo Credentials:</p>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <motion.button
                  key={cred.role}
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword(cred.password);
                    setRole(cred.role as 'Doctor' | 'Patient');
                  }}
                  className="w-full text-left p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="font-medium text-gray-900 dark:text-white">{cred.role}</div>
                  <div className="text-gray-500 dark:text-gray-400">{cred.email}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Quantum-Safe</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;