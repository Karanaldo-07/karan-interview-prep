"use client";

import { useEffect, useMemo, useState } from "react";
import { interviewCategories, interviewQuestions } from "@/data/interview";

export default function InterviewPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("karan-interview-progress");
    if (saved) {
      try { setProgress(JSON.parse(saved)); } catch { /* use empty progress */ }
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return interviewQuestions.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch = !q || `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const updateProgress = (id: string, value: string) => {
    const next = { ...progress, [id]: value };
    setProgress(next);
    localStorage.setItem("karan-interview-progress", JSON.stringify(next));
  };

  const learned = interviewQuestions.filter((q) => progress[q.id] === "Confident").length;
  const learning = interviewQuestions.filter((q) => progress[q.id] === "Learning").length;

  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="/">KB<span>.</span></a>
          <div className="nav-links">
            <a href="/">Portfolio</a><a href="#questions">Questions</a><a href="#progress">Progress</a><a href="/admin">Edit</a>
          </div>
        </div>
      </nav>

      <section className="hero interview-hero">
        <div className="container">
          <div className="eyebrow">Interview Preparation</div>
          <h1>Prepare with <span className="gradient">your resume</span> in mind.</h1>
          <p>Practice HR, technical, project, internship, certification and resume-based questions using answers grounded in the information already in your profile.</p>
          <div className="stats" id="progress">
            <div className="stat"><strong>{interviewQuestions.length}</strong><span>Total questions</span></div>
            <div className="stat"><strong>{learned}</strong><span>Confident</span></div>
            <div className="stat"><strong>{learning}</strong><span>Learning</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="questions">
        <div className="container">
          <div className="section-head"><div><h2>Question bank</h2><p>Open an answer, review the key points, then mark your confidence level.</p></div></div>
          <div className="interview-controls">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." aria-label="Search interview questions" />
            <div className="filters">
              {interviewCategories.map((item) => <button key={item} className={`filter ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>

          <div className="question-list">
            {filtered.map((item) => {
              const status = progress[item.id] || "Not started";
              return (
                <article className="question-card" key={item.id}>
                  <div className="question-top"><span className="tag">{item.category}</span><span className={`status ${status.toLowerCase().replace(" ", "-")}`}>{status}</span></div>
                  <h3>{item.question}</h3>
                  <div className="key-points"><strong>Key points</strong>{item.points.map((point) => <span key={point}>{point}</span>)}</div>
                  {revealed[item.id] && <div className="answer"><strong>Interview-ready answer</strong><p>{item.answer}</p></div>}
                  <div className="question-actions">
                    <button className="btn primary" onClick={() => setRevealed((old) => ({ ...old, [item.id]: !old[item.id] }))}>{revealed[item.id] ? "Hide answer" : "Show answer"}</button>
                    <select value={status} onChange={(e) => updateProgress(item.id, e.target.value)} aria-label={`Progress for ${item.question}`}>
                      <option>Not started</option><option>Learning</option><option>Confident</option>
                    </select>
                  </div>
                </article>
              );
            })}
          </div>
          {filtered.length === 0 && <div className="card empty">No questions match your search.</div>}
        </div>
      </section>

      <footer className="footer"><div className="container">Interview Prep · Progress is saved on this browser for now.</div></footer>
    </main>
  );
}
