import { useState, useEffect } from "react";

const useCardObserver = (refs, options) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { threshold = 0.5, scrollLock = false } = options || {};

  useEffect(() => {
    if (scrollLock) return;

    const elements = refs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [threshold, scrollLock]);

  return activeIndex;
};

export default useCardObserver;
