// src/components/Nav.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Feed', href: '#music' },
  { label: 'Artists', href: '#members' },
  { label: 'History', href: '#shows' },
  { label: 'Recruit', href: '#recruit' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      if (y <= 60) {
        setHidden(false);
      } else if (y > lastScrollY.current + 8) {
        setHidden(true);
      } else if (y < lastScrollY.current - 8) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (pathname === '/sorter') return null;

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <>
      <nav
        className={`nav${scrolled ? ' scrolled' : ''}${hidden ? ' nav-hidden' : ''}${menuOpen ? ' nav-menu-open' : ''}`}
      >
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <img src={logo} alt="KAHO Logo" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`nav-menu-toggle${menuOpen ? ' is-open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="nav-index-drawer"
          aria-label={menuOpen ? '메뉴 닫기' : '목차 열기'}
        >
          <span className="nav-menu-bar" aria-hidden />
          <span className="nav-menu-bar" aria-hidden />
          <span className="nav-menu-bar" aria-hidden />
        </button>
      </nav>

      <div
        className={`nav-drawer-backdrop${menuOpen ? ' is-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden
      />
      <aside
        id="nav-index-drawer"
        className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-drawer-links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={closeMenu}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
