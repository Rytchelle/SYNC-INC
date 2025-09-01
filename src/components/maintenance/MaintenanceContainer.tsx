import React, { useState } from 'react';
import { MainLayout } from '../layout';
import MaintenanceHeader from './MaintenanceHeader';
import MaintenanceStats from './MaintenanceStats';
import MaintenanceFilters from './MaintenanceFilters';
import MaintenanceGrid from './MaintenanceGrid';
import MaintenanceDetailModal from './MaintenanceDetailModal';
import CUDModal from '../forms/CUDModal';
import { maintenanceData, maintenanceStats, availableTechnicians } from '../../shared/maintenanceData';
import type { MaintenanceRecord } from '../../shared/maintenanceData';
import type { FormFieldConfig } from '../forms/CUDModal';

const MaintenanceContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceRecord | null>(null);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMaintenanceForEdit, setSelectedMaintenanceForEdit] = useState<MaintenanceRecord | null>(null);

  const handleCardClick = (maintenance: MaintenanceRecord) => {
    setSelectedMaintenance(maintenance);
    setShowMaintenanceModal(true);
  };

  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedMaintenanceForEdit(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (maintenance: MaintenanceRecord) => {
    setFormMode('edit');
    setSelectedMaintenanceForEdit(maintenance);
    setShowFormModal(true);
  };

  const handleSubmitMaintenance = (data: Record<string, any>) => {
    console.log('Dados da manutenção:', data);
    setShowFormModal(false);
  };

  const filteredMaintenance = maintenanceData.filter((maintenance) => {
    const matchesSearch = maintenance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          maintenance.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          maintenance.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || maintenance.status === filterStatus;
    const matchesType = filterType === "all" || maintenance.type === filterType;
    const matchesPriority = filterPriority === "all" || maintenance.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const maintenanceFields: FormFieldConfig[] = [
    {
      name: 'title',
      label: 'Título da Manutenção',
      type: 'text',
      required: true,
      placeholder: 'Digite o título da manutenção'
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { value: 'preventive', label: 'Preventiva' },
        { value: 'corrective', label: 'Corretiva' },
        { value: 'emergency', label: 'Emergência' }
      ]
    },
    {
      name: 'priority',
      label: 'Prioridade',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Baixa' },
        { value: 'medium', label: 'Média' },
        { value: 'high', label: 'Alta' },
        { value: 'critical', label: 'Crítica' }
      ]
    },
    {
      name: 'technician',
      label: 'Técnico Responsável',
      type: 'select',
      required: true,
      options: availableTechnicians.map(tech => ({ value: tech, label: tech }))
    }
  ];

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <MaintenanceHeader />
        <MaintenanceStats stats={maintenanceStats} />
        
        <MaintenanceFilters
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          filterType={filterType}
          filterPriority={filterPriority}
          onSearchChange={setSearchTerm}
          onStatusChange={setFilterStatus}
          onTypeChange={setFilterType}
          onPriorityChange={setFilterPriority}
          onCreateNew={handleOpenCreate}
        />

        <MaintenanceGrid
          maintenanceRecords={filteredMaintenance}
          onCardClick={handleCardClick}
          onEdit={handleOpenEdit}
        />

        {/* Modal de Detalhes */}
        <MaintenanceDetailModal
          open={showMaintenanceModal}
          onClose={() => setShowMaintenanceModal(false)}
          maintenance={selectedMaintenance}
        />

        {/* Modal de Formulário */}
        <CUDModal
          open={showFormModal}
          onClose={() => setShowFormModal(false)}
          mode={formMode}
          title={formMode === 'create' ? 'Nova Manutenção' : 'Editar Manutenção'}
          fields={maintenanceFields}
          initialData={selectedMaintenanceForEdit || {}}
          onSubmit={handleSubmitMaintenance}
          entityType="employee"
        />
      </div>
    </MainLayout>
  );
};

export default MaintenanceContainer;
