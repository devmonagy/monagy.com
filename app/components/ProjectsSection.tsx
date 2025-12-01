// app/components/ProjectsSection.tsx

export default function ProjectsSection() {
  return (
    <section id="projects" className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      <div className="space-y-6">
        {/* BlogWebApp / Blog Engine project */}
        <a
          href="https://blogwebapp.monagy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full sm:w-24 h-24 sm:h-20 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
              <img
                src="/assets/blogwebapp-screen.webp"
                alt="Blog web app screenshot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--highlight)] mb-1">
                Full-Stack Project
              </p>
              <h3 className="text-lg font-semibold mb-2">
                Blog Engine · MERN + TypeScript
              </h3>
              <p className="text-sm text-[var(--text-contrast)] mb-3">
                A full-stack blog engine inspired by platforms like Medium,
                built with the MERN stack, TypeScript, Tailwind CSS, and modern
                tooling. Includes authentication, post management, and a
                responsive, modern UI.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  MongoDB
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Express
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  React
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Node.js
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  TypeScript
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Tailwind CSS
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Render
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Vercel
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Add more projects here if needed */}
      </div>
    </section>
  );
}
