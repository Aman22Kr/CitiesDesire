import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Welcome to the CitiesDesire Heritage Dining Guild!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#090807] border-t border-[#292524] text-[#a8a29e]">
      {/* Top Banner / Core Brand Statement */}
      <div className="border-b border-[#292524] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#c29b38]/40 bg-[#141210] flex items-center justify-center text-[#c29b38] shrink-0">
              <span className="font-heritage text-2xl font-bold">1947</span>
            </div>
            <div>
              <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4] tracking-wide">
                CitiesDesire
              </h3>
              <p className="text-xs text-[#c29b38] tracking-widest uppercase mt-0.5">
                By the Inventors of Butter Chicken &amp; Dal Makhani
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#a8a29e]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c29b38]" />
              <span>NDTV Food Awards Winner 2025</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c29b38]" />
              <span>100% Pure Ghee &amp; Desi Makhan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Heritage Summary */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm leading-relaxed text-[#d6d3d1]">
              Rooted in the resilient spirit of 1947 Delhi, CitiesDesire honors the pioneering culinary legacy of Shri Kundan Lal Jaggi. Every handi of our slow-cooked Dal Makhani and velvety Butter Chicken is prepared in accordance with the timeless, unadulterated recipe.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#c29b38] shrink-0" />
                <span>Central Flagship: Parliament Street, Connaught Place, New Delhi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c29b38] shrink-0" />
                <span>Concierge &amp; Reservations: +91 11 4151 1947</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c29b38] shrink-0" />
                <span>Guest Services: concierge@citiesdesire.in</span>
              </div>
            </div>
          </div>

          {/* Column 2: Culinary Subpages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f5f4] mb-4">
              Explore Menu
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu?category=signature" className="hover:text-[#c29b38] transition-colors">
                  1947 Original Classics
                </Link>
              </li>
              <li>
                <Link to="/menu?category=starters" className="hover:text-[#c29b38] transition-colors">
                  Charcoal Bhatti Kebabs
                </Link>
              </li>
              <li>
                <Link to="/menu?category=mains" className="hover:text-[#c29b38] transition-colors">
                  Slow-simmered Gravies
                </Link>
              </li>
              <li>
                <Link to="/menu?category=breads" className="hover:text-[#c29b38] transition-colors">
                  Tandoori Breads &amp; Naans
                </Link>
              </li>
              <li>
                <Link to="/menu?category=desserts" className="hover:text-[#c29b38] transition-colors">
                  Purani Dilli Desserts
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-[#c29b38] transition-colors">
                  5-Senses Delivery Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand & Operations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f5f4] mb-4">
              The Brand
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/story" className="hover:text-[#c29b38] transition-colors">
                  Our 1947 Heritage Story
                </Link>
              </li>
              <li>
                <Link to="/outlets" className="hover:text-[#c29b38] transition-colors">
                  Outlets &amp; Locations
                </Link>
              </li>
              <li>
                <Link to="/book-table" className="hover:text-[#c29b38] transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link to="/awards" className="hover:text-[#c29b38] transition-colors">
                  Awards &amp; Shark Tank
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#c29b38] transition-colors">
                  Careers &amp; Apprenticeship
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#c29b38] transition-colors">
                  Contact &amp; Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Club */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f5f5f4] mb-4">
              Heritage Club
            </h4>
            <p className="text-xs text-[#a8a29e] mb-3 leading-relaxed">
              Subscribe for private tasting invitations, seasonal chef creations, and Gold dining access.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs bg-[#141210] border border-[#292524] rounded text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#c29b38]"
              />
              <button
                type="submit"
                className="w-full py-2 text-xs font-semibold tracking-wider uppercase text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors"
              >
                Join Dining Guild
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Attributions */}
      <div className="border-t border-[#292524] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} CitiesDesire Restaurant Group. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Client state stored in browser localStorage.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#a8a29e]">
              Built with <Heart className="w-3 h-3 text-[#c29b38] fill-[#c29b38]" /> for
              <span className="text-[#c29b38] font-mono ml-1">@Aman22kr</span>
            </span>
            <a
              href="https://github.com/Aman22kr/CitiesDesire"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8a29e] hover:text-[#c29b38] transition-colors font-mono"
            >
              GitHub Pages Deployment
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
