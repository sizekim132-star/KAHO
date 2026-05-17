// src/components/BentoCard.jsx
import React, { useState } from 'react';

export default function BentoCard({ label, value, icon: Icon, sizeClass, socials = [] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bento-card ${sizeClass} reveal-card`} onClick={handleCopy}>
      <div className={`copy-toast ${copied ? 'active' : ''}`}>Copied!</div>
      <div className="bento-inner-container">
        <div className="bento-text-content">
          <div className="bento-header">
            <div className="icon-box">
              <Icon size={22} />
            </div>
            <p className="bento-label" style={{ fontSize: '.75rem', fontWeight: 800, color: 'var(--text-3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              {label}
            </p>
          </div>
          <h4 className="bento-value" style={{ fontWeight: 900, color: 'var(--navy)', marginTop: 12 }}>
            {value}
          </h4>
        </div>

        {socials.length > 0 && (
          <div className="bento-social-group">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ color: 'var(--text-3)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-3)'}
              >
                <s.icon className="bento-social-icon" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
