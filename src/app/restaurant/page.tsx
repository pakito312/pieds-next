'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ImageGallery from '@/components/ImageGallery';
import { restaurantGalleryImages } from '@/config/galleryImages';
import SEO from "@/components/SEO";

const RestaurantPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('about');

  // Menu items data
  const menuCategories = [{
    id: 'entrees',
    name: 'Entrées',
    items: [{
      name: 'Crevettes Flambées au Whisky',
      description: 'Crevettes fraîches flambées au whisky, accompagnées d\'une sauce légèrement épicée',
      price: '8.500 FCFA',
      popular: true
    }, {
      name: 'Salade de Papaye Verte',
      description: 'Papaye verte râpée, tomates cerises, arachides et vinaigrette citronnée',
      price: '4.500 FCFA',
      popular: false
    }, {
      name: 'Accras de Poisson',
      description: 'Beignets croustillants de poisson blanc, servis avec une sauce aigre-douce',
      price: '5.500 FCFA',
      popular: true
    }]
  }, {
    id: 'plats',
    name: 'Plats Principaux',
    items: [{
      name: 'Poisson Braisé',
      description: 'Poisson entier braisé, mariné aux épices locales, servi avec plantains et légumes grillés',
      price: '15.000 FCFA',
      popular: true
    }, {
      name: 'Poulet DG',
      description: 'Poulet mijoté avec plantains mûrs, tomates et épices, plat emblématique camerounais',
      price: '12.000 FCFA',
      popular: true
    }, {
      name: 'Ndolé aux Crevettes',
      description: 'Feuilles de ndolé mijotées avec crevettes, accompagnées de riz blanc ou plantains',
      price: '13.500 FCFA',
      popular: false
    }, {
      name: 'Filet de Capitaine Grillé',
      description: 'Filet de capitaine grillé, sauce au beurre blanc et citron, servi avec purée de manioc et légumes',
      price: '17.000 FCFA',
      popular: false
    }]
  }, {
    id: 'desserts',
    name: 'Desserts',
    items: [{
      name: 'Tarte aux Fruits Exotiques',
      description: 'Tarte croustillante garnie de fruits de saison (mangue, ananas, papaye)',
      price: '6.500 FCFA',
      popular: true
    }, {
      name: 'Crème Brûlée à la Vanille de Madagascar',
      description: 'Crème onctueuse à la vanille, caramélisée au sucre brun',
      price: '7.000 FCFA',
      popular: false
    }, {
      name: 'Mousse au Chocolat et Piment',
      description: 'Mousse au chocolat noir légèrement relevée de piment, pour une touche d\'originalité',
      price: '6.000 FCFA',
      popular: true
    }]
  }, {
    id: 'boissons',
    name: 'Boissons',
    items: [{
      name: 'Jus de Fruits Frais',
      description: 'Ananas, papaye, fruit de la passion ou gingembre',
      price: '3.500 FCFA',
      popular: true
    }, {
      name: 'Cocktail Pieds Dans l\'eau',
      description: 'Spécialité du restaurant à base de rhum, fruits de la passion et jus d\'ananas',
      price: '8.000 FCFA',
      popular: true
    }, {
      name: 'Sélection de Vins',
      description: 'Demandez notre carte des vins au serveur',
      price: 'à partir de 20.000 FCFA',
      popular: false
    }]
  }];

  // Chef information
  const chefInfo = {
    name: "Jean-Pierre Mbarga",
    title: "Chef Exécutif",
    bio: "Jean-Pierre Mbarga, originaire de Kribi, a perfectionné son art culinaire dans les plus grands restaurants d'Europe avant de revenir au Cameroun. Sa cuisine fusionne avec brio les techniques gastronomiques internationales et les saveurs locales camerounaises. Il privilégie les produits frais de la région, notamment les fruits de mer pêchés quotidiennement.",
    philosophy: "Ma philosophie est simple : respecter le produit, sublimer les saveurs locales et raconter une histoire avec chaque plat. La cuisine est un héritage que nous devons préserver tout en l'enrichissant de créativité.",
    signature: "Capitaine grillé aux épices locales et sa sauce aux agrumes"
  };
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
      <SEO title="Notre Restaurant - Pieds dans l'eau Soa" description="Découvrez notre restaurant traditionnel camerounais à Soa. Menu varié, cuisine authentique et cadre exceptionnel au bord de l'eau." canonical="/restaurant" />
      
      <div className="min-h-screen" ref={scrollRef}>
        {/* Hero Section */}
        <section className="relative py-20 flex items-center justify-center overflow-hidden" style={{
        backgroundImage: 'url(/uploads/03f7af76-87c5-4cf8-a2ae-1fb48a0ff5e1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '70vh'
      }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70 z-10"></div>
          
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
                Notre Restaurant
              </span>
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">
                Une expérience unique au bord de l'eau
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Dégustez notre cuisine raffinée dans un cadre exceptionnel,
                les pieds dans l'eau, face à l'océan.
              </p>
              <Link href="/reservation" className="button-primary">
                Réserver une table
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-10 bg-white">
          <div className="container-custom">
            <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                <TabsTrigger value="about" className="py-3">À propos</TabsTrigger>
                <TabsTrigger value="menu" className="py-3">Menu</TabsTrigger>
                <TabsTrigger value="gallery" className="py-3">Galerie</TabsTrigger>
                <TabsTrigger value="info" className="py-3">Informations</TabsTrigger>
              </TabsList>
              
              {/* About Tab Content */}
              <TabsContent value="about" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start animate-on-scroll">
                  <div>
                    <h2 className="text-3xl font-bold text-restaurant-dark mb-6">
                      Notre Histoire
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Fondé en 2010 sur les rives pittoresques de Kribi, Pieds Dans l'eau est né de la passion d'un groupe d'amis désireux d'offrir une expérience culinaire unique au Cameroun. Notre restaurant sur pilotis a été construit dans le respect des traditions architecturales locales, utilisant des matériaux durables et respectueux de l'environnement.
                    </p>
                    <p className="text-gray-700 mb-6">
                      Niché directement sur l'eau, notre établissement offre une immersion totale dans la beauté naturelle de la région. La conception ouverte permet aux clients de profiter de la brise marine et des sons apaisants de l'eau tout en savourant leur repas.
                    </p>
                    <p className="text-gray-700">
                      Au fil des années, nous avons su évoluer tout en restant fidèles à notre vision initiale : créer un lieu où gastronomie et nature se rencontrent harmonieusement. Chaque plat servi chez Pieds Dans l'eau raconte une histoire, celle de notre terroir et de notre passion pour la cuisine.
                    </p>
                  </div>
                  <div>
                    <div className="aspect-video rounded-lg overflow-hidden mb-6">
                      <Image src="/uploads/57f03e81-eecb-464b-a0c3-5eccf1b1c77f.png" className="w-full h-full object-cover" width={500} height={300} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg overflow-hidden">
                        <Image src="/uploads/1adddd21-4d51-4dde-8b34-60330b106659.png" className="w-full h-40 object-cover" width={500} height={300} />
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <Image src="/uploads/dc73d99d-f065-4b1f-bdce-be4216481f0f.png" className="w-full h-40 object-cover" width={500} height={300} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 animate-on-scroll">
                  <div className="bg-restaurant-cream p-8 rounded-lg">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="md:w-1/3">
                        <div className="rounded-full overflow-hidden w-32 h-32 mx-auto md:mx-0 mb-4">
                          <Image src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80" className="w-full h-full object-cover" width={500} height={300} />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold text-restaurant-dark">{chefInfo.name}</h3>
                          <p className="text-restaurant-orange">{chefInfo.title}</p>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-2xl font-bold text-restaurant-dark mb-4">Notre Chef</h3>
                        <p className="text-gray-700 mb-4">
                          {chefInfo.bio}
                        </p>
                        <p className="text-gray-700 mb-4">
                          <span className="font-medium">Sa philosophie :</span> "{chefInfo.philosophy}"
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Plat signature :</span> {chefInfo.signature}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Menu Tab Content */}
              <TabsContent value="menu" className="mt-8 animate-on-scroll">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-restaurant-dark mb-3">
                    Notre Menu
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Une sélection de plats qui met en valeur les produits locaux et les saveurs du Cameroun, 
                    avec une touche de créativité gastronomique internationale.
                  </p>
                </div>

                <div className="space-y-12">
                  {menuCategories.map(category => <div key={category.id} className="animate-on-scroll">
                      <h3 className="text-2xl font-bold text-restaurant-dark mb-6 flex items-center">
                        <span className="w-8 h-0.5 bg-restaurant-orange mr-3"></span>
                        {category.name}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {category.items.map((item, index) => <div key={index} className={`p-5 rounded-lg border ${item.popular ? 'border-restaurant-orange/30 bg-restaurant-orange/5' : 'border-gray-100'}`}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-bold text-restaurant-dark">
                                {item.name}
                                {item.popular && <span className="ml-2 inline-block bg-restaurant-orange text-white text-xs py-0.5 px-2 rounded-full">
                                    Populaire
                                  </span>}
                              </h4>
                              <span className="font-medium text-restaurant-orange">{item.price}</span>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                          </div>)}
                      </div>
                    </div>)}
                </div>

                <div className="mt-16 text-center animate-on-scroll">
                  <Link href="/reservation" className="button-primary">
                    Réserver une table
                  </Link>
                </div>
              </TabsContent>
              
              {/* Gallery Tab Content */}
              <TabsContent value="gallery" className="mt-8 animate-on-scroll">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-restaurant-dark mb-3">
                    Notre Galerie
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Découvrez l'atmosphère unique de notre restaurant, directement sur l'eau,
                    ainsi que nos plats signature et nos espaces.
                  </p>
                </div>

                <ImageGallery images={restaurantGalleryImages} className="animate-on-scroll" />
              </TabsContent>
              
              {/* Info Tab Content */}
              <TabsContent value="info" className="mt-8 animate-on-scroll">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold text-restaurant-dark mb-6">
                      Informations Pratiques
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <MapPin size={24} className="text-restaurant-orange mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-restaurant-dark mb-1">Adresse</h3>
                          <p className="text-gray-700">
                            Quartier Mboa-Manga<br />
                            Kribi, Cameroun
                          </p>
                          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-restaurant-orange hover:text-restaurant-forest inline-flex items-center mt-2 text-sm font-medium">
                            Voir sur Google Maps
                            <ChevronRight size={16} className="ml-1" />
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock size={24} className="text-restaurant-orange mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-restaurant-dark mb-1">Horaires d'ouverture</h3>
                          <p className="text-gray-700">
                            Lundi à Vendredi: 12h00 - 23h00<br />
                            Samedi et Dimanche: 11h00 - 00h00
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Dernière commande: 1 heure avant la fermeture
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone size={24} className="text-restaurant-orange mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-restaurant-dark mb-1">Contact</h3>
                          <p className="text-gray-700">
                            Téléphone: +237 677 357 155<br />
                            Réservations: +237 698 765 432
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail size={24} className="text-restaurant-orange mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-restaurant-dark mb-1">Email</h3>
                          <p className="text-gray-700">
                            info@pieds-dansleau.com<br />
                            reservations@pieds-dansleau.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="rounded-lg overflow-hidden h-64 mb-6">
                      <Image src="/uploads/1adddd21-4d51-4dde-8b34-60330b106659.png" className="w-full h-full object-cover" width={500} height={300} />
                    </div>
                    
                    <div className="bg-restaurant-cream p-6 rounded-lg">
                      <h3 className="font-bold text-restaurant-dark mb-4">Informations supplémentaires</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-restaurant-dark">Stationnement:</span>
                          <p className="text-gray-700">Parking gratuit disponible sur place</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-restaurant-dark">Accessibilité:</span>
                          <p className="text-gray-700">Accessible aux personnes à mobilité réduite</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-restaurant-dark">Dress code:</span>
                          <p className="text-gray-700">Smart casual</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-restaurant-dark">Paiement:</span>
                          <p className="text-gray-700">Espèces, cartes de crédit, Mobile Money</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-restaurant-dark">Réservation:</span>
                          <p className="text-gray-700">Fortement recommandée, surtout le week-end</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 text-center animate-on-scroll">
                  <Link href="/reservation" className="button-primary">
                    Réserver une table
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-restaurant-forest text-white">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6">
                Prêt à vivre l'expérience Pieds Dans l'eau ?
              </h2>
              <p className="text-white/80 mb-8">
                Réservez dès maintenant votre table et venez déguster notre cuisine raffinée
                dans un cadre exceptionnel, les pieds dans l'eau.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/reservation" className="button-primary">
                  Réserver une table
                </Link>
                <a href="tel:+237654321987" className="button-outline">
                  Nous appeler
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
};



export default RestaurantPage;