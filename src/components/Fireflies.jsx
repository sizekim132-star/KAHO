// src/components/Fireflies.jsx
// 따뜻한 반딧불 파티클 효과
import React, { useEffect, useRef } from 'react';

export default function Fireflies({ count = 20 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 기존 파티클 제거
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'firefly';

      // 랜덤 위치
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;

      // 랜덤 크기 (2~6px)
      const size = 2 + Math.random() * 4;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      // 랜덤 애니메이션 딜레이 & 속도
      dot.style.animationDelay = `${Math.random() * 8}s`;
      dot.style.animationDuration = `${6 + Math.random() * 10}s`;

      // 주황 계열 랜덤 색상
      const hue = 20 + Math.random() * 25; // 20~45 (주황~골드)
      dot.style.setProperty('--firefly-color', `hsl(${hue}, 100%, 65%)`);

      container.appendChild(dot);
    }

    return () => { container.innerHTML = ''; };
  }, [count]);

  return <div ref={containerRef} className="fireflies-container" aria-hidden="true" />;
}
