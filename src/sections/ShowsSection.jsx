// src/sections/ShowsSection.jsx
import React, { useState, useEffect } from 'react';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';

const YEARS = ['2025', '2026'];

export default function ShowsSection() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [animate, setAnimate] = useState(true);
  const [expandedKey, setExpandedKey] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handleYearSelect = (year) => {
    if (selectedYear === year) return;
    setAnimate(false);
    setExpandedKey(null);
    setTimeout(() => {
      setSelectedYear(year);
      setTimeout(() => setAnimate(true), 40);
    }, 220);
  };

  const toggleExpand = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const filteredShows = SHOWS.filter((s) => s.date.startsWith(selectedYear));

  return (
    <section id="shows" className="section section-gray2 reveal history-section">
      <div className="history-inner">
        <div className="reveal-text">
          <h2 className="title history-title">History</h2>
        </div>

        <div className="history-year-tabs" role="tablist" aria-label="연도 선택">
          {YEARS.map((year) => {
            const isActive = selectedYear === year;
            return (
              <button
                key={year}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`history-year-tab${isActive ? ' is-active' : ''}`}
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </button>
            );
          })}
        </div>

        <div className={`history-list-wrap${animate ? ' is-visible' : ''}`}>
          <ul className="history-list">
            {filteredShows.map((s, i) => {
              const key = `${selectedYear}-${s.date}-${s.name}`;
              const isExpanded = expandedKey === key;
              return (
                <li key={key} className="history-list-item" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <article
                    className={`history-card${isExpanded ? ' is-expanded' : ''}${s.img ? '' : ' history-card--no-img'}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => toggleExpand(key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpand(key);
                      }
                    }}
                  >
                    <div className="history-card-media">
                      {s.img ? (
                        <div 
                          className="history-card-img-click"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(s.img);
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label="사진 크게 보기"
                        >
                          <PhotoBox src={s.img} w="100%" h="100%" label="Show Moment" position={s.imgPosition || 'center'} />
                          <div className="zoom-overlay">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          </div>
                        </div>
                      ) : null}
                      <div className="history-card-gradient" aria-hidden />
                      <div className="history-card-body">
                        <div className="history-card-meta">
                          <time className="history-card-date" dateTime={s.date.replace(/\./g, '-')}>
                            {s.date}
                          </time>
                          {s.status === 'upcoming' && (
                            <span className="history-card-badge">Upcoming</span>
                          )}
                        </div>
                        <h3 className="history-card-name">{s.name}</h3>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="lightbox-close" 
            onClick={() => setSelectedImage(null)}
            aria-label="닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Show Large View" className="lightbox-img" />
          </div>
        </div>
      )}
    </section>
  );
}
