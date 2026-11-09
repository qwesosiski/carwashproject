import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import './Prices.css';

const Prices = ({ onBook }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(console.error);
  }, []);

  return (
    <section id="prices" className="prices-v2">
      <div className="container">
        <h2 className="section-title">Прайс-лист</h2>
        <p className="section-subtitle">Прозрачные цены без скрытых платежей</p>
        
        <div className="prices-table-v2 liquid-glass">
          <div className="prices-header-v2">
            <span>Услуга</span>
            <span>Время</span>
            <span>Цена</span>
          </div>
          {services.map((item) => (
            <div className="prices-row-v2" key={item.id}>
              <span className="service-name">{item.title}</span>
              <span className="service-time">{item.duration} мин</span>
              <span className="service-price">{item.price} ₽</span>
            </div>
          ))}
        </div>
        
        <div className="prices-cta-v2">
          <button className="btn-primary" onClick={onBook}>Записаться сейчас</button>
        </div>
      </div>
    </section>
  );
};

export default Prices;