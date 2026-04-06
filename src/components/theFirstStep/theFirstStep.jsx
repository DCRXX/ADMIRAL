import { useRef, useState, useEffect } from 'react';
import './theFirstStep.css';

import arrow from "./public/arrow.svg";
import admiralLogo from "./public/admiral_logo.svg";
import { useScrollAnimation } from '../../useScrollAnimation.js';
import { getTheFirstStep } from '../../RouterAPI.jsx';

export default function theFirstStep() {
    const trackRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, players]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTheFirstStep();
                setPlayers(data);
            } catch (error) {
                console.error('Ошибка загрузки theFirstStep:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const smoothScrollBy = (amount) => {
            const target = track.scrollLeft + amount;
            track.scrollTo({
                left: Math.max(0, target),
                behavior: 'smooth',
            });
        };

        const handleNext = () => {
            const card = track.children[0];
            if (!card) return;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            const step = card.offsetWidth + gap;
            smoothScrollBy(step);
        };

        const handlePrev = () => {
            const card = track.children[0];
            if (!card) return;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            const step = card.offsetWidth + gap;
            smoothScrollBy(-step);
        };
        
        prevBtnRef.current?.addEventListener('click', handlePrev);
        nextBtnRef.current?.addEventListener('click', handleNext);

        return () => {
            prevBtnRef.current?.removeEventListener('click', handlePrev);
            nextBtnRef.current?.removeEventListener('click', handleNext);
        };
    }, [players]);

    if (players.length === 0) {
        return null;
    }

    return (
        <section className='theFirstStep' ref={sectionRef}>
            <div className="name">
                <h1>Первый шаг в академию</h1>
            </div>

            <div className="firstLayer">
                <div className="carousel-wrapper-thefirst">
                    <div className="boys-track" ref={trackRef}>
                        {players.map((player) => (
                            <div className="boysblocks" key={player.id}>
                                <div className="info">
                                    <div className="fromAndAfter">
                                        <img src={admiralLogo} alt="Admiral" className="admiral" />
                                        <img src={arrow} alt="" className="arrow" />
                                        <img src={player.imageFootballTeam} alt="" className="otherLogo" />
                                    </div>
                                    <div className="NameAndAge">
                                        <p>{player.year}</p>
                                        <h3>{player.FIOPlayer}</h3>
                                    </div>
                                </div>
                                <div className="boys">
                                    <img src={player.imagePlayer} alt={player.FIOPlayer} className="boy" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button ref={prevBtnRef} className="arrow-btn arrow-btn--prev" aria-label="Предыдущий">
                        <img src={arrow} alt="" />
                    </button>

                    <button ref={nextBtnRef} className="arrow-btn arrow-btn--next" aria-label="Следующий">
                        <img src={arrow} alt="" />
                    </button>
                </div>
            </div>
        </section>
    );
}