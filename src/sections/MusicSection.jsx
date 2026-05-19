// src/sections/MusicSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import PhotoBox from '../components/PhotoBox';
import { TRACKS } from '../data/constants';

export default function MusicSection() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

      const cards = scrollContainerRef.current.querySelectorAll('.music-premium-card');
      if (cards.length > 0) {
        const cardWidth = cards[0].clientWidth;
        const gap = 24;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.max(0, Math.min(index, TRACKS.length - 1)));
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
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
    <section id="music" className="section section-gray2" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', position: 'relative' }}>
        
        {/* 헤더 영역 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div className="reveal-text">
            <h2 className="title" style={{ fontWeight: 800 }}>Music</h2>
          </div>
        </div>

        {/* ── 음악 가로 스크롤 캐러셀 영역 (좌우 플로팅 화살표 버튼 적용) ── */}
        <div className="music-carousel-relative-container" style={{ position: 'relative', width: '100%' }}>
          
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
            aria-label="Previous track"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 음악 가로 스크롤 컨테이너 */}
          <div className="music-scroll-wrapper" ref={scrollContainerRef}>
            {TRACKS.map((t, i) => (
              <div 
                key={i} 
                className="music-premium-card reveal-card"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {/* 미디어 영역 (YouTube iframe 혹은 앨범아트) */}
                <div className="music-card-media">
                  {t.isYT ? (
                    <div style={{ aspectRatio: '16/9', width: '100%' }}>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${t.link}?rel=0`}
                        title={t.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                      />
                    </div>
                  ) : (
                    <div style={{ background: '#111625', padding: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <PhotoBox src={t.img} w="100%" h="120px" label={t.title} fit="contain" />
                    </div>
                  )}
                </div>

                {/* 텍스트 정보 영역 */}
                <div className="music-card-body">
                  <div>
                    <p className="music-card-badge">{t.type}</p>
                    <h3 className="music-card-title">{t.title}</h3>
                  </div>
                  <a 
                    href={t.isYT ? `https://www.youtube.com/watch?v=${t.link}` : t.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="music-card-link"
                  >
                    {t.isYT ? '▶ YouTube에서 보기' : '▶ SoundCloud에서 듣기'}
                  </a>
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
            aria-label="Next track"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* ── 스타일 시트 ── */}
        <style>{`
          .music-scroll-wrapper {
            display: flex;
            gap: 24px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            padding: 30px 20px 40px; /* 그림자 잘림 방지용 패딩 */
            margin-top: -20px;
            margin-bottom: -20px;
            -webkit-overflow-scrolling: touch;
            cursor: default;
          }
          
          .music-scroll-wrapper::-webkit-scrollbar {
            display: none;
          }

          /* 음악 카드 프리미엄 컴팩트 스타일 */
          .music-premium-card {
            flex: 0 0 340px;
            min-width: 300px;
            scroll-snap-align: start;
            border-radius: 24px;
            overflow: hidden;
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .music-premium-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--orange);
          }

          .music-card-media {
            width: 100%;
            position: relative;
            background: #000;
          }

          .music-card-body {
            padding: 18px 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: space-between;
          }

          .music-card-badge {
            font-size: 0.72rem;
            font-weight: 800;
            color: var(--orange);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 6px;
          }

          .music-card-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: var(--navy);
            margin-bottom: 12px;
            line-height: 1.4;
          }

          .music-card-link {
            font-size: 0.82rem;
            font-weight: 700;
            color: var(--text-2);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: color 0.2s ease;
            text-decoration: none;
            width: fit-content;
          }

          .music-premium-card:hover .music-card-link {
            color: var(--orange);
          }

          /* 모바일 및 태블릿 레이아웃 */
          @media (max-width: 991px) {
            .music-premium-card {
              flex: 0 0 78%;
              min-width: 280px;
              scroll-snap-align: center;
            }
            .music-scroll-wrapper {
              scroll-padding: 0 20px;
            }
          }

          @media (max-width: 480px) {
            .music-premium-card {
              flex: 0 0 85%;
            }
          }

          /* 모바일 전용 가로 스크롤 가이드 */
          .music-scroll-cue-bar {
            display: none;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-top: 16px;
          }

          .music-cue-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }

          .music-cue-dot.active {
            width: 24px;
            border-radius: 4px;
            background: var(--orange);
          }

          .music-cue-text {
            font-size: 0.72rem;
            color: rgba(0, 0, 0, 0.3);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-right: 8px;
            font-weight: 700;
          }

          @media (max-width: 991px) {
            .music-scroll-cue-bar {
              display: flex;
            }
          }
        `}</style>

        {/* 모바일 전용 인디케이터 바 */}
        <div className="music-scroll-cue-bar">
          <span className="music-cue-text">SWIPE ↔</span>
          {TRACKS.map((_, idx) => (
            <div 
              key={idx} 
              className={`music-cue-dot ${activeIndex === idx ? 'active' : ''}`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
