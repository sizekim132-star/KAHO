// src/sections/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

const HERO_VIDEOS = [
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/eyes.mp4',
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/madlein.mp4',
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/night.mkv',
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/when.mp4'
];

export default function HeroSection({ videoOpacity, activeSection }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 5000); // 5초 간격으로 전환

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── Mobile Thumb Zone ── */}
      <div className="mobile-thumb-zone">
        {[
          { id: 'music', label: 'Music' },
          { id: 'members', label: 'Members' },
          { id: 'shows', label: 'History' },
          { id: 'contact', label: 'Contact' }
        ].map(item => (
          <a key={item.id} href={`#${item.id}`}
            className={`thumb-btn ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}>
            {item.label}
          </a>
        ))}
      </div>

      {/* ── 5초 프리미엄 안개식 페이드 순환 비디오 슬라이더 ── */}
      <div className="vbg-container" style={{ opacity: videoOpacity, transition: 'opacity 0.5s ease-in-out' }}>
        {HERO_VIDEOS.map((src, idx) => (
          <div
            key={idx}
            className="vbg"
            style={{
              opacity: currentIdx === idx ? 1 : 0,
              zIndex: currentIdx === idx ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out', // 1.5초 고급스러운 시네마틱 페이드 트랜지션
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source src={src} type={src.endsWith('.mkv') ? 'video/x-matroska' : 'video/mp4'} />
            </video>
          </div>
        ))}
      </div>
      <div className="film" style={{ background: 'rgba(26, 39, 68, 0.35)' }} />

      {/* ════ HERO ════ */}
      <section id="home" className="hero-fullscreen">
        {/* 하단 중앙: 소셜 아이콘 + 버튼 */}
        <div className="hero-bottom-content">
          <div className="hero-socials reveal-text">
            <a href={YT_CHANNEL} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={28} /></a>
            <span className="hero-dot" />
            <a href={IG_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={28} /></a>
            <span className="hero-dot" />
            <a href={SC_URL} target="_blank" rel="noreferrer" aria-label="SoundCloud"><FaSoundcloud size={30} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
