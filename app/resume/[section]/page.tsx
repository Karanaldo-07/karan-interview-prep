import { notFound } from "next/navigation";
import { resumePrep } from "@/data/resumePrep";
import { getResumePrepForProfile } from "@/data/resumePrepDynamic";
import { getCurrentProfile } from "@/lib/profile";
import LiveResumePrep from "./LiveResumePrep";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return Object.keys(resumePrep).map((section) => ({ section }));
}

type PageProps = {
  params: Promise<{ section: string }>;
};

const researchSources = [
  { label: "Microsoft Learn — AZ-900 study guide", href: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900" },
  { label: "Indeed — educational background interview guidance", href: "https://www.indeed.com/career-advice/interviewing/interview-question-tell-me-about-your-educational-background" },
  { label: "Indeed India — skills interview guidance", href: "https://in.indeed.com/career-advice/interviewing/tell-me-about-your-skills-sample-answer" },
  { label: "ML project interview framework — Interview Node", href: "https://www.interviewnode.com/post/how-to-discuss-real-world-ml-projects-in-interviews-with-examples" }
];

export default async function ResumePrepPage({ params }: PageProps) {
  const { section } = await params;
  const profile = await getCurrentProfile();
  const content = getResumePrepForProfile(profile)[section];

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
          <p className="detail-live-note">✓ Synced with your latest saved resume</p>
        </div>
      </section>

      <LiveResumePrep initialProfile={profile} initialContent={content} />

      <section className="section research-section">
        <div className="container">
          <div className="card">
            <div className="meta">Research basis</div>
            <p className="research-intro">Interview guidance and technical preparation were cross-checked against the sources below. Your personal answers remain grounded in the information currently saved in your resume; do not claim a metric, responsibility or technology that you did not actually use.</p>
            <div className="research-links">
              {researchSources.map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>
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
        <div className="container">© {new Date().getFullYear()} {profile.name} · Resume &amp; Interview Preparation</div>
      </footer>
    </main>
  );
}
