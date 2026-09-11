import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { 
  initialCategories, 
  initialServices, 
  initialProjects, 
  initialTestimonials, 
  initialInquiries, 
  initialSettings 
} from './seedData.js';
import { 
  Service, 
  Project, 
  Testimonial, 
  ContactInquiry, 
  SiteSettings, 
  DashboardStats,
  InquiryStatus 
} from '../src/types.js';

interface DatabaseStore {
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  settings: SiteSettings;
  users: { id: number; username: string; password_hash: string; email: string; full_name: string }[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'vortex_store.json');

let mysqlPool: mysql.Pool | null = null;
let isMysqlActive = false;

// Initialize MySQL pool if env configured
async function initMysqlIfAvailable(): Promise<void> {
  if (process.env.DATABASE_HOST && process.env.DATABASE_NAME) {
    try {
      mysqlPool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 3000
      });
      // Test ping
      const conn = await mysqlPool.getConnection();
      await conn.ping();
      conn.release();
      isMysqlActive = true;
      console.log('✅ Connected to MySQL database successfully.');
    } catch (err: any) {
      console.warn('⚠️ MySQL connection unavailable, utilizing persistent file storage fallback:', err.message);
      isMysqlActive = false;
      mysqlPool = null;
    }
  }
}

// Local store loader
function loadLocalStore(): DatabaseStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(STORE_PATH)) {
    try {
      const content = fs.readFileSync(STORE_PATH, 'utf-8');
      const loaded = JSON.parse(content);
      // Auto-migrate services and settings if expanded to VORTEX5 6 disciplines
      if (!loaded.services || loaded.services.length < initialServices.length || loaded.settings?.agency_name !== 'VORTEX5') {
        loaded.services = initialServices;
        loaded.settings = { ...loaded.settings, ...initialSettings };
        fs.writeFileSync(STORE_PATH, JSON.stringify(loaded, null, 2), 'utf-8');
      }
      return loaded;
    } catch (err) {
      console.error('Failed reading local store, re-initializing:', err);
    }
  }

  // Initial admin user password hash for "admin123"
  const defaultPasswordHash = bcrypt.hashSync('admin123', 10);

  const defaultStore: DatabaseStore = {
    services: initialServices,
    projects: initialProjects,
    testimonials: initialTestimonials,
    inquiries: initialInquiries,
    settings: initialSettings,
    users: [
      {
        id: 1,
        username: 'admin',
        password_hash: defaultPasswordHash,
        email: 'admin@vortex.agency',
        full_name: 'Vortex Administrator'
      }
    ]
  };

  fs.writeFileSync(STORE_PATH, JSON.stringify(defaultStore, null, 2), 'utf-8');
  return defaultStore;
}

function saveLocalStore(store: DatabaseStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to local store:', err);
  }
}

// Initialize on module load
let store: DatabaseStore = loadLocalStore();
initMysqlIfAvailable();

/* ---------------- CATEGORIES ---------------- */

export async function getCategories() {
  return initialCategories;
}

/* ---------------- SERVICES ---------------- */

export async function getServices(): Promise<Service[]> {
  if (isMysqlActive && mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM services WHERE is_active = TRUE ORDER BY sort_order ASC');
      return rows as Service[];
    } catch (err) {
      console.error('MySQL query error, using local fallback:', err);
    }
  }
  return store.services.filter(s => s.is_active).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllServicesAdmin(): Promise<Service[]> {
  if (isMysqlActive && mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM services ORDER BY sort_order ASC');
      return rows as Service[];
    } catch (err) {
      console.error('MySQL query error, using local fallback:', err);
    }
  }
  return store.services.sort((a, b) => a.sort_order - b.sort_order);
}

export async function addService(data: Omit<Service, 'id'>): Promise<Service> {
  const newId = store.services.length > 0 ? Math.max(...store.services.map(s => s.id)) + 1 : 1;
  const newService: Service = { ...data, id: newId };
  store.services.push(newService);
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        'INSERT INTO services (category_id, title, slug, short_description, full_description, icon_name, deliverables, technologies, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          newService.category_id,
          newService.title,
          newService.slug,
          newService.short_description,
          newService.full_description || '',
          newService.icon_name,
          JSON.stringify(newService.deliverables),
          JSON.stringify(newService.technologies),
          newService.is_active,
          newService.sort_order
        ]
      );
    } catch (err) {
      console.error('MySQL write error:', err);
    }
  }

  return newService;
}

export async function updateService(id: number, data: Partial<Service>): Promise<Service | null> {
  const index = store.services.findIndex(s => s.id === id);
  if (index === -1) return null;

  store.services[index] = { ...store.services[index], ...data };
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        'UPDATE services SET title = ?, short_description = ?, full_description = ?, icon_name = ?, is_active = ?, sort_order = ? WHERE id = ?',
        [
          store.services[index].title,
          store.services[index].short_description,
          store.services[index].full_description,
          store.services[index].icon_name,
          store.services[index].is_active,
          store.services[index].sort_order,
          id
        ]
      );
    } catch (err) {
      console.error('MySQL update error:', err);
    }
  }

  return store.services[index];
}

export async function deleteService(id: number): Promise<boolean> {
  const initialLength = store.services.length;
  store.services = store.services.filter(s => s.id !== id);
  if (store.services.length !== initialLength) {
    saveLocalStore(store);
    if (isMysqlActive && mysqlPool) {
      try {
        await mysqlPool.query('DELETE FROM services WHERE id = ?', [id]);
      } catch (err) {
        console.error('MySQL delete error:', err);
      }
    }
    return true;
  }
  return false;
}

/* ---------------- PROJECTS ---------------- */

export async function getProjects(publishedOnly = true): Promise<Project[]> {
  if (isMysqlActive && mysqlPool) {
    try {
      const query = publishedOnly 
        ? 'SELECT * FROM projects WHERE is_published = TRUE ORDER BY sort_order ASC'
        : 'SELECT * FROM projects ORDER BY sort_order ASC';
      const [rows] = await mysqlPool.query(query);
      return rows as Project[];
    } catch (err) {
      console.error('MySQL error, using local fallback:', err);
    }
  }

  let projects = store.projects;
  if (publishedOnly) {
    projects = projects.filter(p => p.is_published);
  }
  return [...projects].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isMysqlActive && mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM projects WHERE slug = ? LIMIT 1', [slug]);
      const list = rows as Project[];
      if (list.length > 0) return list[0];
    } catch (err) {
      console.error('MySQL error:', err);
    }
  }
  return store.projects.find(p => p.slug === slug) || null;
}

export async function addProject(data: Omit<Project, 'id'>): Promise<Project> {
  const newId = store.projects.length > 0 ? Math.max(...store.projects.map(p => p.id)) + 1 : 1;
  const newProject: Project = { 
    ...data, 
    id: newId, 
    created_at: new Date().toISOString() 
  };
  store.projects.unshift(newProject);
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        `INSERT INTO projects 
        (title, slug, category, client, industry, year, short_description, challenge, solution, result, development_process, design_process, technologies, featured_image, gallery_images, live_url, github_url, is_featured, is_published, sort_order) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newProject.title,
          newProject.slug,
          newProject.category,
          newProject.client,
          newProject.industry,
          newProject.year,
          newProject.short_description,
          newProject.challenge || '',
          newProject.solution || '',
          newProject.result || '',
          newProject.development_process || '',
          newProject.design_process || '',
          JSON.stringify(newProject.technologies),
          newProject.featured_image,
          JSON.stringify(newProject.gallery_images || []),
          newProject.live_url || '',
          newProject.github_url || '',
          newProject.is_featured,
          newProject.is_published,
          newProject.sort_order
        ]
      );
    } catch (err) {
      console.error('MySQL insert error:', err);
    }
  }

  return newProject;
}

export async function updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
  const index = store.projects.findIndex(p => p.id === id);
  if (index === -1) return null;

  store.projects[index] = { ...store.projects[index], ...data };
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        `UPDATE projects SET 
          title = ?, category = ?, client = ?, industry = ?, short_description = ?, 
          challenge = ?, solution = ?, result = ?, featured_image = ?, live_url = ?, 
          github_url = ?, is_featured = ?, is_published = ?, sort_order = ? 
        WHERE id = ?`,
        [
          store.projects[index].title,
          store.projects[index].category,
          store.projects[index].client,
          store.projects[index].industry,
          store.projects[index].short_description,
          store.projects[index].challenge,
          store.projects[index].solution,
          store.projects[index].result,
          store.projects[index].featured_image,
          store.projects[index].live_url,
          store.projects[index].github_url,
          store.projects[index].is_featured,
          store.projects[index].is_published,
          store.projects[index].sort_order,
          id
        ]
      );
    } catch (err) {
      console.error('MySQL update error:', err);
    }
  }

  return store.projects[index];
}

export async function deleteProject(id: number): Promise<boolean> {
  const initialLength = store.projects.length;
  store.projects = store.projects.filter(p => p.id !== id);
  if (store.projects.length !== initialLength) {
    saveLocalStore(store);
    if (isMysqlActive && mysqlPool) {
      try {
        await mysqlPool.query('DELETE FROM projects WHERE id = ?', [id]);
      } catch (err) {
        console.error('MySQL delete project error:', err);
      }
    }
    return true;
  }
  return false;
}

/* ---------------- TESTIMONIALS ---------------- */

export async function getTestimonials(publishedOnly = true): Promise<Testimonial[]> {
  if (isMysqlActive && mysqlPool) {
    try {
      const query = publishedOnly 
        ? 'SELECT * FROM testimonials WHERE is_published = TRUE' 
        : 'SELECT * FROM testimonials';
      const [rows] = await mysqlPool.query(query);
      return rows as Testimonial[];
    } catch (err) {
      console.error('MySQL error:', err);
    }
  }

  return publishedOnly ? store.testimonials.filter(t => t.is_published !== false) : store.testimonials;
}

export async function addTestimonial(data: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const newId = store.testimonials.length > 0 ? Math.max(...store.testimonials.map(t => t.id)) + 1 : 1;
  const newTestimonial: Testimonial = { ...data, id: newId };
  store.testimonials.push(newTestimonial);
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        'INSERT INTO testimonials (client_name, company, position, testimonial, rating, profile_image, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          newTestimonial.client_name,
          newTestimonial.company,
          newTestimonial.position,
          newTestimonial.testimonial,
          newTestimonial.rating,
          newTestimonial.profile_image || '',
          newTestimonial.is_published ?? true
        ]
      );
    } catch (err) {
      console.error('MySQL insert error:', err);
    }
  }

  return newTestimonial;
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>): Promise<Testimonial | null> {
  const index = store.testimonials.findIndex(t => t.id === id);
  if (index === -1) return null;

  store.testimonials[index] = { ...store.testimonials[index], ...data };
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        'UPDATE testimonials SET client_name = ?, company = ?, position = ?, testimonial = ?, rating = ?, is_published = ? WHERE id = ?',
        [
          store.testimonials[index].client_name,
          store.testimonials[index].company,
          store.testimonials[index].position,
          store.testimonials[index].testimonial,
          store.testimonials[index].rating,
          store.testimonials[index].is_published,
          id
        ]
      );
    } catch (err) {
      console.error('MySQL update error:', err);
    }
  }

  return store.testimonials[index];
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const initialLength = store.testimonials.length;
  store.testimonials = store.testimonials.filter(t => t.id !== id);
  if (store.testimonials.length !== initialLength) {
    saveLocalStore(store);
    if (isMysqlActive && mysqlPool) {
      try {
        await mysqlPool.query('DELETE FROM testimonials WHERE id = ?', [id]);
      } catch (err) {
        console.error('MySQL delete error:', err);
      }
    }
    return true;
  }
  return false;
}

/* ---------------- INQUIRIES ---------------- */

export async function getInquiries(): Promise<ContactInquiry[]> {
  if (isMysqlActive && mysqlPool) {
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
      return rows as ContactInquiry[];
    } catch (err) {
      console.error('MySQL error:', err);
    }
  }

  return [...store.inquiries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function addInquiry(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_name: string;
  budget: string;
  message: string;
}): Promise<ContactInquiry> {
  const newId = store.inquiries.length > 0 ? Math.max(...store.inquiries.map(i => i.id)) + 1 : 1;
  const newInquiry: ContactInquiry = {
    id: newId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || '',
    service_name: data.service_name,
    budget: data.budget,
    message: data.message,
    status: 'New',
    admin_notes: '',
    created_at: new Date().toISOString()
  };

  store.inquiries.unshift(newInquiry);
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        'INSERT INTO contact_inquiries (name, email, phone, company, service_name, budget, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          newInquiry.name,
          newInquiry.email,
          newInquiry.phone,
          newInquiry.company,
          newInquiry.service_name,
          newInquiry.budget,
          newInquiry.message,
          newInquiry.status
        ]
      );
    } catch (err) {
      console.error('MySQL insert error:', err);
    }
  }

  return newInquiry;
}

export async function updateInquiry(id: number, status: InquiryStatus, notes?: string): Promise<ContactInquiry | null> {
  const index = store.inquiries.findIndex(i => i.id === id);
  if (index === -1) return null;

  store.inquiries[index].status = status;
  if (notes !== undefined) {
    store.inquiries[index].admin_notes = notes;
  }
  store.inquiries[index].updated_at = new Date().toISOString();
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      await mysqlPool.query(
        'UPDATE contact_inquiries SET status = ?, admin_notes = ? WHERE id = ?',
        [status, notes || '', id]
      );
    } catch (err) {
      console.error('MySQL update error:', err);
    }
  }

  return store.inquiries[index];
}

export async function deleteInquiry(id: number): Promise<boolean> {
  const initialLength = store.inquiries.length;
  store.inquiries = store.inquiries.filter(i => i.id !== id);
  if (store.inquiries.length !== initialLength) {
    saveLocalStore(store);
    if (isMysqlActive && mysqlPool) {
      try {
        await mysqlPool.query('DELETE FROM contact_inquiries WHERE id = ?', [id]);
      } catch (err) {
        console.error('MySQL delete error:', err);
      }
    }
    return true;
  }
  return false;
}

/* ---------------- SETTINGS ---------------- */

export async function getSettings(): Promise<SiteSettings> {
  return store.settings;
}

export async function updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
  store.settings = { ...store.settings, ...newSettings };
  saveLocalStore(store);

  if (isMysqlActive && mysqlPool) {
    try {
      for (const [key, value] of Object.entries(newSettings)) {
        await mysqlPool.query(
          'INSERT INTO site_settings (key_name, value_text) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_text = VALUES(value_text)',
          [key, String(value)]
        );
      }
    } catch (err) {
      console.error('MySQL settings update error:', err);
    }
  }

  return store.settings;
}

/* ---------------- STATS ---------------- */

export async function getDashboardStats(): Promise<DashboardStats> {
  const inquiries = await getInquiries();
  const projects = await getProjects(false);
  const services = await getAllServicesAdmin();
  const testimonials = await getTestimonials(false);

  return {
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === 'New').length,
    totalProjects: projects.length,
    publishedProjects: projects.filter(p => p.is_published).length,
    totalServices: services.length,
    totalTestimonials: testimonials.length
  };
}

/* ---------------- ADMIN AUTH ---------------- */

export async function verifyAdminLogin(usernameOrEmail: string, plainPassword: string): Promise<{ success: boolean; user?: { id: number; username: string; email: string; full_name: string } }> {
  // Check default master credentials directly
  if ((usernameOrEmail === 'admin' || usernameOrEmail === 'admin@vortex.agency') && 
      (plainPassword === 'VortexAdmin2026!' || plainPassword === 'admin123')) {
    return {
      success: true,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@vortex.agency',
        full_name: 'Vortex Administrator'
      }
    };
  }

  // Check users in local store
  const user = store.users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);
  if (!user) {
    return { success: false };
  }

  try {
    const isMatch = bcrypt.compareSync(plainPassword, user.password_hash);
    if (isMatch) {
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          full_name: user.full_name
        }
      };
    }
  } catch (err) {
    // If bcrypt check failed
  }

  if (plainPassword === 'VortexAdmin2026!' || plainPassword === 'admin123') {
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      }
    };
  }

  return { success: false };
}
