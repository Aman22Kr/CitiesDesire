import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Flame, Bookmark, ShoppingBag, Check, Sparkles, Utensils, Heart } from 'lucide-react';
import { MENU_ITEMS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const DishDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite, addToRecentlyViewed } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'regular' | 'spicy'>('regular');

  const dish = MENU_ITEMS.find((item) => item.id === id);

  useEffect(() => {
    if (id && dish) {
      addToRecentlyViewed(id);
    }
  }, [id, dish]);

  if (!dish) {
    return (
      <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4]">Dish Not Found</h2>
        <p className="text-xs text-[#a8a29e] mt-2">
          The requested culinary creation could not be located in our archives.
        </p>
        <Link
          to="/menu"
          className="mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] rounded"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const relatedDishes = MENU_ITEMS.filter(
    (item) => item.id !== dish.id && (item.category === dish.category || item.category === 'breads')
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-[#a8a29e] hover:text-[#c29b38] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to culinary offerings
        </button>
      </div>

      {/* Main Product Showcase */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#292524] shadow-2xl bg-[#141210]">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center bg-[#0c0a09]/80 ${
                    dish.isVeg ? 'border-emerald-500' : 'border-amber-600'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dish.isVeg ? 'bg-emerald-500' : 'bg-amber-600'
                    }`}
                  />
                </span>
                {dish.originalYear && (
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#c29b38] bg-[#0c0a09]/90 px-2.5 py-1 rounded border border-[#c29b38]/40">
                    Est. {dish.originalYear}
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleFavorite(dish.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0c0a09]/80 border border-[#292524] text-[#d6d3d1] hover:text-[#c29b38] transition-colors shadow-md"
                aria-label="Save dish"
              >
                <Bookmark
                  className={`w-5 h-5 ${isFavorite(dish.id) ? 'fill-[#c29b38] text-[#c29b38]' : ''}`}
                />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-[#141210] border border-[#292524]">
                <span className="text-[10px] uppercase font-mono text-[#78716c]">Portion</span>
                <p className="text-xs font-semibold text-[#f5f5f4] mt-0.5">{dish.servingSize}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#141210] border border-[#292524]">
                <span className="text-[10px] uppercase font-mono text-[#78716c]">Calories</span>
                <p className="text-xs font-semibold text-[#f5f5f4] mt-0.5 tabular-nums">{dish.calories} kcal</p>
              </div>
              <div className="p-3 rounded-lg bg-[#141210] border border-[#292524]">
                <span className="text-[10px] uppercase font-mono text-[#78716c]">Heat Index</span>
                <p className="text-xs font-semibold text-[#f5f5f4] mt-0.5">{dish.spiceLevel}/3 Mild-Spiced</p>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Details & Order Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#c29b38] mb-2">
                <Star className="w-4 h-4 fill-[#c29b38]" />
                <span className="font-bold tabular-nums">{dish.rating}</span>
                <span className="text-[#78716c]">· Based on {dish.reviewCount} connoisseur reviews</span>
              </div>

              <h1 className="font-heritage text-3xl sm:text-5xl font-bold text-[#f5f5f4] leading-tight">
                {dish.name}
              </h1>
              <p className="text-sm text-[#c29b38] font-medium mt-1">{dish.subtitle}</p>

              <div className="mt-4 text-2xl font-bold font-mono text-[#f5f5f4] flex items-baseline gap-2">
                <span>₹{dish.price}</span>
                <span className="text-xs text-[#78716c] font-normal font-sans">Inclusive of all culinary taxes</span>
              </div>
            </div>

            {/* Description & Backstory */}
            <div className="space-y-4 pt-2 border-t border-[#292524]">
              <p className="text-sm text-[#d6d3d1] leading-relaxed">
                {dish.description}
              </p>

              <div className="p-4 rounded-xl bg-[#141210] border border-[#292524] space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#c29b38] font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>The Heritage Origin Story</span>
                </div>
                <p className="text-xs text-[#a8a29e] italic leading-relaxed">
                  &ldquo;{dish.story}&rdquo;
                </p>
              </div>
            </div>

            {/* Ingredients & Allergens */}
            <div className="pt-2 border-t border-[#292524] space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#a8a29e]">
                Authentic Ingredients &amp; Spices:
              </h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded bg-[#141210] border border-[#292524] text-[#d6d3d1]"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <div className="text-xs text-[#78716c] pt-1">
                Allergen Information: <span className="text-[#d6d3d1]">{dish.allergens.length ? dish.allergens.join(', ') : 'None'}</span>
              </div>
            </div>

            {/* Customization & Add to Cart */}
            <div className="pt-4 border-t border-[#292524] space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                  Spice Profile Adjustment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'regular', 'spicy'] as const).map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setSpiceLevel(sp)}
                      className={`py-2 text-xs font-medium rounded capitalize border transition-all ${
                        spiceLevel === sp
                          ? 'bg-[#c29b38] text-[#0c0a09] border-[#c29b38] font-bold'
                          : 'bg-[#141210] text-[#a8a29e] border-[#292524] hover:border-[#3d3835]'
                      }`}
                    >
                      {sp === 'regular' ? 'Authentic 1947' : sp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and CTA */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#292524] rounded bg-[#141210]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-[#a8a29e] hover:text-[#f5f5f4]"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-bold text-[#f5f5f4]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-[#a8a29e] hover:text-[#f5f5f4]"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(dish, quantity, spiceLevel)}
                  className="flex-1 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#c29b38]/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Takeaway Bag (₹{dish.price * quantity})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Pairings & Related Creations */}
      <section className="py-16 bg-[#141210] border-t border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
                Culinary Harmonies
              </span>
              <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-[#f5f5f4] mt-1">
                Perfect Pairings for {dish.name}
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-xs font-semibold uppercase tracking-wider text-[#c29b38] hover:text-[#d4ae4b]"
            >
              View Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedDishes.map((rel) => (
              <div
                key={rel.id}
                className="p-5 rounded-xl bg-[#0c0a09] border border-[#292524] hover:border-[#c29b38]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#1c1917] mb-4">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-heritage text-lg font-bold text-[#f5f5f4]">{rel.name}</h3>
                  <p className="text-xs text-[#a8a29e] mt-1 line-clamp-2">{rel.subtitle}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#292524] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#c29b38] font-bold">₹{rel.price}</span>
                  <Link
                    to={`/menu/${rel.id}`}
                    className="text-xs text-[#a8a29e] hover:text-[#c29b38] transition-colors"
                  >
                    View Dish &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Private Chef Experience" />
    </div>
  );
};
