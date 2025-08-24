'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import StarRating from './StarRating';

interface TestimonialCardProps {
  name: string;
  pathname: string;
  text: string;
  rating: number;
  imageSrc?: string;
  className?: string;
}

const TestimonialCard = ({
  name,
  pathname,
  text,
  rating,
  imageSrc,
  className,
}: TestimonialCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-lg p-6 transition-all duration-300 hover:shadow-xl",
      className
    )}>
      <div className="flex items-start gap-4">
        {imageSrc && (
          <div className="flex-shrink-0">
            <Image src={imageSrc} className="w-12 h-12 rounded-full object-cover border-2 border-restaurant-gold" alt={name} width={75} height={75} />
          </div>
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-lg text-restaurant-dark">{name}</h4>
              <p className="text-sm text-gray-500">{pathname}</p>
            </div>
            <StarRating rating={rating} />
          </div>
          <p className="mt-3 text-gray-700 italic">"{text}"</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;