/**
 * Hero backdrop.
 *
 * Drawn rather than photographed: a deep navy field lit warm from the top left,
 * a technical grid, and a sectioned system build-up — the substrate, primer,
 * membrane and protection courses Catenate actually specifies — raked across the
 * lower field. It ships with the bundle, so there is no image to load or license.
 */
export function HeroBackdrop() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 size-full"
    >
      <defs>
        <linearGradient id="hb-field" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#333d80" />
          <stop offset="0.4" stopColor="#1c2764" />
          <stop offset="1" stopColor="#0a1038" />
        </linearGradient>

        {/* Warm key light, carrying the brand's amber accent. */}
        <radialGradient id="hb-warm" cx="0.14" cy="0.02" r="0.8">
          <stop offset="0" stopColor="#e8b98a" stopOpacity="0.62" />
          <stop offset="0.38" stopColor="#a8809e" stopOpacity="0.2" />
          <stop offset="1" stopColor="#101b52" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="hb-cool" cx="0.92" cy="0.28" r="0.62">
          <stop offset="0" stopColor="#4a5fe0" stopOpacity="0.38" />
          <stop offset="1" stopColor="#101b52" stopOpacity="0" />
        </radialGradient>

        <pattern id="hb-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M64 0H0v64"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.13"
            strokeWidth="1"
          />
        </pattern>

        {/* Grid reads at the top and dissolves before it reaches the copy. */}
        <linearGradient id="hb-gridfade" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="hb-gridmask">
          <rect width="1600" height="900" fill="url(#hb-gridfade)" />
        </mask>

        {/* The build-up emerges from the right and fades under the headline. */}
        <linearGradient id="hb-layerfade" x1="0.18" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="hb-layermask">
          <rect width="1600" height="900" fill="url(#hb-layerfade)" />
        </mask>

        {/* Coverage arcs, sweeping out of the warm corner. */}
        <radialGradient id="hb-arcfade" cx="0.1" cy="0.05" r="0.95">
          <stop offset="0.15" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hb-arcmask">
          <rect width="1600" height="900" fill="url(#hb-arcfade)" />
        </mask>

        {/* Seats the copy and the stat bar on a darker ground. */}
        <linearGradient id="hb-seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1038" stopOpacity="0" />
          <stop offset="0.5" stopColor="#0a1038" stopOpacity="0.3" />
          <stop offset="1" stopColor="#0a1038" stopOpacity="0.85" />
        </linearGradient>

        {/* Keeps the headline off the busiest part of the drawing. */}
        <radialGradient id="hb-copy" cx="0.5" cy="0.42" r="0.46">
          <stop offset="0" stopColor="#131c50" stopOpacity="0.5" />
          <stop offset="1" stopColor="#131c50" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#hb-field)" />
      <rect width="1600" height="900" fill="url(#hb-grid)" mask="url(#hb-gridmask)" />

      <g mask="url(#hb-arcmask)" fill="none" stroke="#e8b98a" strokeOpacity="0.5">
        {[280, 470, 660, 850, 1040, 1230].map((r) => (
          <circle key={r} cx="120" cy="30" r={r} strokeWidth="1" />
        ))}
      </g>

      <rect width="1600" height="900" fill="url(#hb-warm)" />
      <rect width="1600" height="900" fill="url(#hb-cool)" />

      {/* System build-up, shown in section and raked across the lower field. */}
      <g mask="url(#hb-layermask)" transform="rotate(-11 980 620)">
        <rect x="300" y="430" width="1600" height="30" fill="#ffffff" fillOpacity="0.09" />
        <rect x="300" y="430" width="1600" height="1.5" fill="#ffffff" fillOpacity="0.34" />

        <rect x="300" y="472" width="1600" height="18" fill="#e8b98a" fillOpacity="0.3" />
        <rect x="300" y="472" width="1600" height="1.5" fill="#e8b98a" fillOpacity="0.6" />

        <rect x="300" y="502" width="1600" height="44" fill="#ffffff" fillOpacity="0.13" />
        <rect x="300" y="502" width="1600" height="1.5" fill="#ffffff" fillOpacity="0.38" />

        <rect x="300" y="558" width="1600" height="12" fill="#ffffff" fillOpacity="0.24" />

        <rect x="300" y="582" width="1600" height="78" fill="#ffffff" fillOpacity="0.07" />
        <rect x="300" y="582" width="1600" height="1.5" fill="#ffffff" fillOpacity="0.3" />

        {/* Hatching on the substrate course. */}
        <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.2">
          {Array.from({ length: 46 }, (_, i) => (
            <line key={i} x1={310 + i * 34} y1="660" x2={350 + i * 34} y2="583" />
          ))}
        </g>
      </g>

      <rect width="1600" height="900" fill="url(#hb-copy)" />
      <rect width="1600" height="900" fill="url(#hb-seat)" />
    </svg>
  )
}
