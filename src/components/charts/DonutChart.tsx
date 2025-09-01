import React from 'react';

interface DonutChartProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  value,
  size = 120,
  strokeWidth = 16,
  color = 'var(--primary-dark)',
  bgColor = 'var(--accent)',
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="block fade-in-up" style={{ minWidth: size, minHeight: size }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 1s cubic-bezier(.39,.575,.565,1)',
        }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".1em"
        fontSize={size * 0.28}
        fill={color}
        fontWeight="bold"
      >
        {value}%
      </text>
      {label && (
        <text
          x="50%"
          y={size / 2 + size * 0.22}
          textAnchor="middle"
          fontSize={size * 0.13}
          fill="var(--muted)"
        >
          {label}
        </text>
      )}
    </svg>
  );
};

export default DonutChart; 