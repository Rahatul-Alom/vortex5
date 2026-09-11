import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Megaphone,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { Service } from '../types';
import { SERVICES_SECTION_CARD } from '../components/ServicesSection';

interface ServicesViewProps {
  services: Service[];
  onSelectService: (serviceName: string) => void;
  whatsappNumber?: string;
  selectedCategoryId?: number;
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

export default function ServicesView({ 
  services, 
  onSelectService, 
  whatsappNumber = '15550192834',
  selectedCategoryId 
}: ServicesViewProps) {
  const [activeTab, setActiveTab] = useState<number | 'all'>(selectedCategoryId || 'all');

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Vortex5, I would like to discuss a project and view your services."
  )}`;

  const displayedDisciplines = activeTab === 'all' 
    ? SERVICES_SECTION_CARD 
    : SERVICES_SECTION_CARD.filter(d => d.id === activeTab);

  return (
    <div className="pt-28 pb-24 bg-[#0b0c10] text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-zinc-800/80 pb-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
              <span>🔥 VORTEX5 CAPABILITIES</span>
              <span>•</span>
              <span>6 CORE DISCIPLINES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              WE DESIGN. WE BUILD. WE AUTOMATE.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
              We help businesses grow and reach the absolute peak of success through creativity, technology, and innovation. Explore our complete scope of services below.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 text-xs font-mono tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All Disciplines ({services.length})
          </button>

          {SERVICES_SECTION_CARD.map((d) => {
            const count = services.filter(s => s.category_id === d.id).length;
            const isActive = activeTab === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{d.emoji}</span>
                <span>{d.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Disciplines Content with AnimatePresence Wipe Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-24"
          >
            {displayedDisciplines.map((discipline) => {
              const disciplineServices = services.filter((s) => s.category_id === discipline.id);
              if (disciplineServices.length === 0) return null;

              return (
                <div key={discipline.id} id={`discipline-${discipline.id}`} className="space-y-8 scroll-mt-24">
                  {/* Category Title Strip */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.45 }}
                    className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">
                        <span className={discipline.accentClass}>{discipline.num}</span>
                        <span>•</span>
                        <span>DISCIPLINE VERTICAL</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                        {discipline.title}
                      </h2>
                    </div>
                    <p className="text-sm text-zinc-400 max-w-md italic">
                      {discipline.tagline}
                    </p>
                  </motion.div>

                  {/* Services Grid with Smooth Wipe & Fade Effect */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {disciplineServices.map((service, index) => {
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
                          exit={{
                            opacity: 0,
                            y: -15,
                            transition: { duration: 0.2 }
                          }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: (index % 4) * 0.07, 
                            ease: [0.16, 1, 0.3, 1] 
                          }}
                          whileHover={{ y: -8, scale: 1.01 }}
                          className={`p-7 rounded-2xl bg-[#11141c] border border-zinc-800 ${discipline.borderHover} flex flex-col justify-between group transition-all shadow-lg shadow-black/40 will-change-transform`}
                        >
                        <div>
                          <div className={`w-12 h-12 rounded-xl ${discipline.iconBoxClass} flex items-center justify-center mb-5 transition-colors`}>
                            <Icon className="w-6 h-6" />
                          </div>

                          <h3 className={`text-xl font-heading font-bold text-white ${discipline.titleHover} transition-colors`}>
                            {service.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                            {service.full_description || service.short_description}
                          </p>

                          {service.deliverables && service.deliverables.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-zinc-800/80 space-y-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block font-bold">
                                Key Deliverables:
                              </span>
                              {service.deliverables.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                                  <CheckCircle className={`w-3.5 h-3.5 ${discipline.accentClass} shrink-0`} />
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {service.technologies && service.technologies.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-zinc-800/40 flex flex-wrap gap-1.5">
                              {service.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-zinc-800/60">
                          <button
                            onClick={() => onSelectService(service.title)}
                            className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black text-xs font-mono font-bold uppercase tracking-wider text-white transition-all flex items-center justify-between cursor-pointer"
                          >
                            <span>Book Consultation</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
