import { create } from 'zustand';

export interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  pincode: string;
  description: string;
  images: string[];
  createdAt: string;
  status: 'active' | 'sold' | 'expired';
}

interface MarketplaceState {
  listings: Listing[];
  filters: {
    crop: string;
    location: string;
    priceRange: [number, number];
  };
  isLoading: boolean;
  setListings: (listings: Listing[]) => void;
  addListing: (listing: Listing) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  setFilters: (filters: Partial<MarketplaceState['filters']>) => void;
  setLoading: (loading: boolean) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  listings: [],
  filters: {
    crop: '',
    location: '',
    priceRange: [0, 10000],
  },
  isLoading: false,
  setListings: (listings) => set({ listings }),
  addListing: (listing) => 
    set((state) => ({ listings: [listing, ...state.listings] })),
  updateListing: (id, updates) =>
    set((state) => ({
      listings: state.listings.map(listing =>
        listing.id === id ? { ...listing, ...updates } : listing
      ),
    })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setLoading: (isLoading) => set({ isLoading }),
}));