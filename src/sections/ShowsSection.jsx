// src/sections/ShowsSection.jsx
import React, { useState } from 'react';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';

export default function ShowsSection() {
  const [selectedYear, setSelectedYear] = useState('2026');

  // 선택된 연도의 연혁만 필터링
  const filteredShows = SHOWS.filter((s) => s.date.startsWith(selectedYear));

  return (
    <section id="shows" className="section section-gray2 reveal">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        
        {/* 섹션 타이틀 */}
        <div className="reveal-text">
          <h2 className="title" style={{ marginBottom: '2.5rem' }}>History</h2>
        </div>

        {/* ── 연도별 아코디언 탭 (Filter) ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '4rem'
        }}>
          {['2026', '2025'].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              style={{
                padding: '12px 36px',
                borderRadius: '999px',
                fontSize: '1.05rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                border: selectedYear === year ? '1px solid var(--orange)' : '1px solid rgba(0, 0, 0, 0.08)',
                background: selectedYear === year ? 'var(--orange)' : '#ffffff',
                color: selectedYear === year ? '#ffffff' : 'var(--text-2)',
                boxShadow: selectedYear === year ? '0 8px 24px rgba(255, 95, 31, 0.22)' : '0 2px 6px rgba(0, 0, 0, 0.02)',
                outline: 'none'
              }}
            >
              {year}년
            </button>
          ))}
        </div>

        {/* ── 원복된 오리지널 타임라인 컨테이너 (필터된 항목만 렌더링) ── */}
        <div className="timeline-container">
          {filteredShows.map((s, i) => (
            <div key={i} className="timeline-item reveal-card" style={{ transitionDelay: `${(i + 1) * 0.15}s` }}>
              <div className="timeline-date-left reveal-text" style={{ transitionDelay: `${(i + 1) * 0.15 + 0.1}s` }}>
                {s.date}
              </div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text-wrap">
                  <div className="timeline-header">
                    {s.status === 'upcoming' && (
                      <span className={`timeline-status ${s.status}`}>
                        🔥 Upcoming
                      </span>
                    )}
                  </div>
                  <h3 className="timeline-title">{s.name}</h3>
                  <p className="timeline-location">📍 {s.location}</p>
                  <p className="timeline-desc">{s.desc}</p>
                </div>
                {s.img && (
                  <div className="timeline-img-container">
                    <PhotoBox src={s.img} w="100%" h="100%" label="Show Moment" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
