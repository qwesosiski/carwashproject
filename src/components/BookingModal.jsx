import React, { useState } from 'react';
import { services } from '../data/services';
import './BookingModal.css';

const BookingModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    car: '',
    service: services[1].title,
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните имя и телефон');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <h2>Заявка принята!</h2>
            <p>Мы свяжемся с вами в течение 15 минут для подтверждения.</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Запись на мойку</h2>
            <p className="modal-subtitle">Заполните форму — мы перезвоним</p>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Ваше имя *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Марка автомобиля</label>
                <input
                  type="text"
                  name="car"
                  value={formData.car}
                  onChange={handleChange}
                  placeholder="Toyota Camry"
                />
              </div>

              <div className="form-group">
                <label>Услуга</label>
                <select name="service" value={formData.service} onChange={handleChange}>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} — от {s.price} ₽
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Дата</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Время</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Записаться
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;