import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.username || !formData.email || !formData.password) {
          throw new Error('Заполните обязательные поля');
        }
        await register({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
      } else {
        if (!formData.username || !formData.password) {
          throw new Error('Введите логин и пароль');
        }
        await login(formData.username, formData.password);
      }
      navigate('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="back-link">← На главную</Link>
        <div className="login-logo">💦</div>
        <h1 className="login-title">
          {isRegister ? 'Регистрация' : 'Вход в личный кабинет'}
        </h1>
        <p className="login-subtitle">
          {isRegister
            ? 'Создайте аккаунт для управления записями'
            : 'Войдите, чтобы просмотреть свои записи'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Логин *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="ivan_petrov"
              required
            />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Пароль *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Загрузка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        <div className="login-switch">
          {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <button onClick={() => setIsRegister(!isRegister)} className="switch-btn">
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;