// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { YT_BG_IDS } from '../data/constants';

/* ─── SECTIONS ─── */
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import MusicSection from '../sections/MusicSection';
import MembersSection from '../sections/MembersSection';
import ShowsSection from '../sections/ShowsSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

/* ─── PAGE ─── */
export default function Home() {
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState('home');

  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    // 11초마다 백그라운드 영상 인덱스만 스왑 (아이프레임을 새로 로드하지 않고 CSS 투명도만 부드럽게 페이드 교체)
    intervalRef.current = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % YT_BG_IDS.length);
    }, 11000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const fadeEnd = heroHeight * 0.7;
      const raw = 1 - scrollY / fadeEnd;
      setVideoOpacity(Math.max(0, Math.min(1, raw)));

      const sections = ['home', 'about', 'music', 'members', 'shows', 'contact'];
      for (const section of sections) {
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

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ paddingTop: 60 }}>
      <HeroSection
        currentVideoIdx={currentVideoIdx}
        videoOpacity={videoOpacity}
        activeSection={activeSection}
      />
      <AboutSection />
      <MusicSection />
      <MembersSection />
      <ShowsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
