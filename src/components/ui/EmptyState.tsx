import React from 'react';
import { Box, Typography } from '@mui/material';
import ActionButton from './ActionButton';


interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'contained' | 'outlined';
  };
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showBorder?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
  size = 'medium',
  showBorder = true
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 'text-4xl';
      case 'large':
        return 'text-6xl';
      case 'medium':
      default:
        return 'text-5xl';
    }
  };

  const getTitleSize = () => {
    switch (size) {
      case 'small':
        return 'text-lg';
      case 'large':
        return 'text-2xl';
      case 'medium':
      default:
        return 'text-xl';
    }
  };

  const getDescriptionSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      case 'medium':
      default:
        return 'text-base';
    }
  };

  return (
    <Box
      className={`
        flex flex-col items-center justify-center p-8 text-center
        ${showBorder ? 'border-2 border-dashed border-gray-300 rounded-lg' : ''}
        ${className}
      `}
    >
      <div className={`text-[var(--muted)] mb-4 ${getIconSize()}`}>
        {icon}
      </div>
      
      <Typography
        variant="h6"
        className={`font-semibold text-[var(--text)] mb-2 ${getTitleSize()}`}
      >
        {title}
      </Typography>
      
      {description && (
        <Typography
          variant="body2"
          className={`text-[var(--muted)] mb-6 max-w-md ${getDescriptionSize()}`}
        >
          {description}
        </Typography>
      )}
      
      {action && (
        <ActionButton
          icon={action.icon}
          label={action.label}
          onClick={action.onClick}
          variant={action.variant || 'contained'}
          size={size === 'small' ? 'small' : 'medium'}
        />
      )}
    </Box>
  );
};

export default EmptyState; 