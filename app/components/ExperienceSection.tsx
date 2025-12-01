// app/components/ExperienceSection.tsx

type Experience = {
  range: string;
  title: string;
  summary: string;
  skills: string[];
  details: string[];
};

const experiences: Experience[] = [
  {
    range: "2025 — Present",
    title: "Software Developer · ADAPT Community Network",
    summary:
      "Design and maintain Power Platform apps, manage SQL Server data, integrate with Microsoft Fabric/Azure, and deliver stakeholder support and continuous system improvements.",
    skills: [
      "Power Platform",
      "Power Apps",
      "Power Automate",
      "SQL Server",
      "Azure Integration",
    ],
    details: [
      "Design, build, and maintain scalable Power Apps solutions, automating workflows and improving efficiency across multiple departments.",
      "Manage SQL Server tables, queries, and data models while ensuring accuracy, performance, and integration with Power Platform and Microsoft Fabric/Azure services.",
      "Create dynamic user interfaces, dashboards, and role-based logic to support clinicians, educators, HR, and operations teams.",
      "Provide ongoing stakeholder support — troubleshooting issues, refining features, and deploying continuous enhancements based on real-world feedback.",
    ],
  },
  {
    range: "2021 — 2025",
    title: "Web Developer · ADAPT Community Network",
    summary:
      "Develop and maintain accessible, user-focused WordPress sites using HTML, CSS, JavaScript, and PHP to support organizational goals.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "WordPress",
      "PHP",
      "API Integration",
      "Responsive Design",
      "SEO",
      "Accessibility",
    ],
    details: [
      "Build and refine custom WordPress themes and UI components to deliver responsive, accessible, and user-centered experiences.",
      "Build custom integrations and features using REST APIs to connect WordPress with internal systems and third-party services.",
      "Optimize performance through code refinement, caching, image optimization, and streamlined plugin/theme management.",
      "Collaborate with multiple departments to ensure accurate updates, consistent branding, and smooth site functionality.",
    ],
  },
  {
    range: "2016 — 2024",
    title: "Founder & Web Developer · webDefinitely",
    summary:
      "Partnered with local clients to build custom websites and brand identities, managing everything from domain setup to SEO to deliver polished, user-friendly digital experiences.",
    skills: [
      "Web Development",
      "Full Stack Development",
      "SEO",
      "Client Collaboration",
      "Responsive Design",
      "Accessibility",
    ],
    details: [
      "Designed and developed fully custom, responsive websites for small and mid-sized clients, focusing on clean UI, fast performance, and modern best practices.",
      "Managed complete end-to-end launches — domain setup, DNS configuration, hosting, deployment workflows, and ongoing maintenance.",
      "Built brand identities including logos, color systems, and visual guidelines to give clients a polished, professional online presence.",
      "Implemented essential SEO foundations (meta structure, sitemap, performance tuning) to improve visibility and search ranking.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <article
            key={exp.title}
            className="experience-card bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer"
          >
            <p className="text-sm text-zinc-400 mb-1">{exp.range}</p>
            <p className="text-lg font-semibold mb-2">{exp.title}</p>
            <p className="text-sm text-[var(--text-contrast)] mb-3">
              {exp.summary}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm mb-4">
              {exp.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 text-sm">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="bg-[var(--badge-bg)] px-3 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
