import type { Project } from "@/data/portfolio";

/*
 * Purely decorative SVG art. Everything is aria-hidden and uses theme tokens,
 * so it follows light/dark mode. These are abstract schematics, not screenshots,
 * and are always paired with a "to be added" caption where real media is missing.
 */

const accent = "var(--accent)";

function WebArt() {
  return (
    <>
      <rect x="40" y="26" width="240" height="148" rx="6" fill="var(--surface)" stroke="currentColor" opacity="0.9" />
      <path d="M40 46h240" stroke="currentColor" opacity="0.6" />
      <circle cx="54" cy="36" r="3" fill={accent} />
      <circle cx="65" cy="36" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="76" cy="36" r="3" fill="currentColor" opacity="0.5" />
      <rect x="100" y="31" width="120" height="10" rx="5" fill="none" stroke="currentColor" opacity="0.4" />
      <path d="M40 46v128" stroke="none" />
      <rect x="52" y="58" width="44" height="6" rx="3" fill="currentColor" opacity="0.5" />
      <rect x="52" y="72" width="36" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="52" y="82" width="40" height="4" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="52" y="92" width="32" height="4" rx="2" fill="currentColor" opacity="0.3" />
      {[0, 1, 2].map(column => (
        <g key={column} transform={`translate(${110 + column * 56} 58)`}>
          <rect width="48" height="8" rx="2" fill="currentColor" opacity="0.45" />
          <rect y="14" width="48" height="28" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
          <rect y="48" width="48" height="20" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
          {column === 0 && <rect y="74" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity="0.5" />}
          <rect x="6" y="20" width="22" height="3" rx="1.5" fill={column === 1 ? accent : "currentColor"} opacity={column === 1 ? 1 : 0.35} />
          <rect x="6" y="28" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
        </g>
      ))}
    </>
  );
}

function ResearchArt() {
  const veins = [
    "M160 40C150 70 170 90 160 120S150 160 160 172",
    "M160 84C130 92 112 108 96 140",
    "M160 84C190 92 208 108 224 140",
    "M160 120C140 126 128 142 124 168",
    "M160 120C180 126 192 142 196 168",
    "M138 62C120 62 106 74 98 92",
    "M182 62C200 62 214 74 222 92",
  ];
  return (
    <>
      <rect x="92" y="28" width="136" height="144" rx="68" fill="none" stroke="currentColor" opacity="0.35" strokeDasharray="3 5" />
      {veins.map(d => (
        <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      ))}
      <path d="M160 40C150 70 170 90 160 120S150 160 160 172" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {[[160, 84], [160, 120], [98, 92], [222, 92], [124, 168], [196, 168]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={accent} />
      ))}
      <path d="M60 100h200" stroke={accent} opacity="0.55" strokeDasharray="2 4" />
      <path d="M60 30v12M60 30h12M260 30v12M260 30h-12M60 170v-12M60 170h12M260 170v-12M260 170h-12" fill="none" stroke="currentColor" opacity="0.6" />
    </>
  );
}

function DataArt() {
  const groups: [number, number, number, number][] = [
    [100, 110, 28, 0],
    [190, 80, 24, 1],
    [220, 140, 22, 2],
  ];
  const offsets = [[-10, -8], [8, -14], [14, 6], [-6, 14], [0, 0], [-18, 4], [20, -2], [4, 20]];
  return (
    <>
      <path d="M40 30v140h240" fill="none" stroke="currentColor" opacity="0.6" />
      {[70, 100, 130].map(y => <path key={y} d={`M40 ${y}h240`} stroke="currentColor" opacity="0.15" />)}
      {[100, 160, 220].map(x => <path key={x} d={`M${x} 30v140`} stroke="currentColor" opacity="0.15" />)}
      {groups.map(([cx, cy, r, group]) => (
        <g key={group}>
          <circle cx={cx} cy={cy} r={r} fill={group === 1 ? accent : "currentColor"} opacity="0.1" stroke={group === 1 ? accent : "currentColor"} strokeDasharray="3 3" />
          {offsets.map(([dx, dy], i) => (
            <circle key={i} cx={cx + dx * (r / 24)} cy={cy + dy * (r / 24)} r="3" fill={group === 1 ? accent : "currentColor"} opacity={group === 1 ? 1 : 0.55 - group * 0.1} />
          ))}
        </g>
      ))}
    </>
  );
}

function PlannedArt() {
  const nodes = [[50, 100, "SRC"], [140, 62, "ETL"], [140, 138, "QA"], [230, 100, "DB"]] as const;
  return (
    <>
      <path d="M78 96L116 70M78 104L116 130M168 70L206 94M168 130L206 106" fill="none" stroke="currentColor" opacity="0.6" strokeDasharray="4 4" />
      {nodes.map(([x, y, label], i) => (
        <g key={label}>
          <rect x={x - 28} y={y - 18} width="56" height="36" rx="5" fill="var(--surface)" stroke={i === 1 ? accent : "currentColor"} strokeDasharray="4 3" opacity="0.95" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7" fontFamily="var(--font-mono)">{label}</text>
        </g>
      ))}
    </>
  );
}

export function ProjectArt({ kind }: { kind: Project["kind"] }) {
  return (
    <svg className="project-art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" fill="none" strokeWidth="1">
      <defs>
        <pattern id={`dots-${kind}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.18" />
        </pattern>
        <radialGradient id={`glow-${kind}`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor={accent} stopOpacity="0.18" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#dots-${kind})`} />
      <rect width="320" height="200" fill={`url(#glow-${kind})`} />
      {kind === "web" && <WebArt />}
      {kind === "research" && <ResearchArt />}
      {kind === "data" && <DataArt />}
      {kind === "planned" && <PlannedArt />}
    </svg>
  );
}

/** Large faint motif behind the home selector cards. */
export function CardArt({ id }: { id: "web-developer" | "data-engineer" }) {
  return (
    <svg className="card-art" viewBox="0 0 240 240" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1">
      {id === "web-developer" ? (
        <>
          <path d="M92 60L28 120l64 60M148 60l64 60-64 60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M136 40L104 200" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          <rect x="20" y="20" width="200" height="200" rx="10" strokeDasharray="3 6" opacity="0.5" />
        </>
      ) : (
        <>
          <ellipse cx="120" cy="64" rx="64" ry="22" />
          <path d="M56 64v56c0 12 28 22 64 22s64-10 64-22V64M56 120v56c0 12 28 22 64 22s64-10 64-22v-56" />
          <path d="M56 92c0 12 28 22 64 22s64-10 64-22M56 148c0 12 28 22 64 22s64-10 64-22" opacity="0.6" />
          <circle cx="176" cy="176" r="5" fill="var(--accent)" stroke="none" />
        </>
      )}
    </svg>
  );
}

/** Illustrative certificate frame for entries that have no scanned image yet. */
export function CertificateArt() {
  return (
    <svg className="certificate-art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="28" y="20" width="264" height="140" rx="4" opacity="0.7" />
      <rect x="36" y="28" width="248" height="124" rx="2" strokeDasharray="3 4" opacity="0.45" />
      <rect x="110" y="46" width="100" height="6" rx="3" fill="currentColor" opacity="0.45" stroke="none" />
      <rect x="80" y="62" width="160" height="4" rx="2" fill="currentColor" opacity="0.25" stroke="none" />
      <rect x="92" y="72" width="136" height="4" rx="2" fill="currentColor" opacity="0.25" stroke="none" />
      <path d="M60 128h72M188 128h72" opacity="0.5" />
      <circle cx="160" cy="118" r="20" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
      <path d="M160 106l3.5 7 7.5 1-5.500 5.200 1.400 7.600-6.900-3.800-6.900 3.800 1.400-7.600-5.500-5.200 7.500-1z" fill="var(--accent)" stroke="none" />
    </svg>
  );
}
