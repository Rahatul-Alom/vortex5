import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface PortfolioViewProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
}

const categories = ['All', 'Web Development', 'eCommerce', 'UI/UX', 'Branding', 'Graphic Design'];

export default function PortfolioView({ projects, onOpenCaseStudy }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-[#0b0c10] text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-3">
            Selected Work
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            CASE STUDIES & CRAFT.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400">
            Explore our curated archive of enterprise web applications, high-converting eCommerce shops, and bespoke brand identities.
          </p>
        </div>

        {/* Controls Bar: Search & Filter Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, client..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenCaseStudy(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#11141c] border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
                data-cursor="explore"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-cyan-400 border border-cyan-800/40">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-zinc-500 mb-1">
                      {project.client} • {project.year}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 2).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold uppercase text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Case Study →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-zinc-500">
            <p className="text-lg">No projects found matching your query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
