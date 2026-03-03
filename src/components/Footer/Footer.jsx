import React from 'react';
import './Footer.css';

import logo from './public/logo.svg';
import telegramIcon from './public/tg.png';
import whatsappIcon from './public/whats.svg';
import vkIcon from './public/vk.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__logo">
          <img src={logo} alt="Адмирал-ВМФ" />
        </div>

        <div className="footer__contacts">
          <span className="footer__phone">8-926-597-57-57</span>
          <a className="footer__email" href="mailto:fc-admiral@mail.ru">
            fc-admiral@mail.ru
          </a>
          <div className="footer__socials">
            <a href="#" className="footer__social-link"><img src={telegramIcon} alt="Telegram" /></a>
            <a href="#" className="footer__social-link"><img src={whatsappIcon} alt="WhatsApp" /></a>
            <a href="#" className="footer__social-link"><img src={vkIcon} alt="VK" /></a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <span className="footer__policy">Политика конфиденциальности</span>
        <span className="footer__rights">2026 г. Все права защищены</span>
      </div>
    </footer>
  );
}