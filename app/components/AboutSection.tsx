// app/components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section id="about" className="mt-0">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="mb-4">
        Web Developer with 7+ years of experience specializing in front-end
        engineering while also contributing to back-end development. Skilled in
        building scalable, component-driven applications using React, Next.js,
        and TypeScript, with hands-on experience in Node.js and RESTful APIs.
        Strong focus on responsive UI design, accessibility (WCAG 2.2), state
        management, and performance optimization within Agile SDLC environments.
      </p>

      <div>
        <a
          href="/assets/Resume-MohamedNAGY.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block text-[var(--highlight)] font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[var(--highlight)] after:transition-all hover:after:w-full"
        >
          Download Résumé
        </a>
      </div>
    </section>
  );
}
