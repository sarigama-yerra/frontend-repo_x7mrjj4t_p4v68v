import { useEffect, useRef, useState } from 'react';

export default function HeroImagePicker({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const existing = localStorage.getItem('tg_hero_image');
    if (existing) setPreview(existing);
  }, []);

  const onFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    const okTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!okTypes.includes(file.type)) {
      setError('Formato non supportato. Usa PNG/JPG/WebP.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('File troppo grande. Max 4MB.');
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
    localStorage.setItem('tg_hero_image', preview);
    if (onClose) onClose();
    window.dispatchEvent(new Event('tg-hero-updated'));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e1926]/90 p-6 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-4 text-lg font-semibold">Immagine Hero</div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-8 text-center hover:border-white/40"
          onClick={handleChoose}
        >
          <input ref={inputRef} type="file" accept=".png,.jpg,.jpeg,.webp" className="hidden" onChange={(e) => onFiles(e.target.files)} />
          <div className="text-sm text-white/80">Trascina qui l'immagine oppure clicca per selezionare</div>
          <div className="text-xs text-white/60">Consigliato: 1600x900 o superiore, PNG/JPG/WebP</div>
        </div>

        {error && <div className="mt-3 rounded-md bg-red-500/10 p-2 text-sm text-red-300">{error}</div>}

        {preview && (
          <div className="mt-4 grid place-items-center">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2">
              <img src={preview} alt="Anteprima Hero" className="max-h-48 w-auto object-contain" />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => { localStorage.removeItem('tg_hero_image'); window.dispatchEvent(new Event('tg-hero-updated')); if (onClose) onClose(); }}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10"
          >
            Ripristina 3D
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10">Annulla</button>
            <button onClick={handleSave} className="rounded-lg bg-[#0886d9] px-4 py-2 font-medium text-white shadow-[0_10px_30px_-10px_rgba(8,134,217,0.6)] hover:brightness-110">Usa questa immagine</button>
          </div>
        </div>
      </div>
    </div>
  );
}
