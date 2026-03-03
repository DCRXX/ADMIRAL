import React from 'react';
import './Advantages.css';

import goalkeepersImg from './public/shkolavratarey.png';
import summercampsImg from './public/summersbors.png';
import trainingcampsImg from './public/uchebyiy.png';

export default function Advantages() {
  return (
    <section className="advantages">

      <div className="advantages__gradient-top" />

      <div className="advantages__title">
        <h1>Наши преимущества</h1>
      </div>

      <div className="advantages__cards">

        <div className="advantages__card">
          <div className="advantages__card-image">
            <img src={goalkeepersImg} alt="Школа вратарей" />
            <div className="advantages__card-gradient" />
            <h3 className="advantages__card-title">Школа вратарей</h3>
          </div>
          <div className="advantages__card-body">
            <p className="advantages__card-text">
              В нашей школе организованы специализированные тренировки для вратарей — ключевого звена любой футбольной команды. Занятия проходят под руководством опытного тренера. Программа тренировок выстроена системно и охватывает все ключевые аспекты подготовки вратаря.
            </p>
          </div>
        </div>

        <div className="advantages__card">
          <div className="advantages__card-image">
            <img src={summercampsImg} alt="Летние сборы и выездные турниры" />
            <div className="advantages__card-gradient" />
            <h3 className="advantages__card-title">Летние сборы и выездные турниры</h3>
          </div>
          <div className="advantages__card-body">
            <p className="advantages__card-text">
              Неотъемлемой частью тренировок является получение опыта детьми в рамках соревнований. В нашей школе дети всех возрастов принимают участие в различных турнирах, где закрепляют и развивают свои футбольные навыки. Так же для наших воспитанников мы организуем летние и зимние тренировочные сборы и выездные турниры по всей России.
            </p>
          </div>
        </div>

        <div className="advantages__card">
          <div className="advantages__card-image">
            <img src={trainingcampsImg} alt="Учебно-тренировочные сборы" />
            <div className="advantages__card-gradient" />
            <h3 className="advantages__card-title">Учебно-тренировочные сборы</h3>
          </div>
          <div className="advantages__card-body">
            <p className="advantages__card-text">
              В ФШ «АдмиралВМФ» регулярно проводятся учебно-тренировочные сборы — важная часть подготовки юных футболистов. Это не только об интенсивных тренировках на поле и в тренажерном зале – это о комплексном развитии, где спорт становится инструментом формирования личности.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}