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

// A white mug of black coffee from above. The ceramic is lit and its inner wall dim; the coffee is
// a dark mirror: a window caught sharp on its surface, the rim reflected along the far edge, a pale
// meniscus where it climbs the cup, a few bubbles, and the faintest ripple.
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
        <radialGradient id={`${id}-coffee`} cx="0.56" cy="0.58" r="0.56">
          <stop offset="0" stopColor="#2A160C" />
          <stop offset="0.7" stopColor="#331C0F" />
          <stop offset="0.88" stopColor="#452715" />
          <stop offset="0.96" stopColor="#6E4428" />
          <stop offset="1" stopColor="#4B2D19" />
        </radialGradient>
        <radialGradient id={`${id}-sheen`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-ripple`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.03" numOctaves="2" seed="5" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.11 -0.035" />
        </filter>
        <filter id={`${id}-crisp`}><feGaussianBlur stdDeviation="0.7" /></filter>
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
        <rect x="24" y="28" width="124" height="124" filter={`url(#${id}-ripple)`} />
        {/* the rim keeps the light off the coffee nearest it */}
        <circle cx="76" cy="80" r="66" fill="none" stroke="#120904" strokeOpacity="0.5" strokeWidth="12" filter={`url(#${id}-soft)`} />
        {/* the meniscus climbing the wall, and the dark line where the surface bends */}
        <circle cx="86" cy="90" r="61" fill="none" stroke="#B07D55" strokeOpacity="0.55" strokeWidth="2.2" filter={`url(#${id}-crisp)`} />
        <circle cx="86" cy="90" r="58.8" fill="none" stroke="#120904" strokeOpacity="0.45" strokeWidth="1.2" />
        {/* a broad sheen, then the window caught sharp in it, bent along the surface */}
        <ellipse cx="68" cy="68" rx="34" ry="22" fill={`url(#${id}-sheen)`} transform="rotate(-36 68 68)" />
        <path d="M44 74c6-14 20-26 36-30l2 7c-14 5-26 15-31 27Z" fill="#FFFFFF" fillOpacity="0.62" filter={`url(#${id}-crisp)`} />
        <path d="M54 82c4-8 11-15 19-19l1.5 3.5c-7 4-13 10-16.5 17Z" fill="#FFFFFF" fillOpacity="0.28" filter={`url(#${id}-crisp)`} />
        {/* the far rim, lit, mirrored in the coffee */}
        <path d="M126 112a52 52 0 0 1-40 34" fill="none" stroke="#F3E6D8" strokeOpacity="0.32" strokeWidth="3" strokeLinecap="round" filter={`url(#${id}-crisp)`} />
        {/* bubbles stuck at the edge */}
        {[[132, 104, 2.2], [128, 112, 1.6], [134, 96, 1.3], [124, 119, 1.9], [119, 125, 1.2], [136, 89, 1], [130, 117, 1]].map(([x, y, r]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r} fill="#6E4428" stroke="#C49A75" strokeOpacity="0.6" strokeWidth="0.5" />
            <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#FFFFFF" fillOpacity="0.8" />
          </g>
        ))}
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

// A periwinkle highlighter with its cap posted on the end. Round barrel, so the light runs along it
// in a band; a ribbed grip and pocket clip on the cap, the moulding seam, a ridged nose and a felt
// chisel tip. The print on the barrel is a made-up maker, not a real brand.
export function Marker({ className, id = 'marker' }) {
  const ribs = Array.from({ length: 8 }, (_, i) => 60 + i * 2);
  return (
    <svg className={className} viewBox="0 0 282 30" width="282" height="30" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-barrel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#71879F" />
          <stop offset="0.16" stopColor="#B7C8DE" />
          <stop offset="0.26" stopColor="#E3EBF5" />
          <stop offset="0.42" stopColor="#A7BBD5" />
          <stop offset="0.8" stopColor="#7E95B5" />
          <stop offset="1" stopColor="#5A7093" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3F4E5E" />
          <stop offset="0.18" stopColor="#7E8EA1" />
          <stop offset="0.28" stopColor="#A9B6C5" />
          <stop offset="0.45" stopColor="#465769" />
          <stop offset="1" stopColor="#1C242D" />
        </linearGradient>
        <linearGradient id={`${id}-clip`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9AA8B8" />
          <stop offset="0.4" stopColor="#5C6C7E" />
          <stop offset="1" stopColor="#2E3945" />
        </linearGradient>
        <linearGradient id={`${id}-nose`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5D7394" />
          <stop offset="0.3" stopColor="#B4C4DA" />
          <stop offset="1" stopColor="#4B6082" />
        </linearGradient>
        <filter id={`${id}-felt`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4 0.35" numOctaves="2" seed="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.15  0 0 0 0 0.2  0 0 0 0 0.3  0 0 0 0.45 0" result="fibres" />
          <feComposite in="fibres" in2="SourceGraphic" operator="in" result="lay" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="lay" /></feMerge>
        </filter>
        <filter id={`${id}-gloss`}><feGaussianBlur stdDeviation="0.4" /></filter>
      </defs>

      {/* barrel */}
      <rect x="68" y="6" width="190" height="20" rx="5.5" fill={`url(#${id}-barrel)`} />
      <path d="M76 19.4H254" stroke="#566C8C" strokeOpacity="0.35" strokeWidth="0.5" />
      <path d="M76 19.9H254" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="0.4" />
      <path d="M78 9.6H252" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1.1" strokeLinecap="round" filter={`url(#${id}-gloss)`} />
      <path d="M80 24.2H250" stroke="#C9D6E8" strokeOpacity="0.35" strokeWidth="0.6" />
      {/* the print, pad-printed along the barrel */}
      <g fill="#24303C" fillOpacity="0.78" fontFamily="'Helvetica Neue', Arial, sans-serif">
        <text x="112" y="18.2" fontSize="6.4" fontWeight="700" letterSpacing="1.1">SOFT LINER</text>
        <text x="171" y="15" fontSize="3.9" letterSpacing="0.5">HIGHLIGHTER</text>
        <text x="171" y="19.6" fontSize="3.9" letterSpacing="0.25">chisel 1-5 mm</text>
        <text x="222" y="17.8" fontSize="3.4" letterSpacing="0.2">No. 32</text>
      </g>
      <path d="M167 11.5V21" stroke="#24303C" strokeOpacity="0.4" strokeWidth="0.5" />

      {/* nose cone with three moulded rings, then a short felt chisel tip */}
      <path d="M256 7.5L268 10.5V21.5L256 24.5Z" fill={`url(#${id}-nose)`} />
      {[259, 261.8, 264.6].map((x) => (
        <g key={x}>
          <path d={`M${x} ${8.3 + (x - 256) * 0.25}V${23.7 - (x - 256) * 0.25}`} stroke="#3B4C66" strokeOpacity="0.55" strokeWidth="0.8" />
          <path d={`M${x + 0.8} ${8.5 + (x - 256) * 0.25}V${23.5 - (x - 256) * 0.25}`} stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.4" />
        </g>
      ))}
      <path d="M268 11.8L278 14.3L280 16L278 18.6L268 20.2Z" fill="#7189AC" filter={`url(#${id}-felt)`} />
      <path d="M268 11.8L278 14.3L280 16" fill="none" stroke="#C6D3E5" strokeOpacity="0.6" strokeWidth="0.6" />

      {/* the cap, posted on the back end: rounded crown, ribbed grip, pocket clip */}
      <path d="M0 11a7 7 0 0 1 7-7H80V28H7A7 7 0 0 1 0 21Z" fill={`url(#${id}-cap)`} />
      {ribs.map((x) => (
        <g key={x}>
          <path d={`M${x} 5V27`} stroke="#141A21" strokeOpacity="0.55" strokeWidth="0.8" />
          <path d={`M${x + 0.8} 5V27`} stroke="#B9C4D1" strokeOpacity="0.3" strokeWidth="0.4" />
        </g>
      ))}
      <path d="M80 4V28" stroke="#141A21" strokeOpacity="0.6" strokeWidth="1" />
      <path d="M5 7.8H78" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" filter={`url(#${id}-gloss)`} />
      <path d="M7 1.2H47a3.2 3.2 0 0 1 0 6.4H7a2 2 0 0 1 0-4Z" fill={`url(#${id}-clip)`} />
      <path d="M9 2.6H46" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M13 5.3H42" stroke="#1C242D" strokeOpacity="0.45" strokeWidth="0.5" />
      <circle cx="48" cy="4.4" r="1.3" fill="#2E3945" />
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
