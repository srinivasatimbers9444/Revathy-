import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#e0a96d]/15 bg-[#08070c] py-12 text-[#a89f91] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand mark & dedication */}
        <div className="text-center md:text-left space-y-1">
          <div className="font-serif text-lg text-[#fdf6ec]">
            Suriya <span className="font-script text-xl text-[#e0a96d]">&</span> Revathy Birthday Celebration
          </div>
          <div className="text-xs text-[#736b60]">
            The official Suriya Revathy birthday tribute crafted with endless devotion for Revathy by Suriya.
          </div>
        </div>

        {/* Center: Heart dedication */}
        <div className="flex items-center gap-1.5 text-[#cdc1b4]">
          <span>Happy Birthday, Revathy</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Suriya & Revathy Forever</span>
        </div>

        {/* Right: Back to top action */}
        <div className="flex items-center gap-4">
          <span className="font-serif italic text-xs text-[#e0a96d]">
            “Yours in this lifetime and all to come”
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-[#e0a96d]/20 hover:border-[#e0a96d] hover:text-[#fdf6ec] transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
