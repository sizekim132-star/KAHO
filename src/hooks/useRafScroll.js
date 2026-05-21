import { useEffect, useRef } from 'react';

/** 스크롤/리사이즈 콜백을 requestAnimationFrame으로 묶어 호출 빈도를 줄임 */
export default function useRafScroll(callback, deps = []) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let rafId = 0;
    const run = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => callbackRef.current());
    };

    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', run);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
