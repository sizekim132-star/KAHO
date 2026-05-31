// src/sections/ShowsSection.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import PhotoBox from '../components/PhotoBox';
import { SHOWS } from '../data/constants';

export default function ShowsSection() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [animate, setAnimate] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 연도 선택 핸들러: 페이드아웃 후 데이터 스왑 & 페이드인 애니메이션 오케스트레이션
  const handleYearSelect = (year) => {
    if (selectedYear === year) return;
    setExpandedItems({}); // 연도 변경 시 펼침 상태 초기화

    if (!selectedYear) {
      // 최초 선택 시 즉시 로드 후 애니메이션
      setSelectedYear(year);
      setTimeout(() => {
        setAnimate(true);
      }, 50);
    } else {
      // 이미 연도가 선택된 상태라면 페이드아웃 후 전환
      setAnimate(false);
      setTimeout(() => {
        setSelectedYear(year);
        setTimeout(() => {
          setAnimate(true);
        }, 50);
      }, 300); // transition 시간과 맞춰 자연스럽게 스왑
    }
  };

  // 선택된 연도의 내역만 필터링
  const filteredShows = selectedYear ? SHOWS.filter((s) => s.date.startsWith(selectedYear)) : [];

  return (
    <section id="shows" className="section section-gray2 reveal" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* 섹션 타이틀 */}
        <div className="reveal-text">
          <h2 className="title" style={{ marginBottom: '2.5rem' }}>History</h2>
        </div>

        {/* ── 고급스럽고 미니멀한 연도 필터 셀렉터 (Typography & Line) ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginBottom: '4rem'
        }}>
          {['2025', '2026'].map((year) => {
            const isActive = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: isActive ? 'var(--orange)' : 'var(--text-3)',
                  opacity: isActive ? 1 : 0.35,
                  cursor: 'pointer',
                  padding: '10px 16px',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {year}
                {/* 활성화된 연도 밑에 깔리는 미니멀 언더라인 */}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isActive ? '36px' : '0px',
                  height: '2px',
                  background: 'var(--orange)',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
              </button>
            );
          })}
        </div>

        {/* 애니메이션 트랜지션용 CSS 선언 */}
        <style>{`
          /* 개별 타임라인 아이템 순차적 애니메이션 */
          .timeline-item-anim {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          /* 연도 변경 시 부모의 animate-in 클래스에 반응 */
          .timeline-wrapper.animate-in .timeline-item-anim {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* 스크롤 시 reveal 클래스 결합 처리 (기존 애니메이션 복구) */
          .reveal .timeline-item-anim {
            opacity: 0;
            transform: translateY(30px);
          }
          .reveal.is-visible .timeline-wrapper.animate-in .timeline-item-anim {
            opacity: 1;
            transform: translateY(0);
          }

          /* 카드 제목 글자 크기 축소 및 줄바꿈 허용 */
          .timeline-title {
            font-size: 1.2rem !important;
            white-space: normal !important;
            word-break: keep-all;
            margin-bottom: 4px !important;
          }

          /* 주황색 날짜 글씨 굵기 추가 완화 */
          .timeline-date-left {
            font-weight: 600 !important;
          }

          /* 쉐브론 표시 (글로벌) */
          .timeline-chevron {
            display: flex !important;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 8px; /* 텍스트 우측 정렬에 맞춰 이동 */
            top: 4px; /* 첫 줄 타이틀 높이에 맞춤 */
            color: var(--text-3);
            transition: transform 0.3s ease, color 0.3s ease;
          }

          .timeline-item.is-expanded .timeline-chevron {
            transform: rotate(180deg);
            color: var(--orange);
          }

          /* 본문 설명을 글로벌하게 숨김 (사진만 보이도록) */
          .timeline-desc {
            display: none !important;
          }

          /* 기본적으로 이미지를 숨김 */
          .timeline-item:not(.is-expanded) .timeline-img-container {
            display: none !important;
          }

          /* 펼쳐졌을 때 이미지 노출 및 애니메이션 */
          .timeline-item.is-expanded .timeline-img-container {
            display: block !important;
            width: 100% !important;
            max-width: 480px !important; /* PC 버전 이미지 크기 제한 */
            height: 280px !important; /* PC 버전 고해상도 크기 */
            margin-top: 12px !important;
            animation: fadeIn 0.3s ease forwards;
          }

          @media (max-width: 768px) {
            .timeline-item.is-expanded .timeline-img-container {
              height: 180px !important; /* 모바일 버전 크기 축소 */
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* 카드 박스 레이아웃 글로벌 제거 */
          .timeline-content {
            padding: 0 !important;
            gap: 0 !important;
            position: relative;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-tap-highlight-color: transparent !important;
            outline: none !important;
          }

          .timeline-text-wrap {
            /* 카드 박스가 없어졌으므로 좌우 패딩을 제거하고 chevron 공간만 확보 */
            padding: 0px 40px 0px 0px !important;
          }
          
          .timeline-text-wrap.no-chevron {
            padding-right: 0px !important;
          }
          
          /* 초기 진입 대기 상태 텍스트 안내 플레이스홀더 */
          .history-prompt-placeholder {
            text-align: center;
            padding: 80px 0;
            color: var(--text-3);
            font-size: 0.95rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
            animation: pulse-cue 2.5s infinite ease-in-out;
          }
          
          @keyframes pulse-cue {
            0%, 100% { opacity: 0.4; transform: translateY(0); }
            50% { opacity: 0.7; transform: translateY(-3px); }
          }
        `}</style>

        {/* ── 타임라인 노출 & 고급스러운 모션 바인딩 ── */}
        {!selectedYear ? (
          <div className="history-prompt-placeholder">
            — Select a year to unfold the history —
          </div>
        ) : (
          <div className={`timeline-wrapper ${animate ? 'animate-in' : ''}`}>
            <div className="timeline-container">
              {filteredShows.map((s, i) => {
                const clickable = !(s.name.includes('모여야지원') || s.name.includes('크리에이터'));
                return (
                  <div 
                    key={i} 
                    className={`timeline-item timeline-item-anim ${expandedItems[i] && clickable ? 'is-expanded' : ''}`} 
                    style={{ transitionDelay: `${i * 0.15}s` }}
                  >
                    <div className="timeline-date-left">
                      {s.date}
                    </div>
                    <div className="timeline-dot"></div>
                    <div 
                      className="timeline-content"
                      onClick={() => clickable && toggleItem(i)}
                      style={{ cursor: clickable ? 'pointer' : 'default' }}
                    >
                      <div className={`timeline-text-wrap ${clickable ? '' : 'no-chevron'}`}>
                        {s.status === 'upcoming' && (
                          <div className="timeline-header">
                            <span className={`timeline-status ${s.status}`}>
                              🔥 Upcoming
                            </span>
                          </div>
                        )}
                        <h3 className="timeline-title">{s.name}</h3>
                        <p className="timeline-desc">{s.desc}</p>
                        {clickable && (
                          <div className="timeline-chevron">
                            <FiChevronDown size={18} />
                          </div>
                        )}
                      </div>
                      {s.img && (
                        <div className="timeline-img-container">
                          <PhotoBox src={s.img} w="100%" h="100%" label="Show Moment" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
