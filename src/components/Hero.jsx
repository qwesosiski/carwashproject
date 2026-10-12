import React from 'react';
import './Hero.css';

const Hero = ({ onBook }) => {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">⭐ Работаем с 2015 года</div>
          <h1 className="hero-title">
            Ваш автомобиль заслуживает <span>безупречной чистоты</span>
          </h1>
          <p className="hero-text">
            Профессиональная автомойка с современным оборудованием.
            Быстро, качественно и безопасно для вашего авто.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onBook}>
              Записаться онлайн
            </button>
            <a href="#services" className="btn btn-outline">
              Наши услуги
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>15+</strong>
              <span>лет опыта</span>
            </div>
            <div>
              <strong>50k+</strong>
              <span>довольных клиентов</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>без выходных</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="car-card">
            <div className="car-emoji">🚗</div>
            <div className="bubbles">
              <span>💧</span><span>💧</span><span>💧</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;