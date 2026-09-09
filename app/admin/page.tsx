"use client";

import { useEffect, useState } from "react";
import { profile as initialProfile } from "@/data/profile";

type Profile = typeof initialProfile;
type Experience = Profile["experience"][number];
type Project = Profile["projects"][number];

const splitLines = (value: string) => value.split(/\n/).map((x) => x.trim()).filter(Boolean);
const splitComma = (value: string) => value.split(",").map((x) => x.trim()).filter(Boolean);
function cloneProfile(): Profile { return JSON.parse(JSON.stringify(initialProfile)); }

export default function AdminPage() {
  const [profile, setProfile] = useState<Profile>(cloneProfile());
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => setProfile((old) => ({ ...old, [key]: value }));

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        const data = await response.json();
        if (data.profile) setProfile(data.profile as Profile);
      } catch {}
      const local = localStorage.getItem("karan-profile");
      if (local) { try { setProfile(JSON.parse(local) as Profile); } catch {} }
      setLoading(false);
    })();
  }, []);

  const login = async () => {
    setMessage("Signing in…");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "Login failed."); return; }
    setLoggedIn(true); setPassword(""); setMessage("Signed in. Cloud saving is enabled.");
    const cloud = await fetch("/api/profile", { cache: "no-store" });
    if (cloud.ok) { const value = await cloud.json(); if (value.profile) setProfile(value.profile); }
  };

  const save = async () => {
    localStorage.setItem("karan-profile", JSON.stringify(profile));
    if (!loggedIn) {
      localStorage.setItem("karan-profile-local-pending", "1");
      setMessage("Saved on this device. Sign in above to save to the cloud.");
      return;
    }
    const response = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profile }) });
    const data = await response.json();
    if (response.ok) localStorage.removeItem("karan-profile-local-pending");
    setMessage(response.ok ? "Saved to the cloud and this device." : (data.error || "Cloud save failed."));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); setLoggedIn(false); setMessage("Signed out. Local editing remains available."); };
  const reset = () => { const fresh = cloneProfile(); localStorage.removeItem("karan-profile"); localStorage.removeItem("karan-profile-local-pending"); setProfile(fresh); setMessage("Reset to the original resume-based content."); };
  const addExperience = () => update("experience", [...profile.experience, { role: "New role", company: "Company", period: "Period", bullets: ["Responsibility or achievement"], skills: ["Skill"] }]);
  const deleteExperience = (index: number) => update("experience", profile.experience.filter((_, i) => i !== index));
  const addProject = () => update("projects", [...profile.projects, { title: "New project", description: "Project description", bullets: ["What you built"], skills: ["Technology"] }]);
  const deleteProject = (index: number) => update("projects", profile.projects.filter((_, i) => i !== index));

  if (loading) return <main><section className="hero"><div className="container"><p>Loading profile manager…</p></div></section></main>;

  return <main>
    <nav className="nav"><div className="container nav-inner"><a className="brand" href="/">KB<span>.</span></a><div className="nav-links"><a href="/">Portfolio</a><a href="/interview">Interview Prep</a><a href="#profile">Profile</a><a href="#experience">Experience</a><a href="#projects">Projects</a></div></div></nav>

    <section className="hero admin-hero"><div className="container">
      <div className="eyebrow">Resume & Profile Manager</div><h1>Edit <span className="gradient">without coding.</span></h1>
      <p>Edit your profile, internships, projects, skills and certifications. Changes can be saved locally, and authenticated saves go to the cloud database.</p>
      <div className="actions"><button className="btn primary" onClick={save}>Save all changes</button><button className="btn" onClick={reset}>Reset defaults</button><a className="btn" href="/">Preview portfolio</a>{loggedIn && <button className="btn" onClick={logout}>Sign out</button>}</div>
      {message && <p className="save-message">✓ {message}</p>}
    </div></section>

    {!loggedIn && <section className="section"><div className="container"><div className="editor-card"><div className="section-head"><div><h2>Cloud access</h2><p>Sign in to save your changes across devices. Your password is never stored in browser storage.</p></div></div><div className="form-grid"><label>Admin password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} placeholder="Enter admin password" /></label><div className="actions"><button className="btn primary" onClick={login}>Sign in</button></div></div></div></div></section>}

    <section className="section" id="profile"><div className="container"><div className="section-head"><div><h2>Profile</h2><p>Core information shown at the top of your portfolio.</p></div></div><div className="form-grid">
      <label>Name<input value={profile.name} onChange={(e) => update("name", e.target.value)} /></label><label>Headline<input value={profile.headline} onChange={(e) => update("headline", e.target.value)} /></label>
      <label className="wide">Introduction<textarea value={profile.intro} onChange={(e) => update("intro", e.target.value)} /></label><label className="wide">Education<textarea value={profile.education} onChange={(e) => update("education", e.target.value)} /></label>
    </div></div></section>

    <section className="section" id="experience"><div className="container"><div className="section-head"><div><h2>Experience</h2><p>Add, edit or delete internships and other experience.</p></div><button className="btn primary" onClick={addExperience}>+ Add experience</button></div><div className="editor-list">
      {profile.experience.map((item: Experience, index) => <article className="editor-card" key={index}><div className="editor-card-head"><strong>Experience {index + 1}</strong><button className="danger" onClick={() => deleteExperience(index)}>Delete</button></div><div className="form-grid">
        <label>Role<input value={item.role} onChange={(e) => { const next = [...profile.experience]; next[index] = { ...item, role: e.target.value }; update("experience", next); }} /></label>
        <label>Company<input value={item.company} onChange={(e) => { const next = [...profile.experience]; next[index] = { ...item, company: e.target.value }; update("experience", next); }} /></label>
        <label>Period<input value={item.period} onChange={(e) => { const next = [...profile.experience]; next[index] = { ...item, period: e.target.value }; update("experience", next); }} /></label>
        <label>Skills <span className="hint">comma separated</span><input value={item.skills.join(", ")} onChange={(e) => { const next = [...profile.experience]; next[index] = { ...item, skills: splitComma(e.target.value) }; update("experience", next); }} /></label>
        <label className="wide">Responsibilities / achievements <span className="hint">one item per line</span><textarea value={item.bullets.join("\n")} onChange={(e) => { const next = [...profile.experience]; next[index] = { ...item, bullets: splitLines(e.target.value) }; update("experience", next); }} /></label>
      </div></article>)}
    </div></div></section>

    <section className="section" id="projects"><div className="container"><div className="section-head"><div><h2>Projects</h2><p>Keep your portfolio and interview project stories up to date.</p></div><button className="btn primary" onClick={addProject}>+ Add project</button></div><div className="editor-list">
      {profile.projects.map((item: Project, index) => <article className="editor-card" key={index}><div className="editor-card-head"><strong>Project {index + 1}</strong><button className="danger" onClick={() => deleteProject(index)}>Delete</button></div><div className="form-grid">
        <label className="wide">Title<input value={item.title} onChange={(e) => { const next = [...profile.projects]; next[index] = { ...item, title: e.target.value }; update("projects", next); }} /></label>
        <label className="wide">Description<textarea value={item.description} onChange={(e) => { const next = [...profile.projects]; next[index] = { ...item, description: e.target.value }; update("projects", next); }} /></label>
        <label className="wide">Project points <span className="hint">one item per line</span><textarea value={item.bullets.join("\n")} onChange={(e) => { const next = [...profile.projects]; next[index] = { ...item, bullets: splitLines(e.target.value) }; update("projects", next); }} /></label>
        <label className="wide">Technologies <span className="hint">comma separated</span><input value={item.skills.join(", ")} onChange={(e) => { const next = [...profile.projects]; next[index] = { ...item, skills: splitComma(e.target.value) }; update("projects", next); }} /></label>
      </div></article>)}
    </div></div></section>

    <section className="section"><div className="container"><div className="section-head"><div><h2>Skills</h2><p>Edit each skill group. Separate skills with commas.</p></div></div><div className="form-grid">
      {Object.entries(profile.skills).map(([group, skills]) => <label key={group}>{group}<input value={skills.join(", ")} onChange={(e) => update("skills", { ...profile.skills, [group]: splitComma(e.target.value) })} /></label>)}
    </div></div></section>

    <section className="section"><div className="container"><div className="section-head"><div><h2>Certifications & publication</h2><p>One certification or achievement per line.</p></div></div><div className="form-grid">
      <label className="wide">Certifications<textarea value={profile.certifications.join("\n")} onChange={(e) => update("certifications", splitLines(e.target.value))} /></label><label className="wide">Research publication<textarea value={profile.publication} onChange={(e) => update("publication", e.target.value)} /></label>
    </div><div className="actions"><button className="btn primary" onClick={save}>Save all changes</button></div></div></section>
    <footer className="footer"><div className="container">Resume & Profile Manager · Cloud sync is available after secure sign-in.</div></footer>
  </main>;
}
