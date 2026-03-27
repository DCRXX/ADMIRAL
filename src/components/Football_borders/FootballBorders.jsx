import './FootballBorders.css'
import  { useState} from 'react';
import videoSrc from './video/IMG.mp4'
import { useScrollAnimation } from '../../useScrollAnimation.js';

export default function FootballBorders() {
    const [aboutData, setAboutData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, aboutData]);

    return (
        <section className='Football_borders' ref={sectionRef}>
            <div className='Football_main'>
                <video
                    className='video_Football'
                    src={videoSrc}
                    preload="auto"
                    playsInline
                    autoPlay
                    muted
                    loop
                />
                <div className='Football_text'>
                    <div className='head_Announcements'><h1>Футбол без границ</h1></div>
                    <p>Футбол — игра равных возможностей. В футбольной школе «Адмирал-ВМФ» спорт доступен каждому, независимо от физических возможностей. Программа «Футбол без границ» — это уникальный проект, который помогает детям с особенностями развития раскрыть свой потенциал через любимую игру миллионов. Наши профессиональные тренеры создают комфортную и поддерживающую атмосферу, где каждый юный спортсмен чувствует себя частью команды.</p>
                </div>
            </div>
        </section>
    )
}