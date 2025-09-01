import React from 'react';
import { SummaryCard } from '../cards';

interface Statistic {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'orange';
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

interface StatisticsGridProps {
  statistics: Statistic[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const StatisticsGrid: React.FC<StatisticsGridProps> = ({
  statistics,
  columns = 4,
  className = ''
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-6 mb-8 ${className}`}>
      {statistics.map((stat, index) => (
        <SummaryCard
          key={index}
          title={stat.title}
          value={stat.value.toString()}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default StatisticsGrid; 