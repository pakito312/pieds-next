'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const StarRating = ({
  rating,
  editable = false,
  onRatingChange,
  className = '',
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const totalStars = 5;

  return (
    <div className={`flex ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = editable
          ? starValue <= (hoverRating || rating)
          : starValue <= rating;

        return (
          <div
            key={index}
            className={`cursor-${editable ? 'pointer' : 'default'} p-0.5`}
            onClick={() => {
              if (editable && onRatingChange) {
                onRatingChange(starValue);
              }
            }}
            onMouseEnter={() => {
              if (editable) setHoverRating(starValue);
            }}
            onMouseLeave={() => {
              if (editable) setHoverRating(0);
            }}
          >
            <Star
              size={20}
              fill={isFilled ? '#D4AF37' : 'transparent'}
              stroke={isFilled ? '#D4AF37' : '#D4AF37'}
              strokeWidth={1.5}
              className="transition-all duration-200"
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;