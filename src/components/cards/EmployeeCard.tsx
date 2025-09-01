import React from 'react';
import { PerformanceCircle } from '../charts';
import { StatusBadge } from '../ui';

interface EmployeeCardProps {
  photo: string;
  name: string;
  role: string;
  department: string;
  performance: number;
  status: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  photo,
  name,
  role,
  department,
  performance,
  status,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center scale-in group hover:shadow-2xl transition-all duration-300 relative fade-in-up">
      <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-4">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <h2 className="text-lg font-bold text-[var(--primary)] mb-1 text-center">{name}</h2>
      <div className="mb-2">
        <StatusBadge status={status} />
      </div>
      <div className="text-sm text-[var(--muted)] mb-1 text-center">{role}</div>
      <div className="text-xs font-bold text-[var(--primary)] mb-3 text-center">{department}</div>
      <PerformanceCircle value={performance} />
      <div className="mt-2 text-xs text-[var(--muted)]">Desempenho</div>
    </div>
  );
};

export default EmployeeCard; 