import { ArrowUpRight, MessageSquare, Mail, Phone, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenContact: () => void;
  whatsappNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export default function Footer({
  onNavigate,
  onOpenContact,
  whatsappNumber = '15550192834',
  contactEmail = 'hello@vortex5.net',
  contactPhone = '+1 (555) 019-2834'
}: FooterProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Vortex5, I'm interested in your creative and technology services. I would like to discuss a project."
  )}`;

  return (
    <footer id="agency-footer" className="bg-[#08090d] border-t border-zinc-900 text-zinc-400 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Massive Headline */}
        <div className="border-b border-zinc-800/80 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VORTEX5 • CREATIVE × TECHNOLOGY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-none">
                WE DESIGN. WE BUILD. WE AUTOMATE.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                We help businesses grow and reach the absolute peak of success through creativity, technology, and innovation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                data-cursor="view"
                className="px-8 py-4 rounded-full bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-lg shadow-cyan-500/10"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="px-6 py-4 rounded-full border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 bg-emerald-950/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-black font-extrabold text-sm tracking-tighter shadow-md shadow-cyan-500/20">
                V5
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>VORTEX</span>
                <span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 font-mono">
                  5
                </span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              VORTEX5 is an elite digital agency blending high-end design, full-stack software development, autonomous AI workflows, motion cinema, and 3D architectural rendering.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </div>
              <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`tel:${contactPhone}`}>{contactPhone}</a>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Global Remote Delivery & Creative Studio</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-200 font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Selected Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  About VORTEX5
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Contact Agency
                </button>
              </li>
            </ul>
          </div>

          {/* Core Disciplines */}
          <div className="lg:col-span-1">
            <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-200 font-bold mb-4">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('graphic-design')} className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>🎨</span> <span>Graphic & UI/UX</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('web-dev')} className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>💻</span> <span>Web Design & Dev</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-automation')} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>🤖</span> <span>AI Automation</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('video-motion')} className="hover:text-fuchsia-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>🎬</span> <span>Video & Motion</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture-3d')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>🏗️</span> <span>Architecture & 3D</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('digital-marketing')} className="hover:text-rose-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>📈</span> <span>Digital Marketing</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Portal */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-200 font-bold mb-4">
              Legal & Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li className="pt-3">
                {/* <button
                  id="link-admin-portal"
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors py-1.5 px-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button> */}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} VORTEX5 Digital Agency. Creative × Technology</p>
          <p>We Design. We Build. We Automate.</p>
        </div>
      </div>
    </footer>
  );
}
