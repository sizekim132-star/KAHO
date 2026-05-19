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
      background: 'var(--gray-2)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '120px',
      paddingBottom: '140px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 20px' }}>
        
        {/* ── 섹션 상단 헤더 ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div className="reveal-text">
            <h2 className="title" style={{ marginTop: '8px', fontWeight: 800 }}>Members</h2>
          </div>
        </div>

        {/* ── 가로 스크롤 캐러셀 영역 (좌우 플로팅 화살표 버튼 적용) ── */}
        <div className="members-carousel-relative-container" style={{ position: 'relative', width: '100%' }}>
          
          {/* 플로팅 좌측 버튼 */}
          <button 
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '4px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--navy)',
              opacity: showLeftArrow ? 0.35 : 0,
              pointerEvents: showLeftArrow ? 'auto' : 'none',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.95';
              e.currentTarget.style.color = 'var(--orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.35';
              e.currentTarget.style.color = 'var(--navy)';
            }}
            aria-label="Previous member"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 멤버 가로 스크롤 컨테이너 */}
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

          {/* 플로팅 우측 버튼 */}
          <button 
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '4px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--navy)',
              opacity: showRightArrow ? 0.35 : 0,
              pointerEvents: showRightArrow ? 'auto' : 'none',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.95';
              e.currentTarget.style.color = 'var(--orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.35';
              e.currentTarget.style.color = 'var(--navy)';
            }}
            aria-label="Next member"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── 스타일 시트 ── */}
        <style>{`
          .member-scroll-wrapper {
            display: flex;
            gap: 24px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* 파이어폭스 스크롤바 숨김 */
            padding: 30px 20px 40px; /* 그림자 잘림 방지용 충분한 상하 패딩 */
            margin-top: -20px;
            margin-bottom: -20px;
            -webkit-overflow-scrolling: touch; /* iOS 탄성 스크롤 활성화 */
            cursor: default;
          }
          .member-scroll-wrapper::-webkit-scrollbar {
            display: none; /* 크롬, 사파리, 엣지 스크롤바 숨김 */
          }
          
          /* 프리미엄 카드 디자인: 밝은 톤의 정갈한 대비 적용 */
          .member-premium-card {
            flex: 0 0 calc(33.333% - 16px);
            min-width: 330px;
            scroll-snap-align: start;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 28px;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          }
          
          .member-premium-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(255, 95, 31, 0.04) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 0;
          }
          
          .member-premium-card:hover {
            transform: translateY(-10px);
            border-color: rgba(255, 95, 31, 0.4);
            background: #ffffff;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 0 24px rgba(255, 95, 31, 0.08);
          }
          
          .member-premium-card:hover::before {
            opacity: 1;
          }
          
          /* 이미지 액자 스타일: 카드 좌우에 거의 꽉 채워 크게 노출 */
          .member-card-photo-wrap {
            width: 290px;
            height: 360px;
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            background: rgba(0, 0, 0, 0.02);
          }
          
          .member-premium-card:hover .member-card-photo-wrap {
            transform: scale(1.04);
            box-shadow: 0 16px 40px rgba(255, 95, 31, 0.15);
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
            color: var(--navy);
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
            background: rgba(255, 95, 31, 0.08);
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
            color: var(--text-3);
            letter-spacing: 0.05em;
          }
          
          .member-card-bio {
            font-size: 0.98rem;
            line-height: 1.65;
            color: var(--text-2);
            margin: 0;
            height: 66px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            transition: color 0.3s ease;
          }
          
          .member-premium-card:hover .member-card-bio {
            color: var(--navy);
          }

          /* 모바일/태블릿 반응형 좌우 터치 슬라이더 활성화 */
          @media (max-width: 991px) {
            .member-premium-card {
              flex: 0 0 72%;
              min-width: 290px;
              scroll-snap-align: center;
              padding: 20px 16px;
            }
            .member-scroll-wrapper {
              scroll-padding: 0 20px;
            }
            .member-card-photo-wrap {
              width: 250px;
              height: 310px;
            }
          }
          
          @media (max-width: 480px) {
            .member-premium-card {
              flex: 0 0 85%;
            }
            .member-card-photo-wrap {
              width: 240px;
              height: 300px;
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
            background: rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }

          .mobile-cue-dot.active {
            width: 24px;
            border-radius: 4px;
            background: var(--orange);
          }

          .mobile-cue-text {
            font-size: 0.72rem;
            color: rgba(0, 0, 0, 0.3);
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
