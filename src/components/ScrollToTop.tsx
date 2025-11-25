import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    // Scroll to top on page load/reload
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Also handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

export default ScrollToTop;

