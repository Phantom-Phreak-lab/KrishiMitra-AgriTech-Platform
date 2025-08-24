import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Package, 
  IndianRupee,
  User
} from 'lucide-react';
import { Listing } from '@/stores/marketplace-store';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
  onViewDetails?: () => void;
  onContact?: () => void;
  className?: string;
}

export function ListingCard({ 
  listing, 
  onViewDetails, 
  onContact, 
  className 
}: ListingCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={listing.images[0] || 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg'}
            alt={`${listing.crop} ${listing.variety}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90">
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-krishi-primary text-white">
              {listing.crop}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Title and Variety */}
          <div>
            <h3 className="font-semibold text-lg leading-tight">
              {listing.crop} - {listing.variety}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {listing.farmerName}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1 text-xl font-bold text-krishi-primary">
            <IndianRupee className="h-5 w-5" />
            {listing.price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">
              /{listing.unit}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>
                {listing.quantity.toLocaleString()} {listing.unit} available
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{listing.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Listed {new Date(listing.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Description */}
          {listing.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {listing.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewDetails}
            className="flex-1"
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            onClick={onContact}
            className="flex-1 bg-krishi-primary hover:bg-krishi-dark"
          >
            <User className="h-4 w-4 mr-1" />
            Contact
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}