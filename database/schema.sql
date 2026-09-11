-- ==========================================================
-- VORTEX DIGITAL AGENCY - PRODUCTION MYSQL DATABASE SCHEMA
-- Compatible with MySQL 8.0+ / MariaDB 10.5+
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `vortex_agency` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `vortex_agency`;

-- ----------------------------------------------------------
-- Table: users (Admin authentication)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` ENUM('admin', 'editor', 'viewer') NOT NULL DEFAULT 'admin',
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: service_categories
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `category_number` VARCHAR(10) NOT NULL DEFAULT '01',
  `tagline` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: services
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `short_description` VARCHAR(300) NOT NULL,
  `full_description` TEXT NULL,
  `icon_name` VARCHAR(50) NOT NULL DEFAULT 'Code',
  `deliverables` JSON NULL,
  `technologies` JSON NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `service_categories`(`id`) ON DELETE CASCADE,
  INDEX `idx_services_slug` (`slug`),
  INDEX `idx_services_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: projects (Portfolio showcase)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `client` VARCHAR(150) NOT NULL,
  `industry` VARCHAR(100) NOT NULL,
  `year` VARCHAR(10) NOT NULL DEFAULT '2026',
  `short_description` VARCHAR(300) NOT NULL,
  `challenge` TEXT NULL,
  `solution` TEXT NULL,
  `result` TEXT NULL,
  `development_process` TEXT NULL,
  `design_process` TEXT NULL,
  `technologies` JSON NOT NULL,
  `featured_image` VARCHAR(500) NOT NULL,
  `gallery_images` JSON NULL,
  `live_url` VARCHAR(500) NULL,
  `github_url` VARCHAR(500) NULL,
  `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_projects_slug` (`slug`),
  INDEX `idx_projects_category` (`category`),
  INDEX `idx_projects_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: testimonials
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(100) NOT NULL,
  `company` VARCHAR(150) NOT NULL,
  `position` VARCHAR(100) NOT NULL,
  `testimonial` TEXT NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `profile_image` VARCHAR(500) NULL,
  `project_id` INT NULL,
  `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: contact_inquiries (Client project inquiries)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `company` VARCHAR(150) NULL,
  `service_name` VARCHAR(100) NOT NULL,
  `budget` VARCHAR(50) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('New', 'Contacted', 'In Progress', 'Completed', 'Cancelled') NOT NULL DEFAULT 'New',
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(50) NULL,
  `user_agent` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: site_settings
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `value_text` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- SEED DATA INITIALIZATION
-- ==========================================================

-- Seed Categories
INSERT INTO `service_categories` (`id`, `code`, `name`, `category_number`, `tagline`, `description`) VALUES
(1, 'web-development', 'Web Development', '01', 'High-performance digital products built for scale', 'We design and develop fast, scalable and conversion-focused digital experiences using cutting-edge modern tech stacks.'),
(2, 'graphic-design', 'Graphic Design', '02', 'Strategic visual identity and brand design', 'We create memorable visual identities and marketing collateral that captivate audiences and elevate brand authority.')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Seed Services
INSERT INTO `services` (`id`, `category_id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `deliverables`, `technologies`, `is_active`, `sort_order`) VALUES
(1, 1, 'Custom Website Development', 'custom-website-development', 'Tailored web experiences built specifically for your business logic, conversion goals, and performance metrics.', 'From bespoke company portals to complex web architectures, we build from the ground up without bloatware.', 'Globe', '["Custom UI/UX Implementation", "Responsive Mobile-First Architecture", "CMS Integration", "SEO & Performance Optimization"]', '["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"]', TRUE, 1),
(2, 1, 'eCommerce Development', 'ecommerce-development', 'Scalable online stores with high-converting checkouts, payment gateways, and inventory synchronization.', 'Modern eCommerce platforms built on robust architectures designed for high volume, fast checkout, and customer retention.', 'ShoppingBag', '["Full Checkout Flow & Cart", "Stripe & PayPal Integration", "Inventory & Order Management", "Mobile Commerce Optimization"]', '["Next.js", "Shopify Headless", "MySQL", "Stripe", "Node.js"]', TRUE, 2),
(3, 1, 'React.js Single Page Application', 'react-spa-development', 'Blazing fast, dynamic, interactive web applications with fluid state transitions and real-time responsiveness.', 'Rich web applications that feel as responsive as desktop software, powered by modern React state systems.', 'Zap', '["Component-Driven Architecture", "Global State Management", "Micro-Interactions & Transitions", "PWA Offline Readiness"]', '["React 19", "Vite", "TypeScript", "Tailwind CSS", "REST/GraphQL"]', TRUE, 3),
(4, 1, 'Professional Business Portfolio', 'business-portfolio', 'Showcase your company, personal brand, or creative work with an unforgettable editorial-grade web presentation.', 'Position your agency, executive profile, or design practice at the pinnacle of your industry.', 'Briefcase', '["Editorial Layout Design", "Interactive Project Filtering", "Lead Capture System", "High-Converting Case Studies"]', '["React", "Next.js", "Framer Motion", "Tailwind CSS"]', TRUE, 4),
(5, 1, 'Hotel Management Solutions', 'hotel-management-solutions', 'Custom reservation, guest experience, room booking, and administrative software for luxury resorts & hotels.', 'End-to-end hospitality platforms connecting booking engines, room status tracking, and guest billing.', 'Building2', '["Real-Time Room Availability Calendar", "Direct Booking & Payment Engine", "Admin Operations Dashboard", "Automated SMS/WhatsApp Guest Alerts"]', '["Next.js", "Node.js", "MySQL", "Socket.io", "Tailwind CSS"]', TRUE, 5),
(6, 2, 'Professional Logo & Branding', 'logo-and-branding', 'Complete brand identity systems: logos, typography guidelines, color psychology, and comprehensive brand books.', 'We forge distinctive visual signatures that establish authority and resonate deeply with target audiences.', 'Sparkles', '["Primary & Secondary Logo Marks", "Typography & Color Palette System", "Brand Style Guide Book", "Vector & Print Production Files"]', '["Adobe Illustrator", "Figma", "Photoshop", "Vector Standards"]', TRUE, 6),
(7, 2, 'Social Media Post & Banner Design', 'social-media-design', 'High-engagement social assets, motion graphics, advertising banners, and promotional templates.', 'Stop the scroll with meticulously crafted visual assets engineered for social platforms.', 'Share2', '["Instagram Carousel Kits", "Facebook & LinkedIn Ad Sets", "YouTube Thumbnail & Banner Kits", "Editable Figma/Canva Templates"]', '["Figma", "Photoshop", "After Effects", "Midjourney"]', TRUE, 7),
(8, 2, 'Business Card & Stationery Design', 'business-card-stationery', 'Executive business cards, corporate letterheads, branded envelopes, and tactile presentation folders.', 'Leave a lasting physical impression with luxury stationery and precision print layouts.', 'CreditCard', '["Luxury Business Card Concepts", "Corporate Letterhead & Invoices", "Branded Envelopes & Folders", "Print-Ready Spot UV / Foil Specs"]', '["Adobe InDesign", "Illustrator", "Print Standards (CMYK, 300DPI)"]', TRUE, 8),
(9, 2, 'Flyer, Brochure & Print Material', 'flyer-brochure-print', 'Corporate brochures, multi-page company profiles, trade show flyers, billboards, and packaging.', 'Compelling print narratives that communicate complex value propositions with clarity and elegance.', 'FileText', '["Bi-Fold & Tri-Fold Brochures", "Corporate Catalogues & Booklets", "Event Flyers & Posters", "Press-Ready PDF Packages"]', '["InDesign", "Illustrator", "CMYK Pantone Matching"]', TRUE, 9)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- Seed Projects
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `industry`, `year`, `short_description`, `challenge`, `solution`, `result`, `development_process`, `design_process`, `technologies`, `featured_image`, `live_url`, `github_url`, `is_featured`, `is_published`, `sort_order`) VALUES
(1, 'Aura Luxe Hospitality Platform', 'aura-hospitality-platform', 'Web Development', 'Aura Hotels & Resorts', 'Hospitality & Luxury Travel', '2026', 'Full-stack custom hotel booking engine and guest management system with instant room synchronization.', 'The client relied on fragmented 3rd-party OTAs with high commission fees and slow, disconnected room reservation updates.', 'Engineered a bespoke Next.js reservation engine with real-time room availability, Stripe payment processing, and WhatsApp automated confirmation.', 'Direct website bookings jumped by 142% in 90 days, eliminating over $80,000 in OTA commission expenses.', 'Agile sprints with bi-weekly user testing, continuous deployment to Cloud Run, and load tested for 10,000 concurrent booking checks.', 'Designed an immersive dark-luxe aesthetic inspired by Scandinavian boutique hotels, utilizing high-contrast typography and subtle ambient photography.', '["Next.js", "React 19", "MySQL", "Node.js", "Tailwind CSS", "Stripe API"]', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', 'https://aura-resort.demo.vortex.agency', 'https://github.com/vortex-agency/aura-hospitality', TRUE, TRUE, 1),
(2, 'Nexus Cybernetics Brand Identity', 'nexus-cybernetics-branding', 'Branding', 'Nexus AI Systems', 'Artificial Intelligence', '2026', 'Complete visual identity, 3D brand language, and marketing assets for an enterprise robotics venture.', 'Nexus needed to pivot from research lab obscurity to an authoritative enterprise robotics brand preparing for Series B funding.', 'Crafted an abstract geometric logo mark representing machine neural pathways, accompanied by an electric cybernetic color system.', 'Successfully closed a $24M Series B round, with investor feedback praising the clarity and enterprise caliber of their identity.', 'Conducted competitor positioning analysis, developed 12 distinct logo vectors, refined typography hierarchy, and delivered a 64-page brand book.', 'Balanced futuristic computational precision with humanistic editorial typography.', '["Adobe Illustrator", "Figma", "Cinema 4D", "Brand Guidelines"]', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', 'https://nexus.demo.vortex.agency', NULL, TRUE, TRUE, 2),
(3, 'KRONOS Minimalist Horology Store', 'kronos-horology-ecommerce', 'eCommerce', 'Kronos Timepieces Ltd.', 'Luxury Goods & eCommerce', '2026', 'High-conversion headless eCommerce experience featuring interactive 360-degree watch view and instant checkout.', 'Legacy monolithic store suffered from 4.8s load times and a 78% cart abandonment rate on mobile devices.', 'Rebuilt the frontend using React and Vite with server-side rendered catalog pages, sub-second load times, and Apple Pay one-click checkout.', 'Mobile conversion rate increased from 1.2% to 4.1%, with average order value (AOV) climbing by 28%.', 'Implemented headless Shopify integration with cached GraphQL edge queries and zero-layout-shift image handling.', 'Applied minimalist Swiss typography, tactile micro-interactions, and high-resolution dark mode product showcases.', '["React", "Vite", "Tailwind CSS", "Shopify Headless", "MySQL", "Node.js"]', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', 'https://kronos.demo.vortex.agency', 'https://github.com/vortex-agency/kronos-store', TRUE, TRUE, 3),
(4, 'Veloce Hypercar Digital Showcase', 'veloce-hypercar-showcase', 'UI/UX', 'Veloce Automotive Group', 'Automotive & Design', '2025', 'Interactive web showcase with custom 3D car configurator and aerodynamic air-flow simulation.', 'Client wanted a visionary digital experience for their limited-edition 1,200hp electric hypercar launch.', 'Created a custom interactive canvas with camera tracking, carbon fiber material selection, and audio telemetry.', 'Over 450,000 unique visitors explored the configurator during launch week, filling all 99 production slots within 72 hours.', 'Leveraged Three.js shaders, WebGL canvas optimization, and progressive asset streaming.', 'Monochrome high-contrast cockpit interface designed to invoke precision racing instrumentation.', '["React", "Three.js", "WebGL", "TypeScript", "Tailwind CSS"]', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', 'https://veloce.demo.vortex.agency', NULL, FALSE, TRUE, 4),
(5, 'Oasis Organic Botanical Packaging', 'oasis-botanicals-packaging', 'Graphic Design', 'Oasis Herbal Care', 'Health & Wellness', '2025', 'Sustainable packaging system, foil-stamped business stationery, and retail flyer suite.', 'Oasis was expanding into upscale department stores and required retail packaging that communicated organic purity.', 'Designed bespoke amber glass labeling, embossed matte cardboard boxes, and tactile botanical line-art brochures.', 'Secured distribution in 85 premium retail outlets across Europe and North America.', 'Selected FSC-certified recycled stocks, soy inks, and formulated dielines optimized for zero paper waste.', 'Hand-drawn botanical vector engravings paired with understated serif typography.', '["Adobe InDesign", "Illustrator", "Packaging Standards", "Print Production"]', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80', 'https://oasis.demo.vortex.agency', NULL, FALSE, TRUE, 5),
(6, 'Synth Capital Fintech Dashboard', 'synth-capital-fintech', 'Web Development', 'Synth Financial Corp', 'Fintech & Investment', '2026', 'Institutional-grade asset analytics dashboard with live market feeds, algorithmic alerts, and portfolio tracking.', 'Financial analysts required low-latency streaming charts and high data density without UI stutter.', 'Engineered a virtualized data grid with WebSocket real-time quotes, customizable workspace widgets, and dark-theme telemetry.', 'Reduced analyst execution latency by 40% and handles 20,000 updates/sec with smooth 60fps rendering.', 'Optimized DOM virtualization, memory management, and decoupled calculation workers.', 'Engineered a dense, dark-mode financial terminal with neon telemetry accents for critical threshold alerts.', '["React", "TypeScript", "Tailwind CSS", "D3.js", "Node.js", "MySQL"]', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80', 'https://synth.demo.vortex.agency', 'https://github.com/vortex-agency/synth-capital', TRUE, TRUE, 6)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- Seed Testimonials
INSERT INTO `testimonials` (`id`, `client_name`, `company`, `position`, `testimonial`, `rating`, `profile_image`, `project_id`) VALUES
(1, 'Marcus Vance', 'Aura Hotels & Resorts', 'Chief Commercial Officer', 'Working with Vortex completely reshaped our digital business. Their team delivered a hotel platform that not only looks world-class but quadrupled our direct revenue within months. They are true technical artists.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', 1),
(2, 'Elena Rostova', 'Nexus AI Systems', 'VP of Marketing', 'Vortex took our complex machine learning capabilities and translated them into an electrifying visual brand identity. The investor response to our Series B deck and web launch was phenomenal.', 5, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', 2),
(3, 'David Chen', 'Kronos Horology', 'Founder & Creative Director', 'The speed and obsessive attention to detail that Vortex brought to Kronos exceeded every agency we’ve worked with in London and New York. Our mobile sales jumped immediately upon launch.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 3),
(4, 'Sarah Jenkins', 'Oasis Botanicals', 'Brand Director', 'Their graphic design and packaging work helped our organic line get picked up by luxury department stores across Europe. They understand print production, typography, and consumer psychology at an elite level.', 5, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 5)
ON DUPLICATE KEY UPDATE `client_name` = VALUES(`client_name`);

-- Seed Site Settings
INSERT INTO `site_settings` (`key_name`, `value_text`) VALUES
('agency_name', 'VORTEX'),
('tagline', 'We Build. We Design. We Transform.'),
('hero_headline', 'WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESSES FORWARD.'),
('hero_subtext', 'Vortex is a creative digital agency specializing in modern web development, eCommerce solutions and high-impact graphic design.'),
('contact_email', 'hello@vortex.agency'),
('contact_phone', '+1 (555) 019-2834'),
('whatsapp_number', '15550192834'),
('office_address', 'Suite 800, Tech & Design Plaza, Silicon District'),
('facebook_url', 'https://facebook.com/vortexagency'),
('instagram_url', 'https://instagram.com/vortexagency'),
('linkedin_url', 'https://linkedin.com/company/vortex-agency'),
('github_url', 'https://github.com/vortex-agency'),
('footer_copyright', '© 2026 Vortex Digital Agency. All rights reserved.')
ON DUPLICATE KEY UPDATE `value_text` = VALUES(`value_text`);
