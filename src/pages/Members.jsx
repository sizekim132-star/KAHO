// src/pages/Members.jsx
import React from 'react';

const membersData = [
  { name: '김치수', role: '리더 / 베이스 / 프로듀서', animal: '🐯' },
  { name: '심어진', role: '엔지니어 / 일렉기타', animal: '🐆' },
  { name: '김태린', role: '보컬 / 일렉기타', animal: '🐦' },
  { name: '최민서', role: '보컬 / 일렉기타', animal: '🐈‍⬛' },
  { name: '박어진', role: '건반 / 서기', animal: '🪶' },
  { name: '김민규', role: '드럼 / 편집', animal: '🐧' },
];

export default function Members({ isMinimal }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
      {membersData.map((m, i) => (
        <div key={i} style={{
          padding: '2rem',
          border: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#0F172A'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{m.animal}</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.3rem' }}>{m.name}</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{m.role}</p>
        </div>
      ))}
    </div>
  );
}
