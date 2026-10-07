/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TimelineJourney } from './components/TimelineJourney';
import { LettersVault } from './components/LettersVault';
import { ReasonsJar } from './components/ReasonsJar';
import { MemoryGallery } from './components/MemoryGallery';
import { CoupleQuiz } from './components/CoupleQuiz';
import { StargazerVow } from './components/StargazerVow';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { Footer } from './components/Footer';
import { SpecialDedicationModal } from './components/SpecialDedicationModal';
import { BirthdayCakeModal } from './components/BirthdayCakeModal';
import { romanticAudio } from './utils/audioEngine';

export default function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isDedicationOpen, setIsDedicationOpen] = useState(false);
  const [isBirthdayCakeOpen, setIsBirthdayCakeOpen] = useState(false);

  const handleToggleMusic = () => {
    const newState = romanticAudio.togglePlay();
    setIsPlayingMusic(newState);
  };

  const handleStartMusic = () => {
    if (!isPlayingMusic) {
      romanticAudio.start();
      setIsPlayingMusic(true);
    }
    setIsDedicationOpen(false);
  };

  const handleStartBirthdaySong = () => {
    romanticAudio.setTrack(0); // Happy Birthday Revathy Serenade
    if (!isPlayingMusic) {
      romanticAudio.start();
      setIsPlayingMusic(true);
    }
  };

  const handleOpenLetters = () => {
    const el = document.getElementById('letters');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f2e9e4] relative selection:bg-[#e0a96d]/30 selection:text-[#fff0db]">
      {/* Background Floating Petals & Celestial Stardust */}
      <AmbientCanvas effectMode="both" speed={0.8} />

      {/* Top Bar Header */}
      <Header
        onToggleMusic={handleToggleMusic}
        isPlayingMusic={isPlayingMusic}
        onOpenQuickLoveNote={() => setIsDedicationOpen(true)}
        onOpenBirthdayCake={() => setIsBirthdayCakeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-20">
        {/* Hero Section */}
        <Hero
          onOpenLetters={handleOpenLetters}
          onStartMelody={handleStartMusic}
          onOpenBirthdayCake={() => setIsBirthdayCakeOpen(true)}
        />

        {/* Chapter 1: The Constellations of Us */}
        <TimelineJourney />

        {/* Chapter 2: Letters Left on Your Pillow */}
        <LettersVault />

        {/* Chapter 3: The 365 Reasons Jar */}
        <ReasonsJar />

        {/* Chapter 4: Our Visual Symphony (Memory Gallery & Polaroids) */}
        <MemoryGallery />

        {/* Chapter 5: How Well Do We Know Our Love? (Interactive Quiz) */}
        <CoupleQuiz />

        {/* Chapter 6: The Seven Sacred Vows & Stargazer */}
        <StargazerVow />
      </main>

      {/* Floating Ambient Music Player */}
      <MusicPlayerBar
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />

      {/* Special Dedication Modal */}
      <SpecialDedicationModal
        isOpen={isDedicationOpen}
        onClose={() => setIsDedicationOpen(false)}
        onStartMusicAndExplore={handleStartMusic}
      />

      {/* Interactive Birthday Cake & Candles Modal */}
      <BirthdayCakeModal
        isOpen={isBirthdayCakeOpen}
        onClose={() => setIsBirthdayCakeOpen(false)}
        onStartBirthdaySerenade={handleStartBirthdaySong}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
