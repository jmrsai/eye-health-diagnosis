import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileImage, 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Scan,
  Activity,
  Shield,
  Clock,
  Target
} from 'lucide-react';
import { SecureAIAnalysis } from '../../types';

const DiagnosisUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<SecureAIAnalysis[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff', '.dicom'],
      'application/dicom': ['.dcm'],
    },
    multiple: true,
  });

  const analyzeImages = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    const mockResults: SecureAIAnalysis[] = uploadedFiles.map((file, index) => ({
      encryptedPatientId: `enc_${Math.random().toString(36).substr(2, 9)}`,
      analysisId: `analysis_${Date.now()}_${index}`,
      timestamp: new Date().toISOString(),
      imageType: 'Fundus',
      aiModels: {
        primaryModel: 'GPT-Vision-Med',
        ensembleModels: ['LLaMA-Medical', 'Gemini-Health'],
        confidenceScore: 0.92 + Math.random() * 0.06,
        uncertaintyBounds: [0.85, 0.97],
      },
      findings: [
        {
          id: `finding_${index}_1`,
          condition: 'Diabetic Retinopathy',
          severity: Math.random() > 0.5 ? 'Mild' : 'Moderate',
          confidence: 0.89 + Math.random() * 0.1,
          location: 'Posterior pole, temporal to macula',
          description: 'Multiple microaneurysms and dot-blot hemorrhages observed',
          clinicalSignificance: 'Requires monitoring and glycemic control optimization',
        },
        {
          id: `finding_${index}_2`,
          condition: 'Macular Edema',
          severity: 'Mild',
          confidence: 0.76 + Math.random() * 0.15,
          location: 'Central macula',
          description: 'Mild retinal thickening detected in central macular region',
          clinicalSignificance: 'May benefit from anti-VEGF therapy if progression occurs',
        },
      ],
      riskAssessment: {
        level: Math.random() > 0.7 ? 'Medium' : 'Low',
        probability: 0.15 + Math.random() * 0.3,
        timeHorizon: '12 months',
        confidenceInterval: [0.12, 0.48],
      },
      differentialDiagnosis: [
        {
          condition: 'Diabetic Retinopathy',
          probability: 0.89,
          reasoning: 'Classic microaneurysms and hemorrhages pattern',
        },
        {
          condition: 'Hypertensive Retinopathy',
          probability: 0.23,
          reasoning: 'Some vascular changes could indicate hypertensive component',
        },
      ],
      aiRecommendations: [
        {
          type: 'Monitoring',
          priority: 'Medium',
          description: 'Follow-up fundus photography in 6 months',
          timeline: '6 months',
        },
        {
          type: 'Treatment',
          priority: 'High',
          description: 'Optimize glycemic control with endocrinology consultation',
          timeline: '2 weeks',
        },
      ],
    }));

    setAnalysisResults(mockResults);
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-secure-600 bg-secure-50 border-secure-200';
      case 'Medium': return 'text-biometric-600 bg-biometric-50 border-biometric-200';
      case 'High': return 'text-innovation-600 bg-innovation-50 border-innovation-200';
      case 'Critical': return 'text-threat-600 bg-threat-50 border-threat-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Medical Diagnosis</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload medical images for advanced AI analysis with quantum-safe processing
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-quantum-50 dark:bg-quantum-900/20 rounded-lg border border-quantum-200 dark:border-quantum-700">
          <Shield className="w-4 h-4 text-quantum-600 dark:text-quantum-400" />
          <span className="text-sm font-medium text-quantum-700 dark:text-quantum-300">
            Quantum Encrypted
          </span>
        </div>
      </div>

      {/* Upload Area */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-quantum-500 bg-quantum-50 dark:bg-quantum-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-quantum-400 hover:bg-quantum-25 dark:hover:bg-quantum-900/10'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-quantum-500 to-neuro-600 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isDragActive ? 'Drop medical images here' : 'Upload Medical Images'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Supports DICOM, JPEG, PNG, TIFF formats • Fundus, OCT, Angiography, Ultrasound
            </p>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Fundus Photos</span>
            </div>
            <div className="flex items-center space-x-1">
              <Scan className="w-4 h-4" />
              <span>OCT Scans</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4" />
              <span>Angiography</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <motion.button
              onClick={analyzeImages}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-quantum-500 to-neuro-600 text-white rounded-lg hover:from-quantum-600 hover:to-neuro-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Analyze with AI</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <FileImage className="w-8 h-8 text-quantum-600 dark:text-quantum-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-quantum-50 to-neuro-50 dark:from-quantum-900/20 dark:to-neuro-900/20 rounded-xl p-6 border border-quantum-200 dark:border-quantum-700"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-quantum-500 to-neuro-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI Analysis in Progress
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Zap className="w-4 h-4 text-quantum-500" />
                  <span>Processing with quantum-safe neural networks...</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-quantum-500 to-neuro-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Analysis Results
          </h3>

          {analysisResults.map((result, index) => (
            <motion.div
              key={result.analysisId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Result Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secure-500 to-wellness-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Analysis Complete
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Confidence: {(result.aiModels.confidenceScore * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(result.riskAssessment.level)}`}>
                    {result.riskAssessment.level} Risk
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div className="p-6">
                <h5 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                  Clinical Findings
                </h5>
                <div className="space-y-4">
                  {result.findings.map((finding) => (
                    <div key={finding.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h6 className="font-medium text-gray-900 dark:text-white">
                          {finding.condition}
                        </h6>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {(finding.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Location:</strong> {finding.location}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Description:</strong> {finding.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Clinical Significance:</strong> {finding.clinicalSignificance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                  AI Recommendations
                </h5>
                <div className="space-y-3">
                  {result.aiRecommendations.map((rec, recIndex) => (
                    <div key={recIndex} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        rec.priority === 'High' ? 'bg-threat-500' :
                        rec.priority === 'Medium' ? 'bg-biometric-500' :
                        'bg-secure-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {rec.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            rec.priority === 'High' ? 'bg-threat-100 text-threat-700' :
                            rec.priority === 'Medium' ? 'bg-biometric-100 text-biometric-700' :
                            'bg-secure-100 text-secure-700'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {rec.description}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Timeline: {rec.timeline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DiagnosisUpload;