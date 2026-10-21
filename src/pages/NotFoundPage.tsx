import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-[#0c0a09] text-[#f5f5f4] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#1c1917] border border-[#c29b38] flex items-center justify-center text-[#c29b38] mb-6">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38] px-3 py-1 rounded bg-[#141210] border border-[#292524]">
        Error 404 · Destination Not Found
      </span>

      <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4] mt-4">
        A Path Less Traveled
      </h1>

      <p className="mt-4 text-sm text-[#a8a29e] max-w-md mx-auto leading-relaxed">
        The archive page or dish you were searching for does not exist in our historical catalog. Let us guide you back to our culinary masterpieces.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Sanctuary
        </Link>
        <Link
          to="/menu"
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#f5f5f4] bg-[#141210] hover:bg-[#1c1917] border border-[#292524] rounded flex items-center gap-2"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#c29b38]" />
          Browse 1947 Menu
        </Link>
      </div>

      <AdPlaceholder className="mt-16" slotName="CitiesDesire Heritage Archive" />
    </div>
  );
};
