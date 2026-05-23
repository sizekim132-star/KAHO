// src/sections/RecruitSection.jsx
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { LuMusic, LuSparkles, LuCompass } from 'react-icons/lu';
import { RECRUIT_FORM_URL } from '../data/constants';

export default function RecruitSection() {
  const formUrl = RECRUIT_FORM_URL;

  return (
    <section id="recruit" className="section section-white">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── 헤더 영역 ── */}
        <div className="reveal-text" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="title" style={{ marginBottom: '1.25rem' }}>BEYOND THE SOUND</h2>
          <p className="body-text" style={{ maxWidth: 680, margin: '0 auto' }}>
            새로운 여정을 함께할 신규 멤버를 모집합니다.
          </p>
        </div>

        {/* ── 모집 분야 bento grid ── */}
        <div className="recruit-cards-grid">

          {/* 보컬 및 세션 */}
          <div className="reveal-card recruit-card" style={{
            background: 'var(--gray-1)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: '0px',
            padding: '2rem',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="recruit-card-content">
              <div className="recruit-card-header">
                <div className="recruit-card-icon">
                  <LuMusic size={22} />
                </div>
                <h3 className="recruit-card-title">Player</h3>
              </div>
              <p className="recruit-card-desc">
                다채로운 사운드를 라이브 무대에서 함께 완성해갈 보컬 및 세션.
              </p>
            </div>
          </div>

          {/* 크리에이터 */}
          <div className="reveal-card recruit-card" style={{
            background: 'var(--gray-1)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: '0px',
            padding: '2rem',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="recruit-card-content">
              <div className="recruit-card-header">
                <div className="recruit-card-icon">
                  <LuSparkles size={22} />
                </div>
                <h3 className="recruit-card-title">Creator</h3>
              </div>
              <p className="recruit-card-desc">
                정체성을 시각적으로 표현할 영상, 디자인, 비주얼 아트 디렉터.
              </p>
            </div>
          </div>

          {/* 기획 및 스태프 */}
          <div className="reveal-card recruit-card" style={{
            background: 'var(--gray-1)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: '0px',
            padding: '2rem',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="recruit-card-content">
              <div className="recruit-card-header">
                <div className="recruit-card-icon">
                  <LuCompass size={22} />
                </div>
                <h3 className="recruit-card-title">Staff</h3>
              </div>
              <p className="recruit-card-desc">
                원활한 활동을 위해 기획·행정 및 예산·일정 관리를 총괄할 매니저.
              </p>
            </div>
          </div>

        </div>

        {/* ── 지원 안내 CTA 카드 ── */}
        <style>{`
          .cta-card-interactive { transition: transform 0.4s ease, box-shadow 0.4s ease; }
          .cta-card-interactive:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4) !important; }
          .cta-card-interactive:hover .cta-bg-video { opacity: 0.65 !important; transform: translate(-50%, -50%) scale(1) !important; }
          .cta-card-interactive:hover .cta-glow { opacity: 0 !important; }
          .cta-card-interactive:hover .cta-overlay { opacity: 1 !important; }
          
          /* 뛰어들기 버튼 맥박/쉬머 애니메이션 정의 */
          @keyframes cta-pulse-breathing {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 8px 24px rgba(255, 95, 31, 0.3);
            }
            50% {
              transform: scale(1.04) translateY(-1px);
              box-shadow: 0 12px 28px rgba(255, 95, 31, 0.65);
            }
          }
          @keyframes cta-shimmer-sweep {
            0% {
              left: -150%;
            }
            25% {
              left: 150%;
            }
            100% {
              left: 150%;
            }
          }

          /* 뛰어들기 버튼 기본 스타일 및 평소 매력적인 모션 */
          .cta-submit-btn {
            position: relative;
            overflow: hidden;
            background: var(--orange);
            color: #ffffff;
            border-radius: 100px;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 8px 24px rgba(255, 95, 31, 0.3);
            z-index: 1;
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: cta-pulse-breathing 2.5s infinite ease-in-out;
          }
          .cta-submit-btn::before {
            content: "";
            position: absolute;
            top: 0; left: -150%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
            z-index: -1;
            animation: cta-shimmer-sweep 4s infinite ease-in-out;
          }
          
          /* 마우스 호버 시 인터랙션 (호버가 우선 적용되도록 애니메이션 일시 해제) */
          .cta-submit-btn:hover {
            animation: none;
            transform: scale(1.07) translateY(-3px);
            box-shadow: 0 16px 32px rgba(255, 95, 31, 0.7);
            background: #ff7222;
          }
          .cta-submit-btn:hover::before {
            animation: none;
            left: 150%;
            transition: left 0.6s ease;
          }
          .cta-submit-btn .icon-arrow {
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .cta-submit-btn:hover .icon-arrow {
            transform: translate(4px, -4px) scale(1.1);
          }
        `}</style>
        <div className="reveal-card cta-card-interactive" style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%)',
          borderRadius: '0px',
          padding: '5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}>

          <video
            className="cta-bg-video"
            autoPlay loop muted playsInline
            style={{
              position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%',
              objectFit: 'cover', transform: 'translate(-50%, -50%) scale(1.05)', zIndex: 0,
              opacity: 0.18, transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <source src="/join.mp4" type="video/mp4" />
          </video>

          <div className="cta-overlay" style={{
            position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))', zIndex: 1,
            opacity: 0, transition: 'opacity 0.5s ease'
          }} />

          {/* 배경 오렌지 글로우 효과 */}
          <div className="cta-glow" style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'var(--orange)',
            filter: 'blur(120px)',
            opacity: 0.15,
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              카호와 함께 해요!
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: 580, margin: '0 auto 2.5rem' }}>
              함께 고민하고 창작할 수 있는 열정만 있다면 지금 바로 지원서를 제출해 주세요!
            </p>

            <a href={formUrl} target="_blank" rel="noreferrer" className="cta-submit-btn" style={{
              padding: '16px 40px',
              fontSize: '1.1rem',
              fontWeight: 800,
              gap: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}>
              <span>뛰어들기!</span>
              <FiArrowUpRight className="icon-arrow" size={22} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
