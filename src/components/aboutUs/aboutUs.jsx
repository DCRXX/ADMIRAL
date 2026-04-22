import React, { useState, useEffect } from 'react';
import boy from './public/boy2block.svg';
import './aboutUs.css';
import { Element, Link } from 'react-scroll';
import { getAboutUs } from "../../RouterAPI.jsx";
import { useScrollAnimation } from '../../useScrollAnimation.js';

function AboutUs() {
    const [aboutData, setAboutData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, aboutData]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getAboutUs();
    //             if (data) {
    //                 setAboutData(data);
    //             }
    //         } catch (error) {
    //             console.error('Ошибка загрузки AboutUs:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // if (isLoading) {
    //     return <div>Загрузка...</div>;
    // }

    // if (!aboutData || !aboutData.blockOneDescription) {
    //     console.error('aboutData is null после загрузки');
    //     return <div>Ошибка загрузки данных</div>;
    // }

    return (
        <section className="gradient">
            <div className="aboutUs" ref={sectionRef}>
                <div className="aboutUs__gradient-container">
                    <div className="aboutUs-gradient-layer-1" />
                    <div className="aboutUs-gradient-layer-2" />
                    <div className="aboutUs-gradient-layer-3" />
                    <div className="aboutUs-gradient-layer-4" />
                </div>
                <div className="allTables">
                    <div className="head_Announcements">
                        <h1>О нас</h1>
                    </div>
                    <div className='allTogether'>
                        <div className="firstTable">
                            <img src={boy} alt="" />
                        </div>
                        <div className="secondTable">
                            <div className='firstRow'>
                                <h3>О ФУТБОЛЬНОЙ ШКОЛЕ “АДМИРАЛ-ВМФ”</h3>
                                <p>С 2009 года футбольная школа «Адмирал-ВМФ» успешно развивает молодых спортсменов и помогает им раскрыть свой потенциал. За эти годы мы стали настоящей футбольной семьей, где каждый воспитанник получает индивидуальное внимание и профессиональную поддержку. Наша миссия - комплексное развитие личности! Мы не просто учим футболу, мы воспитываем сильных, целеустремленных и здоровых людей. Наша главная задача — помочь каждому юному спортсмену стать успешным как на поле, так и в жизни.</p>
                            </div>

                            <div className="mobileBoyWrapper">
                                <img src={boy} alt="" className="mobileBoy" />
                            </div>

                            <div className='firstRow'>
                                <h3>ФИЛОСОФИЯ НАШЕЙ ШКОЛЫ</h3>
                                <p>Каждый тренер нашей школы знает основные фазы роста и развития юных игроков. Это важно, ведь любой ребенок – индивидуален. Мы уважаем особенности каждого спортсмена и не навязываем ему свою «модель» физического воспитания.Наша модель нацелена на развитие и раскрытие потенциала молодых спортсменов. Мы убеждены, что результат работы тренера не измеряется количеством титулов и медалей.Главная задача нашей школы - воспитание и обучение футболиста, который станет полноценным, сильным и здоровым членом общества</p>
                            </div>

                            <div className='buttonAfterAll'>
                                <Link to='FAQ' smooth={true} duration={1100} offset={-200}>
                                    <button>
                                        <p>Записаться</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;