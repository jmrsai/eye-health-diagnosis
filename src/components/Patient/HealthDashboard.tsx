import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Eye, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Calendar,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useHealthStore } from '../../store/healthStore';
import { useGameStore } from '../../store/gameStore';

const HealthDashboard: React.FC = () => {
  const { metrics, currentStrainLevel } = useHealthStore();
  const { totalScore, streak, level } = useGameStore();

  // Mock data for charts
  const screenTimeData = [
    { date: 'Mon', screenTime: 6.2, breaks: 8, strain: 4 },
    { date: 'Tue', screenTime: 7.1, breaks: 6, strain: 6 },
    { date: 'Wed', screenTime: 5.8, breaks: 10, strain: 3 },
    { date: 'Thu', screenTime: 8.2, breaks: 5, strain: 7 },
    { date: 'Fri', screenTime: 6.9, breaks: 9, strain: 4 },
    { date: 'Sat', screenTime: 4.5, breaks: 12, strain: 2 },
    { date: 'Sun', screenTime: 5.2, breaks: 11, strain: 3 },
  ];

  const blinkRateData = [
    { time: '9:00', rate: 18 },
    { time: '10:00', rate: 16 },
    { time: '11:00', rate: 14 },
    { time: '12:00', rate: 19 },
    { time: '13:00', rate: 17 },
    { time: '14:00', rate: 13 },
    { time: '15:00', rate: 15 },
    { time: '16:00', rate: 18 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-secure-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-threat-500" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-secure-600 bg-secure-50 border-secure-200';
      case 'warning': return 'text-biometric-600 bg-biometric-50 border-biometric-200';
      case 'critical': return 'text-threat-600 bg-threat-50 border-threat-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time monitoring of your eye health and visual performance
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-neuro-50 to-quantum-50 dark:from-neuro-900/20 dark:to-quantum-900/20 rounded-xl p-6 border border-neuro-200 dark:border-neuro-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neuro-600 dark:text-neuro-400">Game Score</p>
              <p className="text-2xl font-bold text-neuro-700 dark:text-neuro-300">
                {totalScore.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-neuro-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-secure-500 mr-1" />
            <span className="text-sm text-secure-600 dark:text-secure-400">+12% this week</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-wellness-50 to-secure-50 dark:from-wellness-900/20 dark:to-secure-900/20 rounded-xl p-6 border border-wellness-200 dark:border-wellness-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-wellness-600 dark:text-wellness-400">Streak</p>
              <p className="text-2xl font-bold text-wellness-700 dark:text-wellness-300">{streak} days</p>
            </div>
            <div className="w-12 h-12 bg-wellness-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <CheckCircle className="w-4 h-4 text-secure-500 mr-1" />
            <span className="text-sm text-secure-600 dark:text-secure-400">Personal best!</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-innovation-50 to-biometric-50 dark:from-innovation-900/20 dark:to-biometric-900/20 rounded-xl p-6 border border-innovation-200 dark:border-innovation-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-innovation-600 dark:text-innovation-400">Level</p>
              <p className="text-2xl font-bold text-innovation-700 dark:text-innovation-300">{level}</p>
            </div>
            <div className="w-12 h-12 bg-innovation-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-secure-500 mr-1" />
            <span className="text-sm text-secure-600 dark:text-secure-400">Level up soon</span>
          </div>
        </div>

        <div className={`rounded-xl p-6 border ${
          currentStrainLevel <= 3 ? 'bg-gradient-to-br from-secure-50 to-wellness-50 dark:from-secure-900/20 dark:to-wellness-900/20 border-secure-200 dark:border-secure-700' :
          currentStrainLevel <= 6 ? 'bg-gradient-to-br from-biometric-50 to-innovation-50 dark:from-biometric-900/20 dark:to-innovation-900/20 border-biometric-200 dark:border-biometric-700' :
          'bg-gradient-to-br from-threat-50 to-innovation-50 dark:from-threat-900/20 dark:to-innovation-900/20 border-threat-200 dark:border-threat-700'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Eye Strain</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStrainLevel}/10</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              currentStrainLevel <= 3 ? 'bg-secure-500' :
              currentStrainLevel <= 6 ? 'bg-biometric-500' :
              'bg-threat-500'
            }`}>
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {currentStrainLevel <= 3 ? (
              <>
                <CheckCircle className="w-4 h-4 text-secure-500 mr-1" />
                <span className="text-sm text-secure-600 dark:text-secure-400">Excellent</span>
              </>
            ) : currentStrainLevel <= 6 ? (
              <>
                <AlertTriangle className="w-4 h-4 text-biometric-500 mr-1" />
                <span className="text-sm text-biometric-600 dark:text-biometric-400">Take a break</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-threat-500 mr-1" />
                <span className="text-sm text-threat-600 dark:text-threat-400">Rest needed</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Health Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {metric.name}
              </h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.unit}
              </span>
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-3 ${getStatusColor(metric.status)}`}>
              {metric.status === 'good' && <CheckCircle className="w-3 h-3 mr-1" />}
              {metric.status === 'warning' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {metric.status === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
              {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Screen Time Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Screen Time & Strain
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={screenTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area
                type="monotone"
                dataKey="screenTime"
                stroke="#3B82F6"
                fill="url(#screenTimeGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="strain"
                stroke="#EF4444"
                fill="url(#strainGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="screenTimeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="strainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Blink Rate Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Blink Rate
            </h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={blinkRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-quantum-50 to-neuro-50 dark:from-quantum-900/20 dark:to-neuro-900/20 rounded-xl p-6 border border-quantum-200 dark:border-quantum-700"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-quantum-500 to-neuro-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Health Insights
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              🎯 Personalized Recommendation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your blink rate has decreased by 15% this afternoon. Consider taking a 5-minute break 
              and doing some blink exercises to prevent dry eyes.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              📈 Progress Update
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Great job! Your eye strain levels have improved by 23% since starting vision training. 
              Keep up the consistent daily practice.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              ⚡ Smart Alert
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on your screen time patterns, we recommend enabling blue light filtering 
              after 6 PM to improve sleep quality.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              🏆 Achievement Ready
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You're just 2 more training sessions away from unlocking the "Vision Master" 
              achievement and earning 500 bonus points!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HealthDashboard;