import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import HeroImagePicker from './HeroImagePicker';

export default function Hero() {
  const [showPicker, setShowPicker] = useState(false);
  const [heroImg, setHeroImg] = useState(null);
  const [heroPos, setHeroPos] = useState({ x: 50, y: 50 });
  const [heroScale, setHeroScale] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem('tg_hero_image');
    if (stored) setHeroImg(stored);
    const posStored = localStorage.getItem('tg_hero_pos');
    if (posStored) {
      try {
        const parsed = JSON.parse(posStored);
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          setHeroPos({ x: parsed.x, y: parsed.y });
        }
      } catch (e) {}
    }
    const scStored = localStorage.getItem('tg_hero_scale');
    if (scStored) {
      const v = Number(scStored);
      if (!Number.isNaN(v) && v > 0) setHeroScale(v);
    }
    const onUpdated = () => {
      const s = localStorage.getItem('tg_hero_image');
      setHeroImg(s || null);
      const p = localStorage.getItem('tg_hero_pos');
      if (p) {
        try {
          const parsed = JSON.parse(p);
          if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
            setHeroPos({ x: parsed.x, y: parsed.y });
          }
        } catch (e) {}
      }
      const sc = localStorage.getItem('tg_hero_scale');
      if (sc) {
        const v = Number(sc);
        if (!Number.isNaN(v) && v > 0) setHeroScale(v);
      }
    };
    window.addEventListener('tg-hero-updated', onUpdated);
    return () => window.removeEventListener('tg-hero-updated', onUpdated);
  }, []);

  return (
    <section id="home" className="relative pt-32">
      {/* Glass gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(8,134,217,0.25),transparent),radial-gradient(1000px_600px_at_120%_10%,rgba(14,25,38,0.8),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="py-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Spedizioni nazionali e internazionali senza confini.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-xl">
              Soluzioni su misura via terra, mare e aerea. Affidabilità, velocità e un servizio clienti dedicato per ogni spedizione.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#0886d9] px-6 py-3 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 hover:translate-y-[-1px] active:translate-y-[0px] transition-transform">
                Contattaci
              </a>
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
              >
                Cambia immagine hero
              </button>
            </div>
          </div>

          {/* Visual area: Spline 3D or uploaded image */}
          <div className="relative h-[380px] sm:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
            {heroImg ? (
              <img
                src={heroImg}
                alt="TG CARGO Hero"
                className="h-full w-full object-cover"
                style={{ objectPosition: `${heroPos.x}% ${heroPos.y}%`, transform: `scale(${heroScale})`, transformOrigin: 'center center' }}
              />
            ) : (
              <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            )}
          </div>
        </div>
      </div>

      {showPicker && <HeroImagePicker onClose={() => setShowPicker(false)} />}
    </section>
  );
}
