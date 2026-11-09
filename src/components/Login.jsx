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
    <div className="login-page-v2">
      <div className="login-card-v2 liquid-glass">
        <Link to="/" className="back-link-v2">← На главную</Link>
        
        <div className="login-logo-v2">💦</div>
        <h1 className="login-title-v2">
          {isRegister ? 'Создать аккаунт' : 'С возвращением'}
        </h1>
        <p className="login-subtitle-v2">
          {isRegister 
            ? 'Присоединяйтесь к AquaShine для управления записями' 
            : 'Войдите, чтобы просмотреть свои записи'}
        </p>

        <form onSubmit={handleSubmit} className="login-form-v2">
          <input
            className="form-input-v2"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Логин *"
            required
          />

          {isRegister && (
            <>
              <input
                className="form-input-v2"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Телефон"
              />
              <input
                className="form-input-v2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                required
              />
            </>
          )}

          <input
            className="form-input-v2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Пароль *"
            required
            minLength={6}
          />

          {error && <div className="error-msg-v2">{error}</div>}

          <button type="submit" className="btn-primary login-btn-v2" disabled={loading}>
            {loading ? 'Загрузка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        <div className="login-switch-v2">
          {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
          <button 
            type="button" 
            onClick={() => { setIsRegister(!isRegister); setError(''); }} 
            className="switch-btn-v2"
          >
            {isRegister ? 'Войти' : 'Создать'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;