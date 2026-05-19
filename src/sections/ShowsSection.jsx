// src/sections/ShowsSection.jsx
import React, { useState } from 'react';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';

export default function ShowsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section id="shows" className="section section-gray2 reveal" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="reveal-text" style={{ marginBottom: '3.5rem' }}>
          <h2 className="title">History</h2>
        </div>

        <style>{`
          .history-split-container {
            display: flex;
            gap: 48px;
            align-items: flex-start;
          }

          /* 왼쪽 리스트 영역 */
          .history-list {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .history-item {
            display: flex;
            align-items: center;
            padding: 24px 16px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            border-radius: 12px;
            margin-bottom: 4px;
          }

          .history-item:hover, .history-item.active {
            background: rgba(0, 0, 0, 0.02);
            padding-left: 24px;
          }

          .history-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%) scaleY(0.3);
            width: 4px;
            height: 60%;
            background: var(--orange);
            border-radius: 99px;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .history-item:hover::before, .history-item.active::before {
            opacity: 1;
            transform: translateY(-50%) scaleY(1);
          }

          .history-date {
            font-size: 1rem;
            font-weight: 800;
            color: var(--orange);
            width: 120px;
            flex-shrink: 0;
            letter-spacing: -0.01em;
          }

          .history-info-wrap {
            flex: 1;
            padding-right: 12px;
          }

          .history-item-title-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
            flex-wrap: wrap;
          }

          .history-item-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--navy);
            transition: color 0.3s ease;
          }

          .history-item:hover .history-item-title, .history-item.active .history-item-title {
            color: var(--orange);
          }

          .history-item-status {
            font-size: 0.68rem;
            font-weight: 800;
            background: var(--orange);
            color: #fff;
            padding: 2px 8px;
            border-radius: 99px;
            text-transform: uppercase;
          }

          .history-item-loc {
            font-size: 0.88rem;
            font-weight: 600;
            color: var(--text-2);
          }

          .history-item-desc {
            font-size: 0.95rem;
            color: var(--text-3);
            margin-top: 6px;
            line-height: 1.5;
            display: none; /* 데스크톱 기본 상태에선 우측 카드에 세부 내용이 표기되므로 간결하게 숨김 */
          }

          /* 오른쪽 비주얼 프리뷰 카드 */
          .history-preview-panel {
            width: 440px;
            position: sticky;
            top: 100px;
            flex-shrink: 0;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 28px;
            padding: 24px;
            box-shadow: var(--shadow-lg);
            display: flex;
            flex-direction: column;
            gap: 20px;
            transition: all 0.3s ease;
          }

          .history-preview-image-box {
            width: 100%;
            height: 280px;
            border-radius: 16px;
            overflow: hidden;
            background: var(--gray-2);
            position: relative;
            box-shadow: var(--shadow-sm);
          }

          .history-preview-img-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
            transform: scale(1.02);
          }

          .history-preview-img-layer.active {
            opacity: 1;
            transform: scale(1);
            z-index: 1;
          }

          .history-preview-details {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .history-preview-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--navy);
          }

          .history-preview-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-2);
          }

          .history-preview-desc {
            font-size: 0.98rem;
            line-height: 1.6;
            color: var(--text-3);
            margin: 6px 0 0 0;
          }

          /* ── 반응형 레이아웃 ── */
          @media (max-width: 991px) {
            .history-split-container {
              flex-direction: column-reverse; /* 모바일에서는 이미지를 상단 배치, 리스트를 하단 배치 */
              gap: 32px;
            }

            .history-preview-panel {
              width: 100%;
              position: relative;
              top: 0;
              padding: 20px;
            }

            .history-preview-image-box {
              height: 240px;
            }
          }

          @media (max-width: 640px) {
            .history-item {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }

            .history-date {
              width: auto;
            }

            .history-info-wrap {
              padding-right: 0;
            }

            .history-item-loc {
              margin-top: 2px;
            }
          }
        `}</style>

        <div className="history-split-container">
          {/* 왼쪽 연혁 텍스트 리스트 */}
          <div className="history-list">
            {SHOWS.map((s, i) => (
              <div 
                key={i} 
                className={`history-item reveal-card ${hoveredIdx === i ? 'active' : ''}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onClick={() => setHoveredIdx(i)} // 모바일 터치 대응
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="history-date">{s.date}</div>
                <div className="history-info-wrap">
                  <div className="history-item-title-row">
                    <h3 className="history-item-title">{s.name}</h3>
                    {s.status === 'upcoming' && (
                      <span className="history-item-status">Upcoming</span>
                    )}
                  </div>
                  <div className="history-item-loc">📍 {s.location}</div>
                  <p className="history-item-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽 호버 대응 이미지 & 상세 프리뷰 패널 */}
          <div className="history-preview-panel reveal-card">
            <div className="history-preview-image-box">
              {SHOWS.map((s, i) => (
                <div 
                  key={i} 
                  className={`history-preview-img-layer ${hoveredIdx === i ? 'active' : ''}`}
                >
                  <PhotoBox src={s.img} w="100%" h="100%" label="Show Moment" />
                </div>
              ))}
            </div>

            <div className="history-preview-details">
              <div className="history-preview-meta">
                <span>{SHOWS[hoveredIdx].date}</span>
                <span>•</span>
                <span>📍 {SHOWS[hoveredIdx].location}</span>
              </div>
              <h3 className="history-preview-title">{SHOWS[hoveredIdx].name}</h3>
              <p className="history-preview-desc">
                {SHOWS[hoveredIdx].desc || '당시의 멋진 활동 현장을 기록한 내용입니다.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
