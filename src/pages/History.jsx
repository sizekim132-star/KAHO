// src/pages/History.jsx
import React, { useState } from 'react';
import { FaTimes, FaPlay, FaImage } from 'react-icons/fa';

const historyData = [
  {
    date: '2025년 4월 22일',
    title: '까치와호랑이 조우',
    location: '지구 어느 숲속 방구석',
    audience: '운명적 만남',
    status: '완료',
    mediaType: 'image'
  },
  {
    date: '2025년 10월 19일',
    title: '제23회 허준축제',
    location: '마곡중앙로',
    audience: '100+ 명',
    status: '완료',
    mediaType: 'video'
  },
  {
    date: '2025년 10월 31일',
    title: '서울청년센터강서 할로윈축제',
    location: '서울청년센터강서',
    audience: '30+ 명',
    status: '완료',
    mediaType: 'image'
  },
  {
    date: '2026년 5월 7일',
    title: '청년예술인 네트워크 공연',
    location: '한국도로교통공단 강서운전면허시험장 광장',
    audience: '40~100명 수준',
    status: '진행 중',
    mediaType: 'none'
  }
];

export default function History() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderModal = () => {
    if (!selectedEvent) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)', /* 퓨어 화이트 반투명 커버 */
        zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem'
      }} onClick={() => setSelectedEvent(null)}>
        
        <div style={{
          padding: '4rem', maxWidth: '1200px', width: '100%', position: 'relative',
          border: '1px solid #000', backgroundColor: '#fff', boxShadow: '20px 20px 0px rgba(0,0,0,0.1)'
        }} onClick={(e) => e.stopPropagation()}>
          
          <button 
            onClick={() => setSelectedEvent(null)}
            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}>
            <FaTimes size={40} />
          </button>
          
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ color: 'var(--primary-orange)', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{selectedEvent.date}</span>
            <h2 style={{ fontSize: '3.5rem', marginTop: '0.5rem', color: '#000', fontWeight: 900, letterSpacing: '-2px' }}>{selectedEvent.title}</h2>
          </div>
          
          <div style={{ 
            backgroundColor: '#f5f5f5', width: '100%', height: '55vh', minHeight: '400px', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1.5rem',
            border: '1px solid #e5e5e5'
           }}>
             {selectedEvent.mediaType === 'video' ? <FaPlay size={80} color="#000" style={{opacity: 0.1}} /> : (selectedEvent.mediaType === 'image' ? <FaImage size={80} color="#000" style={{opacity: 0.1}} /> : null)}
             {selectedEvent.mediaType !== 'none' ? <h3 style={{ color: '#000', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '4px' }}>Media Box</h3> : <h3 style={{ color: 'var(--text-muted)' }}>예정된 일정입니다.</h3>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <div style={{ padding: '10rem 5vw', borderTop: '1px solid #000' }}>
        {renderModal()}

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>Band History<span style={{color: 'var(--primary-orange)'}}>.</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '6rem', fontWeight: 500 }}>
            까치와 호랑이가 대중과 소통해 온 발자취입니다. 카드를 클릭하여 갤러리를 감상하세요.
          </p>

          <div style={{ position: 'relative', paddingLeft: '4rem' }}>
            <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '1px', backgroundColor: '#000', opacity: '0.2' }}></div>

            {historyData.map((item, idx) => (
              <div key={idx} style={{ position: 'relative', marginBottom: '5rem' }}>
                
                <div style={{
                  position: 'absolute', left: '-4.6rem', top: '2.5rem', width: '16px', height: '16px',
                  backgroundColor: item.status === '진행 중' ? 'var(--primary-orange)' : '#ffffff',
                  borderRadius: item.status === '진행 중' ? '0' : '50%',
                  border: '2px solid #000'
                }}></div>

                <div style={{
                  padding: '3rem', 
                  borderLeft: '1px solid transparent',
                  borderTop: '1px solid transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff'
                }}
                onClick={() => setSelectedEvent(item)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeft = '4px solid #000';
                  e.currentTarget.style.borderTop = '1px solid #e5e5e5';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeft = '1px solid transparent';
                  e.currentTarget.style.borderTop = '1px solid transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ 
                        display: 'inline-block', padding: '0.4rem 0',
                        color: '#000',
                        fontSize: '0.9rem', fontWeight: 800, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px'
                      }}>
                        {item.date} {item.status === '진행 중' && <span style={{color: 'var(--primary-orange)', marginLeft: '1rem'}}>🔥 UPCOMING</span>}
                      </span>

                      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', color: '#000', letterSpacing: '-1px' }}>
                        {item.title}
                      </h2>
                    </div>
                    
                    <div style={{ color: '#000', display: 'flex', gap: '0.5rem', opacity: '0.2' }}>
                      {item.mediaType === 'video' && <FaPlay size={32} />}
                      {item.mediaType === 'image' && <FaImage size={32} />}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-main)', opacity: '0.8', fontSize: '1.1rem', backgroundColor: 'rgba(15, 23, 42, 0.02)', padding: '2rem', border: '1px solid #e5e5e5', fontWeight: 500, marginTop: '1rem' }}>
                    <p>📍 <strong style={{color:'#000'}}>LOCATION:</strong> {item.location}</p>
                    <p>👥 <strong style={{color:'#000'}}>AUDIENCE:</strong> {item.audience}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
