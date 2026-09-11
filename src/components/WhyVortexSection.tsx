import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Smartphone, 
  Zap, 
  Server, 
  Headphones, 
  Code 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyVortexSection() {
  const pillars = [
    {
      title: 'Custom Solutions',
      description: 'Zero off-the-shelf bloated templates. Every pixel and backend route is handcrafted specifically to serve your business objectives.',
      icon: Code
    },
    {
      title: 'Modern Technology',
      description: 'Built on Next.js, React 19, TypeScript, and modern headless services for future-proof reliability and rapid developer iteration.',
      icon: Cpu
    },
    {
      title: 'Creative Design',
      description: 'Editorial typographic discipline, high-contrast layouts, and bespoke visual languages inspired by the best global digital studios.',
      icon: Sparkles
    },
    {
      title: 'Business-focused Approach',
      description: 'Aesthetics mean nothing without conversion. We design every interface funnel to maximize customer lifetime value and leads.',
      icon: TrendingUp
    },
    {
      title: 'Responsive Development',
      description: 'Flawless execution across mobile screens (320px–425px), tablets, high-DPI laptops, and ultra-wide desktop workstations.',
      icon: Smartphone
    },
    {
      title: 'Performance Optimized',
      description: 'Obsessive 90+ Google Lighthouse metrics, zero layout shifts, optimized WebP graphics, and sub-second page transitions.',
      icon: Zap
    },
    {
      title: 'Scalable Architecture',
      description: 'Clean REST and GraphQL APIs backed by robust MySQL relational design ready to handle high-traffic spikes without degrading.',
      icon: Server
    },
    {
      title: 'Dedicated Support',
      description: 'Direct communication channels via WhatsApp and video syncs with principal designers and engineers, not outsourced support reps.',
      icon: Headphones
    }
  ];

  return (
    <section id="why-vortex-section" className="py-28 bg-[#0c0e14] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              The VORTEX5 Standard • Creative × Technology 
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              WHY VORTEX5?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md">
            We Design. We Build. We Automate. Helping businesses reach the absolute peak of success through creativity and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="p-6 rounded-2xl bg-[#11141c] border border-zinc-800/70 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400 flex items-center justify-center mb-5 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
