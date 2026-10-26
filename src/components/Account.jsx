import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import './Account.css';

const STATUS_LABELS = {
  pending:   { text: 'В обработке',  cls: 'pending'   },
  confirmed: { text: 'Подтверждена', cls: 'confirmed' },
  completed: { text: 'Завершена',    cls: 'completed' },
  cancelled: { text: 'Отменена',     cls: 'cancelled' },
};

const Account = () => {
  const { user, logout, updateProfile, getToken } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
  });

  useEffect(() => {
    api.myBookings(getToken())
      .then((data) => setBookings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [getToken]);

  const handleCancel = async (id) => {
    if (!window.confirm('Отменить запись?')) return;
    try {
      const updated = await api.cancelBooking(id, getToken());
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setEditMode(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <Link to="/" className="back-link">← На главную</Link>
          <button className="btn btn-outline logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        </div>

        <div className="account-grid">
          <div className="account-card profile-card">
            <div className="profile-avatar">
              {(user?.username || user?.email || '?').charAt(0).toUpperCase()}
            </div>
            <h2>{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>

            <div className="profile-info">
              <div className="info-row">
                <span>Телефон:</span>
                <strong>{user?.phone || 'Не указан'}</strong>
              </div>
            </div>

            {editMode ? (
              <div className="edit-form">
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Телефон"
                />
                <div className="edit-actions">
                  <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
                  <button className="btn btn-outline" onClick={() => setEditMode(false)}>Отмена</button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary edit-btn" onClick={() => setEditMode(true)}>
                Редактировать профиль
              </button>
            )}
          </div>

          <div className="account-card bookings-card">
            <h2>Мои записи</h2>
            {loading ? (
              <div className="empty-state"><p>Загрузка…</p></div>
            ) : bookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <p>У вас пока нет записей</p>
                <Link to="/" className="btn btn-primary">Записаться на мойку</Link>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map((b) => {
                  const st = STATUS_LABELS[b.status] || STATUS_LABELS.pending;
                  return (
                    <div className="booking-item" key={b.id}>
                      <div className="booking-top">
                        <strong>{b.service_title || `Услуга #${b.service}`}</strong>
                        <span className={`booking-status ${st.cls}`}>{st.text}</span>
                      </div>
                      <div className="booking-details">
                        <span>📅 {b.booking_date || 'Дата не указана'}</span>
                        <span>🕐 {b.booking_time || 'Время не указано'}</span>
                      </div>
                      <div className="booking-car">🚗 {b.car || 'Автомобиль не указан'}</div>
                      {(b.status === 'pending' || b.status === 'confirmed') && (
                        <button
                          className="btn btn-outline cancel-btn"
                          onClick={() => handleCancel(b.id)}
                        >
                          Отменить
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;