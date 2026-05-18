// src/hooks/useRevealObserver.js
// IntersectionObserver를 사용한 스크롤 리빌 애니메이션 관리
import { useEffect } from 'react';

export default function useRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-card, .reveal-text').forEach((el, i) => {
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${(i % 5) * 0.1}s`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
