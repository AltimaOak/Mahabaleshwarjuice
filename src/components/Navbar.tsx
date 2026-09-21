import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-cream-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">

          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/images/logo.png"
              alt="Mahabaleshwar Juice Center Mascot Logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight leading-none text-[#B91C1C]">
                Mahabaleshwar
              </span>
              <span className="font-heading font-black text-[11px] sm:text-xs tracking-wider text-[#2C8B33] uppercase leading-none mt-0.5">
                JUICE CENTER
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${active
                      ? 'bg-[#B91C1C] text-white shadow-2xs'
                      : 'text-earth-800 hover:text-[#B91C1C] hover:bg-cream-100'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">

            {/* Order Now Button (Red Pill Button) */}
            <Link
              to="/products"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
          </div>


          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-earth-800 hover:bg-cream-200"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-cream-300 px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-bold ${isActive(link.path)
                  ? 'bg-[#B91C1C] text-white'
                  : 'text-earth-800 hover:bg-cream-100'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-cream-200 space-y-2">
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#B91C1C] text-white font-bold text-sm shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
