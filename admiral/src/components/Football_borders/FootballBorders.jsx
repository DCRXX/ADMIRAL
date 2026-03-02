import './FootballBorders.css'
import videoSrc from './video/IMG.mp4'

export default function FootballBorders() {

    return (
        <section className='Football_borders'>
            <div className='Football_main'>
                <h1>Футбол без границ</h1>
                <p>Футбол — игра равных возможностей. В футбольной школе «Адмирал-ВМФ» спорт доступен каждому, независимо от физических возможностей. Программа «Футбол без границ» — это уникальный проект, который помогает детям с особенностями развития раскрыть свой потенциал через любимую игру миллионов. Наши профессиональные тренеры создают комфортную и поддерживающую атмосферу, где каждый юный спортсмен чувствует себя частью команды.</p>
                <video
                    className='video_Football'
                    src={videoSrc}
                    preload="auto" 
                    playsInline
                    autoPlay
                    muted
                    loop
                />
            </div>
        </section>
    )
}