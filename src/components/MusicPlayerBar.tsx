import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, Disc } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

interface MusicPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const [currentTrack, setCurrentTrack] = useState(romanticAudio.getCurrentTrack());
  const [volume, setVolume] = useState(0.28);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleNextTrack = () => {
    const next = romanticAudio.nextTrack();
    setCurrentTrack({ ...next });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    romanticAudio.setVolume(v);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-panel rounded-full p-2.5 sm:px-4 sm:py-2.5 border border-[#e0a96d]/30 shadow-2xl flex items-center gap-3">
        {/* Spinning Vinyl Record Icon */}
        <button
          onClick={onTogglePlay}
          className="relative p-1 focus:outline-none"
          title={isPlaying ? 'Pause Melody' : 'Play Melody'}
        >
          <div
            className={`w-9 h-9 rounded-full bg-[#181224] border border-[#e0a96d]/40 flex items-center justify-center text-[#e0a96d] ${
              isPlaying ? 'animate-spin [animation-duration:6s]' : ''
            }`}
          >
            <Disc className="w-5 h-5 text-[#e0a96d]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white/90 drop-shadow" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white/90 translate-x-0.5 drop-shadow" />
            )}
          </div>
        </button>

        {/* Track Title */}
        <div className="text-left hidden sm:block max-w-[160px]">
          <div className="text-xs font-serif text-[#fdf6ec] truncate font-medium">
            {currentTrack.title}
          </div>
          <div className="text-[10px] text-[#e0a96d] truncate">
            {currentTrack.mood}
          </div>
        </div>

        {/* Next Track Button */}
        <button
          onClick={handleNextTrack}
          className="p-1.5 text-[#a89f91] hover:text-[#fdf6ec] transition-colors"
          title="Next Melody"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Volume slider */}
        <div className="hidden md:flex items-center gap-1.5 text-[#a89f91]">
          {volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 accent-[#e0a96d] h-1 rounded-lg cursor-pointer bg-white/20"
            aria-label="Adjust volume"
          />
        </div>
      </div>
    </div>
  );
};
