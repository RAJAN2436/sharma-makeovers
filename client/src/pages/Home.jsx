import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { api } from '../api/api';
import { fallbackServices, fallbackGallery } from '../data/fallback';

export default function Home() {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useScrollAnimation(!loading);

  useEffect(() => {
    const load = async () => {
      try {
        const [settingsData, servicesData, galleryData] = await Promise.all([
          api.getSettings(),
          api.getServices(),
          api.getGallery(),
        ]);
        setSettings(settingsData);
        setServices(servicesData);
        setGallery(galleryData);
      } catch (err) {
        setError(err.message);
        setServices(fallbackServices);
        setGallery(fallbackGallery);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  const fallbackSettings = {
    businessName: 'Sharma Makeover by Anushka Sharma',
    tagline: 'Where beauty meets elegance',
    address:
      'Near HP Petroleum, Kakrala Road, Ushait, Dist. Budaun, Uttar Pradesh 243641',
    phone: '+91 7452073580',
    email: 'sharmamakeovers@gmail.com',
    instagram: 'sharma_makeovers',
  };

  const siteSettings = settings || fallbackSettings;

  return (
    <>
      <Navbar />
      <main className="site-main">
        <Hero settings={siteSettings} />
        <About settings={siteSettings} />
        <Services services={services} />
        <Gallery items={gallery} />
        <Contact settings={siteSettings} />
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
