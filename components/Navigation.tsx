'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from './CartProvider';
import { CartDrawer } from './CartDrawer';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems: cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center text-sm tracking-wide">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl transition-transform duration-500 group-hover:rotate-12">🧴</span>
            <span className={`font-bold text-lg transition-colors duration-500 ${
              scrolled ? 'text-amber-900' : 'text-gray-900'
            }`}>
              PERFUMES <span className="font-light">PREMIUM</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-600 hover:text-amber-900 font-medium transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-amber-700 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
            
            <Link
              href="/admin"
              className="bg-amber-900 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-800 hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300 active:scale-95"
            >
              Painel Admin
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative bg-transparent px-3 py-2 rounded-full text-gray-700 hover:text-amber-900">
              🛒
              <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 font-medium hover:text-amber-900"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-amber-900 font-bold"
          >
            PAINEL ADMIN
          </Link>
        </div>
      </div>
    </nav>
  );
}