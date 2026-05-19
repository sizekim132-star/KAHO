// src/sections/AboutSection.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { AccentLine } from '../components/Label';
import PhotoBox from '../components/PhotoBox';
import { groupPhoto, IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

export default function AboutSection() {
  return (
    <section id="about" className="section section-white" style={{ position: 'relative', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.6
        }}
      >
        <source src="/backforest.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 0 }}></div>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div className="reveal-text">
          <h2 className="title">Play and Create.</h2>
          <AccentLine />
          <p className="body-text" style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>KAHO</strong>는 2025년 서울 강서구에서 결성된 Creative crew입니다. 상상이 현실이 되는 무대와 문화를 함께 만듭니다.
          </p>
          <p className="body-text">
            각자의 전문 분야를 통해 팀의 성장을 함께 경험하는 곳. 우리는 음악을 넘어 영상, 브랜딩, 콘텐츠까지 직접 빌딩합니다.
          </p>
        </div>
        <div className="reveal-card" style={{ boxShadow: 'var(--shadow-lg)', borderRadius: '0px', overflow: 'hidden' }}>
          <PhotoBox src={groupPhoto} w="100%" h="440px" label="밴드 단체사진" />
        </div>
      </div>
    </section>
  );
}
