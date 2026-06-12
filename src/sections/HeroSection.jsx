// src/sections/HeroSection.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { YT_BG_IDS, IG_URL, YT_CHANNEL, SC_URL, RECRUIT_FORM_URL } from '../data/constants';
import useVideoSlot from '../hooks/useVideoSlot';

export default function HeroSection({ videoOpacity }) {
  const { activeSlot, slotIndices } = useVideoSlot(YT_BG_IDS.length, 11000, 3500);

  return (
    <>
      {/* ── 유튜브 듀얼 슬롯 버퍼링 최적화 페이드 캐러셀 ── */}
      <div
        className={`vbg-container${videoOpacity <= 0 ? ' vbg-hidden' : ''}`}
        style={{ opacity: videoOpacity, transition: 'opacity 0.5s ease-in-out' }}
      >
        {[0, 1].map((slotIdx) => {
          const globalIdx = slotIndices[slotIdx];
          const id = YT_BG_IDS[globalIdx];
          const isActive = activeSlot === slotIdx;

          return (
            <div
              key={slotIdx}
              className="vbg"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : -1,
                transition: 'opacity 2.5s ease-in-out', // 2.5초 고급스러운 시네마틱 페이드 트랜지션
                pointerEvents: 'none',
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <iframe
                key={id}
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1`}
                allow="autoplay; encrypted-media"
                style={{
                  border: 'none',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none'
                }}
                title={`bg-video-slot-${slotIdx}`}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`film${videoOpacity <= 0 ? ' vbg-hidden' : ''}`}
        style={{
          background: 'rgba(26, 39, 68, 0.35)',
          opacity: videoOpacity,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* ── 글래스모피즘 Recruit 버튼 및 애니메이션 스타일 ── */}
      <style>{`
        @keyframes glass-pulse {
          0%, 100% {
            transform: scale(1);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: scale(1.03);
            border-color: rgba(255, 95, 31, 0.45);
            box-shadow: 0 12px 36px 0 rgba(255, 95, 31, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        }

        .glass-btn-recruit {
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          padding: 12px 32px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.04); /* 약간의 불투명도 부여 */
          color: #ffffff;
          backdrop-filter: blur(4px); /* 미세한 블러 추가 */
          -webkit-backdrop-filter: blur(4px);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: glass-pulse 3s infinite ease-in-out;
          text-decoration: none;
          margin-bottom: 8px;
          position: relative;
        }

        .glass-btn-recruit:hover {
          animation: none; /* 호버 시에는 평소 애니메이션 정지 */
          transform: translateY(-6px) scale(1.05); /* 조금 더 위로 뜨고 크게 */
          background: rgba(255, 95, 31, 0.18);
          border-color: rgba(255, 95, 31, 0.85);
          box-shadow: 0 15px 35px rgba(255, 95, 31, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }

        .glass-btn-recruit .arrow-icon {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-block;
        }

        .glass-btn-recruit:hover .arrow-icon {
          transform: translate(3px, -3px);
          color: #ff7a3d;
        }
      `}</style>

      {/* ════ HERO ════ */}
      <section id="home" className="hero-fullscreen">
        {/* 하단 중앙: 소셜 아이콘 + 버튼 */}
        <div className="hero-bottom-content">
          <a
            href={RECRUIT_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="glass-btn-recruit reveal-text"
          >
            <span>지원하기!</span>
            <span className="arrow-icon">↗</span>
          </a>

          <div className="hero-socials reveal-text">
            <a href={YT_CHANNEL} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={28} /></a>
            <span className="hero-dot" />
            <a href={IG_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={28} /></a>
            <span className="hero-dot" />
            <a href={SC_URL} target="_blank" rel="noreferrer" aria-label="SoundCloud"><FaSoundcloud size={30} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
