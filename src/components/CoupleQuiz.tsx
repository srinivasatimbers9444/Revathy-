import React, { useState } from 'react';
import { Award, CheckCircle2, Heart, Sparkles, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "When Suriya looks across a crowded room at Revathy, what happens inside his heart?",
    options: [
      { text: "Every bit of anxiety vanishes; all he sees is his home and peace.", isCorrect: true },
      { text: "He wonders if they turned off the kitchen stove.", isCorrect: false },
      { text: "He prepares a witty joke.", isCorrect: false },
    ],
    explanation: "Your presence is his greatest grounding force in this world.",
  },
  {
    question: "What is Revathy's undisputed superpower in their life together?",
    options: [
      { text: "Predicting the weather with 100% accuracy.", isCorrect: false },
      { text: "Infusing every space with warmth, graceful kindness, and boundless joy.", isCorrect: true },
      { text: "Knowing every movie plot before watching it.", isCorrect: false },
    ],
    explanation: "You make every room, house, and day feel like a sanctuary.",
  },
  {
    question: "What is Suriya's absolute favorite melody in the universe?",
    options: [
      { text: "A classical symphony orchestra.", isCorrect: false },
      { text: "Revathy's genuine, spontaneous laughter when she is truly delighted.", isCorrect: true },
      { text: "The morning ocean waves.", isCorrect: false },
    ],
    explanation: "Your laugh is the sweetest song he has ever heard.",
  },
  {
    question: "What will Suriya always do when Revathy has had a long or exhausting day?",
    options: [
      { text: "Hold her close, listen with his whole heart, and let her rest peacefully.", isCorrect: true },
      { text: "Start giving lengthy lectures.", isCorrect: false },
      { text: "Ask her to solve complicated puzzles.", isCorrect: false },
    ],
    explanation: "Protecting your peace and comforting your soul is his sacred mission.",
  },
  {
    question: "For how long has Suriya vowed to love and stand beside Revathy?",
    options: [
      { text: "Until next year.", isCorrect: false },
      { text: "Throughout this entire lifetime and across every universe yet to dawn.", isCorrect: true },
      { text: "Only when the weather is sunny.", isCorrect: false },
    ],
    explanation: "An eternal promise written in the stars for all time.",
  },
];

export const CoupleQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 20,
        spread: 50,
        colors: ['#e0a96d', '#f43f5e', '#ffffff'],
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#e0a96d', '#f43f5e', '#ffd7aa', '#ffffff'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <section id="quiz" className="py-24 relative bg-[#0e0c15] border-t border-[#e0a96d]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
            <Award className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>Playful Love Test</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#fdf6ec] font-normal tracking-tight">
            How Well Do We Know Our Love?
          </h2>
          <p className="text-sm sm:text-base text-[#a89f91] font-light">
            A sweet mini-quiz crafted for Revathy. Discover the heartfelt truths behind every question!
          </p>
        </div>

        {/* Quiz Container */}
        <div className="max-w-2xl mx-auto">
          {!isComplete ? (
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#e0a96d]/25 shadow-2xl relative text-left">
              {/* Progress Bar & Indicators */}
              <div className="flex items-center justify-between text-xs text-[#a89f91] mb-6 pb-4 border-b border-[#e0a96d]/15">
                <span className="font-serif italic text-[#e0a96d]">
                  Question {currentIndex + 1} of {QUESTIONS.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {QUESTIONS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex
                          ? 'w-6 bg-[#e0a96d]'
                          : idx < currentIndex
                          ? 'w-3 bg-emerald-500/70'
                          : 'w-3 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#fdf6ec] mb-8 font-normal leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  let btnStyle =
                    'bg-[#13101c] border-[#e0a96d]/15 text-[#cdc1b4] hover:border-[#e0a96d]/40 hover:bg-[#181423]';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isChosen && !opt.isCorrect) {
                      btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <div className="pt-6 border-t border-[#e0a96d]/15 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                  <p className="font-serif italic text-sm text-[#e0a96d]">
                    “{currentQ.explanation}”
                  </p>
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#c48b52] text-[#181105] text-xs font-semibold hover:brightness-110 shadow-md shrink-0"
                  >
                    {currentIndex + 1 < QUESTIONS.length ? 'Next Question →' : 'See Celebration'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Certificate of Eternal Love on Completion */
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border-2 border-[#e0a96d]/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#e0a96d] to-[#f5d0a9] flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-[#181105] fill-[#181105]" />
              </div>

              <div className="space-y-2">
                <div className="font-script text-3xl sm:text-4xl text-[#e0a96d]">
                  Official Declaration of Devotion
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#fdf6ec]">
                  Certificate of Eternal Love
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#a89f91]">
                  Conferred upon Revathy & Suriya
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0b0c10]/70 border border-[#e0a96d]/20 text-center max-w-lg mx-auto">
                <p className="font-serif italic text-base sm:text-lg text-[#f5d0a9] leading-relaxed">
                  “This certifies that Revathy holds the undisputed, complete, and everlasting title
                  to Suriya’s heart, validated with a perfect score of 100% unconditional adoration.”
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#a89f91]">
                  <span>Witnessed by the Stars</span>
                  <span className="font-script text-2xl text-[#e0a96d]">Forever Suriya</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-full border border-[#e0a96d]/30 text-xs text-[#fdf6ec] hover:bg-[#1f192b] flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#e0a96d]" />
                  <span>Play Again</span>
                </button>
                <a
                  href="#vows"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#c48b52] text-[#181105] text-xs font-semibold hover:brightness-110 shadow-lg flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#181105]" />
                  <span>View Our Sacred Vows</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
