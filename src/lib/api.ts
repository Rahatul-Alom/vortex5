import {
  Service,
  Project,
  Testimonial,
  ContactInquiry,
  SiteSettings,
  DashboardStats,
  ContactFormData,
  InquiryStatus,
  AdminUser
} from '../types';

const API_BASE = '/api';

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/settings`);
  const data = await res.json();
  return data.settings;
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_BASE}/services`);
  const data = await res.json();
  return data.services || [];
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  const data = await res.json();
  return data.projects || [];
}

export async function fetchProject(slug: string): Promise<Project | null> {
  const res = await fetch(`${API_BASE}/projects/${slug}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.project || null;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE}/testimonials`);
  const data = await res.json();
  return data.testimonials || [];
}

export async function submitContact(formData: ContactFormData): Promise<{ success: boolean; message: string; error?: string }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit project request.');
  }
  return data;
}

/* ---------------- ADMIN API ---------------- */

export async function adminLogin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Invalid credentials.');
  }
  return data;
}

export async function fetchAdminStats(token: string): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.stats;
}

export async function fetchAdminInquiries(token: string): Promise<ContactInquiry[]> {
  const res = await fetch(`${API_BASE}/admin/inquiries`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.inquiries || [];
}

export async function updateAdminInquiry(id: number, status: InquiryStatus, notes: string, token: string): Promise<ContactInquiry> {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status, admin_notes: notes })
  });
  const data = await res.json();
  return data.inquiry;
}

export async function deleteAdminInquiry(id: number, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.success;
}

export async function fetchAdminProjects(token: string): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/admin/projects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.projects || [];
}

export async function createAdminProject(project: Partial<Project>, token: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/admin/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(project)
  });
  const data = await res.json();
  return data.project;
}

export async function updateAdminProject(id: number, project: Partial<Project>, token: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(project)
  });
  const data = await res.json();
  return data.project;
}

export async function deleteAdminProject(id: number, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.success;
}

export async function fetchAdminServices(token: string): Promise<Service[]> {
  const res = await fetch(`${API_BASE}/admin/services`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  return data.services || [];
}

export async function updateAdminService(id: number, service: Partial<Service>, token: string): Promise<Service> {
  const res = await fetch(`${API_BASE}/admin/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(service)
  });
  const data = await res.json();
  return data.service;
}

export async function updateAdminSettings(settings: Partial<SiteSettings>, token: string): Promise<SiteSettings> {
  const res = await fetch(`${API_BASE}/admin/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(settings)
  });
  const data = await res.json();
  return data.settings;
}
