import { resumePrep, type PrepQuestion, type PrepSection } from "@/data/resumePrep";
import type { profile as profileValue } from "@/data/profile";

type Profile = typeof profileValue;

const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

function cloneSections(): Record<string, PrepSection> {
  return Object.fromEntries(
    Object.entries(resumePrep).map(([slug, section]) => [
      slug,
      {
        ...section,
        keyPoints: [...section.keyPoints],
        questions: section.questions.map((question) => ({
          ...question,
          followUps: question.followUps ? [...question.followUps] : undefined,
        })),
      },
    ])
  );
}

function skillQuestions(profile: Profile): PrepQuestion[] {
  const projectMatches = new Map<string, string[]>();
  const experienceMatches = new Map<string, string[]>();

  Object.entries(profile.skills).forEach(([, skills]) => {
    skills.forEach((skill) => {
      const normalized = skill.toLowerCase();
      const projects = profile.projects
        .filter((project) => [...project.skills, project.title, project.description].join(" ").toLowerCase().includes(normalized))
        .map((project) => project.title);
      const experiences = profile.experience
        .filter((experience) => [...experience.skills, ...experience.bullets, experience.role].join(" ").toLowerCase().includes(normalized))
        .map((experience) => `${experience.role} at ${experience.company}`);
      projectMatches.set(skill, projects);
      experienceMatches.set(skill, experiences);
    });
  });

  return Object.entries(profile.skills).flatMap(([group, skills]) =>
    skills.map((skill) => {
      const projects = projectMatches.get(skill) ?? [];
      const experiences = experienceMatches.get(skill) ?? [];
      const usage = unique([...projects.map((item) => `a project such as ${item}`), ...experiences.map((item) => `experience such as ${item}`)]);
      const usageSentence = usage.length
        ? `On my resume, I can connect it to ${usage.join(" and ")}.`
        : `I would explain my actual level honestly and give the interviewer a concrete example of where I have practiced it rather than overstating my expertise.`;

      return {
        question: `How would you explain ${skill}, and where have you used it?`,
        answer: `${skill} is one of the skills I list under ${group}. ${usageSentence} In an interview, I would focus on what I can actually do with ${skill}, the problem I used it to solve, and what I am still learning.`,
        followUps: [`What is the most important concept in ${skill} that you know?`, `What problem did you face while using ${skill}?`],
      };
    })
  );
}

function experienceQuestions(profile: Profile): PrepQuestion[] {
  return profile.experience.map((item) => ({
    question: `Tell me about your ${item.role} experience at ${item.company}.`,
    answer: `I worked as ${item.role} at ${item.company} during ${item.period}. My main responsibilities and learning included ${item.bullets.join(" ")} The skills I can discuss from this experience are ${item.skills.join(", ")}. I would be careful to describe only the work I actually performed and then explain what I learned and how it applies to the role.`,
    followUps: [
      `What was your most important responsibility at ${item.company}?`,
      `Which technical skill did you use most during this experience?`,
      `What did you learn from this experience?`,
    ],
  }));
}

function projectQuestions(profile: Profile): PrepQuestion[] {
  return profile.projects.map((item) => ({
    question: `Explain your project: ${item.title}.`,
    answer: `${item.description} I would present the project by explaining the problem first, then the approach and technologies: ${item.skills.join(", ")}. The main work included ${item.bullets.join(" ")} I would also be ready to explain limitations, evaluation and what I would improve next without inventing metrics that are not in my records.`,
    followUps: [
      `Why did you choose ${item.skills[0] ?? "that approach"}?`,
      "What was the hardest part of the project?",
      "How did you evaluate whether the project worked?",
    ],
  }));
}

function achievementQuestions(profile: Profile): PrepQuestion[] {
  const items = unique([profile.publication, ...profile.certifications]);

  return items.map((item) => ({
    question: `Tell me about this achievement or certification: ${item}.`,
    answer: `This is part of my current resume under achievements and certifications: ${item}. In an interview, I would explain why I pursued it, what I learned from it, and how that learning connects to the role. I would keep the answer factual and avoid claiming a level of expertise or a result that the certification or achievement itself does not prove.`,
    followUps: [
      "What did you learn from it?",
      "How have you applied that learning in a project or practical situation?",
    ],
  }));
}

/** Keeps interview-preparation content synchronized with the latest saved resume. */
export function getResumePrepForProfile(profile: Profile): Record<string, PrepSection> {
  const sections = cloneSections();

  sections.education.keyPoints = unique([
    profile.education,
    profile.institution,
    `Graduation year: ${profile.graduationYear}`,
    ...sections.education.keyPoints,
  ]);

  sections.skills.keyPoints = unique(
    Object.entries(profile.skills).map(([group, skills]) => `${group}: ${skills.join(", ")}`)
  );
  sections.skills.questions = [...sections.skills.questions, ...skillQuestions(profile)];

  sections.experience.keyPoints = unique(
    profile.experience.map((item) => `${item.role} — ${item.company} (${item.period})`)
  );
  sections.experience.questions = [...sections.experience.questions, ...experienceQuestions(profile)];

  sections.projects.keyPoints = unique(
    profile.projects.map((item) => `${item.title}: ${item.skills.join(", ")}`)
  );
  sections.projects.questions = [...sections.projects.questions, ...projectQuestions(profile)];

  sections.achievements.keyPoints = unique([profile.publication, ...profile.certifications]);
  sections.achievements.questions = [...sections.achievements.questions, ...achievementQuestions(profile)];

  return sections;
}
