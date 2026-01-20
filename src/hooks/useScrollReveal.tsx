import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible, hasRevealed };
};

// Hook for sequential reveal (waits for previous element)
export const useSequentialReveal = (
  isParentVisible: boolean,
  delay: number = 0
) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isParentVisible && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isParentVisible, delay, isRevealed]);

  return isRevealed;
};
