// src/pages/Music.jsx
import React from 'react';
import { FaPlay } from 'react-icons/fa';

const tracks = [
  {
    id: 1,
    title: 'NIGHT & DAY',
    desc: '1st Single',
    tracks: ['1. Night & Day', '2. Thacc', '3. Night & Day (Inst.)', '4. Evel & Day'],
    link: 'https://soundcloud.com/size_kim',
  },
  {
    id: 2,
    title: 'ECHOES OF THE MOON',
    desc: 'Mini Album',
    tracks: ['1. These', '2. Echoes of The', '3. The Moon', '4. The Moon (Reprise)'],
    link: 'https://soundcloud.com/size_kim',
  },
];

export default function Music({ isMinimal }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {tracks.map(track => (
        <a key={track.id} href={track.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            gap: '1.8rem',
            padding: '1.8rem',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#0F172A'; e.currentTarget.style.backgroundColor = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}>

            {/* Album Art placeholder */}
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#0F172A',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#ffffff', fontSize: '0.5rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center', padding: '0.5rem' }}>
                {track.title}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', letterSpacing: '1px', marginBottom: '0.2rem' }}>{track.title}</p>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{track.desc}</p>
                </div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.8rem' }}>
                {track.tracks.map((t, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: i === 2 ? 800 : 400 }}>{t}</li>
                ))}
              </ul>
              <button style={{
                marginTop: '1rem',
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: '#0F172A',
                letterSpacing: '1px',
                padding: 0,
              }}>
                <FaPlay size={10} /> PLAY
              </button>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
