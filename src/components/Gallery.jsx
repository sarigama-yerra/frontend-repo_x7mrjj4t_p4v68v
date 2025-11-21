import { useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1500043357865-c6b8827edf0a?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596568355154-945708e39053?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop'
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Photogallery</h2>
          <p className="mt-2 text-white/70">Scopri alcuni dei nostri lavori e mezzi in azione.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, i) => (
            <button key={i} onClick={() => setActive(src)} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img src={src} alt="TG CARGO" className="h-36 md:h-56 w-full object-cover transition group-hover:scale-[1.03]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4" onClick={() => setActive(null)}>
          <div className="max-w-5xl w-full">
            <img src={active} alt="Preview" className="w-full rounded-2xl border border-white/10" />
          </div>
        </div>
      )}
    </section>
  );
}
