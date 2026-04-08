// src/pages/History.jsx
import React from 'react';

const tourData = [
  { date: 'Feb 13', city: 'Chaerlote', venue: 'Open Dry' },
  { date: 'Feb 17', city: 'New York', venue: 'Barsen Theatre' },
  { date: 'Feb 17', city: 'Mormorada', venue: 'The Theotry' },
  { date: 'Feb 18', city: 'Doratina', venue: 'The Theotry' },
  { date: 'Feb 29', city: 'Benchest', venue: 'The South Center' },
  { date: 'Feb 23', city: 'Daslon', venue: 'Love hind' },
  { date: 'Feb 21', city: 'New York', venue: 'The Theotry' },
];

export default function History({ isMinimal }) {
  if (isMinimal) {
    return (
      <div style={{ borderTop: '1px solid #000' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
              <th style={{ padding: '1.5rem 0' }}>Date</th>
              <th style={{ padding: '1.5rem 0' }}>City</th>
              <th style={{ padding: '1.5rem 0' }}>Venue</th>
              <th style={{ padding: '1.5rem 0', textAlign: 'right' }}>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {tourData.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1.2rem 0', fontSize: '1rem', fontWeight: 600 }}>{item.date}</td>
                <td style={{ padding: '1.2rem 0', fontSize: '1rem', color: '#000' }}>{item.city}</td>
                <td style={{ padding: '1.2rem 0', fontSize: '1rem', color: 'var(--text-muted)' }}>{item.venue}</td>
                <td style={{ padding: '1.2rem 0', textAlign: 'right' }}>
                  <button style={{ 
                    padding: '6px 16px', backgroundColor: 'var(--primary-orange)', color: '#fff', 
                    border: 'none', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer' 
                  }}>
                    Buy Tickets
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div>Full History View (Not used in Classic Layout)</div>;
}
