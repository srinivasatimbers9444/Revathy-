import React, { useState, useEffect } from 'react';
import { VowStar } from '../types';
import { Star, Sparkles, Send, Heart, Check, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

const CELESTIAL_STARS: VowStar[] = [
  {
    id: 1,
    title: 'The Vow of Unconditional Respect',
    vow: 'I vow to honor your thoughts, respect your individuality, and cherish your mind just as deeply as I cherish your heart.',
    xPercent: 18,
    yPercent: 35,
    unlocked: true,
  },
  {
    id: 2,
    title: 'The Vow of Gentle Listening',
    vow: 'I vow to listen not merely to reply, but to hold your feelings safely, understanding the words you speak and the ones left unsaid.',
    xPercent: 32,
    yPercent: 20,
    unlocked: false,
  },
  {
    id: 3,
    title: 'The Vow of Laughter & Lightness',
    vow: 'I vow to bring silliness, warmth, and unbridled laughter into our home every single day, keeping our spirits forever young.',
    xPercent: 50,
    yPercent: 30,
    unlocked: false,
  },
  {
    id: 4,
    title: 'The Vow of Unwavering Protection',
    vow: 'I vow to stand before you against whatever storms the world might bring, protecting your peace and keeping you safe.',
    xPercent: 68,
    yPercent: 22,
    unlocked: false,
  },
  {
    id: 5,
    title: 'The Vow to Champion Your Dreams',
    vow: 'I vow to be your biggest cheerleader, celebrating your passions and helping you reach every height your heart desires.',
    xPercent: 82,
    yPercent: 40,
    unlocked: false,
  },
  {
    id: 6,
    title: 'The Vow of Everyday Gratitude',
    vow: 'I vow to never let a single day slip by without reminding you how deeply loved, valued, and essential you are to my life.',
    xPercent: 40,
    yPercent: 65,
    unlocked: false,
  },
  {
    id: 7,
    title: 'The Vow of Forever & Ever',
    vow: 'I vow that in every season, through every passing year and with every gray hair, my devotion to you will only multiply.',
    xPercent: 60,
    yPercent: 68,
    unlocked: false,
  },
];

export const StargazerVow: React.FC = () => {
  const [stars, setStars] = useState<VowStar[]>(() => {
    const saved = localStorage.getItem('revathy_unlocked_stars');
    return saved ? JSON.parse(saved) : CELESTIAL_STARS;
  });

  const [activeStar, setActiveStar] = useState<VowStar>(stars[0]);
  const [wishText, setWishText] = useState('');
  const [savedWishes, setSavedWishes] = useState<string[]>(() => {
    const saved = localStorage.getItem('revathy_whispered_wishes');
    return saved
      ? JSON.parse(saved)
      : ['May our love continue to grow warmer and stronger with every passing sunrise.'];
  });
  const [shootingStarActive, setShootingStarActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('revathy_unlocked_stars', JSON.stringify(stars));
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('revathy_whispered_wishes', JSON.stringify(savedWishes));
  }, [savedWishes]);

  const handleUnlockStar = (star: VowStar) => {
    const updated = stars.map((s) => (s.id === star.id ? { ...s, unlocked: true } : s));
    setStars(updated);
    setActiveStar({ ...star, unlocked: true });

    confetti({
      particleCount: 25,
      spread: 60,
      colors: ['#fef08a', '#e0a96d', '#ffffff'],
    });
  };

  const handleReleaseWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    setSavedWishes([wishText.trim(), ...savedWishes]);
    setWishText('');
    setShootingStarActive(true);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#e0a96d', '#ffd3dc', '#ffffff'],
    });

    setTimeout(() => {
      setShootingStarActive(false);
    }, 2000);
  };

  const unlockedCount = stars.filter((s) => s.unlocked).length;

  return (
    <section id="vows" className="py-24 relative bg-[#0b0c10] border-t border-[#e0a96d]/15 overflow-hidden">
      {/* Background Starscape Artwork */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/starlit_night_reflection_1791388871686.jpg"
          alt="Starry celestial cosmos"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10] via-transparent to-[#0b0c10]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
            <Moon className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>The Celestial Constellation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#fdf6ec] font-normal tracking-tight">
            The Seven Sacred Vows
          </h2>
          <p className="text-sm sm:text-base text-[#a89f91] font-light">
            Seven eternal promises from Suriya, mapped to the stars. Tap each celestial node
            in the constellation to reveal the sacred covenant written for Revathy.
          </p>
        </div>

        {/* Constellation Sky Canvas */}
        <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl bg-[#0e0c15]/80 border border-[#e0a96d]/30 overflow-hidden shadow-2xl mb-12">
          {/* Subtle grid and lines between stars */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#e0a96d]/20 stroke-1">
            <line x1="18%" y1="35%" x2="32%" y2="20%" />
            <line x1="32%" y1="20%" x2="50%" y2="30%" />
            <line x1="50%" y1="30%" x2="68%" y2="22%" />
            <line x1="68%" y1="22%" x2="82%" y2="40%" />
            <line x1="32%" y1="20%" x2="40%" y2="65%" />
            <line x1="50%" y1="30%" x2="60%" y2="68%" />
          </svg>

          {/* Shooting Star Animation */}
          {shootingStarActive && (
            <div className="absolute top-10 left-10 w-48 h-0.5 bg-gradient-to-r from-transparent via-white to-[#e0a96d] rotate-45 animate-pulse transition-all duration-1000 shadow-lg shadow-white" />
          )}

          {/* Interactive Star Nodes */}
          {stars.map((star) => {
            const isSelected = activeStar.id === star.id;
            return (
              <button
                key={star.id}
                onClick={() => handleUnlockStar(star)}
                style={{ left: `${star.xPercent}%`, top: `${star.yPercent}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group p-2 focus:outline-none transition-transform ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
                title={star.title}
              >
                <div
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    star.unlocked
                      ? 'bg-[#e0a96d] text-[#181105] shadow-[0_0_20px_#e0a96d]'
                      : 'bg-[#211b30] text-[#a89f91] border border-white/20'
                  }`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      star.unlocked ? 'fill-[#181105]' : 'fill-none'
                    }`}
                  />
                  {/* Subtle pulsing aura for selected */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-[#e0a96d]/40" />
                  )}
                </div>

                <span className="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-[#fdf6ec] bg-[#0b0c10]/80 px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Star #{star.id}
                </span>
              </button>
            );
          })}

          {/* Overlay Status */}
          <div className="absolute bottom-4 left-6 text-xs text-[#a89f91] flex items-center gap-2 bg-[#0b0c10]/60 px-3 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>
              {unlockedCount} of {stars.length} Stars Illuminated
            </span>
          </div>
        </div>

        {/* Selected Vow Card */}
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 border border-[#e0a96d]/30 text-center mb-16 shadow-2xl relative">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#e0a96d] mb-3">
            <Star className="w-3.5 h-3.5 fill-[#e0a96d]" />
            <span>Star #{activeStar.id} of the Constellation</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#fdf6ec] mb-4 font-normal">
            {activeStar.title}
          </h3>

          <div className="p-6 rounded-2xl bg-[#0b0c10]/60 border-l-2 border-[#e0a96d] mb-6">
            <p className="font-serif italic text-lg sm:text-xl text-[#f5d0a9] leading-relaxed">
              “{activeStar.vow}”
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#a89f91] pt-4 border-t border-[#e0a96d]/15">
            <span>Written with Suriya's sacred honor</span>
            <span className="font-script text-2xl text-[#e0a96d]">Forever Revathy</span>
          </div>
        </div>

        {/* Whispered Wish to the Stars */}
        <div className="max-w-xl mx-auto rounded-2xl bg-[#14101e] border border-[#e0a96d]/20 p-6 sm:p-8 text-left space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#e0a96d] uppercase tracking-wider">
            <Send className="w-3.5 h-3.5" />
            <span>Whisper a Wish to the Heavens</span>
          </div>

          <p className="text-xs sm:text-sm text-[#a89f91] font-light">
            Revathy, make a wish or write a quiet thought for our journey together.
            It will be preserved in our celestial sky.
          </p>

          <form onSubmit={handleReleaseWish} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. May we travel to Switzerland together..."
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-xs sm:text-sm focus:outline-none focus:border-[#e0a96d]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e0a96d] to-[#c48b52] text-[#181105] text-xs font-semibold hover:brightness-110 flex items-center gap-1.5 shrink-0"
            >
              <span>Release Wish</span>
            </button>
          </form>

          {/* Wishes List */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-[#736b60]">
              Preserved Wishes ({savedWishes.length})
            </div>
            {savedWishes.slice(0, 3).map((w, idx) => (
              <div
                key={idx}
                className="text-xs text-[#cdc1b4] flex items-center gap-2 font-serif italic py-1"
              >
                <Sparkles className="w-3 h-3 text-[#e0a96d] shrink-0" />
                <span className="truncate">“{w}”</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
