export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0e1926]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-white font-semibold text-lg">TG CARGO</div>
            <p className="mt-2 text-white/70 max-w-sm">Spedizioni nazionali e internazionali. Soluzioni via Terra, Mare e Aerea. © 2025</p>
          </div>
          <div>
            <div className="text-white font-semibold">Contatti</div>
            <p className="mt-2 text-white/70">Via Esempio 123, 20100 Milano (MI)</p>
            <p className="text-white/70">info@tgcargo.it</p>
          </div>
          <div>
            <div className="text-white font-semibold">Legal</div>
            <ul className="mt-2 text-white/70 space-y-1">
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-white/50 text-sm">Made with passione e precisione logistica.</div>
      </div>
    </footer>
  );
}
