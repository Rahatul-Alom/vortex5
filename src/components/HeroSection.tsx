import { ArrowUpRight, MessageSquare, Sparkles, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import VortexCanvas from './VortexCanvas';

const HERO_STUDIO_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=900&q=80";

interface HeroSectionProps {
  onStartProject: () => void;
  onViewWork: () => void;
  whatsappNumber?: string;
  headline?: string;
  subtext?: string;
}

export default function HeroSection({
  onStartProject,
  onViewWork,
  whatsappNumber = '15550192834',
  headline = 'WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESSES FORWARD.',
  subtext = 'Through creativity, technology, and innovation, we partner with visionary brands to dominate their markets.'
}: HeroSectionProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Vortex5, I'm interested in your creative and technology services. I would like to discuss a project."
  )}`;

  const disciplines = [
    { emoji: '🎨', label: 'Graphic & UI/UX Design' },
    { emoji: '💻', label: 'Web Design & Development' },
    { emoji: '🤖', label: 'AI Automation' },
    { emoji: '🎬', label: 'Video Editing & Motion Graphics' },
    { emoji: '🏗️', label: 'Architecture (Interior, Exterior & 3D)' },
    { emoji: '📈', label: 'Digital Marketing' }
  ];

  return (
    <section id="hero-section" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-radial-gradient">
      {/* Interactive Orbiting Vortex Canvas */}
      <VortexCanvas />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Subtle top ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column: Headline, Mission, Disciplines, CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* VORTEX5 Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="font-bold tracking-wider text-[11px] flex items-center gap-1.5">
                <span>VORTEX5</span>
                <span className="text-zinc-500">•</span>
                <span className="text-white">Creative × Technology</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1
                id="hero-main-title"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-heading font-extrabold text-white tracking-tight leading-[1.06]"
              >
                {headline}
              </h1>
            </motion.div>

            {/* Supporting Copy - Exact user statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-200 max-w-2xl font-normal leading-relaxed"
            >
              We help businesses grow and reach the absolute peak of success through <span className="text-cyan-300 font-semibold">creativity</span>, <span className="text-indigo-300 font-semibold">technology</span>, and <span className="text-emerald-300 font-semibold">innovation</span>.
            </motion.p>

            {/* 🔥 What We Do Quick Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-2.5 pt-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🔥</span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  What We Do:
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {disciplines.map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 text-zinc-200 text-xs font-medium hover:border-cyan-500/40 hover:bg-zinc-800/90 transition-colors"
                  >
                    <span className="text-sm">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <button
                id="hero-btn-start-project"
                onClick={onStartProject}
                data-cursor="view"
                className="px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-xl shadow-cyan-400/20 active:scale-95 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="hero-btn-view-work"
                onClick={onViewWork}
                data-cursor="explore"
                className="px-7 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-400 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer"
              >
                View Our Work
              </button>

              <a
                id="hero-btn-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="px-5 py-3.5 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Quick Stats Pill Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-5 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-zinc-400 border-t border-zinc-800/60"
            >
              <div>
                <span className="text-white font-bold block text-sm">We Design</span>
                <span className="text-zinc-400">Graphic, UI/UX & 3D</span>
              </div>
              <div className="w-[1px] h-6 bg-zinc-800 hidden sm:block" />
              <div>
                <span className="text-white font-bold block text-sm">We Build</span>
                <span className="text-zinc-400">Web & Modern Apps</span>
              </div>
              <div className="w-[1px] h-6 bg-zinc-800 hidden sm:block" />
              <div>
                <span className="text-white font-bold block text-sm">We Automate</span>
                <span className="text-zinc-400">AI Agents & Growth</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Studio Image with Floating Badges (matching reference) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative mt-8 lg:mt-0"
          >
            {/* Ambient Background Glow behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-emerald-500/20 rounded-[42px] blur-3xl -z-10 opacity-75 pointer-events-none" />

            {/* Main Rounded Image Container */}
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-zinc-800/90 dark:border-zinc-800/90 shadow-2xl bg-zinc-900 group">
              <img
                src={HERO_STUDIO_IMG}
                alt="VORTEX5 Creative & Technology Engineers at work"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-[360px] sm:h-[430px] lg:h-[470px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15 pointer-events-none" />

              {/* Bottom Image Overlay Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-mono backdrop-blur-md bg-black/50 px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-[11px] tracking-wide text-zinc-100">STUDIO WORKSPACE</span>
                </div>
                <span className="text-[10px] text-zinc-300">Creative × Technology</span>
              </div>
            </div>

            {/* Top-Right Floating Badge: Growth Focus (matching reference) */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="absolute -top-4 -right-2 sm:-right-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-black/15 flex items-center gap-3 backdrop-blur-xl z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                  GROWTH FOCUS
                </div>
                <div className="text-xs sm:text-sm font-heading font-extrabold text-zinc-900 dark:text-white">
                  Ads & ROI Engine
                </div>
              </div>
            </motion.div>

            {/* Bottom-Left Floating Badge: Build Analysis (matching reference) */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="absolute -bottom-4 -left-2 sm:-left-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-black/15 flex items-center gap-3 backdrop-blur-xl z-20"
            >
              {/* Overlapping Badges */}
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                  Web
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                  UX
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-bold text-black shadow-sm">
                  AI
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                  BUILD ANALYSIS
                </div>
                <div className="text-xs sm:text-sm font-heading font-extrabold text-zinc-900 dark:text-white">
                  360° Solution
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
