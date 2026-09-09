"use client";

import { useEffect, useState } from "react";
import { profile as initialProfile } from "@/data/profile";

type Profile = typeof initialProfile;

export default function Home() {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  useEffect(() => {
    const saved = localStorage.getItem("karan-profile");
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch { /* keep source data */ }
    }
  }, []);

  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">KARAN BHISE</a>
          <div className="nav-links">
            <a href="#education">Education</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#certifications">Certifications</a>
            <a href="/interview">Interview Prep</a>
            <a href="/admin">Edit</a>
          </div>
        </div>
      </nav>

      <section className="resume-shell" id="top">
        <div className="resume-paper">
          <header className="resume-header">
            <h1>{profile.name}</h1>
            <p className="resume-contact">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>•</span>
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/karan-bhise-a422951a5</a>
            </p>
            <p className="resume-title">{profile.headline}</p>
          </header>

          <section className="resume-section" id="education">
            <h2>EDUCATION</h2>
            <div className="resume-row">
              <div>
                <h3>{profile.education}</h3>
                <p>{profile.institution}</p>
              </div>
              <strong>{profile.graduationYear}</strong>
            </div>
          </section>

          <section className="resume-section" id="skills">
            <h2>TECHNICAL SKILLS</h2>
            <div className="resume-skills">
              {Object.entries(profile.skills).map(([group, skills]) => (
                <p key={group}><strong>{group}:</strong> {skills.join(", ")}</p>
              ))}
            </div>
          </section>

          <section className="resume-section" id="experience">
            <h2>PROFESSIONAL EXPERIENCE</h2>
            {profile.experience.map((item) => (
              <article className="resume-entry" key={`${item.company}-${item.role}`}>
                <div className="resume-row">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="resume-company">{item.company} <span>· Remote, India</span></p>
                  </div>
                  <strong>{item.period}</strong>
                </div>
                <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </article>
            ))}
          </section>

          <section className="resume-section" id="projects">
            <h2>PROJECTS</h2>
            {profile.projects.map((item) => (
              <article className="resume-entry" key={item.title}>
                <h3>{item.title}</h3>
                <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </article>
            ))}
          </section>

          <section className="resume-section" id="certifications">
            <h2>ACHIEVEMENTS &amp; CERTIFICATIONS</h2>
            <ul className="resume-list">
              <li>{profile.publication}</li>
              {profile.certifications.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <div className="resume-actions">
            <a className="btn primary" href="/interview">Interview Preparation →</a>
            <a className="btn" href="/admin">Edit Resume</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} {profile.name} · Resume &amp; Interview Preparation</div>
      </footer>
    </main>
  );
}
