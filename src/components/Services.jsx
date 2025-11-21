import { Truck, Ship, Plane } from 'lucide-react';

const services = [
  {
    id: 'land',
    title: 'Via Terra',
    icon: Truck,
    desc: 'Trasporti su gomma e logistica su strada in Italia e in Europa, consegne dedicate e groupage.'
  },
  {
    id: 'sea',
    title: 'Via Mare',
    icon: Ship,
    desc: 'Spedizioni marittime FCL/LCL, gestione container e pratiche doganali per rotte globali.'
  },
  {
    id: 'air',
    title: 'Via Aerea',
    icon: Plane,
    desc: 'Servizi aerei internazionali, express e cargo, con tracking e assistenza personalizzata.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">I nostri servizi</h2>
          <p className="mt-2 text-white/70 max-w-2xl">Soluzioni complete per ogni modalità di trasporto, ottimizzate per tempi e costi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ id, title, icon: Icon, desc }) => (
            <div key={id} id={id} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:bg-white/10">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-[#0886d9] to-cyan-400 text-white ring-1 ring-white/10 shadow-lg shadow-cyan-500/20">
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-4 text-white/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
