// carouselFunction.js
import { useState, useRef, useEffect, useCallback } from 'react';

export const slidesData = [
    {
        id: 1,
        title: "Новое отделение Царицыно",
        description: "Осенью 2025 года футбольная школа «АдмиралВМФ» открыла новое отделение на базе современного стадиона «Огонёк» в районе Царицыно...",
        image: "./src/components/Announcements/public/img2.png"
    },
    {
        id: 2,
        title: "Зимние сборы 2026",
        description: "Присоединяйтесь к нашим интенсивным тренировкам в закрытых манежах этой зимой.",
        image: "./src/components/Announcements/public/img4.png"
    },
    {
        id: 3,
        title: "Турнир в Сокольниках",
        description: "Наши команды заняли призовые места в ежегодном кубке Московской Федерации футбола.",
        image: "./src/components/Announcements/public/img3.png"
    },
    {
        id: 4,
        title: "Турнир в Сокольниках",
        description: "Наши команды заняли призовые места в ежегодном кубке Московской Федерации футбола.",
        image: "./src/components/Announcements/public/img7.png"
    },
    {
        id: 5,
        title: "Турнир в Сокольниках",
        description: "Наши команды заняли призовые места в ежегодном кубке Московской Федерации футбола.",
        image: "./src/components/Announcements/public/img5.png"
    }
];

// Константы для размеров
const GAP_VW = 3;
const NO_FOCUS_WIDTH_VW = 40;
const FOCUS_WIDTH_VW = 57;
const MOBILE_BREAKPOINT = 600;

/**
 * Хук для определения мобильного экрана
 */
export const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
};

const getDynamicDivisor = (screenWidth) => {
    const baseDivisor = 100;
    const minDivisor = 60;
    const stepPx = 7;
    const triggerWidth = 500; // ниже этой ширины включается логика
    
    // Если ширина >= 500px - возвращаем базовый делитель
    if (screenWidth >= triggerWidth) {
        return baseDivisor;
    }
    
    // Считаем шаги от 500px
    const diff = triggerWidth - screenWidth;
    const steps = Math.floor(diff / stepPx);
    const newDivisor = baseDivisor - steps;
    
    return Math.max(newDivisor, minDivisor);
};

/**
 * Хук для управления каруселью
 */
export const useCarousel = (options = {}) => {
    const { initialIndex = 0, animationDuration = 600 } = options;
    const isMobile = useIsMobile();
    
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [isAnimating, setIsAnimating] = useState(false);
    const [offset, setOffset] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const containerRef = useRef(null);
    const mainRef = useRef(null);
    const touchStartX = useRef(0);

    // Отслеживаем ширину экрана
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Динамический vwToPx с пересчётом делителя
    const vwToPx = useCallback((vw) => {
        const divisor = getDynamicDivisor(screenWidth);
        return (window.innerWidth * vw) / divisor;
    }, [screenWidth]);

    const getSlideCenterPosition = useCallback((index, currentActiveIndex = activeIndex) => {
        let position = 0;
        for (let i = 0; i < index; i++) {
            const isPrevActive = i === currentActiveIndex;
            const width = isPrevActive ? FOCUS_WIDTH_VW : NO_FOCUS_WIDTH_VW;
            position += vwToPx(width) + vwToPx(GAP_VW);
        }
        const isCurrentActive = index === currentActiveIndex;
        const currentWidth = isCurrentActive ? FOCUS_WIDTH_VW : NO_FOCUS_WIDTH_VW;
        position += vwToPx(currentWidth) / 2;
        return position;
    }, [activeIndex, vwToPx]);

    const centerActiveSlide = useCallback((targetIndex = activeIndex) => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const containerCenter = containerWidth / 2;
        const slideCenter = getSlideCenterPosition(targetIndex);
        setOffset(containerCenter - slideCenter);
    }, [activeIndex, getSlideCenterPosition]);

    useEffect(() => {
        centerActiveSlide();
        const handleResize = () => centerActiveSlide();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [centerActiveSlide]);

    useEffect(() => {
        centerActiveSlide();
    }, [activeIndex, centerActiveSlide]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    };

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        const nextIndex = (activeIndex + 1) % slidesData.length;
        setIsAnimating(true);
        centerActiveSlide(nextIndex);
        setTimeout(() => {
            setActiveIndex(nextIndex);
            setIsAnimating(false);
        }, animationDuration);
    }, [activeIndex, isAnimating, animationDuration, centerActiveSlide]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        const prevIndex = (activeIndex - 1 + slidesData.length) % slidesData.length;
        setIsAnimating(true);
        centerActiveSlide(prevIndex);
        setTimeout(() => {
            setActiveIndex(prevIndex);
            setIsAnimating(false);
        }, animationDuration);
    }, [activeIndex, isAnimating, animationDuration, centerActiveSlide]);

    const isSlideActive = useCallback((index) => index === activeIndex, [activeIndex]);

    return {
        activeIndex,
        isAnimating,
        offset,
        isMobile,
        containerRef,
        mainRef,
        nextSlide,
        prevSlide,
        setActiveIndex,
        isSlideActive,
        handleTouchStart,
        handleTouchEnd,
        slidesData,
        animationDuration
    };
};