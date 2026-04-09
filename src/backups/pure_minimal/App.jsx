// src/backups/pure_minimal/App.jsx (Backup 240408)
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import './index.css';

import Home from '../../pages/Home';
import Members from '../../pages/Members';
import Music from '../../pages/Music';
import History from '../../pages/History';
import PhotoSorterTool from '../../pages/PhotoSorterTool';

const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk"; 

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/sorter') return null;

  return (
    <nav style={{ 
      padding: 'max(1.5vw, 16px) var(--spacing-main)', display: 'flex', justifyContent: 'space-between', 
      alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, 
      backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5' 
    }}>
      <a href="#home">
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
          MAGPIENTIGER<span style={{color: 'var(--primary-orange)'}}>.</span>
        </h2>
      </a>
      
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', fontWeight: 600, color: '#000', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
        <a href="#members" style={{ transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary-orange)'} onMouseOut={e=>e.target.style.color='#000'}>Members</a>
        <a href="#music" style={{ transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary-orange)'} onMouseOut={e=>e.target.style.color='#000'}>Music</a>
        <a href="#history" style={{ transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--primary-orange)'} onMouseOut={e=>e.target.style.color='#000'}>History</a>
        <Link to="/sorter" style={{ color: 'var(--primary-orange)', fontWeight: 800 }}>Admin</Link>
        
        <div style={{ width: '1px', height: '16px', backgroundColor: '#e5e5e5', margin: '0 0.5rem' }}></div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="https://www.instagram.com/magpientiger/" target="_blank" rel="noreferrer" style={{color: '#000', transition: 'color 0.2s'}} onMouseOver={e=>e.currentTarget.style.color='#E1306C'} onMouseOut={e=>e.currentTarget.style.color='#000'}><FaInstagram size={20} /></a>
          <a href="https://www.youtube.com/@magpientiger" target="_blank" rel="noreferrer" style={{color: '#000', transition: 'color 0.2s'}} onMouseOver={e=>e.currentTarget.style.color='#FF0000'} onMouseOut={e=>e.currentTarget.style.color='#000'}><FaYoutube size={22} /></a>
          <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" style={{color: '#000', transition: 'color 0.2s'}} onMouseOver={e=>e.currentTarget.style.color='#FF5500'} onMouseOut={e=>e.currentTarget.style.color='#000'}><FaSoundcloud size={28} /></a>
        </div>
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
      <div className="youtube-bg-container">
        <iframe 
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`} 
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          allowFullScreen>
        </iframe>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div id="home"><Home /></div>
        <div id="members"><Members /></div>
        <div id="music"><Music /></div>
        <div id="history"><History /></div>
        
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
