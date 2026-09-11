import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle2, MessageSquare, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitContact } from '../lib/api';
import { ContactFormData } from '../types';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  whatsappNumber?: string;
}

const serviceOptions = [
  '🎨 Graphic & UI/UX Design',
  '🎨 Brand Identity & Logo Systems',
  '🎨 UI/UX Mobile App & Web Design',
  '🎨 Social Media & Marketing Graphics',
  '💻 Web Design & Development',
  '💻 Next.js & Full-Stack Web Development',
  '💻 High-Performance eCommerce Platform',
  '💻 React 19 SPA & Web Portals',
  '🤖 AI Automation & Workflows',
  '🤖 Intelligent AI Chatbots & Voice Agents',
  '🤖 Enterprise LLM & API Integration',
  '🎬 Video Editing & Motion Graphics',
  '🎬 3D Motion Graphics & Visual FX',
  '🎬 Commercial Video & Viral Short Form',
  '🏗️ Architecture (Interior, Exterior & 3D)',
  '🏗️ Photorealistic 3D Architectural Renders',
  '📈 Digital Marketing & Growth',
  '📈 Algorithmic SEO & Search Dominance',
  '📈 High-ROI Paid Ads (Meta, Google, TikTok)',
  'Other Bespoke Creative × Technology Solution'
];

const budgetOptions = [
  'Less than $300',
  '$300 – $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500+'
];

export default function ContactFormModal({
  isOpen,
  onClose,
  defaultService = 'Custom Website Development',
  whatsappNumber = '15550192834'
}: ContactFormModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_name: defaultService,
    budget: '$1,000 – $2,500',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid work email.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide a contact phone or WhatsApp number.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Please provide a brief description of your project (at least 10 characters).');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitContact(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const customWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hello Vortex, I just submitted an inquiry for "${formData.service_name}". My name is ${formData.name}. Looking forward to connecting!`
  )}`;

  return (
    <AnimatePresence>
      <div
        id="contact-modal-backdrop"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          id="contact-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#11141c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl my-8 text-zinc-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#11141c]/90 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">
                Project Consultation
              </span>
            </div>
            <button
              id="btn-close-contact-modal"
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {!isSubmitted ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                    Let’s Build Something Remarkable.
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2">
                    Tell us about your business goals, scope, and timeline. Our principal team will evaluate and respond within 24 hours.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs sm:text-sm">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="company_website_url_check"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="contact-input-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Company / Brand
                      </label>
                      <input
                        id="contact-input-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Optional"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Service Requested *
                    </label>
                    <select
                      id="contact-select-service"
                      value={formData.service_name}
                      onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#11141c] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Options */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            formData.budget === b
                              ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Project Details & Goals *
                    </label>
                    <textarea
                      id="contact-textarea-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your vision, deliverables, required launch date, or reference websites..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="btn-submit-contact-form"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation View */
              <div id="contact-success-state" className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                    PROJECT REQUEST RECEIVED
                  </h3>
                  <p className="mt-3 text-zinc-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Thanks for reaching out to <span className="text-cyan-400 font-bold">VORTEX</span>. Our team will review your project and get back to you soon.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <a
                    id="btn-success-whatsapp-continue"
                    href={customWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service_name: defaultService,
                        budget: '$1,000 – $2,500',
                        message: ''
                      });
                      onClose();
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
