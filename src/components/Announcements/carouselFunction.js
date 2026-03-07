import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';

import img2 from './public/image/img2.png';
import img3 from './public/image/img3.png';
import img4 from './public/image/img4.png';
import img5 from './public/image/img5.png';
import img7 from './public/image/img7.png';


const imagesById = {
    1: img2,
    2: img4,
    3: img3,
    4: img7,
    5: img5
};

export const slidesData = [
    {
        id: 1,
        title: "Новое отделение Царицыно",
        description: "Осенью 2025 года футбольная школа «Адмирал-ВМФ» открыла новое отделение на базе современного стадиона «Огонёк» в районе Царицыно. Это значимый шаг в развитии школы.",
        image: imagesById[1] 
    },
    {
        id: 2,
        title: "Зимние сборы 2026",
        description: "Присоединяйтесь к нашим интенсивным тренировкам в закрытых манежах этой зимой.",
        image: imagesById[2]
    },
    {
        id: 3,
        title: "Турнир в Сокольниках",
        description: "Наши команды заняли призовые места в ежегодном кубке Московской Федерации футбола.",
        image: imagesById[3]
    },
    {
        id: 4,
        title: "Турнир в Сокольниках",
        description: "Наши команды заняли призовые места в ежегодном кубке Московской Федерации футбола.",
        image: imagesById[4]
    },
    {
        id: 5,
        title: "Турнир в Сокольниках",
        description: "Наши команды заняли призовые места в ежегодном кубке Московской Федерации футбола.",
        image: imagesById[5]
    }
];

const MOBILE_BREAKPOINT = 750;

export const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
};


const clamp = (min, val, max) => Math.max(min, Math.min(val, max));

const getActiveWidth  = () => clamp(280, window.innerWidth * 0.58, 8000);
const getInactiveWidth = () => clamp(160, window.innerWidth * 0.38, 5060);
const getGap          = () => clamp(10,  window.innerWidth * 0.03, 48);


const calcOffset = (extIndex, containerWidth) => {
    const aw  = getActiveWidth();
    const iw  = getInactiveWidth();
    const gap = getGap();
    const leftEdge    = extIndex * (iw + gap);
    const slideCenter = leftEdge + aw / 2;
    return containerWidth / 2 - slideCenter;
};

export const useMobileCarousel = (options = {}) => {
    const { animationDuration = 400 } = options;
    const [activeIndex, setActiveIndex] = useState(0);
    const animatingRef  = useRef(false);
    const touchStartX   = useRef(0);

    const go = useCallback((next) => {
        if (animatingRef.current) return;
        animatingRef.current = true;
        setActiveIndex(next);
        setTimeout(() => { animatingRef.current = false; }, animationDuration);
    }, [animationDuration]);

    const nextSlide = useCallback(() => go((activeIndex + 1) % slidesData.length), [activeIndex, go]);
    const prevSlide = useCallback(() => go((activeIndex - 1 + slidesData.length) % slidesData.length), [activeIndex, go]);

    const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
    const handleTouchEnd   = useCallback((e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    }, [nextSlide, prevSlide]);

    return { activeIndex, nextSlide, prevSlide, handleTouchStart, handleTouchEnd, animationDuration };
};



export const useDesktopCarousel = (options = {}) => {
    const { animationDuration = 600 } = options;
    const n = slidesData.length;


    const extSlides = useMemo(() => [
        { ...slidesData[n - 1], _extKey: 'clone-last'  },
        ...slidesData.map((s) => ({ ...s, _extKey: `real-${s.id}` })),
        { ...slidesData[0],     _extKey: 'clone-first' }
    ], []);

    const [extIndex,    setExtIndex]    = useState(1);      
    const [offset,      setOffset]      = useState(0);
    const [noTransition, setNoTransition] = useState(false); 

    const containerRef  = useRef(null);
    const touchStartX   = useRef(0);
    const animatingRef  = useRef(false);


    const recomputeOffset = useCallback((idx) => {
        if (!containerRef.current) return;
        setOffset(calcOffset(idx, containerRef.current.offsetWidth));
    }, []);

    useLayoutEffect(() => { recomputeOffset(extIndex); }, [extIndex, recomputeOffset]);

    useEffect(() => {
        const onResize = () => recomputeOffset(extIndex);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [extIndex, recomputeOffset]);


    useEffect(() => {
        if (!noTransition) return;
        let id1, id2;
        id1 = requestAnimationFrame(() => {
            id2 = requestAnimationFrame(() => setNoTransition(false));
        });
        return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); };
    }, [noTransition]);


    const handleTransitionEnd = useCallback(() => {
        if (extIndex === 0) {
            setNoTransition(true);
            setExtIndex(n);
        } else if (extIndex === n + 1) {
            setNoTransition(true);
            setExtIndex(1);
        }
        animatingRef.current = false;
    }, [extIndex, n]);

    const go = useCallback((nextExt) => {
        if (animatingRef.current) return;
        animatingRef.current = true;
        setExtIndex(nextExt);
        setTimeout(() => { animatingRef.current = false; }, animationDuration + 50);
    }, [animationDuration]);

    const nextSlide = useCallback(() => go(extIndex + 1), [extIndex, go]);
    const prevSlide = useCallback(() => go(extIndex - 1), [extIndex, go]);

    const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
    const handleTouchEnd   = useCallback((e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    }, [nextSlide, prevSlide]);

    const realActiveIndex = ((extIndex - 1) % n + n) % n;

    const isSlideActive = useCallback((extI) => extI === extIndex, [extIndex]);

    return {
        extSlides, extIndex, realActiveIndex,
        offset, noTransition,
        containerRef,
        nextSlide, prevSlide,
        isSlideActive,
        handleTouchStart, handleTouchEnd,
        handleTransitionEnd,
        animationDuration
    };
};