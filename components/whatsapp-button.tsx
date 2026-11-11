import { whatsappLink } from "@/lib/site";
import { WhatsApp } from "./icons";

/** Floating contact shortcut — the quickest way for a visitor to reach the agency. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vortex5 on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-[#25d366] p-3.5 text-[#06260f] shadow-[0_12px_40px_-8px_rgb(37_211_102/0.6)] transition duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsApp className="size-7" />
      <span className="hidden max-w-0 overflow-hidden pr-0 text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-2 sm:inline">
        Chat with us
      </span>
    </a>
  );
}
