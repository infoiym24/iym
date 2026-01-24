import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

export const useSequentialReveal = (
  text: string,
  isVisible: boolean,
  delayPerChar: number = 30,
  startDelay: number = 0
) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTimeout = setTimeout(() => {
      let currentChar = 0;
      const interval = setInterval(() => {
        currentChar++;
        setVisibleChars(currentChar);
        if (currentChar >= text.length) {
          clearInterval(interval);
        }
      }, delayPerChar);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [isVisible, text.length, delayPerChar, startDelay]);

  return visibleChars;
};