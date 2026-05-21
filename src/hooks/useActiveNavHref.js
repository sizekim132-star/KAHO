import { useState, useEffect, useCallback } from 'react';
import useRafScroll from './useRafScroll';

const VIEWPORT_ANCHOR = 0.4;

export default function useActiveNavHref(links) {
  const [activeHref, setActiveHref] = useState('#home');

  const updateActive = useCallback(() => {
    const anchorY = window.innerHeight * VIEWPORT_ANCHOR;
    let bestHref = '#home';
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const { href } of links) {
      const el = document.getElementById(href.slice(1));
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
      const distance = Math.abs(rect.top - anchorY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestHref = href;
      }
    }
    setActiveHref(bestHref);
  }, [links]);

  useRafScroll(updateActive, [updateActive]);

  useEffect(() => {
    window.addEventListener('hashchange', updateActive);
    return () => window.removeEventListener('hashchange', updateActive);
  }, [updateActive]);

  return activeHref;
}
