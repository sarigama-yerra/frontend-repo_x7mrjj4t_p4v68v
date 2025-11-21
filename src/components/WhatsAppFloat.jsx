import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const message = encodeURIComponent('Ciao TG CARGO, desidero informazioni sulle spedizioni.');
  const href = `https://wa.me/393331234567?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl ring-1 ring-black/10 hover:scale-[1.02] active:scale-[0.99] transition"
      aria-label="WhatsApp Chat"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
