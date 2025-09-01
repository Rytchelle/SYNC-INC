import React from 'react';
import MaintenanceCard from './MaintenanceCard';
import type { MaintenanceRecord } from '../../../shared/maintenanceData';

interface MaintenanceGridProps {
  maintenanceRecords: MaintenanceRecord[];
  onCardClick: (maintenance: MaintenanceRecord) => void;
  onEdit: (maintenance: MaintenanceRecord) => void;
}

const MaintenanceGrid: React.FC<MaintenanceGridProps> = ({
  maintenanceRecords,
  onCardClick,
  onEdit
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {maintenanceRecords.map((maintenance) => (
        <MaintenanceCard
          key={maintenance.id}
          maintenance={maintenance}
          onCardClick={onCardClick}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default MaintenanceGrid;
