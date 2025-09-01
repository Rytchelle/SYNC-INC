import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaCog, FaWrench, FaFire } from 'react-icons/fa';
import type { MaintenanceRecord } from '../../../shared/maintenanceData';

interface MaintenanceDetailModalProps {
  open: boolean;
  onClose: () => void;
  maintenance: MaintenanceRecord | null;
}

const MaintenanceDetailModal: React.FC<MaintenanceDetailModalProps> = ({
  open,
  onClose,
  maintenance
}) => {
  if (!maintenance) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'preventive': return <FaCog className="text-blue-600" />;
      case 'corrective': return <FaWrench className="text-yellow-600" />;
      case 'emergency': return <FaFire className="text-red-600" />;
      default: return <FaCog />;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="flex items-center gap-3">
          {getTypeIcon(maintenance.type)}
          <div>
            <h2 className="text-xl font-semibold">{maintenance.title}</h2>
            <p className="text-sm opacity-90">{maintenance.machineName}</p>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-[var(--text)] mb-2">Descrição</h4>
              <p className="text-sm text-[var(--muted)]">{maintenance.description}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-[var(--text)] mb-2">Técnico Responsável</h4>
              <p className="text-sm text-[var(--muted)]">{maintenance.technician}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-[var(--text)] mb-2">Informações</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Data Agendada:</span>
                  <span>{new Date(maintenance.scheduledDate).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Duração Estimada:</span>
                  <span>{maintenance.estimatedDuration}h</span>
                </div>
                {maintenance.cost && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Custo:</span>
                    <span>R$ {maintenance.cost.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="p-6">
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaintenanceDetailModal;
