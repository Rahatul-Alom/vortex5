import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrustSectionProps {
  onLearnMore?: () => void;
}

export default function TrustSection({ onLearnMore }: TrustSectionProps) {
  const stats = [
    { value: '50+', label: 'Delivered Projects', detail: 'High-converting portals & web apps' },
    { value: '30+', label: 'Happy Clients', detail: 'Across North America, Europe & Asia' },
    { value: '5+', label: 'Years Experience', detail: 'In reactive tech & brand craft' },
    { value: '10+', label: 'Digital Solutions', detail: 'From custom SPAs to luxury branding' },
  ];

  return (
    <section id="trust-section" className="py-24 border-y border-zinc-900 bg-[#0c0e14] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Intro Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-3">
              Agency Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              We turn ideas into digital experiences.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pl-8 space-y-4">
            <p className="text-lg text-zinc-300 leading-relaxed">
              From powerful websites to memorable brand identities, Vortex helps businesses build a stronger digital presence. We don’t just write code or draft vectors; we engineer competitive advantages.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Whether you need an enterprise eCommerce platform, an interactive React application, or an iconic corporate brand identity, our boutique team works directly with founders and product leaders to execute with uncompromised velocity.
            </p>
          </div>
        </div>

        {/* Dynamic Metric Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-zinc-200 mt-2 font-heading">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-400 mt-1 font-mono">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
