import Marquee from 'react-fast-marquee';
import { Star, Quote, Sparkles, Award } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  // Split or mirror testimonials for dynamic dual marquee rows
  const row1 = testimonials;
  const row2 = testimonials.length > 2 ? [...testimonials].reverse() : testimonials;

  return (
    <section id="testimonials-section" className="py-24 sm:py-32 bg-[#0b0c10] border-t border-zinc-900 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-14 sm:mb-18">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
              TRUSTED BY INDUSTRY LEADERS.
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <Award className="w-4 h-4 text-amber-400" />
              <span><strong className="text-white font-bold">4.9/5</strong> Rating Score</span>
            </div>
            <div className="hidden sm:block text-zinc-600">•</div>
            <div className="hidden sm:block text-zinc-500">
              Pause on hover to read details
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="space-y-6 sm:space-y-8 relative">
        {/* Row 1: Sliding Left */}
        <Marquee
          direction="left"
          speed={42}
          pauseOnHover={true}
          gradient={true}
          gradientColor="#0b0c10"
          gradientWidth={80}
          className="py-2"
        >
          {row1.map((item, index) => (
            <div
              key={`row1-${item.id}-${index}`}
              className="mx-3 sm:mx-4 w-[340px] sm:w-[420px] p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#11141c] border border-zinc-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between group select-none cursor-grab active:cursor-grabbing"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                </div>

                <p className="text-sm sm:text-[15px] text-zinc-300 font-sans leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                  “{item.testimonial}”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 pt-5 border-t border-zinc-800/80">
                {item.profile_image ? (
                  <img
                    src={item.profile_image}
                    alt={item.client_name}
                    className="w-12 h-12 rounded-full object-cover border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">
                    {item.client_name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-heading font-bold text-white truncate">
                    {item.client_name}
                  </div>
                  <div className="text-xs font-mono text-cyan-400 truncate">
                    {item.position}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">
                    {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Sliding Right */}
        <Marquee
          direction="right"
          speed={36}
          pauseOnHover={true}
          gradient={true}
          gradientColor="#0b0c10"
          gradientWidth={80}
          className="py-2"
        >
          {row2.map((item, index) => (
            <div
              key={`row2-${item.id}-${index}`}
              className="mx-3 sm:mx-4 w-[340px] sm:w-[420px] p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#11141c] border border-zinc-800/80 hover:border-purple-500/40 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between group select-none cursor-grab active:cursor-grabbing"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-700 group-hover:text-purple-400 transition-colors" />
                </div>

                <p className="text-sm sm:text-[15px] text-zinc-300 font-sans leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                  “{item.testimonial}”
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 pt-5 border-t border-zinc-800/80">
                {item.profile_image ? (
                  <img
                    src={item.profile_image}
                    alt={item.client_name}
                    className="w-12 h-12 rounded-full object-cover border border-purple-500/30 group-hover:border-purple-400 transition-colors shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm shrink-0">
                    {item.client_name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-heading font-bold text-white truncate">
                    {item.client_name}
                  </div>
                  <div className="text-xs font-mono text-purple-400 truncate">
                    {item.position}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">
                    {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

