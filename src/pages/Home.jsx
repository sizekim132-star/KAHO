// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { FiUser, FiPhone, FiMail } from 'react-icons/fi';


// ... (YT_BG_IDS and other constants)

/* ─── BENTO CARD COMPONENT ─── */
function BentoCard({ label, value, icon: Icon, sizeClass, socials = [] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bento-card ${sizeClass} reveal-card`} onClick={handleCopy}>
      <div className={`copy-toast ${copied ? 'active' : ''}`}>Copied!</div>
      <div style={{ display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center', paddingRight: '6rem' }}>
        <div style={{ flex: 1 }}>
          <div className="icon-box">
            <Icon size={22} />
          </div>
          <p style={{ fontSize: '.75rem', fontWeight: 800, color: 'var(--text-3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            {label}
          </p>
          <h4 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.02em' }}>
            {value}
          </h4>
        </div>

        {socials.length > 0 && (
          <div style={{ display: 'flex', gap: '3rem', marginLeft: '3rem' }}>
            {socials.map((s, idx) => (
              <a 
                key={idx} 
                href={s.url} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => e.stopPropagation()}
                style={{ color: 'var(--text-3)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-3)'}
              >
                <s.icon size={44} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── IMAGE ASSETS (자동 매핑용) ─── */
import groupPhoto from '../assets/group_photo.jpg';
import memChisu from '../assets/member_chisu.jpg';
import memEojinS from '../assets/member_eojin.jpg'; // 심어진
import memMinseo from '../assets/member_minseo.jpg';
import memTaerin from '../assets/member_taerin.jpg';
import memUjinP from '../assets/member_ujin.jpg'; // 박어진
const memDefault = ''; // 누락된 멤버용

import showHeojun from '../assets/show_heojun.jpg';
import showHalloween from '../assets/show_halloween.jpg';
import galleryHeojun from '../assets/gallery_heojun_scene.jpg';

/* ── 실제 유튜브 영상들 (브라우저로 직접 확인한 실제 ID) ── */
const YT_BG_IDS = ['WYrJr97nXFA', 'DS2NMYKaeuo', 'NSsgmCNvKk8', 'fCJyKpGrIBI'];
const YT_CHANNEL = 'https://www.youtube.com/@magpientiger';
const IG_URL = 'https://www.instagram.com/magpientiger/';
const SC_URL = 'https://soundcloud.com/size_kim';

/* ─── DATA ─── */
const MEMBERS = [
  { name: '김치수', role: '리더 · 베이스 · 프로듀서', animal: '호랑이', bio: '곡을 만들고, 무대를 지배한다. 묵직한 그루브가 퍼지는 순간 까치와호랑이가 시작된다.', img: memChisu },
  { name: '심어진', role: '일렉기타 · 엔지니어', animal: '치타', bio: '속도와 정밀함의 화신. 날카로운 픽 워크와 예리한 사운드 디자인으로 밴드의 소리를 조각한다.', img: memEojinS },
  { name: '김태린', role: '메인보컬', animal: '까치', bio: '시선을 단번에 사로잡는 존재감. 선율 위를 자유롭게 날고, 무대 어디서든 빛난다.', img: memTaerin },
  { name: '최민서', role: '일렉기타 · 서브보컬', animal: '고양이', bio: '발칙한 고양이.', img: memMinseo },
  { name: '박어진', role: '건반 · 서기', animal: '참새', bio: '밴드를 지탱하는 섬세한 손. 은은하게 스며드는 건반이 이 팀의 온기다.', img: memUjinP },
  { name: '김민규', role: '드럼 · 편집', animal: '펭귄', bio: '흔들리지 않는 기둥. 심장을 강타하는 드럼으로 묵묵히 팀을 지탱한다.', img: memDefault },
];

const SHOWS = [
  { name: '까치와호랑이 조우', date: '2025.04.29', location: '숲 속', desc: '운명적인 첫 만남', status: 'done', img: galleryHeojun },
  { name: '제23회 허준축제', date: '2025.10.19', location: '마곡중앙로', desc: '100+ 관객, 야외 공연', status: 'done', img: showHeojun },
  { name: '서울청년센터 할로윈축제', date: '2025.10.31', location: '서울청년센터양천', desc: '30+ 관객, 특별공연', status: 'done', img: showHalloween },
  { name: '청년예술인 네트워크 공연', date: '2026.05.07', location: '강서 운전면허시험장 광장', desc: '40~100명 예정', status: 'upcoming', img: '' },
];

const PHOTOS_GALLERY = [groupPhoto, galleryHeojun];

/* ─── UTIL COMPONENTS ─── */
const Label = ({ children, style }) => <p className="label" style={style}>{children}</p>;
const AccentLine = () => <div className="accent-line" />;

function PhotoBox({ src, w, h, label, alt }) {
  if (src) {
    return (
      <div style={{ width: w, height: h, overflow: 'hidden', borderRadius: 'inherit', position: 'relative' }}>
        <img 
          src={src} 
          alt={alt || label} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} 
        />
      </div>
    );
  }
  return (
    <div className="photo-box" style={{ width: w || '100%', height: h || '100%' }}>
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
  const [activeSlot, setActiveSlot] = useState(0); // 현재 보여지는 슬롯 (0 또는 1)
  const [slotIndices, setSlotIndices] = useState([0, 1]); // 각 물리적 슬롯이 담당할 영상 인덱스
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState('home');

  // 타이머 중첩 방지 및 지연 로딩을 위한 Ref
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // 이전 타이머들 확실히 제거 (Double-Guard)
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // 11초마다 슬롯을 교환 (사용자 피드백 반영: 주기를 약간 늘림)
    intervalRef.current = setInterval(() => {
      setActiveSlot((prev) => {
        const next = prev === 0 ? 1 : 0;
        
        // 중요: 전환 직후가 아니라, 페이드 아웃이 끝난 3.5초 뒤에 비활성 슬롯의 영상을 교체
        // 이렇게 하면 사라지는 도중에 영상환 휙 바뀌는 현상을 원천 차단
        timeoutRef.current = setTimeout(() => {
          setSlotIndices((prevIndices) => {
            const nextIndices = [...prevIndices];
            // 방금 비활성화된 슬롯(prev)의 영상을 '다음-다음' 영상으로 미리 로드 시작
            // nextIndices[next]는 현재 활성화된 영상임
            const currentGlobalIdx = prevIndices[next];
            nextIndices[prev] = (currentGlobalIdx + 1) % YT_BG_IDS.length;
            return nextIndices;
          });
        }, 3500);

        return next;
      });
    }, 11000);

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

    document.querySelectorAll('.reveal, .reveal-card, .reveal-text').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
        {/* 물리적 슬롯 0 */}
        <div className="vbg" style={{ opacity: activeSlot === 0 ? 1 : 0, zIndex: activeSlot === 0 ? 1 : 0 }}>
          <iframe 
            key={`vbg-s0-${YT_BG_IDS[slotIndices[0]]}`}
            src={`https://www.youtube.com/embed/${YT_BG_IDS[slotIndices[0]]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_BG_IDS[slotIndices[0]]}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
            allow="autoplay; encrypted-media" 
            style={{ border: 'none' }} 
            title="bg-video-slot-0" 
          />
        </div>
        {/* 물리적 슬롯 1 */}
        <div className="vbg" style={{ opacity: activeSlot === 1 ? 1 : 0, zIndex: activeSlot === 1 ? 1 : 0 }}>
          <iframe 
            key={`vbg-s1-${YT_BG_IDS[slotIndices[1]]}`}
            src={`https://www.youtube.com/embed/${YT_BG_IDS[slotIndices[1]]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_BG_IDS[slotIndices[1]]}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
            allow="autoplay; encrypted-media" 
            style={{ border: 'none' }} 
            title="bg-video-slot-1" 
          />
        </div>
      </div>
      <div className="film" style={{ background: 'rgba(26, 39, 68, 0.25)' }} />

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
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} className="reveal-text">
              <a href={IG_URL} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '10px 22px', fontSize: '.82rem' }}>
                <FaInstagram size={15} /> Instagram
              </a>
              <a href={YT_CHANNEL} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '10px 22px', fontSize: '.82rem' }}>
                <FaYoutube size={15} /> YouTube
              </a>
              <a href={SC_URL} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '10px 22px', fontSize: '.82rem', background: 'rgba(255, 119, 0, 0.1)', color: '#FF7700' }}>
                <FaSoundcloud size={16} /> SoundCloud
              </a>
            </div>
          </div>
          <div className="reveal-card" style={{ boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
            <PhotoBox src={groupPhoto} w="100%" h="440px" label="밴드 단체사진" />
          </div>
        </div>
      </section>

      {/* ════ MUSIC ════ */}
      <section id="music" className="section section-gray2 reveal">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal-text">
            <Label>Discography</Label>
            <h2 className="title" style={{ marginBottom: '3rem' }}>Music</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: '깊은 밤을 날아서', type: '까치와 고양이 커버', desc: '이문세 원곡의 화려한 변신. 보컬과 포핸즈 피아노가 어우러진 버스킹 버전입니다.', link: `WYrJr97nXFA`, isYT: true },
              { title: '크리스마스 캐롤 메들리', type: '밴드 커버', desc: '허준축제 현장을 들썩이게 한 캐롤 올스타 메들리 라이브.', link: `DS2NMYKaeuo`, isYT: true },
              { title: '꽉붙 (Demo)', type: '자작곡', desc: '까치와호랑이의 첫 번째 오리지널 자작곡 데모. 묵직한 야성이 느껴지는 사운드.', link: SC_URL, isYT: false, img: '' },
            ].map((t, i) => (
              <div key={i} className="lift reveal-card"
                style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-md)', transitionDelay: `${i * 0.1}s` }}>
                {t.isYT ? (
                  <div style={{ aspectRatio: '16/9', width: '100%' }}>
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${t.link}?rel=0`}
                      title={t.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                ) : (
                  <PhotoBox src={t.img} w="100%" h="200px" label={t.title} />
                )}
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontSize: '.7rem', fontWeight: 800, color: 'var(--orange)', marginBottom: 6 }}>{t.type}</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 12 }}>{t.title}</h3>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-3)', marginBottom: 16, lineHeight: 1.5 }}>{t.desc}</p>
                  <a href={t.isYT ? `https://www.youtube.com/watch?v=${t.link}` : t.link} target="_blank" rel="noreferrer"
                    style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {t.isYT ? '▶ YouTube에서 보기' : '▶ SoundCloud에서 듣기'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ MEMBERS ════ */}
      <section id="members" className="section section-dark reveal">
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal-text">
            <p className="label-dark">The Wild Ones</p>
            <h2 className="title-dark" style={{ marginBottom: '3.5rem' }}>Band Members</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.5rem' }}>
            {MEMBERS.map((m, i) => (
              <div key={i} className="lift reveal-card" style={{ overflow: 'hidden', borderRadius: 'var(--r-lg)', backgroundColor: '#fff', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ height: 260 }}><PhotoBox src={m.img} w="100%" h="260px" label={m.name} /></div>
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
      <section id="shows" className="section section-gray2 reveal">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal-text">
            <Label>Performance History</Label>
            <h2 className="title" style={{ marginBottom: '3.5rem' }}>Shows</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SHOWS.map((s, i) => (
              <div key={i} className="lift reveal-card" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', backgroundColor: '#fff', border: '1px solid var(--gray-2)', boxShadow: 'var(--shadow-md)', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: 200 }}>
                  <div style={{ padding: '2.5rem 3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{
                        fontSize: '.7rem',
                        fontWeight: 800,
                        background: s.status === 'upcoming' ? 'var(--orange)' : '#E9F5EB',
                        color: s.status === 'upcoming' ? '#fff' : '#2D6A4F',
                        padding: '4px 12px',
                        borderRadius: 999
                      }}>
                        {s.status === 'upcoming' ? '🔥 Upcoming' : '✅ Completed'}
                      </span>
                      <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#6B7280' }}>{s.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>{s.name}</h3>
                    <p style={{ fontSize: '.9rem', color: 'var(--text-2)', marginTop: 8 }}>📍 {s.location}</p>
                    <p style={{ fontSize: '.85rem', color: 'var(--text-3)', marginTop: 12, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(0,0,0,.04)', background: 'rgba(0,0,0,.01)', height: 320 }}>
                    <PhotoBox src={s.img} w="100%" h="320px" label="Show Moment" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" className="section section-gray" style={{ borderTop: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
        {/* Background Orbs for Premium feel */}
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(255, 95, 31, 0.05)', top: '-100px', right: '-100px' }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'rgba(26, 39, 68, 0.05)', bottom: '0', left: '-50px' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="reveal-text" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <Label style={{ color: 'var(--navy)', letterSpacing: '.3em', fontSize: '1.8rem', fontWeight: 900 }}>CONTACT</Label>
            <p style={{ marginTop: 24, fontSize: '1.05rem', color: 'var(--text-2)' }}>함께 까치와호랑이의 다음 무대를 만들어가요.</p>
          </div>

          <div className="bento-grid">
            <BentoCard 
              label="Booking & Inquiries" 
              value="김치수" 
              sub="REPRESENTATIVE" 
              icon={FiUser} 
              sizeClass="bento-card-large" 
              socials={[
                { icon: FaInstagram, url: 'https://www.instagram.com/size.kim/' },
                { icon: FaYoutube, url: 'https://www.youtube.com/@sizekim' },
                { icon: FaSoundcloud, url: SC_URL }
              ]}
            />
            <BentoCard
              label="Official Email"
              value="size132@naver.com"
              sub="Click to copy email address"
              icon={FiMail}
              sizeClass="bento-card-small"
            />
            <BentoCard
              label="Mobile"
              value="010-5532-0456"
              sub="PHONE NUMBER"
              icon={FiPhone}
              sizeClass="bento-card-small"
            />
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background: 'var(--navy)', padding: '80px var(--spacing) 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div><h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>MAGPIENTIGER</h3><p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)', marginTop: 8 }}>© 까치와호랑이</p></div>
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
