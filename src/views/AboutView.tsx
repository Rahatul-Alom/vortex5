import { ArrowRight, ShieldCheck, Target, HeartHandshake, Zap, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutViewProps {
  onStartProject: () => void;
}

export default function AboutView({ onStartProject }: AboutViewProps) {
  const values = [
    {
      title: 'Craft Over Hype',
      description: 'We believe real craftsmanship speaks louder than empty buzzwords. Every line of code and typographic choice is executed with purpose.',
      icon: ShieldCheck
    },
    {
      title: 'Measurable Velocity',
      description: 'Fast turnarounds without sacrificing structural integrity. We build lean, modular architectures that scale seamlessly.',
      icon: Zap
    },
    {
      title: 'Direct Access',
      description: 'Zero bureaucratic project managers. You collaborate directly with principal engineers and designers who actually execute your vision.',
      icon: HeartHandshake
    },
    {
      title: 'Commercial Impact',
      description: 'Every interface is engineered as an investment asset with a clear purpose: increasing brand equity, trust, and conversions.',
      icon: Target
    }
  ];

  const techStack = [
    { name: 'Next.js 15 & React 19', role: 'Reactive Architecture & SSR' },
    { name: 'TypeScript', role: 'Type-safe Enterprise Codebase' },
    { name: 'Tailwind CSS', role: 'Modular Design Tokens' },
    { name: 'MySQL & Node.js', role: 'Relational High-Throughput APIs' },
    { name: 'Figma & Adobe Suite', role: 'High-Fidelity Interface & Brand Systems' },
    { name: 'Framer Motion', role: 'Fluid Physics-Based Micro-interactions' }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#0b0c10] text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-28">
        {/* Hero Banner */}
        <div className="max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-3">
            About VORTEX5 • Creative × Technology 
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            WE HELP BUSINESSES REACH THE ABSOLUTE PEAK OF SUCCESS.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl">
            We help businesses grow and reach the absolute peak of success through <span className="text-cyan-400 font-semibold">creativity</span>, <span className="text-indigo-400 font-semibold">technology</span>, and <span className="text-emerald-400 font-semibold">innovation</span>. We Design. We Build. We Automate.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Bridging Artistry, Engineering & Autonomous Intelligence.
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              In a crowded digital landscape filled with cookie-cutter templates and sluggish operations, VORTEX5 provides an antidote. We partner with ambitious startups, luxury hospitality brands, fast-scaling eCommerce founders, and enterprise organizations to deploy bespoke, high-impact digital experiences.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Our 6 interconnected pillars — Graphic & UI/UX Design, Web Design & Development, AI Automation, Video Editing & Motion Graphics, Architecture & 3D Spatial Design, and Digital Marketing — mean your entire brand ecosystem operates in unified harmony.
            </p>

            <div className="pt-4">
              <button
                onClick={onStartProject}
                className="px-6 py-3.5 rounded-full bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Vortex Agency Studio Team"
              className="w-full h-96 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="max-w-xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Our Principles
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-white">
              WHAT GUIDES OUR WORK.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-[#11141c] border border-zinc-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 text-cyan-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Architecture Stack */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11141c] border border-zinc-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold mb-4">
            <Cpu className="w-4 h-4" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-6">
            Enterprise Technical Architecture.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="font-heading font-bold text-white text-base">
                  {tech.name}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  {tech.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
