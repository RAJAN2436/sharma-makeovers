import './Services.css';

export default function Services({ services = [] }) {
  if (!services.length) {
    return (
      <section id="services" className="section services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Our Services</h2>
        <p className="section-subtitle animate-on-scroll">
          Professional makeup & styling for every occasion
        </p>
        <div className="services__grid">
          {services.map((service, i) => (
            <article
              key={service._id}
              className="service-card animate-on-scroll"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="service-card__image">
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1487412946677-5d558adb097a?w=600&q=80'}
                  alt={service.title}
                />
                {service.featured && <span className="service-card__badge">Popular</span>}
              </div>
              <div className="service-card__body">
                <span className="service-card__category">{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-card__price">{service.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
