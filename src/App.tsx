import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ServicesSection from './components/ServicesSection';
import PortfolioGrid from './components/PortfolioGrid';
import ProcessSection from './components/ProcessSection';
import WhyVortexSection from './components/WhyVortexSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import CaseStudyModal from './components/CaseStudyModal';
import ContactFormModal from './components/ContactFormModal';

// Views
import AboutView from './views/AboutView';
import ServicesView from './views/ServicesView';
import PortfolioView from './views/PortfolioView';
import ContactView from './views/ContactView';
import AdminDashboard from './views/AdminDashboard';

// API & Types
import { fetchSettings, fetchServices, fetchProjects, fetchTestimonials } from './lib/api';
import { Service, Project, Testimonial, SiteSettings } from './types';
import { initialServices, initialProjects, initialTestimonials, initialSettings } from '../server/seedData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  
  // Modals
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [defaultServiceRequest, setDefaultServiceRequest] = useState('Custom Website Development');

  // Load backend data
  useEffect(() => {
    async function loadAppData() {
      try {
        const [settingsData, servicesData, projectsData, testimonialsData] = await Promise.all([
          fetchSettings().catch(() => initialSettings),
          fetchServices().catch(() => initialServices),
          fetchProjects().catch(() => initialProjects),
          fetchTestimonials().catch(() => initialTestimonials)
        ]);

        if (settingsData) setSettings(settingsData);
        if (servicesData && servicesData.length > 0) setServices(servicesData);
        if (projectsData && projectsData.length > 0) setProjects(projectsData);
        if (testimonialsData && testimonialsData.length > 0) setTestimonials(testimonialsData);
      } catch (err) {
        console.warn('Using bundled dataset fallback:', err);
      }
    }

    loadAppData();
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleOpenContactModal = (serviceName?: string) => {
    if (serviceName) {
      setDefaultServiceRequest(serviceName);
    }
    setIsContactModalOpen(true);
  };

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedCaseStudy(project);
  };

  const activeWhatsApp = settings.whatsapp_number || '15550192834';

  // If in admin mode, display admin dashboard full screen
  if (currentView === 'admin') {
    return (
      <>
        <CustomCursor />
        <AdminDashboard onReturnToSite={() => setCurrentView('home')} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-zinc-100 selection:bg-cyan-400 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Interactive Custom Cursor for desktop */}
      <CustomCursor />

      {/* Global Agency Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenContactModal={() => handleOpenContactModal()}
        whatsappNumber={activeWhatsApp}
      />

      {/* Main View Router */}
      <main id="vortex-main-content">
        {currentView === 'home' && (
          <>
            <HeroSection
              headline={settings.hero_headline}
              subtext={settings.hero_subtext}
              onStartProject={() => handleOpenContactModal()}
              onViewWork={() => handleNavigate('portfolio')}
              whatsappNumber={activeWhatsApp}
            />

            <TrustSection onLearnMore={() => handleNavigate('about')} />

            <ServicesSection
              services={services}
              onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
              onViewAllServices={() => handleNavigate('services')}
            />

            <PortfolioGrid
              projects={projects}
              onOpenCaseStudy={handleOpenCaseStudy}
            />

            <ProcessSection />

            <WhyVortexSection />

            <TestimonialsSection testimonials={testimonials} />

            <CTASection
              onStartProject={() => handleOpenContactModal()}
              whatsappNumber={activeWhatsApp}
            />
          </>
        )}

        {currentView === 'portfolio' && (
          <PortfolioView
            projects={projects}
            onOpenCaseStudy={handleOpenCaseStudy}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            services={services}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'graphic-design' && (
          <ServicesView
            services={services}
            selectedCategoryId={1}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'web-dev' && (
          <ServicesView
            services={services}
            selectedCategoryId={2}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'ai-automation' && (
          <ServicesView
            services={services}
            selectedCategoryId={3}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'video-motion' && (
          <ServicesView
            services={services}
            selectedCategoryId={4}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'architecture-3d' && (
          <ServicesView
            services={services}
            selectedCategoryId={5}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'digital-marketing' && (
          <ServicesView
            services={services}
            selectedCategoryId={6}
            onSelectService={(serviceName) => handleOpenContactModal(serviceName)}
            whatsappNumber={activeWhatsApp}
          />
        )}

        {currentView === 'about' && (
          <AboutView onStartProject={() => handleOpenContactModal()} />
        )}

        {currentView === 'contact' && (
          <ContactView
            whatsappNumber={activeWhatsApp}
            contactEmail={settings.contact_email}
            contactPhone={settings.contact_phone}
          />
        )}

        {(currentView === 'privacy' || currentView === 'terms') && (
          <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 text-zinc-300 space-y-6">
            <h1 className="text-3xl font-heading font-bold text-white">
              {currentView === 'privacy' ? 'Privacy Policy' : 'Terms of Engagement'}
            </h1>
            <p className="text-sm text-zinc-400">Last updated: January 2026</p>
            <div className="space-y-4 text-sm leading-relaxed text-zinc-400 pt-4">
              <p>
                At Vortex Agency, we take the confidentiality of your intellectual property, system architecture, and proprietary business metrics with the utmost seriousness. All project inquiries, codebases, design assets, and communications are safeguarded under strict mutual non-disclosure standards.
              </p>
              <p>
                Client inquiries submitted via our web portals or WhatsApp channels are processed exclusively for project estimation, sprint planning, and commercial delivery. We never resell or transfer your data to third-party ad networks.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Global Agency Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContactModal()}
        whatsappNumber={activeWhatsApp}
        contactEmail={settings.contact_email}
        contactPhone={settings.contact_phone}
      />

      {/* Floating WhatsApp Action Trigger */}
      <FloatingWhatsApp whatsappNumber={activeWhatsApp} />

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onStartProject={(serviceName) => handleOpenContactModal(serviceName)}
      />

      {/* Project Consultation Inquiry Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultService={defaultServiceRequest}
        whatsappNumber={activeWhatsApp}
      />
    </div>
  );
}
