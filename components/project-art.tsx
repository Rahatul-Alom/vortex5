import type { Art } from "@/lib/work";

const line = "stroke-white/30";

/** Abstract UI/campaign illustrations used until real project screenshots are added. */
export function ProjectArt({ art }: { art: Art }) {
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 size-full p-6 transition-transform duration-700 group-hover:scale-[1.04]" fill="none" aria-hidden>
      {art === "store" && (
        <>
          <rect x="20" y="14" width="280" height="172" rx="8" className={line} />
          <path d="M20 40h280" className={line} />
          <circle cx="34" cy="27" r="3" fill="#19d3ff" />
          <rect x="36" y="54" width="140" height="62" rx="6" fill="#19d3ff" fillOpacity=".22" />
          <path d="M190 62h90M190 78h70M190 94h50" className="stroke-white/40" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={36 + i * 88} y="130" width="76" height="44" rx="6" className={line} />
          ))}
        </>
      )}
      {art === "dashboard" && (
        <>
          <rect x="20" y="14" width="280" height="172" rx="8" className={line} />
          <path d="M72 14v172" className={line} />
          {[34, 54, 74, 94].map((y) => (
            <path key={y} d={`M32 ${y}h28`} stroke="#a99cff" strokeOpacity=".7" strokeLinecap="round" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={86 + i * 70} y="28" width="60" height="36" rx="5" className={line} />
          ))}
          {[30, 52, 40, 70, 58, 86, 74].map((h, i) => (
            <rect key={i} x={90 + i * 28} y={170 - h} width="14" height={h} rx="3" fill="#19d3ff" fillOpacity={0.25 + i * 0.1} />
          ))}
        </>
      )}
      {art === "campaign" && (
        <>
          <rect x="20" y="14" width="280" height="172" rx="8" className={line} />
          <path d="M44 150h232" className="stroke-white/15" />
          <path d="M44 120h232M44 90h232M44 60h232" className="stroke-white/10" strokeDasharray="3 6" />
          <path d="M44 146 90 130 130 134 175 104 220 82 276 44" stroke="#19d3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 146 90 130 130 134 175 104 220 82 276 44V150H44Z" fill="#19d3ff" fillOpacity=".12" />
          <circle cx="276" cy="44" r="6" fill="#19d3ff" />
          <circle cx="276" cy="44" r="13" fill="#19d3ff" fillOpacity=".2" />
          <rect x="36" y="26" width="64" height="18" rx="9" fill="#a99cff" fillOpacity=".3" />
        </>
      )}
      {art === "brand" && (
        <>
          <circle cx="110" cy="100" r="62" fill="#19d3ff" fillOpacity=".18" className="stroke-cyan/50" />
          <circle cx="170" cy="100" r="62" fill="#7c5cf0" fillOpacity=".2" className="stroke-violet/60" />
          <text x="140" y="112" textAnchor="middle" fontSize="38" fontWeight="600" fill="white" fillOpacity=".85">Aa</text>
          <path d="M40 176h240" className={line} />
        </>
      )}
      {art === "video" && (
        <>
          <rect x="20" y="14" width="280" height="130" rx="8" className={line} />
          <circle cx="160" cy="79" r="26" fill="#19d3ff" fillOpacity=".2" className="stroke-cyan/70" />
          <path d="m153 66 20 13-20 13V66Z" fill="#19d3ff" />
          <rect x="20" y="158" width="280" height="28" rx="6" className={line} />
          <rect x="28" y="164" width="96" height="16" rx="4" fill="#7c5cf0" fillOpacity=".5" />
          <rect x="128" y="164" width="70" height="16" rx="4" fill="#19d3ff" fillOpacity=".4" />
          <rect x="202" y="164" width="88" height="16" rx="4" fill="#a99cff" fillOpacity=".35" />
          <path d="M150 154v38" stroke="#fff" strokeOpacity=".8" />
        </>
      )}
      {art === "print" && (
        <>
          <g transform="translate(46 30) rotate(-8 50 70)">
            <rect width="100" height="140" rx="6" fill="#19d3ff" fillOpacity=".16" className="stroke-cyan/50" />
            <circle cx="50" cy="48" r="20" fill="#19d3ff" fillOpacity=".4" />
            <path d="M18 92h64M18 108h44" className="stroke-white/50" strokeLinecap="round" />
          </g>
          <g transform="translate(150 24) rotate(6 60 70)">
            <rect width="120" height="148" rx="6" fill="#7c5cf0" fillOpacity=".2" className="stroke-violet/60" />
            <path d="M18 26h60M18 42h84" className="stroke-white/50" strokeLinecap="round" />
            <rect x="18" y="62" width="84" height="56" rx="4" className={line} />
          </g>
        </>
      )}
    </svg>
  );
}
