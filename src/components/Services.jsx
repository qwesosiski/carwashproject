import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(console.error);
  }, []);

  return (
    <section id="services" className="services-v2">
      <div className="container">
        <h2 className="section-title">Наши услуги</h2>
        <p className="section-subtitle">Полный спектр услуг по уходу за вашим автомобилем</p>
        
        <div className="services-grid-v2">
          {services.map((service) => (
            <div className="service-card-v2 liquid-glass" key={service.id}>
              <div className="service-icon-v2">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price-v2">от {service.price} ₽</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;