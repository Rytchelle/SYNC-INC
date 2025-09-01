import React from 'react';
import { Chip } from '@mui/material';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
  className?: string;
}

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'small',
  className = ''
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'operational':
      case 'operando':
      case 'ativo':
      case 'operacional':
        return 'success'; // Verde vivo
      case 'maintenance':
      case 'manutenção':
      case 'on leave':
      case 'medical leave':
        return 'warning'; // Amarelo vivo
      case 'inactive':
      case 'standby':
      case 'parada':
      case 'inativo':
      case 'aguardando':
      case 'absent':
        return 'error'; // Vermelho vivo
      case 'next shift':
        return 'info'; // Azul
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Ativo';
      case 'operational':
        return 'Operacional';
      case 'maintenance':
        return 'Manutenção';
      case 'inactive':
        return 'Inativo';
      case 'standby':
        return 'Aguardando';
      default:
        return status;
    }
  };

  return (
    <Chip
      label={getStatusText(status)}
      color={getStatusColor(status) as any}
      size={size}
      className={className}
      sx={{
        '&.MuiChip-colorSuccess': {
          backgroundColor: '#22c55e', // verde vivo
          color: 'white',
          fontWeight: 700,
          letterSpacing: 1,
        },
        '&.MuiChip-colorWarning': {
          backgroundColor: '#facc15', // amarelo vivo
          color: '#7c4700',
          fontWeight: 700,
          letterSpacing: 1,
        },
        '&.MuiChip-colorError': {
          backgroundColor: '#ef4444', // vermelho vivo
          color: 'white',
          fontWeight: 700,
          letterSpacing: 1,
        },
        '&.MuiChip-colorInfo': {
          backgroundColor: '#3b82f6', // azul vivo
          color: 'white',
          fontWeight: 700,
          letterSpacing: 1,
        },
        '&.MuiChip-colorDefault': {
          backgroundColor: '#e5e7eb', // cinza claro
          color: '#374151',
          fontWeight: 700,
          letterSpacing: 1,
        },
      }}
    />
  );
};

export default StatusChip; 