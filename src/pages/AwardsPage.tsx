import React from 'react';
import { Award, Sparkles, Star, Trophy, Tv, CheckCircle2 } from 'lucide-react';
import { AWARDS_LIST } from '../data/mockData';
import { YouTubePlaceholder } from '../components/YouTubePlaceholder';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const AwardsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1917] border border-[#c29b38]/40 text-[#c29b38] text-xs font-mono uppercase tracking-widest mb-6">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors &amp; Recognition</span>
          </div>

          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4]">
            56 Awards &amp; National Accolades
          </h1>

          <p className="mt-4 text-sm text-[#a8a29e] max-w-xl mx-auto leading-relaxed">
            From winning Best North Indian Casual Dining at the NDTV Food Awards 2025 to our acclaimed presentation on Shark Tank India.
          </p>
        </div>
      </section>

      {/* Shark Tank India Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              <Tv className="w-4 h-4" />
              <span>Broadcast Nationwide</span>
            </div>

            <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-[#f5f5f4]">
              The Shark Tank India Showcase
            </h2>

            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              When co-founders Raghav Jaggi and Amit Bagga stepped onto the Shark Tank India stage, they brought more than an ambitious business proposal: they brought an unyielding mission to protect and scale authentic culinary history.
            </p>

            <p className="text-sm text-[#d6d3d1] leading-relaxed">
              The sharks were treated to the Original 1947 Butter Chicken and Dal Makhani, alongside the pioneering 5-Senses packaging. The pitch earned high praise for turning heritage dining into an institutionalized, award-winning culinary empire.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#a8a29e]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c29b38]" />
                <span>Shark praise for uncompromised original 1947 recipe fidelity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c29b38]" />
                <span>Patented 5-Senses delivery hot box with zero food dye guarantee</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <YouTubePlaceholder
              title="Shark Tank India: The 1947 Heritage Revival Pitch"
              duration="12:30"
              caption="Raghav Jaggi and Amit Bagga showcase CitiesDesire on Shark Tank India."
            />
          </div>
        </div>
      </section>

      {/* Complete Awards Gallery */}
      <section className="py-16 bg-[#141210] border-y border-[#292524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              Hall of Fame
            </span>
            <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-1">
              Select Honors Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARDS_LIST.map((award, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#0c0a09] border border-[#292524] hover:border-[#c29b38]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#c29b38] font-bold">{award.year}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1c1917] text-[#a8a29e]">
                    {award.category}
                  </span>
                </div>

                <h3 className="font-heritage text-xl font-bold text-[#f5f5f4] mt-3">
                  {award.title}
                </h3>

                <p className="text-xs text-[#c29b38] font-medium mt-1">{award.awardedBy}</p>

                <p className="text-xs text-[#a8a29e] mt-3 leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Culinary Guild Honors" />
    </div>
  );
};
