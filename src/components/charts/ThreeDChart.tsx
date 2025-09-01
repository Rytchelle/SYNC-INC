import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
// import { TrendingUp, TrendingDown } from '@mui/icons-material';
// Ícones comentados devido à ausência de types do @mui/icons-material no ambiente atual. Para restaurar, instale os types ou ajuste a policy do sistema.

// Estilos CSS personalizados para gráficos 3D
const threeDChartStyles = `
  .three-d-chart {
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  
  .three-d-bar {
    transition: all 0.3s ease;
    transform-style: preserve-3d;
  }
  
  .three-d-bar:hover {
    transform: translateZ(20px) scale(1.1);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  }
  
  .three-d-pie {
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }
  
  .three-d-line {
    filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3));
  }
`;

interface ThreeDChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  type?: 'bar' | 'pie' | 'line';
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
}

const ThreeDChart: React.FC<ThreeDChartProps> = ({
  title,
  data,
  type = 'bar',
  height = 300,
  showLegend = true,
  showTooltip = true
}) => {
  console.log('ThreeDChart rendering:', { title, data, type });
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const maxValue = Math.max(...data.map(item => item.value));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderBarChart = () => (
    <div className="relative w-full h-full flex items-end justify-center space-x-2">
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
              className="three-d-bar"
              style={{
                height: `${heightPercent}%`,
                backgroundColor: item.color,
                borderRadius: '8px 8px 0 0',
                minWidth: '40px',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            >
              {showTooltip && isHovered && (
                <div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap z-10"
                  style={{
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
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
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="three-d-pie"
        style={{
          width: '200px',
          height: '200px',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {data.map((item, index) => {
          const startAngle = data
            .slice(0, index)
            .reduce((sum, d) => sum + (d.value / total) * 360, 0);
          // Removido percentage e endAngle pois não são usados
          
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
                  background: `conic-gradient(from ${startAngle}deg, ${item.color} 0deg, ${item.color} ${(item.value / total) * 360}deg, transparent ${(item.value / total) * 360}deg)`,
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
    <div className="relative w-full h-full">
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
          className="three-d-line"
          d={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
          }).join(' ')}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
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

  useEffect(() => {
    if (type === 'pie') {
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [type]);

  return (
    <>
      <style>{threeDChartStyles}</style>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold text-gray-800">
              {title}
            </Typography>
            {/* Ícone removido por falta de types do @mui/icons-material. Substitua por outro ícone se desejar. */}
          </div>
          
          <div 
            className="relative three-d-chart"
            style={{ height: `${height}px` }}
            onMouseMove={(e) => {
              if (type === 'pie') {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                setRotation({
                  x: (y - centerY) / 10,
                  y: (x - centerX) / 10
                });
              }
            }}
          >
            {renderChart()}
          </div>

          {showLegend && (
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
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ThreeDChart; 