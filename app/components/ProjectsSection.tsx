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
          className="relative block bg-[var(--card-bg)] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer overflow-hidden group"
        >
          {/* The Solid, Mobile-First Badge */}
          {/* Positioned at top-0 right-0, with solid background color and text */}
          <div className="absolute top-0 right-0 z-10 bg-[var(--highlight)] text-[var(--card-bg)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg shadow-md sm:text-xs">
            In Development
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Optimized Thumbnail Container */}
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative">
              <img
                src="/assets/blogwebapp-screen.webp"
                alt="Blog web app screenshot"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Visual fix for previous overlap: ensured this image container isn't behind the main badge */}
            </div>

            <div className="flex-1 space-y-2">
              {/* Category Label (Small Blue Text) */}
              <p className="text-sm text-[var(--highlight)] pt-1">
                Full-Stack Project
              </p>

              {/* Dynamic Title with line clamp for mobile */}
              <h3 className="text-xl font-bold leading-snug sm:text-lg sm:font-semibold">
                <span className="line-clamp-1">
                  Blog Engine · MERN + TypeScript
                </span>
              </h3>

              {/* Truncated Description for clean look on mobile */}
              <p className="text-sm text-[var(--text-contrast)] leading-relaxed line-clamp-3 sm:line-clamp-none mb-3">
                A full-stack blog engine inspired by platforms like Medium,
                built with the MERN stack, TypeScript, Tailwind CSS, and modern
                tooling. Includes authentication, post management, and a
                responsive, modern UI.
              </p>

              {/* Simplified Tech Stack with better wrapping for small screens */}
              <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs pt-2">
                <span className="bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  MongoDB
                </span>
                <span className="bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  Express
                </span>
                <span className="bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  React
                </span>
                <span className="bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  Node.js
                </span>
                <span className="bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  TypeScript
                </span>
                <span className="bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  Tailwind CSS
                </span>
                {/* Hiding lower-priority tags on smallest screens for clarity */}
                <span className="hidden xs:block bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  JWT
                </span>
                <span className="hidden xs:block bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  REST API
                </span>
                <span className="hidden sm:block bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/10">
                  Vercel
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* APATax*/}
        <a
          href="https://apatax.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative">
              <img
                src="/assets/APATax.webp"
                alt="APATax"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--highlight)] mb-1">
                Website Development & Edits
              </p>
              <h3 className="text-lg font-semibold mb-2">
                APA Tax Accounting Inc
              </h3>
              <p className="text-sm text-[var(--text-contrast)] mb-3">
                Developed a multi-page business website for a certified public
                accounting firm. Built using clean, semantic markup, PHP
                templating, and Bootstrap for a responsive layout, featuring
                integrated analytics, user consultation intake forms, and
                external secure client portal logic.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  PHP
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  Bootstrap
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  JavaScript
                </span>
                <span className="bg-[var(--badge-bg)] px-3 py-1 rounded-md">
                  jQuery
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

        {/* FusionRXDubai*/}
        <a
          href="https://fusionrxdubai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative">
              <img
                src="/assets/FusionRXDubai.webp"
                alt="Fusion Apothecary Dubai"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--highlight)] mb-1">
                WordPress Development
              </p>
              <h3 className="text-lg font-semibold mb-2">
                Fusion Apothecary Dubai Website
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

        {/* Version_ONE / MoNAGY.com */}
        <a
          href="https://v1.monagy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)] transition-all cursor-pointer hover:border-[var(--highlight)] hover:shadow-[0_0_10px_var(--highlight)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative">
              <img
                src="/assets/MoLightv1.webp"
                alt="Version 1 of MoNAGY.com"
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
          <span className="control">function</span>{" "}
          <span className="function">evolve</span>
          <span className="text-inherit">(</span>
          <span className="variable">knowledge</span>
          <span className="text-inherit">, </span>
          <span className="variable">age</span>
          <span className="text-inherit">, </span>
          <span className="variable">life</span>
          <span className="text-inherit">) &#123;</span>
          <br />
          &nbsp;&nbsp;
          <span className="keyword">while</span>{" "}
          <span className="text-inherit">(</span>
          <span className="variable">age</span>
          <span className="text-inherit">++ &lt; </span>
          <span className="variable">life</span>
          <span className="text-inherit">.</span>
          <span className="function">length</span>
          <span className="text-inherit">) &#123;</span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-inherit">++</span>
          <span className="variable">knowledge</span>
          <span className="text-inherit">;</span>
          <br />
          &nbsp;&nbsp;
          <span className="text-inherit">&#125;</span>
          <br />
          &nbsp;&nbsp;
          <span className="keyword">return</span>{" "}
          <span className="variable">knowledge</span>
          <span className="text-inherit">;</span>
          <br />
          <span className="text-inherit">&#125;</span>
        </code>
      </pre>
    </section>
  );
}
