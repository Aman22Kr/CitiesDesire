import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Sparkles, Clock, MapPin, Award, ChevronRight, Bookmark, ShoppingBag, Volume2, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES, MENU_ITEMS, OUTLETS, FIVE_SENSES, AWARDS_LIST, REVIEWS } from '../data/mockData';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const HomePage: React.FC = () => {
  const { addToCart, toggleFavorite, isFavorite, isAudioPlaying, toggleAudio } = useApp();
  const [activeSenseIndex, setActiveSenseIndex] = useState(0);

  const signatureMains = MENU_ITEMS.filter((item) => item.category === 'signature');

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Vignette Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSET_IMAGES.heroSpread}
            alt="CitiesDesire Royal North Indian Feast"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,10,9,0.7)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1917]/80 border border-[#c29b38]/40 text-[#c29b38] text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Delhi 1947 Heritage Legacy</span>
          </div>

          <h1 className="font-heritage text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5f5f4] text-balance max-w-4xl mx-auto leading-[1.1]">
            By the Inventors of <br />
            <span className="text-[#c29b38] italic font-serif">Butter Chicken</span> &amp; <span className="text-[#c29b38] italic font-serif">Dal Makhani</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#d6d3d1] max-w-2xl mx-auto leading-relaxed font-light">
            Crafted in 1947 post-partition Delhi by Shri Kundan Lal Jaggi. Preserving eight decades of culinary genius through charcoal tandoors, pure white butter, and slow-simmered vine tomatoes.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-table"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded-md transition-all shadow-lg shadow-[#c29b38]/20 flex items-center justify-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#f5f5f4] bg-[#1c1917]/90 hover:bg-[#292524] border border-[#3d3835] rounded-md transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Explore 1947 Menu
              <ChevronRight className="w-4 h-4 text-[#c29b38]" />
            </Link>
          </div>

          {/* Quick Soundscape Bar */}
          <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#141210]/90 border border-[#292524] backdrop-blur-md">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 text-xs text-[#a8a29e] hover:text-[#c29b38] transition-colors"
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'text-[#c29b38] animate-pulse' : 'text-[#78716c]'}`} />
              <span className="font-mono text-[11px]">
                {isAudioPlaying ? 'PLAYING: 1947 Sitar & Heritage Lounge' : 'LISTEN: Immerse in 1947 Dining Soundscape'}
              </span>
            </button>
          </div>
        </div>

        {/* 4-Item Heritage Metrics Strip below hero */}
        <div className="absolute bottom-0 inset-x-0 bg-[#141210]/90 border-t border-[#292524] backdrop-blur-md hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 divide-x divide-[#292524] text-center">
            <div>
              <div className="text-xl font-bold font-heritage text-[#c29b38] tabular-nums">1947</div>
              <div className="text-[11px] text-[#a8a29e] uppercase tracking-wider">Birth of Iconic Curries</div>
            </div>
            <div>
              <div className="text-xl font-bold font-heritage text-[#c29b38] tabular-nums">18 Hours</div>
              <div className="text-[11px] text-[#a8a29e] uppercase tracking-wider">Charcoal Dal Simmer</div>
            </div>
            <div>
              <div className="text-xl font-bold font-heritage text-[#c29b38] tabular-nums">15+ Outlets</div>
              <div className="text-[11px] text-[#a8a29e] uppercase tracking-wider">Delhi NCR to Bangkok</div>
            </div>
            <div>
              <div className="text-xl font-bold font-heritage text-[#c29b38] tabular-nums">56 Awards</div>
              <div className="text-[11px] text-[#a8a29e] uppercase tracking-wider">NDTV Food Awards 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE 1947 DISHES SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
            Original Culinary Heritage
          </span>
          <h2 className="font-heritage text-3xl sm:text-5xl font-bold text-[#f5f5f4] mt-2">
            The Two Inventions That Changed Indian Cuisine
          </h2>
          <p className="text-sm text-[#a8a29e] mt-4 leading-relaxed">
            In 1947, Shri Kundan Lal Jaggi pioneered these two iconic dishes in Old Delhi. At CitiesDesire, every pot is prepared strictly according to his original handwritten formulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {signatureMains.map((dish) => (
            <div
              key={dish.id}
              className="group bg-[#141210] border border-[#292524] hover:border-[#c29b38]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1c1917]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#0c0a09]/90 border border-[#c29b38]/50 text-[#c29b38] text-[11px] font-mono tracking-widest uppercase rounded">
                    Original 1947 Formula
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(dish.id)}
                    className="p-2 rounded-full bg-[#0c0a09]/80 border border-[#292524] text-[#d6d3d1] hover:text-[#c29b38] transition-colors"
                    aria-label="Save dish to favorites"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isFavorite(dish.id) ? 'fill-[#c29b38] text-[#c29b38]' : ''}`}
                    />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#f5f5f4] bg-[#0c0a09]/80 backdrop-blur-sm px-3 py-1.5 rounded border border-[#292524]">
                  <span>{dish.servingSize}</span>
                  <span className="font-mono text-[#c29b38] font-bold">₹{dish.price}</span>
                </div>
              </div>

              {/* Dish info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4] group-hover:text-[#c29b38] transition-colors">
                      {dish.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#c29b38]">
                      <Star className="w-3.5 h-3.5 fill-[#c29b38]" />
                      <span className="font-bold tabular-nums">{dish.rating}</span>
                      <span className="text-[#78716c]">({dish.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#c29b38] font-medium mt-1">{dish.subtitle}</p>
                  <p className="text-xs text-[#a8a29e] mt-3 leading-relaxed">{dish.description}</p>

                  <div className="mt-4 pt-4 border-t border-[#292524] flex flex-wrap items-center gap-2 text-[11px] text-[#78716c]">
                    <span className="text-[#a8a29e]">Key Ingredients:</span>
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[#d6d3d1]">
                        {ing} {i < 2 ? '·' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#292524] flex items-center justify-between gap-4">
                  <Link
                    to={`/menu/${dish.id}`}
                    className="text-xs text-[#c29b38] hover:text-[#d4ae4b] font-medium flex items-center gap-1"
                  >
                    Read Invention Story <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Takeaway
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#c29b38]/50 text-xs font-semibold tracking-wider uppercase text-[#c29b38] hover:bg-[#c29b38] hover:text-[#0c0a09] rounded transition-all"
          >
            View Complete Heritage Menu (14+ Specialties)
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. THE FIVE SENSES EXPERIENCE */}
      <section className="py-20 bg-[#090807] border-y border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              Sensory Hospitality
            </span>
            <h2 className="font-heritage text-3xl sm:text-5xl font-bold text-[#f5f5f4] mt-2">
              The 5 Senses of CitiesDesire
            </h2>
            <p className="text-sm text-[#a8a29e] mt-4 leading-relaxed">
              Every detail of your dining and home delivery journey is orchestrated to engage all five human senses with nostalgia and elegance.
            </p>
          </div>

          {/* Interactive Senses Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Senses navigation tabs */}
            <div className="lg:col-span-5 space-y-3">
              {FIVE_SENSES.map((senseItem, idx) => (
                <button
                  key={senseItem.sense}
                  onClick={() => setActiveSenseIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeSenseIndex === idx
                      ? 'bg-[#1c1917] border-[#c29b38] shadow-md shadow-[#c29b38]/10'
                      : 'bg-[#141210] border-[#292524] hover:border-[#3d3835]'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#c29b38]">
                      Sense 0{idx + 1}
                    </span>
                    <h3 className="font-heritage text-xl font-bold text-[#f5f5f4]">
                      {senseItem.sense}: {senseItem.title}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      activeSenseIndex === idx ? 'text-[#c29b38] translate-x-1' : 'text-[#78716c]'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Active Sense Detailed Card */}
            <div className="lg:col-span-7 bg-[#141210] border border-[#292524] rounded-2xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#c29b38]/5 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38] px-2.5 py-1 rounded bg-[#1c1917] border border-[#292524]">
                The Sense of {FIVE_SENSES[activeSenseIndex].sense}
              </span>

              <h3 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-4">
                {FIVE_SENSES[activeSenseIndex].title}
              </h3>
              <p className="text-sm text-[#c29b38] font-medium mt-1">
                {FIVE_SENSES[activeSenseIndex].tagline}
              </p>

              <p className="text-sm text-[#d6d3d1] mt-6 leading-relaxed">
                {FIVE_SENSES[activeSenseIndex].description}
              </p>

              <div className="mt-8 p-4 rounded-lg bg-[#1c1917] border border-[#292524] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#c29b38] shrink-0" />
                <p className="text-xs text-[#f5f5f4]">
                  <span className="text-[#c29b38] font-semibold">CitiesDesire Hallmark: </span>
                  {FIVE_SENSES[activeSenseIndex].highlight}
                </p>
              </div>

              {FIVE_SENSES[activeSenseIndex].sense === 'Hear' && (
                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={toggleAudio}
                    className="px-5 py-2.5 rounded bg-[#c29b38] hover:bg-[#d4ae4b] text-[#0c0a09] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    {isAudioPlaying ? 'Pause Heritage Soundscape' : 'Play Sitar Audio Sample'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LUXURY RESTAURANT INTERIOR & OUTLETS SPOTLIGHT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              Royal Dining Rooms
            </span>
            <h2 className="font-heritage text-3xl sm:text-5xl font-bold text-[#f5f5f4] leading-tight">
              An Ambiance Reminiscent of a Regal 1947 Sanctuary
            </h2>
            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              Step past hand-carved Mughal jali arches into an ambiance lit by warm chandeliers, brass handis, and plush emerald velvet. Named &quot;Gold&quot; in eternal tribute to Swaran Jaggi (wife of inventor Kundan Lal Jaggi), our private dining rooms offer timeless sanctuary for family celebrations and business banquets.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#a8a29e]">
                <Clock className="w-4 h-4 text-[#c29b38] shrink-0" />
                <span>Open Daily for Lunch (12:00 PM – 4:00 PM) &amp; Dinner (7:00 PM – 11:30 PM)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#a8a29e]">
                <MapPin className="w-4 h-4 text-[#c29b38] shrink-0" />
                <span>15 Outlets across Delhi NCR, Gurugram, Noida, Punjab, and Bangkok</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#a8a29e]">
                <Award className="w-4 h-4 text-[#c29b38] shrink-0" />
                <span>Dedicated Valet &amp; Sommelier Service at all Gold Edition locations</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/book-table"
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors"
              >
                Reserve Gold Table
              </Link>
              <Link
                to="/outlets"
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#f5f5f4] bg-[#141210] hover:bg-[#1c1917] border border-[#292524] rounded transition-colors"
              >
                Browse All 15 Outlets
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#292524] shadow-2xl">
              <img
                src={ASSET_IMAGES.restaurantInterior}
                alt="CitiesDesire Luxury Dining Room Interior"
                className="w-full aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0c0a09]/85 border border-[#292524] backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="font-heritage text-lg font-bold text-[#f5f5f4]">
                    The Gold Dining Room, Connaught Place
                  </h4>
                  <p className="text-xs text-[#c29b38]">Central Delhi Flagship</p>
                </div>
                <Link
                  to="/book-table"
                  className="text-xs text-[#0c0a09] bg-[#c29b38] px-3 py-1.5 rounded font-semibold uppercase tracking-wider hover:bg-[#d4ae4b] transition-colors"
                >
                  Book Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AWARDS & SHARK TANK MARQUEE */}
      <section className="py-16 bg-[#141210] border-y border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
                Recognized Worldwide
              </span>
              <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-1">
                56 Awards &amp; Shark Tank India Feature
              </h2>
            </div>
            <Link
              to="/awards"
              className="text-xs font-semibold uppercase tracking-wider text-[#c29b38] hover:text-[#d4ae4b] flex items-center gap-1"
            >
              View Full Honors Archive <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AWARDS_LIST.slice(0, 3).map((award, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#0c0a09] border border-[#292524] hover:border-[#c29b38]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#c29b38]">{award.year}</span>
                  <Award className="w-4 h-4 text-[#c29b38]" />
                </div>
                <h3 className="font-heritage text-xl font-bold text-[#f5f5f4] mt-3">
                  {award.title}
                </h3>
                <p className="text-xs text-[#c29b38] font-medium mt-1">{award.awardedBy}</p>
                <p className="text-xs text-[#a8a29e] mt-3 leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GUEST TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
            Diner Stories
          </span>
          <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-[#f5f5f4] mt-2">
            Praised by Food Lovers Across the Globe
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#141210] border border-[#292524] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#c29b38] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c29b38]" />
                  ))}
                </div>
                <p className="text-xs text-[#d6d3d1] italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#292524] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#f5f5f4]">{rev.author}</div>
                  <div className="text-[#78716c]">{rev.location}</div>
                </div>
                <span className="text-[10px] text-[#c29b38] font-mono px-2 py-0.5 bg-[#1c1917] rounded">
                  {rev.dishRecommended}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reusable Compact Advertisement Placeholder before footer */}
      <AdPlaceholder slotName="CitiesDesire Heritage Connoisseur Club" />
    </div>
  );
};
