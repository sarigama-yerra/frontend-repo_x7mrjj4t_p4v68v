import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      // Backend endpoint could be added later to persist leads
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
      e.currentTarget.reset();
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Contattaci</h2>
          <p className="mt-2 text-white/70">Compila il modulo e il nostro team ti contatterà al più presto.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <label className="text-white/80">Nome</label>
            <input name="nome" required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#0886d9]" placeholder="Mario" />
          </div>

          <div className="grid gap-2">
            <label className="text-white/80">Cognome</label>
            <input name="cognome" required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#0886d9]" placeholder="Rossi" />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-white/80">Email</label>
            <input name="email" type="email" required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#0886d9]" placeholder="nome@azienda.it" />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-white/80">Messaggio</label>
            <textarea name="messaggio" rows="5" required className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#0886d9]" placeholder="Descrivi la tua esigenza logistico-spedizionistica" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="rounded-2xl bg-[#0886d9] px-6 py-3 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              {status === 'loading' ? 'Invio…' : 'Invia'}
            </button>
            {status === 'success' && <span className="ml-3 text-green-400">Messaggio inviato! Ti ricontatteremo presto.</span>}
            {status === 'error' && <span className="ml-3 text-red-400">Errore nell\'invio. Riprova.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
