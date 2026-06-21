interface RouteAnimationProps {
  variant?: 'vertical' | 'horizontal';
}

export function RouteAnimation({ variant = 'vertical' }: RouteAnimationProps) {
  const isVertical = variant === 'vertical';
  const viewBox = isVertical ? '0 0 400 640' : '0 0 600 200';
  const pathD = isVertical
    ? 'M 70 600 C 70 500 330 500 330 400 C 330 300 60 300 60 200 C 60 110 210 90 210 30'
    : 'M 30 160 C 150 160 150 40 280 40 C 410 40 410 160 560 160';
  const pathId = isVertical ? 'ftl-route-v' : 'ftl-route-h';
  const stops = isVertical
    ? [
        { x: 70, y: 600, color: '#34D399', r: 6 },
        { x: 330, y: 400, color: '#FBBF24', r: 5 },
        { x: 60, y: 200, color: '#FBBF24', r: 5 },
        { x: 210, y: 30, color: '#22D3EE', r: 6 },
      ]
    : [
        { x: 30, y: 160, color: '#34D399', r: 5 },
        { x: 280, y: 40, color: '#FBBF24', r: 4 },
        { x: 560, y: 160, color: '#22D3EE', r: 5 },
      ];

  return (
    <svg viewBox={viewBox} className="ftl-route-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${pathId}`} x1="0" y1="0" x2={isVertical ? '0' : '1'} y2={isVertical ? '1' : '0'}>
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        id={pathId}
        d={pathD}
        fill="none"
        stroke={`url(#grad-${pathId})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 10"
        className="ftl-dash"
      />
      {stops.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.color} className="ftl-stop" />
      ))}
      <g>
        <circle r="13" fill="#22D3EE" opacity="0.16" className="ftl-ping">
          <animateMotion dur="7s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        <circle r="5.5" fill="#22D3EE" className="ftl-vehicle">
          <animateMotion dur="7s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}
