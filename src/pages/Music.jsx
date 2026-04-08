// src/pages/Music.jsx
import React from 'react';
import { FaPlay } from 'react-icons/fa';

const tracks = [
  { id: 1, title: 'NIGHT & DAY', desc: 'Debut Single', tracks: ['1. Night & Day', '2. Thacc', '3. Night & Day', '4. Evel & Day'] },
  { id: 2, title: 'ECHOES OF THE MOON', desc: 'Mini Album', tracks: ['1. These', '2. Echoes of The', '3. The Moon', '4. The Moon'] }
];

export default function Music({ isMinimal }) {
  if (isMinimal) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {tracks.map(track => (
          <div key={track.id} style={{ display: 'flex', gap: '2rem', padding: '2rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            {/* Fake Album Art */}
            <div style={{ width: '120px', height: '120px', backgroundColor: '#fff', border: '1px solid #000', flexShrink: 0, padding: '0.5rem' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#000', opacity: 0.05 }}></div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '1px' }}>{track.title}</h3>
              <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {track.tracks.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}>
                <FaPlay size={12} /> PLAY
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Full Page Version (Fallback)
  return <div>Full Page Music View (Not used in Classic Layout)</div>;
}
