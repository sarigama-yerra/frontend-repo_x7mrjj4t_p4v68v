import { useEffect, useRef, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function LogoUploader({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [siteUrl, setSiteUrl] = useState('https://tgcargo.it/');
  const inputRef = useRef(null);

  useEffect(() => {
    const existing = localStorage.getItem('tg_logo_dataurl') || localStorage.getItem('tg_logo_url');
    if (existing) setPreview(existing);
  }, []);

  const onFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    const okTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
    if (!okTypes.includes(file.type)) {
      setError('Formato non supportato. Usa SVG o PNG.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('File troppo grande. Max 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFiles(e.dataTransfer.files);
  };

  const handleChoose = () => inputRef.current?.click();

  const handleSave = () => {
    if (!preview) return;
    // Heuristic: data URLs start with "data:"; otherwise treat as URL
    if (typeof preview === 'string' && preview.startsWith('data:')) {
      localStorage.setItem('tg_logo_dataurl', preview);
      localStorage.removeItem('tg_logo_url');
    } else {
      localStorage.setItem('tg_logo_url', preview);
      localStorage.removeItem('tg_logo_dataurl');
    }
    if (onClose) onClose();
    window.dispatchEvent(new Event('tg-logo-updated'));
  };

  const fetchFromSite = async () => {
    if (!BACKEND) {
      setError('Backend non configurato.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${BACKEND}/api/extract-logo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: siteUrl })
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.logo_url) {
        throw new Error(data.message || 'Logo non trovato');
      }
      setPreview(data.logo_url);
    } catch (e) {
      setError(e.message || 'Errore durante il recupero del logo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e1926]/90 p-6 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-4 text-lg font-semibold">Carica il logo TG CARGO</div>

        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-8 text-center hover:border-white/40"
            onClick={handleChoose}
          >
            <input ref={inputRef} type="file" accept=".svg,.png,.jpg,.jpeg,.webp" className="hidden" onChange={(e) => onFiles(e.target.files)} />
            <div className="text-sm text-white/80">Trascina qui il file oppure clicca per selezionare</div>
            <div className="text-xs text-white/60">Formati consigliati: SVG (preferito) o PNG con sfondo trasparente</div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-white/70">Oppure recupera dal sito</label>
            <div className="flex gap-2">
              <input
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                placeholder="https://tgcargo.it/"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#0886d9]"
              />
              <button
                onClick={fetchFromSite}
                disabled={loading}
                className="rounded-xl bg-[#0886d9] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {loading ? 'Attendo…' : 'Prendi dal sito'}
              </button>
            </div>
            <div className="text-xs text-white/50">Userò l’icona/logo rilevata automaticamente dalla homepage.</div>
          </div>
        </div>

        {error && <div className="mt-3 rounded-md bg-red-500/10 p-2 text-sm text-red-300">{error}</div>}

        {preview && (
          <div className="mt-4 grid place-items-center">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <img src={preview} alt="Anteprima Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10">Annulla</button>
          <button onClick={handleSave} className="rounded-lg bg-[#0886d9] px-4 py-2 font-medium text-white shadow-[0_10px_30px_-10px_rgba(8,134,217,0.6)] hover:brightness-110">Usa questo logo</button>
        </div>
      </div>
    </div>
  );
}
