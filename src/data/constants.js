// src/data/constants.js
// ─── 모든 데이터와 상수를 한 곳에서 관리 ───

/* ── 이미지 에셋 ── */
import groupPhoto from '../assets/group_photo.jpg';
import memChisu from '../assets/member_chisu.jpg';
import memMinseo from '../assets/member_minseo.jpg';
import memUjinP from '../assets/member_ujin.jpg'; // 박어진
const memDefault = ''; // 누락된 멤버용
const memTaerin = ''; // 사진 없음
const memEojinS = ''; // 사진 없음

import showHeojun from '../assets/show_heojun.jpg';
import showHalloween from '../assets/show_halloween.jpg';
import showNetwork from '../assets/show_network.jpg';
import galleryHeojun from '../assets/gallery_heojun_scene.jpg';
import showMoyeoya2025 from '../assets/show_moyeoya2025.png';
import showMoyeoya2026 from '../assets/show_moyeoya2026.png';
import showCreator6 from '../assets/show_creator6.png';
import trackClock from '../assets/track_clock.png';

/* ── URL 상수 ── */
export const HERO_VIDEOS = [
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/Backwater.mp4',
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/backforest.mp4',
  'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/join.mp4'
];

// ── Vercel Blob 클라우딩 고화질 추가 비디오 자산 목록 ──
export const CLOUD_VIDEOS = {
  backforest: 'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/backforest.mp4',
  backwater: 'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/Backwater.mp4',
  eyes: 'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/eyes.mp4',
  madlein: 'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/madlein.mp4',
  night: 'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/night.mkv',
  when: 'https://oryr28ocpive2gwg.public.blob.vercel-storage.com/when.mp4'
};

export const YT_BG_IDS = ['WYrJr97nXFA', 'DS2NMYKaeuo', 'NSsgmCNvKk8', 'fCJyKpGrIBI'];
export const YT_CHANNEL = 'https://www.youtube.com/@magpientiger';
export const IG_URL = 'https://www.instagram.com/magpientiger/';
export const SC_URL = 'https://soundcloud.com/size_kim';
export const RECRUIT_FORM_URL = 'https://forms.gle/gAp6J2BwdECou4mWA';

/* ── 멤버 데이터 ── */
export const MEMBERS = [
  { name: '김치수', role: '리더 · 베이스', animal: '호랑이', bio: '', img: memChisu },
  // { name: '-', role: '보컬', animal: '-', bio: '-', img: memTaerin },
  { name: '최민서', role: '기타', animal: '고양이', bio: '', img: memMinseo },
  { name: '박어진', role: '건반', animal: '참새', bio: '', img: memUjinP },
  // { name: '-', role: '드럼', animal: '-', bio: '-', img: memDefault },
];

/* ── 트랙 데이터 ── */
export const TRACKS = [
  { title: '깊은 밤을 날아서', type: '까치와 고양이 커버', link: 'WYrJr97nXFA', isYT: true },
  { title: '크리스마스 캐롤 메들리', type: '카호 커버', link: 'DS2NMYKaeuo', isYT: true },
  { title: '시계 (Demo)', type: '고양이', link: SC_URL, isYT: false, img: trackClock },
];

/* ── 공연 데이터 ── */
export const SHOWS = [
  { name: '카호 결성!', date: '2025.04.01', location: '숲 속', desc: '첫 만남', status: 'done', img: galleryHeojun },
  { name: '“2025 모여야지원” 선정', date: '2025.04.29', location: '강서구청', desc: '청년 커뮤니티 지원사업', status: 'done', img: showMoyeoya2025 },
  { name: '제23회 허준축제', date: '2025.10.19', location: '마곡중앙로', desc: '100+ 관객, 야외 공연', status: 'done', img: showHeojun },
  { name: '서울청년센터 할로윈축제', date: '2025.10.31', location: '서울청년센터 양천', desc: '30+ 관객, 특별 공연', status: 'done', img: showHalloween },
  { name: '“2026 모여야지원” 연속 선정', date: '2026.03.01', location: '강서구청', desc: '2년 연속 청년 커뮤니티 지원사업 선정', status: 'done', img: showMoyeoya2026 },
  { name: '제6기 강서영상크리에이터 선정', date: '2026.03.24', location: '강서구청', desc: '강서구 유튜브 채널 영상 크리에이터 선정', status: 'done', img: showCreator6 },
  { name: '청년예술인 네트워크 공연', date: '2026.05.07', location: '강서운전면허시험장', desc: '50+ 관객, 실내 공연', status: 'done', img: showNetwork },
];

/* ── 갤러리 사진 ── */
export const PHOTOS_GALLERY = [groupPhoto, galleryHeojun];

/* ── 단체사진 ── */
export { groupPhoto };
