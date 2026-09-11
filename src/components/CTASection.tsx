import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface CTASectionProps {
  onStartProject: () => void;
  whatsappNumber?: string;
}

export default function CTASection({ onStartProject, whatsappNumber = '15550192834' }: CTASectionProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Vortex, I'm interested in your services. I would like to discuss a project."
  )}`;

  return (
    <section id="cta-section" className="py-24 sm:py-32 bg-[#08090d] border-t border-zinc-900 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block">
            Start Collaboration
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-tight">
            HAVE A PROJECT IN MIND?
          </h2>

          <p className="text-base sm:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Let’s build something remarkable together. We turn complex requirements into high-converting digital products.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartProject}
              data-cursor="view"
              className="px-9 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-cyan-400/20 active:scale-95 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="px-7 py-4 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/20 text-emerald-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
