import Link from 'next/link';
import ThemeToggle from './components/ThemeToggle';
import AustinTime from './components/AustinTime';

interface Project {
  emoji: string;
  title: string;
  description: string;
  url?: string;
  technologies?: string[];
}

// Function to get consistent color for each technology
const getTechColor = (tech: string): string => {
  const colorMap: { [key: string]: string } = {
    'React': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'JavaScript': 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Supabase': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Azure': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    'Swift': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'OpenRouter API': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'BTC': 'bg-orange-200 text-orange-900 dark:bg-orange-900/40 dark:text-orange-300',
    'Rust': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Ord': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    'Shopify': 'bg-green-200 text-green-900 dark:bg-green-900/40 dark:text-green-300',
  };
  return colorMap[tech] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
};

const projectsByCategory: { [key: string]: Project[] } = {
  "Web Apps": [
    {
      emoji: "🔵",
      title: "Enos",
      description: "A B2B platform streamlining communication, quoting, and data management.",
      url: "https://gensource.vercel.app/",
      technologies: ["JavaScript", "React", "Supabase", "Azure"],
    },
    {
      emoji: "🚐",
      title: "Van Builder",
      description: "Interactive 3D globe visualizing global renewable energy progress with real-time data updates",
      url: "https://www.chewydesignco.com/van-builder-test",
      technologies: ["JavaScript", "React"],
    },
  ],
  "iOS Apps": [
    {
      emoji: "📝",
      title: "BuzzNotes",
      description: "AI-powered transcription and study app for students and professionals",
      url: "https://www.buzznotes.app/",
      technologies: ["Swift", "OpenRouter API"],
    },
    {
      emoji: "🌿",
      title: "TBreak",
      description: "Mobile app helping users track and manage their journey to quit cannabis",
      url: "https://www.tbreakapp.xyz/",
      technologies: ["Swift"],
    },
  ],
  "Crypto": [
    {
      emoji: "🪙",
      title: "Bitcoin NFT (Ordinal)",
      description: "Collection of 100 Ordinal NFTs on Bitcoin, sold for 0.01 BTC each",
      url: "https://magiceden.us/ordinals/marketplace/ordinal-minis",
      technologies: ["BTC", "Rust", "Ord"],
    },
  ],
  "Ecommerce": [
    {
      emoji: "🎿",
      title: "Barkk",
      description: "A snow pant brand founded in Boulder, CO, focused on functional design and mountain style.",
      url: "https://www.instagram.com/barkkmag/",
      technologies: ["Shopify"],
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
          
          <nav className="flex items-center gap-4 text-sm">
            <ThemeToggle />
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-light mb-6">Hey I&apos;m Rob</h1>
          <p className="text-sm text-tertiary leading-relaxed">
            I&apos;m a creator and software developer who loves taking an idea from nothing and turning it into something real. I&apos;ve designed and launched iOS apps used by thousands, developed full-scale SaaS platforms, and created brands that blend clean design with real-world utility. My focus is on building intuitive, high-quality products that feel effortless to use.
          </p>
        </section>

        {/* Social Links */}
        <section className="mb-12">
          <div className="flex gap-6 text-sm">
            <a href="mailto:contact@robertegreenwood.com" className="flex items-center gap-1.5 text-secondary hover:text-primary transition-all duration-200 hover:scale-105 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a href="https://github.com/RobertGreenwood1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-secondary hover:text-primary transition-all duration-200 hover:scale-105 cursor-pointer">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12">
          <div className="flex items-center gap-1.5 mb-6">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-muted text-sm">Recent Projects</h2>
          </div>

          {Object.entries(projectsByCategory).map(([category, projects], categoryIndex) => (
            <div key={categoryIndex} className="mb-8 last:mb-0">
              <h3 className="text-base font-bold mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => {
                  const CardContent = (
                    <div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{project.emoji}</span>
                        <div className="flex-1">
                          <h4 className="text-base font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-tertiary text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        <svg className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-3 ml-11">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2 py-0.5 text-xs font-medium rounded-md ${getTechColor(tech)}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );

                  if (project.url) {
                    return (
                      <a
                        key={index}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 rounded-xl border border-primary bg-secondary card-hover block"
                      >
                        {CardContent}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="group p-6 rounded-xl border border-primary bg-secondary card-hover"
                    >
                      {CardContent}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-primary flex justify-end text-xs text-muted">
          <p><AustinTime /></p>
        </footer>
      </div>
    </div>
  );
}