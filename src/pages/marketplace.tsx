import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ListingCard } from '@/components/marketplace/listing-card';
import { useMarketplaceStore } from '@/stores/marketplace-store';
import { listingService } from '@/services/listing-service';
import { Plus, Search, Filter, Store, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function MarketplacePage() {
  const { t } = useTranslation();
  const { listings, filters, isLoading, setListings, setFilters, setLoading } = useMarketplaceStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadListings();
  }, [filters]);

  const loadListings = async () => {
    try {
      setLoading(true);
      const data = await listingService.getAll(filters);
      setListings(data);
    } catch (error) {
      toast.error('Failed to load marketplace listings');
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cropTypes = ['Wheat', 'Rice', 'Corn', 'Tomato', 'Potato', 'Onion', 'Cotton'];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Store className="h-8 w-8 text-krishi-primary" />
            {t('marketplace.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('marketplace.subtitle')}
          </p>
        </div>
        
        <Button asChild className="bg-krishi-primary hover:bg-krishi-dark">
          <Link to="/listing/new" className="gap-2">
            <Plus className="h-4 w-4" />
            {t('marketplace.createListing')}
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops, varieties, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Crop Filter */}
              <Select
                value={filters.crop}
                onValueChange={(value) => setFilters({ crop: value })}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Crops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Crops</SelectItem>
                  {cropTypes.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location"
                  value={filters.location}
                  onChange={(e) => setFilters({ location: e.target.value })}
                  className="pl-10 w-full md:w-48"
                />
              </div>

              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {filteredListings.length} listings found
          </p>
          {searchQuery && (
            <Badge variant="secondary">
              "{searchQuery}"
            </Badge>
          )}
        </div>
        
        <Select defaultValue="recent">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="location">Location</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Listings Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-96 animate-pulse">
              <div className="aspect-video bg-muted" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ListingCard
                listing={listing}
                onViewDetails={() => toast.info('View details clicked')}
                onContact={() => toast.info('Contact farmer clicked')}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or create the first listing.
            </p>
            <Button asChild>
              <Link to="/listing/new">Create First Listing</Link>
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}