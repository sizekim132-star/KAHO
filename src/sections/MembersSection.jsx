// src/sections/MembersSection.jsx
import React from 'react';
import PhotoBox from '../components/PhotoBox';
import { MEMBERS } from '../data/constants';

export default function MembersSection() {
  return (
    <section id="members" className="section section-members" style={{ position: 'relative', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.5,
          filter: 'brightness(0.7)'
        }}
      >
        <source src="https://raw.githubusercontent.com/sizekim132-star/kaho-assets/main/Backwater.mp4" type="video/mp4" />
      </video>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal-text">
          <h2 className="title" style={{ marginBottom: '3.5rem' }}>Members</h2>
        </div>
        <div className="member-directory">
          {MEMBERS.map((m, i) => (
            <div key={i} className="member-row reveal-text" style={{ transitionDelay: `${(i) * 0.1}s` }}>
              <div className="member-photo-wrap">
                <PhotoBox src={m.img} w="100%" h="100%" label="사진" />
              </div>
              <div className="member-info">
                <div className="member-name-group">
                  <h3 className="member-name">{m.name}</h3>
                  <span className="member-animal">{m.animal}</span>
                </div>
                <div className="member-role">{m.role}</div>
                <p className="member-bio">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
