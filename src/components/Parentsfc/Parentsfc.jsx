import {useState} from 'react';
import './Parentsfc.css';
import { useScrollAnimation } from '../../useScrollAnimation.js';
import dadsImg from './public/dad.svg';
import momsImg from './public/moms.svg';

export default function ParentsFC() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useScrollAnimation([isLoading, aboutData]);

  return (
    <section className="parents" ref={sectionRef}>
      <div className="parents__title">
        <h1>Родительские ФК</h1>
      </div>

      <div className="parents__cards">

        <div className="parents__card">
          <div className="parents__card-image">
            <img src={dadsImg} alt="Отцовский футбольный клуб" />
            <div className="parents__card-overlay" />
            <h3 className="parents__card-title">Отцовский футбольный клуб</h3>
          </div>
          <div className="parents__card-body">
            <p className="parents__card-text">
              Каждый ребенок мечтает увидеть, как его отец играет в футбол и празднует победы. Отцам наших воспитанников мы предлагаем присоединиться к отцовской команде. Тренировки, регулярная игровая практика и дружеская атмосфера мужского коллектива позволят не только отвлечься от повседневных забот, но и дадут лишний повод вашим детям гордиться своими папами!
            </p>
          </div>
        </div>

        <div className="parents__card">
          <div className="parents__card-image">
            <img src={momsImg} alt="Женский футбольный клуб для мам" />
            <div className="parents__card-overlay" />
            <h3 className="parents__card-title">Футбольный клуб для мам</h3>
          </div>
          <div className="parents__card-body">
            <p className="parents__card-text">
              Создавая женскую футбольную команду для мам воспитанников "Адмирал ВМФ" мы руководствовались двумя идеями. Во-первых, футбол — это спорт, доступный каждому. Во-вторых, гораздо проще понять и поддержать своего ребенка, если понимаешь спорт, которым он занимается. Наши мамы дважды в неделю тренируются под руководством опытного тренера, и регулярно участвуют в турнирах. Будем рады видеть и вас в нашей женской команде!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}