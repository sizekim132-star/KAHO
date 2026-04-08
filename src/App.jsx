// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import './index.css';
import Home from './pages/Home';
import PhotoSorterTool from './pages/PhotoSorterTool';

function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (location.pathname === '/sorter') return null;

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Music', href: '#music' },
    { label: 'Members', href: '#members' },
    { label: 'History', href: '#history' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="nav" style={{ boxShadow: scrolled ? '0 2px 24px rgba(15,23,42,0.07)' : 'none' }}>
      <a href="#home" style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '2px', color: '#0F172A' }}>
        MAGPIE&amp;TIGER<span style={{ color: '#FF5500' }}>.</span>
      </a>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {links.map(l => (
          <a key={l.label} href={l.href}
            style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', opacity: 0.6, letterSpacing: '0.05em', transition: 'opacity 0.2s' }}
            onMouseOver={e => e.currentTarget.style.opacity = '1'}
            onMouseOut={e => e.currentTarget.style.opacity = '0.6'}
          >{l.label}</a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <a href="https://www.instagram.com/magpientiger/" target="_blank" rel="noreferrer"
          style={{ color: '#0F172A', opacity: 0.5, transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.color='#E1306C'; }}
          onMouseOut={e => { e.currentTarget.style.opacity='0.5'; e.currentTarget.style.color='#0F172A'; }}>
          <FaInstagram size={18} />
        </a>
        <a href="https://www.youtube.com/@magpientiger" target="_blank" rel="noreferrer"
          style={{ color: '#0F172A', opacity: 0.5, transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.color='#FF0000'; }}
          onMouseOut={e => { e.currentTarget.style.opacity='0.5'; e.currentTarget.style.color='#0F172A'; }}>
          <FaYoutube size={20} />
        </a>
        <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer"
          style={{ color: '#0F172A', opacity: 0.5, transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.color='#FF5500'; }}
          onMouseOut={e => { e.currentTarget.style.opacity='0.5'; e.currentTarget.style.color='#0F172A'; }}>
          <FaSoundcloud size={22} />
        </a>
        <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '0.78rem' }}>
          Listen Now
        </a>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorter" element={<PhotoSorterTool onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}

export default App;
