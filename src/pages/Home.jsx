// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Music from './Music';
import History from './History';
import minhwaImg from '../assets/minhwa_tiger.png';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'transparent', width: '100%' }}>
      
      {/* 📌 Hero Section: 1번 레퍼런스 스타일 (이미지 좌 / 타이포 우) */}
      <section style={{ 
        backgroundColor: '#ffffff', 
        padding: '8rem var(--spacing-main)', 
        borderBottom: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '80vh',
        gap: '6rem'
      }}>
        {/* Left: Illustration */}
        <div style={{ flex: 1.2, display: 'flex', justifyContent: 'center' }}>
          <img src={minhwaImg} alt="Magpientiger Classic" style={{ width: '100%', maxWidth: '700px', height: 'auto', mixBlendMode: 'multiply' }} />
        </div>

        {/* Right: Typography */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary-orange)', fontWeight: 800, marginBottom: '2rem', letterSpacing: '4px' }}>EST. 2025</p>
          <h1 className="serif-title" style={{ fontSize: 'clamp(4rem, 6vw, 7rem)', lineHeight: 1, marginBottom: '2.5rem', color: '#000' }}>
            WHERE THE<br/>WILDS SING.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', maxWidth: '450px', marginBottom: '3.5rem', lineHeight: 1.6, fontWeight: 500 }}>
            Magpientiger | Debut Album<br/>
            'NIGHT & DAY' out now.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button className="btn btn-primary">Listen to the Album</button>
            <button className="btn">Watch Video</button>
          </div>
        </div>
      </section>

      {/* 📌 Combined Section: Latest Music & Upcoming Tour (2단 분할) */}
      <section style={{ backgroundColor: '#ffffff', padding: '8rem var(--spacing-main)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.5fr)', gap: '8rem' }}>
          
          {/* Left: Latest Music */}
          <div>
            <h2 className="serif-title" style={{ fontSize: '2.2rem', marginBottom: '4rem', textTransform: 'uppercase', fontStyle: 'normal' }}>Latest Music</h2>
            <Music isMinimal={true} />
          </div>

          {/* Right: Upcoming Tour */}
          <div>
             <h2 className="serif-title" style={{ fontSize: '2.2rem', marginBottom: '4rem', textTransform: 'uppercase', fontStyle: 'normal' }}>Upcoming Tour</h2>
             <History isMinimal={true} />
          </div>

        </div>
      </section>

      {/* 📌 Archive Section (기존 갤러리 유지하되 클래식 톤으로) */}
      <section style={{ backgroundColor: '#ffffff', padding: '8rem var(--spacing-main)', borderTop: '1px solid #000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
            <div>
              <h2 className="serif-title" style={{ fontSize: '3rem', color: '#000', fontStyle: 'normal', textTransform: 'uppercase' }}>Hunting Moments</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1.1rem', marginTop: '1rem' }}>무대라는 사냥터에서 포착된 순간들</p>
            </div>
            <Link to="/sorter" style={{ textDecoration: 'none' }}>
              <button className="btn">Explore Archives</button>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            {[1,2,3].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ height: '450px', backgroundColor: '#f5f5f5', border: '1px solid #000', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontSize: '1rem', fontWeight: 800 }}>RAW_FILE_00{idx+1}</div>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase' }}>Archive #{idx + 1}</h3>
              </div>
            ))}
          </div>
      </section>
    </main>
  );
}
