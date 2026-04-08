// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import './index.css';

import Home from './pages/Home';
import Members from './pages/Members';
import Music from './pages/Music';
import History from './pages/History';
import PhotoSorterTool from './pages/PhotoSorterTool';

// Pexels 대신 통신 에러가 단 한 번도 나지 않는 유튜브를 사용합니다!
// Lofi 밴드음악 스트리밍(항상 라이브중) 또는 분위기있는 공연 영상을 iframe으로 겁니다.
const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk"; 

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/sorter') return null;

  return (
    <nav style={{ 
      padding: '1.5rem var(--spacing-main)', display: 'flex', justifyContent: 'space-between', 
      alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, 
      backgroundColor: '#ffffff', borderBottom: '1px solid #000' 
    }}>
      {/* 1번 레퍼런스 로고 스타일 */}
      <a href="#home" style={{ flex: 1 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000', letterSpacing: '2px', textTransform: 'uppercase' }}>
          MAGPIE & TIGER
        </h2>
      </a>
      
      {/* 중앙 네비게이션 메뉴 */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', fontWeight: 800, color: '#000', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', flex: 2, justifyContent: 'center' }}>
        <a href="#home" style={{ borderBottom: '2px solid #000', paddingBottom: '2px' }}>Home</a>
        <a href="#music" style={{ transition: 'opacity 0.2s', opacity: 0.6 }} onMouseOver={e=>e.target.style.opacity='1'} onMouseOut={e=>e.target.style.opacity='0.6'}>Music</a>
        <a href="#history" style={{ transition: 'opacity 0.2s', opacity: 0.6 }} onMouseOver={e=>e.target.style.opacity='1'} onMouseOut={e=>e.target.style.opacity='0.6'}>Tour</a>
        <Link to="/sorter" style={{ transition: 'opacity 0.2s', opacity: 0.6 }} onMouseOver={e=>e.target.style.opacity='1'} onMouseOut={e=>e.target.style.opacity='0.6'}>Store</Link>
        <a href="#contact" style={{ transition: 'opacity 0.2s', opacity: 0.6 }} onMouseOver={e=>e.target.style.opacity='1'} onMouseOut={e=>e.target.style.opacity='0.6'}>About</a>
      </div>

      {/* 우측 포인트 버튼 */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
          Listen Now
        </button>
      </div>
    </nav>
  );
}

function MainPage() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* 📌 Pexels CORS 차단을 회피하는 유튜브 iframe 배경 */}
      <div className="youtube-bg-container">
        <iframe 
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`} 
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          allowFullScreen>
        </iframe>
      </div>

      {/* 실질적인 페이지 컨텐츠 */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div id="home"><Home /></div>
        <div id="members"><Members /></div>
        <div id="music"><Music /></div>
        <div id="history"><History /></div>
        
        {/* 아주 미니멀한 퓨어 화이트 풋터 */}
        <footer id="contact" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #000', color: '#000', textAlign: 'center', padding: '8rem 2rem 5rem' }}>
          
          <h2 style={{ fontSize: '3rem', letterSpacing: '2px', marginBottom: '1rem', fontWeight: 900, textTransform: 'uppercase' }}>MAGPIENTIGER<span style={{color: 'var(--primary-orange)'}}>.</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '5rem', fontWeight: 400 }}>우리의 다음 무대를 기대해 주세요.</p>
          
          <div style={{ display: 'inline-block', padding: '3rem 5rem', marginBottom: '5rem', textAlign: 'left', border: '1px solid #000', backgroundColor: '#fff' }}>
            <h3 style={{ color: '#000', fontSize: '1.1rem', marginBottom: '2rem', letterSpacing: '2px', fontWeight: 800, textTransform: 'uppercase' }}>
              <span style={{display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--primary-orange)', marginRight: '10px', verticalAlign: 'middle'}}></span>
              Booking & Contact
            </h3>
            <p style={{ fontSize: '1.4rem', marginBottom: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              📞 +82 10-5532-0456 <span style={{fontSize:'1rem', color:'var(--text-muted)', fontWeight: 400, marginLeft:'0.5rem'}}>(김치수)</span>
            </p>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              ✉️ size132@naver.com
            </p>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 400 }}>© 2025 Magpientiger. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sorter" element={<PhotoSorterTool onBack={() => window.history.back()} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
