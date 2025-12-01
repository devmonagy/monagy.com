// app/components/AboutSection.tsx
export default function AboutSection() {
  return (
    <section id="about" className="mt-0">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="mb-4">
        Hi, I’m a web developer passionate about building clean, responsive,
        user-focused applications. Even though my full-time role is in software
        development using Power Apps and the Microsoft stack, I actively work
        with React, TypeScript, and the MERN ecosystem on my own projects —
        which is where my true focus and long-term direction are.
      </p>
      <p className="mb-4">
        I enjoy creating seamless digital experiences, writing clean and
        maintainable code, and staying up-to-date with modern web technologies.
        Whether it’s a landing page, a dashboard, or a full-stack app, I love
        solving real problems and delivering polished, intuitive work.
      </p>
      <p className="mb-4">
        This portfolio highlights my skills and recent projects. I’m open to
        freelance work, collaborations, and full-time opportunities where I can
        grow as a React/MERN developer and build meaningful, high-impact web
        experiences. Let’s connect.
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
