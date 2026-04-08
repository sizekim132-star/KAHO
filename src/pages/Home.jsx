// src/pages/Home.jsx
import React, { useRef, useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import minhwaImg from '../assets/minhwa_lineart.png';
import galleryGuitar from '../assets/gallery_guitar.png';
import galleryStage from '../assets/gallery_stage.png';
import galleryCrowd from '../assets/gallery_crowd.png';

/* ── 실제 밴드 노션 데이터 ── */
const MEMBERS = [
  { name: '김치수', role: '리더 · 베이스 · 프로듀서', animal: '호랑이', emoji: '🐯', joined: '2025. 04. 12', bio: '까치와호랑이의 심장. 소리를 짓고 무대를 지배한다.' },
  { name: '심어진', role: '엔지니어 · 일렉기타', animal: '치타', emoji: '🐆', joined: '2025. 05. 08', bio: '날렵하고 날카로운 속주 엔지니어.' },
  { name: '김태린', role: '보컬 · 일렉기타', animal: '까치', emoji: '🐦', joined: '2025. 08. 13', bio: '시선을 사로잡는 매혹적인 보컬.' },
  { name: '최민서', role: '보컬 · 일렉기타', animal: '고양이', emoji: '🐈‍⬛', joined: '2025. 04. 18', bio: '무대 전체를 자유롭게 뛰어다니는 에너지.' },
  { name: '박어진', role: '건반 · 서기', animal: '참새', emoji: '🪶', joined: '2024. 09. 26', bio: '밴드의 가장 오랜 뿌리, 내실을 다지는 손.' },
  { name: '김민규', role: '드럼 · 편집', animal: '펭귄', emoji: '🐧', joined: '2026. 03. 10', bio: '단단하고 묵직한 리듬의 심장박동.' },
];

const PERFORMANCES = [
  { name: '까치와호랑이 조우', date: '2025년 4월 22일', location: '서울', audience: '운명적 만남', status: 'done' },
  { name: '제23회 허준축제', date: '2025년 10월 19일', location: '마곡중앙로', audience: '100+명', status: 'done' },
  { name: '서울청년센터 할로윈축제', date: '2025년 10월 31일', location: '서울청년센터강서', audience: '30+명', status: 'done' },
  { name: '청년예술인 네트워크 공연', date: '2026년 5월 7일', location: '강서 운전면허시험장 광장', audience: '40~100명', status: 'upcoming' },
];

const TRACKS = [
  { title: '꽉 붙 (Demo)', desc: '자작곡', platform: 'soundcloud', link: 'https://soundcloud.com/size_kim' },
  { title: 'Night & Day', desc: '커버 · 편곡', platform: 'youtube', link: 'https://www.youtube.com/@magpientiger' },
  { title: '한밤의 동물원', desc: '자작곡', platform: 'soundcloud', link: 'https://soundcloud.com/size_kim' },
];

const GALLERY = [galleryGuitar, galleryStage, galleryCrowd];

/* ── Hero Video: 공연 분위기의 Pexels 영상 ── */
const VIDEO_URL = 'https://static.pexels.com/lib/videos/free-videos.mp4'; // fallback

export default function Home() {
  const videoRef = useRef(null);

  /* 영상 fallback: 로드 실패 시 유튜브로 교체 */
  const YOUTUBE_ID = 'jfKfPfyJRdk';

  return (
    <div style={{ paddingTop: 64 }}>
      {/* ══════════════════════════════
          전역 배경: 영상 + 한지 오버레이
      ══════════════════════════════ */}
      <div className="video-bg-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_ID}&vq=hd1080`}
          allow="autoplay; encrypted-media"
          style={{ border: 'none', width: '100%', height: '100%', position: 'absolute',
            top: '50%', left: '50%',
            width: '100vw', height: '56.25vw',
            minHeight: '100vh', minWidth: '177.78vh',
            transform: 'translate(-50%, -50%)' }}
        />
      </div>
      <div className="hanji-overlay" />

      {/* ══════════════════════════════
          1. HERO SECTION
      ══════════════════════════════ */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px var(--spacing) 80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

          {/* Left: Minhwa illustration in glass frame */}
          <div className="glass card-lift" style={{ padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={minhwaImg} alt="Magpietiger" style={{ width: '100%', maxWidth: 480, mixBlendMode: 'multiply' }} />
          </div>

          {/* Right: Typography */}
          <div>
            <p className="section-label">EST. 2025 · Seoul, Korea</p>
            <h1 className="section-title" style={{ fontSize: 'clamp(3.5rem, 5vw, 6rem)', marginBottom: '1.5rem' }}>
              WHERE THE<br />WILDS SING.
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 440, fontWeight: 500 }}>
              까치의 목소리와 호랑이의 그루브.<br />
              서울에서 가장 야성적인 밴드의 포효가 시작된다.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" className="btn btn-primary">
                음악 듣기
              </a>
              <a href="#history" className="btn btn-outline-dark">
                공연 기록 보기
              </a>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3.5rem' }}>
              {[{ val: '6', label: '멤버' }, { val: '3+', label: '공연' }, { val: '2025', label: '창립' }].map(s => (
                <div key={s.label} className="glass" style={{ padding: '1rem 1.5rem', textAlign: 'center', borderRadius: 14 }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{s.val}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          2. MUSIC
      ══════════════════════════════ */}
      <section id="music" style={{ padding: '120px var(--spacing)', backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p className="section-label">Discography</p>
          <h2 className="section-title" style={{ marginBottom: '4rem' }}>Music</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {TRACKS.map((t, i) => (
              <a key={i} href={t.link} target="_blank" rel="noreferrer"
                className="glass card-lift"
                style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', cursor: 'pointer' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#FF5500', fontSize: '1.8rem' }}>♪</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', color: '#FF5500', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t.desc}</p>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{t.title}</h3>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em' }}>
                  <span>{t.platform === 'soundcloud' ? '▶ SoundCloud' : '▶ YouTube'}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. MEMBERS
      ══════════════════════════════ */}
      <section id="members" style={{ padding: '120px var(--spacing)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p className="section-label">The Wild Ones</p>
          <h2 className="section-title" style={{ marginBottom: '4rem' }}>Band Members</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {MEMBERS.map((m, i) => (
              <div key={i} className="glass card-lift" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '16px', fontSize: '5rem', opacity: 0.08, lineHeight: 1 }}>{m.emoji}</div>
                <div style={{ fontSize: '2.8rem', marginBottom: '1.2rem' }}>{m.emoji}</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.3rem' }}>{m.name}</h3>
                <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF5500', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{m.animal}</p>
                <div style={{ width: '2rem', height: '2px', backgroundColor: '#0F172A', opacity: 0.15, marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569', marginBottom: '1rem', letterSpacing: '0.01em' }}>{m.role}</p>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>{m.bio}</p>
                <p style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.08em' }}>JOINED {m.joined}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          4. HISTORY (Timeline)
      ══════════════════════════════ */}
      <section id="history" style={{ padding: '120px var(--spacing)', backgroundColor: 'rgba(255,255,255,0.88)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="section-label">공연 기록</p>
          <h2 className="section-title" style={{ marginBottom: '4rem' }}>Band History</h2>
          <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 4, top: 8, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, #FF5500, rgba(255,85,0,0.1))' }} />
            {PERFORMANCES.map((p, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '3rem', display: 'flex', gap: '0', alignItems: 'flex-start' }}>
                <div className="tl-dot" style={{ position: 'absolute', left: '-2.1rem', top: 6 }} />
                <div className="glass card-lift" style={{ padding: '2rem 2.5rem', width: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF5500', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{p.date}</p>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A' }}>{p.name}</h3>
                    </div>
                    {p.status === 'upcoming' && (
                      <span style={{ backgroundColor: '#FF5500', color: '#fff', padding: '4px 14px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', flexShrink: 0 }}>
                        UPCOMING
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
                    <span>📍 {p.location}</span>
                    <span>👥 {p.audience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          5. GALLERY
      ══════════════════════════════ */}
      <section style={{ padding: '120px var(--spacing)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p className="section-label">Gallery</p>
          <h2 className="section-title" style={{ marginBottom: '4rem' }}>Hunting Moments</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {GALLERY.map((img, i) => (
              <div key={i} className="card-lift" style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: 16, position: 'relative' }}>
                <img src={img} alt={`Gallery ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          6. FOOTER / CONTACT
      ══════════════════════════════ */}
      <footer id="contact" style={{ padding: '80px var(--spacing) 48px', borderTop: '1px solid rgba(15,23,42,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '4rem', alignItems: 'start', marginBottom: '4rem' }}>
            {/* Brand */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '0.8rem' }}>MAGPIE&amp;TIGER</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7, maxWidth: 280 }}>
                서울 기반 인디 밴드.<br />야성과 우아함이 공존하는 음악.
              </p>
            </div>

            {/* Social Icons */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em', color: '#94A3B8', marginBottom: '1.2rem' }}>FOLLOW US</p>
              <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', alignItems: 'center' }}>
                {[
                  { icon: <FaInstagram size={22} />, href: 'https://www.instagram.com/magpientiger/', hover: '#E1306C' },
                  { icon: <FaYoutube size={22} />, href: 'https://www.youtube.com/@magpientiger', hover: '#FF0000' },
                  { icon: <FaSoundcloud size={24} />, href: 'https://soundcloud.com/size_kim', hover: '#FF5500' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    style={{ color: '#0F172A', opacity: 0.45, transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.color = s.hover; e.currentTarget.style.transform='translateY(-3px)'; }}
                    onMouseOut={e => { e.currentTarget.style.opacity='0.45'; e.currentTarget.style.color='#0F172A'; e.currentTarget.style.transform='translateY(0)'; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em', color: '#94A3B8', marginBottom: '1.2rem' }}>BOOKING & CONTACT</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.3rem' }}>김치수 (리더)</p>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '0.3rem' }}>010-5532-0456</p>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>size132@naver.com</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(15,23,42,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>© 2025 Magpietiger. All rights reserved.</p>
            <p style={{ fontSize: '0.78rem', color: '#94A3B8', letterSpacing: '0.05em' }}>창립기념일 4월 29일 🐾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


// FaInstagram 등은 App.jsx에서 nav로 관리됩니다.

