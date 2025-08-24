import { create } from 'zustand';

export interface DiagnosisResult {
  id: string;
  disease: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  createdAt: string;
  imageUrl: string;
}

interface DiagnosisState {
  currentImage: File | null;
  isAnalyzing: boolean;
  result: DiagnosisResult | null;
  history: DiagnosisResult[];
  setImage: (image: File) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setResult: (result: DiagnosisResult) => void;
  addToHistory: (result: DiagnosisResult) => void;
  clearCurrent: () => void;
}

export const useDiagnosisStore = create<DiagnosisState>((set) => ({
  currentImage: null,
  isAnalyzing: false,
  result: null,
  history: [],
  setImage: (currentImage) => set({ currentImage }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setResult: (result) => set({ result }),
  addToHistory: (result) => 
    set((state) => ({ history: [result, ...state.history] })),
  clearCurrent: () => 
    set({ currentImage: null, result: null, isAnalyzing: false }),
}));