// src/sections/Footer.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', padding: '64px var(--spacing) 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '1rem',
        }}>
          <h3 style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}>
            KAHO
          </h3>
          <p style={{
            fontSize: '0.62rem',
            fontWeight: 400,
            color: 'rgba(255,255,255,.35)',
            flexShrink: 0,
          }}>
            © 까치와호랑이
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1.5rem 2.5rem',
        }}>
          <p style={{
            fontSize: '0.68rem',
            lineHeight: 1.65,
            fontWeight: 400,
            color: 'rgba(255,255,255,.5)',
            maxWidth: 400,
            flex: '1 1 240px',
            minWidth: 0,
          }}>
            KAHO는 단순한 취미를 넘어,
            <br />
            음악과 비주얼을 하나의 정교한 시스템으로 운영합니다.
            <br />
            <br />
            창작의 즐거움과 실무 포트폴리오라는
            <br />
            두 가지 가치를 함께 만들어갑니다.
          </p>

          <div style={{
            flex: '0 0 auto',
            marginLeft: 'auto',
            display: 'flex',
            gap: 20,
            alignItems: 'center',
          }}>
            <a href={YT_CHANNEL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }} aria-label="YouTube">
              <FaYoutube size={18} />
            </a>
            <a href={IG_URL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }} aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href={SC_URL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }} aria-label="SoundCloud">
              <FaSoundcloud size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
