import { useEffect, useMemo, useRef, useState } from 'react';

export default function HeroImagePicker({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const inputRef = useRef(null);
  const frameRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startPos: { x: 50, y: 50 } });

  useEffect(() => {
    const existing = localStorage.getItem('tg_hero_image');
    if (existing) setPreview(existing);
    const posStored = localStorage.getItem('tg_hero_pos');
    if (posStored) {
      try {
        const parsed = JSON.parse(posStored);
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          setPos({ x: parsed.x, y: parsed.y });
        }
      } catch (e) {}
    }
    const scStored = localStorage.getItem('tg_hero_scale');
    if (scStored) {
      const v = Number(scStored);
      if (!Number.isNaN(v) && v > 0) setScale(v);
    }
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
    localStorage.setItem('tg_hero_pos', JSON.stringify(pos));
    localStorage.setItem('tg_hero_scale', String(scale));
    if (onClose) onClose();
    window.dispatchEvent(new Event('tg-hero-updated'));
  };

  const previewStyle = useMemo(() => ({
    objectPosition: `${pos.x}% ${pos.y}%`,
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
  }), [pos, scale]);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const startDrag = (clientX, clientY) => {
    dragRef.current = {
      active: true,
      startX: clientX,
      startY: clientY,
      startPos: { ...pos },
    };
  };
  const onMouseDown = (e) => {
    if (!frameRef.current) return;
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  };
  const onTouchStart = (e) => {
    if (!frameRef.current) return;
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
  };
  const onMove = (clientX, clientY) => {
    if (!dragRef.current.active || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const dxPx = clientX - dragRef.current.startX;
    const dyPx = clientY - dragRef.current.startY;
    const dxPct = (dxPx / rect.width) * 100;
    const dyPct = (dyPx / rect.height) * 100;
    const nx = clamp(dragRef.current.startPos.x + dxPct, 0, 100);
    const ny = clamp(dragRef.current.startPos.y + dyPct, 0, 100);
    setPos({ x: nx, y: ny });
  };
  const onMouseMove = (e) => onMove(e.clientX, e.clientY);
  const onTouchMove = (e) => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  };
  const endDrag = () => { dragRef.current.active = false; };

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
            <div className="rounded-xl border border-white/10 bg-white/5 p-2 w-full">
              <div
                ref={frameRef}
                className="relative h-48 w-full overflow-hidden rounded-lg border border-white/10 select-none"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={endDrag}
              >
                <img
                  src={preview}
                  alt="Anteprima Hero"
                  className="h-full w-full object-cover will-change-transform"
                  style={previewStyle}
                  draggable={false}
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex w-[90%] max-w-sm flex-col gap-3 rounded-xl bg-black/40 p-3 backdrop-blur">
                  <label className="flex items-center gap-3 text-xs text-white/80">
                    X
                    <input type="range" min="0" max="100" value={pos.x} onChange={(e) => setPos((p) => ({ ...p, x: Number(e.target.value) }))} className="flex-1" />
                    <span className="w-10 text-right">{Math.round(pos.x)}%</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs text-white/80">
                    Y
                    <input type="range" min="0" max="100" value={pos.y} onChange={(e) => setPos((p) => ({ ...p, y: Number(e.target.value) }))} className="flex-1" />
                    <span className="w-10 text-right">{Math.round(pos.y)}%</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs text-white/80">
                    Zoom
                    <input type="range" min="1" max="2.5" step="0.01" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="flex-1" />
                    <span className="w-10 text-right">{scale.toFixed(2)}x</span>
                  </label>
                  <div className="text-[11px] text-white/60">Suggerimento: trascina l'immagine per spostarla.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => { localStorage.removeItem('tg_hero_image'); localStorage.removeItem('tg_hero_pos'); localStorage.removeItem('tg_hero_scale'); window.dispatchEvent(new Event('tg-hero-updated')); if (onClose) onClose(); }}
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
