import React from 'react';
import { Card, CardContent, Button, Chip } from '@mui/material';
import { FaCalendarAlt, FaUser, FaClock, FaEye, FaEdit, FaCog, FaWrench, FaFire } from 'react-icons/fa';
import type { MaintenanceRecord } from '../../../shared/maintenanceData';

interface MaintenanceCardProps {
  maintenance: MaintenanceRecord;
  onCardClick: (maintenance: MaintenanceRecord) => void;
  onEdit: (maintenance: MaintenanceRecord) => void;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  maintenance,
  onCardClick,
  onEdit
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'scheduled': return 'default';
      case 'overdue': return 'error';
      case 'cancelled': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'in_progress': return 'Em Andamento';
      case 'scheduled': return 'Agendada';
      case 'overdue': return 'Atrasada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#65a30d';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'preventive': return <FaCog className="text-blue-600" />;
      case 'corrective': return <FaWrench className="text-yellow-600" />;
      case 'emergency': return <FaFire className="text-red-600" />;
      default: return <FaCog />;
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => onCardClick(maintenance)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getTypeIcon(maintenance.type)}
            <div>
              <h3 className="font-semibold text-[var(--text)] mb-1">{maintenance.title}</h3>
              <p className="text-sm text-[var(--muted)]">{maintenance.machineName}</p>
            </div>
          </div>
          <Chip 
            label={getStatusText(maintenance.status)}
            color={getStatusColor(maintenance.status) as any}
            size="small"
          />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <FaCalendarAlt className="text-[var(--primary)]" />
            <span>{new Date(maintenance.scheduledDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <FaUser className="text-[var(--primary)]" />
            <span>{maintenance.technician}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <FaClock className="text-[var(--primary)]" />
            <span>{maintenance.estimatedDuration}h estimadas</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Chip 
            label={maintenance.priority.toUpperCase()}
            size="small"
            sx={{ 
              backgroundColor: getPriorityColor(maintenance.priority),
              color: 'white',
              fontWeight: 'bold'
            }}
          />
          {maintenance.cost && (
            <span className="text-sm font-semibold text-[var(--primary)]">
              R$ {maintenance.cost.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outlined"
            startIcon={<FaEye />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(maintenance);
            }}
            sx={{
              color: 'var(--primary)',
              borderColor: 'var(--primary)',
              '&:hover': {
                backgroundColor: 'var(--primary)',
                color: 'white',
              },
            }}
            fullWidth
          >
            Ver Detalhes
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaEdit />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(maintenance);
            }}
            sx={{
              color: 'var(--primary)',
              borderColor: 'var(--primary)',
              '&:hover': {
                backgroundColor: 'var(--primary)',
                color: 'white',
              },
            }}
            fullWidth
          >
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceCard;
