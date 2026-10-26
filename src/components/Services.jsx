import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(console.error);
  }, []);

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Наши услуги</h2>
        <p className="section-subtitle">
          Полный спектр услуг по уходу за вашим автомобилем
        </p>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">от {service.price} ₽</div>
            </div>
          ))}
          {services.length === 0 && (
            <p style={{ color: '#94a3b8' }}>Загрузка услуг…</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;