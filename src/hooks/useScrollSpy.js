// src/hooks/useScrollSpy.js
// 스크롤 위치 기반 활성 섹션 감지 + 비디오 투명도 계산
import { useState, useEffect } from 'react';

const SECTIONS = ['home', 'about', 'music', 'members', 'shows', 'recruit', 'contact'];

export default function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('home');
  const [videoOpacity, setVideoOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const fadeEnd = heroHeight * 0.7;
      const raw = 1 - scrollY / fadeEnd;
      setVideoOpacity(Math.max(0, Math.min(1, raw)));

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, videoOpacity };
}
