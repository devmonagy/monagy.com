// app/components/FooterSection.tsx

export default function FooterSection() {
  return (
    <footer
      className="mt-16 text-sm text-[var(--text-contrast)] border-t"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* NOW FULL-WIDTH CONTENT */}
      <div className="w-full px-0 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT TEXT */}
        <div className="text-center sm:text-left">
          <p>© {new Date().getFullYear()} MoNAGYT.com</p>
          <p className="mt-1">React • TS • Tailwind • Next.js • Vercel</p>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex gap-5 justify-center sm:justify-end">
          {/* GitHub */}
          <a
            href="https://github.com/devmonagy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--highlight)] transition-transform hover:scale-110"
            title="GitHub"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.6-1.3-1.4-1.6-1.4-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 5.4 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1 .8 2v3c0 .3.2.7.8.6C20.7 21.4 23.5 17 23.5 12 23.5 5.7 18.3.5 12 .5z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/devmonagy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--highlight)] transition-transform hover:scale-110"
            title="LinkedIn"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4 8h2v12H4zM9 8h2v1.5h.03c.28-.5.98-1.02 2.02-1.02 2.17 0 2.57 1.42 2.57 3.27V20h-2v-6c0-1.43-.03-3.26-2-3.26S9.3 12.3 9.3 14V20H9z" />
            </svg>
          </a>

          {/* CodePen */}
          <a
            href="https://codepen.io/devmonagy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--highlight)] transition-transform hover:scale-110"
            title="CodePen"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.438 8.518l-9-6a1.003 1.003 0 0 0-1.113 0l-9 6A1.001 1.001 0 0 0 2 9.384v5.232a1 1 0 0 0 .438.866l9 6a1.003 1.003 0 0 0 1.124 0l9-6A1.001 1.001 0 0 0 22 14.616V9.384a1 1 0 0 0-.562-.866zM12 4.131 18.876 8.5 15.266 10.9 12 8.732 8.734 10.9 5.124 8.5 12 4.131zM4 10.616l2.934 2L4 14.616v-4zm8 9.253-6.876-4.369L8.734 13.1 12 15.268l3.266-2.168 3.61 1.4L12 19.869zm8-5.253-2.934-2L20 9.384v4z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
