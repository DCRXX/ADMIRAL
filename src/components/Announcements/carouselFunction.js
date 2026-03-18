import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';

import img2  from './public/image/img2.png';
import img10 from './public/image/img10.jpg';
import img11 from './public/image/img11.jpg';
import img12 from './public/image/img12.jpg';

const imagesById = {
    1: img2,
    2: img12,
    3: img10,
    4: img11,
};

export const slidesData = [
    {
        id: 1,
        title: "Новое отделение Царицыно",
        description: "Осенью 2025 года футбольная школа «Адмирал-ВМФ» открыла новое отделение на базе современного стадиона «Огонёк» в районе Царицыно. Это значимый шаг в развитии школы.",
        image: imagesById[1],
    },
    {
        id: 2,
        title: "Присоединиться к нам можно в любое время",
        description: "Двери нашей школы открыты для ребят всех возрастов 365 дней в году! Мы ждем футболистов и футболисток от 3-х лет! Почему мы?\n- квалифицированный тренерский штаб\n- удобные локации\n- регулярная соревновательная деятельность\n- комфортная среда для развития способностей",
        image: imagesById[2],
        showButton: true,
    },
    {
        id: 3,
        title: "Команда 2014 — победитель плей-офф MCL!",
        description: "Наши ребята выиграли серебряный плей-офф чемпионата MCL сезона зима 2025–2026. Спасибо ребятам за самоотдачу, а родителям за поддержку! Двигаемся дальше!",
        image: imagesById[3],
    },
    {
        id: 4,
        title: "Ребята с характером",
        description: "Минувшие выходные выдались жаркими: турнир, борьба, голы и 3 место в копилку «Адмирала»!",
        image: imagesById[4],
    },
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
const getActiveWidth   = () => clamp(280, window.innerWidth * 0.54, 8000);
const getInactiveWidth = () => clamp(160, window.innerWidth * 0.38, 5060);
const getGap           = () => clamp(10,  window.innerWidth * 0.03, 100);

const calcOffset = (activeIdx, containerWidth) => {
    const aw  = getActiveWidth();
    const iw  = getInactiveWidth();
    const gap = getGap();
    let totalBefore = 0;
    for (let i = 0; i < activeIdx; i++) totalBefore += iw + gap;
    return containerWidth / 2 - (totalBefore + aw / 2);
};

export const useMobileCarousel = (options = {}) => {
    const { animationDuration = 400 } = options;
    const [activeIndex, setActiveIndex] = useState(0);
    const animatingRef = useRef(false);
    const touchStartX  = useRef(0);

    const go = useCallback((next) => {
        if (animatingRef.current) return;
        animatingRef.current = true;
        setActiveIndex(next);
        setTimeout(() => { animatingRef.current = false; }, animationDuration);
    }, [animationDuration]);

    const nextSlide = useCallback(
        () => go((activeIndex + 1) % slidesData.length),
        [activeIndex, go],
    );
    const prevSlide = useCallback(
        () => go((activeIndex - 1 + slidesData.length) % slidesData.length),
        [activeIndex, go],
    );

    const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
    const handleTouchEnd   = useCallback((e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    }, [nextSlide, prevSlide]);

    return { activeIndex, nextSlide, prevSlide, handleTouchStart, handleTouchEnd, animationDuration };
};


const REPEAT = 21;
const SLIDES_COUNT = slidesData.length;
const START_INDEX  = Math.floor(REPEAT / 2) * SLIDES_COUNT;

export const useDesktopCarousel = (options = {}) => {
    const { animationDuration = 800 } = options;

    const extSlides = useMemo(() =>
        Array.from({ length: SLIDES_COUNT * REPEAT }, (_, i) => ({
            ...slidesData[i % SLIDES_COUNT],
            _extKey: `v-${i}`,
        }))
    , []);

    const [extIndex, setExtIndex] = useState(START_INDEX);
    const [offset,   setOffset]   = useState(0);

    const containerRef = useRef(null);
    const touchStartX  = useRef(0);
    const animatingRef = useRef(false);

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

    const handleTransitionEnd = useCallback(() => {
        animatingRef.current = false;
    }, []);

    const go = useCallback((next) => {
        if (animatingRef.current) return;
        animatingRef.current = true;
        setExtIndex(next);
    }, []);

    const nextSlide = useCallback(() => go(extIndex + 1), [extIndex, go]);
    const prevSlide = useCallback(() => go(extIndex - 1), [extIndex, go]);

    const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
    const handleTouchEnd   = useCallback((e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    }, [nextSlide, prevSlide]);

    const isSlideActive = useCallback((i) => i === extIndex, [extIndex]);

    return {
        extSlides,
        extIndex,
        offset,
        containerRef,
        nextSlide,
        prevSlide,
        isSlideActive,
        handleTouchStart,
        handleTouchEnd,
        handleTransitionEnd,
        animationDuration,
    };
};