'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';;
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-restaurant-navy text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Image src="/uploads/6b0f4bd8-4378-46b9-9ba0-6b09bd6832c5.png" className="h-16 mr-2"  width={75} height={75} />
            </div>
            <h3 className="text-restaurant-blue text-2xl font-bold">
              <span className="text-restaurant-green">Pieds</span> Dans l'eau
            </h3>
            <p className="text-gray-300 max-w-xs">
              Une expérience culinaire exceptionnelle au bord de l'eau, alliant saveurs locales et cuisine internationale raffinée.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://www.facebook.com/share/1H1qGNP9Vm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-restaurant-green transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/pieds_dans_eau?igsh=MTRwYTI4c2R2aHl2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-restaurant-green transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-restaurant-green transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-restaurant-lightBlue text-xl font-bold mb-6">
              Liens rapides
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-restaurant-green transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/restaurant" className="text-gray-300 hover:text-restaurant-green transition-colors">
                  Le Restaurant
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-gray-300 hover:text-restaurant-green transition-colors">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/tourisme" className="text-gray-300 hover:text-restaurant-green transition-colors">
                  Visiter le Cameroun
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-restaurant-lightBlue text-xl font-bold mb-6">
              Horaires
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex justify-between items-center">
                <span>Lundi - Vendredi:</span>
                <span>10h - 20h</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Samedi:</span>
                <span>10h - 00h</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Dimanche:</span>
                <span>10h - 22h</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-restaurant-lightBlue text-xl font-bold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-restaurant-green flex-shrink-0 mt-1" />
                <span className="text-gray-300"> Soa, Cameroun</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-restaurant-green flex-shrink-0" />
                <span className="text-gray-300">+237 677 357 155</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-restaurant-green flex-shrink-0" />
                <span className="text-gray-300">contact@pieds-dansleau.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Pieds Dans l'eau. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;