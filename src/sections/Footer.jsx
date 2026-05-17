// src/sections/Footer.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', padding: '80px var(--spacing) 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div><h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>KAHO</h3><p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)', marginTop: 8 }}>© 까치와호랑이</p></div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href={IG_URL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }}><FaInstagram size={22} /></a>
          <a href={YT_CHANNEL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }}><FaYoutube size={22} /></a>
          <a href={SC_URL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }}><FaSoundcloud size={24} /></a>
        </div>
      </div>
    </footer>
  );
}
