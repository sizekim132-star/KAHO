// src/pages/Members.jsx
import React from 'react';

const membersData = [
  { name: '김치수', animal: '호랑이 🐯', role: '리더 / 베이스 / 프로듀서', joined: '2025. 04. 12', desc: '까치와호랑이의 척추. 곡을 만들고 무대를 장악하는 리더.' },
  { name: '심어진', animal: '치타 🐆', role: '엔지니어 / 일렉기타', joined: '2025. 05. 08', desc: '날카롭고 자유분방하게 질주하는 속주 엔지니어.' },
  { name: '김태린', animal: '까치 🐦', role: '보컬 / 일렉기타', joined: '2025. 08. 13', desc: '사람들의 시선을 끌어당기는 매력적인 보컬 요소.' },
  { name: '최민서', animal: '고양이 🐈‍⬛', role: '보컬 / 일렉기타', joined: '2025. 04. 18', desc: '무대를 종횡무진 누비며 노래하는 자유로운 고양이.' },
  { name: '박어진', animal: '참새 🪶', role: '건반 / 서기', joined: '2024. 09. 26', desc: '가장 오래 전부터 내실을 다져온 건반과 꼼꼼한 서기.' },
  { name: '김민규', animal: '펭귄 🐧', role: '드럼 / 편집', joined: '2026. 03. 10', desc: '묵묵히 우리 밴드의 단단한 심장박동을 책임지는 드럼.' },
];

export default function Members() {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      
      {/* 다시 영상 터져나오는 공간 (마치 다른 섹션으로 넘어가는 듯한 환기) */}
      <div style={{ height: '20vh', width: '100vw' }}></div>

      {/* 퓨어 화이트 덩어리 */}
      <div style={{ backgroundColor: '#ffffff', padding: '8rem 5vw', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>Band Members<span style={{color: 'var(--primary-orange)'}}>.</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '6rem', fontWeight: 500 }}>
            자유로운 까치와 맹렬한 호랑이들의 세계관입니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
            {membersData.map((member, idx) => (
              <div key={idx} style={{
                padding: '3rem',
                border: '1px solid #e5e5e5', /* 아주 얇은 선으로만 구획 나눔 */
                transition: 'all 0.3s ease',
                cursor: 'default',
                backgroundColor: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid #000';
                e.currentTarget.style.boxShadow = '10px 10px 0px rgba(255, 85, 0, 0.1)'; /* 미니멀한 솔리드 섀도우 */
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid #e5e5e5';
                e.currentTarget.style.boxShadow = 'none';
              }}>

                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{member.animal.split(' ')[1]}</div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#000', fontWeight: 900 }}>{member.name}</h2>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-orange)', fontWeight: 800, marginBottom: '2.5rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{member.animal.split(' ')[0]}</h3>
                
                <div style={{ marginBottom: '2.5rem', borderLeft: '3px solid #000', paddingLeft: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '1px' }}>POSITION</p>
                  <p style={{ fontWeight: 900, fontSize: '1.2rem', color: '#000' }}>{member.role}</p>
                </div>

                <p style={{ color: 'var(--text-main)', opacity: 0.9, lineHeight: 1.8, fontSize: '1.1rem', minHeight: '60px', fontWeight: 500 }}>
                  {member.desc}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e5e5' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>CAPTURED: {member.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
