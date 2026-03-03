import { useRef, useEffect } from 'react';
import './theFirstStep.css';

import arrow from "./public/arrow.svg";
import admiralLogo from "./public/admiral_logo.svg";
import dinamoLogo from "./public/dinamo.svg";
import csk from "./public/csk.svg";
import fkT from "./public/fkT.svg";
import firstBoy from "./public/boy1.svg";
import secondBoy from "./public/boy2.svg";
import thirdBoy from "./public/boy3.svg";

export default function theFirstStep() {
    const trackRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

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

        let isSnappingDisabled = false;

        const handleWheel = (e) => {
            e.preventDefault();

            if (!isSnappingDisabled) {
                track.style.scrollSnapType = 'none';
                isSnappingDisabled = true;
            }

            track.scrollLeft += e.deltaY * 3.8;

            clearTimeout(window.snapTimeout);
            window.snapTimeout = setTimeout(() => {
                track.style.scrollSnapType = 'x mandatory';
                isSnappingDisabled = false;
            }, 300);
        };

        prevBtnRef.current?.addEventListener('click', handlePrev);
        nextBtnRef.current?.addEventListener('click', handleNext);
        track.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            prevBtnRef.current?.removeEventListener('click', handlePrev);
            nextBtnRef.current?.removeEventListener('click', handleNext);
            track.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <section className='theFirstStep'>
            <div className="name">
                <h1>Первый шаг в академию</h1>
                </div>

            <div className="firstLayer">
                <div className="carousel-wrapper-thefirst">
                    <div className="boys-track" ref={trackRef}>
                        <div className="boysblocks">
                            <div className="info">
                                <div className="fromAndAfter">
                                    <img src={admiralLogo} alt="Admiral" className="admiral" />
                                    <img src={arrow} alt="" className="arrow" />
                                    <img src={dinamoLogo} alt="Dinamo" className="otherLogo" />
                                </div>
                                <div className="NameAndAge">
                                    <p>2015</p>
                                    <h3>Геркен Евгений</h3>
                                </div>
                            </div>
                            <div className="boys">
                                <img src={firstBoy} alt="Геркен Евгений" className="boy" />
                            </div>
                        </div>
                        <div className="boysblocks">
                            <div className="info">
                                <div className="fromAndAfter">
                                    <img src={admiralLogo} alt="Admiral" className="admiral" />
                                    <img src={arrow} alt="" className="arrow" />
                                    <img src={csk} alt="CSK" className="otherLogo" />
                                </div>
                                <div className="NameAndAge">
                                    <p>2014</p>
                                    <h3>Белобров Степан</h3>
                                </div>
                            </div>
                            <div className="boys">
                                <img src={secondBoy} alt="Белобров Степан" className="boy" />
                            </div>
                        </div>
                        <div className="boysblocks">
                            <div className="info">
                                <div className="fromAndAfter">
                                    <img src={admiralLogo} alt="Admiral" className="admiral" />
                                    <img src={arrow} alt="" className="arrow" />
                                    <img src={fkT} alt="fkT" className="otherLogo" />
                                </div>
                                <div className="NameAndAge">
                                    <p>2012</p>
                                    <h3>Горбунов Ярослав</h3>
                                </div>
                            </div>
                            <div className="boys">
                                <img src={thirdBoy} alt="Горбунов Ярослав" className="boy" />
                            </div>
                        </div>
                        <div className="boysblocks">
                            <div className="info">
                                <div className="fromAndAfter">
                                    <img src={admiralLogo} alt="Admiral" className="admiral" />
                                    <img src={arrow} alt="" className="arrow" />
                                    <img src={csk} alt="CSK" className="otherLogo" />
                                </div>
                                <div className="NameAndAge">
                                    <p>2014</p>
                                    <h3>Белобров Степан</h3>
                                </div>
                            </div>
                            <div className="boys">
                                <img src={secondBoy} alt="Белобров Степан" className="boy" />
                            </div>
                        </div>

                        <div className="boysblocks">
                            <div className="info">
                                <div className="fromAndAfter">
                                    <img src={admiralLogo} alt="Admiral" className="admiral" />
                                    <img src={arrow} alt="" className="arrow" />
                                    <img src={dinamoLogo} alt="Dinamo" className="otherLogo" />
                                </div>
                                <div className="NameAndAge">
                                    <p>2015</p>
                                    <h3>Геркен Евгений</h3>
                                </div>
                            </div>
                            <div className="boys">
                                <img src={firstBoy} alt="Геркен Евгений" className="boy" />
                            </div>
                        </div>

                        <div className="boysblocks">
                            <div className="info">
                                <div className="fromAndAfter">
                                    <img src={admiralLogo} alt="Admiral" className="admiral" />
                                    <img src={arrow} alt="" className="arrow" />
                                    <img src={fkT} alt="fkT" className="otherLogo" />
                                </div>
                                <div className="NameAndAge">
                                    <p>2012</p>
                                    <h3>Горбунов Ярослав</h3>
                                </div>
                            </div>
                            <div className="boys">
                                <img src={thirdBoy} alt="Горбунов Ярослав" className="boy" />
                            </div>
                        </div>
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