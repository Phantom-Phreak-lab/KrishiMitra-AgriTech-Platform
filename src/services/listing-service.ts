import api from './api';
import { Listing } from '@/stores/marketplace-store';

export interface CreateListingRequest {
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  pincode: string;
  description: string;
  images: File[];
}

export const listingService = {
  getAll: async (filters?: any): Promise<Listing[]> => {
    const response = await api.get('/listings', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Listing> => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  create: async (data: CreateListingRequest): Promise<Listing> => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await api.post('/listings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  update: async (id: string, updates: Partial<Listing>): Promise<Listing> => {
    const response = await api.put(`/listings/${id}`, updates);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/listings/${id}`);
  },
};