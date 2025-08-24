'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  region: string;
  inStock: boolean;
}

const BoutiquePage = () => {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const products: Product[] = [{
    id: 1,
    name: "Masque Bamiléké",
    description: "Masque traditionnel de la région Ouest camerounaise, taillé en bois et orné de motifs symboliques.",
    price: 75000,
    category: "decoration",
    image: "/uploads/03f7af76-87c5-4cf8-a2ae-1fb48a0ff5e1.png",
    region: "ouest",
    inStock: true
  }, {
    id: 2,
    name: "Panier Tikar",
    description: "Panier tressé à la main par les artisans de l'ethnie Tikar, idéal pour le rangement ou la décoration.",
    price: 15000,
    category: "maison",
    image: "/uploads/57f03e81-eecb-464b-a0c3-5eccf1b1c77f.png",
    region: "centre",
    inStock: true
  }, {
    id: 3,
    name: "Pagne Ndop",
    description: "Tissu traditionnel Bamiléké avec motifs géométriques, teint à l'indigo selon les méthodes ancestrales.",
    price: 25000,
    category: "textile",
    image: "/uploads/50218001-9257-4d1e-adf9-4c4af1778819.png",
    region: "ouest",
    inStock: true
  }, {
    id: 4,
    name: "Statuette Bamoun",
    description: "Statuette en bronze représentant un roi Bamoun, fabriquée selon les techniques traditionnelles de fonte.",
    price: 120000,
    category: "decoration",
    image: "/uploads/41c9a456-0086-4074-82dc-b5aeea39c96a.png",
    region: "ouest",
    inStock: false
  }, {
    id: 5,
    name: "Tabouret Bamiléké",
    description: "Tabouret royal sculpté dans un seul bloc de bois, utilisé pour les cérémonies traditionnelles.",
    price: 85000,
    category: "mobilier",
    image: "/uploads/106b2d75-d369-47f8-a8c3-fcdd945af53f.png",
    region: "ouest",
    inStock: true
  }, {
    id: 6,
    name: "Calebasse Gravée",
    description: "Calebasse décorée de motifs gravés à la main, utilisée traditionnellement pour servir les boissons.",
    price: 18000,
    category: "maison",
    image: "/uploads/0da3af2e-bc3a-4d80-99c2-08c477c1efcd.png",
    region: "nord",
    inStock: true
  }, {
    id: 7,
    name: "Bijou Fulani",
    description: "Parure en argent inspirée des traditions Fulani, idéale pour les occasions spéciales.",
    price: 45000,
    category: "bijoux",
    image: "/uploads/1adddd21-4d51-4dde-8b34-60330b106659.png",
    region: "nord",
    inStock: true
  }, {
    id: 8,
    name: "Tam-tam Bassa",
    description: "Tambour traditionnel utilisé lors des cérémonies dans la région du Littoral.",
    price: 65000,
    category: "musique",
    image: "/uploads/eb43f39b-2601-4926-b7b8-bea67daf0ca2.png",
    region: "littoral",
    inStock: true
  }];
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesRegion = selectedRegion === 'all' || product.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });
  const categories = [{
    id: 'all',
    name: 'Tous'
  }, {
    id: 'decoration',
    name: 'Décoration'
  }, {
    id: 'maison',
    name: 'Maison'
  }, {
    id: 'textile',
    name: 'Textile'
  }, {
    id: 'mobilier',
    name: 'Mobilier'
  }, {
    id: 'bijoux',
    name: 'Bijoux'
  }, {
    id: 'musique',
    name: 'Instruments'
  }];
  const regions = [{
    id: 'all',
    name: 'Toutes les régions'
  }, {
    id: 'ouest',
    name: 'Ouest'
  }, {
    id: 'centre',
    name: 'Centre'
  }, {
    id: 'nord',
    name: 'Nord'
  }, {
    id: 'littoral',
    name: 'Littoral'
  }, {
    id: 'sud',
    name: 'Sud'
  }, {
    id: 'est',
    name: 'Est'
  }];
  const addToCart = (product: Product) => {
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000
    });
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };
  return <>
      <SEO title="Boutique de Produits Artisanaux - Pieds dans l'eau Soa" description="Achetez des produits artisanaux et traditionnels camerounais dans notre boutique. Artisanat local, souvenirs authentiques et spécialités régionales." canonical="/boutique" />
      
      <div className="min-h-screen bg-restaurant-cream pt-20">
        <section className="relative py-16 bg-restaurant-forest text-white">
          <div className="container-custom text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <span className="inline-block bg-restaurant-orange text-white text-sm font-medium py-1 px-4 rounded-full mb-4">
                Boutique Artisanale
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Artisanat Traditionnel Camerounais
              </h1>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Découvrez notre sélection d'objets artisanaux authentiques, confectionnés par des artisans locaux 
                selon les traditions ancestrales camerounaises.
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input type="text" placeholder="Rechercher un produit..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <div className="flex flex-col w-full md:w-auto">
                <Button variant="outline" className="flex items-center justify-between" onClick={() => setShowFilters(!showFilters)}>
                  <Filter size={18} className="mr-2" />
                  Filtres
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
                
                {showFilters && <div className="mt-4 p-4 bg-white rounded-md shadow-md">
                    <h3 className="font-medium mb-2">Région</h3>
                    <div className="flex flex-wrap gap-2">
                      {regions.map(region => <Badge key={region.id} variant={selectedRegion === region.id ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedRegion(region.id)}>
                          {region.name}
                        </Badge>)}
                    </div>
                  </div>}
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="mb-6 flex flex-wrap">
                {categories.map(category => <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>)}
              </TabsList>
              
              <Separator className="mb-8" />
              
              <TabsContent value={activeCategory}>
                {filteredProducts.length === 0 ? <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Aucun produit ne correspond à votre recherche.</p>
                    <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                  setSelectedRegion('all');
                }}>
                      Réinitialiser les filtres
                    </Button>
                  </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => <motion.div key={product.id} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.4
                }}>
                        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48 overflow-hidden">
                            <Image src={product.image} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" alt={product.name} width={500} height={300} />
                            {!product.inStock && <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rupture de stock
                                </span>
                              </div>}
                          </div>
                          
                          <CardContent className="flex-grow pt-4">
                            <div className="flex justify-between items-start mb-2">
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <Badge>{formatPrice(product.price)}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <Badge variant="outline" className="mt-2">
                              {regions.find(r => r.id === product.region)?.name || product.region}
                            </Badge>
                          </CardContent>
                          
                          <CardFooter className="pt-0">
                            <Button className="w-full" disabled={!product.inStock} onClick={() => addToCart(product)}>
                              <ShoppingCart size={16} className="mr-2" />
                              Ajouter au panier
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>)}
                  </div>}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-restaurant-dark">Artisanat Camerounais</h2>
                <p className="text-gray-700 mb-4">
                  Le Cameroun est connu pour sa riche diversité culturelle et son artisanat traditionnel exceptionnel. 
                  Chaque région du pays possède ses propres techniques et spécialités artisanales, transmises de génération en génération.
                </p>
                <p className="text-gray-700 mb-4">
                  Notre sélection met en valeur le savoir-faire des artisans camerounais, en proposant des pièces 
                  authentiques qui racontent l'histoire et l'héritage culturel du pays.
                </p>
                <p className="text-gray-700">
                  En achetant ces produits, vous soutenez directement les communautés locales et contribuez à la 
                  préservation de techniques artisanales ancestrales.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image src="/uploads/50218001-9257-4d1e-adf9-4c4af1778819.png" className="rounded-lg h-48 w-full object-cover" width={500} height={300} />
                <Image src="/uploads/41c9a456-0086-4074-82dc-b5aeea39c96a.png" className="rounded-lg h-48 w-full object-cover" width={500} height={300} />
                <Image src="/uploads/0da3af2e-bc3a-4d80-99c2-08c477c1efcd.png" className="rounded-lg h-48 w-full object-cover" width={500} height={300} />
                <Image src="/uploads/106b2d75-d369-47f8-a8c3-fcdd945af53f.png" className="rounded-lg h-48 w-full object-cover" width={500} height={300} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
};

export default BoutiquePage;