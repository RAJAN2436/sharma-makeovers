import { useState, useEffect } from 'react';
import './Hero.css';

const defaultImages = [
  'https://images.unsplash.com/photo-1487412946677-5d558adb097a?w=1200&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
  'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1200&q=80',
];

export default function Hero({ settings }) {
  const images =
    settings?.heroImages?.length > 0 ? settings.heroImages : defaultImages;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="home" className="hero">
      <div className="hero__slides">
        {images.map((img, i) => (
          <div
            key={i}
            className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="hero__content container">
        <p className="hero__tag slide-in-down">✨ Premium Makeup Studio</p>
        <h1 className="hero__title slide-in-left">
          {settings?.businessName || 'Sharma Makeover by Anushka Sharma'}
        </h1>
        <p className="hero__subtitle slide-in-right">
          {settings?.tagline || 'Where beauty meets elegance'}
        </p>
        <div className="hero__actions slide-in-up">
          <a href="#contact" className="btn btn-primary">
            Book Appointment
          </a>
          <a href="#services" className="btn btn-outline hero__btn-outline">
            Our Services
          </a>
        </div>
        <div className="hero__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
