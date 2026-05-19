// src/sections/MembersSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import PhotoBox from '../components/PhotoBox';
import { MEMBERS } from '../data/constants';

export default function MembersSection() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // 모바일/데스크톱 모두에서 부드러운 가로 스크롤 관리 및 버튼 상태 업데이트
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

      // 현재 스냅되어 활성화된 카드 인덱스 연산
      const cards = scrollContainerRef.current.querySelectorAll('.member-premium-card');
      if (cards.length > 0) {
        const cardWidth = cards[0].clientWidth;
        const gap = 24;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.max(0, Math.min(index, MEMBERS.length - 1)));
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // 초기 버튼 활성화 상태 체크
      handleScroll();
      
      // 화면 크기 변화 대응
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="members" className="section" style={{
      background: 'linear-gradient(180deg, #070B19 0%, #0D1326 100%)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '120px',
      paddingBottom: '140px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* ── 백그라운드 프리미엄 소프트 오라 (블러 글로우 오브) ── */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '350px',
        height: '350px',
        background: 'var(--orange)',
        filter: 'blur(160px)',
        opacity: 0.06,
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'var(--navy-2)',
        filter: 'blur(180px)',
        opacity: 0.12,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 20px' }}>
        
        {/* ── 섹션 상단 헤더 & 컨트롤 네비게이션 ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div className="reveal-text">
            <h2 className="title-dark" style={{ marginTop: '8px', fontWeight: 800 }}>Members</h2>
          </div>
          
          {/* 가로 스크롤 버튼 (데스크톱 및 패드 전용) */}
          <div className="member-nav-buttons" style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => scroll('left')}
              disabled={!showLeftArrow}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: showLeftArrow ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                color: showLeftArrow ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                cursor: showLeftArrow ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontSize: '1.25rem',
                outline: 'none'
              }}
              aria-label="Previous member"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!showRightArrow}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: showRightArrow ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                color: showRightArrow ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                cursor: showRightArrow ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontSize: '1.25rem',
                outline: 'none'
              }}
              aria-label="Next member"
            >
              →
            </button>
          </div>
        </div>

        {/* ── 멤버 가로 스크롤 컨테이너 ── */}
        <style>{`
          .member-scroll-wrapper {
            display: flex;
            gap: 24px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* 파이어폭스 스크롤바 숨김 */
            padding: 10px 4px 20px;
            -webkit-overflow-scrolling: touch; /* iOS 탄성 스크롤 활성화 */
            cursor: default;
          }
          .member-scroll-wrapper::-webkit-scrollbar {
            display: none; /* 크롬, 사파리, 엣지 스크롤바 숨김 */
          }
          
          /* 프리미엄 카드 디자인: 높은 대비와 미묘한 그라데이션 적용 */
          .member-premium-card {
            flex: 0 0 calc(33.333% - 16px);
            min-width: 320px;
            scroll-snap-align: start;
            background: linear-gradient(135deg, rgba(35, 49, 90, 0.95) 0%, rgba(18, 26, 50, 0.98) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 28px;
            padding: 44px 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          
          .member-premium-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(255, 95, 31, 0.15) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 0;
          }
          
          .member-premium-card:hover {
            transform: translateY(-10px);
            border-color: rgba(255, 95, 31, 0.7);
            background: linear-gradient(135deg, rgba(45, 62, 110, 0.95) 0%, rgba(24, 34, 65, 0.98) 100%);
            box-shadow: 0 32px 72px rgba(0, 0, 0, 0.65), 0 0 24px rgba(255, 95, 31, 0.25);
          }
          
          .member-premium-card:hover::before {
            opacity: 1;
          }
          
          /* 이미지 액자 스타일: 원래부터 흑백 필터 제거 (컬러 유지), 크기 키움 (180x226 -> 210x264) */
          .member-card-photo-wrap {
            width: 210px;
            height: 264px;
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 28px;
            position: relative;
            z-index: 1;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            background: rgba(255, 255, 255, 0.03);
          }
          
          .member-premium-card:hover .member-card-photo-wrap {
            transform: scale(1.04);
            box-shadow: 0 16px 40px rgba(255, 95, 31, 0.25);
          }

          /* 최민서 사진 270도 회전 적용 */
          .minseo-card .member-card-photo-wrap img {
            transform: rotate(270deg) scale(1.3);
            transform-origin: center;
          }
          
          .member-card-info {
            position: relative;
            z-index: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .member-card-name {
            font-size: 1.9rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 8px;
            letter-spacing: -0.03em;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .member-premium-card:hover .member-card-name {
            color: var(--orange);
          }

          /* 동물이름 인라인 스타일 */
          .member-card-animal-inline {
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--orange);
            letter-spacing: 0.05em;
            vertical-align: middle;
            background: rgba(255, 95, 31, 0.12);
            padding: 2px 8px;
            border-radius: 6px;
            display: inline-block;
          }
          
          .member-card-role-group {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 18px;
          }
          
          .member-card-role {
            font-size: 0.9rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.45);
            letter-spacing: 0.05em;
          }
          
          .member-card-bio {
            font-size: 0.98rem;
            line-height: 1.65;
            color: rgba(255, 255, 255, 0.6);
            margin: 0;
            height: 66px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            transition: color 0.3s ease;
          }
          
          .member-premium-card:hover .member-card-bio {
            color: rgba(255, 255, 255, 0.85);
          }

          /* 모바일/태블릿 반응형 좌우 터치 슬라이더 활성화 */
          @media (max-width: 991px) {
            .member-premium-card {
              flex: 0 0 72%;
              min-width: 290px;
              scroll-snap-align: center;
              padding: 32px 24px;
            }
            .member-nav-buttons {
              display: none !important; /* 모바일에서는 버튼 배제 */
            }
            .member-scroll-wrapper {
              scroll-padding: 0 20px;
            }
            .member-card-photo-wrap {
              width: 180px;
              height: 226px;
            }
          }
          
          @media (max-width: 480px) {
            .member-premium-card {
              flex: 0 0 85%;
            }
            .member-card-photo-wrap {
              width: 160px;
              height: 200px;
            }
            .member-card-name {
              font-size: 1.65rem;
            }
            .member-card-bio {
              font-size: 0.92rem;
              height: 60px;
            }
          }

          /* 모바일 전용 프리미엄 스크롤 가이드 라인 */
          .mobile-scroll-cue-bar {
            display: none;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-top: 24px;
          }

          .mobile-cue-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            transition: all 0.3s ease;
          }

          .mobile-cue-dot.active {
            width: 24px;
            border-radius: 4px;
            background: var(--orange);
          }

          .mobile-cue-text {
            font-size: 0.72rem;
            color: rgba(255, 255, 255, 0.35);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-right: 8px;
            font-weight: 700;
          }

          @media (max-width: 991px) {
            .mobile-scroll-cue-bar {
              display: flex;
            }
          }
        `}</style>

        {/* ── 멤버 가로 스크롤 컨테이너 ── */}
        <div 
          className="member-scroll-wrapper" 
          ref={scrollContainerRef}
        >
          {MEMBERS.map((m, i) => (
            <div 
              key={i} 
              className={`member-premium-card reveal-card ${m.name === '최민서' ? 'minseo-card' : ''}`} 
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="member-card-photo-wrap">
                <PhotoBox src={m.img} w="100%" h="100%" label="사진" />
              </div>
              <div className="member-card-info">
                <h3 className="member-card-name">
                  <span>{m.name}</span>
                  <span className="member-card-animal-inline">{m.animal}</span>
                </h3>
                <div className="member-card-role-group">
                  <span className="member-card-role">{m.role}</span>
                </div>
                <p className="member-card-bio">{m.bio || `${m.name}의 멋진 음악적 여정을 함께 지켜봐 주세요.`}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 모바일 전용 가로 스크롤 가이드 인디케이터 (단서 제공) ── */}
        <div className="mobile-scroll-cue-bar">
          <span className="mobile-cue-text">SWIPE ↔</span>
          {MEMBERS.map((_, idx) => (
            <div 
              key={idx} 
              className={`mobile-cue-dot ${activeIndex === idx ? 'active' : ''}`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
