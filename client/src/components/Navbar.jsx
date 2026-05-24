import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNav = () => setOpen(false);

  return (
    <header className={`navbar ${open ? 'navbar--open' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={handleNav}>
          <Logo size="sm" />
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="navbar__nav">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNav}>
              {link.label}
            </a>
          ))}
          <Link to="/admin" className="navbar__admin" onClick={handleNav}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
