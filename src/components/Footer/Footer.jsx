import { useState, useEffect } from 'react';
import './Footer.css';

import logo from './public/logo.svg';
import vkIcon from './public/vk.png';
import { getContactDetails } from '../../RouterAPI.jsx';

const isMobile = () =>
  typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;

export default function Footer() {
  const [copied, setCopied] = useState(null);
  const [contact, setContact] = useState({ phone: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContactDetails();
        // Если API возвращает объект напрямую:
        if (data) {
          setContact(data);
        }
      } catch (error) {
        console.error('Ошибка загрузки contactDetails:', error);
      }
    };
    fetchData();
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handlePhone = (e) => {
    if (!isMobile()) {
      e.preventDefault();
      copyToClipboard(contact.phone, 'phone');
    }
  };

  const handleEmail = (e) => {
    if (!isMobile()) {
      e.preventDefault();
      copyToClipboard(contact.email, 'email');
    }
  };

  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__logo">
          <img src={logo} alt="Адмирал-ВМФ" />
        </div>

        <div className="footer__contacts">
          <span style={{ position: 'relative' }}>
            <a
              className="footer__phone"
              href={`tel:${contact.phone}`}
              onClick={handlePhone}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              {contact.phone}
            </a>
            {copied === 'phone' && (
              <span className="copied-toast">Скопировано</span>
            )}
          </span>

          <span style={{ position: 'relative' }}>
            <a
              className="footer__email"
              href={`mailto:${contact.email}`}
              onClick={handleEmail}
            >
              {contact.email}
            </a>
            {copied === 'email' && (
              <span className="copied-toast">Скопировано</span>
            )}
          </span>

          <div className="footer__socials">
            <a href="https://vk.com/fcadmiral " className="footer__social-link">
              <img src={vkIcon} alt="VK" />
            </a>
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