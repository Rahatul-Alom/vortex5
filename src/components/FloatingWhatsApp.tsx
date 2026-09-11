import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export default function FloatingWhatsApp({ whatsappNumber = '15550192834' }: FloatingWhatsAppProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(
    "Hello Vortex, I'm interested in your services. I would like to discuss a project."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  return (
    <motion.aside
      id="floating-whatsapp-container"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      <a
        id="btn-floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="open"
        className="flex items-center gap-3 bg-[#11141c] hover:bg-[#181d28] border border-[#262c3a] hover:border-emerald-500/50 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>

        <span className="text-xs font-semibold tracking-wide text-zinc-200 group-hover:text-emerald-400 transition-colors">
          Chat on WhatsApp
        </span>

        <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
          <MessageSquare className="w-4 h-4" />
        </div>
      </a>
    </motion.aside>
  );
}
