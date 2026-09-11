/**
 * Next.js SEO & Metadata Configuration Guide
 * 
 * If you deploy or migrate this project to Next.js (App Router or Pages Router),
 * use these production-tested configurations:
 */

// 1. Next.js App Router (app/layout.tsx or app/page.tsx)
// export const metadata = ...
export const nextAppRouterMetadata = {
  metadataBase: new URL('https://vortex5.agency'),
  title: {
    default: 'VORTEX5 | Elite Creative & Digital Technology Agency',
    template: '%s | VORTEX5'
  },
  description: 'VORTEX5 helps ambitious brands achieve the peak of success through world-class design, full-stack web engineering, 3D spatial UI, and AI automation.',
  keywords: [
    'digital agency',
    'web development',
    'UI/UX design',
    'full-stack engineering',
    'AI automation',
    'Next.js',
    'React',
    'SaaS development',
    'VORTEX5'
  ],
  authors: [{ name: 'VORTEX5 Team', url: 'https://vortex5.agency' }],
  creator: 'VORTEX5',
  publisher: 'VORTEX5',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vortex5.agency',
    siteName: 'VORTEX5',
    title: 'VORTEX5 | Creative × Technology ',
    description: 'We help businesses scale with world-class design, high-performance web engineering, and cutting-edge AI automation.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'VORTEX5 Creative and Technology Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VORTEX5 | Creative × Technology ',
    description: 'We help businesses scale with world-class design, high-performance web engineering, and cutting-edge AI automation.',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=630&q=80'],
    creator: '@vortex5',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vortex5.agency',
  },
};

// 2. Schema.org JSON-LD Structured Data for Next.js
export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'VORTEX5',
  legalName: 'VORTEX5 Creative & Technology Agency',
  url: 'https://vortex5.agency',
  logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=400&q=80',
  description: 'VORTEX5 is a global digital agency specializing in UI/UX design, full-stack web engineering, custom SaaS software, and AI workflows.',
  telephone: '+8801700000000',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://twitter.com/vortex5',
    'https://github.com/vortex5',
    'https://linkedin.com/company/vortex5',
  ],
};
