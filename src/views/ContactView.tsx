import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { submitContact } from '../lib/api';
import { ContactFormData } from '../types';

interface ContactViewProps {
  whatsappNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
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

export default function ContactView({
  whatsappNumber = '15550192834',
  contactEmail = 'hello@vortex5.agency',
  contactPhone = '+1 (555) 019-2834'
}: ContactViewProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_name: '🎨 Graphic & UI/UX Design',
    budget: '$1,000 – $2,500',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello Vortex, I'm interested in discussing a new project."
  )}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitContact(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#0b0c10] text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-3">
            Start A Conversation
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            LET’S WORK TOGETHER.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400">
            Have a project in mind, an existing website you’d like to modernize, or need a cohesive brand identity? We’d love to hear from you.
          </p>
        </div>

        {/* 2-Column Layout: Contact Channels & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#11141c] border border-zinc-800 space-y-6">
              <h3 className="text-xl font-heading font-bold text-white">
                Direct Channels
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/50 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">Email Inquiries</span>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{contactEmail}</span>
                  </div>
                </a>

                <a
                  href={`tel:${contactPhone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/50 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block">Phone</span>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{contactPhone}</span>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 block">Instant WhatsApp</span>
                    <span className="text-sm font-semibold text-white">Chat With Leadership</span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 space-y-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Response SLA: Within 24 hours on business days</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Strict NDA & confidentiality guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#11141c] border border-zinc-800">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-heading font-extrabold text-white">
                    Send Project Brief
                  </h3>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="url_extra_validation"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@brand.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Studio"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Primary Service *
                    </label>
                    <select
                      value={formData.service_name}
                      onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#11141c]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Estimated Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                            formData.budget === b
                              ? 'bg-cyan-400 text-black font-bold'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Tell us about your project *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals, current challenges, timeline, or design preferences..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-white">
                    INQUIRY TRANSMITTED SUCCESSFULLY
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto">
                    Thank you, {formData.name}. Your project parameters have been stored and assigned to a principal consultant.
                  </p>
                  <a
                    href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                      `Hi Vortex, I just submitted an inquiry for ${formData.service_name}. Looking forward to discussing details!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
