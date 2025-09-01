import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  includeAll?: boolean;
  allLabel?: string;
  className?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  onChange,
  label,
  options,
  includeAll = true,
  allLabel = 'Todos',
  className = '',
  size = 'small',
  fullWidth = false
}) => {
  return (
    <FormControl size={size} fullWidth={fullWidth} className={className}>
      <InputLabel sx={{ color: 'var(--muted)' }}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary)',
              },
            },
          },
        }}
      >
        {includeAll && (
          <MenuItem value="all">{allLabel}</MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter; 