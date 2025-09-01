import React from 'react';
import { Chip } from '@mui/material';

interface EfficiencyChipProps {
  efficiency: number;
  size?: 'small' | 'medium';
  className?: string;
}

const EfficiencyChip: React.FC<EfficiencyChipProps> = ({
  efficiency,
  size = 'small',
  className = ''
}) => {
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'success';
    if (efficiency >= 85) return 'warning';
    return 'error';
  };

  return (
    <Chip
      label={`${efficiency}%`}
      color={getEfficiencyColor(efficiency) as any}
      size={size}
      className={className}
      sx={{
        '&.MuiChip-colorSuccess': {
          backgroundColor: 'var(--success)',
          color: 'white',
        },
        '&.MuiChip-colorWarning': {
          backgroundColor: 'var(--warning)',
          color: 'white',
        },
        '&.MuiChip-colorError': {
          backgroundColor: 'var(--danger)',
          color: 'white',
        },
      }}
    />
  );
};

export default EfficiencyChip; 