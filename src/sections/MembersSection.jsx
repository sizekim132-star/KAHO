// src/sections/MembersSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoBox from '../components/PhotoBox';
import { useData } from '../contexts/DataContext';

export default function MembersSection() {
  const navigate = useNavigate();
  const { members } = useData();
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
        // members 배열 길이를 사용하도록 변경
        setActiveIndex(Math.max(0, Math.min(index, cards.length - 1)));
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
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
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
            <h2 className="title" style={{ marginTop: '8px', fontWeight: 800 }}>Artists</h2>
          </div>
        </div>

        {/* ── 멤버 가로 스크롤 캐러셀 영역 ── */}
        <div className="members-carousel-relative-container" style={{ position: 'relative', width: '100%' }}>
          <div 
            className="member-scroll-wrapper" 
            ref={scrollContainerRef}
          >
            {members.map((m, i) => (
              <div 
                key={i} 
                className={`member-premium-card reveal-card ${m.name === '최민서' ? 'minseo-card' : ''}`} 
                style={{ transitionDelay: `${i * 0.12}s` }}
                // onClick={() => navigate(`/member/${m.name}`)} // TODO: 상세페이지 완성 후 복구
              >
                <div className="member-card-photo-wrap">
                  <PhotoBox src={m.img} w="100%" h="100%" label="사진" />
                </div>
                <div className="member-card-overlay" />
                <div className="member-card-info">
                  <h3 className="member-card-name">{m.name}</h3>
                  <div className="member-card-role-group">
                    <span className="member-card-role">{m.role}</span>
                  </div>
                  {m.bio && <p className="member-card-bio">{m.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 컨트롤러 및 인디케이터 바 (답답하지 않게 조그맣고 고급스럽게 통합) ── */}
        <div className="carousel-control-bar">
          <button 
            onClick={() => scroll('left')}
            className="control-arrow-btn"
            style={{ opacity: showLeftArrow ? 0.6 : 0.15, pointerEvents: showLeftArrow ? 'auto' : 'none' }}
            aria-label="Previous member"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className="control-dots">
            {members.map((_, idx) => (
              <div 
                key={idx} 
                className={`control-dot ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cards = scrollContainerRef.current.querySelectorAll('.member-premium-card');
                    if (cards[idx]) {
                      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }
                }}
              />
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="control-arrow-btn"
            style={{ opacity: showRightArrow ? 0.6 : 0.15, pointerEvents: showRightArrow ? 'auto' : 'none' }}
            aria-label="Next member"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* 파이어폭스 스크롤바 숨김 */
            padding: 16px 20px 24px; /* 마일드한 그림자 맞춤 패딩 */
            margin-left: -20px;
            margin-right: -20px;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: contain;
          }
          .member-scroll-wrapper::-webkit-scrollbar {
            display: none;
          }
          .member-premium-card {
            flex: 0 0 calc(33.333% - 16px);
            min-width: 330px;
            height: 480px;
            scroll-snap-align: start;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 0px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .member-premium-card:hover {
            transform: translateY(-6px);
            border-color: rgba(255, 95, 31, 0.4);
            box-shadow: 0 12px 30px rgba(255, 95, 31, 0.15);
          }
          
          /* 카드 이미지 100% 꽉 채우기 */
          .member-card-photo-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            inset: 0;
            z-index: 1;
            background: rgba(0, 0, 0, 0.02);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .member-card-photo-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }

          .member-premium-card:hover .member-card-photo-wrap img {
            transform: scale(1.08);
          }
          


          /* 주황빛 그라데이션 오버레이 */
          .member-card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 30%, rgba(255, 95, 31, 0.3) 60%, rgba(0, 0, 0, 0.9) 100%);
            opacity: 0;
            z-index: 2;
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
          }
          
          .member-premium-card:hover .member-card-overlay {
            opacity: 1;
          }
          
          /* 정보 오버레이 (카드 위에 떠오름) */
          .member-card-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 3;
            padding: 30px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
          }
          
          .member-premium-card:hover .member-card-info {
            opacity: 1;
            transform: translateY(0);
          }
          
          .member-card-name {
            font-size: 2.1rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 4px;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }
          
          .member-card-role-group {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0;
          }
          
          .member-card-role {
            font-size: 1rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.85);
            letter-spacing: 0.05em;
            text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          
          .member-card-bio {
            display: none;
          }
          
          /* 모바일/태블릿 반응형 좌우 터치 슬라이더 활성화 */
          @media (max-width: 991px) {
            .member-premium-card {
              flex: 0 0 72%;
              min-width: 290px;
              height: 420px;
              scroll-snap-align: center;
              touch-action: pan-x;
            }
            .member-scroll-wrapper {
              scroll-padding: 0 20px;
              touch-action: pan-x;
            }
          }
          @media (max-width: 480px) {
            .member-premium-card {
              flex: 0 0 85%;
              height: 380px;
            }
            .member-card-name {
              font-size: 1.8rem;
            }
            .member-card-role {
              font-size: 0.95rem;
            }
          }

          /* 컨트롤 툴바 디자인 */
          .carousel-control-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            margin-top: 32px;
          }

          .control-arrow-btn {
            background: none;
            border: none;
            color: var(--navy);
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justifyContent: center;
            transition: all 0.3s ease;
          }

          .control-arrow-btn:hover {
            color: var(--orange);
            transform: scale(1.15);
          }

          .control-dots {
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .control-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.08);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .control-dot.active {
            width: 24px;
            border-radius: 4px;
            background: var(--orange);
          }
        `}</style>

      </div>
    </section>
  );
}
