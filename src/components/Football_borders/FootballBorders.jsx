import './FootballBorders.css'
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../useScrollAnimation.js';
import { getFootbalBorders } from '../../RouterAPI.jsx';

export default function FootballBorders() {
    const [aboutData, setAboutData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, aboutData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFootbalBorders();
                if (data && data.length > 0) {
                    setAboutData(data[0]);
                }
            } catch (error) {
                console.error('Ошибка загрузки FootballBorders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (!aboutData) {
        return null;
    }

    return (
        <section className='Football_borders' ref={sectionRef}>
            <div className='Football_main'>
                <video
                    className='video_Football'
                    src={aboutData.videoPathFile}
                    preload="auto"
                    playsInline
                    autoPlay
                    muted
                    loop
                />
                <div className='Football_text'>
                    <div className='head_Announcements'><h1>{aboutData.title}</h1></div>
                    <p>{aboutData.description}</p>
                </div>
            </div>
        </section>
    )
}