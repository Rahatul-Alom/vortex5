import { motion } from 'motion/react';
import { Search, Compass, Palette, Code2, Rocket } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      tagline: 'We understand your business, goals and audience.',
      description: 'We initiate every engagement with rigorous stakeholder interviews, competitor benchmarking, audience telemetry, and clear conversion KPI definition.',
      icon: Search
    },
    {
      num: '02',
      title: 'STRATEGIZE',
      tagline: 'We create a clear digital strategy.',
      description: 'Mapping user journeys, technical architecture, database schema, component hierarchies, and content strategy into an actionable project roadmap.',
      icon: Compass
    },
    {
      num: '03',
      title: 'DESIGN',
      tagline: 'We create the visual experience.',
      description: 'High-fidelity Figma prototypes, custom typography selection, bespoke design tokens, fluid micro-interactions, and visual storytelling.',
      icon: Palette
    },
    {
      num: '04',
      title: 'DEVELOP',
      tagline: 'We turn the design into a functional product.',
      description: 'Modern Next.js and React 19 engineering with TypeScript, clean REST/GraphQL endpoints, database optimization, and cross-device responsiveness.',
      icon: Code2
    },
    {
      num: '05',
      title: 'LAUNCH',
      tagline: 'We test, optimize and launch.',
      description: 'Rigorous accessibility auditing, load and latency testing, SEO indexing verification, CDN edge deployment, and post-launch monitoring.',
      icon: Rocket
    }
  ];

  return (
    <section id="process-section" className="py-28 bg-[#0b0c10] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Methodology & Delivery
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            OUR 5-STEP PROCESS.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            A battle-tested creative workflow engineered to eliminate ambiguity and deliver measurable market impact on time and on budget.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#11141c] border border-zinc-800/80 hover:border-cyan-500/50 flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-heading font-extrabold text-zinc-700 group-hover:text-cyan-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 text-zinc-400 group-hover:text-cyan-400 flex items-center justify-center border border-zinc-800 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/90 mt-1 mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
