import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import PhotoBox from '../components/PhotoBox';

export default function MemberDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { members } = useData();

  const member = members.find(m => m.name === name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!member) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '100vh', background: 'var(--primary-navy)', color: 'white' }}>
        <h2>멤버를 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/')} className="btn" style={{ marginTop: '2rem' }}>홈으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--navy)', color: 'white', minHeight: '100vh', paddingTop: '80px', paddingBottom: '100px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', 
            padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', marginBottom: '2rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => Object.assign(e.target.style, { background: 'white', color: 'var(--navy)' })}
          onMouseLeave={e => Object.assign(e.target.style, { background: 'transparent', color: 'white' })}
        >
          ← 뒤로 가기
        </button>

        <div className="reveal-card" style={{ display: 'flex', flexDirection: 'column', gap: '30px', background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--orange)', boxShadow: '0 10px 30px rgba(255,95,31,0.3)' }}>
              <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <h1 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 900, color: 'white' }}>{member.name}</h1>
                <span style={{ fontSize: '1.5rem', background: 'var(--orange)', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', color: 'white' }}>{member.animal}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 20px 0', fontWeight: 600 }}>{member.role}</h2>
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--orange)' }}>About Me</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-wrap' }}>
              {member.bio || '아직 자기소개가 작성되지 않았습니다. 관리자 페이지에서 나만의 스토리를 추가해보세요!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
