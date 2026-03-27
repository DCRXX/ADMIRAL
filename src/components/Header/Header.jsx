import { useState, useEffect } from 'react';
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
  const [showAdmiral, setShowAdmiral] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);

  useEffect(() => {

    const admiralTimer = setTimeout(() => {
      setShowAdmiral(true);
    }, 400);

    const playersTimer = setTimeout(() => {
      setShowPlayers(true);
    }, 700);

    return () => {
      clearTimeout(admiralTimer);
      clearTimeout(playersTimer);
    };
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
        <a href=''>
          <img src={logo} className="logo" alt="Логотип" />
        </a>

        <div className="right-group">
          <Link to='FAQ' smooth={true} duration={1200} offset={-200}>
            <button className="button_zap" type="button">
              <p>Записаться</p>
            </button>
          </Link>

          <div className="nav-2">
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
          </div>
          <div className="nav-3">
            <a href='https://vk.com/fcadmiral '>
              <img src={VK} alt="ВКонтакте" />
            </a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="football_school">
            <p>ФУТБОЛЬНАЯ ШКОЛА</p>
          </div>
          <div className={`admiral-name ${showAdmiral ? 'show' : ''}`}>
            <img src={ADMIRAL} alt="АДМИРАЛ" />
          </div>
        </div>

        <div className={`bottom-gradient ${showPlayers ? 'show' : ''}`}></div>

        <div className={`players ${showPlayers ? 'show' : ''}`}>
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