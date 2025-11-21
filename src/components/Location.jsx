export default function Location() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Dove Siamo</h2>
          <p className="mt-2 text-white/70">I nostri uffici e magazzini operativi.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-white font-semibold text-lg">Sede Operativa</h3>
            <p className="mt-2 text-white/70">Via Esempio 123, 20100 Milano (MI)</p>
            <p className="text-white/70">Tel: +39 02 1234 5678</p>
            <p className="text-white/70">Email: info@tgcargo.it</p>

            <div className="mt-6">
              <h4 className="text-white font-medium">Orari</h4>
              <p className="text-white/70">Lun–Ven 9:00–18:00</p>
            </div>

            <div className="mt-6 flex gap-4">
              <a className="text-white/80 hover:text-white underline" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a className="text-white/80 hover:text-white underline" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <iframe
              title="Mappa TG CARGO"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.692753694575!2d9.1900!3d45.4642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI3JzUxLjIiTiA5wrAxMScyNC45IkU!5e0!3m2!1sit!2sit!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
