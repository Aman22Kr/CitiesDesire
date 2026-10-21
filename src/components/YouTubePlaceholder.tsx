import React from 'react';
import { Play } from 'lucide-react';

interface YouTubePlaceholderProps {
  title: string;
  duration?: string;
  caption?: string;
  className?: string;
}

export const YouTubePlaceholder: React.FC<YouTubePlaceholderProps> = ({
  title,
  duration = '04:12',
  caption = 'Archive Documentary: The Invention of Butter Chicken in 1947',
  className = '',
}) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-[#292524] bg-[#141210] ${className}`}>
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-[#1c1917] via-[#141210] to-[#0c0a09]">
        {/* Subtle subtle heritage geometric watermark or grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c29b38_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Center Blank Frame & Player Controls Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative group cursor-pointer mb-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0c0a09]/80 border border-[#c29b38]/60 flex items-center justify-center text-[#c29b38] group-hover:scale-105 group-hover:border-[#c29b38] group-hover:bg-[#0c0a09] transition-all shadow-lg">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#c29b38] ml-1" />
            </div>
          </div>

          <div className="max-w-md">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#c29b38] bg-[#1c1917] px-2.5 py-1 rounded border border-[#292524]">
              Archive Video Presentation
            </span>
            <h4 className="font-heritage text-lg sm:text-xl font-bold text-[#f5f5f4] mt-2">
              {title}
            </h4>
            <p className="text-xs text-[#a8a29e] mt-1 line-clamp-2">
              {caption}
            </p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-[#78716c] border-t border-[#292524]/60 pt-2">
            <span>Video Placeholder (YouTube Embed Simulator)</span>
            <span className="font-mono">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
