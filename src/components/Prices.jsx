import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import './Prices.css';

const Prices = ({ onBook }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(console.error);
  }, []);

  return (
    <section id="prices" className="prices">
      <div className="container">
        <h2 className="section-title">Прайс-лист</h2>
        <p className="section-subtitle">Прозрачные цены без скрытых платежей</p>
        <div className="prices-table">
          <div className="prices-header">
            <span>Услуга</span>
            <span>Время</span>
            <span>Цена</span>
          </div>
          {services.map((item) => (
            <div className="prices-row" key={item.id}>
              <span>{item.title}</span>
              <span className="time">{item.duration} мин</span>
              <span className="price">{item.price} ₽</span>
            </div>
          ))}
          {services.length === 0 && (
            <div className="prices-row">
              <span colSpan="3">Загрузка…</span>
            </div>
          )}
        </div>
        <div className="prices-cta">
          <button className="btn btn-primary" onClick={onBook}>
            Записаться сейчас
          </button>
        </div>
      </div>
    </section>
  );
};

export default Prices;