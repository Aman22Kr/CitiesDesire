import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, UtensilsCrossed, Award, CheckCircle } from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';
import { YouTubePlaceholder } from '../components/YouTubePlaceholder';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const StoryPage: React.FC = () => {
  const timelineMilestones = [
    {
      year: '1947',
      title: 'The Post-Partition Genesis in Old Delhi',
      description: 'Shri Kundan Lal Jaggi arrived in Delhi after partition and opened his rustic eatery on the historic streets of Daryaganj. With a simple charcoal tandoor and copper vessels, he set the cornerstone for North Indian dining.',
    },
    {
      year: '1947',
      title: 'The Invention of Butter Chicken & Dal Makhani',
      description: 'Faced with a group of hungry late travelers, Kundan Lal Jaggi repurposed tandoori chicken by simmering it in vine tomatoes and hand-churned white butter. Concurrently, he devised Dal Makhani by simmering black urad overnight over dying coals.',
    },
    {
      year: '1952',
      title: 'The Golden Age of North Indian Hospitality',
      description: 'Dignitaries, prime ministers, and international celebrities flocked to Delhi specifically to experience these revolutionary flavors, establishing butter chicken as India’s global culinary ambassador.',
    },
    {
      year: '2019',
      title: 'The Revival by Raghav Jaggi & Amit Bagga',
      description: 'Shri Kundan Lal Jaggi’s grandson, Raghav Jaggi, teamed up with hospitality visionary Amit Bagga to institutionalize the brand as CitiesDesire, resurrecting the exact 1947 recipes without commercial shortcuts.',
    },
    {
      year: '2024',
      title: 'Shark Tank India Recognition & National Fame',
      description: 'CitiesDesire showcased its uncompromising dedication to heritage recipes and five-senses delivery packaging on national television, gaining acclaim for ethical culinary preservation.',
    },
    {
      year: '2026',
      title: 'Global Footprint: 15 Outlets & Bangkok Flagship',
      description: 'Expanded across Delhi NCR, Gurugram, Noida, Punjab, and launched its first international flagship on Sukhumvit Soi 18 in Bangkok.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Hero Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1917] border border-[#c29b38]/40 text-[#c29b38] text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Since 1947</span>
          </div>

          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4] tracking-tight text-balance">
            The Legendary Story of <span className="text-[#c29b38] italic font-serif">Kundan Lal Jaggi</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#d6d3d1] leading-relaxed font-light">
            How a humble refugee’s resourcefulness in 1947 Old Delhi gifted humanity two of the most universally beloved dishes in culinary history.
          </p>
        </div>
      </section>

      {/* Main Story Split Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              The Genesis
            </span>
            <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-[#f5f5f4]">
              An Autumn Night in 1947
            </h2>
            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              When India gained independence in August 1947, millions faced displacement. Shri Kundan Lal Jaggi arrived in Old Delhi with empty pockets but a heart overflowing with culinary courage. He set up shop in Daryaganj, serving robust tandoori chicken cooked over red charcoal pits.
            </p>
            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              One evening, well past closing hours, a large contingent of hungry guests arrived. The kitchen was nearly empty—only a few pieces of dry roasted tandoori chicken remained. Not wanting to turn guests away, Kundan Lal improvised. He crushed ripe vine tomatoes, added garlic, ginger, pure white butter churned from fresh milk, and a pinch of dried fenugreek leaves.
            </p>
            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              He tossed the roasted chicken pieces into this silky gravy, letting them soak up the tomato-butter elixir. The guests were awestruck. The dish was christened <span className="text-[#c29b38] font-semibold">Butter Chicken (Murgh Makhani)</span>.
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#c29b38] mb-3">
                The Sacred 1947 Recipe Guarantees:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#a8a29e]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#c29b38]" />
                  <span>Zero artificial orange dyes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#c29b38]" />
                  <span>No cashew nut heaviness</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#c29b38]" />
                  <span>Hand-churned white butter</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#c29b38]" />
                  <span>Vine-ripened tomato acidity</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#292524] shadow-2xl">
              <img
                src={ASSET_IMAGES.butterChicken}
                alt="Original 1947 Butter Chicken Invention"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-[#141210] border-t border-[#292524] text-xs text-[#a8a29e]">
                Hand-served in vintage copper handis with white butter dollops, preserved precisely as in 1947.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentary Video Section (with YouTube Placeholder) */}
      <section className="py-16 bg-[#141210] border-y border-[#292524]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              Archival Video Chronicle
            </span>
            <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-2">
              The Legend Behind the Flavors
            </h2>
            <p className="text-xs text-[#a8a29e] mt-2">
              Archival footage, oral history from the Jaggi family, and the culinary archaeology of Delhi.
            </p>
          </div>

          {/* YouTube Blank Placeholder reproducing exact layout and aspect ratio */}
          <YouTubePlaceholder
            title="CitiesDesire: The 1947 Oral History of Butter Chicken"
            duration="06:45"
            caption="Featuring Raghav Jaggi, Amit Bagga, and culinary historians documenting the post-partition roots of Kundan Lal Jaggi."
          />
        </div>
      </section>

      {/* The Dal Makhani & Swaran Jaggi "Gold" Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#292524] shadow-2xl">
              <img
                src={ASSET_IMAGES.dalMakhani}
                alt="Original 1947 Dal Makhani Slow Simmered"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-[#141210] border-t border-[#292524] text-xs text-[#a8a29e]">
                18 hours over charcoal embers until whole black urad breakdown into a naturally velvety texture.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              The Vegetarian Crown
            </span>
            <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-[#f5f5f4]">
              Dal Makhani &amp; The &apos;Gold&apos; Tribute
            </h2>
            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              Before 1947, black lentils (maa ki dal) were prepared as a thin broth without butter or tomato. Kundan Lal Jaggi applied slow tandoor physics to create Dal Makhani. By letting it rest over the dying embers of the tandoor overnight for 18 continuous hours with pure makhan and fresh tomatoes, he unlocked a rich creaminess without using flour or artificial thickeners.
            </p>
            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              In parallel, the word <span className="text-[#c29b38] font-serif font-bold">&quot;Gold&quot;</span> in our brand insignia is an eternal homage to Kundan Lal Jaggi&apos;s beloved wife, <em>Swaran</em>, whose Punjabi name directly translates to Gold. Her warmth, hospitality, and hand-churned dairy traditions remain the spiritual heartbeat of CitiesDesire.
            </p>

            <div className="pt-4 flex gap-4">
              <Link
                to="/menu/original-1947-dal-makhani"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors"
              >
                Order Dal Makhani
              </Link>
              <Link
                to="/book-table"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#f5f5f4] bg-[#141210] hover:bg-[#1c1917] border border-[#292524] rounded transition-colors"
              >
                Experience Gold Dining
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Chronology Timeline */}
      <section className="py-20 bg-[#090807] border-t border-[#292524]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              Through Eight Decades
            </span>
            <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-[#f5f5f4] mt-2">
              Chronicles of Culinary Heritage
            </h2>
          </div>

          <div className="space-y-10 relative before:absolute before:inset-0 before:left-8 sm:before:left-1/2 before:w-0.5 before:bg-[#292524]">
            {timelineMilestones.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-start ${
                  index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12`}
              >
                {/* Year Marker Pin */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1c1917] border-2 border-[#c29b38] flex items-center justify-center text-[11px] font-mono font-bold text-[#c29b38] z-10">
                  <Calendar className="w-3.5 h-3.5" />
                </div>

                {/* Content Box */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] pl-16 sm:pl-0 ${
                    index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                  }`}
                >
                  <div className="p-6 rounded-xl bg-[#141210] border border-[#292524] hover:border-[#c29b38]/40 transition-colors">
                    <span className="text-xs font-mono font-bold text-[#c29b38] tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="font-heritage text-xl font-bold text-[#f5f5f4] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a8a29e] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Heritage Archive &amp; Literature" />
    </div>
  );
};
