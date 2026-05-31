// src/components/Nav.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { YT_CHANNEL, IG_URL, SC_URL } from '../data/constants';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Feed', href: '#music' },
  { label: 'Artists', href: '#members' },
  { label: 'History', href: '#shows' },
  { label: 'Recruit', href: '#recruit' },
  { label: 'Contact', href: '#contact' },
];

const MOBILE_MQ = '(max-width: 768px)';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
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
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = () => {
      if (!mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const updateActive = () => {
      const viewportAnchor = window.innerHeight * 0.4;
      let bestHref = '#home';
      let bestDistance = Number.POSITIVE_INFINITY;
      LINKS.forEach((l) => {
        const id = l.href.replace('#', '');
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const distance = Math.abs(rect.top - viewportAnchor);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestHref = l.href;
        }
      });
      setActiveHref(bestHref);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', updateActive);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', updateActive);
    };
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
              <a href={l.href} onClick={closeMenu}>
                {l.label}
              </a>
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
                <span className={`nav-drawer-link-text${activeHref === l.href ? ' is-active' : ''}`}>
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-drawer-socials">
          <a href={YT_CHANNEL} target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube size={22} />
          </a>
          <a href={IG_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram size={22} />
          </a>
          <a href={SC_URL} target="_blank" rel="noreferrer" aria-label="SoundCloud">
            <FaSoundcloud size={22} />
          </a>
        </div>
      </aside>
    </>
  );
}
