import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ onBook }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">💦</span>
          <span className="logo-text">Aqua<strong>Shine</strong></span>
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollTo('services')}>Услуги</a>
          <a onClick={() => scrollTo('prices')}>Цены</a>
          <a onClick={() => scrollTo('about')}>О нас</a>
          <a onClick={() => scrollTo('map')}>Контакты</a>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <Link to="/account" className="user-link">
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{user.name}</span>
              </Link>
              <button className="logout-icon-btn" onClick={handleLogout} title="Выйти">
                ⏻
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline login-link">
              Войти
            </Link>
          )}

          <button className="btn btn-primary header-btn" onClick={onBook}>
            Записаться
          </button>
        </div>

        <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;