import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Target, 
  Eye, 
  Zap,
  Star,
  Award,
  TrendingUp,
  Clock,
  Flame
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { BiometricGameSession } from '../../types';

const VisionGames: React.FC = () => {
  const { addSession, achievements, totalScore, streak, level } = useGameStore();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>({});
  const [isPlaying, setIsPlaying] = useState(false);

  const games = [
    {
      id: 'blink-training',
      title: 'Blink Training Pro',
      description: 'Improve your natural blink rate and reduce dry eye symptoms',
      icon: Eye,
      color: 'from-neuro-500 to-wellness-600',
      difficulty: 'Beginner',
      duration: '5 min',
      benefits: ['Reduces dry eyes', 'Improves tear film', 'Prevents eye strain'],
    },
    {
      id: 'eye-tracking',
      title: 'Eye Tracking Challenge',
      description: 'Enhance visual coordination and tracking accuracy',
      icon: Target,
      color: 'from-quantum-500 to-innovation-600',
      difficulty: 'Intermediate',
      duration: '8 min',
      benefits: ['Better focus', 'Enhanced coordination', 'Improved reaction time'],
    },
    {
      id: 'pupil-response',
      title: 'Pupil Response Test',
      description: 'Train your pupil response and light adaptation',
      icon: Zap,
      color: 'from-wellness-500 to-secure-600',
      difficulty: 'Advanced',
      duration: '10 min',
      benefits: ['Light sensitivity', 'Pupil health', 'Visual adaptation'],
    },
  ];

  const BlinkTrainingGame = () => {
    const [blinkCount, setBlinkCount] = useState(0);
    const [targetBlinks, setTargetBlinks] = useState(20);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);

    useEffect(() => {
      if (isPlaying && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        endGame();
      }
    }, [isPlaying, timeLeft]);

    const handleBlink = () => {
      if (isPlaying) {
        setBlinkCount(prev => prev + 1);
        setScore(prev => prev + 10);
      }
    };

    const endGame = () => {
      setIsPlaying(false);
      const accuracy = (blinkCount / targetBlinks) * 100;
      const session: BiometricGameSession = {
        userId: 'current-user',
        gameType: 'BlinkAnalysis',
        score,
        duration: 60 - timeLeft,
        accuracy: Math.min(accuracy, 100),
        improvements: accuracy > 90 ? ['Excellent blink control!'] : ['Keep practicing for better control'],
        nextLevel: accuracy > 85,
        biometricData: {
          averageReactionTime: 250 + Math.random() * 100,
          consistency: accuracy,
          fatigue: Math.max(0, 100 - accuracy),
        },
      };
      addSession(session);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <motion.div
              className="w-full h-full bg-gradient-to-br from-neuro-400 to-wellness-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleBlink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isPlaying ? { 
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0.7)",
                  "0 0 0 20px rgba(34, 197, 94, 0)",
                ]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Eye className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Blink Training
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Click the eye or blink naturally to train your blink reflex
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-neuro-600 dark:text-neuro-400">
              {blinkCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Blinks</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-wellness-600 dark:text-wellness-400">
              {timeLeft}s
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Time Left</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-innovation-600 dark:text-innovation-400">
              {score}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-neuro-500 to-wellness-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(blinkCount / targetBlinks) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    );
  };

  const EyeTrackingGame = () => {
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
    const [score, setScore] = useState(0);
    const [hits, setHits] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);

    useEffect(() => {
      if (isPlaying && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        endGame();
      }
    }, [isPlaying, timeLeft]);

    useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(() => {
          setTargetPosition({
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
          });
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [isPlaying]);

    const handleTargetClick = () => {
      if (isPlaying) {
        setHits(prev => prev + 1);
        setScore(prev => prev + 25);
        setTargetPosition({
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
        });
      }
    };

    const endGame = () => {
      setIsPlaying(false);
      const accuracy = (hits / (90 / 2)) * 100; // Target changes every 2 seconds
      const session: BiometricGameSession = {
        userId: 'current-user',
        gameType: 'EyeTracking',
        score,
        duration: 90 - timeLeft,
        accuracy: Math.min(accuracy, 100),
        improvements: accuracy > 80 ? ['Great tracking skills!'] : ['Practice smooth eye movements'],
        nextLevel: accuracy > 75,
        biometricData: {
          averageReactionTime: 300 + Math.random() * 150,
          consistency: accuracy,
          fatigue: Math.max(0, 100 - accuracy),
        },
      };
      addSession(session);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Eye Tracking Challenge
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Follow and click the moving targets to improve your visual tracking
          </p>
        </div>

        <div className="relative w-full h-64 bg-gradient-to-br from-quantum-50 to-innovation-50 dark:from-quantum-900/20 dark:to-innovation-900/20 rounded-xl border border-quantum-200 dark:border-quantum-700 overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={`${targetPosition.x}-${targetPosition.y}`}
              className="absolute w-8 h-8 bg-gradient-to-br from-quantum-500 to-innovation-600 rounded-full cursor-pointer flex items-center justify-center shadow-lg"
              style={{
                left: `${targetPosition.x}%`,
                top: `${targetPosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={handleTargetClick}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Target className="w-4 h-4 text-white" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-quantum-600 dark:text-quantum-400">
              {hits}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Hits</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-innovation-600 dark:text-innovation-400">
              {timeLeft}s
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Time Left</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-wellness-600 dark:text-wellness-400">
              {score}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveGame = () => {
    switch (activeGame) {
      case 'blink-training':
        return <BlinkTrainingGame />;
      case 'eye-tracking':
        return <EyeTrackingGame />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vision Training Games</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive exercises to improve your eye health and visual performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neuro-600 dark:text-neuro-400">
              {totalScore.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Score</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <Flame className="w-5 h-5 text-innovation-500" />
              <span className="text-2xl font-bold text-innovation-600 dark:text-innovation-400">
                {streak}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-wellness-600 dark:text-wellness-400">
              {level}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
          </div>
        </div>
      </div>

      {/* Active Game */}
      {activeGame && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {games.find(g => g.id === activeGame)?.title}
            </h3>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isPlaying
                    ? 'bg-threat-500 hover:bg-threat-600 text-white'
                    : 'bg-secure-500 hover:bg-secure-600 text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Start'}</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveGame(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {renderActiveGame()}
        </motion.div>
      )}

      {/* Game Selection */}
      {!activeGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveGame(game.id)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <game.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {game.duration}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {game.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {game.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    game.difficulty === 'Beginner' ? 'bg-secure-100 text-secure-700' :
                    game.difficulty === 'Intermediate' ? 'bg-biometric-100 text-biometric-700' :
                    'bg-threat-100 text-threat-700'
                  }`}>
                    {game.difficulty}
                  </span>
                  <motion.button
                    className="flex items-center space-x-1 text-quantum-600 dark:text-quantum-400 hover:text-quantum-700 dark:hover:text-quantum-300 font-medium text-sm"
                    whileHover={{ x: 4 }}
                  >
                    <span>Play Now</span>
                    <Play className="w-3 h-3" />
                  </motion.button>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {game.benefits.map((benefit, benefitIndex) => (
                      <span
                        key={benefitIndex}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="w-6 h-6 text-biometric-600 dark:text-biometric-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Achievements
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.slice(0, 6).map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-biometric-200 bg-biometric-50 dark:bg-biometric-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-2xl ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.unlocked 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mr-2">
                      <div
                        className="bg-biometric-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionGames;