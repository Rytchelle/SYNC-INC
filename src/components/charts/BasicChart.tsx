import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';


interface BasicChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  type?: 'bar' | 'pie' | 'line';
  height?: number;
}

const BasicChart: React.FC<BasicChartProps> = ({
  title,
  data,
  type = 'bar',
  height = 300
}) => {
  const maxValue = Math.max(...data.map(item => item.value));

  const renderBarChart = () => (
    <div className="flex items-end justify-center space-x-4 h-full p-4">
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-12 rounded-t-lg transition-all duration-300 hover:scale-110"
              style={{
                height: `${Math.max(heightPercent, 10)}%`,
                backgroundColor: item.color,
                minHeight: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            />
            <div className="text-center mt-2 text-sm font-medium text-gray-600">
              {item.label}
            </div>
            <div className="text-center text-xs text-gray-500">
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 80;
    const centerX = 120;
    const centerY = 120;
    
    let currentAngle = 0;
    
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <svg width="240" height="200" className="mx-auto">
          {data.map((item, index) => {
            const angle = (item.value / total) * 2 * Math.PI;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArcFlag = angle > Math.PI ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.3}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
        </svg>
        
        {/* Total below the chart */}
        <div className="text-center mt-4">
          <div className="text-2xl font-bold text-gray-800">
            {total}%
          </div>
          <div className="text-sm text-gray-600">
            Total
          </div>
        </div>
      </div>
    );
  };

  const renderLineChart = () => (
    <div className="relative h-full p-4">
      <svg width="100%" height="100%" className="absolute inset-0">
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
          stroke="#3B82F6"
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
              stroke="#3B82F6"
              strokeWidth="3"
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

export default BasicChart; 