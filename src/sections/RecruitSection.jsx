// src/sections/RecruitSection.jsx
import React from 'react';
import { FiArrowUpRight, FiUsers, FiMusic, FiVideo, FiLayers } from 'react-icons/fi';
import { RECRUIT_FORM_URL } from '../data/constants';
import { AccentLine } from '../components/Label';

export default function RecruitSection() {
  const formUrl = RECRUIT_FORM_URL;

  return (
    <section id="recruit" className="section section-white">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── 헤더 영역 ── */}
        <div className="reveal-text" style={{ marginBottom: '4rem' }}>
          <h2 className="title">Join the KAHO</h2>
          <AccentLine />
          <p className="body-text" style={{ maxWidth: 680 }}>
            카호(KAHO)에서 새로운 여정을 함께할 신규 멤버를 모집합니다.
          </p>
        </div>

        {/* ── 모집 분야 bento grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>

          {/* 보컬 및 세션 */}
          <div className="reveal-card" style={{
            background: 'var(--gray-1)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: 'var(--r-lg)',
            padding: '2rem',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              background: 'var(--orange-light)',
              color: 'var(--orange)',
              width: 48,
              height: 48,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <FiMusic size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem' }}>Player</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
              보컬 및 세션, 카호만의 다채로운 사운드를 라이브 무대에서 함께 완성해갈 멤버
            </p>
          </div>

          {/* 크리에이터 */}
          <div className="reveal-card" style={{
            background: 'var(--gray-1)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: 'var(--r-lg)',
            padding: '2rem',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              background: 'var(--orange-light)',
              color: 'var(--orange)',
              width: 48,
              height: 48,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <FiVideo size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem' }}>Creator</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
              영상 촬영 및 편집, 쇼츠 제작, 디자인, 비주얼 아트 디렉팅 등 카호의 정체성을 시각적으로 표현할 크리에이터
            </p>
          </div>

          {/* 기획 및 스태프 */}
          <div className="reveal-card" style={{
            background: 'var(--gray-1)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: 'var(--r-lg)',
            padding: '2rem',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              background: 'var(--orange-light)',
              color: 'var(--orange)',
              width: 48,
              height: 48,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <FiLayers size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.75rem' }}>Staff</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
              공연 기획, 대외 브랜딩 제안, 마케팅, 커뮤니케이션 지원 등 카호의 대내외 활동을 총괄하고 서포트할 멤버
            </p>
          </div>

        </div>

        {/* ── 지원 안내 CTA 카드 ── */}
        <div className="reveal-card" style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%)',
          borderRadius: 'var(--r-lg)',
          padding: '4rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}>

          {/* 배경 오렌지 글로우 효과 */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'var(--orange)',
            filter: 'blur(120px)',
            opacity: 0.15,
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              카호와 함께 할 준비가 되었나요?
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: 580, margin: '0 auto 2.5rem' }}>
              함께 고민하고 창작할 수 있는 열정만 있다면 지금 바로 지원서를 제출해 주세요!
            </p>

            <a href={formUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{
              padding: '16px 36px',
              fontSize: '1rem',
              gap: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}>
              <span>지원서 작성하러 가기</span>
              <FiArrowUpRight size={18} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
