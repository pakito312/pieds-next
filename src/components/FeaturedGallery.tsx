'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';;

interface FeaturedGalleryProps {
  images: string[];
  title: string;
  subtitle: string;
  linkTo: string;
  linkText: string;
}

const FeaturedGallery = ({ images, title, subtitle, linkTo, linkText }: FeaturedGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const images = galleryRef.current.querySelectorAll('.gallery-image');
    images.forEach((img, i) => {
      img.classList.add('transition-all', 'duration-500', 'delay-[' + (i * 100) + 'ms]', 'opacity-0', 'translate-y-8');
      observer.observe(img);
    });

    return () => {
      if (galleryRef.current) {
        const images = galleryRef.current.querySelectorAll('.gallery-image');
        images.forEach((img) => observer.unobserve(img));
      }
    };
  }, [images]);

  return (
    <div className="py-16 bg-restaurant-cream" ref={galleryRef}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-restaurant-dark mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={index}
              className="gallery-image overflow-hidden rounded-lg shadow-md h-48 md:h-64"
            >
              <Image src={image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={`Restaurant image ${index+1}`} width={75} height={75} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.slice(4, 7).map((image, index) => (
            <div 
              key={index + 4}
              className="gallery-image overflow-hidden rounded-lg shadow-md h-48 md:h-72"
            >
              <Image src={image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={`Restaurant image ${index+5}`} width={75} height={75} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
             href={linkTo}
            className="inline-flex items-center group text-restaurant-orange hover:text-restaurant-forest font-medium transition-colors"
          >
            {linkText}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="ml-2"
            >
              <ArrowRight size={18} />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGallery;