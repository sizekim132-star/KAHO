// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import memberIcons from '../assets/member_icons.png';
import galleryGuitar from '../assets/gallery_guitar.png';
import galleryStage from '../assets/gallery_stage.png';
import galleryCrowd from '../assets/gallery_crowd.png';

/* ── 실제 유튜브 영상들 (브라우저로 직접 확인한 실제 ID) ── */
const YT_BG_IDS = ['WYrJr97nXFA', 'DS2NMYKaeuo', 'NSsgmCNvKk8'];
const YT_CHANNEL = 'https://www.youtube.com/@magpientiger';
const IG_URL = 'https://www.instagram.com/magpientiger/';
const SC_URL = 'https://soundcloud.com/size_kim';

/* ─── DATA ─── */
const MEMBERS = [
  { name: '김치수', role: '리더 · 베이스 · 프로듀서', animal: '호랑이', bio: '밴드의 심장. 곡을 만들고, 무대를 지배한다. 묵직한 베이스 그루브가 폭발하는 순간 Magpientiger가 시작된다.' },
  { name: '심어진', role: '일렉기타 · 엔지니어', animal: '치타', bio: '속도와 정밀함의 화신. 날카로운 픽 워크와 예리한 사운드 디자인으로 밴드의 소리를 조각한다.' },
  { name: '김태린', role: '메인보컬', animal: '까치', bio: '시선을 단번에 사로잡는 존재감. 선율 위를 자유롭게 날고, 무대 어디서든 빛난다.' },
  { name: '최민서', role: '일렉기타 · 서브보컬', animal: '고양이', bio: '발칙한 고양이.' },
  { name: '박어진', role: '건반 · 서기', animal: '참새', bio: '밴드를 지탱하는 섬세한 손. 은은하게 스며드는 건반이 이 팀의 온기다.' },
  { name: '김민규', role: '드럼 · 편집', animal: '펭귄', bio: '흔들리지 않는 기둥. 묵묵히 팀을 지탱한다.' },
];

const SHOWS = [
  { name: '까치와호랑이 조우', date: '2025.04.22', location: '서울', desc: '운명적인 첫 만남', status: 'done' },
  { name: '제23회 허준축제', date: '2025.10.19', location: '서울 마곡중앙로', desc: '100+ 관객, 야외 공연', status: 'done' },
  { name: '서울청년센터 할로윈축제', date: '2025.10.31', location: '서울청년센터강서', desc: '30+ 관객, 핼러윈 특별공연', status: 'done' },
  { name: '청년예술인 네트워크 공연', date: '2026.05.07', location: '강서 운전면허시험장 광장', desc: '40~100명 예정', status: 'upcoming' },
];

const PHOTOS_GALLERY = [galleryGuitar, galleryStage, galleryCrowd];

/* ─── UTIL COMPONENTS ─── */
const Label = ({ children }) => <p className="label">{children}</p>;
const AccentLine = () => <div className="accent-line" />;

function PhotoBox({ w, h, label }) {
  return (
    <div className="photo-box" style={{ width: w, height: h }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
      <span>{label || '사진 추가'}</span>
    </div>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  const [vidIdx, setVidIdx] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setInterval(() => {
      setVidIdx((prev) => (prev + 1) % YT_BG_IDS.length);
    }, 10000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const fadeEnd = heroHeight * 0.7;
      const raw = 1 - scrollY / fadeEnd;
      setVideoOpacity(Math.max(0, Math.min(1, raw)));

      const sections = ['home', 'about', 'music', 'members', 'shows', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // 섹션의 상단이 화면의 40% 지점 이내로 들어오면 활성화 (더 기민하게)
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-card, .reveal-text').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 0.1}s`;
      observer.observe(el);
    });

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ paddingTop: 60 }}>
      {/* ── Mobile Thumb Zone ── */}
      <div className="mobile-thumb-zone">
        {[
          { id: 'home', label: 'Home' },
          { id: 'music', label: 'Music' },
          { id: 'members', label: 'Band' },
          { id: 'contact', label: 'Contact' }
        ].map(item => (
          <a key={item.id} href={`#${item.id}`}
            className={`thumb-btn ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}>
            {item.label}
          </a>
        ))}
      </div>

      <div className="vbg-container" style={{ opacity: videoOpacity, transition: 'opacity 0.05s linear' }}>
        {YT_BG_IDS.map((id, index) => (
          <div key={id} className="vbg" style={{ opacity: vidIdx === index ? 1 : 0, transition: 'opacity 1.5s ease-in-out', zIndex: vidIdx === index ? 1 : 0 }}>
            <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
              allow="autoplay; encrypted-media" style={{ border: 'none' }} title={`bg-video-${index}`} />
          </div>
        ))}
      </div>
      <div className="film" />

      {/* ════ HERO ════ */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px var(--spacing)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div className="glass reveal float-slow" style={{ padding: 'clamp(40px,6vw,72px)', borderRadius: 28, maxWidth: '100%' }}>
            <Label>MAGPIENTIGER · 까치와호랑이</Label>
            <h1 className="reveal-text" style={{ fontSize: 'clamp(3rem,7vw,6.4rem)', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--navy)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              WHERE THE<br />
              <span className="gradient-text">WILDS SING.</span>
            </h1>
            <p className="body-text reveal-text" style={{ maxWidth: 520, marginBottom: '2.5rem' }}>
              까치의 목소리와 호랑이의 그루브.<br />
              서울에서 가장 야성적인 밴드의 포효가 시작된다.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} className="reveal-text">
              <a href="#music" className="btn btn-primary">음악 듣기</a>
              <a href="#shows" className="btn btn-ghost">공연 기록 →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" className="section section-white">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="reveal-text">
            <Label>About Us</Label>
            <h2 className="title">야성이 깨어나는<br />그 순간의 음악.</h2>
            <AccentLine />
            <p className="body-text" style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>MAGPIENTIGER(까치와호랑이)</strong>는 2025년 서울 강서구에서 결성된 인디 밴드입니다. 까치의 영리함과 호랑이의 힘을 음악으로 녹여, 날카롭고 역동적인 사운드를 만들어냅니다.
            </p>
            <p className="body-text" style={{ marginBottom: '2.5rem' }}>
              자작곡과 창의적인 편곡을 통해 우리만의 세계를 구축하고 있으며, 팬들과 함께하는 라이브 무대를 가장 사랑합니다.
            </p>
          </div>
          <div className="reveal-card">
            <PhotoBox w="100%" h="440px" label="밴드 단체사진" />
          </div>
        </div>
      </section>

      {/* ════ MUSIC ════ */}
      <section id="music" className="section section-gray">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal-text">
            <Label>Discography</Label>
            <h2 className="title" style={{ marginBottom: '3rem' }}>Music</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: '깊은 밤을 날아서', type: '까치와 고양이 커버', link: `https://www.youtube.com/watch?v=WYrJr97nXFA` },
              { title: '크리스마스 캐롤 메들리', type: '밴드 커버', link: `https://www.youtube.com/watch?v=DS2NMYKaeuo` },
              { title: '꽉붙 (Demo)', type: '자작곡', link: SC_URL },
            ].map((t, i) => (
              <a key={i} href={t.link} target="_blank" rel="noreferrer" className="lift reveal-card"
                style={{ borderRadius: 'var(--r-lg)', padding: '2rem', display: 'block', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', fontSize: '1.3rem' }}>🎵</div>
                <p style={{ fontSize: '.7rem', fontWeight: 800, color: 'var(--orange)', marginBottom: 6 }}>{t.type}</p>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)' }}>{t.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════ MEMBERS ════ */}
      <section id="members" className="section section-dark">
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal-text">
            <p className="label-dark">The Wild Ones</p>
            <h2 className="title-dark" style={{ marginBottom: '3.5rem' }}>Band Members</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
            {MEMBERS.map((m, i) => (
              <div key={i} className="lift reveal-card" style={{ overflow: 'hidden', borderRadius: 'var(--r-lg)', backgroundColor: '#fff' }}>
                <div style={{ height: 260 }}><PhotoBox w="100%" h="260px" label={m.name} /></div>
                <div style={{ padding: '1.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div><h3 style={{ fontSize: '1.4rem', fontWeight: 850, color: 'var(--navy)' }}>{m.name}</h3><p style={{ fontSize: '.72rem', fontWeight: 800, color: 'var(--orange)', marginTop: 4 }}>{m.animal}</p></div>
                    <div style={{ textAlign: 'right' }}><p style={{ fontSize: '.85rem', fontWeight: 800, color: 'var(--navy)', opacity: 0.8 }}>{m.role}</p></div>
                  </div>
                  <div style={{ height: 1, background: 'var(--navy)', opacity: 0.08, margin: '14px 0' }} />
                  <p style={{ fontSize: '.9rem', color: 'var(--text-2)', lineHeight: 1.7 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SHOWS ════ */}
      <section id="shows" className="section section-white reveal">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal-text">
            <Label>Performance History</Label>
            <h2 className="title" style={{ marginBottom: '3.5rem' }}>Shows</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SHOWS.map((s, i) => (
              <div key={i} className="lift reveal-card" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', backgroundColor: '#fff', border: '1px solid var(--gray-2)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: 200 }}>
                  <div style={{ padding: '2.5rem 3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: '.7rem', fontWeight: 800, background: s.status === 'upcoming' ? 'var(--orange)' : 'var(--gray-2)', color: s.status === 'upcoming' ? '#fff' : 'var(--text-3)', padding: '4px 12px', borderRadius: 999 }}>{s.status === 'upcoming' ? '🔥 Upcoming' : 'Completed'}</span>
                      <span style={{ fontSize: '.8rem', color: 'var(--text-3)' }}>{s.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>{s.name}</h3>
                    <p style={{ fontSize: '.9rem', color: 'var(--text-2)', marginTop: 8 }}>📍 {s.location}</p>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(0,0,0,.04)', background: 'rgba(0,0,0,.01)' }}><PhotoBox w="100%" h="100%" label="Show Moment" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" className="section section-white" style={{ borderTop: '1px solid var(--gray-2)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="reveal-text" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="title" style={{ fontSize: '1rem', letterSpacing: '.4em', opacity: 0.4, marginBottom: '1.5rem' }}>CONTACT</h2>
            <AccentLine />
          </div>
          <div className="reveal-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', backgroundColor: 'var(--gray-2)', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--gray-2)' }}>
            {[
              { label: 'REPRESENTATIVE', val: '김치수 (리더)', icon: '👤' },
              { label: 'PHONE', val: '010-5532-0456', icon: '📞' },
              { label: 'EMAIL', val: 'size132@naver.com', icon: '✉️' }
            ].map((c, idx) => (
              <div key={idx} style={{ backgroundColor: '#fff', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</span>
                <p style={{ fontSize: '.65rem', fontWeight: 800, color: 'var(--text-3)', letterSpacing: '.2em' }}>{c.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--navy)' }}>{c.val}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }} className="reveal"><a href={`mailto:size132@naver.com`} className="btn btn-primary" style={{ padding: '18px 48px' }}>공연 제안하기</a></div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background: 'var(--navy)', padding: '80px var(--spacing) 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div><h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>MAGPIENTIGER</h3><p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)', marginTop: 8 }}>© 2025 까치와호랑이 · 서울 기반 인디 밴드</p></div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href={IG_URL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }}><FaInstagram size={22} /></a>
            <a href={YT_CHANNEL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }}><FaYoutube size={22} /></a>
            <a href={SC_URL} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,.4)' }}><FaSoundcloud size={24} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
