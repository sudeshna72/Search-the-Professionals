import React from 'react';
import './profilePage.css';
import Header from '../../shared/components/header/header';

export default function Profile() {
  return (
    <>
      <Header/>
      {/* Profile Card */}
      <div className="profile-card">
        <div className="cover-photo">
          <img src="../../src/assets/female.png" width= "200px" alt="Cover" />
        </div>

        <div className="profile-info">
          <img src="../../src/assets/photo.png" alt="Avatar" className="avatar" />

          <div className="user-info">
            <h2>Stiped QWERTY</h2>
            <p>245 connections</p>
          </div>

          <div className="action-buttons">
            <button className="btn">Connect</button>
            <button className="btn">Message</button>
          </div>
        </div>

        <div className="tab-bar">
          <button className="tab">Profile</button>
          <button className="tab">Skills</button>
          <button className="tab">Endorsements</button>
          <button className="tab">Posts</button>
          <button className="tab">Recommendations</button>
        </div>
      </div>

      {/* About Section */}
      <div className="profile-section">
        <h3>About</h3>
        <p>
          I'm a dedicated goal-oriented individual with a high energy level, honed communication skills, strong organization skills,
          and meticulous attention to detail. Currently I'm a UX/UI designer. I'm experienced in UX/UI design in Figma software and Behance.
          I'm passionate about designing and web development. I absolutely love what I do and passionate about being better every day.
        </p>
      </div>

      {/* Experience Section */}
      <div className="profile-section">
        <h3>Experience</h3>
        <ul>
          <li><strong>UX/UI Designer</strong> – Freelance (2023 – Present)</li>
          <li><strong> App Development</strong> – Pixel Labs (2022 – 2023)</li>
          <li><strong>Web Developer</strong> – CodeNest Studio (2021 – 2022)</li>
        </ul>
      </div>

      {/* Skills Section */}
      <div className="profile-section">
        <h3>Skills</h3>
        <ul className="skills-list">
          <li>Figma</li>
          <li>Adobe XD</li>
          <li>React.js</li>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>Wireframing</li>
          <li>User Research</li>
        </ul>
      </div>
    </>
  );
}