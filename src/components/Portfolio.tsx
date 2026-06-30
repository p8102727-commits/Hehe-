import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Atom, 
  Zap, 
  BookOpen, 
  Plus, 
  X, 
  Lock, 
  Calendar, 
  ChevronRight, 
  Code, 
  Sparkles, 
  Cpu, 
  Layers, 
  Send, 
  Eye, 
  Bookmark, 
  Clock, 
  Target, 
  TrendingUp, 
  Palette, 
  Heart,
  ChevronDown,
  Info
} from 'lucide-react';

import { Project, Skill, TimelineItem, Achievement, Idea, Goal, LibraryItem, GalleryItem } from '../types';
import { PROJECTS, SKILLS, TIMELINE, ACHIEVEMENTS, INITIAL_IDEAS, INITIAL_GOALS, LIBRARY_ITEMS, GALLERY_ITEMS } from '../data/portfolioData';

interface PortfolioProps {
  onLock: () => void;
}

export default function Portfolio({ onLock }: PortfolioProps) {
  // LocalStorage Persisted States
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const saved = localStorage.getItem('shourya_portfolio_ideas');
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('shourya_portfolio_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [books, setBooks] = useState<string[]>(() => {
    const saved = localStorage.getItem('shourya_portfolio_books');
    return saved ? JSON.parse(saved) : [
      'Refactoring UI by Steve Schoger',
      'Atomic Habits by James Clear',
      'Zero to One by Peter Thiel',
      'The Design of Everyday Things by Don Norman'
    ];
  });

  const [courses, setCourses] = useState<string[]>(() => {
    const saved = localStorage.getItem('shourya_portfolio_courses');
    return saved ? JSON.parse(saved) : [
      'Interactive Computer Graphics (Coursera)',
      'Advanced TypeScript Masterclass (Frontend Masters)',
      'UI/UX design principles & design tokens'
    ];
  });

  // State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<LibraryItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'Programming' | 'Artificial Intelligence' | 'Design' | 'Creative'>('all');
  
  // Interactive Dashboard Increments (for visual fun)
  const [dashboardStats, setDashboardStats] = useState({
    projects: PROJECTS.length,
    technologies: SKILLS.length,
    ideas: ideas.length,
    hours: 420
  });

  // New Idea Form State
  const [showNewIdeaModal, setShowNewIdeaModal] = useState<boolean>(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaCategory, setNewIdeaCategory] = useState('EdTech');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');
  const [newIdeaBusinessModel, setNewIdeaBusinessModel] = useState('');
  const [newIdeaFeatures, setNewIdeaFeatures] = useState('');
  const [newIdeaResearch, setNewIdeaResearch] = useState('');

  // New Resource Form States
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('shourya_portfolio_ideas', JSON.stringify(ideas));
    setDashboardStats(prev => ({ ...prev, ideas: ideas.length }));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('shourya_portfolio_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('shourya_portfolio_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('shourya_portfolio_courses', JSON.stringify(courses));
  }, [courses]);

  // Smooth Particle Background Canvas Logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Array
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    const particleCount = Math.min(60, Math.floor(width / 25));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates tracker
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dynamic subtle ambient dark glow
      const radialGlow = ctx.createRadialGradient(mouseX, mouseY, 50, width / 2, height / 2, Math.max(width, height));
      radialGlow.addColorStop(0, '#09090b');
      radialGlow.addColorStop(0.5, '#030303');
      radialGlow.addColorStop(1, '#000000');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw connected constellation particles
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.globalAlpha = (1 - dist / 150) * 0.05;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter skills
  const filteredSkills = activeTab === 'all' 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === activeTab);

  // Handle adding new custom idea
  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle.trim() || !newIdeaDesc.trim()) return;

    const newIdeaObj: Idea = {
      id: `custom-idea-${Date.now()}`,
      title: newIdeaTitle,
      category: newIdeaCategory,
      description: newIdeaDesc,
      businessModel: newIdeaBusinessModel || 'Under evaluation.',
      features: newIdeaFeatures ? newIdeaFeatures.split(',').map(f => f.trim()) : [],
      research: newIdeaResearch || 'Exploratory concept phase.',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    setIdeas([newIdeaObj, ...ideas]);
    setNewIdeaTitle('');
    setNewIdeaDesc('');
    setNewIdeaBusinessModel('');
    setNewIdeaFeatures('');
    setNewIdeaResearch('');
    setShowNewIdeaModal(false);
  };

  // Handle adding new resource
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle.trim()) return;
    setBooks([...books, newBookTitle.trim()]);
    setNewBookTitle('');
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    setCourses([...courses, newCourseTitle.trim()]);
    setNewCourseTitle('');
  };

  // Toggle goal status
  const handleToggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const nextStatus = goal.status === 'Pending' ? 'In Progress' : goal.status === 'In Progress' ? 'Achieved' : 'Pending';
        return { ...goal, status: nextStatus };
      }
      return goal;
    }));
  };

  // Handle simulated contact submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    
    setContactStatus('sending');
    setTimeout(() => {
      setContactStatus('success');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactStatus('idle'), 4000);
    }, 1500);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 overflow-x-hidden font-sans select-none selection:bg-white selection:text-black">
      
      {/* Particle constellation canvas background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 border-b border-zinc-900/60 bg-black/75 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="w-2.5 h-2.5 bg-white rounded-full" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white font-mono">HQ COMMAND CENTER</span>
        </div>
        
        {/* Navigation items */}
        <div className="hidden md:flex items-center space-x-6 text-[10px] font-bold tracking-[0.2em] text-zinc-400">
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition uppercase">About</button>
          <button onClick={() => scrollToSection('philosophy')} className="hover:text-white transition uppercase">Philosophy</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-white transition uppercase">Projects</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-white transition uppercase">Skills</button>
          <button onClick={() => scrollToSection('dashboard')} className="hover:text-white transition uppercase">Dashboard</button>
          <button onClick={() => scrollToSection('vault')} className="hover:text-white transition uppercase">Vault</button>
          <button onClick={() => scrollToSection('library')} className="hover:text-white transition uppercase">Library</button>
          <button onClick={() => scrollToSection('goals')} className="hover:text-white transition uppercase">Roadmap</button>
        </div>

        {/* Action button */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={onLock}
            className="px-3 py-1.5 border border-zinc-800 bg-zinc-950/80 rounded-lg hover:bg-zinc-900 hover:border-zinc-700 text-[10px] font-bold tracking-wider text-zinc-400 hover:text-white transition duration-300 flex items-center space-x-1.5"
            title="Secure Dashboard"
          >
            <Lock size={11} />
            <span>SECURE TERMINAL</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          {/* Subtitle badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-zinc-900/40 border border-zinc-800/40 rounded-full">
            <Sparkles size={11} className="text-zinc-400 animate-pulse" />
            <span className="text-[9px] font-semibold tracking-[0.25em] text-zinc-400 uppercase font-mono">
              Class 9 Tech Synthesizer
            </span>
          </div>

          {/* Core Name */}
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-light tracking-tighter text-white font-sans uppercase">
            SHOURYA SHREE
          </h1>

          {/* Subtitles list */}
          <p className="text-xs sm:text-sm font-light tracking-[0.3em] text-zinc-400 uppercase font-mono">
            Student • Developer • UI Designer • AI Creator
          </p>

          <div className="w-16 h-px bg-zinc-800 mx-auto my-8" />

          {/* Mission statement */}
          <p className="text-sm sm:text-base md:text-lg font-light text-zinc-300 leading-relaxed max-w-2xl mx-auto font-sans">
            Building meaningful digital experiences through technology, creativity, and continuous learning.
          </p>
          
          {/* Interactive quick scroll arrow */}
          <div className="pt-12">
            <button 
              onClick={() => scrollToSection('about')}
              className="p-3 rounded-full border border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-300 active:scale-95 animate-bounce"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-28 px-6 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">01 / OVERVIEW</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">ABOUT ME</h2>
          </div>
          
          <div className="md:col-span-8 space-y-6 text-sm text-zinc-300 leading-relaxed font-sans font-light">
            <p>
              I am a Class 9 student deeply passionate about computers, interface aesthetics, and artificial intelligence. My coding journey is driven by intense curiosity and the desire to build things that help peers and simplify complex ideas.
            </p>
            <p>
              Rather than sticking to simple homework, I enjoy building actual software architectures, interactive games like <strong className="font-medium text-white">Internet OS</strong>, and highly capable academic solutions like <strong className="font-medium text-white">Atomic Atlas</strong>.
            </p>
            <p>
              For me, visual design is just as important as code. I study product design patterns from pioneers like Apple and Stripe, seeking to translate complex data into incredibly clear, luxury interfaces. I believe learning is a lifetime sprint of curiosity and continuous improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-28 px-6 bg-zinc-950/20 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">02 / COMPASS</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">PHILOSOPHY</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: 'Simplicity beats complexity.', desc: 'Keep systems clean, subtract unnecessary clutter, and let function drive beautiful layouts.' },
              { title: 'Design should solve problems.', desc: 'Aesthetic luxury is meaningless if it doesn’t clarify information or ease the user’s journey.' },
              { title: 'Learning never stops.', desc: 'Every line of code and user review is a lecture. Embrace the trial, improve indefinitely.' },
              { title: 'Build first. Improve forever.', desc: 'Shipping a working prototype teaches infinitely more than staring at an empty drawing canvas.' },
              { title: 'Every project teaches valuable lessons.', desc: 'Successes validate your skills, but structural failures reveal your ultimate roadmap for growth.' }
            ].map((phil, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 transition duration-300 flex flex-col justify-between space-y-4"
              >
                <span className="text-xs font-semibold text-zinc-600 font-mono">0{idx + 1}</span>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-zinc-100">{phil.title}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{phil.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-28 px-6 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">03 / CREATIONS</span>
              <h2 className="text-3xl font-light tracking-tight text-white uppercase">FEATURED PROJECTS</h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono">TOTAL EXPERIMENTS: {PROJECTS.length}</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative rounded-2xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 cursor-pointer overflow-hidden transition-all duration-300"
              >
                {/* Simulated visual thumbnail cover */}
                <div className={`h-40 bg-gradient-to-br ${proj.coverGradient} flex items-center justify-center p-6 border-b border-zinc-900 group-hover:opacity-90 transition`}>
                  <div className="space-y-1.5 text-center">
                    <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase block">{proj.category}</span>
                    <h3 className="text-xl font-light text-white uppercase tracking-tight">{proj.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-850">
                      {proj.status}
                    </span>
                    <span className="text-xs font-medium text-zinc-500 flex items-center space-x-1 group-hover:text-white transition">
                      <span>Inspect Specifications</span>
                      <ChevronRight size={12} className="transform group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 scrollbar-thin"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{selectedProject.category}</span>
                  <h3 className="text-3xl font-light text-white uppercase tracking-tight">{selectedProject.title}</h3>
                  <div className="flex space-x-2 pt-1">
                    <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">
                      Status: {selectedProject.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg border border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-white transition"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-zinc-300 font-sans font-light leading-relaxed">
                <div>
                  <h4 className="font-semibold text-xs tracking-wider text-white uppercase font-mono mb-1">Description</h4>
                  <p className="text-zinc-400">{selectedProject.description}</p>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-xs tracking-wider text-white uppercase font-mono mb-1">Purpose</h4>
                  <p className="text-zinc-400">{selectedProject.purpose}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div>
                    <h4 className="font-semibold text-xs tracking-wider text-white uppercase font-mono mb-2">Core Features</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-zinc-400 text-xs">
                      {selectedProject.features.map((feat, i) => <li key={i}>{feat}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs tracking-wider text-white uppercase font-mono mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-900">
                  <h4 className="font-semibold text-xs tracking-wider text-white uppercase font-mono mb-1">Lessons Learned</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed italic">"{selectedProject.lessonsLearned}"</p>
                </div>

                <div className="pt-3">
                  <h4 className="font-semibold text-xs tracking-wider text-white uppercase font-mono mb-2">Future Roadmap</h4>
                  <div className="space-y-1.5 font-mono text-xs text-zinc-400">
                    {selectedProject.roadmap.map((step, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Section */}
      <section id="skills" className="py-28 px-6 bg-zinc-950/10 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">04 / TALENTS</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">SKILLS</h2>
          </div>

          {/* Filtering Tab */}
          <div className="flex flex-wrap gap-2 text-[10px] font-bold tracking-widest uppercase">
            {['all', 'Programming', 'Artificial Intelligence', 'Design', 'Creative'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3 py-1.5 rounded-lg border transition duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-black border-white' 
                    : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab === 'all' ? 'Show All' : tab}
              </button>
            ))}
          </div>

          {/* Skills Progress Indicator Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {filteredSkills.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-medium text-zinc-200">{skill.name}</span>
                  <span className="font-mono text-[10px] text-zinc-500">{skill.level}%</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-zinc-350 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-28 px-6 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">05 / EXPERIENCE</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">TIMELINE</h2>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-zinc-900 ml-3 md:ml-6 space-y-10 py-4">
            {TIMELINE.map((item, idx) => (
              <div key={item.id} className="relative pl-6 md:pl-8 group">
                {/* Bullet */}
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border border-zinc-700 bg-black group-hover:bg-white transition duration-300" />
                
                <div className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-2 text-xs">
                    <span className="font-mono text-zinc-500">{item.date}</span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white group-hover:text-zinc-100 transition">{item.title}</h3>
                  <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-28 px-6 bg-zinc-950/20 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">06 / MERITS</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">ACHIEVEMENTS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((ach) => (
              <div 
                key={ach.id}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/5 transition duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="flex items-center space-x-3 text-zinc-400">
                  {ach.iconName === 'Award' && <Award size={18} />}
                  {ach.iconName === 'Atom' && <Atom size={18} />}
                  {ach.iconName === 'Zap' && <Zap size={18} />}
                  
                  <span className="text-[10px] font-mono text-zinc-500">{ach.date}</span>
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-zinc-100 leading-snug">{ach.title}</h3>
                  <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Dashboard Section */}
      <section id="dashboard" className="py-28 px-6 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">07 / LOGISTICS</span>
              <h2 className="text-3xl font-light tracking-tight text-white uppercase">LEARNING DASHBOARD</h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono">UPDATED: REAL-TIME SECURE HANDSHAKE</p>
          </div>

          {/* Stats Board */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Projects Created', val: dashboardStats.projects, suffix: '', icon: <Code size={16} /> },
              { label: 'Technologies Learned', val: dashboardStats.technologies, suffix: '', icon: <Atom size={16} /> },
              { label: 'Concepts Developed', val: dashboardStats.ideas, suffix: '', icon: <Sparkles size={16} /> },
              { label: 'Dedicated Focus Hours', val: dashboardStats.hours, suffix: 'h', icon: <Clock size={16} /> }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/10 border border-zinc-900 flex flex-col justify-between space-y-3"
              >
                <div className="flex justify-between items-center text-zinc-500">
                  <span className="text-[10px] font-mono uppercase tracking-wider">{stat.label}</span>
                  {stat.icon}
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-light tracking-tight text-white">
                    {stat.val}
                  </span>
                  {stat.suffix && <span className="text-xs text-zinc-500 font-mono">{stat.suffix}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Current Educational Targets: Books and Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Books Stack */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <BookOpen size={14} className="text-zinc-500" />
                  <h3 className="text-xs font-semibold tracking-wider text-white uppercase font-mono">DIGITAL BOOKSHELF</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">ACTIVE SHELF ({books.length})</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-400 font-sans">
                {books.map((book, i) => (
                  <li key={i} className="flex items-center space-x-2 border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                    <span>{book}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddBook} className="flex space-x-2 pt-2">
                <input 
                  type="text" 
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="ADD COMPLEMENTARY READ..."
                  className="flex-1 bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-1.5 text-[10px] tracking-widest placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 font-mono uppercase"
                />
                <button type="submit" className="p-1.5 rounded-lg border border-zinc-850 bg-zinc-900 hover:bg-zinc-800 text-white transition">
                  <Plus size={14} />
                </button>
              </form>
            </div>

            {/* Courses Stack */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Cpu size={14} className="text-zinc-500" />
                  <h3 className="text-xs font-semibold tracking-wider text-white uppercase font-mono">ACTIVE STUDY SYLLABUS</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">TARGET CURRICULA ({courses.length})</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-400 font-sans">
                {courses.map((course, i) => (
                  <li key={i} className="flex items-center space-x-2 border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="w-1.5 h-0.5 bg-zinc-500 rounded-full" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddCourse} className="flex space-x-2 pt-2">
                <input 
                  type="text" 
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="ADD TECHNICAL COURSE..."
                  className="flex-1 bg-zinc-900 border border-zinc-850 rounded-lg px-3 py-1.5 text-[10px] tracking-widest placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 font-mono uppercase"
                />
                <button type="submit" className="p-1.5 rounded-lg border border-zinc-850 bg-zinc-900 hover:bg-zinc-800 text-white transition">
                  <Plus size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Idea Vault Section */}
      <section id="vault" className="py-28 px-6 bg-zinc-950/20 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex items-end justify-between">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">08 / CLASSIFIED CONCEPT FILES</span>
              <h2 className="text-3xl font-light tracking-tight text-white uppercase">IDEA VAULT</h2>
            </div>
            
            <button 
              onClick={() => setShowNewIdeaModal(true)}
              className="px-3 py-1.5 bg-white text-black rounded-lg hover:bg-zinc-250 text-[10px] font-bold tracking-widest uppercase transition flex items-center space-x-1.5"
            >
              <Plus size={12} />
              <span>LOG NEW IDEA</span>
            </button>
          </div>

          {/* Ideas Stack list */}
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div 
                key={idea.id}
                className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 space-y-4 hover:border-zinc-800 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded">
                      {idea.category}
                    </span>
                    <h3 className="text-lg font-medium text-white">{idea.title}</h3>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600">{idea.createdAt}</span>
                </div>

                <p className="text-xs text-zinc-350 font-light font-sans leading-relaxed">
                  {idea.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-900/60 text-xs">
                  <div>
                    <span className="font-semibold text-[10px] tracking-wider text-white uppercase font-mono block mb-1">Business Concept</span>
                    <p className="text-zinc-400 text-xs">{idea.businessModel}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[10px] tracking-wider text-white uppercase font-mono block mb-1">Empirical Research</span>
                    <p className="text-zinc-400 text-xs">{idea.research}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Idea Submission Modal */}
      <AnimatePresence>
        {showNewIdeaModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewIdeaModal(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-5 shadow-2xl overflow-y-auto max-h-[85vh] scrollbar-thin"
            >
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase font-mono">CLASSIFIED CONCEPT DECK</span>
                <button 
                  onClick={() => setShowNewIdeaModal(false)}
                  className="p-1 rounded-lg border border-zinc-900 text-zinc-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleAddIdea} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500 block uppercase">CONCEPT NAME</label>
                  <input 
                    type="text" 
                    required
                    value={newIdeaTitle}
                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                    placeholder="ENTER CONCEPT TITLE..."
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-700 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500 block uppercase">SECTOR CATEGORY</label>
                  <input 
                    type="text" 
                    required
                    value={newIdeaCategory}
                    onChange={(e) => setNewIdeaCategory(e.target.value)}
                    placeholder="E.G. AI / WEB3 / DEEP TECH"
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-700 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500 block uppercase">SYNOPSIS DESCRIPTION</label>
                  <textarea 
                    required
                    rows={3}
                    value={newIdeaDesc}
                    onChange={(e) => setNewIdeaDesc(e.target.value)}
                    placeholder="PROVIDE SECURE HIGH-LEVEL DESIGN SUMMARY..."
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-700 uppercase resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500 block uppercase">MONETIZATION MODEL</label>
                  <input 
                    type="text" 
                    value={newIdeaBusinessModel}
                    onChange={(e) => setNewIdeaBusinessModel(e.target.value)}
                    placeholder="E.G. FREEMIUM APIS / OPEN UTILITIES"
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-700 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500 block uppercase">RESEARCH EMPIRICS</label>
                  <textarea 
                    rows={2}
                    value={newIdeaResearch}
                    onChange={(e) => setNewIdeaResearch(e.target.value)}
                    placeholder="ADD SUPPORTING COGNITIVE RESEARCH OR EVIDENCE..."
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-700 uppercase resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-white text-black font-bold tracking-widest text-[10px] uppercase rounded-xl hover:bg-zinc-200 transition active:scale-[0.98]"
                >
                  LOCK RECORD INTO VAULT
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Design Gallery Section */}
      <section id="gallery" className="py-28 px-6 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">09 / INTUITION</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">DESIGN GALLERY</h2>
          </div>

          {/* Masonry-like Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className={`rounded-2xl border border-zinc-900/60 overflow-hidden cursor-pointer group bg-zinc-950 relative transition-all duration-300 ${
                  item.aspect === 'landscape' ? 'col-span-2 aspect-video' : item.aspect === 'portrait' ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                }`}
              >
                {/* Visual gradient backdrop representing the screenshot/art */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} opacity-20 group-hover:opacity-30 transition-all duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Cover card overlay content */}
                <div className="absolute bottom-0 left-0 w-full p-4 space-y-1.5 z-10">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">{item.category}</span>
                  <h4 className="text-xs font-medium text-white group-hover:text-zinc-200 transition uppercase tracking-wide">{item.title}</h4>
                  
                  <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Spec Zoom Modal */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryItem(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden p-6 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase font-mono">SPECIFICATION GRAPHIC SPEC</span>
                <button 
                  onClick={() => setSelectedGalleryItem(null)}
                  className="p-1 rounded-lg border border-zinc-900 text-zinc-500 hover:text-white transition"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Large Zoom Visual rendering */}
              <div className={`h-64 md:h-80 rounded-xl bg-gradient-to-br ${selectedGalleryItem.gradient} flex items-center justify-center p-8 border border-zinc-900 relative`}>
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
                <div className="space-y-2 text-center z-10 max-w-sm">
                  <span className="text-[10px] tracking-widest font-mono text-zinc-400 bg-black/50 border border-zinc-800 px-3 py-1 rounded-full uppercase inline-block">
                    {selectedGalleryItem.category}
                  </span>
                  <h3 className="text-2xl font-light text-white uppercase tracking-tight leading-snug">
                    {selectedGalleryItem.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedGalleryItem.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-300">
                      #{t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  High-fidelity experimental design board representing layout configurations, typography weights, and structural constraints for the "{selectedGalleryItem.title}" platform blueprint.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Digital Library Section */}
      <section id="library" className="py-28 px-6 bg-zinc-950/20 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">10 / ARCHIVES</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">DIGITAL LIBRARY</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {LIBRARY_ITEMS.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 cursor-pointer hover:bg-zinc-900/5 transition duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="flex items-center justify-between text-zinc-500 text-[9px] font-mono">
                  <span>{doc.category}</span>
                  <span>{doc.readTime}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-white group-hover:text-zinc-200 transition line-clamp-1">{doc.title}</h3>
                  <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed line-clamp-2">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doc Slide-out Drawer */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start pb-4 border-b border-zinc-900">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{selectedDoc.category}</span>
                    <h3 className="text-2xl font-light text-white uppercase">{selectedDoc.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="p-1.5 rounded-lg border border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-white transition"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="prose prose-invert text-xs leading-relaxed text-zinc-350 font-sans font-light space-y-4 max-w-none">
                  {/* Simplistic dynamic markdown structure */}
                  {selectedDoc.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('###')) {
                      return <h4 key={idx} className="text-sm font-medium text-white uppercase font-mono pt-2">{paragraph.replace('###', '')}</h4>;
                    }
                    if (paragraph.startsWith('####')) {
                      return <h5 key={idx} className="text-xs font-semibold text-zinc-350 uppercase font-mono pt-1">{paragraph.replace('####', '')}</h5>;
                    }
                    if (paragraph.startsWith('```')) {
                      return (
                        <pre key={idx} className="p-4 bg-zinc-900 rounded-xl border border-zinc-850 text-[11px] font-mono overflow-x-auto text-zinc-300">
                          <code>{paragraph.replace(/```(css|javascript)?/g, '')}</code>
                        </pre>
                      );
                    }
                    return <p key={idx} className="leading-relaxed whitespace-pre-line">{paragraph}</p>;
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 flex justify-between items-center">
                <span>COMPILED: {selectedDoc.date}</span>
                <span>{selectedDoc.readTime}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Roadmap Section */}
      <section id="goals" className="py-28 px-6 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">11 / VISION</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">GOALS & ROADMAP</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Short-Term', 'Long-Term', 'Lifetime Vision'].map((cat) => {
              const catGoals = goals.filter(g => g.category === cat);
              return (
                <div key={cat} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
                  <h3 className="text-xs font-semibold tracking-wider text-white uppercase font-mono border-b border-zinc-900 pb-2">{cat}</h3>
                  <div className="space-y-4">
                    {catGoals.map((goal) => (
                      <div 
                        key={goal.id} 
                        onClick={() => handleToggleGoal(goal.id)}
                        className="p-3 rounded-xl bg-zinc-900/20 border border-zinc-900/60 hover:border-zinc-800 transition cursor-pointer space-y-2"
                      >
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className={`px-2 py-0.5 rounded-full ${
                            goal.status === 'Achieved' 
                              ? 'bg-zinc-200 text-black font-semibold' 
                              : goal.status === 'In Progress'
                                ? 'bg-zinc-800 text-zinc-350 border border-zinc-700'
                                : 'bg-zinc-950 text-zinc-600'
                          }`}>
                            {goal.status}
                          </span>
                          <span className="text-zinc-600">Click to toggl</span>
                        </div>
                        <h4 className="text-xs font-medium text-zinc-200">{goal.title}</h4>
                        <p className="text-[10px] text-zinc-500 font-sans font-light leading-relaxed">{goal.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 bg-zinc-950/20 border-t border-zinc-900/30 z-10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase font-mono">12 / COMMUNICATIONS</span>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase">CONTACT ME</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5 space-y-6 text-xs text-zinc-400 font-sans font-light">
              <p className="leading-relaxed">
                Whether you want to discuss visual architectures, collaborative edtech applications, game simulation formulas, or simply want to say hello, feel free to submit a secured dispatch.
              </p>
              
              <div className="space-y-3 font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-zinc-600">DISPATCH TYPE:</span>
                  <span className="text-zinc-300">SECURE SHELL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-zinc-600">ENCRYPTION:</span>
                  <span className="text-zinc-300">TLS AES-256</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-zinc-600">PRIMARY NODE:</span>
                  <span className="text-zinc-300">shourya@creator.io</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-500 block uppercase">VISITOR NAME</label>
                    <input 
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="YOUR FULL NAME..."
                      className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white uppercase placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-500 block uppercase">RETURN NODE EMAIL</label>
                    <input 
                      type="email" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="YOUR EMAIL ADDR..."
                      className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white uppercase placeholder:text-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500 block uppercase">DISPATCH TRANSMISSION</label>
                  <textarea 
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="ENTER DETAILED MESSAGE CONTEXT..."
                    className="w-full bg-zinc-900/50 border border-zinc-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-zinc-700 text-white uppercase placeholder:text-zinc-700 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={contactStatus !== 'idle'}
                  className="w-full py-3 bg-white text-black font-bold tracking-widest text-[10px] uppercase rounded-xl hover:bg-zinc-250 transition active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <Send size={12} />
                  <span>
                    {contactStatus === 'sending' ? 'TRANSMITTING COGNITIVE DISPATCH...' : contactStatus === 'success' ? 'DISPATCH ARCHIVED SUCCESSFULLY' : 'TRANSMIT MESSAGE'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10 px-6 text-center z-10 relative bg-black/60">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-mono">
          <p className="uppercase tracking-wider">
            Designed & Developed by Shourya Shree
          </p>
          
          {/* Quick interactive note */}
          <div className="flex items-center space-x-1 uppercase text-[10px] opacity-60">
            <span>Built with precision</span>
            <Heart size={10} className="text-zinc-500 animate-pulse fill-zinc-500" />
            <span>& TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
