import React from 'react';
import './Announcements.css';
import arrow from './public/arrow.svg';
import { useCarousel } from './carouselFunction';

export default function Announcements() {
    const {
        activeIndex,
        offset,
        containerRef,
        isMobile,
        mainRef,
        nextSlide,
        prevSlide,
        isSlideActive,
        slidesData,
        animationDuration
    } = useCarousel({
        initialIndex: 0,
        animationDuration: 600
    });


    return (
        <section className='Announcements'>
            <div className='head_Announcements'>
                <h1>Объявления</h1>
            </div>

            <div className='carusel-hidden' ref={containerRef}>
                <div
                    className='main_Announcements'
                    ref={mainRef}
                    style={{
                        transform: `translateX(${offset}px)`,
                        transition: `transform ${animationDuration}ms ease-in-out`
                    }}
                >
                    {slidesData.map((slide, index) => {
                        const isActive = isSlideActive(index);
                        if (isMobile) {
                            return (
                                <section>
                                    <div
                                        key={slide.id}
                                        className={isActive ? 'slide_active' : 'slide_inactive'}
                                        style={{
                                            backgroundImage: `url(${slide.image})`
                                        }}
                                    >
                                        {isActive && (
                                            <>
                                                <div className='inner_oval'></div>

                                                <div className='title'>
                                                    <h1>{slide.title}</h1>
                                                </div>
                                                <div className='arrow-left' onClick={prevSlide}>
                                                    <img src={arrow} alt="prev" />
                                                </div>

                                                <div className='arrow-right' onClick={nextSlide}>
                                                    <img src={arrow} alt="next" />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='description-mobile'>
                                        <p>{slide.description}</p>
                                    </div>
                                </section>
                            )
                        }
                        return (
                            <div
                                key={slide.id}
                                className={isActive ? 'slide_active' : 'slide_inactive'}
                                style={{
                                    backgroundImage: `url(${slide.image})`
                                }}
                            >
                                {isActive && (
                                    <>
                                        <div className='inner_oval'></div>

                                        <div className='title'>
                                            <h1>{slide.title}</h1>
                                        </div>

                                        <div className='description'>
                                            <p>{slide.description}</p>
                                        </div>

                                        <div className='arrow-left' onClick={prevSlide}>
                                            <img src={arrow} alt="prev" />
                                        </div>

                                        <div className='arrow-right' onClick={nextSlide}>
                                            <img src={arrow} alt="next" />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}