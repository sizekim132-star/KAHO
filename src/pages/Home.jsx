// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import minhwaImg from '../assets/minhwa_tiger.png';

export default function Home() {
  const MINHWA_IMG_URL = minhwaImg;
  return (
    <main style={{ backgroundColor: 'transparent' }}>
      
      {/* 📌 1번 레퍼런스의 모던 벤토 그리드(Bento Grid) 레이아웃 + 민화 그림 삽입 */}
      <section style={{ backgroundColor: '#ffffff', padding: '10rem 5vw' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left: 퓨어 타이토그래피 블록 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--primary-orange)', fontWeight: 800, marginBottom: '2rem', letterSpacing: '6px' }}>WILD BUT ELEGANT</p>
              <h1 style={{ fontSize: 'clamp(5rem, 7vw, 9rem)', lineHeight: 1.05, marginBottom: '3rem', letterSpacing: '-0.05em', color: '#000', textTransform: 'uppercase' }}>
                MAGPIEN<br/>
                <span style={{ color: 'var(--primary-orange)' }}>TIGER.</span>
              </h1>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 500, maxWidth: '650px', lineHeight: 1.8 }}>
                옛말에 <span style={{fontWeight: 800}}>까치</span>가 지저귀면 반가운 손님이 온다고 했죠.<br/>
                맹수다운 <span style={{color: 'var(--primary-orange)', fontWeight: 800}}>호랑이</span>의 묵직한 그루브 위에 사뿐히 내려앉은 목소리.<br/>
                물리고 물리는 야생의 생태계를, 음악으로 날카롭게 도려냅니다.
              </p>
            </div>

            {/* Right: 민화 그래픽 블록 (모던 프레임) */}
            <div style={{ 
              height: '100%', minHeight: '600px',
              backgroundColor: '#f5f5f5', 
              border: '1px solid #000',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              {/* 이미지 로딩 실패 시 에러처리 우회 */}
              <img src={MINHWA_IMG_URL} alt="Modern Minhwa" style={{ width: '90%', height: '90%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                   onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1549480017-d76466a4b8e8?q=80&w=1000'; e.target.style.mixBlendMode = 'normal'; e.target.style.width='100%'; e.target.style.height='100%'; e.target.style.objectFit='cover'; }} />
              
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                TRADITIONAL X MODERN
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 📌 영상 투과 영역 (구멍): 시야를 좀 줄여서 다른 섹션 집중도 향상 */}
      <section style={{ height: '40vh', width: '100vw', backgroundColor: 'transparent', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid rgba(255,255,255,0.8)', padding: '2rem 4rem', color: '#fff', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '6px' }}>
            Now Playing
         </div>
      </section>

      {/* 📌 다시 이어지는 퓨어 화이트 갤러리 섹션 */}
      <section style={{ backgroundColor: '#ffffff', padding: '10rem 5vw', borderTop: '1px solid #000' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
            <div>
              <h2 style={{ fontSize: '4rem', color: '#000', letterSpacing: '-2px', textTransform: 'uppercase' }}>Hunting Moments</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1.2rem', marginTop: '1rem' }}>무대라는 사냥터에서 포착된 순간들</p>
            </div>
            
            <Link to="/sorter" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                Explore Archives
              </button>
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            {[1,2,3].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'crosshair' }}>
                <div style={{ height: '450px', backgroundColor: 'var(--placeholder-bg)', position: 'relative', border: '1px solid #e5e5e5', transition: 'all 0.3s ease' }}
                     onMouseEnter={e => {e.currentTarget.style.borderColor='#000'; e.currentTarget.style.backgroundColor='#000'; e.currentTarget.style.color='#fff'}}
                     onMouseLeave={e => {e.currentTarget.style.borderColor='#e5e5e5'; e.currentTarget.style.backgroundColor='var(--placeholder-bg)'; e.currentTarget.style.color='#000'}}>
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontSize: '1.2rem', fontWeight: 800 }}>RAW FILE {idx+1}</div>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#000', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem' }}>ARCHIVE #{idx + 1}</h3>
                  <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>2025. 11. {14 + idx}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
