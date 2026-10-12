import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contacts" className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="logo">
            <span className="logo-icon">💦</span>
            <span className="logo-text">Aqua<strong>Shine</strong></span>
          </div>
          <p className="footer-desc">
            Профессиональная автомойка премиум-класса. Работаем 24/7 без выходных.
          </p>
        </div>

        <div className="footer-col">
          <h4>Контакты</h4>
          <p>📍 г. Сургут, ул. Автомобильная, 15</p>
          <p>📞 +7 (999) 123-45-67</p>
          <p>✉️ info@aquashine.ru</p>
        </div>

        <div className="footer-col">
          <h4>Режим работы</h4>
          <p>Пн-Вс: круглосуточно</p>
          <p>Без перерывов и выходных</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 AquaShine. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;