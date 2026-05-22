import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { members, setMembers, shows, setShows } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');
  const [editMember, setEditMember] = useState(null);
  const [editShow, setEditShow] = useState(null);

  const handleMemberSave = (e) => {
    e.preventDefault();
    setMembers(members.map(m => m.name === editMember.name ? editMember : m));
    setEditMember(null);
    alert('저장되었습니다!');
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'kaho1234!';
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--navy)', color: 'white', padding: '20px' }}>
        <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.05)', padding: '32px 24px', borderRadius: '16px', backdropFilter: 'blur(20px)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '20px', color: 'white', fontSize: '1.5rem' }}>🔒 관리자 로그인</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요" 
            style={{ padding: '12px', width: '100%', marginBottom: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '1rem', background: 'rgba(0,0,0,0.3)', color: 'white', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', background: 'var(--orange)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>접속하기</button>
          <button type="button" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', marginTop: '20px', textDecoration: 'underline', cursor: 'pointer' }}>홈으로 돌아가기</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--gray-2)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <style>{`
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column !important; gap: 16px !important; padding: 0 12px !important; margin-top: 16px !important; }
          .admin-sidebar { width: 100% !important; }
          .admin-sidebar-inner { display: flex !important; border-radius: 8px !important; }
          .admin-sidebar-inner button { border-top: none !important; flex: 1 !important; text-align: center !important; font-size: 0.95rem !important; padding: 12px 8px !important; }
          .admin-main { padding: 16px !important; border-radius: 8px !important; }
          .admin-member-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .admin-header { flex-direction: column !important; gap: 10px !important; padding: 12px 16px !important; }
          .admin-header h1 { font-size: 1.1rem !important; text-align: center !important; }
          .admin-header button { font-size: 0.85rem !important; }
          .admin-section-header { flex-direction: column !important; gap: 10px !important; align-items: stretch !important; }
          .admin-section-header h2 { font-size: 1.4rem !important; }
          .admin-section-header button { width: 100% !important; text-align: center !important; }
          .admin-show-item { flex-direction: column !important; gap: 10px !important; padding: 16px !important; }
          .admin-show-item div:last-child { width: 100% !important; display: flex !important; gap: 8px !important; }
          .admin-show-item div:last-child button { flex: 1 !important; text-align: center !important; }
          .admin-form { padding: 16px !important; }
          .admin-form textarea { min-height: 100px !important; }
        }
        @media (max-width: 480px) {
          .admin-member-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
      `}</style>

      <header className="admin-header" style={{ background: 'var(--navy)', color: 'white', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: 'white' }}>⚙️ KAHO CMS 관리자</h1>
        <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>사이트로 돌아가기</button>
      </header>

      <div className="admin-layout" style={{ display: 'flex', maxWidth: 1200, margin: '40px auto', gap: '30px', padding: '0 20px' }}>
        <aside className="admin-sidebar" style={{ width: '250px', flexShrink: 0 }}>
          <div className="admin-sidebar-inner" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setActiveTab('members')}
              style={{ width: '100%', padding: '16px 20px', textAlign: 'left', border: 'none', background: activeTab === 'members' ? 'var(--orange)' : 'white', color: activeTab === 'members' ? 'white' : '#333', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              👥 멤버 관리
            </button>
            <button 
              onClick={() => setActiveTab('shows')}
              style={{ width: '100%', padding: '16px 20px', textAlign: 'left', border: 'none', background: activeTab === 'shows' ? 'var(--orange)' : 'white', color: activeTab === 'shows' ? 'white' : '#333', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', borderTop: '1px solid #eee' }}
            >
              🎤 공연 일정 관리
            </button>
          </div>
        </aside>

        <main className="admin-main" style={{ flex: 1, background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          {activeTab === 'members' && (
            <div>
              <div className="admin-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>👥 멤버 프로필 관리</h2>
                {!editMember && (
                  <button 
                    onClick={() => setEditMember({ name: '새 멤버', role: '역할', animal: '동물', bio: '', img: '', isNew: true })} 
                    style={{ padding: '8px 16px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                    + 새 멤버 추가
                  </button>
                )}
              </div>
              
              {!editMember ? (
                <div className="admin-member-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                  {members.map(m => (
                    <div key={m.name} style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'center', background: 'var(--gray-1)', position: 'relative' }}>
                      <button 
                        onClick={() => { if(window.confirm(`${m.name} 멤버를 정말 삭제할까요?`)) setMembers(members.filter(x => x.name !== m.name)); }}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', zIndex: 1 }}
                        title="삭제"
                      >
                        ✕
                      </button>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', background: '#e2e8f0' }}>
                        {m.img && <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-1)' }}>{m.name}</h3>
                      <p style={{ color: 'var(--text-3)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>{m.role}</p>
                      <button onClick={() => setEditMember(m)} style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'var(--orange)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>프로필 수정</button>
                    </div>
                  ))}
                </div>
              ) : (
                <form className="admin-form" onSubmit={(e) => {
                  e.preventDefault();
                  if (editMember.isNew) {
                    const newMember = { ...editMember };
                    delete newMember.isNew;
                    setMembers([...members, newMember]);
                  } else {
                    setMembers(members.map(m => m.name === editMember.name ? editMember : m));
                  }
                  setEditMember(null);
                  alert('저장되었습니다!');
                }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', background: 'var(--gray-1)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-1)' }}>{editMember.name} 수정</h3>
                    <button type="button" onClick={() => setEditMember(null)} style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', textDecoration: 'underline' }}>취소</button>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>이름</label>
                    <input 
                      value={editMember.name} 
                      onChange={e => setEditMember({...editMember, name: e.target.value})}
                      disabled={!editMember.isNew}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: editMember.isNew ? 'white' : '#e2e8f0', color: 'black', boxSizing: 'border-box' }}
                    />
                    {!editMember.isNew && <small style={{color: '#64748b'}}>이름은 수정할 수 없습니다.</small>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>포지션 (역할)</label>
                    <input 
                      value={editMember.role} 
                      onChange={e => setEditMember({...editMember, role: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: 'white', color: 'black', boxSizing: 'border-box' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>대표 동물</label>
                    <input 
                      value={editMember.animal} 
                      onChange={e => setEditMember({...editMember, animal: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: 'white', color: 'black', boxSizing: 'border-box' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>상세 소개 (Bio)</label>
                    <textarea 
                      value={editMember.bio || ''} 
                      onChange={e => setEditMember({...editMember, bio: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', minHeight: '150px', fontSize: '1rem', resize: 'vertical', background: 'white', color: 'black', boxSizing: 'border-box' }}
                      placeholder="상세 페이지에 보여질 긴 소개글을 작성해주세요."
                    />
                  </div>
                  
                  <button type="submit" style={{ padding: '16px', fontSize: '1.1rem', background: 'var(--orange)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>저장하기</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'shows' && (
            <div>
              <div className="admin-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>🎤 공연 이력 (History) 관리</h2>
                {!editShow && (
                  <button 
                    onClick={() => setEditShow({ name: '새 공연', date: 'YYYY.MM.DD', desc: '', status: 'upcoming', isNew: true, img: '' })} 
                    style={{ padding: '8px 16px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                    + 새 공연 추가
                  </button>
                )}
              </div>

              {!editShow ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {shows.map((s, idx) => (
                    <div key={idx} className="admin-show-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--gray-1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--orange)', marginBottom: '4px' }}>{s.date} {s.status === 'upcoming' && '🔥 Upcoming'}</div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--text-1)', wordBreak: 'break-word' }}>{s.name}</h3>
                        <p style={{ margin: 0, color: 'var(--text-3)', fontSize: '0.95rem', wordBreak: 'break-word' }}>{s.desc}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button onClick={() => setEditShow({...s, originalName: s.name})} style={{ padding: '8px 16px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>수정</button>
                        <button onClick={() => { if(window.confirm(`${s.name} 공연을 정말 삭제할까요?`)) setShows(shows.filter(x => x.name !== s.name)); }} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>삭제</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form className="admin-form" onSubmit={(e) => {
                  e.preventDefault();
                  if (editShow.isNew) {
                    const newShow = { ...editShow };
                    delete newShow.isNew;
                    const newShows = [...shows, newShow].sort((a, b) => new Date(a.date.replace(/\./g, '-')) - new Date(b.date.replace(/\./g, '-')));
                    setShows(newShows);
                  } else {
                    setShows(shows.map(s => s.name === editShow.originalName ? { ...editShow, originalName: undefined } : s));
                  }
                  setEditShow(null);
                  alert('공연 정보가 저장되었습니다!');
                }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', background: 'var(--gray-1)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-1)' }}>공연 정보 수정</h3>
                    <button type="button" onClick={() => setEditShow(null)} style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', textDecoration: 'underline' }}>취소</button>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>공연 이름</label>
                    <input 
                      value={editShow.name} 
                      onChange={e => setEditShow({...editShow, name: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: 'white', color: 'black', boxSizing: 'border-box' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>날짜 (YYYY.MM.DD 형식)</label>
                    <input 
                      value={editShow.date} 
                      onChange={e => setEditShow({...editShow, date: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: 'white', color: 'black', boxSizing: 'border-box' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>설명</label>
                    <input 
                      value={editShow.desc || ''} 
                      onChange={e => setEditShow({...editShow, desc: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: 'white', color: 'black', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-1)' }}>상태</label>
                    <select 
                      value={editShow.status} 
                      onChange={e => setEditShow({...editShow, status: e.target.value})}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '1rem', background: 'white', color: 'black', boxSizing: 'border-box' }}
                    >
                      <option value="done">지난 공연 (done)</option>
                      <option value="upcoming">다가오는 공연 (upcoming)</option>
                    </select>
                  </div>
                  
                  <button type="submit" style={{ padding: '16px', fontSize: '1.1rem', background: 'var(--orange)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>공연 저장하기</button>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}