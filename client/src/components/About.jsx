import './About.css';

export default function About({ settings }) {
  const aboutText =
    settings?.aboutText ||
    'Welcome to Sharma Makeover by Anushka Sharma — your trusted destination for bridal, party, and occasion makeup in Budaun. We create personalized looks using premium products and professional techniques.';

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__grid">
          <div className="about__image animate-on-scroll">
            <img
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Makeup artist at work"
            />
            <div className="about__badge">10+ Years of Passion</div>
          </div>
          <div className="about__content animate-on-scroll">
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              About Us
            </h2>
            <p className="about__text">{aboutText}</p>
            <ul className="about__features">
              <li>Bridal & party makeup specialist</li>
              <li>Premium HD & airbrush products</li>
              <li>On-location services available</li>
              <li>Personalized consultation</li>
            </ul>
            <a href="#contact" className="btn btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
