// src/components/PhotoBox.jsx
import React from 'react';

export default function PhotoBox({ src, w, h, label, alt, fit = 'cover', position = 'center' }) {
  if (src) {
    return (
      <div style={{ width: w, height: h, overflow: 'hidden', borderRadius: 'inherit', position: 'relative' }}>
        <img
          src={src}
          alt={alt || label}
          style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: position, display: 'block' }}
        />
      </div>
    );
  }
  return (
    <div className="photo-box" style={{ width: w || '100%', height: h || '100%' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
      <span>{label || '사진 추가'}</span>
    </div>
  );
}
