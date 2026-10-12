import React from 'react';
import './About.css';

const About = () => {
  const features = [
    { icon: '⚡', title: 'Быстро', text: 'Экспресс-мойка всего за 15 минут' },
    { icon: '🌿', title: 'Эко-средства', text: 'Безопасные и биоразлагаемые' },
    { icon: '🏆', title: 'Качество', text: 'Сертифицированное оборудование' },
    { icon: '👨‍🔧', title: 'Профи', text: 'Опытные мастера с 5+ лет стажа' },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <p className="section-subtitle">
          Мы заботимся о вашем автомобиле, как о своём
        </p>
        <div className="about-grid">
          {features.map((f, i) => (
            <div className="about-card" key={i}>
              <div className="about-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;