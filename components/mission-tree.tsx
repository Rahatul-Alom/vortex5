"use client";

import { useInView } from "./use-in-view";

const paths = [
  "M200 470V320",
  "M200 320V120",
  "M200 320L140 260V190L90 140",
  "M140 260L100 220V180",
  "M200 320L260 260V180L320 120",
  "M260 260L310 210V190",
  "M200 210L160 170V100",
  "M200 230L245 185V110",
];

const nodes = [
  { x: 200, y: 120 },
  { x: 90, y: 140, label: "Craft" },
  { x: 100, y: 180 },
  { x: 320, y: 120, label: "Impact" },
  { x: 310, y: 190 },
  { x: 160, y: 100, label: "Trust" },
  { x: 245, y: 110, label: "Growth" },
];

/** Circuit-style tree that draws itself upward when scrolled into view. */
export function MissionTree() {
  const [ref, inView] = useInView<SVGSVGElement>(0.3);

  return (
    <svg ref={ref} viewBox="0 0 400 500" className="mx-auto w-full max-w-md overflow-visible" fill="none" role="img" aria-label="A tree growing upward, representing long-term growth">
      <defs>
        <linearGradient id="tree" gradientUnits="userSpaceOnUse" x1="0" y1="470" x2="0" y2="90">
          <stop offset="0%" stopColor="#7c5cf0" />
          <stop offset="100%" stopColor="#19d3ff" />
        </linearGradient>
      </defs>

      <path d="M40 470h320" stroke="#fff" strokeOpacity=".15" strokeDasharray="3 7" />
      <ellipse cx="200" cy="470" rx="70" ry="10" fill="#19d3ff" fillOpacity=".12" />

      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          stroke="url(#tree)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: `stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1) ${i * 0.22}s`,
          }}
        />
      ))}

      {nodes.map((n, i) => (
        <g
          key={`${n.x}-${n.y}`}
          style={{ opacity: inView ? 1 : 0, transition: `opacity .6s ease ${1.1 + i * 0.2}s` }}
        >
          <circle cx={n.x} cy={n.y} r="9" fill="#19d3ff" fillOpacity=".18" className="animate-pulse-glow" />
          <circle cx={n.x} cy={n.y} r="3.5" fill="#19d3ff" />
          {n.label && (
            <text x={n.x} y={n.y - 16} textAnchor="middle" fontSize="12" fill="#8b95b0" fontFamily="var(--font-inter)">
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
