import { useEffect, useState } from "react";

/**
 * True when the viewport is phone-sized. Read synchronously on first render
 * (client-only SPA, no SSR) so the correct layout paints immediately with no
 * desktop→mobile flash, then kept in sync via matchMedia change events.
 *
 * Used ONLY to pick between the desktop page and the dedicated mobile page —
 * the desktop render path stays byte-for-byte identical.
 */
const MOBILE_QUERY = "(max-width: 768px)";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    // Sync once on mount in case the viewport changed between SSR-less init and effect.
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

export default useIsMobile;
