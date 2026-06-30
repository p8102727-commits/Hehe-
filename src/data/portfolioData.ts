import { Project, Skill, TimelineItem, Achievement, Idea, Goal, LibraryItem, GalleryItem } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'internet-os',
    title: 'Internet OS',
    category: 'Business Simulation Game',
    status: 'In Development',
    description: 'A business strategy game where players create, grow, and manage their own internet empire. Players build websites, attract users, unlock technologies, generate revenue, and expand through strategic decisions inside a stylized digital universe inspired by playful sandbox aesthetics.',
    purpose: 'To teach internet economics, server scaling, and product lifecycle strategy in a captivating game environment.',
    features: [
      'Interactive server load and cluster management',
      'Dynamic ad bidding and product monetization engines',
      'Employee hiring, leveling, and specialization systems',
      'Sandbox web development tree with technological eras'
    ],
    technologies: ['React', 'TypeScript', 'Motion', 'Canvas API', 'Tailwind CSS'],
    lessonsLearned: 'Designing complex idle-game math formulas and balancing progression metrics taught me a deep appreciation for game theory and economic modeling in software.',
    roadmap: [
      'Phase 1: Alpha gameplay loop & database integration',
      'Phase 2: Multiplayer company mergers and competitor bots',
      'Phase 3: Host a web game portal for public playtesting'
    ],
    coverGradient: 'from-zinc-950 via-zinc-900 to-neutral-900'
  },
  {
    id: 'atomic-atlas',
    title: 'Atomic Atlas',
    category: 'Educational Platform',
    status: 'In Development',
    description: 'A premium interactive periodic table transforming chemistry into an engaging exploration through beautiful visuals, intelligent organization, animations, and educational storytelling.',
    purpose: 'To redefine standard reference tools into sensory, interactive experiences that inspire student curiosity.',
    features: [
      'Interactive exploration with three-dimensional element rendering',
      'Advanced multi-parameter chemical search filters',
      'Detailed element sheets with isotope decays and spectral lines',
      'Responsive interface optimized for classroom smartboards',
      'Modern educational chemical reaction visualizer'
    ],
    technologies: ['React', 'TypeScript', 'D3.js', 'Vite', 'Tailwind CSS'],
    lessonsLearned: 'Visualizing atomic patterns and chemical trends required mapping highly dense scientific data into clear, interactive charts without compromising accuracy.',
    roadmap: [
      'Integrate dynamic orbital configuration diagrams',
      'Include voice-guided narrations of element histories',
      'Implement simple lab simulation sandboxes'
    ],
    coverGradient: 'from-zinc-900 via-neutral-950 to-zinc-900'
  },
  {
    id: 'minimalist-word-counter',
    title: 'Minimalist Word Counter',
    category: 'Productivity Tool',
    status: 'Released',
    description: 'A distraction-free writing companion providing detailed writing statistics while maintaining an elegant minimalist experience.',
    purpose: 'To remove editor clutter and provide writer statistics with absolute local privacy and lightning-fast speed.',
    features: [
      'Live character, word, sentence, and paragraph counts',
      'Estimated reading and speaking time indices',
      'Secure export to local TXT and PDF formats',
      'Persistent local state auto-save system',
      'Ultra-minimal adaptive typography options'
    ],
    technologies: ['React', 'TypeScript', 'jsPDF', 'LocalStorage', 'Tailwind CSS'],
    lessonsLearned: 'UX design is about subtraction, not addition. Creating highly capable software with almost zero visual noise is a challenging but incredibly rewarding pursuit.',
    roadmap: [
      'Add multi-document workspace management',
      'Support cloud-encrypted backup sync',
      'Integrate offline-first focus soundscape player'
    ],
    coverGradient: 'from-neutral-950 via-zinc-950 to-neutral-900'
  },
  {
    id: 'type-tale',
    title: 'Type Tale',
    category: 'Educational Typing Game',
    status: 'Prototype',
    description: 'A story-driven typing adventure where players improve typing speed while progressing through engaging gameplay, challenges, achievements, and character progression.',
    purpose: 'To gamify touch typing by wrapping progress in a rich narrative arc with rewarding visual milestones.',
    features: [
      'Dynamic storytelling that adapts to typing speed and accuracy',
      'Real-time words-per-minute (WPM) and accuracy diagnostics',
      'Unlockable typing equipment, badges, and avatars',
      'Custom text uploading to practice user-defined files'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    lessonsLearned: 'Handling continuous keyboard inputs, real-time metrics tracking, and audio cue synchronization in standard React components required precise state management.',
    roadmap: [
      'Publish online leaderboards & matchmaking',
      'Create custom campaign story-builder tools',
      'Include localized multi-language text modules'
    ],
    coverGradient: 'from-zinc-900 via-zinc-950 to-zinc-900'
  },
  {
    id: 'image-to-website',
    title: 'Image-to-Website AI',
    category: 'AI Development Tool',
    status: 'Prototype',
    description: 'An intelligent application capable of analyzing website screenshots and generating functional HTML and CSS structures, dramatically accelerating frontend development.',
    purpose: 'To bridge design and engineering by using Gemini Vision APIs to jumpstart user interface development.',
    features: [
      'Instant layout structure and spacing analysis',
      'Visual element segmentation mapping',
      'Clean Tailwind CSS class generation',
      'Interactive split-pane code editor & preview'
    ],
    technologies: ['React', 'Node.js', 'Google GenAI SDK', 'Vite', 'Tailwind CSS'],
    lessonsLearned: 'Structuring AI prompt templates to return consistent, compilable layouts requires combining strict visual parsing guidelines with clean output schemas.',
    roadmap: [
      'Support interactive multi-page flow maps',
      'Enable direct deployment to Cloud Run containers',
      'Add Figma component linkage integration'
    ],
    coverGradient: 'from-neutral-900 via-zinc-950 to-zinc-950'
  },
  {
    id: 'ai-dictionary',
    title: 'AI Dictionary',
    category: 'Educational Platform',
    status: 'In Development',
    description: 'A modern encyclopedia simplifying artificial intelligence concepts, tools, workflows, and terminology through intuitive explanations and elegant interface design.',
    purpose: 'To demystify artificial intelligence for peers and students, breaking complex math and algorithms into approachable, modern guides.',
    features: [
      'Curated repository of LLM, neural net, and diffusion terms',
      'Visual diagram guides explaining attention and transformers',
      'Direct workspace playground templates for prompt engineering',
      'Search and filter capabilities on AI applications'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    lessonsLearned: 'Technical documentation succeeds when complex logic is broken down into simple, high-fidelity visual diagrams and structured, bite-sized summaries.',
    roadmap: [
      'Integrate interactive LLM tokenizer visualizer',
      'Host direct prompt test labs with API outputs',
      'Support mobile-optimized flashcard systems'
    ],
    coverGradient: 'from-zinc-950 via-neutral-950 to-zinc-900'
  }
];

export const SKILLS: Skill[] = [
  // Programming
  { name: 'HTML', level: 95, category: 'Programming' },
  { name: 'CSS', level: 90, category: 'Programming' },
  { name: 'JavaScript', level: 85, category: 'Programming' },
  // AI
  { name: 'Prompt Engineering', level: 95, category: 'Artificial Intelligence' },
  { name: 'Workflow Design', level: 85, category: 'Artificial Intelligence' },
  { name: 'AI Research', level: 80, category: 'Artificial Intelligence' },
  // Design
  { name: 'UI Design', level: 90, category: 'Design' },
  { name: 'UX Design', level: 85, category: 'Design' },
  { name: 'Typography', level: 80, category: 'Design' },
  { name: 'Visual Systems', level: 85, category: 'Design' },
  // Creative
  { name: 'Product Planning', level: 90, category: 'Creative' },
  { name: 'Creative Thinking', level: 95, category: 'Creative' },
  { name: 'Problem Solving', level: 90, category: 'Creative' }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 't-1',
    date: 'Early 2024',
    title: 'Curiosity Sparked',
    category: 'Learning',
    description: 'Began exploring how websites are made. Mastered semantic HTML & CSS layout models, shifting quickly into modern JavaScript.'
  },
  {
    id: 't-2',
    date: 'Mid 2024',
    title: 'First Prototypes',
    category: 'Milestone',
    description: 'Launched a series of local client-side calculators, quiz engines, and interactive games, cementing fundamental programming skills.'
  },
  {
    id: 't-3',
    date: 'Late 2024',
    title: 'Adopting React & TypeScript',
    category: 'Learning',
    description: 'Migrated into modern full-stack development. Adopted React for modular, component-driven layouts and TypeScript for high reliability.'
  },
  {
    id: 't-4',
    date: 'January 2025',
    title: 'Type Tale Conceptualization',
    category: 'Project Launch',
    description: 'Drafted the design and core keyboard input physics for Type Tale, a typing simulator gamified through narrative quests.'
  },
  {
    id: 't-5',
    date: 'March 2025',
    title: 'Atomic Atlas Spark',
    category: 'Milestone',
    description: 'Initiated plans to build a chemistry platform. Built high-fidelity SVG models of compounds and elements to transform classroom learning.'
  },
  {
    id: 't-6',
    date: 'June 2025',
    title: 'Internet OS Architecture',
    category: 'Project Launch',
    description: 'Completed the structural logic, simulation cycles, and component system for Internet OS, paving the way for full alpha testing.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a-1',
    title: 'Excellence in Interface Innovation',
    description: 'Awarded top honors at a local youth science and engineering colloquium for high-fidelity interactive design patterns in school tools.',
    date: 'April 2025',
    iconName: 'Award'
  },
  {
    id: 'a-2',
    title: 'Chemical Science Media Catalyst',
    description: 'Highly commended by district physical science educators for pioneering the visual layout framework of the Atomic Atlas program.',
    date: 'May 2025',
    iconName: 'Atom'
  },
  {
    id: 'a-3',
    title: 'Creative Hackathon Finalist',
    description: 'Conceptualized and implemented a fully responsive local student study-scheduler with offline sync in less than 36 hours.',
    date: 'November 2024',
    iconName: 'Zap'
  }
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'i-1',
    title: 'Lumina Study',
    category: 'EdTech / Productivity',
    description: 'A study space focusing on audio-visual cues and cognitive focus blocks to optimize retention for high-school students.',
    businessModel: 'Freemium layout templates, open-source hosting model.',
    features: [
      'Interactive study timers matching brain rhythm intervals',
      'Dynamic modular ambient acoustics player (lofi, white noise, synthesizers)',
      'Classroom study hubs to share task cards and flash decks'
    ],
    research: 'Cognitive research indicates modular soundscapes significantly improve target task attention compared to static music tracks.',
    createdAt: '2025-05-12'
  },
  {
    id: 'i-2',
    title: 'Synthetix UI',
    category: 'Developer Tools',
    description: 'A lightweight CSS-to-TS converter converting layout designs directly into clean, optimized React modules with zero styling redundancies.',
    businessModel: 'Developer-licensed desktop client or secure API.',
    features: [
      'Automatic component segmentation scanning',
      'Dynamic Tailwind compilation and class grouping',
      'Direct GitHub workflow automated pull requests'
    ],
    research: 'Most design-to-code pipelines yield overly verbose DOM trees. Synthetix uses recursive tree minimization algorithms to generate human-readable structures.',
    createdAt: '2025-06-01'
  },
  {
    id: 'i-3',
    title: 'Helios Grid',
    category: 'Green Tech / Simulation',
    description: 'An educational idle-simulator game demonstrating home clean energy grids and modern utility pricing strategies.',
    businessModel: 'Educational institution licenses & open-source community support.',
    features: [
      'Live dynamic weather models adjusting battery capture rates',
      'Virtual microgrid pricing exchanges with simulated neighboring districts',
      'Appliance energy management boards highlighting efficiency offsets'
    ],
    research: 'Simulating energy usage transforms abstract consumption metrics into direct tangible rewards, enhancing conservation awareness.',
    createdAt: '2025-06-25'
  }
];

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'g-1',
    title: 'Complete Internet OS Core Gameplay',
    category: 'Short-Term',
    status: 'In Progress',
    description: 'Perfect the server balancing and database scaling loops to launch the playable alpha demo for peers.'
  },
  {
    id: 'g-2',
    title: 'Publish Atomic Atlas v1.0',
    category: 'Short-Term',
    status: 'Pending',
    description: 'Include detailed isotopes, spectral decay pathways, and an orbit configuration builder to distribute to chemistry departments.'
  },
  {
    id: 'g-3',
    title: 'Master Advanced Backends & SQL Databases',
    category: 'Long-Term',
    status: 'In Progress',
    description: 'Gain expert command of relational databases and modern full-stack architectures (like Express and Drizzle) to support collaborative platforms.'
  },
  {
    id: 'g-4',
    title: 'Launch a Global Open-Source EdTech Platform',
    category: 'Lifetime Vision',
    status: 'Pending',
    description: 'Create an accessible, game-driven academy that teaches complex STEM disciplines to millions of children for free.'
  }
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'Modern CSS Grid Patterns',
    category: 'Notes',
    description: 'An exhaustive reference cheat-sheet capturing modular CSS Grid layouts and responsive masonry alignments.',
    date: 'June 2025',
    readTime: '4 min read',
    content: `### Modular Layout Systems with CSS Grid

Designing modern, responsive interfaces requires utilizing the absolute full power of CSS Grid and Flexbox, rather than depending on massive frameworks or hardcoded widths.

#### The Elite Grid Formula:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`
This formula automatically scales columns without needing media queries, maintaining perfect layout balance from mobile interfaces up to massive ultra-wide monitors.

#### Alignment Best Practices:
1. Always establish consistent negative space (\`gap\`) using proportional multiples of \`4px\`.
2. Pair grids with subgrids to keep nested card headers aligned cleanly: \`grid-template-rows: subgrid;\`.
3. Use \`align-items: stretch;\` to enforce uniform height across grid cards, guaranteeing a polished card alignment.`
  },
  {
    id: 'lib-2',
    title: 'Gemini Vision API Implementations',
    category: 'Research',
    description: 'Analyzing optimal prompt boundaries to extract structured components from user-uploaded wireframe screenshots.',
    date: 'May 2025',
    readTime: '7 min read',
    content: `### Screenshot Visual Parsing via Gemini API

Converting images into clean code requires robust instructions. When prompting Gemini Vision models to analyze layouts:

#### High-Performance Prompt Strategy:
1. **Define the Domain Structure**: Instruct the model that it is an expert frontend developer that outputs valid React and Tailwind modules.
2. **Mandate Spacing Isolation**: Force the model to detect padding, margins, and layout alignment grids visually.
3. **Prevent Dom Clutter**: Explicitly instruct the engine to reuse styling classes and avoid deep nested grids where simple flexboxes are sufficient.

#### Example Output Configuration:
Ensure the API responds with a structured JSON containing:
- Code blocks divided by component folders.
- Extracted SVG asset representations.
- Custom metadata describing the color palettes detected.`
  },
  {
    id: 'lib-3',
    title: 'Chemical Education Digital Delivery',
    category: 'Research',
    description: 'Reviewing modern interactive design patterns in middle school chemistry science programs.',
    date: 'February 2025',
    readTime: '9 min read',
    content: `### Cognitive Engagement in Science Platforms

Most classroom textbooks represent chemistry statically, which makes atoms and periodic groups feel abstract and difficult to grasp for young students.

#### Key Digital Touchpoints:
- **Interactive Manipulation**: Letting students spin orbital models helps solidify physical atomic principles.
- **Micro-animations**: Small visual transitions of electrons jumping energy levels during chemical reactions are much more memorable than a static diagram.
- **Narrative Context**: Anchoring elements to real-world histories (like explaining how titanium is named after the Titans) triggers higher engagement than dry atomic mass tables.`
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Internet OS Dashboard mockup',
    category: 'UI Concept',
    aspect: 'landscape',
    gradient: 'from-zinc-950 via-zinc-900 to-zinc-800',
    tags: ['Figma', 'UI Design', 'Wireframe']
  },
  {
    id: 'gal-2',
    title: 'Atomic Atlas Element Card',
    category: 'Illustration',
    aspect: 'square',
    gradient: 'from-zinc-900 via-zinc-950 to-neutral-900',
    tags: ['SVG', 'Branding', 'Minimal']
  },
  {
    id: 'gal-3',
    title: 'Type Tale Campaign Map',
    category: 'Visual Experiment',
    aspect: 'portrait',
    gradient: 'from-neutral-950 via-zinc-950 to-neutral-800',
    tags: ['Vector', 'Storytelling']
  },
  {
    id: 'gal-4',
    title: 'Minimalist Word Counter Light mode',
    category: 'UI Concept',
    aspect: 'landscape',
    gradient: 'from-neutral-100 via-neutral-200 to-white',
    tags: ['Framer', 'Typography']
  },
  {
    id: 'gal-5',
    title: 'AI Encyclopedia typography spec',
    category: 'Branding Work',
    aspect: 'square',
    gradient: 'from-zinc-950 via-neutral-950 to-zinc-900',
    tags: ['Type spec', 'Geist Mono']
  }
];
