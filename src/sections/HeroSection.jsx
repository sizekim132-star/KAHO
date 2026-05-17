// src/sections/HeroSection.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { YT_BG_IDS, IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

export default function HeroSection({ activeSlot, slotIndices, videoOpacity, activeSection }) {
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

      <div className="vbg-container" style={{ opacity: videoOpacity, transition: 'opacity 0.05s linear' }}>
        <div className="vbg" style={{ opacity: activeSlot === 0 ? 1 : 0, zIndex: activeSlot === 0 ? 1 : 0 }}>
          <iframe
            key={`vbg-s0-${YT_BG_IDS[slotIndices[0]]}`}
            src={`https://www.youtube.com/embed/${YT_BG_IDS[slotIndices[0]]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_BG_IDS[slotIndices[0]]}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            style={{ border: 'none' }}
            title="bg-video-slot-0"
          />
        </div>
        <div className="vbg" style={{ opacity: activeSlot === 1 ? 1 : 0, zIndex: activeSlot === 1 ? 1 : 0 }}>
          <iframe
            key={`vbg-s1-${YT_BG_IDS[slotIndices[1]]}`}
            src={`https://www.youtube.com/embed/${YT_BG_IDS[slotIndices[1]]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_BG_IDS[slotIndices[1]]}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            style={{ border: 'none' }}
            title="bg-video-slot-1"
          />
        </div>
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
          <div className="hero-actions reveal-text" style={{ transitionDelay: '0.15s' }}>
            <a href="#music" className="hero-btn hero-btn-outline">Music</a>
            <a href="#about" className="hero-btn hero-btn-outline">About Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
