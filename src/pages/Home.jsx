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
  const [activeSlot, setActiveSlot] = useState(0);
  const [slotIndices, setSlotIndices] = useState([0, 1]);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState('home');

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // 11초마다 슬롯을 교환
    intervalRef.current = setInterval(() => {
      setActiveSlot((prev) => {
        const next = prev === 0 ? 1 : 0;
        timeoutRef.current = setTimeout(() => {
          setSlotIndices((prevIndices) => {
            const nextIndices = [...prevIndices];
            const currentGlobalIdx = prevIndices[next];
            nextIndices[prev] = (currentGlobalIdx + 1) % YT_BG_IDS.length;
            return nextIndices;
          });
        }, 3500);
        return next;
      });
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ paddingTop: 60 }}>
      <HeroSection
        activeSlot={activeSlot}
        slotIndices={slotIndices}
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
