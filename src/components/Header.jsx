import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const navItems = [
  { key: 'home', it: 'Home', en: 'Home' },
  { key: 'land', it: 'Via Terra', en: 'Road Freight' },
  { key: 'sea', it: 'Via Mare', en: 'Sea Freight' },
  { key: 'air', it: 'Via Aerea', en: 'Air Freight' },
  { key: 'about', it: 'Chi Siamo', en: 'About' },
];

export default function Header({ lang = 'it' }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#0e1926]/60 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0886d9] to-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-white/10" />
              <div className="leading-tight">
                <div className="text-white font-semibold tracking-wide">TG CARGO</div>
                <div className="text-xs text-white/60">Spedizioni 2025</div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollTo(item.key)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {lang === 'it' ? item.it : item.en}
                </button>
              ))}

              {/* Language badge */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                <Globe size={16} className="opacity-80" />
                <span className="text-xs">IT / EN</span>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-xl border border-white/10 bg-white/10 p-2 text-white"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile nav */}
          {open && (
            <div className="md:hidden border-t border-white/10 px-4 py-3">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollTo(item.key)}
                    className="rounded-xl px-3 py-2 text-left text-white/90 hover:bg-white/5"
                  >
                    {lang === 'it' ? item.it : item.en}
                  </button>
                ))}
                <div className="mt-2 inline-flex w-max items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                  <Globe size={16} className="opacity-80" />
                  <span className="text-xs">IT / EN</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
