import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import './Account.css';

const STATUS_LABELS = {
  pending:   { text: 'В обработке',  cls: 'status-pending'   },
  confirmed: { text: 'Подтверждена', cls: 'status-confirmed' },
  completed: { text: 'Завершена',    cls: 'status-completed' },
  cancelled: { text: 'Отменена',     cls: 'status-cancelled' },
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
    <div className="account-page-v2">
      <div className="container">
        <div className="account-header-v2">
          <Link to="/" className="back-link-v2">← На главную</Link>
          <button className="btn-outline" onClick={handleLogout}>
            Выйти
          </button>
        </div>

        <div className="account-grid-v2">
          {/* Профиль пользователя */}
          <div className="account-card-v2 liquid-glass">
            <div className="profile-avatar-v2">
              {(user?.username || user?.email || '?').charAt(0).toUpperCase()}
            </div>
            <h2>{user?.username}</h2>
            <p className="profile-email-v2">{user?.email}</p>

            <div className="profile-info-v2">
              <div className="info-row-v2">
                <span>Телефон:</span>
                <strong>{user?.phone || 'Не указан'}</strong>
              </div>
            </div>

            {editMode ? (
              <div className="edit-form-v2">
                <input
                  className="form-input-v2"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Телефон"
                />
                <div className="edit-actions-v2">
                  <button className="btn-primary" onClick={handleSave}>Сохранить</button>
                  <button className="btn-outline" onClick={() => setEditMode(false)}>Отмена</button>
                </div>
              </div>
            ) : (
              <button className="btn-primary edit-btn-v2" onClick={() => setEditMode(true)}>
                Редактировать профиль
              </button>
            )}
          </div>

          {/* Список записей */}
          <div className="account-card-v2 liquid-glass">
            <h3 className="bookings-title-v2">Мои записи</h3>
            
            {loading ? (
              <div className="empty-state-v2"><p>Загрузка...</p></div>
            ) : bookings.length === 0 ? (
              <div className="empty-state-v2">
                <div className="empty-icon-v2">📅</div>
                <p>У вас пока нет записей</p>
                <Link to="/" className="btn-primary">Записаться на мойку</Link>
              </div>
            ) : (
              <div className="bookings-list-v2">
                {bookings.map((b) => {
                  const st = STATUS_LABELS[b.status] || STATUS_LABELS.pending;
                  return (
                    <div className="booking-item-v2" key={b.id}>
                      <div className="booking-top-v2">
                        <strong>{b.service_title || `Услуга #${b.service}`}</strong>
                        <span className={`booking-status-v2 ${st.cls}`}>{st.text}</span>
                      </div>
                      <div className="booking-details-v2">
                        <span>📅 {b.booking_date || 'Дата не указана'}</span>
                        <span>🕐 {b.booking_time || 'Время не указано'}</span>
                      </div>
                      <div className="booking-car-v2">
                        🚗 {b.car || 'Автомобиль не указан'}
                      </div>
                      {(b.status === 'pending' || b.status === 'confirmed') && (
                        <button
                          className="btn-outline cancel-btn-v2"
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