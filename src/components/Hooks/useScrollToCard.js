import { useState, useCallback } from "react";

const useScrollToCard = (titleRefs, headerHeight = 170) => {
  const [scrollLock, setScrollLock] = useState(false);

  const scrollToCard = useCallback(
    (index) => {
      const targetEl = titleRefs.current[index];
      if (!targetEl) return;

      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY;
      const scrollTo = offsetTop - headerHeight;

      // Blur active field to prevent scroll interference
      if (document.activeElement?.blur) {
        document.activeElement.blur();
      }

      setTimeout(() => {
        setScrollLock(true);
        window.scrollTo({ top: scrollTo, behavior: "smooth" });

        setTimeout(() => {
          setScrollLock(false);
        }, 600); // Should match animation duration
      }, 10); // Small delay to allow blur
    },
    [titleRefs, headerHeight]
  );

  return { scrollToCard, scrollLock };
};

export default useScrollToCard;
