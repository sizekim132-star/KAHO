// src/components/Nav.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';
import logo from '../assets/logo.png';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Feed', href: '#music' },
  { label: 'Artists', href: '#members' },
  { label: 'History', href: '#shows' },
  { label: 'Recruit', href: '#recruit' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (pathname === '/sorter') return null;

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#home" className="nav-logo">
        <img src={logo} alt="KAHO Logo" className="nav-logo-img" />
      </a>
      <ul className="nav-links">
        {LINKS.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
      </ul>
      <div className="nav-socials">
        <a href={IG_URL} target="_blank" rel="noreferrer" className="nav-social-link nav-social-instagram" aria-label="Instagram">
          <FaInstagram size={17} />
        </a>
        <a href={YT_CHANNEL} target="_blank" rel="noreferrer" className="nav-social-link nav-social-youtube" aria-label="YouTube">
          <FaYoutube size={18} />
        </a>
        <a href={SC_URL} target="_blank" rel="noreferrer" className="nav-social-link nav-social-soundcloud" aria-label="SoundCloud">
          <FaSoundcloud size={20} />
        </a>
      </div>
    </nav>
  );
}
