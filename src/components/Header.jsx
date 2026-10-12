import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onBook }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-icon">💦</span>
          <span className="logo-text">Aqua<strong>Shine</strong></span>
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollTo('services')}>Услуги</a>
          <a onClick={() => scrollTo('prices')}>Цены</a>
          <a onClick={() => scrollTo('about')}>О нас</a>
          <a onClick={() => scrollTo('contacts')}>Контакты</a>
        </nav>

        <button className="btn btn-primary header-btn" onClick={onBook}>
          Записаться
        </button>

        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;