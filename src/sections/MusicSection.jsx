// src/sections/MusicSection.jsx
import React from 'react';
import PhotoBox from '../components/PhotoBox';
import { TRACKS, CLOUD_VIDEOS } from '../data/constants';

// YouTube 썸네일 URL 생성 (레터박스 없는 고해상도)
function ytThumb(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

// 피드 아이템 데이터: 트랙 + 클라우드 비디오 합쳐서 그리드 채우기
function buildFeedItems() {
  const items = [];

  // 트랙 데이터
  TRACKS.forEach(t => {
    if (t.isYT) {
      items.push({
        type: 'video',
        thumb: ytThumb(t.link),
        url: `https://www.youtube.com/watch?v=${t.link}`,
        title: t.title,
      });
    } else {
      items.push({
        type: 'audio',
        thumb: t.img,
        url: t.link,
        title: t.title,
      });
    }
  });

  return items;
}

export default function MusicSection() {
  const feedItems = buildFeedItems();

  return (
    <section id="music" className="section section-gray2" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>

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
            <h2 className="title" style={{ fontWeight: 800 }}>Feed</h2>
          </div>
        </div>

        {/* ── 인스타그램 스타일 3열 그리드 ── */}
        <div className="feed-grid reveal-card">
          {feedItems.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="feed-grid-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* 썸네일 or 비디오 */}
              {item.type === 'cloud' ? (
                <video
                  src={item.videoUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="feed-grid-media"
                  onMouseEnter={e => e.currentTarget.play()}
                  onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                />
              ) : (
                <div className="feed-grid-media-wrap">
                  <PhotoBox src={item.thumb} w="100%" h="100%" label={item.title} />
                </div>
              )}

              {/* 재생 아이콘 (비디오/오디오) */}
              {(item.type === 'video' || item.type === 'cloud') && (
                <div className="feed-play-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              )}

              {/* 호버 오버레이 */}
              <div className="feed-grid-overlay" />
            </a>
          ))}
        </div>

        {/* ── 스타일 시트 ── */}
        <style>{`
          .feed-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }

          .feed-grid-item {
            position: relative;
            aspect-ratio: 1 / 1;
            overflow: hidden;
            cursor: pointer;
            display: block;
            background: #111;
          }

          .feed-grid-media {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .feed-grid-media-wrap {
            width: 100%;
            height: 100%;
            position: absolute;
            inset: 0;
          }

          .feed-grid-media-wrap > div {
            width: 100%;
            height: 100%;
          }

          .feed-grid-media-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .feed-grid-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0);
            transition: background 0.3s ease;
            pointer-events: none;
          }

          .feed-grid-item:hover .feed-grid-overlay {
            background: rgba(0, 0, 0, 0.15);
          }

          .feed-grid-item:hover .feed-grid-media,
          .feed-grid-item:hover .feed-grid-media-wrap img {
            transform: scale(1.05);
          }

          .feed-play-icon {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.85;
            filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
            pointer-events: none;
            z-index: 2;
          }

          @media (max-width: 768px) {
            .feed-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 0;
            }
          }

          @media (max-width: 480px) {
            .feed-grid {
              gap: 0;
            }
          }
        `}</style>

      </div>
    </section>
  );
}
