// src/sections/ShowsSection.jsx
import React from 'react';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';

export default function ShowsSection() {
  return (
    <section id="shows" className="section section-gray2 reveal">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal-text">
          <h2 className="title" style={{ marginBottom: '3.5rem' }}>History</h2>
        </div>
        <div className="timeline-container">
          {SHOWS.map((s, i) => (
            <div key={i} className="timeline-item reveal-card" style={{ transitionDelay: `${(i + 1) * 0.15}s` }}>
              <div className="timeline-date-left reveal-text" style={{ transitionDelay: `${(i + 1) * 0.15 + 0.1}s` }}>{s.date}</div>
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
