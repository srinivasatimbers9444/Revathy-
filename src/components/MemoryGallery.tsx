import React, { useState, useEffect } from 'react';
import { MemoryPhoto } from '../types';
import { Camera, MapPin, Calendar, X, Plus, Sparkles, Heart } from 'lucide-react';

const INITIAL_MEMORIES: MemoryPhoto[] = [
  {
    id: 'p_intimate',
    title: 'The Infinity Vow & Sacred Glance',
    date: 'Our Sacred Day',
    location: 'Looking Into Eternity',
    imageUrl: '/src/assets/images/wedding_intimate_love_1791390834068.jpg',
    caption: 'Your gentle hand on my cheek, the infinity ring, and forever in your eyes.',
    backNote: 'Every time you touch my cheek like this, all the rush and chaos of the world ceases to exist. That infinity symbol on your ring was not just an ornament; it was the quiet vow our hearts made before we even spoke our first words.',
  },
  {
    id: 'p_chariot',
    title: 'Our Royal Procession & Electric Joy',
    date: 'The Night of Celebration',
    location: 'Under the Festive Canopy',
    imageUrl: '/src/assets/images/wedding_chariot_night_1791390848914.jpg',
    caption: 'Waving to the world with sunglasses, laughter, and unbound happiness.',
    backNote: 'Sitting in our royal golden chariot, wearing our shades and laughing at everyone cheering! In your royal purple outfit and garland, you were radiant beyond measure. You are the only queen in my kingdom.',
  },
  {
    id: 'p_ceremony',
    title: 'Surrounded by Love & Sacred Blessings',
    date: 'Our Wedding Ceremony',
    location: 'The Grand Mandap Stage',
    imageUrl: '/src/assets/images/wedding_ceremony_stage_1791390859944.jpg',
    caption: 'Exchanging rings and garlands before everyone we love.',
    backNote: 'Sitting on the golden throne beside you, exchanging garlands, surrounded by our families and friends smiling with pride. That was the greatest moment of my life: knowing you are officially my wife.',
  },
  {
    id: 'p1',
    title: 'Candlelit Evenings & Golden Hours',
    date: 'Our Anniversary Evening',
    location: 'Our Sacred Space',
    imageUrl: '/src/assets/images/candlelit_roses_elegance_1791388846186.jpg',
    caption: 'Roses and candlelight, but your smile was the only light that mattered.',
    backNote: 'I remember looking across the table at you and whispering a silent prayer of gratitude to the universe for making you my wife. Every candle flickered to the rhythm of our laughter.',
  },
  {
    id: 'p2',
    title: 'Under the Celestial Mirror',
    date: 'Midnight Stargazing',
    location: 'Under the Infinite Sky',
    imageUrl: '/src/assets/images/starlit_night_reflection_1791388871686.jpg',
    caption: 'Counting shooting stars while your hand rested warm in mine.',
    backNote: 'We sat in pure silence watching the nebula reflect off the water. You whispered a wish on a shooting star. When I asked what it was, you looked at me and said, "Already came true."',
  },
  {
    id: 'p3',
    title: 'Twilight Stroll Into Forever',
    date: 'The Golden Promenade',
    location: 'Where We First Walked',
    imageUrl: '/src/assets/images/hero_romantic_twilight_1791388831770.jpg',
    caption: 'Two souls walking one shared path under twilight skies.',
    backNote: 'Walking beside you is my favorite pace in life. No hurry, no worries, just the comforting rhythm of our footsteps side by side.',
  },
];

export const MemoryGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    const saved = localStorage.getItem('revathy_suriya_memories');
    if (!saved) return INITIAL_MEMORIES;
    try {
      const parsed: MemoryPhoto[] = JSON.parse(saved);
      const missing = INITIAL_MEMORIES.filter((init) => !parsed.some((p) => p.id === init.id));
      return [...missing, ...parsed];
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newBackNote, setNewBackNote] = useState('');

  useEffect(() => {
    localStorage.setItem('revathy_suriya_memories', JSON.stringify(memories));
  }, [memories]);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newPhoto: MemoryPhoto = {
      id: 'p_' + Date.now(),
      title: newTitle.trim(),
      date: newDate.trim() || 'Timeless Moment',
      location: newLocation.trim() || 'Our Memory',
      imageUrl: newImageUrl.trim(),
      caption: newCaption.trim() || 'A cherished memory of Revathy and Suriya.',
      backNote: newBackNote.trim() || 'Forever preserved in our hearts.',
    };

    const updated = [newPhoto, ...memories];
    setMemories(updated);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewImageUrl('');
    setNewCaption('');
    setNewBackNote('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="memories" className="py-24 relative bg-[#0b0c10] border-t border-[#e0a96d]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#e0a96d]">
              <Camera className="w-3.5 h-3.5 text-[#e0a96d]" />
              <span>Vintage Polaroids & Snapshots</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#fdf6ec] font-normal tracking-tight">
              Our Visual Symphony
            </h2>
            <p className="text-sm sm:text-base text-[#a89f91] font-light max-w-xl">
              Moments frozen in time. Click a polaroid to enlarge it, or tap the flip button to read the
              secret handwritten memory note on the back.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="self-start md:self-end px-5 py-2.5 rounded-full border border-[#e0a96d]/30 bg-[#161220] hover:bg-[#201a2f] text-xs font-medium text-[#fdf6ec] hover:border-[#e0a96d] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#e0a96d]" />
            <span>Add Couple Photo</span>
          </button>
        </div>

        {/* Polaroid Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {memories.map((photo) => {
            const isFlipped = !!flippedIds[photo.id];
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative cursor-pointer select-none perspective"
              >
                {/* Polaroid Frame */}
                <div
                  className={`bg-[#fdf9f1] text-[#1c1815] rounded-xl p-3 sm:p-4 shadow-xl border border-[#e5d8c5] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-1 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {!isFlipped ? (
                    /* Front side */
                    <>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#241e2d] mb-3 relative">
                        <img
                          src={photo.imageUrl}
                          alt={`Suriya Revathy birthday memory - ${photo.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Handwritten text caption */}
                      <div className="text-left space-y-1 px-1">
                        <div className="font-serif font-bold text-sm sm:text-base text-[#241e2d] truncate">
                          {photo.title}
                        </div>
                        <p className="font-script text-base text-[#7c2d12] truncate">
                          {photo.caption}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-[#786a5a] pt-2 border-t border-[#e2d5c3]">
                          <span className="truncate">{photo.date}</span>
                          <span className="truncate">{photo.location}</span>
                        </div>
                      </div>

                      {/* Flip Hint */}
                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="mt-2 w-full text-center text-[11px] text-[#9a3412] font-medium hover:underline flex items-center justify-center gap-1"
                      >
                        <span>Flip to read back note</span> ↻
                      </button>
                    </>
                  ) : (
                    /* Back side with handwritten memory note */
                    <div className="aspect-[4/3] min-h-[260px] p-2 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-[#e2d5c3]">
                          <span className="text-xs font-serif font-semibold text-[#7c2d12]">
                            Back of Polaroid
                          </span>
                          <span className="text-[10px] text-[#786a5a]">{photo.date}</span>
                        </div>
                        <p className="font-serif italic text-sm text-[#332b21] mt-3 leading-relaxed">
                          “{photo.backNote}”
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#e2d5c3] flex items-center justify-between">
                        <span className="font-script text-xl text-[#7c2d12]">Revathy & Suriya</span>
                        <button
                          onClick={(e) => toggleFlip(photo.id, e)}
                          className="text-[11px] text-[#9a3412] font-semibold hover:underline"
                        >
                          Flip back ↺
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl bg-[#14101e] border border-[#e0a96d]/40 rounded-2xl overflow-hidden shadow-2xl relative text-left">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={`Suriya Revathy birthday - ${activePhoto.title}`}
                className="max-h-[60vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-[#14101e]">
              <div className="flex items-center gap-2 text-xs text-[#e0a96d]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePhoto.date}</span>
                <span>·</span>
                <MapPin className="w-3.5 h-3.5" />
                <span>{activePhoto.location}</span>
              </div>

              <h3 className="font-serif text-2xl text-[#fdf6ec] font-normal">
                {activePhoto.title}
              </h3>

              <p className="font-serif italic text-base text-[#f5d0a9]">
                “{activePhoto.caption}”
              </p>

              <p className="text-sm text-[#cdc1b4] leading-relaxed pt-2 border-t border-white/10 font-light">
                {activePhoto.backNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#14101e] border border-[#e0a96d]/30 rounded-2xl p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#a89f91] hover:text-[#fdf6ec] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-[#e0a96d]">
              <Camera className="w-4 h-4" />
              <h3 className="font-serif text-xl text-[#fdf6ec]">Add a Couple Photo</h3>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Our Beach Sunset, Revathy Laughing..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#a89f91] mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. June 14, 2025"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#a89f91] mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Our Living Room, Paris..."
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Upload Photo or Image URL</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-[#a89f91] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#e0a96d] file:text-[#181105] hover:file:brightness-110"
                  />
                  <input
                    type="url"
                    placeholder="Or paste an image URL..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Polaroid Caption</label>
                <input
                  type="text"
                  placeholder="e.g. The best afternoon with my favorite person."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-[#e0a96d]/20 text-[#fdf6ec] text-sm focus:outline-none focus:border-[#e0a96d]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a89f91] mb-1">Handwritten Note for Back</label>
                <textarea
                  rows={3}
                  placeholder="What was Suriya thinking at this exact second..."
                  value={newBackNote}
                  onChange={(e) => setNewBackNote(e.target.value)}
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
                  disabled={!newImageUrl}
                  className="px-5 py-2 text-xs font-semibold text-[#181105] bg-[#e0a96d] rounded-lg hover:brightness-110 disabled:opacity-50"
                >
                  Pin to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
