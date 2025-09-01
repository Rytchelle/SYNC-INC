import React from 'react';
import { TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
  size = 'small',
  fullWidth = false
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: <FaSearch className="text-[var(--muted)] mr-2" />,
      }}
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
      size={size}
      fullWidth={fullWidth}
      className={className}
    />
  );
};

export default SearchFilter; 