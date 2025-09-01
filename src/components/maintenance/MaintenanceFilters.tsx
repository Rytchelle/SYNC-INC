import React from 'react';
import { Card, CardContent, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface MaintenanceFiltersProps {
  searchTerm: string;
  filterStatus: string;
  filterType: string;
  filterPriority: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onCreateNew: () => void;
}

const MaintenanceFilters: React.FC<MaintenanceFiltersProps> = ({
  searchTerm,
  filterStatus,
  filterType,
  filterPriority,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onPriorityChange,
  onCreateNew
}) => {
  return (
    <Card className="mb-6 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaSearch className="text-[var(--primary)] text-lg" />
          <h2 className="text-lg font-semibold text-[var(--primary)]">Filtros e Busca</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <TextField
            placeholder="Buscar manutenções..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            fullWidth
          />
          
          <FormControl size="small" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => onStatusChange(e.target.value)} label="Status">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="scheduled">Agendada</MenuItem>
              <MenuItem value="in_progress">Em Andamento</MenuItem>
              <MenuItem value="completed">Concluída</MenuItem>
              <MenuItem value="overdue">Atrasada</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select value={filterType} onChange={(e) => onTypeChange(e.target.value)} label="Tipo">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="preventive">Preventiva</MenuItem>
              <MenuItem value="corrective">Corretiva</MenuItem>
              <MenuItem value="emergency">Emergência</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Prioridade</InputLabel>
            <Select value={filterPriority} onChange={(e) => onPriorityChange(e.target.value)} label="Prioridade">
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="low">Baixa</MenuItem>
              <MenuItem value="medium">Média</MenuItem>
              <MenuItem value="high">Alta</MenuItem>
              <MenuItem value="critical">Crítica</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={onCreateNew}
            sx={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              '&:hover': { backgroundColor: 'var(--primary-dark)' },
            }}
          >
            Nova Manutenção
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceFilters;
