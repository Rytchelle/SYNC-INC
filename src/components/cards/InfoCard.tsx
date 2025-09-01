import React from 'react';
import { Card, CardContent } from '@mui/material';

interface InfoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'red' | 'gray';
  className?: string;
  onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = 'gray',
  className = '',
  onClick
}) => {
  const colorClasses = {
    blue: {
      card: 'bg-gradient-to-br from-blue-50 to-blue-100',
      indicator: 'bg-blue-500',
      title: 'text-blue-600',
      value: 'text-blue-800',
      subtitle: 'text-blue-600',
      iconBg: 'bg-blue-100',
      icon: 'text-blue-600'
    },
    green: {
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      indicator: 'bg-green-500',
      title: 'text-green-600',
      value: 'text-green-800',
      subtitle: 'text-green-600',
      iconBg: 'bg-green-100',
      icon: 'text-green-600'
    },
    yellow: {
      card: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      indicator: 'bg-yellow-500',
      title: 'text-yellow-600',
      value: 'text-yellow-800',
      subtitle: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      icon: 'text-yellow-600'
    },
    purple: {
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      indicator: 'bg-purple-500',
      title: 'text-purple-600',
      value: 'text-purple-800',
      subtitle: 'text-purple-600',
      iconBg: 'bg-purple-100',
      icon: 'text-purple-600'
    },
    orange: {
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      indicator: 'bg-orange-500',
      title: 'text-orange-600',
      value: 'text-orange-800',
      subtitle: 'text-orange-600',
      iconBg: 'bg-orange-100',
      icon: 'text-orange-600'
    },
    red: {
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      indicator: 'bg-red-500',
      title: 'text-red-600',
      value: 'text-red-800',
      subtitle: 'text-red-600',
      iconBg: 'bg-red-100',
      icon: 'text-red-600'
    },
    gray: {
      card: 'bg-gradient-to-br from-gray-50 to-gray-100',
      indicator: 'bg-gray-500',
      title: 'text-gray-600',
      value: 'text-gray-800',
      subtitle: 'text-gray-600',
      iconBg: 'bg-gray-100',
      icon: 'text-gray-600'
    }
  };

  const colors = colorClasses[color];

  return (
    <Card 
      className={`shadow-lg border-0 ${colors.card} hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
      onClick={onClick}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 ${colors.indicator} rounded-full`}></div>
              <p className={`text-sm font-medium ${colors.title}`}>{title}</p>
            </div>
            <p className={`text-3xl font-bold ${colors.value} mb-1`}>{value}</p>
            {subtitle && (
              <p className={`text-xs ${colors.subtitle}`}>
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div className={`w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center`}>
              <div className={`${colors.icon} text-xl`}>
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard; 