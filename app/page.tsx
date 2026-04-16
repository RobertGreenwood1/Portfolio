import ThemeToggle from './components/ThemeToggle';
import AustinTime from './components/AustinTime';
import BlueDot from './components/BlueDot';

interface Project {
  emoji: string;
  title: string;
  description: string;
  url?: string;
  tag: string;
}

const projects: Project[] = [
  {
    emoji: "🔵",
    title: "Enos",
    description: "B2B platform streamlining communication, quoting, and data management.",
    url: "https://gensource.vercel.app/",
    tag: "Web App",
  },
  {
    emoji: "🚐",
    title: "Van Builder",
    description: "Interactive configurator for custom van builds.",
    url: "https://www.chewydesignco.com/van-builder-test",
    tag: "Web App",
  },
  {
    emoji: "📝",
    title: "BuzzNotes",
    description: "AI-powered transcription and study app for students and professionals.",
    url: "https://apps.apple.com/us/app/buzznotes-ai-lecture-notes/id6738050902",
    tag: "iOS",
  },
  {
    emoji: "🌿",
    title: "TBreak",
    description: "App helping users track and manage their journey to quit cannabis.",
    url: "https://www.tbreakapp.xyz/",
    tag: "iOS",
  },
  {
    emoji: "🪙",
    title: "Ordinal Minis",
    description: "Collection of 100 Ordinal NFTs on Bitcoin, sold for 0.01 BTC each.",
    url: "https://ordinalswallet.com/collection/ordinal-minis",
    tag: "Crypto",
  },
  {
    emoji: "🎿",
    title: "Barkk",
    description: "Snow pant brand founded in Boulder, CO focused on functional mountain style.",
    url: "https://www.instagram.com/barkkmag/",
    tag: "Brand",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-12">

        {/* Header — no data-gravity, BlueDot lives here */}
        <header className="flex justify-between items-center mb-12">
          <BlueDot />
          <nav data-gravity className="flex items-center gap-4 text-sm">
            <ThemeToggle />
          </nav>
        </header>

        {/* Hero — each line is its own body */}
        <section className="mb-10">
          <h1 data-gravity className="text-2xl font-semibold mb-1">Hey, I&apos;m Rob</h1>
          <p data-gravity className="text-base text-secondary mb-3">I build and ship AI-powered apps</p>
          <p data-gravity className="text-sm text-muted">
            10,000+ downloads &middot; 7-figure crypto trading &middot; developing a clothing brand
          </p>
          <p data-gravity className="text-xs text-muted mt-3">P.S. click the blue dot ;)</p>
        </section>

        {/* Social Links — each link is its own body */}
        <section className="mb-10">
          <div className="flex gap-5 text-sm">
            <a
              data-gravity
              href="mailto:contact@robertegreenwood.com"
              className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a
              data-gravity
              href="https://github.com/RobertGreenwood1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </section>

        {/* Projects — header + each card is its own body */}
        <section className="mb-10">
          <h2 data-gravity className="text-xs font-medium text-muted uppercase tracking-widest mb-3">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((project, index) => (
              <a
                data-gravity
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between p-4 rounded-lg border border-primary bg-secondary hover:border-secondary hover:bg-tertiary transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-base shrink-0">{project.emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{project.title}</span>
                      <span className="text-xs text-muted">{project.tag}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <svg className="w-3 h-3 text-muted shrink-0 ml-2 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* Jane Street Puzzles — header + each card is its own body */}
        <section className="mb-10">
          <h2 data-gravity className="text-xs font-medium text-muted uppercase tracking-widest mb-3">Jane Street Puzzles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              data-gravity
              href="https://www.janestreet.com/puzzles/shut-the-box-solution/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-lg border border-primary bg-secondary hover:border-secondary hover:bg-tertiary transition-colors"
            >
              <div>
                <p className="text-sm font-medium mb-1">Shut the Box</p>
                <p className="text-xs text-muted">Nov 2025</p>
              </div>
              <svg className="w-3 h-3 text-muted shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a
              data-gravity
              href="https://www.janestreet.com/puzzles/hooks-11-solution/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-lg border border-primary bg-secondary hover:border-secondary hover:bg-tertiary transition-colors"
            >
              <div>
                <p className="text-sm font-medium mb-1">Hooks 11</p>
                <p className="text-xs text-muted">Oct 2025</p>
              </div>
              <svg className="w-3 h-3 text-muted shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-primary flex justify-end text-xs text-muted">
          <p data-gravity><AustinTime /></p>
        </footer>

      </div>
    </div>
  );
}
