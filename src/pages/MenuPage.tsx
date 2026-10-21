import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Bookmark, ShoppingBag, Star, Flame, Sparkles, Filter, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleFavorite, isFavorite, addSearchQuery } = useApp();

  const categoryParam = searchParams.get('category') || 'all';
  const showFavoritesOnly = searchParams.get('favorites') === 'true';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'veg' | 'non-veg' | 'chef-special'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'spice'>('popular');

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'signature', label: '1947 Signatures' },
    { id: 'starters', label: 'Charcoal Starters' },
    { id: 'mains', label: 'Heritage Gravies' },
    { id: 'breads', label: 'Tandoor Breads' },
    { id: 'biryani', label: 'Biryani & Rice' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Beverages' },
  ];

  const handleCategoryChange = (catId: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', catId);
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addSearchQuery(searchQuery.trim());
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (categoryParam !== 'all' && item.category !== categoryParam) {
        return false;
      }
      // Favorites filter
      if (showFavoritesOnly && !isFavorite(item.id)) {
        return false;
      }
      // Dietary filter
      if (selectedDiet === 'veg' && !item.isVeg) return false;
      if (selectedDiet === 'non-veg' && item.isVeg) return false;
      if (selectedDiet === 'chef-special' && !item.isChefSpecial) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesSubtitle && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'spice') return b.spiceLevel - a.spiceLevel;
      return b.rating - a.rating; // Popular default
    });
  }, [categoryParam, showFavoritesOnly, selectedDiet, searchQuery, sortBy, isFavorite]);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
            Curated Heritage Flavors
          </span>
          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4] mt-2">
            The North Indian Culinary Collection
          </h1>
          <p className="mt-4 text-sm text-[#a8a29e] max-w-2xl mx-auto">
            From the 1947 originals to charcoal-roasted bhatti kebabs and slow-simmered gravies, each preparation is crafted with artisanal reverence.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-xl mx-auto relative flex items-center"
          >
            <Search className="absolute left-4 w-4 h-4 text-[#a8a29e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. Butter Chicken, Urad, Naan, Broccoli)..."
              className="w-full pl-11 pr-10 py-3 text-xs bg-[#141210] border border-[#292524] focus:border-[#c29b38] rounded-lg text-[#f5f5f4] placeholder-[#78716c] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-[#78716c] hover:text-[#f5f5f4]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </section>

      {/* Categories Bar & Filters */}
      <section className="sticky top-20 z-30 bg-[#0c0a09]/95 backdrop-blur-md border-b border-[#292524] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  categoryParam === cat.id && !showFavoritesOnly
                    ? 'bg-[#c29b38] text-[#0c0a09] font-semibold'
                    : 'bg-[#141210] text-[#a8a29e] hover:text-[#f5f5f4] hover:bg-[#1c1917] border border-[#292524]'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Saved Favorites quick filter tab */}
            <button
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams);
                if (showFavoritesOnly) {
                  nextParams.delete('favorites');
                } else {
                  nextParams.set('favorites', 'true');
                }
                setSearchParams(nextParams);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                showFavoritesOnly
                  ? 'bg-[#c29b38] text-[#0c0a09] font-semibold'
                  : 'bg-[#141210] text-[#a8a29e] hover:text-[#f5f5f4] border border-[#292524]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Dishes
            </button>
          </div>

          {/* Secondary Controls: Diet and Sorting */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            <div className="flex items-center gap-1 p-0.5 bg-[#141210] border border-[#292524] rounded">
              <button
                onClick={() => setSelectedDiet('all')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedDiet === 'all' ? 'bg-[#1c1917] text-[#c29b38]' : 'text-[#a8a29e]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDiet('veg')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedDiet === 'veg' ? 'bg-[#1c1917] text-emerald-400' : 'text-[#a8a29e]'
                }`}
              >
                Pure Veg
              </button>
              <button
                onClick={() => setSelectedDiet('non-veg')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedDiet === 'non-veg' ? 'bg-[#1c1917] text-amber-300' : 'text-[#a8a29e]'
                }`}
              >
                Non-Veg
              </button>
              <button
                onClick={() => setSelectedDiet('chef-special')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedDiet === 'chef-special' ? 'bg-[#1c1917] text-[#c29b38]' : 'text-[#a8a29e]'
                }`}
              >
                Chef&apos;s Specials
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141210] border border-[#292524] text-[#d6d3d1] text-[11px] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#c29b38]"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="spice">Spice Level</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Dishes Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-6">
          <span>
            Displaying <span className="text-[#f5f5f4] font-semibold">{filteredItems.length}</span> creations
          </span>
          {(searchQuery || selectedDiet !== 'all' || showFavoritesOnly || categoryParam !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDiet('all');
                setSearchParams(new URLSearchParams());
              }}
              className="text-[#c29b38] hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-[#141210] border border-[#292524] rounded-2xl p-8">
            <Sparkles className="w-10 h-10 text-[#78716c] mx-auto mb-4" />
            <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4]">No culinary dishes matched your criteria</h3>
            <p className="text-xs text-[#a8a29e] mt-2 max-w-md mx-auto">
              Try adjusting your dietary filter, clearing search keywords, or exploring our signature 1947 creations.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDiet('all');
                setSearchParams(new URLSearchParams());
              }}
              className="mt-6 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#141210] border border-[#292524] hover:border-[#c29b38]/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1917]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Clean unboxed badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                          item.isVeg ? 'border-emerald-500' : 'border-amber-600'
                        }`}
                        title={item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? 'bg-emerald-500' : 'bg-amber-600'
                          }`}
                        />
                      </span>
                      {item.isChefSpecial && (
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#c29b38] bg-[#0c0a09]/85 px-2 py-0.5 rounded border border-[#c29b38]/40">
                          Masterpiece
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#0c0a09]/80 border border-[#292524] text-[#d6d3d1] hover:text-[#c29b38] transition-colors"
                      aria-label="Toggle bookmark"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-[#c29b38] text-[#c29b38]' : ''}`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#f5f5f4] bg-[#0c0a09]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#292524]">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Spice: {item.spiceLevel}/3</span>
                      </div>
                      <span className="font-mono font-bold text-[#c29b38]">₹{item.price}</span>
                    </div>
                  </div>

                  {/* Body Content with Zero-Pill Typography */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/menu/${item.id}`}
                        className="font-heritage text-xl font-bold text-[#f5f5f4] group-hover:text-[#c29b38] transition-colors leading-snug"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-1 text-xs text-[#c29b38] shrink-0 pt-0.5">
                        <Star className="w-3 h-3 fill-[#c29b38]" />
                        <span className="font-mono text-[11px] font-bold">{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#c29b38] font-medium mt-1">{item.subtitle}</p>

                    <p className="text-xs text-[#a8a29e] mt-2.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Unboxed metadata line with typographic bullet separators */}
                    <div className="mt-4 pt-3 border-t border-[#292524] flex items-center gap-2 text-[11px] text-[#78716c]">
                      <span>{item.servingSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.calories} kcal</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.allergens.length ? item.allergens.join(', ') : 'No Common Allergens'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-[#292524]/60 mt-2">
                  <Link
                    to={`/menu/${item.id}`}
                    className="text-xs text-[#a8a29e] hover:text-[#c29b38] transition-colors font-medium"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Artisanal Pantry &amp; Masalas" />
    </div>
  );
};
