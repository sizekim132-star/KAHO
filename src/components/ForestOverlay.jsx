// src/components/ForestOverlay.jsx
// 미니멀하고 고급스러운 나무 실루엣 + 스크롤 패럴렉스 인터랙션
import React from 'react';

// ── 나무 SVG 패스들 (미니멀한 실루엣 스타일) ──
const TreeSilhouette1 = ({ style, className }) => (
  <svg viewBox="0 0 120 300" fill="currentColor" style={style} className={className}>
    <path d="M60 0 C60 0, 20 80, 25 120 C28 140, 40 150, 50 160 C35 155, 15 180, 20 210 C23 230, 40 240, 55 248 L55 300 L65 300 L65 248 C80 240, 97 230, 100 210 C105 180, 85 155, 70 160 C80 150, 92 140, 95 120 C100 80, 60 0, 60 0Z" opacity="0.9"/>
    <rect x="56" y="248" width="8" height="52" rx="2" opacity="0.7"/>
  </svg>
);

const TreeSilhouette2 = ({ style, className }) => (
  <svg viewBox="0 0 160 350" fill="currentColor" style={style} className={className}>
    <ellipse cx="80" cy="100" rx="65" ry="80" opacity="0.85"/>
    <ellipse cx="60" cy="140" rx="50" ry="60" opacity="0.75"/>
    <ellipse cx="100" cy="150" rx="45" ry="55" opacity="0.7"/>
    <rect x="74" y="190" width="12" height="160" rx="3" opacity="0.6"/>
  </svg>
);

const TreeSilhouette3 = ({ style, className }) => (
  <svg viewBox="0 0 100 280" fill="currentColor" style={style} className={className}>
    <path d="M50 0 L15 100 L30 95 L5 180 L25 170 L0 260 L45 260 L45 280 L55 280 L55 260 L100 260 L75 170 L95 180 L70 95 L85 100 Z" opacity="0.8"/>
  </svg>
);

const Leaf = ({ style, className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.14 20C12.69 20 16.5 16.5 17 12C17.5 7.5 17 8 17 8Z" opacity="0.6"/>
  </svg>
);

const Branch = ({ style, className }) => (
  <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={style} className={className}>
    <path d="M0 30 Q50 28, 80 20 Q100 15, 130 22 Q150 26, 200 18" opacity="0.3"/>
    <path d="M80 20 Q90 5, 100 8" opacity="0.25"/>
    <path d="M130 22 Q140 10, 155 14" opacity="0.25"/>
  </svg>
);

export default function ForestOverlay({ scrollY = 0 }) {
  const progress = Math.min(scrollY / (typeof window !== 'undefined' ? window.innerHeight : 800), 1);

  return (
    <div className="forest-overlay" aria-hidden="true">
      {/* ── 배경 나무들 (깊은 레이어, 느리게 움직임) ── */}
      <TreeSilhouette2
        className="forest-tree forest-tree-bg"
        style={{
          position: 'absolute', left: '-5%', bottom: 0,
          width: '22vw', maxWidth: '280px',
          color: 'rgba(26, 39, 68, 0.08)',
          transform: `translateY(${progress * 60}px) scale(${1 + progress * 0.02})`,
          transition: 'transform 0.1s linear',
        }}
      />
      <TreeSilhouette1
        className="forest-tree forest-tree-bg"
        style={{
          position: 'absolute', right: '-2%', bottom: 0,
          width: '18vw', maxWidth: '220px',
          color: 'rgba(26, 39, 68, 0.06)',
          transform: `translateY(${progress * 80}px) scale(${1 + progress * 0.03})`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* ── 중간 나무들 ── */}
      <TreeSilhouette3
        className="forest-tree forest-tree-mid"
        style={{
          position: 'absolute', left: '8%', bottom: '-20px',
          width: '14vw', maxWidth: '180px',
          color: 'rgba(26, 39, 68, 0.12)',
          transform: `translateY(${progress * 40}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      <TreeSilhouette1
        className="forest-tree forest-tree-mid"
        style={{
          position: 'absolute', right: '10%', bottom: '-10px',
          width: '12vw', maxWidth: '160px',
          color: 'rgba(26, 39, 68, 0.10)',
          transform: `translateY(${progress * 50}px) rotate(${progress * 2}deg)`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* ── 전경 가지 ── */}
      <Branch
        className="forest-branch"
        style={{
          position: 'absolute', top: '15%', right: '-30px',
          width: '25vw', maxWidth: '300px',
          color: 'rgba(26, 39, 68, 0.15)',
          transform: `translateX(${-progress * 40}px) rotate(${-5 + progress * 8}deg)`,
          transition: 'transform 0.1s linear',
          transformOrigin: 'right center',
        }}
      />
      <Branch
        className="forest-branch"
        style={{
          position: 'absolute', top: '8%', left: '-40px',
          width: '22vw', maxWidth: '260px',
          color: 'rgba(26, 39, 68, 0.12)',
          transform: `translateX(${progress * 30}px) rotate(${180 + progress * 5}deg) scaleY(-1)`,
          transition: 'transform 0.1s linear',
          transformOrigin: 'left center',
        }}
      />

      {/* ── 떨어지는 잎사귀들 ── */}
      {[...Array(6)].map((_, i) => (
        <Leaf
          key={i}
          className={`forest-leaf forest-leaf-${i}`}
          style={{
            position: 'absolute',
            width: `${14 + i * 3}px`,
            color: i % 2 === 0 ? 'rgba(255, 95, 31, 0.25)' : 'rgba(26, 39, 68, 0.15)',
            left: `${10 + i * 15}%`,
            top: `${-5 + i * 3}%`,
            opacity: Math.max(0, 1 - progress * 1.5),
          }}
        />
      ))}
    </div>
  );
}
