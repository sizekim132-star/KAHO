// src/pages/Home.jsx
import React from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import memberIcons from '../assets/member_icons.png';
import galleryGuitar from '../assets/gallery_guitar.png';
import galleryStage from '../assets/gallery_stage.png';
import galleryCrowd from '../assets/gallery_crowd.png';

/* ── 실제 유튜브 영상들 (브라우저로 직접 확인한 실제 ID) ── */
const YT_BG_ID = 'WYrJr97nXFA';
const YT_CHANNEL = 'https://www.youtube.com/@magpientiger';
const IG_URL = 'https://www.instagram.com/magpientiger/';
const SC_URL = 'https://soundcloud.com/size_kim';

/* ─── DATA ───
 * member_icons.png 은 3×2 그리드 이미지.
 * bgPos: 'X% Y%' → X: 0(좌)~100(우) 열, Y: 0(상)~100(하) 행
 */
const MEMBERS = [
  {
    name: '김치수', role: '리더 · 베이스 · 프로듀서', animal: '호랑이 Tiger',
    bio: '밴드의 심장. 곡을 만들고, 무대를 지배한다. 묵직한 베이스 그루브가 폭발하는 순간 Magpientiger가 시작된다.',
    bgPos: '0% 0%'
  },
  {
    name: '심어진', role: '일렉기타 · 엔지니어', animal: '치타 Cheetah',
    bio: '속도와 정밀함의 화신. 날카로운 픽 워크와 예리한 사운드 디자인으로 밴드의 소리를 조각한다.',
    bgPos: '50% 0%'
  },
  {
    name: '김태린', role: '메인보컬', animal: '까치 Magpie',
    bio: '시선을 단번에 사로잡는 존재감. 선율 위를 자유롭게 날고, 무대 어디서든 빛난다.',
    bgPos: '100% 0%'
  },
  {
    name: '최민서', role: '일렉기타 · 서브보컬', animal: '고양이 Cat',
    bio: '발칙한 고양이.',
    bgPos: '0% 100%'
  },
  {
    name: '박어진', role: '건반 · 서기', animal: '참새 Sparrow',
    bio: '밴드를 지탱하는 섬세한 손. 은은하게 스며드는 건반이 이 팀의 온기다.',
    bgPos: '50% 100%'
  },
  {
    name: '김민규', role: '드럼 · 편집', animal: '펭귄 Penguin',
    bio: '흔들리지 않는 기둥. 묵묵히 팀을 지탱한다.',
    bgPos: '100% 100%'
  },
];

const SHOWS = [
  { name: '까치와호랑이 조우', date: '2025.04.22', location: '서울', desc: '운명적인 첫 만남', status: 'done' },
  { name: '제23회 허준축제', date: '2025.10.19', location: '서울 마곡중앙로', desc: '100+ 관객, 야외 공연', status: 'done' },
  { name: '서울청년센터 할로윈축제', date: '2025.10.31', location: '서울청년센터강서', desc: '30+ 관객, 핼러윈 특별공연', status: 'done' },
  { name: '청년예술인 네트워크 공연', date: '2026.05.07', location: '강서 운전면허시험장 광장', desc: '40~100명 예정 · 진행 예정', status: 'upcoming' },
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
  // 실제 까치와호랑이 유튜브 배경 영상

  return (
    <div style={{ paddingTop: 60 }}>

      {/* ── 전역 배경 영상 + 필름 ── */}
      <div className="vbg">
        <iframe
          src={`https://www.youtube.com/embed/${YT_BG_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_BG_ID}&rel=0&showinfo=0`}
          allow="autoplay; encrypted-media"
          style={{ border: 'none' }}
        />
      </div>
      <div className="film" />

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px var(--spacing)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

          <div className="glass" style={{ padding: 'clamp(40px,6vw,72px)', borderRadius: 28 }}>
            <Label>MAGPIENTIGER · 까치와호랑이</Label>
            <h1 style={{ fontSize: 'clamp(3rem,7vw,6.4rem)', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--navy)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              WHERE THE<br />
              <span style={{ color: 'var(--orange)' }}>WILDS SING.</span>
            </h1>
            <p className="body-text" style={{ maxWidth: 520, marginBottom: '2.5rem' }}>
              까치의 목소리와 호랑이의 그루브.<br />
              서울에서 가장 야성적인 밴드의 포효가 시작된다.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://soundcloud.com/size_kim" target="_blank" rel="noreferrer" className="btn btn-primary">음악 듣기</a>
              <a href="#shows" className="btn btn-ghost">공연 기록 →</a>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════
          ABOUT
      ════════════════════════════ */}
      <section id="about" className="section section-white">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <Label>About Us</Label>
            <h2 className="title">야성이 깨어나는<br />그 순간의 음악.</h2>
            <AccentLine />
            <p className="body-text" style={{ marginBottom: '1.5rem' }}>
              <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>MAGPIENTIGER(까치와호랑이)</strong>는 2025년 서울 강서구에서 결성된 인디 밴드입니다. 까치의 영리함과 호랑이의 힘을 음악으로 녹여, 날카롭고 역동적인 사운드를 만들어냅니다.
            </p>
            <p className="body-text" style={{ marginBottom: '2.5rem' }}>
              자작곡과 창의적인 편곡을 통해 우리만의 세계를 구축하고 있으며, 팬들과 함께하는 라이브 무대를 가장 사랑합니다.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="https://www.instagram.com/magpientiger/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '10px 22px', fontSize: '.82rem' }}>
                <FaInstagram size={15} /> Instagram
              </a>
              <a href="https://www.youtube.com/@magpientiger" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '10px 22px', fontSize: '.82rem' }}>
                <FaYoutube size={15} /> YouTube
              </a>
            </div>
          </div>
          {/* About 사진 공란 */}
          <PhotoBox w="100%" h="440px" label="밴드 단체사진" />
        </div>
      </section>

      {/* ════════════════════════════
          MUSIC
      ════════════════════════════ */}
      <section id="music" className="section" style={{ background: 'rgba(255,255,255,0.6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Label>Discography</Label>
          <h2 className="title" style={{ marginBottom: '3rem' }}>Music</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
            {[
              { title: '깊은 밤을 날아서', type: '까치와 고양이 커버', link: `https://www.youtube.com/watch?v=WYrJr97nXFA`, icon: '▶ YouTube에서 보기' },
              { title: '크리스마스 캐롤 메들리', type: '밴드 커버', link: `https://www.youtube.com/watch?v=DS2NMYKaeuo`, icon: '▶ YouTube에서 보기' },
              { title: '꽉붙 (Demo)', type: '자작곡', link: SC_URL, icon: '▶ SoundCloud에서 듣기' },
            ].map((t, i) => (
              <a key={i} href={t.link} target="_blank" rel="noreferrer"
                className="glass lift"
                style={{ borderRadius: 'var(--r-lg)', padding: '2rem', display: 'block', transition: 'all .3s var(--ease)' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', fontSize: '1.3rem' }}>
                  🎵
                </div>
                <p style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '.14em', color: 'var(--orange)', marginBottom: 6, textTransform: 'uppercase' }}>{t.type}</p>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em' }}>{t.title}</h3>
                <p style={{ fontSize: '.8rem', color: 'var(--text-3)', marginTop: 12, fontWeight: 600 }}>{t.icon}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          MEMBERS
      ════════════════════════════ */}
      <section id="members" className="section section-white">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Label>The Wild Ones</Label>
          <h2 className="title" style={{ marginBottom: '3.5rem' }}>Band Members</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {MEMBERS.map((m, i) => (
              <div key={i} className="lift" style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                background: 'var(--white)',
              }}>
                {/* 동물 아이콘 — CSS 스프라이트 방식 */}
                <div style={{
                  height: 220,
                  backgroundImage: `url(${memberIcons})`,
                  backgroundSize: '300% 200%',
                  backgroundPosition: m.bgPos,
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#f7f8fa',
                }} />
                {/* 텍스트 영역 */}
                <div style={{ padding: '1.6rem' }}>
                  <div style={{ marginBottom: 8 }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em' }}>{m.name}</h3>
                    <p style={{ fontSize: '.72rem', fontWeight: 800, letterSpacing: '.12em', color: 'var(--orange)', marginTop: 3, textTransform: 'uppercase' }}>{m.animal}</p>
                  </div>
                  <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
                  <p style={{ fontSize: '.79rem', fontWeight: 700, color: 'var(--text-2)', marginBottom: 10, letterSpacing: '.01em' }}>{m.role}</p>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SHOWS
      ════════════════════════════ */}
      <section id="shows" className="section" style={{ background: 'rgba(255,255,255,0.6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Label>Performance History</Label>
          <h2 className="title" style={{ marginBottom: '3.5rem' }}>Shows</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SHOWS.map((s, i) => (
              <div key={i} className="glass lift" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: 220 }}>
                  {/* 텍스트 */}
                  <div style={{ padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <span style={{
                        fontFamily: 'var(--font)', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase',
                        color: s.status === 'upcoming' ? 'var(--white)' : 'var(--text-3)',
                        background: s.status === 'upcoming' ? 'var(--orange)' : 'var(--gray-2)',
                        padding: '4px 12px', borderRadius: 999
                      }}>
                        {s.status === 'upcoming' ? '🔥 Upcoming' : 'Completed'}
                      </span>
                      <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-3)' }}>{s.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', marginBottom: 10 }}>{s.name}</h3>
                    <p style={{ fontSize: '.9rem', color: 'var(--text-2)', marginBottom: 8 }}>📍 {s.location}</p>
                    <p style={{ fontSize: '.87rem', color: 'var(--text-3)' }}>{s.desc}</p>
                  </div>
                  {/* 사진 공란 */}
                  <div style={{ borderLeft: '1px solid rgba(0,0,0,.05)' }}>
                    <PhotoBox w="100%" h="100%" label="공연 사진" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          GALLERY
      ════════════════════════════ */}
      <section className="section section-white">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Label>Gallery</Label>
          <h2 className="title" style={{ marginBottom: '3rem' }}>Moments</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {PHOTOS_GALLERY.map((src, i) => (
              <div key={i} style={{ aspectRatio: '4/3', borderRadius: 'var(--r-md)', overflow: 'hidden', position: 'relative' }}>
                <img src={src} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform .6s var(--ease)'
                }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          CONTACT / FOOTER
      ════════════════════════════ */}
      <footer id="contact" style={{ background: 'var(--navy)', padding: '80px var(--spacing) 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '4rem', alignItems: 'start', marginBottom: '4rem' }}>
            {/* Brand */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '.14em', color: 'var(--white)', marginBottom: 8 }}>MAGPIENTIGER</h3>
              <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.7 }}>까치와호랑이<br />서울 기반 인디 밴드 · 2025</p>
            </div>
            {/* Social */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>FOLLOW</p>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                {[
                  { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/magpientiger/', hc: '#E1306C' },
                  { icon: <FaYoutube size={20} />, href: 'https://www.youtube.com/@magpientiger', hc: '#FF0000' },
                  { icon: <FaSoundcloud size={22} />, href: 'https://soundcloud.com/size_kim', hc: '#FF5500' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    style={{ color: 'rgba(255,255,255,.35)', transition: 'all .2s' }}
                    onMouseOver={e => { e.currentTarget.style.color = s.hc; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>BOOKING</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--white)', marginBottom: 4 }}>김치수 리더</p>
              <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)', marginBottom: 2 }}>010-5532-0456</p>
              <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)' }}>size132@naver.com</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.25)' }}>© 2025 MAGPIENTIGER. All rights reserved.</p>
            <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.25)' }}>창립기념일 🐾 4월 29일</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
