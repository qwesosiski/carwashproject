import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Account.css';

const Account = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  // Загружаем историю записей из localStorage
  const bookings = JSON.parse(localStorage.getItem('aquashine_bookings') || '[]')
    .filter((b) => b.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    updateProfile(formData);
    setEditMode(false);
  };

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
          {/* Профиль */}
          <div className="account-card profile-card">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <h2>{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>

            <div className="profile-info">
              <div className="info-row">
                <span>Телефон:</span>
                <strong>{user?.phone || 'Не указан'}</strong>
              </div>
              <div className="info-row">
                <span>Дата регистрации:</span>
                <strong>
                  {user?.registeredAt
                    ? new Date(user.registeredAt).toLocaleDateString('ru-RU')
                    : '—'}
                </strong>
              </div>
            </div>

            {editMode ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Имя"
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Телефон"
                />
                <div className="edit-actions">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Сохранить
                  </button>
                  <button className="btn btn-outline" onClick={() => setEditMode(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary edit-btn" onClick={() => setEditMode(true)}>
                Редактировать профиль
              </button>
            )}
          </div>

          {/* Записи */}
          <div className="account-card bookings-card">
            <h2>Мои записи</h2>
            {bookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <p>У вас пока нет записей</p>
                <Link to="/" className="btn btn-primary">
                  Записаться на мойку
                </Link>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map((b) => (
                  <div className="booking-item" key={b.id}>
                    <div className="booking-top">
                      <strong>{b.service}</strong>
                      <span className="booking-status">Подтверждена</span>
                    </div>
                    <div className="booking-details">
                      <span>📅 {b.date || 'Дата не указана'}</span>
                      <span>🕐 {b.time || 'Время не указано'}</span>
                    </div>
                    <div className="booking-car">
                      🚗 {b.car || 'Автомобиль не указан'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;