// Advanced AI Analysis Types
export interface SecureAIAnalysis {
  encryptedPatientId: string;
  analysisId: string;
  timestamp: string;
  imageType: 'Fundus' | 'OCT' | 'Angiography' | 'Ultrasound' | 'Topography';
  aiModels: {
    primaryModel: 'GPT-Vision-Med' | 'LLaMA-Medical' | 'Gemini-Health';
    ensembleModels: string[];
    confidenceScore: number;
    uncertaintyBounds: [number, number];
  };
  findings: DiagnosticFinding[];
  riskAssessment: {
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    probability: number;
    timeHorizon: string;
    confidenceInterval: [number, number];
  };
  differentialDiagnosis: DiagnosticProbability[];
  aiRecommendations: AIRecommendation[];
}

export interface DiagnosticFinding {
  id: string;
  condition: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  confidence: number;
  location: string;
  description: string;
  clinicalSignificance: string;
}

export interface DiagnosticProbability {
  condition: string;
  probability: number;
  reasoning: string;
}

export interface AIRecommendation {
  type: 'Treatment' | 'Monitoring' | 'Referral' | 'Lifestyle';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  description: string;
  timeline: string;
}

// Biometric Gaming Types
export interface BiometricGameSession {
  userId: string;
  gameType: 'BlinkAnalysis' | 'EyeTracking' | 'PupilResponse' | 'VisualField';
  score: number;
  duration: number;
  accuracy: number;
  improvements: string[];
  nextLevel: boolean;
  biometricData: {
    averageReactionTime: number;
    consistency: number;
    fatigue: number;
  };
}

export interface GameAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
}

// User Profile Types
export interface SecureUserProfile {
  id: string;
  role: 'Doctor' | 'Patient' | 'Researcher' | 'Admin';
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto' | 'high-contrast';
    privacy: 'standard' | 'enhanced' | 'maximum';
    aiTransparency: 'basic' | 'detailed' | 'technical';
  };
  securitySettings: {
    mfaEnabled: boolean;
    biometricAuth: boolean;
    sessionTimeout: number;
  };
  medicalData?: {
    conditions: string[];
    medications: string[];
    allergies: string[];
  };
}

// Health Monitoring Types
export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface ScreenTimeData {
  date: string;
  totalTime: number;
  breaks: number;
  eyeStrain: number;
  blinkRate: number;
}

// Privacy & Security Types
export interface PrivacyAuditEntry {
  timestamp: string;
  action: string;
  dataType: string;
  purpose: string;
  legalBasis: string;
  userId: string;
}

export interface ComplianceStatus {
  hipaa: boolean;
  gdpr: boolean;
  ccpa: boolean;
  fda: boolean;
  lastAudit: string;
}