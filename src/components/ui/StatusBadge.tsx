import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  'Active': 'bg-green-200 text-green-900 border border-green-400',
  'Inactive': 'bg-red-200 text-red-900 border border-red-400',
  'On Leave': 'bg-yellow-200 text-yellow-900 border border-yellow-400',
  'Medical Leave': 'bg-blue-200 text-blue-900 border border-blue-400',
  'Absent': 'bg-gray-300 text-gray-900 border border-gray-400',
  'Next Shift': 'bg-orange-200 text-orange-900 border border-orange-400',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`px-4 py-1 rounded-full text-xs font-bold shadow-sm ${style}`}>{status}</span>
  );
};

export default StatusBadge; 