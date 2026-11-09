import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import './BookingModal.css';

const BookingModal = ({ onClose }) => {
  const { user, getToken } = useAuth();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.username || '', phone: user?.phone || '', car: '', serviceId: '', date: '', time: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.getServices().then(setServices).catch(console.error); }, []);
  useEffect(() => { if (services.length && !formData.serviceId) setFormData(p => ({ ...p, serviceId: services[0].id })); }, [services]);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return setError('Заполните имя и телефон');
    if (!formData.serviceId) return setError('Выберите услугу');

    setLoading(true);
    try {
      await api.createBooking({
        service: Number(formData.serviceId), name: formData.name, phone: formData.phone,
        car: formData.car || null, booking_date: formData.date || null, booking_time: formData.time || null,
      }, getToken());
      setSubmitted(true);
      setTimeout(onClose, 2500);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay-v2" onClick={onClose}>
      <div className="modal-v2 liquid-glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-v2" onClick={onClose}>✕</button>
        {submitted ? (
          <div className="modal-success-v2">
            <div className="success-icon">✅</div>
            <h2>Заявка принята!</h2>
            <p>Мы свяжемся с вами в течение 15 минут.</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title-v2">Запись на мойку</h2>
            <form onSubmit={handleSubmit} className="booking-form-v2">
              <div className="form-row-v2">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Имя *" required />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон *" required />
              </div>
              <input name="car" value={formData.car} onChange={handleChange} placeholder="Автомобиль (марка/модель)" />
              <select name="serviceId" value={formData.serviceId} onChange={handleChange}>
                {services.map(s => <option key={s.id} value={s.id}>{s.title} — {s.price} ₽</option>)}
              </select>
              <div className="form-row-v2">
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
                <input type="time" name="time" value={formData.time} onChange={handleChange} />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button type="submit" className="btn-primary submit-btn-v2" disabled={loading}>
                {loading ? 'Отправка...' : 'Записаться'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default BookingModal;