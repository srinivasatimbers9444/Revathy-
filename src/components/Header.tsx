import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

interface HeaderProps {
  onToggleMusic: () => void;
  isPlayingMusic: boolean;
  onOpenQuickLoveNote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMusic,
  isPlayingMusic,
  onOpenQuickLoveNote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Love Letters', href: '#letters' },
    { label: '365 Reasons', href: '#reasons' },
    { label: 'Memories', href: '#memories' },
    { label: 'Couple Quiz', href: '#quiz' },
    { label: 'Eternal Vow', href: '#vows' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0c10]/85 backdrop-blur-md border-b border-[#e0a96d]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-2xl md:text-3xl tracking-wide text-[#fdf6ec] hover:text-[#e0a96d] transition-colors whitespace-nowrap group"
        >
          Revathy <span className="font-script text-3xl md:text-4xl text-[#e0a96d] mx-1">&</span> Suriya
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#d1c7bd]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#fdf6ec] transition-colors relative py-1 hover:border-b hover:border-[#e0a96d] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Ambient Music Button */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Mute ambient melody' : 'Play romantic melody'}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#e0a96d]/30 bg-[#171422] text-xs font-medium text-[#fdf6ec] hover:border-[#e0a96d] hover:bg-[#201b2f] transition-all whitespace-nowrap"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-[#e0a96d] animate-pulse" />
                <span className="hidden sm:inline">Melody Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#a89f91]" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          {/* Special Dedication CTA */}
          <button
            onClick={onOpenQuickLoveNote}
            className="px-4 py-2 text-xs font-semibold text-[#181105] bg-gradient-to-r from-[#e0a96d] to-[#f5d0a9] rounded-full hover:brightness-110 shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#181105]" />
            <span>To Revathy</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#d1c7bd] hover:text-[#fdf6ec]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#100d17] border-b border-[#e0a96d]/20 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d1c7bd] hover:text-[#fdf6ec] py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
