import React, { useState } from 'react';
import { X, Sparkles, Heart, Flame, Cake, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBirthdaySerenade: () => void;
}

export const BirthdayCakeModal: React.FC<BirthdayCakeModalProps> = ({
  isOpen,
  onClose,
  onStartBirthdaySerenade,
}) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wish, setWish] = useState('');
  const [savedWish, setSavedWish] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    if (wish.trim()) {
      setSavedWish(wish.trim());
      // save to local storage
      const existing = localStorage.getItem('revathy_birthday_wishes');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(wish.trim());
      localStorage.setItem('revathy_birthday_wishes', JSON.stringify(list));
    }

    // Trigger birthday song
    onStartBirthdaySerenade();

    // Big festive confetti explosion
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f43f5e', '#e0a96d', '#fde047', '#a855f7', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setWish('');
    setSavedWish(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-[#14101e] border-2 border-[#e0a96d]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#a89f91] hover:text-[#fdf6ec] p-1.5 rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Kicker */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#e0a96d] uppercase tracking-widest">
            <Cake className="w-4 h-4 text-[#e0a96d]" />
            <span>Make a Birthday Wish</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#fdf6ec] font-normal tracking-tight">
            Happy Birthday, Revathy!
          </h2>
          <p className="text-xs sm:text-sm text-[#a89f91] font-light max-w-sm mx-auto">
            Close your eyes, think of your sweetest wish for the year ahead, and blow out the candles.
          </p>
        </div>

        {/* Digital Birthday Cake Illustration */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          {/* Candles */}
          <div className="flex items-end justify-center gap-5 mb-1 relative z-20">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame */}
                {!candlesBlown ? (
                  <div className="relative mb-0.5">
                    <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-pulse shadow-[0_0_15px_#f59e0b]" />
                    <div className="absolute inset-0 w-2 h-4 mx-auto my-auto rounded-full bg-blue-300/60 blur-[0.5px]" />
                  </div>
                ) : (
                  <div className="h-6 flex items-center justify-center">
                    <span className="text-[10px] text-slate-400 italic animate-fade-out">~💨</span>
                  </div>
                )}
                {/* Candle Stick */}
                <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-[#fde047] to-[#e0a96d] border border-white/20 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="w-56 sm:w-64 relative z-10">
            {/* Top Frosting Layer */}
            <div className="h-9 rounded-t-2xl bg-gradient-to-r from-[#ffe4e6] via-[#fecdd3] to-[#ffe4e6] border-b-2 border-rose-300/40 relative shadow-md flex items-center justify-around px-4">
              <span className="text-xs">✨</span>
              <span className="text-xs">🍓</span>
              <span className="text-xs">🌸</span>
              <span className="text-xs">🍓</span>
              <span className="text-xs">✨</span>
            </div>

            {/* Middle Sponge Layer */}
            <div className="h-10 bg-gradient-to-r from-[#831843] via-[#9d174d] to-[#831843] flex items-center justify-center text-xs font-serif italic text-pink-100 tracking-wider">
              Revathy
            </div>

            {/* Bottom Base Layer */}
            <div className="h-12 rounded-b-xl bg-gradient-to-r from-[#be185d] via-[#db2777] to-[#be185d] border-t-2 border-pink-400/30 flex items-center justify-center">
              <span className="font-script text-2xl text-amber-100 drop-shadow">Happy Birthday</span>
            </div>

            {/* Cake Stand Plate */}
            <div className="h-3 w-64 sm:w-72 -mx-4 rounded-full bg-gradient-to-r from-[#e0a96d]/60 via-[#fdf6ec] to-[#e0a96d]/60 shadow-xl mt-0.5" />
          </div>
        </div>

        {/* Wish Input or Revealed Birthday Blessings */}
        {!candlesBlown ? (
          <div className="space-y-4 max-w-sm mx-auto text-left">
            <div>
              <label className="block text-xs text-[#a89f91] mb-1.5">
                Whisper your secret birthday wish here:
              </label>
              <input
                type="text"
                placeholder="e.g. May this year be filled with endless adventures together..."
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c10] border border-[#e0a96d]/25 text-[#fdf6ec] text-xs focus:outline-none focus:border-[#e0a96d]"
              />
            </div>

            <button
              onClick={handleBlowCandles}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#f5d0a9] to-[#c48b52] text-[#181105] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#e0a96d]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#181105] group-hover:scale-125 transition-transform" />
              <span>Make Wish & Blow Candles</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 p-5 rounded-2xl bg-[#0b0c10]/80 border border-[#e0a96d]/30 text-center animate-in zoom-in-95">
            <div className="font-script text-2xl sm:text-3xl text-[#e0a96d]">
              May All Your Wishes Come True!
            </div>
            <p className="font-serif italic text-sm sm:text-base text-[#fdf6ec] leading-relaxed">
              “Today the entire universe rejoices because you were born, Revathy. You are the heartbeat of our home, the brightness of my mornings, and my greatest blessing in life. Happy Birthday, my love.”
            </p>
            {savedWish && (
              <div className="text-xs text-[#a89f91] italic pt-2 border-t border-white/10">
                Your Wish: “{savedWish}” (Stored safely in the stars ✨)
              </div>
            )}
            <div className="pt-2 flex items-center justify-center gap-4">
              <button
                onClick={handleRelight}
                className="px-4 py-2 rounded-full border border-white/20 text-xs text-[#cdc1b4] hover:bg-white/5 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#e0a96d]" />
                <span>Relight Candles</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#e0a96d] text-[#181105] text-xs font-semibold hover:brightness-110 shadow-md"
              >
                Explore Your Birthday Tribute
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
