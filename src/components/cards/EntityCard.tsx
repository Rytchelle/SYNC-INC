import React from 'react';
import { Card, Avatar } from '@mui/material';
import { StatusChip, ActionButton } from '../ui';

interface EntityCardProps {
  id?: string;
  name: string;
  description?: string;
  status: string;
  image?: string;
  metrics?: {
    efficiency?: number;
    production?: number;
    quality?: number;
  };
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: (entity: any) => void;
  }>;
  onClick?: () => void;
  className?: string;
}

const EntityCard: React.FC<EntityCardProps> = ({
  name,
  description,
  status,
  image,
  metrics,
  actions = [],
  onClick,
  className = ''
}) => {
  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {image && (
              <Avatar 
                src={image} 
                alt={name}
                sx={{ width: 48, height: 48 }}
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text)] mb-1">{name}</h3>
              {description && (
                <p className="text-sm text-[var(--muted)]">{description}</p>
              )}
            </div>
          </div>
          <StatusChip 
            status={status}
          />
        </div>

        {metrics && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {metrics.efficiency !== undefined && (
              <div className="text-center">
                <div className="text-lg font-bold text-[var(--primary)]">
                  {metrics.efficiency}%
                </div>
                <div className="text-xs text-[var(--muted)]">Eficiência</div>
              </div>
            )}
            {metrics.production !== undefined && (
              <div className="text-center">
                <div className="text-lg font-bold text-[var(--primary)]">
                  {metrics.production}
                </div>
                <div className="text-xs text-[var(--muted)]">Produção</div>
              </div>
            )}
            {metrics.quality !== undefined && (
              <div className="text-center">
                <div className="text-lg font-bold text-[var(--primary)]">
                  {metrics.quality}%
                </div>
                <div className="text-xs text-[var(--muted)]">Qualidade</div>
              </div>
            )}
          </div>
        )}

        {actions.length > 0 && (
          <div className="flex gap-2 justify-end">
            {actions.map((action, index) => (
              <ActionButton
                key={index}
                label={action.label}
                icon={action.icon}
                onClick={(e) => {
                  if (e) e.stopPropagation();
                  action.onClick({ name, status, metrics });
                }}
                size="small"
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default EntityCard; 