import React from 'react';
import { Card, CardContent } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  className = ""
}) => {
  return (
    <Card className={`shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color }}>
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            {subtitle && (
              <p className="text-xs" style={{ color }}>
                {subtitle}
              </p>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
