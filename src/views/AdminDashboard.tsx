import { useState, useEffect, FormEvent } from 'react';
import {
  ShieldCheck,
  LogOut,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  Briefcase,
  Layers,
  Settings,
  Star,
  ExternalLink,
  Save,
  ArrowLeft,
  Loader2,
  RefreshCw
} from 'lucide-react';
import {
  adminLogin,
  fetchAdminStats,
  fetchAdminInquiries,
  updateAdminInquiry,
  deleteAdminInquiry,
  fetchAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  fetchAdminServices,
  updateAdminService,
  updateAdminSettings
} from '../lib/api';
import {
  AdminUser,
  DashboardStats,
  ContactInquiry,
  Project,
  Service,
  SiteSettings,
  InquiryStatus
} from '../types';

interface AdminDashboardProps {
  onReturnToSite: () => void;
}

export default function AdminDashboard({ onReturnToSite }: AdminDashboardProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('vortex_admin_token'));
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('vortex_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('VortexAdmin2026!');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects' | 'services' | 'settings'>('inquiries');

  // Dashboard Data State
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Inquiry Filter & Search
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  // Project Modal / Editing
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Load dashboard data
  const loadData = async (authToken: string) => {
    try {
      setLoading(true);
      const [statsData, inquiriesData, projectsData, servicesData] = await Promise.all([
        fetchAdminStats(authToken),
        fetchAdminInquiries(authToken),
        fetchAdminProjects(authToken),
        fetchAdminServices(authToken)
      ]);
      setStats(statsData);
      setInquiries(inquiriesData);
      setProjects(projectsData);
      setServices(servicesData);
    } catch (err: any) {
      if (err.message?.includes('Unauthorized') || err.message?.includes('Forbidden')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData(token);
    }
  }, [token]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await adminLogin(username, password);
      setToken(res.token);
      setCurrentUser(res.user);
      localStorage.setItem('vortex_admin_token', res.token);
      localStorage.setItem('vortex_admin_user', JSON.stringify(res.user));
      loadData(res.token);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('vortex_admin_token');
    localStorage.removeItem('vortex_admin_user');
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = async (id: number, status: InquiryStatus, notes: string) => {
    if (!token) return;
    try {
      const updated = await updateAdminInquiry(id, status, notes, token);
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? updated : inq)));
      setActionSuccess('Inquiry updated successfully');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!token || !confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteAdminInquiry(id, token);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      setActionSuccess('Inquiry removed');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Project actions
  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !editingProject) return;
    try {
      if (editingProject.id) {
        const updated = await updateAdminProject(editingProject.id, editingProject, token);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await createAdminProject(editingProject, token);
        setProjects((prev) => [created, ...prev]);
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      setActionSuccess('Project saved successfully');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!token || !confirm('Delete this portfolio project?')) return;
    try {
      await deleteAdminProject(id, token);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setActionSuccess('Project deleted');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      (inq.company && inq.company.toLowerCase().includes(inquirySearch.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  /* ---------------- LOGIN VIEW ---------------- */
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] p-6 text-zinc-200">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#11141c] border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading font-extrabold text-white">
              VORTEX CONTROL PANEL
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Agency Master Authentication
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              Default Credentials: <br />
              User: <span className="text-cyan-400">admin</span> | Pass: <span className="text-cyan-400">VortexAdmin2026!</span>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Authenticate & Enter</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onReturnToSite}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- AUTHENTICATED DASHBOARD ---------------- */
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-200">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#0e1017] border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>
          <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
              V
            </div>
            <span className="font-heading font-extrabold text-sm text-white">
              VORTEX CORE PORTAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Logged in as <strong className="text-cyan-400">{currentUser?.full_name || 'Admin'}</strong>
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 hover:bg-red-900/60 text-red-300 text-xs font-mono transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Toast Alert */}
        {actionSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Top Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#11141c] border border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 block">Total Inquiries</span>
              <div className="text-3xl font-heading font-extrabold text-white mt-1">
                {stats.total_inquiries}
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                {stats.new_inquiries} Pending Review
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#11141c] border border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 block">Active Projects</span>
              <div className="text-3xl font-heading font-extrabold text-white mt-1">
                {stats.total_projects}
              </div>
              <span className="text-[11px] font-mono text-zinc-400">Live Case Studies</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#11141c] border border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 block">Services Offered</span>
              <div className="text-3xl font-heading font-extrabold text-white mt-1">
                {stats.total_services}
              </div>
              <span className="text-[11px] font-mono text-zinc-400">2 Core Verticals</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#11141c] border border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 block">Endorsements</span>
              <div className="text-3xl font-heading font-extrabold text-white mt-1">
                {stats.total_testimonials}
              </div>
              <span className="text-[11px] font-mono text-amber-400">5.0 Star Average</span>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-cyan-400 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-cyan-400 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
              activeTab === 'services'
                ? 'bg-cyan-400 text-black'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Services ({services.length})
          </button>

          <button
            onClick={() => {
              if (token) loadData(token);
            }}
            className="ml-auto p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'new', 'contacted', 'in_progress', 'completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setInquiryStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-colors ${
                      inquiryStatusFilter === status
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Search */}
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search inquiries..."
                className="w-full sm:w-64 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length > 0 ? (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                  const clientWhatsApp = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${inq.name}, thank you for reaching out to Vortex regarding "${inq.service_name}". We would like to discuss next steps.`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="p-6 rounded-2xl bg-[#11141c] border border-zinc-800 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                        <div>
                          <span className="text-base font-heading font-bold text-white">
                            {inq.name}
                          </span>
                          {inq.company && (
                            <span className="text-xs font-mono text-zinc-400 ml-2">
                              • {inq.company}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-zinc-500">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              inq.status === 'new'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                : inq.status === 'contacted'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
                        <div>
                          <span className="text-zinc-500 block">Service:</span>
                          <span className="text-white font-semibold">{inq.service_name}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block">Budget Tier:</span>
                          <span className="text-white font-semibold">{inq.budget}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block">Contact:</span>
                          <span className="text-white">{inq.email} | {inq.phone}</span>
                        </div>
                      </div>

                      {/* Client message */}
                      <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
                        {inq.message}
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={clientWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/40 text-xs font-mono"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>

                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(
                              `Vortex Agency: Next Steps for ${inq.service_name}`
                            )}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Email</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Status Change Selector */}
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(
                                inq.id,
                                e.target.value as InquiryStatus,
                                inq.admin_notes || ''
                              )
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none focus:border-cyan-400"
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="in_progress">Status: In Progress</option>
                            <option value="completed">Status: Completed</option>
                            <option value="archived">Status: Archived</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg bg-red-950/30 border border-red-800/30 text-red-400 hover:bg-red-900/50"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center text-zinc-500 font-mono text-xs">
                No inquiries matching criteria.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-bold text-white">
                Portfolio Projects ({projects.length})
              </h3>
              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    slug: '',
                    category: 'Web Development',
                    client: '',
                    industry: '',
                    year: '2026',
                    short_description: '',
                    challenge: '',
                    solution: '',
                    result: '',
                    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                    technologies: ['React', 'Next.js', 'Tailwind CSS'],
                    is_featured: true,
                    live_url: 'https://vortex.agency'
                  });
                  setIsProjectModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-[#11141c] border border-zinc-800 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={proj.featured_image}
                      alt={proj.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      {proj.category}
                    </span>
                    <h4 className="text-base font-heading font-bold text-white mt-1">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {proj.short_description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">{proj.year}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded bg-red-950/30 text-red-400 hover:bg-red-900/50"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-bold text-white">
              Agency Services & Offerings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="p-6 rounded-2xl bg-[#11141c] border border-zinc-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">
                      {serv.category_id === 1 ? 'Web Development' : 'Graphic Design'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        serv.is_active ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {serv.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <h4 className="text-base font-heading font-bold text-white">
                    {serv.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {serv.short_description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                      Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {serv.deliverables?.map((d, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PROJECT ADD/EDIT MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#11141c] border border-zinc-800 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-heading font-bold text-white">
              {editingProject.id ? 'Edit Case Study' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Client *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Year *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={editingProject.featured_image || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, featured_image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">The Challenge</label>
                  <textarea
                    rows={2}
                    value={editingProject.challenge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">The Solution</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Tangible Result</label>
                <input
                  type="text"
                  value={editingProject.result || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, result: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-700 text-xs font-mono text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-400 text-black font-bold text-xs uppercase"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
