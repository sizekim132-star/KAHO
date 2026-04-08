// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSoundcloud, FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import './index.css';

import Home from './pages/Home';
import PhotoSorterTool from './pages/PhotoSorterTool';

const NAV_ITEMS = ['HOME', 'MUSIC', 'TOUR', 'STORE', 'ABOUT'];

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/sorter') return null;

  return (
    <nav style={{
      padding: '1.4rem var(--spacing-main)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border)',
    }}>
      <a href="#home" style={{ flex: 1, textDecoration: 'none' }}>
        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0F172A', letterSpacing: '3px', textTransform: 'uppercase' }}>
          MAGPIE & TIGER
        </span>
      </a>

      <div style={{ display: 'flex', gap: '2.5rem', flex: 2, justifyContent: 'center' }}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '1px',
              color: i === 0 ? '#0F172A' : '#94a3b8',
              borderBottom: i === 0 ? '2px solid #0F172A' : 'none',
              paddingBottom: '2px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.color = '#0F172A'}
            onMouseOut={e => { if (i !== 0) e.currentTarget.style.color = '#94a3b8'; }}
          >
            {item}
          </a>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.78rem' }}>
          LISTEN NOW
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  const socials = [
    { icon: <FaFacebook size={20} />, href: '#' },
    { icon: <FaTwitter size={20} />, href: '#' },
    { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/magpientiger/' },
    { icon: <FaYoutube size={20} />, href: 'https://www.youtube.com/@magpientiger' },
    { icon: <FaSoundcloud size={22} />, href: 'https://soundcloud.com/size_kim' },
    { icon: <FaTiktok size={20} />, href: '#' },
  ];

  return (
    <footer id="about" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '5rem var(--spacing-main) 3rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem', alignItems: 'start' }}>

        {/* About Links */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '1.5rem', textTransform: 'uppercase', color: '#0F172A' }}>About</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {['About', 'Contact', 'Press'].map(item => (
              <a key={item} href="#" style={{ fontSize: '0.95rem', color: '#94a3b8', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#0F172A'}
                onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>{item}</a>
            ))}
          </div>
        </div>

        {/* Social */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '1.5rem', textTransform: 'uppercase', color: '#0F172A' }}>Social</h3>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', alignItems: 'center' }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{ color: '#0F172A', opacity: 0.5, transition: 'all 0.2s', textDecoration: 'none' }}
                onMouseOver={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#FF5500'; }}
                onMouseOut={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.color = '#0F172A'; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '1.5rem', textTransform: 'uppercase', textAlign: 'right', color: '#0F172A' }}>Newsletter</h3>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input
              type="email"
              placeholder="Email"
              style={{ padding: '10px 16px', border: '1px solid #e2e8f0', borderRight: 'none', fontSize: '0.9rem', outline: 'none', width: '180px', fontFamily: 'var(--font-sans)' }}
            />
            <button style={{ padding: '10px 20px', backgroundColor: '#0F172A', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '4rem', paddingTop: '2rem', maxWidth: '1400px', margin: '4rem auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '0.3rem', color: '#0F172A' }}>BOOKING & CONTACT</p>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>010-5532-0456 (김치수) &nbsp;·&nbsp; size132@naver.com</p>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>© 2024 MAGPIE & TIGER</p>
      </div>
    </footer>
  );
}

function MainPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div id="home"><Home /></div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sorter" element={<PhotoSorterTool onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}

export default App;
