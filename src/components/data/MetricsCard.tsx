import React from 'react';
import { Card, CardContent, Chip } from '@mui/material';
import { FaCheckCircle, FaExclamationTriangle, FaArrowDown, FaThermometerHalf } from 'react-icons/fa';

interface MetricsCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  unit?: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon: React.ReactNode;
  metrics?: Array<{
    label: string;
    value: string | number;
    unit?: string;
  }>;
  footer?: {
    status: string;
    date: string;
  };
  onClick?: () => void;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  subtitle,
  value,
  unit,
  status,
  icon,
  metrics,
  footer,
  onClick,
  className = ""
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':
        return {
          color: 'success',
          icon: <FaCheckCircle />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        };
      case 'warning':
        return {
          color: 'warning',
          icon: <FaExclamationTriangle />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800'
        };
      case 'error':
        return {
          color: 'error',
          icon: <FaArrowDown />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800'
        };
      default:
        return {
          color: 'info',
          icon: <FaThermometerHalf />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card 
      className={`shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-600">{subtitle}</p>
              )}
            </div>
          </div>
          <Chip 
            icon={statusConfig.icon}
            label={`${value}${unit || ''}`}
            color={statusConfig.color as any}
            size="small"
            className="font-semibold"
          />
        </div>

        {/* Métricas */}
        {metrics && metrics.length > 0 && (
          <div className="space-y-2 mb-3">
            {metrics.map((metric, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{metric.label}:</span>
                <span className="font-medium text-gray-800">
                  {metric.value}{metric.unit || ''}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Chip 
                label={footer.status}
                size="small"
                className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.textColor}`}
              />
              <span className="text-xs text-gray-500">{footer.date}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard; 