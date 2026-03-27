// useScrollAnimation.js
import { useEffect, useRef } from 'react';

export function useScrollAnimation(deps = []) {
    const ref = useRef(null);
    const observerRef = useRef(null); // Храним observer между рендерами

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        
        // Если уже обработан — пропускаем
        if (el.classList.contains('visible')) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '50px' });

        // Сохраняем для cleanup
        observerRef.current = observer;

        // Проверяем текущую видимость
        const rect = el.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }

        return () => {
            // Отключаем только если элемент ещё не visible
            if (observerRef.current && !el.classList.contains('visible')) {
                observerRef.current.disconnect();
            }
        };
    }, deps);

    return ref;
}