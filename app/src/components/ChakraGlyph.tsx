interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export function ChakraGlyph({
  size = 26,
  color = "var(--navy)",
  className,
}: Props) {
  const r = size / 2;
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={className}
    >
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
      />
      <circle cx={r} cy={r} r={r * 0.18} fill={color} />
      {spokes.map((deg) => (
        <line
          key={deg}
          x1={r}
          y1={r}
          x2={r}
          y2={1.5}
          stroke={color}
          strokeWidth="0.9"
          transform={`rotate(${deg} ${r} ${r})`}
        />
      ))}
    </svg>
  );
}
