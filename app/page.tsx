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
          <a className="brand" href="#top">KB<span>.</span></a>
          <div className="nav-links">
            <a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#certifications">Certifications</a><a href="/admin">Edit</a>
          </div>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="container">
          <div className="eyebrow">Portfolio · Resume · Interview Prep</div>
          <h1>Hi, I&apos;m <span className="gradient">{profile.name}</span>.</h1>
          <p><strong>{profile.headline}</strong><br />{profile.intro}</p>
          <div className="actions">
            <a className="btn primary" href="#projects">View projects</a>
            <a className="btn" href="#experience">My experience</a>
            <a className="btn" href="/admin">Open editor</a>
          </div>
        </div>
      </section>

      <section className="section" id="about"><div className="container">
        <div className="section-head"><div><h2>About</h2><p>A concise, interview-ready profile.</p></div></div>
        <div className="card"><p>{profile.intro}</p><p><strong>Education</strong><br />{profile.education}</p></div>
      </div></section>

      <section className="section" id="experience"><div className="container">
        <div className="section-head"><div><h2>Experience</h2><p>Internships and practical exposure.</p></div></div>
        <div className="grid">{profile.experience.map((item) => <article className="card" key={`${item.company}-${item.role}`}><div className="meta">{item.period}</div><h3>{item.role}</h3><p><strong>{item.company}</strong></p><ul>{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul><div className="tags">{item.skills.map((s) => <span className="tag" key={s}>{s}</span>)}</div></article>)}</div>
      </div></section>

      <section className="section" id="projects"><div className="container">
        <div className="section-head"><div><h2>Projects</h2><p>Selected AI and machine-learning work.</p></div></div>
        <div className="grid">{profile.projects.map((item) => <article className="card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p><ul>{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul><div className="tags">{item.skills.map((s) => <span className="tag" key={s}>{s}</span>)}</div></article>)}</div>
      </div></section>

      <section className="section" id="skills"><div className="container">
        <div className="section-head"><div><h2>Skills</h2><p>Grouped exactly around the resume skill areas.</p></div></div>
        <div className="skill-grid">{Object.entries(profile.skills).map(([group, skills]) => <div className="skill" key={group}><strong>{group}</strong><span>{skills.join(" · ")}</span></div>)}</div>
      </div></section>

      <section className="section" id="certifications"><div className="container">
        <div className="section-head"><div><h2>Certifications & achievements</h2><p>Credentials and research.</p></div></div>
        <div className="grid">{profile.certifications.map((c) => <div className="card" key={c}><h3>{c}</h3></div>)}<div className="card"><div className="meta">Research</div><h3>{profile.publication}</h3></div></div>
      </div></section>

      <footer className="footer"><div className="container">© {new Date().getFullYear()} {profile.name} · Built with Next.js · Interview preparation features coming next.</div></footer>
    </main>
  );
}
