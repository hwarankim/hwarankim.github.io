// Things left on the Work page's desk. Each is drawn as a real object under one light, from the top
// left: lit faces are pale, faces turned away are darker, and metal and plastic catch a highlight.
// All decoration. `id` keeps each drawing's shading definitions apart when one is used twice.

export function Pencil({ className, id = 'pencil' }) {
  return (
    <svg className={className} viewBox="0 0 340 22" width="340" height="22" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-rub`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9CFC0" />
          <stop offset="0.45" stopColor="#D8B6A4" />
          <stop offset="1" stopColor="#B88E7A" />
        </linearGradient>
        <linearGradient id={`${id}-tin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5F2EC" />
          <stop offset="0.3" stopColor="#B9B3AA" />
          <stop offset="0.55" stopColor="#E8E4DD" />
          <stop offset="1" stopColor="#857F77" />
        </linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2DEC4" />
          <stop offset="1" stopColor="#C9A27A" />
        </linearGradient>
      </defs>
      <rect x="0" y="3" width="28" height="16" rx="4" fill={`url(#${id}-rub)`} />
      <rect x="24" y="2" width="22" height="18" fill={`url(#${id}-tin)`} />
      <path d="M29 2v18M34 2v18M39 2v18" stroke="#6F6A63" strokeOpacity="0.5" />
      <path d="M30 2v18M35 2v18M40 2v18" stroke="#FFFFFF" strokeOpacity="0.6" />
      {/* three of the six painted faces show: the top one catches the light */}
      <rect x="46" y="2" width="242" height="6" fill="#C2D2E7" />
      <rect x="46" y="8" width="242" height="6" fill="var(--tint)" />
      <rect x="46" y="14" width="242" height="6" fill="#7D93B2" />
      <path d="M46 8H288" stroke="#FFFFFF" strokeOpacity="0.5" />
      <path d="M46 14H288" stroke="#5E7290" strokeOpacity="0.4" />
      <path d="M288 2L318 11L288 20Z" fill={`url(#${id}-wood)`} />
      <path d="M288 2q4 3 0 6q4 3 0 6q4 3 0 6" fill="#9FB4D0" />
      <path d="M294 6L312 10M294 15L310 12" stroke="#B48A62" strokeOpacity="0.35" />
      <path d="M311 8.9L340 11L311 13.1Z" fill="#3B4048" />
      <path d="M312 9.6L336 10.8" stroke="#9AA0A8" strokeOpacity="0.7" strokeWidth="0.8" />
    </svg>
  );
}

export function PaperClip({ className, id = 'clip' }) {
  return (
    <svg className={className} viewBox="0 0 24 68" width="24" height="68" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7E858D" />
          <stop offset="0.35" stopColor="#EEF1F4" />
          <stop offset="0.6" stopColor="#A3A9B0" />
          <stop offset="1" stopColor="#D9DDE1" />
        </linearGradient>
      </defs>
      <path
        d="M8 18V49a4 4 0 0 0 8 0V9a6 6 0 0 0-12 0V53a8 8 0 0 0 16 0V20"
        fill="none" stroke={`url(#${id}-wire)`} strokeWidth="2.4" strokeLinecap="round"
      />
      <path
        d="M7.4 18V49M3.4 9V53M15.4 9V49M19.4 20V53"
        fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="0.6" strokeLinecap="round"
      />
    </svg>
  );
}

export function BinderClip({ className, id = 'binder' }) {
  return (
    <svg className={className} viewBox="0 0 70 64" width="70" height="64" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C5866" />
          <stop offset="0.25" stopColor="#2E363F" />
          <stop offset="1" stopColor="#14181C" />
        </linearGradient>
        <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A9097" />
          <stop offset="0.5" stopColor="#F2F4F6" />
          <stop offset="1" stopColor="#959BA2" />
        </linearGradient>
      </defs>
      <path d="M22 28C15 14 17 5 26 2M48 28C55 14 53 5 44 2" fill="none" stroke={`url(#${id}-wire)`} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M7 26H63L58 62H12Z" fill={`url(#${id}-steel)`} />
      <path d="M9 29H61" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="1.4" />
      <path d="M14 34L18 58" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="5" />
    </svg>
  );
}

// A ring left by the bottom of a cup: coffee dries darkest at its edge, and the edge is never round.
export function CoffeeRing({ className, id = 'ring' }) {
  return (
    <svg className={className} viewBox="0 0 190 190" width="190" height="190" aria-hidden="true">
      <defs>
        <filter id={`${id}-wobble`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <g filter={`url(#${id}-wobble)`}>
        <circle cx="95" cy="95" r="70" fill="#8A5A38" fillOpacity="0.05" />
        <circle cx="95" cy="95" r="70" fill="none" stroke="#7A4B2C" strokeOpacity="0.32" strokeWidth="3.5" strokeDasharray="330 14 70 26" />
        <circle cx="95" cy="95" r="67" fill="none" stroke="#7A4B2C" strokeOpacity="0.12" strokeWidth="5" />
        <path d="M40 120a62 62 0 0 0 40 36" fill="none" stroke="#7A4B2C" strokeOpacity="0.22" strokeWidth="2" />
      </g>
    </svg>
  );
}

// A white mug of espresso from above: lit ceramic, a dim inner wall, crema at the rim and the
// window reflected on the coffee.
export function Mug({ className, id = 'mug' }) {
  return (
    <svg className={className} viewBox="0 0 220 180" width="220" height="180" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glaze`} cx="0.38" cy="0.34" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.62" stopColor="#F4F0EA" />
          <stop offset="1" stopColor="#D6CEC3" />
        </radialGradient>
        <linearGradient id={`${id}-wall`} x1="0.15" y1="0.15" x2="0.85" y2="0.85">
          <stop offset="0" stopColor="#BDB3A6" />
          <stop offset="1" stopColor="#FBF8F3" />
        </linearGradient>
        <radialGradient id={`${id}-coffee`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#5C3A27" />
          <stop offset="0.82" stopColor="#4A2D1D" />
          <stop offset="0.93" stopColor="#8C5D3E" />
          <stop offset="1" stopColor="#6B4329" />
        </radialGradient>
        <linearGradient id={`${id}-handle`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#CFC6BA" />
        </linearGradient>
        <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="3" /></filter>
        <clipPath id={`${id}-cup`}><circle cx="86" cy="90" r="62" /></clipPath>
      </defs>
      <path d="M150 64h22a26 26 0 0 1 0 52h-22v-14h22a12 12 0 0 0 0-24h-22Z" fill={`url(#${id}-handle)`} />
      <circle cx="86" cy="90" r="76" fill={`url(#${id}-glaze)`} />
      <circle cx="86" cy="90" r="67" fill={`url(#${id}-wall)`} />
      <circle cx="86" cy="90" r="62" fill={`url(#${id}-coffee)`} />
      <g clipPath={`url(#${id}-cup)`}>
        {/* the rim blocks the light from the coffee nearest it */}
        <circle cx="74" cy="78" r="66" fill="none" stroke="#1E120B" strokeOpacity="0.45" strokeWidth="14" filter={`url(#${id}-soft)`} />
        <ellipse cx="66" cy="64" rx="24" ry="9" fill="#FFFFFF" fillOpacity="0.32" transform="rotate(-34 66 64)" filter={`url(#${id}-soft)`} />
      </g>
      <circle cx="86" cy="90" r="75" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="120 400" transform="rotate(170 86 90)" />
    </svg>
  );
}

// A clear plastic ruler marked in centimetres; the light shows through it.
export function Ruler({ className, id = 'ruler' }) {
  const ticks = Array.from({ length: 41 }, (_, i) => i);
  return (
    <svg className={className} viewBox="0 0 440 46" width="440" height="46" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-acrylic`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4F8FC" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#DCE4EE" stopOpacity="0.55" />
          <stop offset="1" stopColor="#C3D0E0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="440" height="46" rx="3" fill={`url(#${id}-acrylic)`} />
      <path d="M3 1.2H437" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M3 45H437" stroke="#8EA2BD" strokeOpacity="0.8" />
      {ticks.map((i) => (
        <path key={i} d={`M${20 + i * 10} 1v${i % 10 === 0 ? 17 : i % 5 === 0 ? 12 : 7}`} stroke="var(--ink)" strokeOpacity="0.75" />
      ))}
      {[0, 1, 2, 3, 4].map((n) => (
        <text key={n} x={20 + n * 100} y="32" textAnchor="middle" fontSize="11" fill="var(--ink)" fillOpacity="0.85">{n * 10}</text>
      ))}
    </svg>
  );
}

// A periwinkle highlighter: a round barrel, so the light runs along it in a band.
export function Marker({ className, id = 'marker' }) {
  return (
    <svg className={className} viewBox="0 0 240 34" width="240" height="34" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-barrel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C92B1" />
          <stop offset="0.22" stopColor="#D3DEEC" />
          <stop offset="0.5" stopColor="#9FB4D0" />
          <stop offset="1" stopColor="#62789A" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4F6074" />
          <stop offset="0.22" stopColor="#8D9CAE" />
          <stop offset="0.5" stopColor="#3D4D5C" />
          <stop offset="1" stopColor="#222C36" />
        </linearGradient>
      </defs>
      <rect x="56" y="4" width="160" height="26" rx="7" fill={`url(#${id}-barrel)`} />
      <rect x="0" y="3" width="66" height="28" rx="8" fill={`url(#${id}-cap)`} />
      <rect x="12" y="0" width="40" height="7" rx="3.5" fill="#56677A" />
      <path d="M14 1.8H50" stroke="#FFFFFF" strokeOpacity="0.35" />
      <path d="M216 9L236 13V21L216 25Z" fill="#6E86A8" />
      <path d="M216 9L236 13" stroke="#FFFFFF" strokeOpacity="0.4" />
    </svg>
  );
}

// A white vinyl eraser half in its card sleeve.
export function Eraser({ className, id = 'eraser' }) {
  return (
    <svg className={className} viewBox="0 0 96 40" width="96" height="40" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-vinyl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DDD7CE" />
        </linearGradient>
        <linearGradient id={`${id}-sleeve`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B5C6DD" />
          <stop offset="1" stopColor="#8299B8" />
        </linearGradient>
      </defs>
      <rect x="0" y="2" width="96" height="36" rx="5" fill={`url(#${id}-vinyl)`} />
      <rect x="32" y="1" width="64" height="38" fill={`url(#${id}-sleeve)`} />
      <rect x="32" y="15" width="64" height="9" fill="var(--ink)" fillOpacity="0.55" />
      <path d="M32 1.6H96" stroke="#FFFFFF" strokeOpacity="0.5" />
    </svg>
  );
}

// A manila envelope, flap side up: kraft fibres, the flap's fold catching light, and a stamp.
export function Envelope({ className, id = 'envelope' }) {
  return (
    <svg className={className} viewBox="0 0 380 240" width="380" height="240" aria-hidden="true">
      <defs>
        <filter id={`${id}-fibre`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.25" numOctaves="3" seed="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.22 0" result="tint" />
          <feComposite in="tint" in2="SourceGraphic" operator="in" result="fibres" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="fibres" /></feMerge>
        </filter>
        <linearGradient id={`${id}-flap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCC3AF" />
          <stop offset="1" stopColor="#CDAF98" />
        </linearGradient>
      </defs>
      <g filter={`url(#${id}-fibre)`}>
        <rect width="380" height="240" rx="3" fill="#D2B8A3" />
        <path d="M0 240L152 116L228 116L380 240Z" fill="#C9AC95" />
        <path d="M0 0L190 128L380 0Z" fill={`url(#${id}-flap)`} />
      </g>
      <path d="M0 0L190 128L380 0" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M2 238L152 117M378 238L228 117" stroke="#8C6A52" strokeOpacity="0.28" strokeWidth="1.5" />
      <rect x="308" y="146" width="50" height="60" fill="#FAF7F2" />
      <rect x="313" y="151" width="40" height="50" fill="var(--tint)" />
      <path d="M318 186c8-10 14 6 22-4s10 4 13-2" fill="none" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M308 146h50v60h-50Z" fill="none" stroke="#D2B8A3" strokeWidth="3" strokeDasharray="2 3.2" />
    </svg>
  );
}
