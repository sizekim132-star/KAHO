import React from 'react';

/* ─── HOOKS ─── */
import useScrollSpy from '../hooks/useScrollSpy';
import useRevealObserver from '../hooks/useRevealObserver';

/* ─── SECTIONS ─── */
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import MusicSection from '../sections/MusicSection';
import MembersSection from '../sections/MembersSection';
import RecruitSection from '../sections/RecruitSection';
import ShowsSection from '../sections/ShowsSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

/* ─── PAGE ─── */
export default function Home() {
  const { activeSection, videoOpacity } = useScrollSpy();
  useRevealObserver();

  return (
    <div style={{ paddingTop: 60 }}>
      <HeroSection
        videoOpacity={videoOpacity}
        activeSection={activeSection}
      />
      <AboutSection />
      <MusicSection />
      <MembersSection />
      <ShowsSection />
      <RecruitSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
