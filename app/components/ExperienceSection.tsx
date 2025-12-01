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
      "Built and maintained Power Apps for internal teams, improving data entry, workflows, and reporting.",
      "Integrated apps with SQL Server and cloud services to centralize data.",
      "Collaborated with teams to enhance performance, scalability, and user experience.",
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
      "Implemented responsive layouts and reusable components aligned with brand standards.",
      "Improved accessibility and SEO to increase engagement and search visibility.",
      "Optimized performance and bundle size for faster load times.",
    ],
  },
  {
    range: "2016 — 2024",
    title: "IT Support / Systems · ADAPT Community Network",
    summary:
      "Provided technical support, maintained workstations and systems, and assisted with deployments and troubleshooting across multiple teams.",
    skills: [
      "IT Support",
      "Windows",
      "Networking",
      "Hardware",
      "Troubleshooting",
      "Customer Service",
    ],
    details: [
      "Supported staff across multiple locations with hardware, software, and connectivity issues.",
      "Collaborated with IT leadership to standardize configurations and improve reliability.",
      "Helped onboard new tools and systems, training users and documenting processes.",
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
