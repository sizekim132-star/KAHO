// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import './index.css';
import Home from './pages/Home';
import PhotoSorterTool from './pages/PhotoSorterTool';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Music', href: '#music' },
  { label: 'Members', href: '#members' },
  { label: 'Shows', href: '#shows' },
  { label: 'Contact', href: '#contact' },
];

function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (pathname === '/sorter') return null;

  return (
    <nav className={`nav desktop-only${scrolled ? ' scrolled' : ''}`}>
      <a href="#home" className="nav-logo">
        MAGPIENTIGER
      </a>
      <ul className="nav-links">
        {LINKS.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
      </ul>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href="https://www.instagram.com/magpientiger/" target="_blank" rel="noreferrer"
          style={{ color: '#9CA3AF', transition: 'color .15s' }}
          onMouseOver={e => e.currentTarget.style.color = '#E1306C'}
          onMouseOut={e => e.currentTarget.style.color = '#9CA3AF'}>
          <FaInstagram size={17} />
        </a>
        <a href="https://www.youtube.com/@magpientiger" target="_blank" rel="noreferrer"
          style={{ color: '#9CA3AF', transition: 'color .15s' }}
          onMouseOver={e => e.currentTarget.style.color = '#FF0000'}
          onMouseOut={e => e.currentTarget.style.color = '#9CA3AF'}>
          <FaYoutube size={18} />
        </a>
        <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer"
          style={{ color: '#9CA3AF', transition: 'color .15s' }}
          onMouseOver={e => e.currentTarget.style.color = '#FF5500'}
          onMouseOut={e => e.currentTarget.style.color = '#9CA3AF'}>
          <FaSoundcloud size={20} />
        </a>
        <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" className="nav-cta">
          Listen Now
        </a>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorter" element={<PhotoSorterTool onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}
export default App;
