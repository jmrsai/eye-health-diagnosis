import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HealthMetric, ScreenTimeData } from '../types';

interface HealthState {
  metrics: HealthMetric[];
  screenTimeData: ScreenTimeData[];
  currentStrainLevel: number;
  lastBreakTime: Date | null;
  updateMetric: (id: string, value: number) => void;
  addScreenTimeData: (data: ScreenTimeData) => void;
  updateStrainLevel: (level: number) => void;
  recordBreak: () => void;
}

const initialMetrics: HealthMetric[] = [
  {
    id: 'blink-rate',
    name: 'Blink Rate',
    value: 18,
    unit: 'per minute',
    trend: 'stable',
    status: 'good',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'eye-strain',
    name: 'Eye Strain Level',
    value: 3,
    unit: '/10',
    trend: 'down',
    status: 'good',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'screen-time',
    name: 'Daily Screen Time',
    value: 6.5,
    unit: 'hours',
    trend: 'up',
    status: 'warning',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'break-frequency',
    name: 'Break Frequency',
    value: 12,
    unit: 'per day',
    trend: 'up',
    status: 'good',
    lastUpdated: new Date().toISOString(),
  },
];

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      metrics: initialMetrics,
      screenTimeData: [],
      currentStrainLevel: 2,
      lastBreakTime: null,

      updateMetric: (id: string, value: number) => {
        set((state) => ({
          metrics: state.metrics.map((metric) =>
            metric.id === id
              ? {
                  ...metric,
                  value,
                  lastUpdated: new Date().toISOString(),
                  trend: value > metric.value ? 'up' : value < metric.value ? 'down' : 'stable',
                  status: 
                    id === 'eye-strain' 
                      ? value <= 3 ? 'good' : value <= 6 ? 'warning' : 'critical'
                      : id === 'screen-time'
                      ? value <= 8 ? 'good' : value <= 12 ? 'warning' : 'critical'
                      : 'good',
                }
              : metric
          ),
        }));
      },

      addScreenTimeData: (data: ScreenTimeData) => {
        set((state) => ({
          screenTimeData: [data, ...state.screenTimeData.slice(0, 29)], // Keep last 30 days
        }));
      },

      updateStrainLevel: (level: number) => {
        set({ currentStrainLevel: level });
        get().updateMetric('eye-strain', level);
      },

      recordBreak: () => {
        set({ lastBreakTime: new Date() });
        const { metrics } = get();
        const breakMetric = metrics.find(m => m.id === 'break-frequency');
        if (breakMetric) {
          get().updateMetric('break-frequency', breakMetric.value + 1);
        }
      },
    }),
    {
      name: 'neurovision-health',
    }
  )
);