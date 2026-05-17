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

/* ── URL 상수 ── */
export const YT_BG_IDS = ['WYrJr97nXFA', 'DS2NMYKaeuo', 'NSsgmCNvKk8', 'fCJyKpGrIBI'];
export const YT_CHANNEL = 'https://www.youtube.com/@magpientiger';
export const IG_URL = 'https://www.instagram.com/magpientiger/';
export const SC_URL = 'https://soundcloud.com/size_kim';

/* ── 멤버 데이터 ── */
export const MEMBERS = [
  { name: '김치수', role: '리더 · 베이스', animal: '호랑이', bio: '', img: memChisu },
  // { name: '-', role: '보컬', animal: '-', bio: '-', img: memTaerin },
  { name: '최민서', role: '기타', animal: '고양이', bio: '', img: memMinseo },
  { name: '박어진', role: '건반', animal: '참새', bio: '', img: memUjinP },
  // { name: '-', role: '드럼', animal: '-', bio: '-', img: memDefault },
];

/* ── 공연 데이터 ── */
export const SHOWS = [
  { name: '카호 결성!', date: '2025.04.29', location: '숲 속', desc: '첫 만남', status: 'done', img: galleryHeojun },
  { name: '제23회 허준축제', date: '2025.10.19', location: '마곡중앙로', desc: '100+ 관객, 야외 공연', status: 'done', img: showHeojun },
  { name: '서울청년센터 할로윈축제', date: '2025.10.31', location: '서울청년센터양천', desc: '30+ 관객, 특별 공연', status: 'done', img: showHalloween },
  { name: '청년예술인 네트워크 공연', date: '2026.05.07', location: '강서운전면허시험장', desc: '50+ 관객, 실내 공연', status: 'done', img: showNetwork },
];

/* ── 갤러리 사진 ── */
export const PHOTOS_GALLERY = [groupPhoto, galleryHeojun];

/* ── 단체사진 ── */
export { groupPhoto };
