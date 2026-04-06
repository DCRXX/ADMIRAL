import { useRef, useState, useEffect } from 'react';
import './CoachingStaff.css';
import arrow from "./public/arrow.svg";
import ball from './public/ball.svg';
import ball2 from './public/ball2.svg';
import { useScrollAnimation } from '../../useScrollAnimation.js';
import { getCoachingStaff } from '../../RouterAPI.jsx';

export default function CoachingStaff() {
    const scrollRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    const [coaches, setCoaches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, coaches]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCoachingStaff();
                setCoaches(data);
            } catch (error) {
                console.error('Ошибка загрузки CoachingStaff:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const smoothScrollBy = (amount) => {
            const target = el.scrollLeft + amount;
            el.scrollTo({
                left: target,
                behavior: 'smooth',
            });
        };

        const handleNext = () => {
            const card = el.querySelector('.Block_Coaching');
            if (!card) return;
            const gap = parseInt(getComputedStyle(el.querySelector('.Coaching_main')).gap) || 0;
            const step = card.offsetWidth + gap;
            smoothScrollBy(step);
        };

        const handlePrev = () => {
            const card = el.querySelector('.Block_Coaching');
            if (!card) return;
            const gap = parseInt(getComputedStyle(el.querySelector('.Coaching_main')).gap) || 0;
            const step = card.offsetWidth + gap;
            smoothScrollBy(-step);
        };

        prevBtnRef.current?.addEventListener('click', handlePrev);
        nextBtnRef.current?.addEventListener('click', handleNext);

        return () => {
            prevBtnRef.current?.removeEventListener('click', handlePrev);
            nextBtnRef.current?.removeEventListener('click', handleNext);
        };
    }, [coaches]);

    if (coaches.length === 0) {
        return null;
    }

    return (
        <section className='CoachingStaff' ref={sectionRef}>
            <div className='head_Announcements'>
                <h1>Тренерский штаб</h1>
            </div>
            <div className='description_CoachingStaff'>
                <p>
                    Тренерский штаб нашей школы — это команда высококвалифицированных специалистов,
                    объединённых общей целью: раскрыть потенциал каждого ученика и помочь ему достичь значимых результатов.
                </p>
            </div>

            <div className="carousel-wrapper-thefirst">
                <div className='overflow_carusel' ref={scrollRef}>
                    <div className='Coaching_main'>
                        {coaches.map((coach, index) => (
                            <div className='Block_Coaching' key={index}>
                                <img className='Coaching_image' src={coach.imagePathCoaching} alt='' />
                                <img className='card-flag' src={coach.countryImagePath} alt='' />
                                <img className='ball_1' src={ball} alt="" draggable="false" />
                                <img className='ball_2' src={ball2} alt="" draggable="false" />
                                <div className='description_Coaching'>
                                    <h1 className='FIO'>{coach.fioCoaching}</h1>
                                    <p className='profile'>{coach.speciality}</p>
                                    <p className='Experience'>{coach.education}</p>
                                    {coach.descriptionOfSpecialty && (
                                        <p className='License'>{coach.descriptionOfSpecialty}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button ref={prevBtnRef} className="arrow-btn2 arrow-btn2--prev" aria-label="Предыдущий">
                    <img src={arrow} alt="Previous" />
                </button>

                <button ref={nextBtnRef} className="arrow-btn2 arrow-btn2--next" aria-label="Следующий">
                    <img src={arrow} alt="Next" />
                </button>
            </div>
        </section>
    );
}