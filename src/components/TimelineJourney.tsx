import React, { useState, useEffect } from 'react';
import { Milestone } from '../types';
import { Plus, X, Heart, Star, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    yearOrDate: 'Chapter One',
    category: 'The Beginning',
    title: 'The First Spark: When You Entered My World',
    description:
      'I still remember the very first time I looked into your eyes. There was a gentle grace about you that made everything else fade into background noise. I realized in that single breath that my life was never going to be the ordinary thing it once was.',
    poeticSnippet: '“In a room full of people, my eyes will always search only for you.”',
  },
  {
    id: 'm2',
    yearOrDate: 'Chapter Two',
    category: 'Deepening Love',
    title: 'Midnight Whispers & Unfiltered Laughter',
    description:
      'Those long, late-night conversations where we talked about our childhoods, our secret fears, our wild dreams, and everything in between. You made me laugh until my chest ached. In your honesty, I found the safest home I have ever known.',
    poeticSnippet: '“You turned the simplest hours into memories etched in gold.”',
  },
  {
    id: 'm3',
    yearOrDate: 'Chapter Three',
    category: 'The Sacred Vow',
    title: 'When Two Souls Became One Unbroken Promise',
    description:
      'Standing before family, friends, and the heavens, promising to love, cherish, and stand by you in every breath. Seeing you as my bride was the most breathtaking sight of my entire existence. My heart has been completely yours ever since.',
    poeticSnippet: '“I chose you then, I choose you today, and I will choose you in every lifetime.”',
  },
  {
    id: 'm4',
    yearOrDate: 'Chapter Four',
    category: 'Our Sanctuary',
    title: 'The Unspoken Magic of Everyday Life',
    description:
      'It is not only the grand celebrations that define our love, Revathy—it is the morning cups of tea, your sleepy smile when you wake up, how you hum softly to yourself, and the reassuring warmth of your hand inside my jacket pocket on chilly evenings.',
    poeticSnippet: '“Ordinary days become extraordinary simply because you are in them.”',
  },
  {
    id: 'm5',
    yearOrDate: 'Chapter Five',
    category: 'Our Resilience',
    title: 'Weathering Every Storm, Side by Side',
    description:
      'Life brings challenges, but whenever the winds blew hard, your unwavering courage and calm wisdom kept our ship steady. Having you as my partner taught me what true partnership, unconditional trust, and unshakeable resilience mean.',
    poeticSnippet: '“With your hand in mine, there is no road too steep and no dark too deep.”',
  },
  {
    id: 'm6',
    yearOrDate: 'Chapter Six',
    category: 'Our Tomorrow',
    title: 'Growing Old, Hand in Hand, Forever',
    description:
      'My greatest prayer is to watch silver threads weave into our hair, to sit on a quiet veranda watching the evening sunsets, still making you laugh, still holding your hand, still as madly in love with you as the first day.',
    poeticSnippet: '“The best is yet to come, my sweet Revathy.”',
  },
];

export const TimelineJourney: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem('revathy_suriya_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(milestones[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('New Memory');
  const [newDescription, setNewDescription] = useState('');
  const [newSnippet, setNewSnippet] = useState('');

  useEffect(() => {
    localStorage.setItem('revathy_suriya_milestones', JSON.stringify(milestones));
  }, [milestones]);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newEntry: Milestone = {
      id: 'm_' + Date.now(),
      yearOrDate: newDate.trim() || 'Precious Moment',
      category: newCategory.trim() || 'Cherished Memory',
      title: newTitle.trim(),
      description: newDescription.trim(),
      poeticSnippet: newSnippet.trim() ? `“${newSnippet.trim()}”` : '“Forever carved in our hearts.”',
    };

    const updated = [...milestones, newEntry];
    setMilestones(updated);
    setActiveMilestone(newEntry);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewDescription('');
    setNewSnippet('');

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e0a96d', '#f43f5e', '#ffffff'],
    });
  };

  return (
    <section id="story" className="py-24 relative border-t border-[#e0a96d]/15 bg-[#0e0c15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
            <Star className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>Our Sacred Timeline</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#fdf6ec] font-normal tracking-tight">
            The Constellations of Us
          </h2>
          <p className="text-sm sm:text-base text-[#a89f91] font-light">
            Every step we have taken together has been a chapter in the greatest story of my life.
            Click any milestone to unfold the memories that make my soul grateful for you.
          </p>
        </div>

        {/* Milestone interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Milestone Chapter Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e0a96d]/15">
              <span className="text-xs uppercase tracking-wider text-[#a89f91]">Chapters of Our Love</span>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[#e0a96d] hover:text-[#f5d0a9] transition-colors py-1 px-2.5 rounded-lg border border-[#e0a96d]/20 hover:border-[#e0a96d]/40 bg-[#161220]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Memory</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {milestones.map((m, idx) => {
                const isSelected = activeMilestone?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveMilestone(m)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#1e182c] border-[#e0a96d] shadow-lg shadow-[#e0a96d]/10'
                        : 'bg-[#13101c] border-[#e0a96d]/15 hover:border-[#e0a96d]/30 hover:bg-[#181324]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-[#a89f91] mb-1">
                      <span className="font-serif italic text-[#e0a96d]">{m.yearOrDate}</span>
                      <span>·</span>
                      <span>{m.category}</span>
                      <span className="ml-auto font-mono text-[11px] text-[#736b60]">#{idx + 1}</span>
                    </div>
                    <div
                      className={`text-sm font-medium leading-snug line-clamp-1 ${
                        isSelected ? 'text-[#fdf6ec]' : 'text-[#cdc1b4]'
                      }`}
                    >
                      {m.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Expanded Chapter View */}
          <div className="lg:col-span-7">
            {activeMilestone ? (
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#e0a96d]/25 relative min-h-[440px] flex flex-col justify-between">
                {/* Header details with clean unboxed metadata */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#a89f91] mb-3">
                    <span className="font-serif italic text-[#e0a96d] text-sm">
                      {activeMilestone.yearOrDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeMilestone.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Written for Revathy</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#fdf6ec] font-normal leading-snug mb-6">
                    {activeMilestone.title}
                  </h3>

                  <div className="p-4 rounded-xl bg-[#0b0c10]/60 border-l-2 border-[#e0a96d] mb-6">
                    <p className="font-serif italic text-base sm:text-lg text-[#f5d0a9] leading-relaxed">
                      {activeMilestone.poeticSnippet}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#cdc1b4] leading-relaxed font-light whitespace-pre-line">
                    {activeMilestone.description}
                  </p>
                </div>

                {/* Footer with dedication note */}
                <div className="pt-6 mt-8 border-t border-[#e0a96d]/15 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#a89f91]">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Every memory sealed with devotion</span>
                  </div>
                  <span className="font-script text-2xl text-[#e0a96d]">Forever Suriya</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#14101e] border border-[#e0a96d]/30 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#a89f91] hover:text-[#fdf6ec] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-[#e0a96d]">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-serif text-xl text-[#fdf6ec]">Add a Cherished Memory</h3>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-4 text-left">
              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Our Trip to the Hills, A Quiet Rainy Evening..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#a89f91] mb-1">Date or Chapter Label</label>
                  <input
                    type="text"
                    placeholder="e.g. November 2024, Chapter 7"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#a89f91] mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Adventure, Special Day"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Poetic Snippet / Highlight</label>
                <input
                  type="text"
                  placeholder="e.g. The way you laughed under the umbrella..."
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">The Memory / Note</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write the full memory of this day for Revathy..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
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
                  className="px-5 py-2 text-xs font-semibold text-[#181105] bg-gradient-to-r from-[#e0a96d] to-[#c48b52] rounded-lg hover:brightness-110 shadow-md"
                >
                  Seal into Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
