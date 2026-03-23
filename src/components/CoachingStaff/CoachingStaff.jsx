import { useRef, useEffect } from 'react';
import './CoachingStaff.css';
import arrow from "./public/arrow.svg"; 
import ball from './public/ball.svg';
import ball2 from './public/ball2.svg';
import ruflag from './public/ruflag.png';
import armflag from './public/armflag.png';


export default function CoachingStaff() {
    const scrollRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

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
    }, []);

    return (
        <section className='CoachingStaff'>
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
                        
                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Евгений Васильевич Терехов</h1>
                                <p className='profile'>Руководитель школы</p>
                                <p className='Experience'>Высшее образование. «Спортивный менеджмент»</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                        
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Владислав Николаевич Громов</h1>
                                <p className='profile'>Главный тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                                <p className='License'>Лицензия «С-UEFA»</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                        
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Дмитрий Владимирович Шапиро</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                                <p className='License'>Тренер-преподаватель по футболу (Центр им. К.И. Бескова)</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                        
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Василий Олегович Извозчиков</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                                <p className='License'>Адаптивная физическая культура. Адаптивный футбол</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Христофор Арменович Аракелян</h1>
                                <p className='profile'>Тренер вратарей</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                                <p className='License'>Тренер вратарей (Центр им. К.И. Бескова)</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Кирилл Евгеньевич Ивашкин</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Наталия Андреевна Шатрова</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Тренер-преподаватель по футболу (Центр им. К.И. Бескова)</p>
                            
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Денис Юрьевич Панюшкин</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                                <p className='License'>Тренер по ОФП</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Сергей Вадимович Дабагян</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                                <p className='License'>Тренер по ОФП</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={armflag} alt='AM' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Эдгар Арменович Манукян</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Высшее педагогическое образование</p>
                            
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Мохаммед Бегмуродович Каландаров</h1>
                                <p className='profile'>Тренер</p>
                                <p className='Experience'>Тренер-преподаватель по футболу (Центр им. К.И. Бескова)</p>
                            </div>
                        </div>

                        <div className='Block_Coaching'>
                            <img className='card-flag' src={ruflag} alt='RU' />
                            <img className='ball_1' src={ball}  alt="" draggable="false" />
                            <img className='ball_2' src={ball2} alt="" draggable="false" />
                            <div className='description_Coaching'>
                                <h1 className='FIO'>Елизавета Артуровна Хотеева</h1>
                                <p className='profile'>Пресс-атташе</p>
                                <p className='Experience'>«Спортивная журналистика и медиа» — РЭУ им. Г.В. Плеханова</p>
                                <p className='License'>«Прожектор Трибуны» + «Маркетинг в спорте» — Факультет СТАРТ</p>
                            </div>
                        </div>

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