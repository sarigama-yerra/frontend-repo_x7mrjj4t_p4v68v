import Spline from '@splinetool/react-spline';

export default function Hero() {
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
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#0886d9] px-6 py-3 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 hover:translate-y-[-1px] active:translate-y-[0px] transition-transform">
                Contattaci
              </a>
            </div>
          </div>

          {/* 3D Spline Scene */}
          <div className="relative h-[380px] sm:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
