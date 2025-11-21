import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Location from './components/Location';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  return (
    <div className="min-h-screen bg-[#0e1926] text-white">
      {/* glass noise gradient background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(800px_400px_at_10%_-10%,rgba(8,134,217,0.20),transparent),radial-gradient(1000px_600px_at_120%_0%,rgba(8,134,217,0.12),transparent)]" />

      <Header />
      <main className="relative">
        <Hero />
        <Services />
        <Gallery />
        <Contact />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
