// Placeholder names — replace with real client logos.
const brands = ["Northwind", "Lumina", "Helix Labs", "Orbitly", "Kinetic", "Vantage", "Nova & Co", "Pixelforge", "Atlas", "Zenith"];

export function Brands() {
  return (
    <section aria-label="Brands we have worked with" className="relative border-y border-line bg-surface/60 py-10">
      <p className="mx-auto mb-7 max-w-7xl px-5 text-center text-sm text-muted sm:px-8">Trusted by growing brands across Bangladesh and abroad</p>
      <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)" }}>
        <ul className="animate-marquee flex w-max items-center">
          {[...brands, ...brands].map((b, i) => (
            <li
              key={`${b}-${i}`}
              aria-hidden={i >= brands.length}
              className="px-10 font-display text-2xl font-semibold tracking-tight whitespace-nowrap text-ink/30 transition-colors hover:text-ink/80"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
