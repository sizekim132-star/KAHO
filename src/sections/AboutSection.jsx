// src/sections/AboutSection.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { AccentLine } from '../components/Label';
import PhotoBox from '../components/PhotoBox';
import { groupPhoto, IG_URL, YT_CHANNEL, SC_URL } from '../data/constants';

export default function AboutSection() {
  return (
    <section id="about" className="section section-white">
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div className="reveal-text">
          <h2 className="title">Play and Create.</h2>
          <AccentLine />
          <p className="body-text" style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>KAHO</strong>는 2025년 서울 강서구에서 결성된 Creative studio입니다. 이 곳은 상상이 현실이 되는 무대와 문화를 함께 만드는 창작 공간입니다.
          </p>
          <p className="body-text">
            각자의 전문 분야를 통해 팀의 성장을 함께 경험하는 곳. 우리는 음악을 넘어 영상, 브랜딩, 콘텐츠까지 직접 빌딩합니다.
          </p>
        </div>
        <div className="reveal-card" style={{ boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
          <PhotoBox src={groupPhoto} w="100%" h="440px" label="밴드 단체사진" />
        </div>
      </div>
    </section>
  );
}
