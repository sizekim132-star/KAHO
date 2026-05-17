// src/sections/MembersSection.jsx
import React from 'react';
import PhotoBox from '../components/PhotoBox';
import { MEMBERS } from '../data/constants';

export default function MembersSection() {
  return (
    <section id="members" className="section section-members">
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
