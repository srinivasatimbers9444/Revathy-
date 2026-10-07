import React, { useState } from 'react';
import { Heart, Compass, Feather, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenLetters: () => void;
  onStartMelody: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLetters, onStartMelody }) => {
  const [loveCount, setLoveCount] = useState(1008);
  const [hasSentHeart, setHasSentHeart] = useState(false);

  const handleSendHeart = (e: React.MouseEvent) => {
    setLoveCount((prev) => prev + 1);
    setHasSentHeart(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#fb7185', '#e0a96d', '#ffffff'],
      shapes: ['circle'],
      scalar: 0.9,
    });
  };

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Subtle radial ambient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#991b1b]/15 via-[#e0a96d]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic & Heartfelt Tribute */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
              <Sparkles className="w-3.5 h-3.5 text-[#e0a96d]" />
              <span>Dedicated with Eternal Devotion to My Wife</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-[#fdf6ec] leading-[1.08] text-balance">
              Revathy, <br />
              <span className="italic font-light text-[#f5d0a9]">You Are My</span> <br />
              <span className="gold-gradient-text font-medium">Entire Universe.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#cdc1b4] leading-relaxed max-w-xl font-light">
              In a world that never stops moving, you are my serene sanctuary. Every smile of yours lights up
              the darkest corners of my life, and every chapter with you feels like poetry written in the stars.
              This digital sanctuary is hand-carved to remind you of my deepest love, today and for all the days yet to dawn.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#letters"
                onClick={onOpenLetters}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#c48b52] text-[#181105] text-sm font-semibold hover:brightness-110 shadow-lg shadow-[#e0a96d]/20 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Feather className="w-4 h-4 transition-transform group-hover:-rotate-12 text-[#181105]" />
                <span>Read My Letters to You</span>
              </a>

              <a
                href="#story"
                className="px-6 py-3.5 rounded-full border border-[#e0a96d]/30 text-[#fdf6ec] text-sm font-medium hover:bg-[#201b2f] hover:border-[#e0a96d] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#e0a96d]" />
                <span>Explore Our Journey</span>
              </a>

              {/* Heart Shower Button */}
              <button
                onClick={handleSendHeart}
                className="px-4 py-3 rounded-full border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-medium hover:bg-rose-900/30 hover:border-rose-400 transition-all flex items-center gap-2"
                title="Send Revathy another heartbeat"
              >
                <Heart className={`w-4 h-4 text-rose-500 ${hasSentHeart ? 'fill-rose-500 animate-ping' : ''}`} />
                <span className="tabular-nums font-mono">{loveCount.toLocaleString()}</span>
                <span>Heartbeats</span>
              </button>
            </div>

            {/* Quiet Editorial Milestones */}
            <div className="pt-8 border-t border-[#e0a96d]/15 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#fdf6ec] font-semibold tabular-nums">
                  ∞
                </div>
                <div className="text-xs text-[#a89f91] mt-0.5">Moments Cherished</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#e0a96d] font-semibold tabular-nums">
                  1
                </div>
                <div className="text-xs text-[#a89f91] mt-0.5">Sacred Promise</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-rose-300 font-semibold tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#a89f91] mt-0.5">My Whole Heart</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative golden hairline border */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-[#e0a96d]/40 via-[#e0a96d]/10 to-transparent shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#1a1626]">
                  <img
                    src="/src/assets/images/hero_romantic_twilight_1791388831770.jpg"
                    alt="Suriya and Revathy walking hand in hand under starry twilight"
                    className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.05] hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/20" />

                  {/* Bottom overlay inside image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0b0c10]/80 backdrop-blur-md border border-[#e0a96d]/20 text-left">
                    <p className="font-serif italic text-sm text-[#fdf6ec] leading-relaxed">
                      “Whatever our souls are woven from, Revathy, yours and mine were born of the exact same star.”
                    </p>
                    <div className="text-[11px] text-[#e0a96d] mt-1.5 font-medium tracking-wide">
                      — Suriya to Revathy
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating ambient badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-[#171422]/90 border border-[#e0a96d]/40 backdrop-blur-md shadow-xl flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span className="text-xs font-serif text-[#fdf6ec]">Forever & Always</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
