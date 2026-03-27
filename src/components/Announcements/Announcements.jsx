import React, { useState, useEffect } from 'react';
import './Announcements.css';
import arrow from './public/arrow.svg';
import { Link } from 'react-scroll';
import {
    useIsMobile,
    useMobileCarousel,
    useDesktopCarousel
} from './carouselFunction';
import { useScrollAnimation } from '../../useScrollAnimation';
import { getAdvertisements } from '../../RouterAPI.jsx';

function MobileCarousel({ slidesData }) {
    const {
        activeIndex, nextSlide, prevSlide,
        handleTouchStart, handleTouchEnd, animationDuration
    } = useMobileCarousel({ slidesData, animationDuration: 400 });

    return (
        <div className="mobile-carousel">
            <div
                className="mobile-track-wrapper"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="mobile-track"
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                        transition: `transform ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                    }}
                >
                    {slidesData.map((slide) => (
                        <div
                            key={slide.id}
                            className="mobile-slide"
                            style={{ backgroundImage: `url(${slide.imagePath})` }}
                        >
                            <div className="mobile-slide__overlay" />
                            <div className="mobile-slide__title">
                                <h2>{slide.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mobile-description-box">
                {slidesData.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={index === activeIndex ? 'mobile-desc-visible' : 'mobile-desc-hidden'}
                    >
                        <p className="mobile-desc-text">{slide.description}</p>
                        {slide.showButton && (
                            <Link to='FAQ' smooth={true} duration={1200} offset={-200}>
                                <button className="button mobile-button" type="button">
                                    <p>Записаться</p>
                                </button>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="mobile-controls">
                <button className="mobile-arrow mobile-arrow--left" onClick={prevSlide} aria-label="prev">
                    <img src={arrow} alt="prev" />
                </button>
                <div className="mobile-dots">
                    {slidesData.map((slide, index) => (
                        <span
                            key={slide.id}
                            className={`mobile-dot ${index === activeIndex ? 'mobile-dot--active' : ''}`}
                        />
                    ))}
                </div>
                <button className="mobile-arrow mobile-arrow--right" onClick={nextSlide} aria-label="next">
                    <img src={arrow} alt="next" />
                </button>
            </div>
        </div>
    );
}

function DesktopCarousel({ slidesData }) {
    const {
        extSlides,
        offset,
        containerRef,
        nextSlide,
        prevSlide,
        isSlideActive,
        handleTouchStart,
        handleTouchEnd,
        handleTransitionEnd,
        animationDuration,
    } = useDesktopCarousel({ slidesData, animationDuration: 800 });

    return (
        <div className="carusel-hidden" ref={containerRef}>
            <div
                className="main_Announcements"
                style={{
                    transform: `translateX(${offset}px)`,
                    transition: `transform ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                }}
                onTransitionEnd={handleTransitionEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {extSlides.map((slide, i) => {
                    const isActive = isSlideActive(i);
                    return (
                        <div
                            key={slide._extKey}
                            className={isActive ? 'slide_active' : 'slide_inactive'}
                            style={{ backgroundImage: `url(${slide.imagePath})` }}
                        >
                            {isActive && (
                                <>
                                    <div className="inner_oval" />
                                    <div className="title">
                                        <h1>{slide.title}</h1>
                                    </div>
                                    <div className="description">
                                        <p>{slide.description}</p>
                                        {slide.showButton && (
                                            <Link to='FAQ' smooth={true} duration={1200} offset={-200}>
                                                <button className="button" type="button">
                                                    <p>Записаться</p>
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="arrow-left" onClick={prevSlide}>
                                        <img src={arrow} alt="prev" />
                                    </div>
                                    <div className="arrow-right" onClick={nextSlide}>
                                        <img src={arrow} alt="next" />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Announcements() {
    const isMobile = useIsMobile();
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useScrollAnimation([isLoading, slides]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAdvertisements();
                setSlides(data);
            } catch (error) {
                console.error('Ошибка загрузки Announcements:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (slides.length === 0) {
        return null;
    }

    return (
        <section className="Announcements" ref={sectionRef}>
            <div className="Announcements__gradient-container">
                <div className="gradient-layer-1" />
                <div className="gradient-layer-2" />
                <div className="gradient-layer-3" />
            </div>
            <div className="head_Announcements">
                <h1>Анонсы</h1>
            </div>
            {isMobile ? <MobileCarousel slidesData={slides} /> : <DesktopCarousel slidesData={slides} />}
        </section>
    );
}