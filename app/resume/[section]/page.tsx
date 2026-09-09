import { notFound } from "next/navigation";
import { resumePrep } from "@/data/resumePrep";

export function generateStaticParams() {
  return Object.keys(resumePrep).map((section) => ({ section }));
}

type PageProps = {
  params: Promise<{ section: string }>;
};

export default async function ResumePrepPage({ params }: PageProps) {
  const { section } = await params;
  const content = resumePrep[section];

  if (!content) notFound();

  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="/">KARAN BHISE</a>
          <div className="nav-links">
            <a href="/resume/education">Education</a>
            <a href="/resume/skills">Skills</a>
            <a href="/resume/experience">Experience</a>
            <a href="/resume/projects">Projects</a>
            <a href="/resume/achievements">Achievements</a>
            <a href="/interview">Interview Prep</a>
          </div>
        </div>
      </nav>

      <section className="prep-detail-hero">
        <div className="container">
          <a className="back-link" href="/">← Back to resume</a>
          <p className="eyebrow">Resume Section · Interview Preparation</p>
          <h1>{content.title}</h1>
          <p className="detail-subtitle">{content.subtitle}</p>
        </div>
      </section>

      <section className="section prep-detail-section">
        <div className="container">
          <div className="prep-detail-grid">
            <aside className="prep-sidebar">
              <div className="card sticky-card">
                <div className="meta">How to present it</div>
                <p>{content.howToPresent}</p>
                <div className="meta prep-meta-gap">Your resume evidence</div>
                <ul className="evidence-list">
                  {content.keyPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </aside>

            <div className="question-list">
              <div className="section-head detail-head">
                <div>
                  <h2>Questions &amp; Model Answers</h2>
                  <p>{content.questions.length} questions prepared for this section.</p>
                </div>
              </div>

              {content.questions.map((item, index) => (
                <article className="prep-question" key={item.question}>
                  <div className="prep-question-number">Question {index + 1}</div>
                  <h3>{item.question}</h3>
                  <div className="answer-label">How you can answer</div>
                  <p className="prep-answer">{item.answer}</p>
                  {item.followUps?.length ? (
                    <div className="follow-ups">
                      <strong>Possible follow-ups</strong>
                      <ul>{item.followUps.map((followUp) => <li key={followUp}>{followUp}</li>)}</ul>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section prep-navigation">
        <div className="container">
          <div className="card prep-nav-card">
            <div>
              <div className="meta">Continue preparing</div>
              <h2>Practice the complete interview</h2>
              <p>Use the full question bank for HR, technical, project, internship and certification cross-questioning.</p>
            </div>
            <div className="actions">
              <a className="btn primary" href="/interview">Open Interview Prep →</a>
              <a className="btn" href="/">Return to Resume</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Karan Bhise · Resume &amp; Interview Preparation</div>
      </footer>
    </main>
  );
}
