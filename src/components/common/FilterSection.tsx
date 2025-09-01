import React from 'react';
import { Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  name: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

interface FilterSectionProps {
  title: string;
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
  filters: FilterConfig[];
  onCreateNew?: () => void;
  createButtonText?: string;
  className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  filters,
  onCreateNew,
  createButtonText = "Novo Item",
  className = ""
}) => {
  return (
    <Card className={`mb-6 shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaSearch className="text-[var(--primary)] text-lg" />
          <h2 className="text-lg font-semibold text-[var(--primary)]">{title}</h2>
        </div>
        
        <div className={`grid grid-cols-1 gap-4 ${onCreateNew ? 'md:grid-cols-' + (filters.length + 2) : 'md:grid-cols-' + (filters.length + 1)}`}>
          <TextField
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            fullWidth
          />
          
          {filters.map((filter) => (
            <FormControl key={filter.name} size="small" fullWidth>
              <InputLabel>{filter.label}</InputLabel>
              <Select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                label={filter.label}
              >
                <MenuItem value="all">Todos</MenuItem>
                {filter.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}

          {onCreateNew && (
            <Button
              variant="contained"
              startIcon={<FaPlus />}
              onClick={onCreateNew}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'var(--primary-dark)',
                },
              }}
            >
              {createButtonText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
