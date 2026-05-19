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
        
        {/* 헤더 영역 및 가로 스크롤 버튼 */}
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
          
          {/* 가로 스크롤 버튼 (데스크톱 및 태블릿 전용) */}
          <div className="music-nav-buttons" style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => scroll('left')}
              disabled={!showLeftArrow}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: showLeftArrow ? '#ffffff' : 'rgba(0, 0, 0, 0.02)',
                color: showLeftArrow ? 'var(--navy)' : 'rgba(0, 0, 0, 0.2)',
                cursor: showLeftArrow ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: showLeftArrow ? '0 2px 8px rgba(0, 0, 0, 0.05)' : 'none'
              }}
              aria-label="Previous track"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!showRightArrow}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: showRightArrow ? '#ffffff' : 'rgba(0, 0, 0, 0.02)',
                color: showRightArrow ? 'var(--navy)' : 'rgba(0, 0, 0, 0.2)',
                cursor: showRightArrow ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: showRightArrow ? '0 2px 8px rgba(0, 0, 0, 0.05)' : 'none'
              }}
              aria-label="Next track"
            >
              →
            </button>
          </div>
        </div>

        {/* ── 음악 가로 스크롤 컨테이너 ── */}
        <style>{`
          .music-scroll-wrapper {
            display: flex;
            gap: 24px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            padding: 10px 4px 24px;
            -webkit-overflow-scrolling: touch;
            cursor: default;
          }
          
          .music-scroll-wrapper::-webkit-scrollbar {
            display: none;
          }

          /* 음악 카드 프리미엄 스타일 */
          .music-premium-card {
            flex: 0 0 380px;
            min-width: 320px;
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
            padding: 28px 24px;
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
            margin-bottom: 8px;
          }

          .music-card-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: var(--navy);
            margin-bottom: 20px;
            line-height: 1.4;
          }

          .music-card-link {
            font-size: 0.85rem;
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
              min-width: 290px;
              scroll-snap-align: center;
            }
            .music-nav-buttons {
              display: none !important;
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
                  <div style={{ background: '#111625', padding: '24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PhotoBox src={t.img} w="100%" h="180px" label={t.title} fit="contain" />
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
