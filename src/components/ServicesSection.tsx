import { useState } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Zap, 
  Briefcase, 
  Building2, 
  Sparkles, 
  Share2, 
  CreditCard, 
  FileText,
  ArrowRight,
  CheckCircle,
  Layers,
  Palette,
  Smartphone,
  Code2,
  Bot,
  Workflow,
  Cpu,
  Video,
  Film,
  PlaySquare,
  Home,
  Box,
  TrendingUp,
  Search,
  Target,
  Megaphone
} from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (serviceName: string) => void;
  onViewAllServices: () => void;
}

const iconMap: Record<string, any> = {
  Palette,
  Layers,
  Smartphone,
  Sparkles,
  Code2,
  Globe,
  ShoppingBag,
  Zap,
  Bot,
  Workflow,
  Cpu,
  Video,
  Film,
  PlaySquare,
  Building2,
  Home,
  Box,
  TrendingUp,
  Search,
  Target,
  Megaphone,
  Briefcase,
  Share2,
  CreditCard,
  FileText
};

export const SERVICES_SECTION_CARD = [
  {
    id: 1,
    num: '01',
    emoji: '🎨',
    title: '1. GRAPHIC & UI/UX DESIGN',
    shortName: 'Graphic & UI/UX',
    tagline: '“We create iconic visual identities, intuitive product interfaces, and memorable branding systems.”',
    accentClass: 'text-indigo-400',
    borderHover: 'hover:border-indigo-500/50',
    badgeClass: 'bg-indigo-950/60 text-indigo-400 border-indigo-800/40',
    iconBoxClass: 'bg-indigo-950/50 border-indigo-800/40 text-indigo-400 group-hover:bg-indigo-400 group-hover:text-black',
    titleHover: 'group-hover:text-indigo-300',
    btnBorder: 'group-hover:border-indigo-400 text-zinc-300 group-hover:text-indigo-300'
  },
  {
    id: 2,
    num: '02',
    emoji: '💻',
    title: '2. WEB DESIGN & DEVELOPMENT',
    shortName: 'Web Development',
    tagline: '“We engineer high-performance web applications, scalable eCommerce platforms, and custom digital portals.”',
    accentClass: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/50',
    badgeClass: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/40',
    iconBoxClass: 'bg-cyan-950/50 border-cyan-800/40 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black',
    titleHover: 'group-hover:text-cyan-300',
    btnBorder: 'group-hover:border-cyan-400 text-zinc-300 group-hover:text-cyan-300'
  },
  {
    id: 3,
    num: '03',
    emoji: '🤖',
    title: '3. AI AUTOMATION',
    shortName: 'AI Automation',
    tagline: '“We deploy autonomous AI agents, smart customer workflows, and fine-tuned LLM integrations.”',
    accentClass: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/50',
    badgeClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40',
    iconBoxClass: 'bg-emerald-950/50 border-emerald-800/40 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black',
    titleHover: 'group-hover:text-emerald-300',
    btnBorder: 'group-hover:border-emerald-400 text-zinc-300 group-hover:text-emerald-300'
  },
  {
    id: 4,
    num: '04',
    emoji: '🎬',
    title: '4. VIDEO EDITING & MOTION GRAPHICS',
    shortName: 'Video & Motion',
    tagline: '“We produce cinema-grade commercial videos, 3D kinetic motion design, and high-converting reels.”',
    accentClass: 'text-fuchsia-400',
    borderHover: 'hover:border-fuchsia-500/50',
    badgeClass: 'bg-fuchsia-950/60 text-fuchsia-400 border-fuchsia-800/40',
    iconBoxClass: 'bg-fuchsia-950/50 border-fuchsia-800/40 text-fuchsia-400 group-hover:bg-fuchsia-400 group-hover:text-black',
    titleHover: 'group-hover:text-fuchsia-300',
    btnBorder: 'group-hover:border-fuchsia-400 text-zinc-300 group-hover:text-fuchsia-300'
  },
  {
    id: 5,
    num: '05',
    emoji: '🏗️',
    title: '5. ARCHITECTURE (INTERIOR, EXTERIOR & 3D)',
    shortName: 'Architecture & 3D',
    tagline: '“We craft photorealistic 3D architectural renderings, spatial walkthroughs, and interior visualizations.”',
    accentClass: 'text-amber-400',
    borderHover: 'hover:border-amber-500/50',
    badgeClass: 'bg-amber-950/60 text-amber-400 border-amber-800/40',
    iconBoxClass: 'bg-amber-950/50 border-amber-800/40 text-amber-400 group-hover:bg-amber-400 group-hover:text-black',
    titleHover: 'group-hover:text-amber-300',
    btnBorder: 'group-hover:border-amber-400 text-zinc-300 group-hover:text-amber-300'
  },
  {
    id: 6,
    num: '06',
    emoji: '📈',
    title: '6. DIGITAL MARKETING',
    shortName: 'Digital Marketing',
    tagline: '“We scale revenue through algorithmic SEO dominance, high-ROAS paid media, and conversion funnels.”',
    accentClass: 'text-rose-400',
    borderHover: 'hover:border-rose-500/50',
    badgeClass: 'bg-rose-950/60 text-rose-400 border-rose-800/40',
    iconBoxClass: 'bg-rose-950/50 border-rose-800/40 text-rose-400 group-hover:bg-rose-400 group-hover:text-black',
    titleHover: 'group-hover:text-rose-300',
    btnBorder: 'group-hover:border-rose-400 text-zinc-300 group-hover:text-rose-300'
  }
];

export default function ServicesSection({ services, onSelectService, onViewAllServices }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const filteredDisciplines = selectedCategory === 'all' 
    ? SERVICES_SECTION_CARD 
    : SERVICES_SECTION_CARD.filter(d => d.id === selectedCategory);

  return (
    <section id="services-section" className="py-24 sm:py-32 relative bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                WHAT WE DO
              </span>
              <span className="text-[10px] font-mono text-zinc-500">• 6 CORE DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              WE DESIGN. WE BUILD. WE AUTOMATE.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              From high-end graphic design and robust web engineering to autonomous AI workflows, motion graphics, and 3D architectural spaces.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onViewAllServices}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 hover:border-cyan-400 bg-zinc-900/60 hover:bg-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Filter Pills in Serial Order */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 scrollbar-none no-scrollbar">
          <button
            id="filter-services-all"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-black font-bold shadow-md shadow-white/10'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All Disciplines ({services.length})
          </button>

          {SERVICES_SECTION_CARD.map((d) => {
            const count = services.filter(s => s.category_id === d.id).length;
            const isActive = selectedCategory === d.id;
            return (
              <button
                key={d.id}
                id={`filter-services-${d.id}`}
                onClick={() => setSelectedCategory(d.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{d.emoji}</span>
                <span>{d.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categories rendering */}
        <div className="space-y-24">
          {filteredDisciplines.map((discipline) => {
            const categoryServices = services.filter((s) => s.category_id === discipline.id);
            if (categoryServices.length === 0) return null;

            return (
              <div key={discipline.id} id={`discipline-${discipline.id}`} className="scroll-mt-24">
                {/* Category Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-zinc-800/90 pb-5 mb-8 gap-3">
                  <div>
                    <span className={`font-mono text-sm font-bold mr-3 ${discipline.accentClass}`}>
                      {discipline.num}
                    </span>
                    <h3 className="inline-block text-2xl sm:text-3xl font-heading font-extrabold text-white">
                      {discipline.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mt-1 sm:mt-0 italic">
                    {discipline.tagline}
                  </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryServices.map((service, index) => {
                    const Icon = iconMap[service.icon_name] || Sparkles;

                    return (
                      <motion.div
                        key={service.id}
                        initial={{ 
                          opacity: 0, 
                          y: 28 
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0 
                        }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: (index % 4) * 0.07, 
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        whileHover={{ y: -6 }}
                        className={`p-7 rounded-2xl bg-[#11141c] border border-zinc-800/90 ${discipline.borderHover} flex flex-col justify-between group transition-all shadow-lg shadow-black/40`}
                      >
                        <div>
                          <div className={`w-12 h-12 rounded-xl ${discipline.iconBoxClass} flex items-center justify-center mb-5 transition-colors`}>
                            <Icon className="w-6 h-6" />
                          </div>

                          <h4 className={`text-lg font-heading font-bold text-white ${discipline.titleHover} transition-colors`}>
                            {service.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed line-clamp-3">
                            {service.short_description}
                          </p>

                          {service.deliverables && service.deliverables.length > 0 && (
                            <div className="mt-5 pt-3 border-t border-zinc-800/60 space-y-1.5">
                              {service.deliverables.slice(0, 2).map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                                  <CheckCircle className={`w-3 h-3 ${discipline.accentClass} shrink-0`} />
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-3">
                          <button
                            onClick={() => onSelectService(service.title)}
                            data-cursor="view"
                            className={`w-full py-2.5 px-3 rounded-lg border border-zinc-800 ${discipline.btnBorder} text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer`}
                          >
                            <span>Request Service</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
