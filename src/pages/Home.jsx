// src/pages/Home.jsx
import React from 'react';
import minhwaImg from '../assets/minhwa_lineart.png';
import Music from './Music';
import History from './History';
import Members from './Members';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#ffffff' }}>

      {/* ── HERO: 레퍼런스 1번 그대로 (이미지 좌 / 텍스트 우) ── */}
      <section style={{
        padding: '6rem var(--spacing-main) 4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6rem',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: '80vh',
      }}>
        {/* Left: Line Art */}
        <div style={{ flex: 1.1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={minhwaImg}
            alt="Magpie and Tiger"
            style={{ width: '100%', maxWidth: '620px', height: 'auto', mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Right: Typography */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.9rem', color: '#FF5500', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Magpie & Tiger | Debut Album
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 5.5vw, 6.5rem)',
            lineHeight: 1.0,
            fontWeight: 900,
            color: '#0F172A',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            WHERE THE<br />WILDS SING.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '3rem', fontWeight: 500 }}>
            'NIGHT & DAY' out now.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" className="btn btn-primary">
              LISTEN TO THE ALBUM
            </a>
            <a href="https://www.youtube.com/@magpientiger" target="_blank" rel="noreferrer" className="btn btn-outline">
              WATCH VIDEO
            </a>
          </div>
        </div>
      </section>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0' }}></div>

      {/* ── LATEST MUSIC + UPCOMING TOUR (2단 레이아웃) ── */}
      <section id="music" style={{ padding: '6rem var(--spacing-main)', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
          {/* Left: Music */}
          <div>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: '#0F172A', marginBottom: '2.5rem' }}>
              LATEST MUSIC
            </h2>
            <Music isMinimal={true} />
          </div>
          {/* Right: Tour */}
          <div id="tour">
            <h2 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: '#0F172A', marginBottom: '2.5rem' }}>
              UPCOMING TOUR
            </h2>
            <History isMinimal={true} />
          </div>
        </div>
      </section>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0' }}></div>

      {/* ── MEMBERS ── */}
      <section id="store" style={{ padding: '6rem var(--spacing-main)', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: '#0F172A', marginBottom: '2.5rem' }}>
          BAND MEMBERS
        </h2>
        <Members isMinimal={true} />
      </section>

    </main>
  );
}
