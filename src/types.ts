/**
 * VORTEX DIGITAL AGENCY - TYPESCRIPT DEFINITIONS
 */

export interface ServiceCategory {
  id: number;
  code: string;
  name: string;
  category_number: string;
  tagline: string;
  description: string;
}

export interface Service {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  icon_name: string;
  deliverables: string[];
  technologies: string[];
  is_active: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: 'Web Development' | 'eCommerce' | 'UI/UX' | 'Branding' | 'Graphic Design' | string;
  client: string;
  industry: string;
  year: string;
  short_description: string;
  challenge?: string;
  solution?: string;
  result?: string;
  development_process?: string;
  design_process?: string;
  technologies: string[];
  featured_image: string;
  gallery_images?: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  company: string;
  position: string;
  testimonial: string;
  rating: number;
  profile_image?: string;
  project_id?: number;
  is_published?: boolean;
}

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_name: string;
  budget: string;
  message: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_name: string;
  budget: string;
  message: string;
}

export interface SiteSettings {
  agency_name: string;
  tagline: string;
  hero_headline: string;
  hero_subtext: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  office_address: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  footer_copyright: string;
  [key: string]: string;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  totalProjects: number;
  publishedProjects: number;
  totalServices: number;
  totalTestimonials: number;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: 'admin' | 'editor';
}
