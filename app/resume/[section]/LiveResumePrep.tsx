"use client";

import { useEffect, useState } from "react";
import { getResumePrepForProfile } from "@/data/resumePrepDynamic";
import type { profile as profileValue } from "@/data/profile";
import type { PrepSection } from "@/data/resumePrep";

type Profile = typeof profileValue;

type Props = {
  initialProfile: Profile;
  initialContent: PrepSection;
};

export default function LiveResumePrep({ initialProfile, initialContent }: Props) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        const data = await response.json();
        const cloudProfile = data?.profile as Profile | undefined;
        const localProfileText = localStorage.getItem("karan-profile");
        const localProfile = localProfileText ? JSON.parse(localProfileText) as Profile : undefined;
        const preferLocal = localStorage.getItem("karan-profile-local-pending") === "1";
        const latestProfile = preferLocal && localProfile ? localProfile : (response.ok && cloudProfile ? cloudProfile : localProfile ?? initialProfile);
        const latestContent = getResumePrepForProfile(latestProfile)[initialContent.slug];
        if (mounted && latestContent) setContent(latestContent);
      } catch {
        try {
          const local = localStorage.getItem("karan-profile");
          if (!mounted || !local) return;
          const latestContent = getResumePrepForProfile(JSON.parse(local) as Profile)[initialContent.slug];
          if (latestContent) setContent(latestContent);
        } catch {}
      }
    })();

    return () => { mounted = false; };
  }, [initialContent.slug, initialProfile]);

  return (
    <section className="section prep-detail-section">
      <div className="container">
        <div className="prep-detail-grid">
          <aside className="prep-sidebar">
            <div className="card sticky-card">
              <div className="meta">How to present it</div>
              <p>{content.howToPresent}</p>
              <div className="meta prep-meta-gap">Your current resume evidence</div>
              <ul className="evidence-list">
                {content.keyPoints.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </aside>

          <div className="question-list">
            <div className="section-head detail-head">
              <div>
                <h2>Questions &amp; Model Answers</h2>
                <p>{content.questions.length} questions prepared from your current resume plus the detailed interview bank.</p>
              </div>
            </div>

            {content.questions.map((item, index) => (
              <article className="prep-question" key={`${item.question}-${index}`}>
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
  );
}
