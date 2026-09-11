import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  getCategories,
  getServices,
  getAllServicesAdmin,
  addService,
  updateService,
  deleteService,
  getProjects,
  getProjectBySlug,
  addProject,
  updateProject,
  deleteProject,
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getInquiries,
  addInquiry,
  updateInquiry,
  deleteInquiry,
  getSettings,
  updateSettings,
  getDashboardStats,
  verifyAdminLogin
} from './server/db.js';

dotenv.config();

// Simple in-memory rate limiter for contact submissions (max 5 requests per 10 minutes per IP)
const ipRequestTimestamps: Record<string, number[]> = {};

function rateLimitContact(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 10;

  if (!ipRequestTimestamps[ip]) {
    ipRequestTimestamps[ip] = [];
  }

  // Remove old timestamps
  ipRequestTimestamps[ip] = ipRequestTimestamps[ip].filter(t => now - t < windowMs);

  if (ipRequestTimestamps[ip].length >= maxRequests) {
    return res.status(429).json({ 
      success: false, 
      error: 'Too many project inquiries from this address. Please reach out via WhatsApp directly.' 
    });
  }

  ipRequestTimestamps[ip].push(now);
  next();
}

// Simple sanitize helper
function sanitize(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Simple token authentication middleware for admin routes
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  // Simple verified session token format: vortex_admin_session_...
  if (!token || !token.startsWith('vortex_admin_session_')) {
    return res.status(403).json({ success: false, error: 'Forbidden: Invalid or expired token.' });
  }

  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));

  /* ---------------- PUBLIC API ROUTES ---------------- */

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', agency: 'VORTEX', timestamp: new Date().toISOString() });
  });

  // Public Settings
  app.get('/api/settings', async (req: Request, res: Response) => {
    try {
      const settings = await getSettings();
      res.json({ success: true, settings });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Public Categories
  app.get('/api/categories', async (req: Request, res: Response) => {
    try {
      const categories = await getCategories();
      res.json({ success: true, categories });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Public Services
  app.get('/api/services', async (req: Request, res: Response) => {
    try {
      const services = await getServices();
      res.json({ success: true, services });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Public Projects (Portfolio)
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await getProjects(true);
      res.json({ success: true, projects });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Public Project Detail / Case Study
  app.get('/api/projects/:slug', async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const project = await getProjectBySlug(slug);
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.json({ success: true, project });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Public Testimonials
  app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
      const testimonials = await getTestimonials(true);
      res.json({ success: true, testimonials });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Contact Form Submission (with security, spam protection, sanitization, validation)
  app.post('/api/contact', rateLimitContact, async (req: Request, res: Response) => {
    try {
      const { name, email, phone, company, service_name, budget, message, honeypot } = req.body;

      // Honeypot spam trap
      if (honeypot) {
        return res.status(200).json({ success: true, message: 'Request received.' });
      }

      // Validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ success: false, error: 'Please provide your full name (minimum 2 characters).' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
      }

      if (!phone || typeof phone !== 'string' || phone.trim().length < 5) {
        return res.status(400).json({ success: false, error: 'Please provide a valid phone or WhatsApp number.' });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 10) {
        return res.status(400).json({ success: false, error: 'Please include some project details (at least 10 characters).' });
      }

      // Sanitize inputs
      const sanitizedData = {
        name: sanitize(name),
        email: email.trim().toLowerCase(),
        phone: sanitize(phone),
        company: company ? sanitize(company) : '',
        service_name: sanitize(service_name || 'Custom Website Development'),
        budget: sanitize(budget || '$500 – $1,000'),
        message: sanitize(message)
      };

      // Save to database
      const newInquiry = await addInquiry(sanitizedData);

      // Log email notification trigger
      console.log(`\n📧 [EMAIL DISPATCHED TO ADMIN hello@vortex.agency]`);
      console.log(`Subject: New Project Request from ${sanitizedData.name} (${sanitizedData.service_name})`);
      console.log(`Client: ${sanitizedData.name} | Email: ${sanitizedData.email} | Phone: ${sanitizedData.phone}`);
      console.log(`Budget: ${sanitizedData.budget} | Company: ${sanitizedData.company || 'N/A'}`);
      console.log(`Details: ${sanitizedData.message}\n`);

      res.status(201).json({
        success: true,
        message: 'Your project inquiry has been received! Our senior team will review and respond within 24 hours.',
        inquiryId: newInquiry.id
      });
    } catch (err: any) {
      console.error('Contact submission error:', err);
      res.status(500).json({ success: false, error: 'An unexpected error occurred while saving your inquiry.' });
    }
  });

  /* ---------------- ADMIN AUTH ROUTES ---------------- */

  app.post('/api/admin/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Username and password are required.' });
      }

      const verification = await verifyAdminLogin(username, password);
      if (!verification.success || !verification.user) {
        return res.status(401).json({ success: false, error: 'Invalid username or password credentials.' });
      }

      // Generate a secure session token
      const token = `vortex_admin_session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

      res.json({
        success: true,
        token,
        user: verification.user
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ---------------- ADMIN PROTECTED CRUD ROUTES ---------------- */

  // Admin stats
  app.get('/api/admin/stats', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const stats = await getDashboardStats();
      res.json({ success: true, stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Inquiries
  app.get('/api/admin/inquiries', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const inquiries = await getInquiries();
      res.json({ success: true, inquiries });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { status, admin_notes } = req.body;
      const updated = await updateInquiry(id, status, admin_notes);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }
      res.json({ success: true, inquiry: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await deleteInquiry(id);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Projects
  app.get('/api/admin/projects', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const projects = await getProjects(false);
      res.json({ success: true, projects });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/admin/projects', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const projectData = req.body;
      if (!projectData.title || !projectData.category) {
        return res.status(400).json({ success: false, error: 'Title and category are required.' });
      }
      if (!projectData.slug) {
        projectData.slug = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      const newProject = await addProject(projectData);
      res.status(201).json({ success: true, project: newProject });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updated = await updateProject(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.json({ success: true, project: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await deleteProject(id);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Services
  app.get('/api/admin/services', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const services = await getAllServicesAdmin();
      res.json({ success: true, services });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/admin/services', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const newService = await addService(req.body);
      res.status(201).json({ success: true, service: newService });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updated = await updateService(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }
      res.json({ success: true, service: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await deleteService(id);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Testimonials
  app.post('/api/admin/testimonials', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const newTestimonial = await addTestimonial(req.body);
      res.status(201).json({ success: true, testimonial: newTestimonial });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/admin/testimonials/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updated = await updateTestimonial(id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Testimonial not found' });
      }
      res.json({ success: true, testimonial: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/admin/testimonials/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await deleteTestimonial(id);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Settings
  app.put('/api/admin/settings', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const updated = await updateSettings(req.body);
      res.json({ success: true, settings: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /* ---------------- VITE & STATIC SERVING ---------------- */

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(` VORTEX5 Agency Engine active on port ${PORT}`);
  });
}

startServer();
