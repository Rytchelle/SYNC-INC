import React, { useState } from 'react';
import { Card, CardContent, TextField, FormControl, Select, MenuItem, Button, Chip } from '@mui/material';
import { FaFilter, FaSearch, FaTimes, FaCalendarAlt, FaBuilding, FaCog } from 'react-icons/fa';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
  title?: string;
  filters: {
    date?: {
      label: string;
      value: string;
      onChange: (value: string) => void;
    };
    status?: {
      label: string;
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    department?: {
      label: string;
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    machine?: {
      label: string;
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    employee?: {
      label: string;
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
  };
  onFilter: () => void;
  onClear?: () => void;
  showClearButton?: boolean;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  title = "Filtros",
  filters,
  onFilter,
  onClear,
  showClearButton = true,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Conta filtros ativos
  React.useEffect(() => {
    let count = 0;
    if (filters.date?.value) count++;
    if (filters.status?.value && filters.status && filters.status.value !== 'all') count++;
    if (filters.department?.value && filters.department && filters.department.value !== 'all') count++;
    if (filters.machine?.value && filters.machine && filters.machine.value !== 'all') count++;
    if (filters.employee?.value && filters.employee && filters.employee.value !== 'all') count++;
    setActiveFilters(count);
  }, [filters]);

  const handleClear = () => {
    if (filters.date?.onChange) filters.date && filters.date.onChange('');
    if (filters.status?.onChange) filters.status && filters.status.onChange('all');
    if (filters.department?.onChange) filters.department && filters.department.onChange('all');
    if (filters.machine?.onChange) filters.machine && filters.machine.onChange('all');
    if (filters.employee?.onChange) filters.employee && filters.employee.onChange('all');
    if (onClear) onClear();
  };

  const getFilterIcon = () => {
    if (filters.date) return <FaCalendarAlt />;
    if (filters.department) return <FaBuilding />;
    if (filters.machine) return <FaCog />;
    return <FaFilter />;
  };

  return (
    <Card className={`shadow-lg transition-all duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-lg flex items-center justify-center text-white">
              {getFilterIcon()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--primary)]">{title}</h2>
              {activeFilters > 0 && (
                <p className="text-sm text-gray-600">
                  {activeFilters} filtro{activeFilters > 1 ? 's' : ''} ativo{activeFilters > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeFilters > 0 && showClearButton && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<FaTimes />}
                onClick={handleClear}
                sx={{
                  color: 'var(--primary)',
                  borderColor: 'var(--primary)',
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderColor: 'var(--primary)',
                  },
                }}
              >
                Limpar
              </Button>
            )}
            <Button
              variant="text"
              size="small"
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                color: 'var(--primary)',
                '&:hover': {
                  backgroundColor: 'var(--primary)/10',
                },
              }}
            >
              {isExpanded ? 'Ocultar' : 'Expandir'}
            </Button>
          </div>
        </div>

        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro de Data */}
            {filters.date && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-[var(--primary)]" />
                  {filters.date && filters.date.label}
                </label>
                <TextField
                  type="date"
                  value={filters.date && filters.date.value}
                  onChange={(e) => filters.date && filters.date.onChange(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--primary)',
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--primary)',
                        },
                      },
                    },
                  }}
                />
              </div>
            )}

            {/* Filtro de Status */}
            {filters.status && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaCog className="text-[var(--primary)]" />
                  {filters.status && filters.status.label}
                </label>
                <FormControl size="small" fullWidth>
                  <Select
                    value={filters.status && filters.status.value}
                    onChange={(e) => filters.status && filters.status.onChange(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                      },
                    }}
                  >
                    {filters.status && filters.status.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            {/* Filtro de Departamento */}
            {filters.department && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaBuilding className="text-[var(--primary)]" />
                  {filters.department && filters.department.label}
                </label>
                <FormControl size="small" fullWidth>
                  <Select
                    value={filters.department && filters.department.value}
                    onChange={(e) => filters.department && filters.department.onChange(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                      },
                    }}
                  >
                    {filters.department && filters.department.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            {/* Filtro de Máquina */}
            {filters.machine && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaCog className="text-[var(--primary)]" />
                  {filters.machine && filters.machine.label}
                </label>
                <FormControl size="small" fullWidth>
                  <Select
                    value={filters.machine && filters.machine.value}
                    onChange={(e) => filters.machine && filters.machine.onChange(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                      },
                    }}
                  >
                    {filters.machine && filters.machine.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            {/* Filtro de Funcionário */}
            {filters.employee && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaBuilding className="text-[var(--primary)]" />
                  {filters.employee && filters.employee.label}
                </label>
                <FormControl size="small" fullWidth>
                  <Select
                    value={filters.employee && filters.employee.value}
                    onChange={(e) => filters.employee && filters.employee.onChange(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary)',
                          },
                        },
                      },
                    }}
                  >
                    {filters.employee && filters.employee.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>

          {/* Botão de Filtrar */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="contained"
              startIcon={<FaSearch />}
              onClick={onFilter}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'var(--primary-dark)',
                },
              }}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>

        {/* Chips de Filtros Ativos */}
        {activeFilters > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {filters.date?.value && (
                <Chip
                  label={`Data: ${new Date(filters.date && filters.date.value).toLocaleDateString('pt-BR')}`}
                  size="small"
                  color="primary"
                  onDelete={() => filters.date && filters.date.onChange('')}
                />
              )}
              {(() => {
  const statusFilter = filters.status;
  if (statusFilter && statusFilter.value !== 'all') {
    return (
      <Chip
        label={`Status: ${statusFilter.options.find(opt => opt.value === statusFilter.value)?.label}`}
        size="small"
        color="primary"
        onDelete={() => statusFilter.onChange('all')}
      />
    );
  }
  return null;
})()}
{(() => {
  const departmentFilter = filters.department;
  if (departmentFilter && departmentFilter.value !== 'all') {
    return (
      <Chip
        label={`Departamento: ${departmentFilter.options.find(opt => opt.value === departmentFilter.value)?.label}`}
        size="small"
        color="primary"
        onDelete={() => departmentFilter.onChange('all')}
      />
    );
  }
  return null;
})()}
{(() => {
  const machineFilter = filters.machine;
  if (machineFilter && machineFilter.value !== 'all') {
    return (
      <Chip
        label={`Máquina: ${machineFilter.options.find(opt => opt.value === machineFilter.value)?.label}`}
        size="small"
        color="primary"
        onDelete={() => machineFilter.onChange('all')}
      />
    );
  }
  return null;
})()}
{(() => {
  const employeeFilter = filters.employee;
  if (employeeFilter && employeeFilter.value !== 'all') {
    return (
      <Chip
        label={`Funcionário: ${employeeFilter.options.find(opt => opt.value === employeeFilter.value)?.label}`}
        size="small"
        color="primary"
        onDelete={() => employeeFilter.onChange('all')}
      />
    );
  }
  return null;
})()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterPanel; 