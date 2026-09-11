import { useState } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface PortfolioGridProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  title?: string;
  subtitle?: string;
}

const categories = ['All', 'Web Development', 'eCommerce', 'UI/UX', 'Branding', 'Graphic Design'];

export default function PortfolioGrid({
  projects,
  onOpenCaseStudy,
  title = 'SELECTED WORK',
  subtitle = 'Curated case studies delivering transformative outcomes for global brands.'
}: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="portfolio-section" className="py-28 bg-[#0c0e14] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              Portfolio & Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#11141c] border border-zinc-800/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
              onClick={() => onOpenCaseStudy(project)}
              data-cursor="explore"
            >
              {/* Image Container with Zoom & Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-transparent opacity-80" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-800/40">
                    {project.category}
                  </span>
                </div>

                {/* Corner Expand Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-zinc-400 mb-1">
                    {project.client} • {project.year}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {project.short_description}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800/60 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Case Study →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
