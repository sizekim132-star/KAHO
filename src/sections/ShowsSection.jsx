// src/sections/ShowsSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';
import { FiChevronDown } from 'react-icons/fi';

export default function ShowsSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height || 1;
      const startOffset = windowHeight * 0.7;
      const currentProgress = startOffset - rect.top;
      const percentage = Math.max(0, Math.min(100, (currentProgress / totalHeight) * 100));
      setScrollProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="shows" className="section section-gray2 reveal" ref={containerRef}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal-text">
          <h2 className="title" style={{ marginBottom: '3.5rem' }}>History</h2>
        </div>
        <div className="timeline-container">
          {/* Dynamic Scroll-linked Timeline Line */}
          <div className="timeline-line">
            <div className="timeline-line-inner" style={{ height: `${scrollProgress}%` }} />
          </div>

          {SHOWS.map((s, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div key={i} className="timeline-item reveal-card" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
                <div className="timeline-date-left reveal-text" style={{ transitionDelay: `${(i + 1) * 0.1 + 0.05}s` }}>{s.date}</div>
                <div className="timeline-dot"></div>
                <div 
                  className={`timeline-content ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => handleToggle(i)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div className="timeline-text-wrap" style={{ flex: 1, minWidth: 0 }}>
                      <div className="timeline-header" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {s.status === 'upcoming' && (
                          <span className={`timeline-status ${s.status}`}>
                            🔥 Upcoming
                          </span>
                        )}
                        <h3 
                          className="timeline-title" 
                          style={{ 
                            margin: 0, 
                            fontSize: 'clamp(1.05rem, 2.8vw, 1.45rem)', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                          }}
                        >
                          {s.name}
                        </h3>
                      </div>
                      <p className="timeline-location" style={{ margin: '6px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📍 {s.location}
                      </p>
                    </div>
                    <FiChevronDown 
                      size={20} 
                      style={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        color: 'var(--orange)',
                        flexShrink: 0
                      }} 
                    />
                  </div>

                  {/* Accordion Expandable Details */}
                  <div 
                    style={{
                      maxHeight: isExpanded ? '500px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: isExpanded ? '1.5rem' : '0px'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      gap: '2rem', 
                      alignItems: 'flex-start', 
                      flexWrap: 'wrap', 
                      paddingTop: '1.5rem', 
                      borderTop: '1px solid rgba(0,0,0,0.06)' 
                    }}>
                      <p className="timeline-desc" style={{ flex: 1, minWidth: '240px', margin: 0, fontSize: '0.98rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                        {s.desc}
                      </p>
                      {s.img && (
                        <div className="timeline-img-container" style={{ margin: 0, flexShrink: 0 }}>
                          <PhotoBox src={s.img} w="100%" h="100%" label="Show Moment" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
