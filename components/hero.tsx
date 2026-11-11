import { whatsappLink } from "@/lib/site";
import { ButtonLink } from "./button";
import { Orbit } from "./orbit";
import { Star, WhatsApp } from "./icons";

const rise = (d: number) => ({ animationDelay: `${d}s` });

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(75%_70%_at_70%_30%,#000,transparent)]" />
        <div className="absolute -top-56 -right-40 h-[680px] w-[820px] rounded-full bg-azure/55 blur-[160px]" />
        <div className="absolute -bottom-56 -left-40 h-[560px] w-[720px] rounded-full bg-teal/45 blur-[160px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-void to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pt-32 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-12 lg:pt-28">
        <div>
          <p
            className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pr-4 pl-2 text-[13px] text-ink/85"
            style={rise(0.05)}
          >
            <span className="grid size-6 place-items-center rounded-full bg-cyan/15">
              <span className="size-2 animate-pulse-glow rounded-full bg-cyan" />
            </span>
            Taking on new projects this month
          </p>

          <h1
            className="animate-rise mt-7 font-display text-[clamp(2.7rem,6vw,5.3rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-balance"
            style={rise(0.15)}
          >
            Websites, brands and marketing that win you customers.
          </h1>

          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty" style={rise(0.3)}>
            Vortex5 is a digital agency in Dhaka. One team designs your brand, builds your website or software, and runs the campaigns that fill your inbox with enquiries.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={rise(0.45)}>
            <ButtonLink href="/contact" size="lg" arrow>
              GET STARTED
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost" size="lg">
              See our work
            </ButtonLink>
          </div>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={rise(0.6)}>
            <div className="flex items-center gap-3">
              <div className="flex text-[#ffc547]" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4" />
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">98%</span> client satisfaction
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-[#4ade80]"
            >
              <WhatsApp className="size-5 text-[#25d366]" />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>

        <div className="animate-rise relative" style={rise(0.35)}>
          <Orbit />
        </div>
      </div>
    </section>
  );
}
