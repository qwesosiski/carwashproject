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
    <header className={`header-v2 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner-v2">
        <Link to="/" className="logo-v2">
          <span className="logo-icon">💦</span>
          <span className="logo-text">AquaShine</span>
        </Link>

        <nav className={`nav-v2 ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollTo('services')}>Услуги</a>
          <a onClick={() => scrollTo('prices')}>Цены</a>
          <a onClick={() => scrollTo('about')}>О нас</a>
          <a onClick={() => scrollTo('map')}>Контакты</a>
        </nav>

        <div className="header-actions-v2">
          {user ? (
            <div className="user-menu-v2">
              <Link to="/account" className="user-link-v2">
                <span className="user-avatar-v2">
                  {(user.username || user.email || '?').charAt(0).toUpperCase()}
                </span>
                <span className="user-name-v2">{user.username || user.email}</span>
              </Link>
              <button className="logout-btn-v2" onClick={handleLogout} title="Выйти">⏻</button>
            </div>
          ) : (
            <Link to="/login" className="btn-outline header-login-btn">Войти</Link>
          )}

          <button className="btn-primary header-book-btn" onClick={onBook}>Записаться</button>
        </div>

        <button className="burger-v2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;