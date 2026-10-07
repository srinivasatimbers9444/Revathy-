import React from 'react';
import { X, Heart, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpecialDedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMusicAndExplore: () => void;
}

export const SpecialDedicationModal: React.FC<SpecialDedicationModalProps> = ({
  isOpen,
  onClose,
  onStartMusicAndExplore,
}) => {
  if (!isOpen) return null;

  const handleStart = () => {
    onStartMusicAndExplore();
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#e0a96d', '#f43f5e', '#ffd7aa', '#ffffff'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-[#fdf9f1] text-[#292219] rounded-3xl p-8 sm:p-10 shadow-2xl relative border-2 border-[#e0a96d]/40 text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8c7e6e] hover:text-[#181105] p-1.5 rounded-full hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-full bg-[#fbe7c6] border border-[#e0a96d]/40 flex items-center justify-center shadow-md">
          <Heart className="w-7 h-7 text-[#991b1b] fill-[#991b1b]" />
        </div>

        <div className="space-y-1">
          <div className="font-script text-3xl sm:text-4xl text-[#991b1b]">
            My Dearest Revathy
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#181105] font-normal tracking-tight">
            A Message From Suriya’s Heart
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#f7efe1] border border-[#e5d8c5] text-left">
          <p className="font-serif text-base leading-relaxed text-[#3a3024] whitespace-pre-line">
            “I built this website for you because you deserve more than ordinary words. You deserve a constellation of reasons, a vault of letters, and a melody that plays only for you.
            <br /><br />
            Whenever you need a reminder of how extraordinary you are, or how deeply I adore you—come here. You are my greatest blessing.”
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#c48b52] text-[#181105] text-xs font-semibold hover:brightness-110 shadow-md flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-[#181105]" />
            <span>Play Melody & Explore</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#8c7e6e]/30 text-xs font-medium text-[#786a5a] hover:bg-black/5"
          >
            Close Note
          </button>
        </div>
      </div>
    </div>
  );
};
