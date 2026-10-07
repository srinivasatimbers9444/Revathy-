import React, { useState, useEffect } from 'react';
import { LoveLetter } from '../types';
import { Mail, Feather, X, Sparkles, Heart, Check, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_LETTERS: LoveLetter[] = [
  {
    id: 'l_bday',
    title: 'Happy Birthday to My Queen Revathy',
    preview: 'Today the earth marks another year of your gentle grace, but my heart marks another year of pure gratitude...',
    content: `My Dearest, Beautiful Revathy,

Happy Birthday to the woman who turned my entire existence into a masterpiece.

When I think about the day you were born, I am filled with awe. Years before I ever heard your laughter or held your hand, the universe was already preparing the most generous blessing of my life. 

Thank you for being born, my love. Thank you for choosing to share your laughter, your dreams, and your precious heart with me. Every year with you makes you more breathtaking, more wise, and more deeply cherished in my eyes.

May this new year of your life bring you boundless joy, peace in your mind, and the realization of every dream you have ever dared to whisper. I will spend every single day of this coming year ensuring you feel loved, adored, and treated like the queen you are.

Happy Birthday, my forever wife.

All my heart and soul,
Suriya`,
    date: 'A Birthday Love Letter',
    waxColor: '#be185d',
    sender: 'Suriya',
    recipient: 'Revathy',
  },
  {
    id: 'l1',
    title: 'Why You Are My Sanctuary',
    preview: 'In a world full of noise and relentless haste, your embrace is the only place where time stands still...',
    content: `My Dearest Revathy,

If someone asked me where I feel most at peace, I would not describe a mountain peak, a quiet seashore, or a starlit garden. I would simply speak your name.

Every day out in the world carries its weight, its challenges, and its storms. But the moment I see your eyes and feel your hand in mine, all the heavy burdens dissolve like mist in the morning sun. You are my calm. You give me a courage I never knew I possessed.

Thank you for being the quiet, constant grace in my life. Loving you is the most natural, effortless, and sacred thing I have ever done.

Forever your devoted husband,
Suriya`,
    date: 'Written in Midnight Stillness',
    waxColor: '#991b1b',
    sender: 'Suriya',
    recipient: 'Revathy',
  },
  {
    id: 'l2',
    title: 'The Little Things That Take My Breath Away',
    preview: 'You probably do not realize how often I watch you and marvel at the magic you carry effortlessly...',
    content: `Revathy, my heart,

There are countless grand things to love about you, but it is the smallest, quietest details that make me fall in love with you all over again each day:

The way your eyes crinkle when you burst into spontaneous laughter;
The gentle kindness you offer so selflessly to everyone who crosses your path;
The way you tilt your head when you are lost in thought;
The comfort of your voice murmuring softly beside me before we fall asleep;
And the strength and dignity with which you face every moment.

You make the world softer and infinitely more beautiful just by breathing in it. I am the luckiest man alive to be the one you chose to walk alongside.

With all my love,
Suriya`,
    date: 'A Whisper from the Heart',
    waxColor: '#b45309',
    sender: 'Suriya',
    recipient: 'Revathy',
  },
  {
    id: 'l3',
    title: 'My Sacred Promises to You',
    preview: 'I promise to honor your dreams, to protect your peace, and to love you through every season of life...',
    content: `To My Beloved Revathy,

Today, tomorrow, and until my last breath, I make these promises to you:

I promise to listen to your silence just as attentively as I listen to your words.
I promise to stand before you in moments of danger, beside you in moments of triumph, and behind you whenever you need someone to lean on.
I promise to never take our ordinary days for granted—to kiss your forehead every morning and remind you how cherished you are.
I promise to choose you, forgive with you, grow with you, and laugh with you through every season.

No matter what tomorrow brings, my hand will always be reaching for yours.

Yours for eternity,
Suriya`,
    date: 'Sealed for Eternity',
    waxColor: '#701a75',
    sender: 'Suriya',
    recipient: 'Revathy',
  },
  {
    id: 'l4',
    title: 'For the Days When the Sky Feels Heavy',
    preview: 'Open this when you are tired, overwhelmed, or ever doubt how truly extraordinary you are...',
    content: `My Sweet Revathy,

If today has been tough, if you are feeling weary, or if the world has been unkind—take a deep breath, close your eyes, and hear my voice speaking to you right now.

You are brilliant. You are deeply loved. You are more resilient than any storm that tries to shake you. You do not have to carry everything alone; whatever weighs on your heart, let me carry half of it.

Come rest your head on my shoulder. We will take it one breath at a time. Nothing will ever change how deeply and fiercely I adore you.

Always here, always yours,
Suriya`,
    date: 'To Read on Cloudy Days',
    waxColor: '#0f766e',
    sender: 'Suriya',
    recipient: 'Revathy',
  },
];

export const LettersVault: React.FC = () => {
  const [letters, setLetters] = useState<LoveLetter[]>(() => {
    const saved = localStorage.getItem('revathy_suriya_letters');
    if (!saved) return INITIAL_LETTERS;
    try {
      const parsed: LoveLetter[] = JSON.parse(saved);
      const missing = INITIAL_LETTERS.filter((init) => !parsed.some((p) => p.id === init.id));
      return [...missing, ...parsed];
    } catch {
      return INITIAL_LETTERS;
    }
  });

  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('Today');
  const [newContent, setNewContent] = useState('');
  const [newWax, setNewWax] = useState('#991b1b');

  useEffect(() => {
    localStorage.setItem('revathy_suriya_letters', JSON.stringify(letters));
  }, [letters]);

  const handleOpenLetter = (letter: LoveLetter, e: React.MouseEvent) => {
    setActiveLetter(letter);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 24,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: [letter.waxColor, '#e0a96d', '#ffffff'],
    });
  };

  const handleSealNewLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const letter: LoveLetter = {
      id: 'l_' + Date.now(),
      title: newTitle.trim(),
      preview: newContent.slice(0, 95) + '...',
      content: newContent.trim(),
      date: newDate.trim() || 'Sealed with Love',
      waxColor: newWax,
      sender: 'Suriya',
      recipient: 'Revathy',
    };

    const updated = [letter, ...letters];
    setLetters(updated);
    setIsWriteModalOpen(false);
    setActiveLetter(letter);
    setNewTitle('');
    setNewContent('');

    confetti({
      particleCount: 45,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#e0a96d', '#f43f5e', '#ffffff'],
    });
  };

  return (
    <section id="letters" className="py-24 relative bg-[#0b0c10] border-t border-[#e0a96d]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
              <Feather className="w-3.5 h-3.5 text-[#e0a96d]" />
              <span>Pillow Notes & Parchment</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#fdf6ec] font-normal tracking-tight">
              Letters Left on Your Pillow
            </h2>
            <p className="text-sm sm:text-base text-[#a89f91] font-light max-w-xl">
              Handwritten words from Suriya to Revathy. Each envelope is wax-sealed with devotion.
              Tap any envelope to break the seal and read the letter within.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="self-start md:self-end px-5 py-2.5 rounded-full border border-[#e0a96d]/30 bg-[#161220] hover:bg-[#201a2f] text-xs font-medium text-[#fdf6ec] hover:border-[#e0a96d] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#e0a96d]" />
            <span>Seal a New Letter</span>
          </button>
        </div>

        {/* Feature Banner Card with Generated Art */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-[#e0a96d]/20 bg-[#120f1b] grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
            <img
              src="/src/assets/images/vintage_love_letter_quill_1791388859799.jpg"
              alt="Vintage love letter sealed with red wax and dried rose petals"
              className="w-full h-full object-cover filter saturate-[1.05]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#120f1b]" />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 text-left space-y-4">
            <div className="font-serif italic text-xl sm:text-2xl text-[#fdf6ec] leading-relaxed">
              “Words can never capture the fullness of what my heart feels for you, Revathy, but I will spend every lifetime trying anyway.”
            </div>
            <div className="flex items-center gap-3 text-xs text-[#a89f91]">
              <span>Handwritten & Preserved</span>
              <span>·</span>
              <span>Dedicated to Revathy</span>
              <span>·</span>
              <span className="font-script text-xl text-[#e0a96d]">With Eternal Devotion</span>
            </div>
          </div>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {letters.map((letter, idx) => (
            <div
              key={letter.id}
              onClick={(e) => handleOpenLetter(letter, e)}
              className="group relative p-6 rounded-2xl bg-[#14101e] border border-[#e0a96d]/15 hover:border-[#e0a96d]/45 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[290px] shadow-lg shadow-black/40"
            >
              {/* Wax Seal badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] text-[#a89f91] font-mono">No. 0{idx + 1}</span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-white/20 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: letter.waxColor }}
                  title="Wax Seal"
                >
                  <Heart className="w-4 h-4 text-white/90 fill-white/80" />
                </div>
              </div>

              {/* Title & Preview */}
              <div className="text-left space-y-2">
                <h3 className="font-serif text-lg sm:text-xl text-[#fdf6ec] group-hover:text-[#e0a96d] transition-colors leading-snug">
                  {letter.title}
                </h3>
                <p className="text-xs text-[#a89f91] line-clamp-3 leading-relaxed font-light">
                  {letter.preview}
                </p>
              </div>

              {/* Envelope footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#e0a96d]">
                <span className="font-serif italic text-xs text-[#a89f91]">{letter.date}</span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                  Break Seal →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Letter Reading Modal */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#fdf9f1] text-[#292219] rounded-2xl p-8 sm:p-12 shadow-2xl relative max-h-[85vh] overflow-y-auto border-2 border-[#e0a96d]/40">
            {/* Close button */}
            <button
              onClick={() => setActiveLetter(null)}
              className="absolute top-6 right-6 text-[#786a5a] hover:text-[#181105] p-1.5 rounded-full hover:bg-black/5"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Letter Header */}
            <div className="text-center pb-6 border-b border-[#e0a96d]/30 mb-8 space-y-2">
              <div className="font-script text-3xl sm:text-4xl text-[#991b1b]">
                For My Precious Revathy
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#181105] font-normal tracking-tight">
                {activeLetter.title}
              </h2>
              <div className="text-xs text-[#8c7e6e] italic">
                {activeLetter.date} · From Suriya
              </div>
            </div>

            {/* Letter Body */}
            <div className="font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line text-[#332b21] space-y-4 text-left">
              {activeLetter.content}
            </div>

            {/* Letter Signature */}
            <div className="pt-8 mt-8 border-t border-[#e0a96d]/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#8c7e6e]">
                <Heart className="w-4 h-4 text-[#991b1b] fill-[#991b1b]" />
                <span>Sealed with boundless love</span>
              </div>
              <div className="font-script text-3xl text-[#991b1b]">Suriya</div>
            </div>
          </div>
        </div>
      )}

      {/* Write New Letter Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-[#14101e] border border-[#e0a96d]/30 rounded-2xl p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 text-[#a89f91] hover:text-[#fdf6ec] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-[#e0a96d]">
              <Feather className="w-4 h-4" />
              <h3 className="font-serif text-xl text-[#fdf6ec]">Seal a Private Love Note</h3>
            </div>

            <form onSubmit={handleSealNewLetter} className="space-y-4">
              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Letter Title / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A Thought While Watching You Sleep, A Little Thank You..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Occasion / Timing Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Morning Surprise, Our Anniversary, Just Because..."
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Wax Seal Color</label>
                <div className="flex items-center gap-3">
                  {[
                    { color: '#991b1b', label: 'Ruby' },
                    { color: '#b45309', label: 'Amber' },
                    { color: '#701a75', label: 'Amethyst' },
                    { color: '#0f766e', label: 'Emerald' },
                  ].map((wax) => (
                    <button
                      key={wax.color}
                      type="button"
                      onClick={() => setNewWax(wax.color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        newWax === wax.color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: wax.color }}
                      title={wax.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Your Letter</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Pour your heart out for Revathy..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#a89f91] hover:text-[#fdf6ec]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-[#181105] bg-gradient-to-r from-[#e0a96d] to-[#c48b52] rounded-lg hover:brightness-110 shadow-md"
                >
                  Seal & Add to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
