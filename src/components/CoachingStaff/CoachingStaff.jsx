import { useRef, useEffect, useState } from 'react'
import './CoachingStaff.css'
import Coaching1 from './public/Coaching1.png'
import Coaching2 from './public/Coaching2.png'
import Coaching3 from './public/Coaching3.png'
import ball from './public/ball.svg'
import ball2 from './public/ball2.svg'

export default function CoachingStaff() {
    const scrollRef = useRef(null);
    const isOverCarousel = useRef(false);

    const handleWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        
        const container = scrollRef.current;
        const card = container.querySelector('.Block_Coaching');
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(container.querySelector('.Coaching_main')).gap) || 0;
        const scrollAmount = cardWidth + gap;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetScroll = container.scrollLeft + (direction * scrollAmount);
        const snapPosition = Math.round(targetScroll / scrollAmount) * scrollAmount;
        
        container.scrollTo({
            left: snapPosition,
            behavior: 'smooth'
        });
    };
    const handleMouseEnter = () => {
        isOverCarousel.current = true;
    };
    const handleMouseLeave = () => {
        isOverCarousel.current = false;
    };
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };
    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        
        const container = scrollRef.current;
        const cardWidth = container.querySelector('.Block_Coaching').offsetWidth;
        const gap = parseInt(getComputedStyle(container.querySelector('.Coaching_main')).gap) || 0;
        const scrollAmount = cardWidth + gap;
        const snapPosition = Math.round(container.scrollLeft / scrollAmount) * scrollAmount;
        
        container.scrollTo({
            left: snapPosition,
            behavior: 'smooth'
        });
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className='CoachingStaff'>
            <div className='header_CoachingStaff'>
                <h1>Тренерский штаб</h1>
            </div>
            <div className='description_CoachingStaff'>
                <p>Тренерский штаб нашей школы - это команда высококвалифицированных специалистов, объединённых общей целью: раскрыть потенциал каждого ученика и помочь ему достичь значимых результатов.В основе деятельности наших тренеров лежит фундаментальный принцип «обучая -обучайся сам». Каждый тренер понимает: чтобы эффективно вести за собой учеников, необходимо постоянно совершенствовать собственные знания и навыки.</p>
            </div>
            <div 
                className='overflow_carusel'
                ref={scrollRef}
                onWheel={handleWheel}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <div className='Coaching_main'>
                    <div className='Block_Coaching'>
                        <img className='Coaching_image' src={Coaching1} alt="Тренер 1" draggable="false" />
                        <img className='ball_1' src={ball} alt="" draggable="false" />
                        <img className='ball_2' src={ball2} alt="" draggable="false" />
                        <div className='description_Coaching'>
                            <h1 className='FIO'>Владислав Николаевич Громов</h1>
                            <p className='profile'>Главный тренер</p>
                            <p className='Experience'>Высшее педагогическое образование</p>
                            <p className='License'>Лицензия с UEFA</p>
                        </div>
                    </div>
                    <div className='Block_Coaching'>
                        <img className='Coaching_image' src={Coaching2} alt="Тренер 2" draggable="false" />
                        <img className='ball_1' src={ball} alt="" draggable="false" />
                        <img className='ball_2' src={ball2} alt="" draggable="false" />
                        <div className='description_Coaching'>
                            <h1 className='FIO'>Дмитрий Владимирович Шапиро</h1>
                            <p className='profile'>Тренер</p>
                            <p className='Experience'>Высшее педагогическое образование</p>
                            <p className='License'>Лицензия с UEFA</p>
                        </div>
                    </div>
                    <div className='Block_Coaching'>
                        <img className='Coaching_image' src={Coaching3} alt="Тренер 3" draggable="false" />
                        <img className='ball_1' src={ball} alt="" draggable="false" />
                        <img className='ball_2' src={ball2} alt="" draggable="false" />
                        <div className='description_Coaching'>
                            <h1 className='FIO'>Василий Олегович Извозчиков </h1>
                            <p className='profile'>Тренер</p>
                            <p className='Experience'>Высшее педагогическое образование</p>
                            <p className='License'>Лицензия с UEFA</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}