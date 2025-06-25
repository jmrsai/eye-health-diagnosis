import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BiometricGameSession, GameAchievement } from '../types';

interface GameState {
  sessions: BiometricGameSession[];
  achievements: GameAchievement[];
  totalScore: number;
  streak: number;
  level: number;
  addSession: (session: BiometricGameSession) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: () => void;
}

const initialAchievements: GameAchievement[] = [
  {
    id: 'first-game',
    title: 'First Steps',
    description: 'Complete your first vision training session',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: '10 XP',
  },
  {
    id: 'blink-master',
    title: 'Blink Master',
    description: 'Achieve 95% accuracy in blink training',
    icon: '👁️',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: 'Unlock Advanced Mode',
  },
  {
    id: 'streak-warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day training streak',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    reward: 'Premium Features',
  },
  {
    id: 'eye-tracker',
    title: 'Eye Tracker Pro',
    description: 'Complete 50 eye tracking sessions',
    icon: '🎮',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    reward: 'Custom Themes',
  },
  {
    id: 'health-guardian',
    title: 'Health Guardian',
    description: 'Maintain healthy screen time for 30 days',
    icon: '🛡️',
    unlocked: false,
    progress: 0,
    maxProgress: 30,
    reward: 'Health Insights Pro',
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      sessions: [],
      achievements: initialAchievements,
      totalScore: 0,
      streak: 0,
      level: 1,

      addSession: (session: BiometricGameSession) => {
        const { sessions, totalScore } = get();
        const newTotalScore = totalScore + session.score;
        const newLevel = Math.floor(newTotalScore / 1000) + 1;

        set({
          sessions: [session, ...sessions.slice(0, 49)], // Keep last 50 sessions
          totalScore: newTotalScore,
          level: newLevel,
        });

        // Check for achievements
        if (sessions.length === 0) {
          get().unlockAchievement('first-game');
        }
        
        if (session.accuracy >= 95 && session.gameType === 'BlinkAnalysis') {
          get().unlockAchievement('blink-master');
        }
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, unlocked: true, progress: achievement.maxProgress }
              : achievement
          ),
        }));
      },

      updateStreak: () => {
        const { streak } = get();
        const newStreak = streak + 1;
        
        set({ streak: newStreak });
        
        if (newStreak >= 7) {
          get().unlockAchievement('streak-warrior');
        }
      },
    }),
    {
      name: 'neurovision-game',
    }
  )
);