/**
 * Web Audio API procedural romantic music generator.
 * Produces serene, warm piano/harp arpeggios and soothing ambient soundscapes
 * without requiring external MP3 files.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private step: number = 0;
  private currentTrack: number = 0;

  // Track presets
  public tracks = [
    {
      id: 0,
      title: "Happy Birthday Revathy Serenade",
      mood: "Celebratory Music Box & Warm Piano",
      tempo: 130,
      frequencies: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
      progression: [
        [0, 2, 4, 7], // C major
        [3, 5, 7, 0], // F major
        [4, 6, 1, 3], // G major
        [0, 4, 7, 2]  // C major octave
      ]
    },
    {
      id: 1,
      title: "Revathy's Starlight Nocturne",
      mood: "Gentle Piano & Celestial Chimes",
      tempo: 120, // ms per beat ~ 500ms
      // Scale: D-flat major pentatonic / lyrical
      frequencies: [277.18, 311.13, 349.23, 415.30, 466.16, 554.37, 622.25, 698.46],
      progression: [
        [0, 2, 4, 7], // Db major
        [1, 4, 6, 8], // Ebm
        [3, 5, 7, 9], // Ab
        [0, 3, 5, 7]  // Gb
      ]
    },
    {
      id: 2,
      title: "Forever in Golden Twilight",
      mood: "Warm Romantic Waltz",
      tempo: 150,
      frequencies: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25],
      progression: [
        [0, 2, 4], // C
        [4, 6, 8], // Am
        [3, 5, 7], // F
        [1, 3, 5]  // G
      ]
    },
    {
      id: 3,
      title: "Echoes of Eternity & Devotion",
      mood: "Ethereal Ambient Harp",
      tempo: 180,
      frequencies: [220.0, 246.94, 277.18, 329.63, 369.99, 440.0, 493.88, 554.37],
      progression: [
        [0, 3, 5, 7],
        [2, 4, 6, 8],
        [1, 3, 5, 7],
        [0, 2, 4, 6]
      ]
    }
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(level: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, level)), this.ctx.currentTime);
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrack];
  }

  public setTrack(index: number) {
    this.currentTrack = index % this.tracks.length;
    this.step = 0;
  }

  public nextTrack() {
    this.setTrack((this.currentTrack + 1) % this.tracks.length);
    return this.tracks[this.currentTrack];
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.scheduleNotes();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private scheduleNotes = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const track = this.tracks[this.currentTrack];
    const chords = track.progression;
    const chordIdx = Math.floor(this.step / 8) % chords.length;
    const currentChord = chords[chordIdx];
    const noteInChord = currentChord[this.step % currentChord.length];
    
    const freq = track.frequencies[noteInChord % track.frequencies.length];

    // Play primary lyrical note
    this.playTone(freq, 1.8, 0.16, 'sine');

    // Occasional harmonic bass note on beat 0
    if (this.step % 8 === 0) {
      const bassFreq = track.frequencies[currentChord[0] % track.frequencies.length] * 0.5;
      this.playTone(bassFreq, 3.2, 0.22, 'triangle');
    }

    // Occasional gentle bell sparkle on odd steps
    if (this.step % 4 === 2) {
      const chimeFreq = freq * 2;
      this.playTone(chimeFreq, 1.2, 0.05, 'sine');
    }

    this.step++;

    const delay = 360 + (Math.sin(this.step * 0.4) * 40); // Natural humanized rubato
    this.timerId = window.setTimeout(this.scheduleNotes, delay);
  };

  private playTone(freq: number, duration: number, volume: number, type: OscillatorType) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft lowpass filter to make tone gentle & warm (like an acoustic piano felt damper)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1, now);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Smooth attack and natural exponential decay
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(volume, now + 0.06);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio context might be suspended or closed
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
