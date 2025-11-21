import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - scrolls window to top on every route change.
 * This ensures that when a user clicks a nav link, the new page starts at the top.
 */
export default function ScrollToTop({ smooth = false }: { smooth?: boolean }) {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [pathname, smooth]);

  return null;
}
