// src/pages/History.jsx
import React from 'react';

const tourData = [
  { date: '2025년 10월 19일', city: '서울 마곡', venue: '제23회 허준축제', status: 'done' },
  { date: '2025년 10월 31일', city: '서울 강서', venue: '서울청년센터 할로윈', status: 'done' },
  { date: '2026년 5월 7일', city: '서울 강서', venue: '청년예술인 네트워크 공연', status: 'upcoming' },
];

export default function History({ isMinimal }) {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #0F172A' }}>
            {['Date', 'City', 'Venue', 'Tickets'].map(h => (
              <th key={h} style={{ padding: '0.8rem 0', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', textAlign: h === 'Tickets' ? 'right' : 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tourData.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '1.1rem 0', fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>{item.date}</td>
              <td style={{ padding: '1.1rem 0', fontSize: '0.88rem', color: '#1e293b' }}>{item.city}</td>
              <td style={{ padding: '1.1rem 0', fontSize: '0.88rem', color: '#64748b' }}>{item.venue}</td>
              <td style={{ padding: '1.1rem 0', textAlign: 'right' }}>
                {item.status === 'upcoming' ? (
                  <button style={{
                    padding: '5px 14px',
                    backgroundColor: '#FF5500',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                  }}>Buy Tickets</button>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>Ended</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
