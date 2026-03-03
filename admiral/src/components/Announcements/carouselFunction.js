// carouselFunction.js
import { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';

export const slidesData = [
    {
        id: 1,
        title: "Новое отделение Царицыно",
        description: "Осенью 2025 года футбольная школа «АдмиралВМФ» открыла новое отделение на базе современного стадиона «Огонёк» в районе Царицыно. Это значимый шаг в развитии школы.",
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

const MOBILE_BREAKPOINT = 600;

export const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
};

// ─── Хелперы для расчёта размеров ────────────────────────────────────────────
// Точно воспроизводят CSS clamp() из Announcements.css.
// Используем математику, а НЕ offsetWidth — это устраняет баг,
// когда offsetWidth возвращает промежуточное значение во время
// CSS transition: width.

const clamp = (min, val, max) => Math.max(min, Math.min(val, max));

const getActiveWidth  = () => clamp(280, window.innerWidth * 0.54, 800);
const getInactiveWidth = () => clamp(160, window.innerWidth * 0.38, 560);
const getGap          = () => clamp(10,  window.innerWidth * 0.03, 48);

// Смещение трека, чтобы слайд extIndex оказался по центру контейнера.
// Все слайды до extIndex считаем неактивными (меньший размер),
// активный слайд — один, по центру.
const calcOffset = (extIndex, containerWidth) => {
    const aw  = getActiveWidth();
    const iw  = getInactiveWidth();
    const gap = getGap();
    // Левый край активного слайда = кол-во слайдов слева × (неактивная_ширина + gap)
    const leftEdge    = extIndex * (iw + gap);
    const slideCenter = leftEdge + aw / 2;
    return containerWidth / 2 - slideCenter;
};

// ─── Мобильная карусель ───────────────────────────────────────────────────────
// Простой translateX(-index * 100%) — никакой математики, никогда не сбивается.
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

// ─── Десктоп карусель — бесконечная прокрутка ─────────────────────────────────
//
// Техника клонирования:
//   extSlides = [clone_last, s0, s1, s2, s3, s4, clone_first]
//   индексы:     0            1   2   3   4   5   6
//
// Начинаем с extIndex = 1.
// nextSlide: extIndex++  →  если попали в 6 (clone_first), после анимации
//            снимаем transition и прыгаем в extIndex = 1 (s0).
// prevSlide: extIndex--  →  если попали в 0 (clone_last), после анимации
//            снимаем transition и прыгаем в extIndex = 5 (s4).
//
// Центрирование через calcOffset (математика, не DOM) →
//   offset всегда точный независимо от фазы CSS-анимации ширины.

export const useDesktopCarousel = (options = {}) => {
    const { animationDuration = 600 } = options;
    const n = slidesData.length;  // 5

    // Расширенный массив: [last_clone, ...all, first_clone]
    const extSlides = useMemo(() => [
        { ...slidesData[n - 1], _extKey: 'clone-last'  },
        ...slidesData.map((s) => ({ ...s, _extKey: `real-${s.id}` })),
        { ...slidesData[0],     _extKey: 'clone-first' }
    ], []);

    const [extIndex,    setExtIndex]    = useState(1);       // начинаем на первом реальном
    const [offset,      setOffset]      = useState(0);
    const [noTransition, setNoTransition] = useState(false); // для мгновенного прыжка

    const containerRef  = useRef(null);
    const touchStartX   = useRef(0);
    const animatingRef  = useRef(false);

    // Пересчитываем offset каждый раз когда меняется extIndex или ширина окна
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

    // После мгновенного прыжка (noTransition) включаем transition обратно
    // через двойной rAF — гарантируем, что браузер зафиксировал новую позицию
    useEffect(() => {
        if (!noTransition) return;
        let id1, id2;
        id1 = requestAnimationFrame(() => {
            id2 = requestAnimationFrame(() => setNoTransition(false));
        });
        return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); };
    }, [noTransition]);

    // Вызывается по окончании CSS-анимации transform трека
    const handleTransitionEnd = useCallback(() => {
        if (extIndex === 0) {
            // Были на clone_last → прыгаем на настоящий last
            setNoTransition(true);
            setExtIndex(n);
        } else if (extIndex === n + 1) {
            // Были на clone_first → прыгаем на настоящий first
            setNoTransition(true);
            setExtIndex(1);
        }
        animatingRef.current = false;
    }, [extIndex, n]);

    const go = useCallback((nextExt) => {
        if (animatingRef.current) return;
        animatingRef.current = true;
        setExtIndex(nextExt);
        // Fallback: если onTransitionEnd не сработал (например resize во время анимации)
        setTimeout(() => { animatingRef.current = false; }, animationDuration + 50);
    }, [animationDuration]);

    const nextSlide = useCallback(() => go(extIndex + 1), [extIndex, go]);
    const prevSlide = useCallback(() => go(extIndex - 1), [extIndex, go]);

    const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
    const handleTouchEnd   = useCallback((e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    }, [nextSlide, prevSlide]);

    // Настоящий индекс (0-based) активного слайда для внешнего использования
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