import React, { useState, useEffect } from 'react';
import { ReasonItem } from '../types';
import { Sparkles, Heart, Shuffle, Plus, X, BookmarkCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_REASONS: ReasonItem[] = [
  { id: 'r1', number: 1, text: 'The way your eyes soften when you look at me across a crowded room.', category: 'Your Soul', isFavorite: true },
  { id: 'r2', number: 2, text: 'How you remember every little thing that makes my day better.', category: 'Little Moments' },
  { id: 'r3', number: 3, text: 'Your infectious laugh that instantly wipes away any trace of stress.', category: 'Your Smile', isFavorite: true },
  { id: 'r4', number: 4, text: 'The gentle courage you demonstrate whenever life gets demanding.', category: 'Your Soul' },
  { id: 'r5', number: 5, text: 'How warm your hand feels when it slips naturally into mine.', category: 'Little Moments' },
  { id: 'r6', number: 6, text: 'The dreams we whisper together about our porch, our travels, and our future.', category: 'Our Future' },
  { id: 'r7', number: 7, text: 'The unmatched kindness and empathy you show to everyone around you.', category: 'Your Soul' },
  { id: 'r8', number: 8, text: 'How your morning smile is brighter than any golden sunrise.', category: 'Your Smile' },
  { id: 'r9', number: 9, text: 'The funny little expressions you make when you are concentrated on something.', category: 'Little Moments' },
  { id: 'r10', number: 10, text: 'That you believe in me even when I am doubting myself.', category: 'Your Soul', isFavorite: true },
  { id: 'r11', number: 11, text: 'The way we can sit in total silence and feel completely full of joy.', category: 'Little Moments' },
  { id: 'r12', number: 12, text: 'How excited you get over small, delightful surprises.', category: 'Your Smile' },
  { id: 'r13', number: 13, text: 'The way you make our house feel like a warm, loving home.', category: 'Our Future' },
  { id: 'r14', number: 14, text: 'Your wisdom when giving advice—always thoughtful and fair.', category: 'Your Soul' },
  { id: 'r15', number: 15, text: 'How you put up with my quirks and turn them into inside jokes.', category: 'Little Moments' },
  { id: 'r16', number: 16, text: 'The radiance you bring into any space the second you step into it.', category: 'Your Smile' },
  { id: 'r17', number: 17, text: 'That I know I will love you even more when we are 80 than I do today.', category: 'Our Future', isFavorite: true },
  { id: 'r18', number: 18, text: 'The way your hugs have the supernatural ability to heal anything.', category: 'Little Moments' },
];

export const ReasonsJar: React.FC = () => {
  const [reasons, setReasons] = useState<ReasonItem[]>(() => {
    const saved = localStorage.getItem('revathy_reasons_jar');
    return saved ? JSON.parse(saved) : INITIAL_REASONS;
  });

  const [currentReason, setCurrentReason] = useState<ReasonItem>(reasons[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReasonText, setNewReasonText] = useState('');
  const [newCategory, setNewCategory] = useState<'Your Soul' | 'Your Smile' | 'Little Moments' | 'Our Future'>('Little Moments');

  useEffect(() => {
    localStorage.setItem('revathy_reasons_jar', JSON.stringify(reasons));
  }, [reasons]);

  const drawRandomReason = () => {
    setIsFlipping(true);
    const pool = selectedCategory === 'All' ? reasons : reasons.filter((r) => r.category === selectedCategory);
    const candidates = pool.filter((r) => r.id !== currentReason.id);
    const next = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : pool[0];

    setTimeout(() => {
      setCurrentReason(next);
      setIsFlipping(false);
      confetti({
        particleCount: 22,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e0a96d', '#f43f5e', '#fef08a'],
      });
    }, 200);
  };

  const toggleFavorite = (id: string) => {
    setReasons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
    if (currentReason.id === id) {
      setCurrentReason((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;

    const newEntry: ReasonItem = {
      id: 'r_' + Date.now(),
      number: reasons.length + 1,
      text: newReasonText.trim(),
      category: newCategory,
      isFavorite: false,
    };

    const updated = [...reasons, newEntry];
    setReasons(updated);
    setCurrentReason(newEntry);
    setIsAddModalOpen(false);
    setNewReasonText('');
  };

  const categories = ['All', 'Your Soul', 'Your Smile', 'Little Moments', 'Our Future'];

  return (
    <section id="reasons" className="py-24 relative bg-[#0e0c15] border-t border-[#e0a96d]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
            <Sparkles className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>The Infinite Jar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#fdf6ec] font-normal tracking-tight">
            Infinite Reasons I Adore Revathy
          </h2>
          <p className="text-sm sm:text-base text-[#a89f91] font-light">
            Every day with you gives birth to a hundred new reasons. Draw a folded origami scroll
            from our crystal jar to see why you are endlessly cherished.
          </p>
        </div>

        {/* Filter categories as functional segmented controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#e0a96d] text-[#181105] shadow-md font-semibold'
                  : 'bg-[#161220] text-[#a89f91] hover:text-[#fdf6ec] border border-[#e0a96d]/15 hover:border-[#e0a96d]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Center Stage: The Scroll Card */}
        <div className="max-w-xl mx-auto">
          <div
            className={`glass-panel rounded-3xl p-8 sm:p-12 border-2 border-[#e0a96d]/30 text-center relative shadow-2xl transition-all duration-300 ${
              isFlipping ? 'scale-95 opacity-50 blur-xs' : 'scale-100 opacity-100'
            }`}
          >
            {/* Top Bar inside scroll card */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e0a96d]/15 mb-8">
              <span className="font-serif italic text-sm text-[#e0a96d]">
                Reason #{currentReason.number}
              </span>
              <span className="text-xs text-[#a89f91]">{currentReason.category}</span>
              <button
                onClick={() => toggleFavorite(currentReason.id)}
                className="p-1 text-rose-400 hover:text-rose-300 transition-colors"
                title={currentReason.isFavorite ? 'Saved to favorites' : 'Mark as favorite'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    currentReason.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-[#a89f91]'
                  }`}
                />
              </button>
            </div>

            {/* The Main Reason Quote */}
            <div className="min-h-[140px] flex items-center justify-center mb-8 px-2">
              <p className="font-serif text-xl sm:text-2xl text-[#fdf6ec] leading-relaxed italic">
                “{currentReason.text}”
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#e0a96d]/15 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="text-xs text-[#a89f91] hover:text-[#e0a96d] flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Reason</span>
              </button>

              <button
                onClick={drawRandomReason}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#c48b52] text-[#181105] text-xs font-semibold hover:brightness-110 shadow-lg shadow-[#e0a96d]/20 transition-all flex items-center gap-2"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#181105]" />
                <span>Draw Another Scroll</span>
              </button>
            </div>
          </div>

          {/* Quick Counter */}
          <div className="mt-6 text-center text-xs text-[#a89f91]">
            <span>{reasons.length} Reasons preserved in our jar</span>
            <span className="mx-2">·</span>
            <span>{reasons.filter((r) => r.isFavorite).length} Favorited</span>
          </div>
        </div>
      </div>

      {/* Add Reason Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#14101e] border border-[#e0a96d]/30 rounded-2xl p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#a89f91] hover:text-[#fdf6ec] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl text-[#fdf6ec] mb-4">Add a Reason to the Jar</h3>

            <form onSubmit={handleAddReason} className="space-y-4">
              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as 'Your Soul' | 'Your Smile' | 'Little Moments' | 'Our Future')
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                >
                  <option value="Your Soul">Your Soul</option>
                  <option value="Your Smile">Your Smile</option>
                  <option value="Little Moments">Little Moments</option>
                  <option value="Our Future">Our Future</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Reason Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="e.g. The way you comfort me after a long day..."
                  value={newReasonText}
                  onChange={(e) => setNewReasonText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#a89f91] hover:text-[#fdf6ec]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-[#181105] bg-[#e0a96d] rounded-lg hover:brightness-110"
                >
                  Drop Into Jar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
