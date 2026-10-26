import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import './BookingModal.css';

const BookingModal = ({ onClose }) => {
  const { user, getToken } = useAuth();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.username || '',
    phone: user?.phone || '',
    car: '',
    serviceId: '',
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getServices().then(setServices).catch(console.error);
  }, []);

  useEffect(() => {
    if (services.length && !formData.serviceId) {
      setFormData((prev) => ({ ...prev, serviceId: services[0].id }));
    }
  }, [services]); // eslint-disable-line

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Заполните имя и телефон');
      return;
    }
    if (!formData.serviceId) {
      setError('Выберите услугу');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        service: Number(formData.serviceId),
        name: formData.name,
        phone: formData.phone,
        car: formData.car || null,
        booking_date: formData.date || null,
        booking_time: formData.time || null,
      };
      await api.createBooking(payload, getToken());
      setSubmitted(true);
      setTimeout(onClose, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                  <label>Имя *</label>
                  <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange}
                         placeholder="+7 (___) ___-__-__" required />
                </div>
              </div>

              <div className="form-group">
                <label>Автомобиль</label>
                <input name="car" value={formData.car} onChange={handleChange}
                       placeholder="Toyota Camry" />
              </div>

              <div className="form-group">
                <label>Услуга</label>
                <select name="serviceId" value={formData.serviceId} onChange={handleChange}>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} — {s.price} ₽
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Дата</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange}
                         min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label>Время</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} />
                </div>
              </div>

              {error && <div className="login-error">{error}</div>}

              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading ? 'Отправка…' : 'Записаться'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;