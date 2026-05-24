import './Contact.css';

export default function Contact({ settings }) {
  const phone = settings?.phone || '+91 7452073580';
  const email = settings?.email || 'sharmamakeovers@gmail.com';
  const address =
    settings?.address ||
    'Near HP Petroleum, Kakrala Road, Ushait, Dist. Budaun, Uttar Pradesh 243641';
  const instagram = settings?.instagram || 'sharma_makeovers';

  const phoneLink = phone.replace(/\s/g, '');
  const waLink = `https://wa.me/${phoneLink.replace('+', '')}`;

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Contact Us</h2>
        <p className="section-subtitle animate-on-scroll">
          Book your appointment today — we would love to hear from you
        </p>
        <div className="contact__grid">
          <div className="contact__cards animate-on-scroll">
            <div className="contact__card slide-in-left">
              <span className="contact__icon">📍</span>
              <h3>Address</h3>
              <p>{address}</p>
            </div>
            <div className="contact__card slide-in-up">
              <span className="contact__icon">📞</span>
              <h3>Phone</h3>
              <a href={`tel:${phoneLink}`}>{phone}</a>
            </div>
            <div className="contact__card slide-in-up">
              <span className="contact__icon">✉️</span>
              <h3>Email</h3>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="contact__card slide-in-right">
              <span className="contact__icon">📷</span>
              <h3>Instagram</h3>
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{instagram}
              </a>
            </div>
          </div>
          <div className="contact__cta animate-on-scroll">
            <h3>Ready for your makeover?</h3>
            <p>Call or WhatsApp us to book bridal, party, or occasion makeup.</p>
            <div className="contact__buttons">
              <a href={`tel:${phoneLink}`} className="btn btn-primary">
                Call Now
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                WhatsApp
              </a>
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
