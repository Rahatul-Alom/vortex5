import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Layers, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onStartProject: (serviceName?: string) => void;
}

export default function CaseStudyModal({ project, onClose, onStartProject }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        id="case-study-backdrop"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          id="case-study-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#11141c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl my-8 text-zinc-200"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#11141c]/90 backdrop-blur-md border-b border-zinc-800/80">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                {project.category}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {project.year} • {project.industry}
              </span>
            </div>

            <button
              id="btn-close-case-study"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors focus:outline-none"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Title & Client */}
            <div>
              <p className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
                Client: {project.client}
              </p>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                {project.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* Featured Hero Visual */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900 group">
              <img
                src={project.featured_image}
                alt={project.title}
                className="w-full h-72 sm:h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Architecture</span>
                </a>
              )}
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-red-400 mb-3 font-mono text-xs font-semibold uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span>The Challenge</span>
                </div>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.challenge || 'Client faced legacy platform bottlenecks, fragmented user funnels, and inadequate brand articulation.'}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-cyan-400 mb-3 font-mono text-xs font-semibold uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>The Solution</span>
                </div>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.solution || 'Engineered custom modular architecture with low-latency APIs and editorial-grade design systems.'}
                </p>
              </div>
            </div>

            {/* Results & Business Impact */}
            {project.result && (
              <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-cyan-950/20 via-zinc-900 to-indigo-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-emerald-400 mb-2 font-mono text-xs uppercase tracking-widest font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tangible Business Impact</span>
                </div>
                <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                  {project.result}
                </p>
              </div>
            )}

            {/* Tech Stack & Design Architecture */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deep Process Breakdown */}
            {(project.development_process || project.design_process) && (
              <div className="space-y-6 pt-4 border-t border-zinc-800/80">
                {project.development_process && (
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Engineering & Technical Execution</span>
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {project.development_process}
                    </p>
                  </div>
                )}
                {project.design_process && (
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Design Thinking & Aesthetic Strategy</span>
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {project.design_process}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Additional Gallery Screenshots */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400">
                  Project Gallery
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery_images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden border border-zinc-800">
                      <img src={img} alt={`${project.title} preview ${idx + 1}`} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA Banner */}
            <div className="p-8 rounded-xl bg-gradient-to-tr from-cyan-900/30 to-indigo-900/20 border border-zinc-700/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-heading font-bold text-white">
                  Inspired by this project?
                </h4>
                <p className="text-sm text-zinc-400 mt-1">
                  Let’s collaborate to build something equally remarkable for your business.
                </p>
              </div>

              <button
                id="btn-case-study-start-project"
                onClick={() => {
                  onClose();
                  onStartProject(project.title);
                }}
                className="whitespace-nowrap px-6 py-3 rounded-full bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Start Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
