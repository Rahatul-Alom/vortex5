import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  MessageSquare, 
  ChevronDown, 
  Palette, 
  Code2, 
  Bot, 
  Video, 
  Building2, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, targetId?: string) => void;
  onOpenContactModal: () => void;
  whatsappNumber?: string;
}

export default function Navbar({ currentView, onNavigate, onOpenContactModal, whatsappNumber = '15550192834' }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const dropdownCloseTimeout = useRef<any>(null);

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Vortex5, I'm interested in your creative and technology services. I would like to discuss a project."
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterServices = () => {
    if (dropdownCloseTimeout.current) {
      clearTimeout(dropdownCloseTimeout.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownCloseTimeout.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const isServicesActive =
    currentView === 'services' || 
    currentView === 'graphic-design' || 
    currentView === 'web-dev' ||
    currentView === 'ai-automation' ||
    currentView === 'video-motion' ||
    currentView === 'architecture-3d' ||
    currentView === 'digital-marketing';

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0c10]/85 backdrop-blur-xl border-b border-zinc-800/80 py-3.5 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo: VORTEX5 | Creative × Technology  */}
        <button
          id="nav-brand-logo"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          data-cursor="open"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 flex items-center justify-center text-white font-extrabold text-sm tracking-tighter group-hover:rotate-45 transition-transform duration-500 shadow-md shadow-cyan-500/20">
            V5
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                VORTEX<span className="text-cyan-400 font-black">5</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 tracking-wider hidden lg:inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Creative × Tech 
              </span>
            </div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400 lg:hidden">
              Creative × Tech 
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {/* Work link */}
          <button
            id="nav-link-work"
            onClick={() => onNavigate('portfolio')}
            className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'portfolio' ? 'text-cyan-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            Work
            {currentView === 'portfolio' && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400"
              />
            )}
          </button>

          {/* Services with dropdown */}
          <div
            id="nav-services-dropdown-container"
            className="relative py-1"
            onMouseEnter={handleMouseEnterServices}
            onMouseLeave={handleMouseLeaveServices}
          >
            <button
              id="nav-link-services"
              onClick={() => onNavigate('services')}
              className={`relative flex items-center gap-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
                isServicesActive ? 'text-cyan-400 font-semibold' : 'text-zinc-400'
              }`}
              aria-expanded={servicesDropdownOpen}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                }`}
              />
              {isServicesActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400"
                />
              )}
            </button>

            {/* Desktop Dropdown Menu with 6 Core Disciplines */}
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  id="nav-services-menu"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[460px] z-50 pointer-events-auto"
                >
                  <div className="rounded-2xl bg-[#0e1017]/95 backdrop-blur-2xl border border-zinc-800/90 shadow-2xl shadow-black/80 p-3 overflow-hidden">
                    <div className="px-3 py-2 border-b border-zinc-800/70 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">🔥</span>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold">
                          WHAT WE DO
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                        6 PILLARS
                      </span>
                    </div>

                    <div className="pt-2 grid grid-cols-1 gap-1">
                      {/* 1. 🎨 Graphic & UI/UX Design */}
                      <button
                        id="nav-dropdown-item-graphic-design"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('graphic-design');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-3 text-left group cursor-pointer border border-transparent hover:border-indigo-500/30"
                      >
                        <div className="w-9 h-9 rounded-xl bg-indigo-950/50 border border-indigo-800/40 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 group-hover:text-black transition-colors text-sm">
                          🎨
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-heading font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                              1. Graphic & UI/UX Design
                            </span>
                            <span className="text-[9px] font-mono text-indigo-400 font-bold px-1.5 py-0.5 rounded bg-indigo-950/60">
                              01
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            Branding, visual systems, app UI/UX & packaging
                          </p>
                        </div>
                      </button>

                      {/* 2. 💻 Web Design & Development */}
                      <button
                        id="nav-dropdown-item-web-dev"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('web-dev');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-3 text-left group cursor-pointer border border-transparent hover:border-cyan-500/30"
                      >
                        <div className="w-9 h-9 rounded-xl bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:text-black transition-colors text-sm">
                          💻
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-heading font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                              2. Web Design & Development
                            </span>
                            <span className="text-[9px] font-mono text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-950/60">
                              02
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            Next.js, modern eCommerce, React 19 SPAs & web portals
                          </p>
                        </div>
                      </button>

                      {/* 3. 🤖 AI Automation */}
                      <button
                        id="nav-dropdown-item-ai-automation"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('ai-automation');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-3 text-left group cursor-pointer border border-transparent hover:border-emerald-500/30"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-400 group-hover:text-black transition-colors text-sm">
                          🤖
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-heading font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                              3. AI Automation
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-950/60">
                              03
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            AI support agents, process pipelines & custom LLM models
                          </p>
                        </div>
                      </button>

                      {/* 4. 🎬 Video Editing & Motion Graphics */}
                      <button
                        id="nav-dropdown-item-video-motion"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('video-motion');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-3 text-left group cursor-pointer border border-transparent hover:border-fuchsia-500/30"
                      >
                        <div className="w-9 h-9 rounded-xl bg-fuchsia-950/50 border border-fuchsia-800/40 text-fuchsia-400 flex items-center justify-center shrink-0 group-hover:bg-fuchsia-400 group-hover:text-black transition-colors text-sm">
                          🎬
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-heading font-extrabold text-white group-hover:text-fuchsia-300 transition-colors">
                              4. Video Editing & Motion Graphics
                            </span>
                            <span className="text-[9px] font-mono text-fuchsia-400 font-bold px-1.5 py-0.5 rounded bg-fuchsia-950/60">
                              04
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            Commercial video, kinetic 3D motion, Reels & viral shorts
                          </p>
                        </div>
                      </button>

                      {/* 5. 🏗️ Architecture (Interior, Exterior & 3D) */}
                      <button
                        id="nav-dropdown-item-architecture-3d"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('architecture-3d');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-3 text-left group cursor-pointer border border-transparent hover:border-amber-500/30"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-950/50 border border-amber-800/40 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-black transition-colors text-sm">
                          🏗️
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-heading font-extrabold text-white group-hover:text-amber-300 transition-colors">
                              5. Architecture (Interior, Exterior & 3D)
                            </span>
                            <span className="text-[9px] font-mono text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-950/60">
                              05
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            Photorealistic 3D rendering, spatial planning & VR tours
                          </p>
                        </div>
                      </button>

                      {/* 6. 📈 Digital Marketing */}
                      <button
                        id="nav-dropdown-item-digital-marketing"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('digital-marketing');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-zinc-800/70 transition-all flex items-center gap-3 text-left group cursor-pointer border border-transparent hover:border-rose-500/30"
                      >
                        <div className="w-9 h-9 rounded-xl bg-rose-950/50 border border-rose-800/40 text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-400 group-hover:text-black transition-colors text-sm">
                          📈
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-heading font-extrabold text-white group-hover:text-rose-300 transition-colors">
                              6. Digital Marketing
                            </span>
                            <span className="text-[9px] font-mono text-rose-400 font-bold px-1.5 py-0.5 rounded bg-rose-950/60">
                              06
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            Algorithmic SEO, paid ads (Google/Meta) & CRO funnels
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* View All Services Footer */}
                    <div className="mt-2 pt-2 border-t border-zinc-800/70">
                      <button
                        id="nav-dropdown-item-all-services"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigate('services');
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>View All Capabilities & Packages</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About link */}
          <button
            id="nav-link-about"
            onClick={() => onNavigate('about')}
            className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'about' ? 'text-cyan-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            About
            {currentView === 'about' && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400"
              />
            )}
          </button>

          {/* Contact link */}
          <button
            id="nav-link-contact"
            onClick={() => onNavigate('contact')}
            className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'contact' ? 'text-cyan-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            Contact
            {currentView === 'contact' && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400"
              />
            )}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleTheme}
            data-cursor="view"
            className="p-2.5 rounded-full border border-zinc-700/60 bg-zinc-900/50 hover:border-cyan-400 text-zinc-300 hover:text-cyan-400 transition-all cursor-pointer flex items-center justify-center shadow-sm"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 transition-transform hover:-rotate-12" />
            )}
          </button>

          <a
            id="nav-whatsapp-quick"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors font-mono tracking-wider py-2 px-3 rounded-full border border-zinc-800 hover:border-emerald-500/30 bg-zinc-900/40"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            id="nav-start-project-btn"
            onClick={onOpenContactModal}
            data-cursor="view"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-cyan-400 transition-all duration-300 shadow-md hover:shadow-cyan-500/20 active:scale-95 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            id="nav-mobile-theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
          </button>

          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[70px] bg-[#0b0c10] border-t border-zinc-800/80 z-50 flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 pt-2">
              {/* Work */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('portfolio');
                }}
                className={`text-left text-2xl font-heading font-bold tracking-tight transition-colors ${
                  currentView === 'portfolio' ? 'text-cyan-400' : 'text-zinc-300 hover:text-white'
                }`}
              >
                Work
              </button>

              {/* Services Section with 6 Sub-Items */}
              <div className="border-y border-zinc-800/80 py-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('services');
                    }}
                    className={`text-left text-2xl font-heading font-bold tracking-tight transition-colors ${
                      isServicesActive ? 'text-cyan-400' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    🔥 What We Do
                  </button>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {mobileServicesOpen && (
                  <div className="space-y-2 pt-1">
                    {/* 1. Graphic & UI/UX Design */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('graphic-design');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🎨</span>
                        <div>
                          <span className="text-xs font-heading font-bold text-white block">
                            1. Graphic & UI/UX Design
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {/* 2. Web Design & Development */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('web-dev');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">💻</span>
                        <div>
                          <span className="text-xs font-heading font-bold text-white block">
                            2. Web Design & Development
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {/* 3. AI Automation */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('ai-automation');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🤖</span>
                        <div>
                          <span className="text-xs font-heading font-bold text-white block">
                            3. AI Automation
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {/* 4. Video Editing & Motion Graphics */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('video-motion');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🎬</span>
                        <div>
                          <span className="text-xs font-heading font-bold text-white block">
                            4. Video Editing & Motion
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {/* 5. Architecture (Interior, Exterior & 3D) */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('architecture-3d');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🏗️</span>
                        <div>
                          <span className="text-xs font-heading font-bold text-white block">
                            5. Architecture (Interior/3D)
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {/* 6. Digital Marketing */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('digital-marketing');
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">📈</span>
                        <div>
                          <span className="text-xs font-heading font-bold text-white block">
                            6. Digital Marketing
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* About */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('about');
                }}
                className={`text-left text-2xl font-heading font-bold tracking-tight transition-colors ${
                  currentView === 'about' ? 'text-cyan-400' : 'text-zinc-300 hover:text-white'
                }`}
              >
                About
              </button>

              {/* Contact */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className={`text-left text-2xl font-heading font-bold tracking-tight transition-colors ${
                  currentView === 'contact' ? 'text-cyan-400' : 'text-zinc-300 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            <div className="flex flex-col gap-3 pb-10 pt-4 border-t border-zinc-800/80">
              {/* Mobile Drawer Theme Toggle */}
              <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-400" />
                  )}
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                </div>
                <button
                  id="mobile-drawer-theme-toggle"
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer border border-zinc-700/50"
                >
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full py-3.5 rounded-full bg-cyan-400 text-black font-bold text-center tracking-wider uppercase text-xs cursor-pointer"
              >
                Start a Project
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full border border-emerald-500/40 text-emerald-400 font-semibold text-center flex items-center justify-center gap-2 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
