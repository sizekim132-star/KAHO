// src/sections/ContactSection.jsx
import React, { useState } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import { SC_URL, IG_URL, YT_CHANNEL } from '../data/constants';

function ContactIcon({ text, icon: Icon }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      title={`${text} 복사`}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        color: copied ? 'var(--orange)' : 'rgba(255,255,255,0.5)',
        transition: 'all 0.3s var(--ease)',
      }}
      onMouseEnter={e => {
        if (!copied) {
          e.currentTarget.style.color = 'var(--orange)';
          e.currentTarget.style.borderColor = 'var(--orange)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 95, 31, 0.2)';
        }
      }}
      onMouseLeave={e => {
        if (!copied) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {copied ? <FiCheck size={22} /> : <Icon size={22} />}
    </button>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section section-dark" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* ── 타이틀 ── */}
        <div className="reveal-text" style={{ marginBottom: '2rem' }}>
          <h2 className="title-dark" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>Representative</h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>김치수</p>
        </div>

        {/* ── 구분선 ── */}
        <div className="reveal-text" style={{ transitionDelay: '0.1s' }}>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.15)', margin: '0 auto 2.5rem' }} />
        </div>

        {/* ── 아이콘 그리드: SNS + 연락처 통합 ── */}
        <div className="reveal-text" style={{ transitionDelay: '0.2s' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}>
            {/* SNS */}
            <a href={YT_CHANNEL} target="_blank" rel="noreferrer" className="contact-social-link" aria-label="YouTube">
              <FaYoutube size={24} />
            </a>
            <a href={IG_URL} target="_blank" rel="noreferrer" className="contact-social-link" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href={SC_URL} target="_blank" rel="noreferrer" className="contact-social-link" aria-label="SoundCloud">
              <FaSoundcloud size={26} />
            </a>

            {/* 세퍼레이터 */}
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)', margin: '0 4px' }} />

            {/* 연락처 (클릭 시 복사) */}
            <ContactIcon text="size132@naver.com" icon={FiMail} />
            <ContactIcon text="010-5532-0456" icon={FiPhone} />
          </div>
        </div>

        {/* ── 연락처 텍스트 안내 ── */}
        <div className="reveal-text" style={{ transitionDelay: '0.3s', marginTop: '1.5rem' }}>
          <p style={{
            fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.03em',
          }}>
            size132@naver.com · 010-5532-0456
          </p>
        </div>

      </div>
    </section>
  );
}
