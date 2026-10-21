import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Bookmark, UtensilsCrossed } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItemCount, favorites, isAudioPlaying, toggleAudio } = useApp();
  const location = useLocation();

  const navLinks = [
    { label: 'Story', path: '/story' },
    { label: 'Menu', path: '/menu' },
    { label: 'Outlets', path: '/outlets' },
    { label: 'Reservations', path: '/book-table' },
    { label: '5-Senses Delivery', path: '/delivery' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0a09]/95 backdrop-blur-md border-b border-[#292524] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c29b38]"
          >
            <div className="w-10 h-10 rounded-full border border-[#c29b38]/40 bg-[#1c1917] flex items-center justify-center text-[#c29b38] group-hover:border-[#c29b38] transition-colors">
              <span className="font-heritage text-xl font-bold tracking-wider">CD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heritage text-2xl font-bold tracking-wider text-[#f5f5f4] group-hover:text-[#c29b38] transition-colors leading-none">
                CitiesDesire
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#a8a29e] uppercase mt-0.5">
                Est. 1947 Heritage
              </span>
            </div>
          </Link>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-[#c29b38] border-[#c29b38]'
                    : 'text-[#d6d3d1] border-transparent hover:text-white hover:border-[#c29b38]/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + minimal utility triggers */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Audio soundscape toggle */}
            <button
              onClick={toggleAudio}
              title={isAudioPlaying ? 'Mute 1947 Soundscape' : 'Play 1947 Sitar Soundscape'}
              className="p-2 rounded-lg text-[#a8a29e] hover:text-[#c29b38] hover:bg-[#1c1917] transition-colors focus-visible:ring-2 focus-visible:ring-[#c29b38]"
              aria-label="Toggle ambient soundscape"
            >
              {isAudioPlaying ? (
                <div className="flex items-center gap-1.5 text-xs text-[#c29b38]">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="hidden xl:inline text-[11px] font-mono">1947 AUDIO</span>
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Saved favorites link */}
            <Link
              to="/menu?favorites=true"
              title="Saved Dishes"
              className="relative p-2 rounded-lg text-[#a8a29e] hover:text-[#c29b38] hover:bg-[#1c1917] transition-colors focus-visible:ring-2 focus-visible:ring-[#c29b38]"
              aria-label="View favorite dishes"
            >
              <Bookmark className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#c29b38]" />
              )}
            </Link>

            {/* Cart / Bag trigger */}
            <Link
              to="/delivery"
              className="relative p-2 rounded-lg text-[#a8a29e] hover:text-[#c29b38] hover:bg-[#1c1917] transition-colors focus-visible:ring-2 focus-visible:ring-[#c29b38]"
              aria-label="View takeaway bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-4 h-4 text-[10px] font-bold rounded-full bg-[#c29b38] text-[#0c0a09] flex items-center justify-center tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Primary Action Button */}
            <Link
              to="/book-table"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-[#c29b38]/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c29b38]"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Reserve Table
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#d6d3d1] hover:text-[#c29b38] hover:bg-[#1c1917] rounded-md focus-visible:ring-2 focus-visible:ring-[#c29b38]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#292524] bg-[#141210] px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-[#c29b38] bg-[#1c1917]'
                    : 'text-[#d6d3d1] hover:text-white hover:bg-[#1c1917]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/awards"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#d6d3d1] hover:text-white hover:bg-[#1c1917] rounded-md"
            >
              Awards &amp; Shark Tank
            </Link>
            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#d6d3d1] hover:text-white hover:bg-[#1c1917] rounded-md"
            >
              Careers
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#d6d3d1] hover:text-white hover:bg-[#1c1917] rounded-md"
            >
              Contact &amp; Inquiries
            </Link>
          </div>

          <div className="pt-4 border-t border-[#292524] flex flex-col gap-2">
            <Link
              to="/book-table"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded-md transition-colors"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Reserve a Table
            </Link>
            <div className="text-center text-xs text-[#a8a29e] pt-1">
              Guest Care Hotline: <span className="text-[#c29b38] font-mono">+91 11 4151 1947</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
