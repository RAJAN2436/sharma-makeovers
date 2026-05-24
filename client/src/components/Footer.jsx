import Logo from './Logo';
import './Footer.css';

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const instagram = settings?.instagram || 'sharma_makeovers';

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo size="md" />
        <p className="footer__tagline">
          {settings?.tagline || 'Where beauty meets elegance'}
        </p>
        <div className="footer__links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <p className="footer__copy">
          © {year} Sharma Makeover by Anushka Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
