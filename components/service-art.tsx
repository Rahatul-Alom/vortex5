import type { ServiceKey } from "./services";

const l = "stroke-white/25";

/** Small decorative drawing per service, used in the bento cards. */
export function ServiceArt({ name }: { name: ServiceKey }) {
  return (
    <svg viewBox="0 0 220 140" fill="none" aria-hidden className="size-full">
      {name === "web" && (
        <>
          <rect x="8" y="10" width="204" height="120" rx="10" className={l} />
          <path d="M8 34h204" className={l} />
          <circle cx="22" cy="22" r="3" fill="#19d3ff" />
          <circle cx="34" cy="22" r="3" className="fill-white/30" />
          <rect x="22" y="48" width="100" height="14" rx="4" fill="#19d3ff" fillOpacity=".35" />
          <path d="M22 72h84M22 84h64" className="stroke-white/30" strokeLinecap="round" />
          <rect x="22" y="98" width="46" height="18" rx="9" fill="#7c5cf0" fillOpacity=".7" />
          <rect x="136" y="48" width="64" height="68" rx="8" fill="#19d3ff" fillOpacity=".12" className="stroke-cyan/40" />
        </>
      )}
      {name === "marketing" && (
        <>
          <path d="M14 120h192" className={l} />
          {[34, 52, 44, 74, 62, 96].map((h, i) => (
            <rect key={i} x={24 + i * 32} y={120 - h} width="18" height={h} rx="4" fill="#19d3ff" fillOpacity={0.2 + i * 0.13} />
          ))}
          <path d="M20 96 70 78 100 86 150 52 200 22" stroke="#a99cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="200" cy="22" r="5" fill="#a99cff" />
        </>
      )}
      {name === "creative" && (
        <>
          <circle cx="82" cy="68" r="44" fill="#19d3ff" fillOpacity=".2" className="stroke-cyan/50" />
          <circle cx="132" cy="68" r="44" fill="#7c5cf0" fillOpacity=".22" className="stroke-violet/60" />
          <rect x="96" y="40" width="44" height="56" rx="6" className="fill-white/10 stroke-white/40" />
          <path d="M104 56h28M104 68h20" className="stroke-white/50" strokeLinecap="round" />
        </>
      )}
      {name === "video" && (
        <>
          <rect x="10" y="10" width="200" height="86" rx="10" className={l} />
          <circle cx="110" cy="53" r="20" fill="#19d3ff" fillOpacity=".2" className="stroke-cyan/70" />
          <path d="m104 43 16 10-16 10V43Z" fill="#19d3ff" />
          <rect x="10" y="108" width="200" height="22" rx="6" className={l} />
          <rect x="16" y="113" width="70" height="12" rx="3" fill="#7c5cf0" fillOpacity=".55" />
          <rect x="90" y="113" width="52" height="12" rx="3" fill="#19d3ff" fillOpacity=".4" />
          <rect x="146" y="113" width="58" height="12" rx="3" fill="#a99cff" fillOpacity=".35" />
        </>
      )}
      {name === "ecommerce" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${14 + i * 68} ${i === 1 ? 14 : 28})`}>
              <rect width="60" height="84" rx="8" className={l} />
              <rect x="6" y="6" width="48" height="44" rx="5" fill="#19d3ff" fillOpacity={0.15 + i * 0.08} />
              <path d="M8 62h30M8 72h18" className="stroke-white/35" strokeLinecap="round" />
            </g>
          ))}
          <rect x="140" y="112" width="66" height="20" rx="10" fill="#7c5cf0" fillOpacity=".7" />
        </>
      )}
      {name === "saas" && (
        <>
          <rect x="8" y="10" width="204" height="120" rx="10" className={l} />
          <path d="M52 10v120" className={l} />
          {[28, 44, 60].map((y) => (
            <path key={y} d={`M18 ${y}h24`} stroke="#a99cff" strokeOpacity=".7" strokeLinecap="round" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={64 + i * 50} y="22" width="42" height="26" rx="5" className={l} />
          ))}
          {[22, 36, 28, 50, 40, 62].map((h, i) => (
            <rect key={i} x={66 + i * 24} y={116 - h} width="12" height={h} rx="3" fill="#19d3ff" fillOpacity={0.25 + i * 0.1} />
          ))}
        </>
      )}
    </svg>
  );
}
