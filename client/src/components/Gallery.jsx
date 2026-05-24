import { useState } from 'react';
import './Gallery.css';

export default function Gallery({ items = [] }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Our Gallery</h2>
        <p className="section-subtitle animate-on-scroll">
          Stunning transformations & happy clients
        </p>
        <div className="gallery__grid">
          {items.map((item, i) => (
            <div
              key={item._id}
              className="gallery__item animate-on-scroll"
              style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
              onClick={() => setLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox(item)}
            >
              <img src={item.image} alt={item.title || 'Makeover'} />
              <div className="gallery__overlay">
                <span>{item.title || item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" aria-label="Close">×</button>
          <img src={lightbox.image} alt={lightbox.title} onClick={(e) => e.stopPropagation()} />
          {lightbox.title && <p className="lightbox__caption">{lightbox.title}</p>}
        </div>
      )}
    </section>
  );
}
