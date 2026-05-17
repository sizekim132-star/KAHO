// src/sections/ContactSection.jsx
import React, { useState } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { FiMail, FiPhone, FiCopy, FiCheck } from 'react-icons/fi';
import { SC_URL, IG_URL, YT_CHANNEL } from '../data/constants';

function CopyButton({ text, label, icon: Icon }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="contact-copy-btn" onClick={handleCopy}>
      <Icon size={16} />
      <span>{label}</span>
      <span className="copy-icon-wrap">
        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      </span>
    </button>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section section-dark" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* ── 타이틀 ── */}
        <div className="reveal-text" style={{ marginBottom: '2.5rem' }}>
          <h2 className="title-dark" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>Representative</h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>김치수</p>
        </div>

        {/* ── 소셜 아이콘 ── */}
        <div className="contact-socials reveal-text" style={{ transitionDelay: '0.1s' }}>
          <a href={YT_CHANNEL} target="_blank" rel="noreferrer" className="contact-social-link" aria-label="YouTube">
            <FaYoutube size={24} />
          </a>
          <a href={IG_URL} target="_blank" rel="noreferrer" className="contact-social-link" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href={SC_URL} target="_blank" rel="noreferrer" className="contact-social-link" aria-label="SoundCloud">
            <FaSoundcloud size={26} />
          </a>
        </div>

        {/* ── 구분선 ── */}
        <div className="reveal-text" style={{ transitionDelay: '0.2s' }}>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.15)', margin: '2.5rem auto' }} />
        </div>

        {/* ── 연락처 복사 버튼 ── */}
        <div className="contact-actions reveal-text" style={{ transitionDelay: '0.3s', flexDirection: 'column', alignItems: 'center' }}>
          <CopyButton text="010-5532-0456" label="010-5532-0456" icon={FiPhone} />
          <CopyButton text="size132@naver.com" label="size132@naver.com" icon={FiMail} />
        </div>


      </div>
    </section>
  );
}
