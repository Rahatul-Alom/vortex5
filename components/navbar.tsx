"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { ButtonLink } from "./button";
import { Close, Menu } from "./icons";
import { Logo } from "./logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu when the route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border pr-2.5 pl-5 transition-all duration-300",
          scrolled || open
            ? "border-white/10 bg-void/80 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="Vortex5 home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm transition-colors hover:text-ink",
                  isActive(l.href) ? "text-ink" : "text-muted",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            GET STARTED
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 cursor-pointer place-items-center rounded-lg text-ink transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-7xl overflow-y-auto rounded-2xl border border-white/10 bg-void/95 p-4 backdrop-blur-xl lg:hidden"
        >
          <ul className="divide-y divide-line">
            {site.nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn("flex items-center justify-between py-4 font-display text-xl font-semibold", isActive(l.href) ? "text-cyan" : "text-ink")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" className="mt-5 w-full" arrow>
            GET STARTED
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
