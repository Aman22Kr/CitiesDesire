import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, Search, CheckCircle, Sparkles, UtensilsCrossed } from 'lucide-react';
import { OUTLETS, ASSET_IMAGES } from '../data/mockData';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const OutletsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = [
    { id: 'all', label: 'All Locations' },
    { id: 'Delhi', label: 'Delhi' },
    { id: 'Gurugram', label: 'Gurugram' },
    { id: 'Noida', label: 'Noida' },
    { id: 'Punjab', label: 'Punjab (Ludhiana & Mohali)' },
    { id: 'Bangkok', label: 'Bangkok (International)' },
  ];

  const filteredOutlets = useMemo(() => {
    return OUTLETS.filter((outlet) => {
      // City filter
      if (selectedCity === 'Punjab') {
        if (outlet.city !== 'Ludhiana' && outlet.city !== 'Mohali') return false;
      } else if (selectedCity !== 'all' && outlet.city !== selectedCity) {
        return false;
      }

      // Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = outlet.name.toLowerCase().includes(query);
        const matchesAddress = outlet.address.toLowerCase().includes(query);
        const matchesLandmark = outlet.landmark.toLowerCase().includes(query);
        const matchesCity = outlet.city.toLowerCase().includes(query);
        if (!matchesName && !matchesAddress && !matchesLandmark && !matchesCity) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCity, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
            Grand Culinary Footprint
          </span>
          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4] mt-2">
            Our Outlets &amp; Dining Sanctuaries
          </h1>
          <p className="mt-4 text-sm text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
            Experience the royal 1947 hospitality across 15+ premier destinations in India and our international flagship in Bangkok.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#78716c]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, mall, or landmark..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#141210] border border-[#292524] focus:border-[#c29b38] rounded-lg text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-[#0c0a09]/95 backdrop-blur-md border-b border-[#292524] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                selectedCity === city.id
                  ? 'bg-[#c29b38] text-[#0c0a09] font-bold shadow-sm'
                  : 'bg-[#141210] text-[#a8a29e] hover:text-[#f5f5f4] hover:bg-[#1c1917] border border-[#292524]'
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>
      </section>

      {/* Outlets Listing */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-6">
          <span>
            Showing <span className="text-[#f5f5f4] font-semibold">{filteredOutlets.length}</span> outlets
          </span>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#c29b38] hover:underline">
              Clear search
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOutlets.map((outlet) => (
            <div
              key={outlet.id}
              className="p-6 rounded-xl bg-[#141210] border border-[#292524] hover:border-[#c29b38]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c29b38]">
                      {outlet.city} · {outlet.region}
                    </span>
                    <h3 className="font-heritage text-xl font-bold text-[#f5f5f4] mt-0.5">
                      {outlet.name}
                    </h3>
                  </div>

                  {outlet.isGoldEdition && (
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#c29b38] bg-[#1c1917] px-2 py-0.5 rounded border border-[#c29b38]/40 shrink-0">
                      Gold Edition
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-xs text-[#a8a29e] mt-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#d6d3d1]">{outlet.address}</p>
                      <p className="text-[#78716c] text-[11px] mt-0.5">Near {outlet.landmark}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#c29b38] shrink-0" />
                    <span>{outlet.timing}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#c29b38] shrink-0" />
                    <span className="font-mono text-[#f5f5f4]">{outlet.phone}</span>
                  </div>
                </div>

                {/* Features & amenities */}
                <div className="mt-5 pt-4 border-t border-[#292524] flex flex-wrap gap-1.5">
                  {outlet.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#1c1917] text-[#a8a29e] border border-[#292524]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#292524] flex items-center justify-between gap-3">
                <a
                  href={outlet.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#a8a29e] hover:text-[#f5f5f4] transition-colors flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#c29b38]" />
                  Directions
                </a>

                <Link
                  to={`/book-table?outlet=${outlet.id}`}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Book Table
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Global Franchising &amp; Expansion" />
    </div>
  );
};
