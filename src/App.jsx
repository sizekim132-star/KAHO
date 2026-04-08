import { useState } from 'react';
import './index.css';
import PhotoSorterTool from './pages/PhotoSorterTool';

function App() {
  const [showSorter, setShowSorter] = useState(false);

  // 분류기에 진입한 상태면 Sorter를 렌더링
  if (showSorter) {
    return <PhotoSorterTool onBack={() => setShowSorter(false)} />;
  }

  // 기본 홈페이지 렌더링
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav style={{ padding: 'var(--spacing-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
          BAND<span style={{color: 'var(--primary-orange)'}}>.</span>
        </h2>
        <div style={{ display: 'flex', gap: '2.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          <span style={{ cursor: 'pointer', color: 'var(--primary-navy)' }}>Members</span>
          <span style={{ cursor: 'pointer' }}>Music</span>
          <span style={{ cursor: 'pointer' }}>Gallery</span>
        </div>
      </nav>

      <main style={{ padding: '0 var(--spacing-main)', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header Section (Hero) */}
        <section style={{ marginTop: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: '900px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              We define the<br/>
              <span style={{ color: 'var(--primary-orange)' }}>Modern Pop</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', fontWeight: 400, maxWidth: '600px' }}>
              세련된 감각과 자유로운 에너지가 교차하는 순간. <br/>
              우리의 음악은 새로운 기준이 됩니다.
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div 
            className="placeholder-img" 
            style={{ width: '100%', height: '65vh', marginTop: '3rem' }}>
            [ 킬러 샷 메인 사진 영역 (추후 교체) ]
          </div>
        </section>

        {/* Gallery Section */}
        <section style={{ marginTop: '10rem', marginBottom: '10rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem' }}>Recent Moments</h2>
            
            {/* ✨ 초고속 사진 분류기 진입 버튼 ✨ */}
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '1.1rem', padding: '16px 32px' }}
              onClick={() => setShowSorter(true)}
            >
              🛠️ 갤러리 정리기 (사진 초고속 분류 도구) 열기
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="placeholder-img" style={{ height: '400px', borderRadius: 'var(--border-radius-md)' }}>
                  [ 공연 보정완료 사진 {item} ]
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>Live Highlight {item}</h3>
                <p style={{ color: 'var(--text-muted)' }}>2025. {item}. 14</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
