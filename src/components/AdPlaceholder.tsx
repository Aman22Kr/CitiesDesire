import React from 'react';
import { Sparkles } from 'lucide-react';

interface AdPlaceholderProps {
  slotName?: string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotName = 'Culinary Heritage Partners',
  className = '',
}) => {
  return (
    <aside
      aria-label="Sponsor Advertisement Slot"
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ${className}`}
    >
      <div className="w-full bg-[#141210]/60 border border-[#292524] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-colors hover:border-[#3d3835]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#1c1917] border border-[#292524] flex items-center justify-center text-[#c29b38] shrink-0">
            <Sparkles className="w-4 h-4 text-[#c29b38]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#78716c] px-1.5 py-0.5 bg-[#1c1917] rounded border border-[#292524]">
                Advertisement
              </span>
              <span className="text-xs font-medium text-[#d6d3d1]">
                {slotName}
              </span>
            </div>
            <p className="text-[11px] text-[#a8a29e] mt-0.5">
              Explore curated artisanal copperware, organic Kashmiri saffron, and gourmet dining experiences.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] text-[#78716c]">Partner Showcase Slot</span>
          <a
            href="#/contact"
            className="text-xs px-3 py-1.5 rounded bg-[#1c1917] hover:bg-[#292524] text-[#c29b38] border border-[#c29b38]/30 transition-colors whitespace-nowrap"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </aside>
  );
};
