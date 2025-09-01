import React from 'react';
import { Chip } from '@mui/material';

interface ActivityItemProps {
  id: number;
  type: 'machine' | 'employee' | 'department' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  status,
  icon
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Sucesso';
      case 'warning': return 'Aviso';
      case 'error': return 'Erro';
      case 'info': return 'Info';
      default: return status;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'error': return 'bg-red-100';
      case 'info': return 'bg-blue-100';
      default: return 'bg-gray-100';
    }
  };

  const getStatusIconColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusBgColor(status)}`}>
        <div className={getStatusIconColor(status)}>
          {icon}
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-[var(--text)] mb-1">{title}</h4>
        <p className="text-sm text-[var(--muted)] mb-2">{description}</p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[var(--muted)]">{time}</span>
          <Chip 
            label={getStatusText(status)}
            color={getStatusColor(status) as any}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityItem; 