import { useState, useEffect, useCallback } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

interface UseLazyLoadingReturn {
  isVisible: boolean;
  isLoaded: boolean;
  ref: (node: HTMLElement | null) => void;
  load: () => void;
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}): UseLazyLoadingReturn => {
  const { threshold = 0.1, rootMargin = '50px', enabled = true } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const load = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!enabled || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Auto-load after a small delay to simulate loading
          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, threshold, rootMargin, enabled]);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  return {
    isVisible,
    isLoaded,
    ref,
    load,
  };
};

export default useLazyLoading; 