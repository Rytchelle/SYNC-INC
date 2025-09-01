import React from 'react';

interface PerformanceCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}

const PerformanceCircle: React.FC<PerformanceCircleProps> = ({
  value,
  size = 56,
  strokeWidth = 6,
  color = 'var(--primary)',
  bgColor = 'var(--accent)',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="block">
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
        dy=".3em"
        fontSize={size * 0.32}
        fill={color}
        fontWeight="bold"
      >
        {value}%
      </text>
    </svg>
  );
};

export default PerformanceCircle; 