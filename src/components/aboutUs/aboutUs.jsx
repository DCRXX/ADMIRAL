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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAboutUs();
                setAboutData(data);
            } catch (error) {
                console.error('Ошибка загрузки AboutUs:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!aboutData) {
        console.error('aboutData is null после загрузки');
        return <div>Ошибка загрузки данных</div>;
    }

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
                                <h3>{aboutData.blockOneTitle}</h3>
                                <p>{aboutData.blockOneDescription}</p>
                            </div>

                            <div className="mobileBoyWrapper">
                                <img src={boy} alt="" className="mobileBoy" />
                            </div>

                            <div className='firstRow'>
                                <h3>{aboutData.blockTwoTitle}</h3>
                                <p>{aboutData.blockTwoDescription}</p>
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