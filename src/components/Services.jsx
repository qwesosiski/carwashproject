import React from 'react';
import { services } from '../data/services';
import './Services.css';

const Services = () => {
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
        </div>
      </div>
    </section>
  );
};

export default Services;