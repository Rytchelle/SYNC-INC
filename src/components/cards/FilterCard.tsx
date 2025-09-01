import React from 'react';
import type { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';
import { FaFilter } from 'react-icons/fa';

interface FilterCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FilterCard: React.FC<FilterCardProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <Card className={`shadow-lg border-0 mb-6 bg-gradient-to-r from-[var(--accent)] to-white ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-[var(--primary)] text-lg" />
          <h2 className="text-lg font-semibold text-[var(--primary)]">{title}</h2>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default FilterCard; 