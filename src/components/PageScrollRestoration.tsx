import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const scrollPositions = new Map<string, number>();

const getPageScrollKey = (location: ReturnType<typeof useLocation>) => {
  return location.pathname;
};

const PageScrollRestoration: React.FC = () => {
  const location = useLocation();
  const pageScrollKey = getPageScrollKey(location);
  const currentPageScrollKeyRef = useRef(pageScrollKey);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const storeScrollPosition = () => {
      scrollPositions.set(currentPageScrollKeyRef.current, window.scrollY);
    };

    storeScrollPosition();
    window.addEventListener("scroll", storeScrollPosition, { passive: true });
    window.addEventListener("pagehide", storeScrollPosition);

    return () => {
      storeScrollPosition();
      window.removeEventListener("scroll", storeScrollPosition);
      window.removeEventListener("pagehide", storeScrollPosition);
    };
  }, []);

  useLayoutEffect(() => {
    currentPageScrollKeyRef.current = pageScrollKey;
    if (location.hash) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPositions.get(pageScrollKey) ?? 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, pageScrollKey]);

  return null;
};

export default PageScrollRestoration;
