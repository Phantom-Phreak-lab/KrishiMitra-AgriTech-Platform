import api from './api';
import { DiagnosisResult } from '@/stores/diagnosis-store';

export const diagnosisService = {
  analyze: async (image: File): Promise<DiagnosisResult> => {
    const formData = new FormData();
    formData.append('image', image);
    
    const response = await api.post('/diagnosis/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  getHistory: async (): Promise<DiagnosisResult[]> => {
    const response = await api.get('/diagnosis/history');
    return response.data;
  },

  downloadReport: async (diagnosisId: string): Promise<Blob> => {
    const response = await api.get(`/diagnosis/${diagnosisId}/report`, {
      responseType: 'blob',
    });
    return response.data;
  },
};