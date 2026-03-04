import React from 'react';
import './Announcements.css';
import arrow from './public/arrow.svg';
import {
    slidesData,
    useIsMobile,
    useMobileCarousel,
    useDesktopCarousel
} from './carouselFunction';


function MobileCarousel() {
    const {
        activeIndex, nextSlide, prevSlide,
        handleTouchStart, handleTouchEnd, animationDuration
    } = useMobileCarousel({ animationDuration: 400 });

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
                            style={{ backgroundImage: `url(${slide.image})` }}
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
                    <p
                        key={slide.id}
                        className={`mobile-desc-text ${index === activeIndex ? 'mobile-desc-visible' : 'mobile-desc-hidden'}`}
                    >
                        {slide.description}
                    </p>
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

function DesktopCarousel() {
    const {
        extSlides,
        offset, noTransition,
        containerRef,
        nextSlide, prevSlide,
        isSlideActive,
        handleTouchStart, handleTouchEnd,
        handleTransitionEnd,
        animationDuration
    } = useDesktopCarousel({ animationDuration: 600 });

    return (
        <div className="carusel-hidden" ref={containerRef}>
            <div
                className={`main_Announcements${noTransition ? ' no-slide-transition' : ''}`}
                style={{
                    transform: `translateX(${offset}px)`,
                    transition: noTransition
                        ? 'none'
                        : `transform ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
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
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {isActive && (
                                <>
                                    <div className="inner_oval" />
                                    <div className="title">
                                        <h1>{slide.title}</h1>
                                    </div>
                                    <div className="description">
                                        <p>{slide.description}</p>
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
    return (
        <section className="Announcements">
            <div className="head_Announcements">
                <h1>Объявления</h1>
            </div>
            {isMobile ? <MobileCarousel /> : <DesktopCarousel />}
        </section>
    );
}