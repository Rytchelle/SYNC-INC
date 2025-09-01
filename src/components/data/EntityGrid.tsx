import React from 'react';
import { EntityCard } from '../cards';

interface Entity {
  id: string | number;
  name: string;
  description?: string;
  image?: string;
  status: string;
  metrics?: {
    efficiency?: number;
    production?: number;
    quality?: number;
  };
}

interface EntityGridProps {
  entities: Entity[];
  onEntityClick?: (entity: Entity) => void;
  onEntityAction?: (entity: Entity, action: string) => void;
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    action: string;
    variant?: 'contained' | 'outlined';
  }>;
  columns?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

const EntityGrid: React.FC<EntityGridProps> = ({
  entities,
  onEntityClick,
  onEntityAction,
  actions = [],
  columns = 4,
  className = ''
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-6 ${className}`}>
      {entities.map(entity => (
        <EntityCard
          key={entity.id}
          id={typeof entity.id === 'string' ? entity.id : entity.id.toString()}
          name={entity.name}
          description={entity.description}
          image={entity.image}
          status={entity.status}
          metrics={entity.metrics}
          actions={actions.map(action => ({
            ...action,
            onClick: () => onEntityAction?.(entity, action.action)
          }))}
          onClick={() => onEntityClick?.(entity)}
        />
      ))}
    </div>
  );
};

export default EntityGrid; 