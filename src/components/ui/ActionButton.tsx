import React from 'react';
import { Button } from '@mui/material';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: (event?: React.MouseEvent) => void;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'outlined',
  size = 'small',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(243,130,32,0.3)',
      },
      transition: 'all 0.2s ease',
    };

    if (color === 'error') {
      if (variant === 'outlined') {
        return {
          color: '#dc2626',
          borderColor: '#dc2626',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#dc2626',
            color: 'white',
            borderColor: '#dc2626',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
          },
          transition: 'all 0.2s ease',
        };
      }

      if (variant === 'contained') {
        return {
          backgroundColor: '#dc2626',
          color: 'white',
          '&:hover': {
            backgroundColor: '#b91c1c',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
          },
          transition: 'all 0.2s ease',
        };
      }
    }

    if (variant === 'outlined') {
      return {
        color: 'var(--primary)',
        borderColor: 'var(--primary)',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'var(--primary)',
          color: 'white',
          borderColor: 'var(--primary)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(243,130,32,0.3)',
        },
        '& .MuiButton-startIcon': {
          color: 'inherit',
        },
        transition: 'all 0.2s ease',
      };
    }

    if (variant === 'contained') {
      return {
        backgroundColor: 'var(--primary)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'var(--primary-dark)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(243,130,32,0.3)',
        },
        transition: 'all 0.2s ease',
      };
    }

    return baseStyles;
  };

  return (
    <Button
      variant={variant}
      startIcon={icon}
      onClick={(e) => onClick(e)}
      size={size}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      className={className}
      sx={getButtonStyles()}
    >
      {label}
    </Button>
  );
};

export default ActionButton; 