'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { MapPin, Star, ChevronRight, CreditCard, Mail } from 'lucide-react';
import SEO from "@/components/SEO";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Simulated data for tourism locations

// Simulated data for tourism locations
const tourismLocations = [{
  id: 1,
  name: 'Kribi',
  description: 'Célèbre pour ses plages de sable doré et ses eaux cristallines, Kribi est une destination balnéaire de premier choix au Cameroun.',
  image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  spots: [{
    id: 101,
    name: 'Chutes de la Lobé',
    description: "Un spectacle naturel unique où une rivière se jette directement dans l'océan Atlantique.",
    preview: 'Un phénomène naturel rare et majestueux à ne pas manquer lors de votre visite.',
    fullDescription: "Les chutes de la Lobé sont un phénomène naturel exceptionnel où la rivière Lobé se jette directement dans l'océan Atlantique, créant un spectacle saisissant. Ce site, l'un des rares endroits au monde où une chute d'eau se déverse directement dans la mer, est entouré d'une végétation luxuriante et constitue un lieu sacré pour les populations locales. Les visiteurs peuvent profiter de promenades en pirogue traditionnelle, observer les pêcheurs locaux et même se baigner dans certaines zones sécurisées. Des guides locaux sont disponibles pour partager les légendes et l'importance culturelle de ce lieu unique.",
    image: 'https://images.unsplash.com/photo-1598520982938-83b9bad1e2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    gallery: ['https://images.unsplash.com/photo-1598520982938-83b9bad1e2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1602537599076-ad42d3c451ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1627634777217-c864268db30c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'],
    location: 'À 8 km au sud de Kribi',
    tips: "Visitez tôt le matin pour éviter la foule. Prévoyez des chaussures d'eau et un maillot de bain pour profiter pleinement de l'expérience.",
    guideContact: 'Jean Mbarga: +237 612345678',
    unlocked: false
  }, {
    id: 102,
    name: 'Plage de la Batanga',
    description: 'Une plage de sable fin avec des eaux calmes, idéale pour la baignade et les sports nautiques.',
    preview: 'Un paradis balnéaire aux eaux turquoise et au sable doré.',
    fullDescription: "La plage de la Batanga est l'une des plus belles plages de Kribi, caractérisée par son sable doré et ses eaux cristallines. Moins fréquentée que les plages du centre-ville, elle offre un cadre plus intime et préservé. La plage est bordée de cocotiers et de petits restaurants de fruits de mer où vous pourrez déguster des poissons frais grillés. Les eaux relativement calmes sont parfaites pour la baignade, et vous pourrez également pratiquer diverses activités nautiques comme le jet-ski ou le kayak. Au coucher du soleil, la plage offre un spectacle de couleurs inoubliable.",
    image: 'https://images.unsplash.com/photo-1590523337582-a0638e6d953d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    gallery: ['https://images.unsplash.com/photo-1590523337582-a0638e6d953d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
    location: 'À 5 km au nord de Kribi',
    tips: 'Apportez votre équipement de plage. De nombreux vendeurs proposent des chaises et parasols à louer. Goûtez au poisson grillé dans les petits restaurants en bord de plage.',
    guideContact: 'Marie Ngo: +237 623456789',
    unlocked: false
  }]
}, {
  id: 2,
  name: 'Limbe',
  description: 'Cette ville côtière enchante par ses plages de sable noir volcanique, son jardin botanique et sa vue imprenable sur le mont Cameroun.',
  image: 'https://images.unsplash.com/photo-1571069766777-9ace4a6249a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  spots: [{
    id: 201,
    name: 'Jardin Botanique de Limbe',
    description: 'Un jardin tropical avec une impressionnante collection de plantes et un centre de conservation de primates.',
    preview: 'Un havre de paix et de biodiversité au cœur de Limbe.',
    fullDescription: "Le Jardin Botanique de Limbe, fondé en 1892, est l'un des plus anciens jardins botaniques d'Afrique. S'étendant sur plus de 48 hectares, il abrite une vaste collection de plantes tropicales, des sentiers ombragés, des ruisseaux paisibles et un centre de recherche. Le jardin est particulièrement connu pour son centre de conservation des primates, où vous pourrez observer différentes espèces de singes et contribuer aux efforts de conservation. Le site comprend également un herbarium, un musée et une bibliothèque spécialisée en botanique. Une visite guidée vous permettra de découvrir les espèces végétales endémiques et d'en apprendre davantage sur les efforts de conservation.",
    image: 'https://images.unsplash.com/photo-1588081998940-eca83388c863?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    gallery: ['https://images.unsplash.com/photo-1588081998940-eca83388c863?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80'],
    location: 'Centre-ville de Limbe',
    tips: "Prévoyez au moins 3 heures pour explorer l'intégralité du jardin. Les visites guidées sont vivement recommandées pour une expérience plus enrichissante. N'oubliez pas votre appareil photo et de l'eau.",
    guideContact: 'Dr. Paul Ekwe: +237 634567890',
    unlocked: false
  }, {
    id: 202,
    name: 'Plage de Down Beach',
    description: 'Une plage unique de sable noir volcanique au pied du mont Cameroun.',
    preview: 'Une plage volcanique spectaculaire aux eaux chaudes et apaisantes.',
    fullDescription: "Down Beach est l'une des plages les plus emblématiques de Limbe, connue pour son sable noir volcanique qui crée un contraste saisissant avec l'écume blanche des vagues. Cette plage unique doit sa couleur aux éruptions passées du mont Cameroun, le volcan actif qui domine l'horizon. L'eau y est généralement chaude et relativement calme, idéale pour la baignade. Le long de la plage, vous trouverez de nombreux restaurants de fruits de mer où vous pourrez déguster des spécialités locales tout en admirant la vue sur l'océan. La plage est particulièrement animée le week-end, avec des événements culturels, de la musique et des danses traditionnelles.",
    image: 'https://images.unsplash.com/photo-1507123148750-154e9170cba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1109&q=80',
    gallery: ['https://images.unsplash.com/photo-1507123148750-154e9170cba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1109&q=80', 'https://images.unsplash.com/photo-1516091877045-39eaebafd307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'https://images.unsplash.com/photo-1519752594763-2f54d6757773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80'],
    location: 'Quartier de Down Beach, Limbe',
    tips: 'Le sable noir peut devenir très chaud en milieu de journée, prévoyez des sandales. Ne manquez pas de goûter au poisson "pepper soup", une spécialité locale.',
    guideContact: 'Sophie Mbome: +237 645678901',
    unlocked: false
  }]
}, {
  id: 3,
  name: 'Yaoundé',
  description: 'La capitale du Cameroun offre un riche patrimoine culturel, des marchés colorés et une architecture coloniale mêlée à la modernité.',
  image: 'https://images.unsplash.com/photo-1530330632324-1c23c0e93365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
  spots: [{
    id: 301,
    name: 'Monument de la Réunification',
    description: "Un monument emblématique symbolisant l'unification des parties anglophone et francophone du Cameroun.",
    preview: 'Un symbole historique et architectural au cœur de la capitale.',
    fullDescription: "Le Monument de la Réunification est un symbole puissant de l'histoire politique du Cameroun, commémorant l'unification des parties anglophone et francophone du pays en 1961. Cette structure imposante, inaugurée en 1974, se compose d'une tour centrale entourée de sculptures représentant les différentes régions et cultures du Cameroun. Le site comprend également un musée qui retrace l'histoire de la réunification avec des documents et objets historiques. Du sommet du monument, vous pourrez profiter d'une vue panoramique sur Yaoundé. La place qui entoure le monument est souvent animée et sert de lieu de rassemblement pour divers événements culturels et nationaux.",
    image: 'https://images.unsplash.com/photo-1578149339104-2f0da9917d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    gallery: ['https://images.unsplash.com/photo-1578149339104-2f0da9917d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80', 'https://images.unsplash.com/photo-1607427293702-036707c99c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1578149471769-b9b1f8d84bdee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'],
    location: 'Quartier Ngoa-Ekelle, Yaoundé',
    tips: "Visitez tôt le matin pour éviter la chaleur et profiter d'une meilleure visibilité depuis le sommet. Prévoyez une pièce d'identité pour accéder au site.",
    guideContact: 'François Atangana: +237 656789012',
    unlocked: false
  }, {
    id: 302,
    name: 'Musée National',
    description: "Un musée riche présentant l'histoire, l'art et les traditions des différentes ethnies du Cameroun.",
    preview: 'Une immersion dans la diversité culturelle et historique du Cameroun.',
    fullDescription: "Le Musée National du Cameroun, situé dans un bâtiment colonial rénové, est un trésor culturel qui présente l'histoire riche et diverse du pays. Les collections permanentes comprennent des objets archéologiques, des masques traditionnels, des instruments de musique, des textiles, des sculptures et des objets d'art contemporain. Le musée est organisé en sections thématiques qui représentent les différentes régions et les plus de 250 groupes ethniques du Cameroun. Des expositions temporaires mettent régulièrement en lumière des aspects spécifiques de la culture camerounaise ou des œuvres d'artistes contemporains. Le musée dispose également d'une bibliothèque spécialisée et d'un espace dédié aux activités pédagogiques.",
    image: 'https://images.unsplash.com/photo-1553429938-0c318ee3de1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    gallery: ['https://images.unsplash.com/photo-1553429938-0c318ee3de1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1565060169188-461004442883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1574160674832-1c9b57604576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'],
    location: 'Quartier du Lac, Yaoundé',
    tips: "Prévoyez au moins 2 heures pour une visite complète. Les visites guidées sont disponibles et hautement recommandées pour mieux comprendre les collections. Vérifiez les expositions temporaires en cours avant votre visite.",
    guideContact: 'Clara Essama: +237 667890123',
    unlocked: false
  }]
}];

const PaymentFormSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Le numéro de carte doit contenir 16 chiffres"
  }),
  cardName: z.string().min(3, {
    message: "Le nom sur la carte est requis"
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Format: MM/YY"
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "Le CVV doit contenir 3 ou 4 chiffres"
  }),
  email: z.string().email({
    message: "Email invalide"
  })
});

const MobileMoneyFormSchema = z.object({
  phoneNumber: z.string().regex(/^\d{9}$/, {
    message: "Le numéro doit contenir 9 chiffres"
  }),
  fullName: z.string().min(3, {
    message: "Le nom complet est requis"
  })
});

const TourismePage = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('card');
  const [unlockedSpots, setUnlockedSpots] = useState<number[]>([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    formState: {
      errors: cardErrors
    },
    reset: resetCard
  } = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema)
  });
  const {
    register: registerMobile,
    handleSubmit: handleSubmitMobile,
    formState: {
      errors: mobileErrors
    },
    reset: resetMobile
  } = useForm<z.infer<typeof MobileMoneyFormSchema>>({
    resolver: zodResolver(MobileMoneyFormSchema)
  });
  const handleLocationSelect = (locationId: number) => {
    setSelectedLocation(locationId);
    setSelectedSpot(null);
  };
  const handleSpotSelect = (spotId: number) => {
    setSelectedSpot(spotId);
  };
  const openPaymentDialog = () => {
    setIsPaymentDialogOpen(true);
  };
  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    resetCard();
    resetMobile();
  };
  const onSubmitCardPayment = async (data: z.infer<typeof PaymentFormSchema>) => {
    setProcessingPayment(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Card payment data:', data);
    if (selectedSpot) {
      setUnlockedSpots([...unlockedSpots, selectedSpot]);
    }
    setProcessingPayment(false);
    setIsPaymentDialogOpen(false);
    toast.success('Paiement réussi !', {
      description: 'Vous avez maintenant accès aux informations complètes.'
    });
  };
  const onSubmitMobilePayment = async (data: z.infer<typeof MobileMoneyFormSchema>) => {
    setProcessingPayment(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Mobile payment data:', data);
    if (selectedSpot) {
      setUnlockedSpots([...unlockedSpots, selectedSpot]);
    }
    setProcessingPayment(false);
    setIsPaymentDialogOpen(false);
    toast.success('Paiement réussi !', {
      description: 'Vous avez maintenant accès aux informations complètes.'
    });
  };

  // Update unlocked status in tourismLocations data
  const locations = tourismLocations.map(location => ({
    ...location,
    spots: location.spots.map(spot => ({
      ...spot,
      unlocked: unlockedSpots.includes(spot.id)
    }))
  }));

  // Get current spot details
  const currentLocation = locations.find(loc => loc.id === selectedLocation);
  const currentSpot = currentLocation?.spots.find(spot => spot.id === selectedSpot);
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
      <SEO title="Tourisme à Soa - Pieds dans l'eau" description="Découvrez les attractions touristiques autour de notre restaurant à Soa. Sites naturels, activités culturelles et expériences locales à ne pas manquer." canonical="/tourisme" />
      
      <div className="pt-16 min-h-screen" ref={scrollRef}>
        {/* Hero Section */}
        <section className="py-20 bg-restaurant-forest text-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-block bg-restaurant-gold/20 text-restaurant-gold text-sm font-medium py-1 px-4 rounded-full mb-4">
                Découvrez
              </span>
              <h1 className="text-5xl font-bold mb-6">Visiter le Cameroun</h1>
              <p className="text-white/80 text-lg">
                Explorez les merveilles du Cameroun, de ses plages paradisiaques à ses villes culturelles.
                Une aventure inoubliable vous attend dans ce pays d'Afrique centrale aux mille facettes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
              {locations.map(location => <div key={location.id} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 transition-all duration-300 hover:transform hover:scale-[1.02]" onClick={() => handleLocationSelect(location.id)}>
                  <div className="relative h-48">
                    <Image src={location.image} className="w-full h-full object-cover" alt={location.name} width={500} height={300} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{location.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-white/80 mb-3 text-sm line-clamp-3">
                      {location.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-white/60 text-sm">
                        <MapPin size={16} className="mr-1" />
                        <span>Cameroun</span>
                      </div>
                      <div className="flex items-center text-restaurant-gold text-sm">
                        <span className="mr-1">Explorer</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Location Details Section */}
        {selectedLocation && <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-restaurant-navy mb-2">
                    {currentLocation?.name}
                  </h2>
                  <p className="text-gray-600">
                    Découvrez les sites touristiques incontournables
                  </p>
                </div>
                <button onClick={() => setSelectedLocation(null)} className="button-outline-navy text-sm self-start">
                  Retour aux destinations
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentLocation?.spots.map(spot => <div key={spot.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300" onClick={() => handleSpotSelect(spot.id)}>
                    <div className="relative h-56">
                      <Image src={spot.image} className="w-full h-full object-cover" alt={spot.name} width={500} height={300} />
                      <div className="absolute top-4 right-4 bg-restaurant-gold/90 text-white text-xs font-medium px-2 py-1 rounded">
                        Site touristique
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-restaurant-navy mb-2">{spot.name}</h3>
                      <p className="text-gray-600 mb-4">{spot.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin size={16} className="mr-1" />
                          <span>{spot.location}</span>
                        </div>
                        <div className="flex">
                          {Array(5).fill(null).map((_, i) => <Star key={i} size={16} className={`${i < 4 ? 'text-restaurant-gold' : 'text-gray-300'}`} fill={i < 4 ? 'currentColor' : 'none'} />)}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </section>}

        {/* Spot Details Section */}
        {selectedSpot && <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <button onClick={() => setSelectedSpot(null)} className="text-restaurant-navy inline-flex items-center text-sm mb-2">
                    <ChevronRight className="rotate-180 mr-1" size={16} />
                    Retour aux sites de {currentLocation?.name}
                  </button>
                  <h2 className="text-3xl font-bold text-restaurant-navy">{currentSpot?.name}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-xl font-bold text-restaurant-navy mb-4">
                      Présentation
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {currentSpot?.unlocked ? currentSpot.fullDescription : currentSpot?.preview}
                    </p>
                    
                    {!currentSpot?.unlocked && <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-restaurant-gold/10 text-restaurant-gold p-2 rounded-full">
                            <CreditCard size={20} />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">
                              Accès aux informations détaillées
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                              Déverrouillez ce contenu pour accéder aux informations complètes, 
                              conseils pratiques et contact du guide local.
                            </p>
                            <button onClick={openPaymentDialog} className="mt-3 button-primary text-sm">
                              Déverrouiller pour 5 €
                            </button>
                          </div>
                        </div>
                      </div>}
                    
                    {currentSpot?.unlocked && <>
                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-restaurant-navy mb-3">
                            Conseils pratiques
                          </h3>
                          <p className="text-gray-600">
                            {currentSpot.tips}
                          </p>
                        </div>
                        
                        <div className="bg-restaurant-gold/10 rounded-lg p-4">
                          <h3 className="text-lg font-bold text-restaurant-navy mb-2">
                            Contact du guide local
                          </h3>
                          <div className="flex items-center text-gray-600">
                            <Mail size={16} className="mr-2 text-restaurant-gold" />
                            <span>{currentSpot.guideContact}</span>
                          </div>
                        </div>
                      </>}
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-restaurant-navy mb-4">
                      Galerie photos
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentSpot?.gallery.slice(0, 3).map((image, index) => <div key={index} className="rounded-lg overflow-hidden h-40">
                          <Image src={image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`${currentSpot.name} - Photo ${index + 1}`} width={500} height={300} />
                        </div>)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-bold text-restaurant-navy mb-4">
                      Localisation
                    </h3>
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <Image src="https://placehold.co/600x600/e2e8f0/64748b?text=Carte+interactive" className="w-full h-full object-cover" width={500} height={300} />
                    </div>
                    <p className="text-gray-600 mb-2">
                      <strong>Adresse:</strong> {currentSpot?.location}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="button-outline-navy w-full text-sm mb-2">
                            Voir sur Google Maps
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ouvrir dans Google Maps</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <button className="button-outline-navy w-full text-sm">
                      Obtenir les directions
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-restaurant-navy mb-4">
                      Restaurants à proximité
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Découvrez notre sélection de restaurants traditionnels à proximité.
                    </p>
                    <Link href="/restaurant" className="button-primary w-full text-sm">
                      Explorer les restaurants
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>}
      </div>
      
      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={closePaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Déverrouiller {currentSpot?.name}</DialogTitle>
            <DialogDescription>
              Choisissez votre méthode de paiement préférée pour accéder aux informations complètes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <button className={`flex flex-col items-center justify-center p-4 rounded-lg border ${paymentMethod === 'card' ? 'border-restaurant-gold bg-restaurant-gold/10' : 'border-gray-200'}`} onClick={() => setPaymentMethod('card')}>
              <CreditCard className={`mb-2 ${paymentMethod === 'card' ? 'text-restaurant-gold' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-restaurant-gold' : 'text-gray-700'}`}>
                Carte bancaire
              </span>
            </button>
            
            <button className={`flex flex-col items-center justify-center p-4 rounded-lg border ${paymentMethod === 'mobile' ? 'border-restaurant-gold bg-restaurant-gold/10' : 'border-gray-200'}`} onClick={() => setPaymentMethod('mobile')}>
              <Mail className={`mb-2 ${paymentMethod === 'mobile' ? 'text-restaurant-gold' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${paymentMethod === 'mobile' ? 'text-restaurant-gold' : 'text-gray-700'}`}>
                Mobile Money
              </span>
            </button>
          </div>
          
          {paymentMethod === 'card' ? <form onSubmit={handleSubmitCard(onSubmitCardPayment)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Numéro de carte
                  </label>
                  <input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" className="input" {...registerCard('cardNumber')} />
                  {cardErrors.cardNumber && <p className="text-red-500 text-xs">{cardErrors.cardNumber.message}</p>}
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="cardName" className="text-sm font-medium">
                    Nom sur la carte
                  </label>
                  <input id="cardName" type="text" placeholder="Jean Dupont" className="input" {...registerCard('cardName')} />
                  {cardErrors.cardName && <p className="text-red-500 text-xs">{cardErrors.cardName.message}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="expiryDate" className="text-sm font-medium">
                      Date d'expiration
                    </label>
                    <input id="expiryDate" type="text" placeholder="MM/YY" className="input" {...registerCard('expiryDate')} />
                    {cardErrors.expiryDate && <p className="text-red-500 text-xs">{cardErrors.expiryDate.message}</p>}
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <input id="cvv" type="text" placeholder="123" className="input" {...registerCard('cvv')} />
                    {cardErrors.cvv && <p className="text-red-500 text-xs">{cardErrors.cvv.message}</p>}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email pour le reçu
                  </label>
                  <input id="email" type="email" placeholder="exemple@email.com" className="input" {...registerCard('email')} />
                  {cardErrors.email && <p className="text-red-500 text-xs">{cardErrors.email.message}</p>}
                </div>
              </div>
              
              <DialogFooter>
                <button type="button" className="button-outline" onClick={closePaymentDialog} disabled={processingPayment}>
                  Annuler
                </button>
                <button type="submit" className="button-primary" disabled={processingPayment}>
                  {processingPayment ? 'Traitement en cours...' : 'Payer 5 €'}
                </button>
              </DialogFooter>
            </form> : <form onSubmit={handleSubmitMobile(onSubmitMobilePayment)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium">
                    Numéro de téléphone
                  </label>
                  <input id="phoneNumber" type="text" placeholder="6XXXXXXXX" className="input" {...registerMobile('phoneNumber')} />
                  {mobileErrors.phoneNumber && <p className="text-red-500 text-xs">{mobileErrors.phoneNumber.message}</p>}
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Nom complet
                  </label>
                  <input id="fullName" type="text" placeholder="Jean Dupont" className="input" {...registerMobile('fullName')} />
                  {mobileErrors.fullName && <p className="text-red-500 text-xs">{mobileErrors.fullName.message}</p>}
                </div>
              </div>
              
              <DialogFooter>
                <button type="button" className="button-outline" onClick={closePaymentDialog} disabled={processingPayment}>
                  Annuler
                </button>
                <button type="submit" className="button-primary" disabled={processingPayment}>
                  {processingPayment ? 'Traitement en cours...' : 'Payer 5 €'}
                </button>
              </DialogFooter>
            </form>}
        </DialogContent>
      </Dialog>
    </>;
};

export default TourismePage;