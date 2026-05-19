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

        {/* ── 음악 가로 스크롤 캐러셀 영역 ── */}
        <div className="music-carousel-relative-container" style={{ position: 'relative', width: '100%' }}>
          
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
        </div>

        {/* ── 컨트롤러 및 인디케이터 바 (답답하지 않게 조그맣고 고급스럽게 통합) ── */}
        <div className="carousel-control-bar">
          <button 
            onClick={() => scroll('left')}
            className="control-arrow-btn"
            style={{ opacity: showLeftArrow ? 0.6 : 0.15, pointerEvents: showLeftArrow ? 'auto' : 'none' }}
            aria-label="Previous track"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className="control-dots">
            {TRACKS.map((_, idx) => (
              <div 
                key={idx} 
                className={`control-dot ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cards = scrollContainerRef.current.querySelectorAll('.music-premium-card');
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
            aria-label="Next track"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            padding: 16px 20px 24px; /* 마일드한 그림자 맞춤 패딩 */
            margin-top: -12px;
            margin-bottom: -12px;
            -webkit-overflow-scrolling: touch;
            cursor: default;
          }
          
          .music-scroll-wrapper::-webkit-scrollbar {
            display: none;
          }

          /* 음악 카드 프리미엄 컴팩트 스타일: 그림자 약화로 경계선이 안 잘리게 함 */
          .music-premium-card {
            flex: 0 0 340px;
            min-width: 300px;
            scroll-snap-align: start;
            border-radius: 24px;
            overflow: hidden;
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .music-premium-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
            border-color: rgba(255, 95, 31, 0.3);
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
