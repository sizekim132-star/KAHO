// src/sections/MusicSection.jsx
import React from 'react';
import PhotoBox from '../components/PhotoBox';
import { SC_URL } from '../data/constants';
import trackClock from '../assets/track_clock.png';

const TRACKS = [
  { title: '깊은 밤을 날아서', type: '까치와 고양이 커버', link: 'WYrJr97nXFA', isYT: true },
  { title: '크리스마스 캐롤 메들리', type: '카호 커버', link: 'DS2NMYKaeuo', isYT: true },
  { title: '시계 (Demo)', type: '고양이', link: SC_URL, isYT: false, img: trackClock },
];

export default function MusicSection() {
  return (
    <section id="music" className="section section-gray2">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal-text">
          <h2 className="title" style={{ marginBottom: '3rem' }}>Music</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {TRACKS.map((t, i) => (
            <div key={i} className="lift reveal-card"
              style={{
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                backgroundColor: '#fff',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-md)',
                transitionDelay: `${(i + 1) * 0.15}s`
              }}>
              {t.isYT ? (
                <div style={{ aspectRatio: '16/9', width: '100%' }}>
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${t.link}?rel=0`}
                    title={t.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              ) : (
                <div style={{ background: '#111625', padding: '24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PhotoBox src={t.img} w="100%" h="152px" label={t.title} fit="contain" />
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '.7rem', fontWeight: 800, color: 'var(--orange)', marginBottom: 6 }}>{t.type}</p>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 16 }}>{t.title}</h3>
                <a href={t.isYT ? `https://www.youtube.com/watch?v=${t.link}` : t.link} target="_blank" rel="noreferrer"
                  style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {t.isYT ? '▶ YouTube에서 보기' : '▶ SoundCloud에서 듣기'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
