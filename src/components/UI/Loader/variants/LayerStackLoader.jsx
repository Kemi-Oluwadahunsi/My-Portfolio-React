// Isometric slabs (bottom to top). `y` is the slab's top corner; `delay` staggers the drops.
const SLABS = [
  { name: 'data', y: 96, colors: ['#3fabf1', '#2a7fb8', '#1d5f8d'], delay: 0 },
  { name: 'api', y: 78, colors: ['#38d4ff', '#1b9fc6', '#127c9c'], delay: 0.35 },
  { name: 'auth', y: 60, colors: ['#6ee755', '#46b233', '#2f8a22'], delay: 0.7 },
  { name: 'ui', y: 42, colors: ['#9b8cff', '#7466d6', '#5a4eb0'], delay: 1.05 },
]

const LayerStackLoader = () => (
  <svg className="stack-loader" viewBox="20 0 240 170" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    {SLABS.map(({ name, y, colors: [top, left, right], delay }) => (
      <g key={name} className="slab" style={{ animationDelay: `${delay}s` }}>
        <polygon points={`100,${y} 150,${y + 25} 100,${y + 50} 50,${y + 25}`} fill={top} />
        <polygon points={`50,${y + 25} 100,${y + 50} 100,${y + 60} 50,${y + 35}`} fill={left} />
        <polygon points={`100,${y + 50} 150,${y + 25} 150,${y + 35} 100,${y + 60}`} fill={right} />
        <line x1="152" y1={y + 32} x2="170" y2={y + 32} />
        <text x="174" y={y + 35}>
          {name}
        </text>
      </g>
    ))}
  </svg>
)

export default LayerStackLoader
