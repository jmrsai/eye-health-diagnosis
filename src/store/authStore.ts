import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SecureUserProfile } from '../types';

interface AuthState {
  user: SecureUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'Doctor' | 'Patient') => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<SecureUserProfile>) => void;
}

// Mock user data for demonstration
const mockUsers = {
  'doctor@neurovision.ai': {
    id: 'doc-001',
    role: 'Doctor' as const,
    name: 'Dr. Sarah Chen',
    email: 'doctor@neurovision.ai',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    preferences: {
      theme: 'light' as const,
      privacy: 'enhanced' as const,
      aiTransparency: 'technical' as const,
    },
    securitySettings: {
      mfaEnabled: true,
      biometricAuth: true,
      sessionTimeout: 30,
    },
  },
  'patient@neurovision.ai': {
    id: 'pat-001',
    role: 'Patient' as const,
    name: 'Alex Rodriguez',
    email: 'patient@neurovision.ai',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    preferences: {
      theme: 'auto' as const,
      privacy: 'standard' as const,
      aiTransparency: 'basic' as const,
    },
    securitySettings: {
      mfaEnabled: false,
      biometricAuth: true,
      sessionTimeout: 60,
    },
    medicalData: {
      conditions: ['Myopia', 'Dry Eye Syndrome'],
      medications: ['Artificial Tears', 'Omega-3 Supplements'],
      allergies: ['Penicillin'],
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role: 'Doctor' | 'Patient') => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const user = mockUsers[email as keyof typeof mockUsers];
        
        if (user && user.role === role) {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials or role mismatch');
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      updateProfile: (updates: Partial<SecureUserProfile>) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, ...updates } 
          });
        }
      },
    }),
    {
      name: 'neurovision-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);