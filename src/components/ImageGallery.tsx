'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from '@/components/ui/dialog';

interface Image {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
  title?: string;
  className?: string;
}

const ImageGallery = ({ images, title, className = '' }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const openImageModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-restaurant-dark mb-4">{title}</h3>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openImageModal(image)}
            className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <AspectRatio ratio={4/3}>
              <Image src={image.src} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" alt={image.alt} width={75} height={75} />
            </AspectRatio>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={closeImageModal}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="max-w-4xl border-none bg-transparent shadow-none p-0">
          <div className="p-1 bg-white/10 backdrop-blur-sm rounded-xl">
            <Carousel>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image src={image.src} className="w-full h-auto max-h-[80vh] object-contain rounded-lg" alt={image.alt} width={75} height={75} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" variant="secondary" />
              <CarouselNext className="right-4" variant="secondary" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;