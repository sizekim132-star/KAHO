// src/sections/ShowsSection.jsx
import React, { useState } from 'react';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';

const YEARS = ['2026', '2025'];

export default function ShowsSection() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [animate, setAnimate] = useState(true);
  const [expandedKey, setExpandedKey] = useState(null);

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
                        <PhotoBox src={s.img} w="100%" h="100%" label="Show Moment" />
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
                        <p className="history-card-location">{s.location}</p>
                        {s.desc && <p className="history-card-desc">{s.desc}</p>}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
