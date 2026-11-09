import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import './Hero.css';

const Hero = ({ onBook }) => {
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    api.getServices()
      .then(data => setServicesCount(data.length))
      .catch(err => console.error('Ошибка загрузки услуг:', err));
  }, []);

  const titleWords = ['Ваш', 'автомобиль', 'заслуживает', 'безупречной'];

  return (
    <section className="hero-v2">
      {/* Фоновые градиентные пятна */}
      <div className="hero-bg-glow hero-glow-1"></div>
      <div className="hero-bg-glow hero-glow-2"></div>
      <div className="hero-bg-glow hero-glow-3"></div>

      <div className="container hero-v2-inner">
        <div className="hero-content-v2">
          
          <div className="hero-badge-v2 liquid-glass">
            <span className="badge-dot"></span>
            <span>⭐ Работаем с 2015 года • {servicesCount} услуг в базе</span>
          </div>

          <h1 className="hero-title-v2">
            {titleWords.map((word, index) => (
              <span 
                key={index} 
                className="word-anim" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {word}{' '}
              </span>
            ))}
            <br className="title-break" />
            <span className="word-anim highlight-word" style={{ animationDelay: `${titleWords.length * 0.1}s` }}>
              чистоты
            </span>
          </h1>

          <p className="hero-subtitle-v2">
            Профессиональная автомойка с современным оборудованием. 
            Быстро, качественно и безопасно для вашего авто.
          </p>

          <div className="hero-actions-v2">
            <button className="btn-liquid-primary liquid-glass" onClick={onBook}>
              Записаться онлайн
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </button>
            <a href="#services" className="btn-liquid-secondary">
              Наши услуги
            </a>
          </div>

          <div className="hero-stats-v2">
            <div className="stat-item">
              <strong>15+</strong>
              <span>лет опыта</span>
            </div>
            <div className="stat-item">
              <strong>50k+</strong>
              <span>клиентов</span>
            </div>
            <div className="stat-item">
              <strong>24/7</strong>
              <span>без выходных</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-v2">
          <div className="glass-showcase liquid-glass">
            <div className="showcase-car">🚗</div>
            <div className="showcase-bubble bubble-1"></div>
            <div className="showcase-bubble bubble-2"></div>
            <div className="showcase-bubble bubble-3"></div>
            <div className="showcase-reflection"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;