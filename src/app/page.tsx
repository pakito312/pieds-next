'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TestimonialCard from '@/components/TestimonialCard';
import FeaturedGallery from '@/components/FeaturedGallery';
import { homeGalleryImages } from '@/config/galleryImages';
import SEO from "@/components/SEO";

// Importations des images non incluses dans la configuration
// Importations des images non incluses dans la configuration
import image5 from '@/assets/images/gallery-5.jpg';
import image6 from '@/assets/images/gallery-6.jpg';
import image7 from '@/assets/images/gallery-7.jpg';



const HomePagePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulated testimonials data
  const testimonials = [{
    id: 1,
    name: 'Marie Dupont',
    location: 'Paris, France',
    text: 'Une expérience culinaire inoubliable avec une vue magnifique sur l\'eau. Les plats étaient délicieux et le service impeccable.',
    rating: 5
  }, {
    id: 2,
    name: 'Jean Mbarga',
    location: 'Yaoundé, Cameroun',
    text: 'Ce restaurant est un véritable joyau. L\'ambiance, la cuisine, tout est parfait. Je recommande vivement !',
    rating: 4.5
  }, {
    id: 3,
    name: 'Sarah Johnson',
    location: 'Londres, Royaume-Uni',
    text: 'L\'équilibre parfait entre cuisine locale et internationale. Les saveurs sont authentiques et les plats sont présentés avec élégance.',
    rating: 5
  }];
  useEffect(() => {
    if (!scrollRef.current) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = scrollRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);
  return <>
      <SEO title="Pieds dans l'eau Soa - Accueil" description="Découvrez notre restaurant traditionnel camerounais à Soa. Cuisine authentique, ambiance chaleureuse, et expérience culinaire inoubliable." canonical="/" />
      
      <div className="min-h-screen" ref={scrollRef}>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70 z-10"></div>
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="https://pieds-dansleau.com/uploads/pied_dans_leau.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="container-custom relative z-20 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: "easeOut"
          }}>
              <span className="inline-block bg-restaurant-orange text-white text-sm font-medium py-1 px-4 rounded-full mb-6">
                Restaurant Gastronomique
              </span>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Pieds Dans l'eau
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Une expérience culinaire exceptionnelle au bord de l'eau,
                alliant saveurs camerounaises et cuisine internationale raffinée.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/reservation" className="button-primary">
                  Réserver une table
                </Link>
                <Link href="/restaurant" className="button-outline">
                  Découvrir notre restaurant
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div animate={{
            y: [0, 10, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              <a href="#presentation" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
                <span className="text-sm mb-2">Découvrir</span>
                <ArrowRight className="rotate-90" size={20} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Presentation Section */}
        <section id="presentation" className="py-20 bg-restaurant-cream">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <span className="inline-block bg-restaurant-gold/20 text-restaurant-gold text-sm font-medium py-1 px-4 rounded-full mb-4">
                  Notre histoire
                </span>
                <h2 className="text-restaurant-dark text-4xl font-bold mb-6">
                  Une cuisine raffinée au bord de l'eau
                </h2>
                <p className="text-gray-700 mb-4">
                  Niché sur les rives pittoresques de Kribi, Pieds Dans l'eau vous offre une expérience gastronomique unique où la cuisine camerounaise rencontre les standards internationaux.
                </p>
                <p className="text-gray-700 mb-6">
                  Notre chef exécutif, avec son expertise acquise dans les plus grands restaurants du monde, crée des plats qui célèbrent les saveurs locales tout en y apportant une touche de modernité.
                </p>
                <Link href="/restaurant" className="inline-flex items-center text-restaurant-orange hover:text-restaurant-forest transition-colors font-medium">
                  En savoir plus
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 animate-on-scroll">
                <div className="space-y-4">
                  <Image src={homeGalleryImages[0]} className="rounded-lg h-40 w-full object-cover" width={500} height={300} />
                  <Image src={homeGalleryImages[1]} className="rounded-lg h-64 w-full object-cover" width={500} height={300} />
                </div>
                <div className="space-y-4 pt-6">
                  <Image src={homeGalleryImages[2]} className="rounded-lg h-64 w-full object-cover" width={500} height={300} />
                  <Image src={homeGalleryImages[4]} className="rounded-lg h-40 w-full object-cover" width={500} height={300} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Gallery */}
        <FeaturedGallery images={homeGalleryImages} title="Notre Galerie" subtitle="Découvrez notre espace unique directement sur l'eau, offrant une expérience immersive en pleine nature" linkTo="/restaurant" linkText="Voir toutes les photos" />

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="inline-block bg-restaurant-orange/10 text-restaurant-orange text-sm font-medium py-1 px-4 rounded-full mb-4">
                Témoignages
              </span>
              <h2 className="text-restaurant-dark text-4xl font-bold mb-6">
                Ce que disent nos clients
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Découvrez les avis de nos clients qui ont vécu l'expérience Pieds Dans l'eau
                et partagé leurs impressions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => <div key={testimonial.id} className="animate-on-scroll">
                  <TestimonialCard name={testimonial.name} location={testimonial.location} text={testimonial.text} rating={testimonial.rating} />
                </div>)}
            </div>

            <div className="text-center mt-12 animate-on-scroll">
              <Link href="/restaurant" className="button-secondary">
                Voir tous les avis
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-restaurant-forest text-white">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Réservez votre table dès maintenant
              </h2>
              <p className="text-white/80 mb-8">
                Offrez-vous une expérience culinaire inoubliable dans notre restaurant.
                Réservez en ligne ou appelez-nous directement.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/reservation" className="button-primary">
                  Réserver en ligne
                </Link>
                <a href="tel:+237654321987" className="button-outline">
                  +237 677 357 155
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
};

export default HomePagePage;