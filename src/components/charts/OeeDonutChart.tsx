import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface OeeDonutChartProps {
  value: number;
  size?: number;
  color?: string;
  bgColor?: string;
  label?: string;
}

const OeeDonutChart: React.FC<OeeDonutChartProps> = ({
  value,
  size = 120,
  color = 'var(--primary-dark)',
  bgColor = 'var(--accent)',
  label = 'Hoje',
}) => {
  const data = [
    { name: 'OEE', value },
    { name: 'Restante', value: 100 - value },
  ];
  const colors = [color, bgColor];

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={size / 2.4}
            outerRadius={size / 2}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            isAnimationActive={true}
            animationDuration={900}
          >
            {data.map((_item, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: size * 0.28, fontWeight: 'bold', color: 'var(--primary-dark)' }}>{value}%</div>
        <div style={{ fontSize: size * 0.13, color: 'var(--muted)' }}>{label}</div>
      </div>
    </div>
  );
};

export default OeeDonutChart; 