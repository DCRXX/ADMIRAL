import './Header.css'
import logo from './public/logo.svg'
import Telegramm from './public/Telegram.svg'
import WhatsApp from './public/WhatsApp.svg'
import VK from './public/VK.svg'
import ADMIRAL from './public/АДМИРАЛ.svg'
import foot_players from './public/football_players.png'


export default function HeaderHero() {
  return (
    <section className='Header_Hero'>
      <header className="header">
      <div className='secoundHeader'>
        <img src={logo} className="logo" alt="Логотип" />
        <nav>
          <ul className="nav-1">
            <li><a href="#">О нас</a></li>
            <li><a href="#">Объявление</a></li>
            <li><a href="#">Тренерский штаб</a></li>
          </ul>
        </nav>
        <div className="right-group">
          <button className="button" type="button">
            <p>Записаться</p>
          </button>
          <div className='secoundFlour'>
            <ul className="nav-2">
              <li>8-926-597-57-57</li>
              <li>fc-admiral@mail.ru</li>
            </ul>
            <ul className="nav-3">
              <li><img src={Telegramm} alt="Telegram" /></li>
              <li><img src={WhatsApp} alt="WhatsApp" /></li>
              <li><img src={VK} alt="ВКонтакте" /></li>
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