// src/sections/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { YT_BG_IDS, IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

export default function HeroSection({ videoOpacity, activeSection }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % YT_BG_IDS.length);
    }, 11000); // 11초 간격으로 전환

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

      {/* ── 유튜브 4-아이프레임 고급 안개식 페이드 캐러셀 ── */}
      <div className="vbg-container" style={{ opacity: videoOpacity, transition: 'opacity 0.5s ease-in-out' }}>
        {YT_BG_IDS.map((id, idx) => (
          <div
            key={id}
            className="vbg"
            style={{
              opacity: currentIdx === idx ? 1 : 0,
              zIndex: currentIdx === idx ? 1 : -1,
              transition: 'opacity 2.5s ease-in-out', // 2.5초 고급스러운 시네마틱 페이드 트랜지션
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1`}
              allow="autoplay; encrypted-media"
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
              title={`bg-video-${idx}`}
            />
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
