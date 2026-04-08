// src/backups/pure_minimal/pages/Music.jsx
import React from 'react';
import { FaSoundcloud, FaYoutube } from 'react-icons/fa';

const tracks = [
  { 
    title: '까치와호랑이 (Demo Ver.)', type: '자작곡',
    desc: '우리가 누구인지 보여주는 가장 직관적이고 강력한 첫 번째 테마 송입니다. 날카로운 일렉과 묵직한 베이스의 조화.', platform: 'soundcloud', link: 'https://soundcloud.com/size_kim' 
  },
  { 
    title: '야성의 기원', type: '미발매',
    desc: '세상 밖으로 뛰쳐나가는 동물들을 표현한 강렬한 비트의 곡. 곧 팬분들께 영상으로 찾아갑니다.', platform: 'youtube', link: 'https://www.youtube.com/@magpientiger' 
  },
  { 
    title: '한밤의 동물원', type: '자작곡',
    desc: '서울의 밤거리를 누비는 몽환적인 건반 리프와 매력적인 까치&고양이의 보컬 파트.', platform: 'soundcloud', link: 'https://soundcloud.com/size_kim' 
  }
];

export default function Music() {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <div style={{ height: '30vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '10px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>Discography</h2>
      </div>
      <div style={{ backgroundColor: '#ffffff', padding: '10rem 5vw', borderTop: '1px solid #000' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>Music<span style={{color: 'var(--primary-orange)'}}>.</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '6rem', fontWeight: 500 }}>
            까치와 호랑이가 만들어내는 독창적인 세계관의 선율들을 감상해 보세요.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            {tracks.map((track, idx) => (
              <div key={idx} style={{
                padding: '4rem 3rem',
                border: '1px solid #e5e5e5',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.border = '1px solid #000'; e.currentTarget.style.boxShadow = '10px 10px 0px rgba(0,0,0,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.border = '1px solid #e5e5e5'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span style={{ border: '1px solid #000', color: '#000', padding: '0.4rem 1.2rem', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {track.type}
                  </span>
                  {track.platform === 'soundcloud' ? <FaSoundcloud size={36} color="#000" style={{ opacity: 0.1 }} /> : <FaYoutube size={36} color="#000" style={{ opacity: 0.1 }} />}
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000', marginBottom: '1rem', letterSpacing: '-1px' }}>{track.title}</h2>
                <p style={{ color: 'var(--text-main)', opacity: 0.8, flexGrow: 1, marginBottom: '4rem', lineHeight: '1.8', fontSize: '1.1rem', fontWeight: 500 }}>{track.desc}</p>
                <a href={track.link} target="_blank" rel="noreferrer" style={{ 
                  textDecoration: 'none', textAlign: 'center',
                  border: '1px solid #000', color: '#000',
                  padding: '1.2rem', fontWeight: 800, fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', textTransform: 'uppercase'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = track.platform === 'soundcloud' ? '#ff7700' : '#ff0000';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.borderColor = '#000';
                }}>
                  {track.platform === 'soundcloud' ? <><FaSoundcloud size={24}/> Listen on SC</> : <><FaYoutube size={24}/> Watch on YT</>}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
