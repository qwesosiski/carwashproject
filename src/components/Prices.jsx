import React from 'react';
import { prices } from '../data/services';
import './Prices.css';

const Prices = ({ onBook }) => {
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
          {prices.map((item, idx) => (
            <div className="prices-row" key={idx}>
              <span>{item.name}</span>
              <span className="time">{item.time}</span>
              <span className="price">{item.price}</span>
            </div>
          ))}
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