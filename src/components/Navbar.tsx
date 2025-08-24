'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';;;
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Le Restaurant', path: '/restaurant' },
    { name: 'Réservation', path: '/reservation' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'Visiter le Cameroun', path: '/tourisme' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
           href="/" 
          className="flex items-center"
        >
          <div className="flex items-center">
            <Image src="/uploads/6b0f4bd8-4378-46b9-9ba0-6b09bd6832c5.png" className="h-12 mr-3"  width={75} height={75} />
            <div className="text-2xl md:text-3xl font-bold">
              <span className="text-restaurant-green">Pieds</span> <span className="text-restaurant-light-blue">Dans</span> <span className="text-restaurant-blue">l'eau</span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
               href={link.path}
              className={`navbar-link ${
                pathname === link.path ? 'navbar-active' : ''
              } ${link.path === '/boutique' ? 'flex items-center' : ''}`}
            >
              {link.path === '/boutique' && <ShoppingBag size={16} className="mr-1" />}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-restaurant-dark hover:text-restaurant-green transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen py-4 opacity-100 shadow-md' : 'max-h-0 py-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container-custom flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
               href={link.path}
              className={`block px-2 py-2 text-lg transition-colors duration-300 ${
                pathname === link.path
                  ? 'text-restaurant-green font-medium'
                  : 'text-restaurant-dark hover:text-restaurant-green'
              } ${link.path === '/boutique' ? 'flex items-center' : ''}`}
            >
              {link.path === '/boutique' && <ShoppingBag size={16} className="mr-2" />}
              {link.name}
            </Link>
          ))}
          <Link 
             href="/reservation" 
            className="button-primary text-center mt-4"
          >
            Réserver
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;