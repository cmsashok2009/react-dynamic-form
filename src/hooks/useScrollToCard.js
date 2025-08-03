// useScrollToCard.ts
import { useState, useCallback } from "react";
import { useScrollContext } from "../context/ScrollContext";

const useScrollToCard = (titleRefs, headerHeight = 170) => {
  const [scrollLock, setScrollLock] = useState(false);
  const { setIsProgrammaticScroll } = useScrollContext();

  const scrollToCard = useCallback(
    (index) => {
      const targetEl = titleRefs.current[index];
      if (!targetEl) return;

      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY;
      const scrollTo = offsetTop - headerHeight;

      // Blur current input before scroll
      if (document.activeElement?.blur) {
        document.activeElement.blur();
      }

      // Mark scroll as programmatic
      setIsProgrammaticScroll(true);
      setScrollLock(true);

      setTimeout(() => {
        window.scrollTo({ top: scrollTo, behavior: "smooth" });

        // Reset flags after scroll completes
        setTimeout(() => {
          setScrollLock(false);
          setIsProgrammaticScroll(false);
        }, 600); // Match scroll animation
      }, 10);
    },
    [titleRefs, headerHeight, setIsProgrammaticScroll]
  );

  return { scrollToCard, scrollLock };
};

export default useScrollToCard;
