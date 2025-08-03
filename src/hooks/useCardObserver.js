import { useState, useEffect } from "react";

const useCardObserver = (mainRefs, subRefs, options) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeSubIndex, setActiveSubIndex] = useState(null);
  const [visibleSubcards, setVisibleSubcards] = useState([]);

  const { threshold = 0.3, scrollLock = false } = options || {};

  useEffect(() => {
    if (scrollLock) return;

    const allRefs = [
      ...mainRefs.current.map((el, index) => ({
        el,
        type: "card",
        index,
      })),
      ...subRefs.current.map(({ el, cardIndex, subIndex }) => ({
        el,
        type: "subcard",
        cardIndex,
        subIndex,
      })),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let fallbackCard = null;
        const newVisibleSubcards = [];

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const meta = allRefs.find((r) => r.el === entry.target);
          if (!meta) return;

          if (meta.type === "subcard") {
            newVisibleSubcards.push({
              card: meta.cardIndex,
              sub: meta.subIndex,
            });
          }

          if (meta.type === "card" && entry.intersectionRatio > maxRatio) {
            fallbackCard = { card: meta.index };
            maxRatio = entry.intersectionRatio;
          }
        });

        if (newVisibleSubcards.length > 0) {
          const topVisibleSub = newVisibleSubcards[0];
          setActiveCardIndex(topVisibleSub.card);
          setActiveSubIndex(topVisibleSub.sub);
        } else if (fallbackCard) {
          setActiveCardIndex(fallbackCard.card);
          setActiveSubIndex(null);
        }

        setVisibleSubcards(newVisibleSubcards);
      },
      {
        threshold,
        rootMargin: "-20% 0px -30% 0px",
      }
    );

    allRefs.forEach(({ el }) => {
      if (el) observer.observe(el);
    });

    return () => {
      allRefs.forEach(({ el }) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [mainRefs, subRefs, threshold, scrollLock]);

  return {
    activeCardIndex,
    activeSubIndex,
    visibleSubcards,
    setActiveCardIndex,
    setActiveSubIndex,
  };
};

export default useCardObserver;
