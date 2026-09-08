"use client";

import { useEffect, useState } from "react";
import { profile as initialProfile } from "@/data/profile";

type Profile = typeof initialProfile;

export default function AdminPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("karan-profile");
    setText(saved || JSON.stringify(initialProfile, null, 2));
  }, []);

  function save() {
    try {
      const parsed = JSON.parse(text) as Profile;
      localStorage.setItem("karan-profile", JSON.stringify(parsed));
      setMessage("Saved on this device. Refresh the portfolio to see the changes.");
    } catch {
      setMessage("The data is not valid JSON. Please fix it and try again.");
    }
  }

  function reset() {
    localStorage.removeItem("karan-profile");
    setText(JSON.stringify(initialProfile, null, 2));
    setMessage("Reset to the resume-based default data.");
  }

  return (
    <main className="container" style={{ padding: "50px 0" }}>
      <a href="/" style={{ color: "var(--accent)" }}>← Back to portfolio</a>
      <div style={{ margin: "30px 0" }}>
        <div className="eyebrow">Content editor</div>
        <h1 style={{ fontSize: "clamp(38px, 6vw, 60px)" }}>Update your profile</h1>
        <p style={{ color: "var(--muted)", maxWidth: 760, lineHeight: 1.7 }}>
          This first editor lets you update projects, internships, skills, certifications and other profile data without changing the page code. Changes are currently stored in this browser only; the next stage will add secure cross-device storage and proper add/edit/delete forms.
        </p>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} style={{ width: "100%", minHeight: 600, padding: 18, borderRadius: 16, border: "1px solid var(--line)", background: "#050c16", color: "#dbeafe", fontFamily: "monospace", fontSize: 13, lineHeight: 1.55 }} />
      <div className="actions">
        <button className="btn primary" onClick={save}>Save changes</button>
        <button className="btn" onClick={reset}>Reset defaults</button>
      </div>
      {message && <p style={{ color: "var(--accent)", marginTop: 15 }}>{message}</p>}
    </main>
  );
}
