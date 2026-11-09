import React from 'react';
import './About.css';

const About = () => {
  const features = [
    { icon: '⚡', title: 'Быстро', text: 'Экспресс-мойка всего за 15 минут' },
    { icon: '🌿', title: 'Эко-средства', text: 'Безопасные и биоразлагаемые составы' },
    { icon: '🏆', title: 'Качество', text: 'Сертифицированное оборудование' },
    { icon: '👨‍🔧', title: 'Профи', text: 'Опытные мастера с 5+ лет стажа' },
  ];

  return (
    <section id="about" className="about-v2">
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <p className="section-subtitle">Мы заботимся о вашем автомобиле, как о своём</p>
        
        <div className="about-grid-v2">
          {features.map((f, i) => (
            <div className="about-card-v2" key={i}>
              <div className="about-icon-v2">{f.icon}</div>
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