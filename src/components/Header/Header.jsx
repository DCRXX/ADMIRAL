import './Header.css'
import logo from './public/logo.svg'
import Telegramm from './public/Telegram.svg'
import WhatsApp from './public/WhatsApp.svg'
import VK from './public/VK.svg'
import ADMIRAL from './public/АДМИРАЛ.svg'
import foot_players from './public/football_players.png'
import { Link } from 'react-scroll'


export default function HeaderHero() {

  return (
    <section className='Header_Hero'>
      <header className="header">
        <div className='secoundHeader'>
          <a href=''>
            <img src={logo} className="logo" alt="Логотип" />
          </a>
          <nav>
            <ul className="nav-1">
              <Link to='AboutUs' smooth={true} duration={1000} offset={40}>
                <li><p>О нас</p></li>
              </Link>
              <Link to='Announcements' smooth={true} duration={1000} offset={-60}>
                <li><p>Анонсы</p></li>
              </Link>
              <Link to='CoachingStaff' smooth={true} duration={1000} offset={-60}>
                <li><p>Тренерский штаб</p></li>
              </Link>
            </ul>
          </nav>
          <div className="right-group">
            <Link to='FAQ' smooth={true} duration={1200} offset={-200}>
              <button className="button" type="button">
                <p>Записаться</p>
              </button>
            </Link>
            <div className='secoundFlour'>
              <ul className="nav-2">
                <li>8-926-597-57-57</li>
                <a href='href="mailto:fc-admiral@mail.ru"'>
                  <li>fc-admiral@mail.ru</li>
                </a>
              </ul>
              <ul className="nav-3">
                <a href='https://t.me/fcadmiral'>
                  <li><img src={Telegramm} alt="Telegram" /></li>
                </a>
                <a href='https://wa.me/79150059393'>
                  <li><img src={WhatsApp} alt="WhatsApp" /></li>
                </a>
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