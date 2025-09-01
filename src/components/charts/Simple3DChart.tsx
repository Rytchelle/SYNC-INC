import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Simple3DChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  type?: 'bar' | 'pie' | 'line';
  height?: number;
}

const Simple3DChart: React.FC<Simple3DChartProps> = ({
  title,
  data,
  type = 'bar',
  height = 300
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(item => item.value));

  const renderBarChart = () => (
    <div className="flex items-end justify-center space-x-4 h-full">
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        const isHovered = hoveredIndex === index;
        
        return (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="transition-all duration-300 ease-out"
              style={{
                height: `${heightPercent}%`,
                backgroundColor: item.color,
                minWidth: '40px',
                borderRadius: '8px 8px 0 0',
                boxShadow: isHovered 
                  ? '0 8px 25px rgba(0,0,0,0.3)' 
                  : '0 4px 15px rgba(0,0,0,0.2)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {isHovered && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap z-10">
                  {item.label}: {item.value}
                </div>
              )}
            </div>
            <div className="text-center mt-2 text-sm font-medium text-gray-600">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPieChart = () => (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-48 h-48">
        {data.map((item, index) => {
          const startAngle = data
            .slice(0, index)
            .reduce((sum, d) => sum + (d.value / data.reduce((sum, d) => sum + d.value, 0)) * 360, 0);
          
          return (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                transform: `rotate(${startAngle}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from ${startAngle}deg, ${item.color} 0deg, ${item.color} ${(item.value / data.reduce((sum, d) => sum + d.value, 0)) * 360}deg, transparent ${(item.value / data.reduce((sum, d) => sum + d.value, 0)) * 360}deg)`,
                  transform: 'translateZ(10px)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          );
        })}
        
        {/* Center circle */}
        <div
          className="absolute inset-0 rounded-full bg-white"
          style={{
            transform: 'translateZ(5px)',
            margin: '25%',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
          }}
        />
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="relative h-full">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={`${(i + 1) * 20}%`}
            x2="100%"
            y2={`${(i + 1) * 20}%`}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        
        {/* Line path */}
        <path
          d={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
          }).join(' ')}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
          }}
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (item.value / maxValue) * 80;
          
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="6"
              fill="white"
              stroke={item.color}
              strokeWidth="3"
              className="cursor-pointer transition-all duration-200 hover:r-8"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </svg>
    </div>
  );

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      case 'line':
        return renderLineChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-semibold text-gray-800">
            {title}
          </Typography>
          {/* Ícone removido por falta de types do @mui/icons-material. Substitua por outro ícone se desejar. */}
        </div>
        
        <div 
          className="relative"
          style={{ height: `${height}px` }}
        >
          {renderChart()}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Simple3DChart; 