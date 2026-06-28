// app/components/ProjectsSection.tsx

export default function ProjectsSection() {
  return (
    <section id="projects" className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      <div className="space-y-6">
        {/* FusionRXDubai*/}
        <a
          href="https://fusionrxdubai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full sm:w-24 h-24 sm:h-20 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
              <img
                src="/assets/FusionRXDubai.webp"
                alt="Blog web app screenshot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--highlight)] mb-1">
                WordPress Development
              </p>
              <h3 className="text-lg font-semibold mb-2">
                Fusion Rx Dubai Website
              </h3>
              <p className="text-sm text-[var(--text-contrast)] mb-3">
                A custom WordPress theme developed for a premium medical
                compounding pharmacy and wellness lab in Dubai. Features a
                clean, professional layout designed to showcase bespoke
                healthcare services, specialized lab facilities, and custom IV
                drip therapies.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  WordPress
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  PHP
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  JavaScript
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  HTML5
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  CSS
                </span>
              </div>
            </div>
          </div>
        </a>

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
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  JWT
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  REST API
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  React Hooks
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  State Management
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  CRUD Operations
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Dynamic Routing
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Git
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  GitHub
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Version_ONE / MoNAGY.com */}
        <a
          href="https://v1.monagy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full sm:w-24 h-24 sm:h-20 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
              <img
                src="/assets/MoLightv1.webp"
                alt="Blog web app screenshot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--highlight)] mb-1">Portfolio</p>
              <h3 className="text-lg font-semibold mb-2">
                Version 1 of Personal Protfolio
              </h3>
              <p className="text-sm text-[var(--text-contrast)] mb-3">
                A personal portfolio website using HTML, CSS, and JavaScript,
                incorporating responsive design and interactive UI elements to
                create a polished and engaging user experience.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  React
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  TypeScript
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Tailwind CSS
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Next.js
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Vercel
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <pre className="bg-background dark:bg-darkBackground text-textLight dark:text-textDark text-sm rounded overflow-x-auto text-left font-mono w-full max-w-2xl mt-16">
        <code>
          <span className="text-blue-600 dark:text-[#569CD6]">function</span>{" "}
          <span className="text-yellow-700 dark:text-[#DCDCAA]">evolve</span>
          <span className="text-inherit">(</span>
          <span className="text-purple-700 dark:text-[#9CDCFE]">knowledge</span>
          , <span className="text-purple-700 dark:text-[#9CDCFE]">age</span>,{" "}
          <span className="text-purple-700 dark:text-[#9CDCFE]">life</span>
          <span className="text-inherit">)</span>{" "}
          <span className="text-inherit">&#123;</span>
          <br />
          &nbsp;&nbsp;
          <span className="text-green-600 dark:text-[#C586C0]">while</span>{" "}
          <span className="text-inherit">(</span>
          <span className="text-purple-700 dark:text-[#9CDCFE]">age</span>
          <span className="text-inherit">++ &lt; </span>
          <span className="text-purple-700 dark:text-[#9CDCFE]">life</span>.
          <span className="text-yellow-700 dark:text-[#DCDCAA]">length</span>
          <span className="text-inherit">)</span>{" "}
          <span className="text-inherit">&#123;</span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-inherit">++</span>
          <span className="text-purple-700 dark:text-[#9CDCFE]">knowledge</span>
          <span className="text-inherit">;</span>
          <br />
          &nbsp;&nbsp;<span className="text-inherit">&#125;</span>
          <br />
          &nbsp;&nbsp;
          <span className="text-green-600 dark:text-[#C586C0]">
            return
          </span>{" "}
          <span className="text-purple-700 dark:text-[#9CDCFE]">knowledge</span>
          <span className="text-inherit">;</span>
          <br />
          <span className="text-inherit">&#125;</span>
        </code>
      </pre>
    </section>
  );
}
