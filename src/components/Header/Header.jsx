import { useState } from 'react';
import './Header.css'
import logo from './public/logo.svg'
import VK from './public/VK.svg'
import ADMIRAL from './public/АДМИРАЛ.svg'
import foot_players from './public/Group 166 1.png'
import { Link } from 'react-scroll'

const PHONE = '8-926-597-57-57';
const EMAIL = 'fc-admiral@mail.ru';

const isMobile = () =>
  typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;

export default function HeaderHero() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handlePhone = (e) => {
    if (!isMobile()) {
      e.preventDefault();
      copyToClipboard(PHONE, 'phone');
    }
  };

  const handleEmail = (e) => {
    if (!isMobile()) {
      e.preventDefault();
      copyToClipboard(EMAIL, 'email');
    }
  };

  return (
    <section className='Header_Hero'>
      <header className="header">
        <div className='secoundHeader'>
          <a href=''>
            <img src={logo} className="logo" alt="Логотип" />
          </a>
          
          <div className="right-group">
            <Link to='FAQ' smooth={true} duration={1200} offset={-200}>
              <button className="button" type="button">
                <p>Записаться</p>
              </button>
            </Link>
            <div className='secoundFlour'>
              <ul className="nav-2">
                <li style={{ position: 'relative' }}>
                  <a href={`tel:${PHONE}`} onClick={handlePhone} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    {PHONE}
                  </a>
                  {copied === 'phone' && (
                    <span className="copied-toast">Скопировано</span>
                  )}
                </li>
                <li style={{ position: 'relative' }}>
                  <a href={`mailto:${EMAIL}`} onClick={handleEmail} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    {EMAIL}
                  </a>
                  {copied === 'email' && (
                    <span className="copied-toast">Скопировано</span>
                  )}
                </li>
              </ul>
              <ul className="nav-3">
                <a href='https://vk.com/fcadmiral'>
                  <li><img src={VK} alt="ВКонтакте" /></li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className="strip"></div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <div className="football_school">
            <p>ФУТБОЛЬНАЯ ШКОЛА</p>
          </div>
          <div className="admiral-name">
            <img src={ADMIRAL} />
          </div>
        </div>
        <div className='players'>
          <img
            src={foot_players}
            className="football_players"
            alt="Футболисты"
          />
        </div>
      </section>
    </section>
  );
}