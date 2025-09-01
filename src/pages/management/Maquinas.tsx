import React, { useState } from "react";
import { machinesData, employeesData } from '../../shared/sharedData';
import type { Machine } from '../../shared/sharedData';
import { Header, PageHeader } from '../../components/layout';
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Chip, Avatar } from '@mui/material';
import { FaIndustry, FaCog, FaTools, FaPlus, FaEye, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import CUDModal from '../../components/forms/CUDModal';
import type { FormFieldConfig } from '../../components/forms/CUDModal';

const Maquinas: React.FC = () => {
  console.log('Maquinas component is rendering');

  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMachineForEdit, setSelectedMachineForEdit] = useState<Machine | null>(null);

  // Configuração dos campos do formulário
  const machineFields: FormFieldConfig[] = [
    {
      name: 'name',
      label: 'Nome da Máquina',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome da máquina'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Operando', label: 'Operando' },
        { value: 'Parada', label: 'Parada' },
        { value: 'Manutenção', label: 'Manutenção' }
      ]
    },
    {
      name: 'oee',
      label: 'OEE (%)',
      type: 'number',
      required: true,
      placeholder: 'Digite o OEE'
    },
    {
      name: 'throughput',
      label: 'Vazão (un/h)',
      type: 'number',
      required: true,
      placeholder: 'Digite a vazão'
    },
    {
      name: 'image',
      label: 'URL da Imagem',
      type: 'url',
      required: false,
      placeholder: 'Digite a URL da imagem'
    }
  ];

  const handleSubmitMachine = (data: Record<string, any>) => {
    console.log('Dados da máquina:', data);
    if (formMode === 'create') {
      console.log('Criando nova máquina');
    } else {
      console.log('Editando máquina:', selectedMachineForEdit?.name);
    }
    setShowFormModal(false);
  };

  const handleOpenDetails = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedMachine(null);
  };

  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedMachineForEdit(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (machine: Machine) => {
    setFormMode('edit');
    setSelectedMachineForEdit(machine);
    setShowFormModal(true);
  };

  const handleDeleteMachine = () => {
    if (selectedMachine) {
      console.log('Deletando máquina:', selectedMachine.name);
      setSelectedMachine(null);
      setShowDetailsModal(false);
    }
  };

  const totalMachines = machinesData.length;
  const operatingMachines = machinesData.filter(m => m.status === 'Operando').length;
  const maintenanceMachines = machinesData.filter(m => m.status === 'Manutenção').length;

  const averageOEE = Math.round(machinesData.reduce((sum, m) => sum + m.oee, 0) / machinesData.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operando': return 'success';
      case 'Parada': return 'error';
      case 'Manutenção': return 'warning';
      default: return 'default';
    }
  };

  const getMachineIcon = (name: string) => {
    if (name.includes('Corte')) return <FaIndustry />;
    if (name.includes('Prensa')) return <FaCog />;
    if (name.includes('Injetora')) return <FaTools />;
    if (name.includes('Montadora')) return <FaIndustry />;
    return <FaIndustry />;
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10]">
        <div className="w-full max-w-7xl">
          <PageHeader 
            title="Máquinas"
            subtitle="Monitoramento e controle das máquinas de produção"
          />

          <div className="flex justify-end mb-8">
            <Button
              variant="contained"
              startIcon={<FaPlus />}
              onClick={handleOpenCreate}
              sx={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'var(--primary-dark)',
                },
              }}
            >
              Adicionar Máquina
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total de Máquinas</p>
                    <p className="text-3xl font-bold text-blue-800">{totalMachines}</p>
                    <p className="text-xs text-blue-600">Todas operacionais</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaIndustry className="text-blue-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Em Operação</p>
                    <p className="text-3xl font-bold text-green-800">{operatingMachines}</p>
                    <p className="text-xs text-green-600">{Math.round((operatingMachines/totalMachines)*100)}% ativas</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Em Manutenção</p>
                    <p className="text-3xl font-bold text-orange-800">{maintenanceMachines}</p>
                    <p className="text-xs text-orange-600">Preventiva</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaTools className="text-orange-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">OEE Médio</p>
                    <p className="text-3xl font-bold text-yellow-800">{averageOEE}%</p>
                    <p className="text-xs text-yellow-600">+3.2% vs mês anterior</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid de Máquinas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {machinesData.map((machine) => {
  const operadores = employeesData.filter(emp => emp.machineIds && emp.machineIds.includes(machine.id));
  return (
    <Card
      key={machine.id}
      className="bg-white rounded-2xl shadow-lg p-0 flex flex-col items-stretch transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-gray-100 group"
      onClick={() => handleOpenDetails(machine)}
    >
      <div className="relative flex flex-col items-center pt-6 pb-2 px-6 bg-gradient-to-t from-white via-gray-50 to-[var(--accent)/10] rounded-t-2xl">
        <Avatar
          src={machine.image}
          className={`w-20 h-20 border-4 shadow-lg mb-2 ${
            machine.status === 'Operando' ? 'border-green-400' :
            machine.status === 'Manutenção' ? 'border-yellow-400' :
            machine.status === 'Parada' ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        <Chip 
          label={machine.status}
          color={getStatusColor(machine.status) as any}
          size="small"
          className="absolute top-4 right-4"
        />
      </div>
      <div className="flex flex-col items-center px-6 pt-2 pb-4">
        <h3 className="text-lg font-bold text-[var(--primary)] mb-1 flex items-center gap-2">
          {getMachineIcon(machine.name)} {machine.name}
        </h3>
        <div className="flex flex-wrap gap-1 justify-center mb-1">
          {operadores.length > 0 ? operadores.map(emp => (
            <Chip key={emp.id} label={emp.name.split(' ')[0]} avatar={<Avatar src={emp.photo} />} size="small" />
          )) : <span className="text-xs text-[var(--muted)]">Sem operador</span>}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-6 pb-4 gap-3">
        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-[var(--muted)]">OEE</span>
          <span className="font-bold text-[var(--primary)] text-lg">{machine.oee}%</span>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] h-1 rounded-full transition-all duration-300"
              style={{ width: `${machine.oee}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-[10px] text-[var(--muted)]">Vazão</span>
          <span className="font-bold text-[var(--primary)] text-lg">{machine.throughput} un/h</span>
        </div>
      </div>
      <div className="flex gap-2 px-6 pb-6 w-full mt-auto">
        <Button
          variant="outlined"
          startIcon={<FaEye />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDetails(machine);
          }}
          sx={{
            color: 'var(--primary)',
            borderColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderColor: 'var(--primary)',
            },
          }}
          fullWidth
        >
          Ver
        </Button>
        <Button
          variant="outlined"
          startIcon={<FaEdit />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEdit(machine);
          }}
          sx={{
            color: 'var(--primary)',
            borderColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderColor: 'var(--primary)',
            },
          }}
          fullWidth
        >
          Editar
        </Button>
      </div>
    </Card>
  );
})}
          </div>
        </div>

        <Dialog
          open={showDetailsModal}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
        >
          {selectedMachine && (
            <>
              <DialogTitle className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="text-white text-lg">
                      {getMachineIcon(selectedMachine.name)}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMachine.name}</h2>
                    <p className="text-sm opacity-90">Detalhes da Máquina</p>
                  </div>
                </div>
              </DialogTitle>

              <DialogContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--primary)]">Operadores/Funcionários</h4>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        try {
                          // @ts-ignore
                          const { employeesData } = require('./Funcionarios');
                          const operadores = employeesData.filter((emp: any) => emp.machineIds.includes(selectedMachine.id));
                          if (operadores.length === 0) return <span className="text-sm text-[var(--muted)]">Nenhum funcionário associado.</span>;
                          return operadores.map((emp: any) => (
                            <Chip key={emp.id} label={emp.name} avatar={<Avatar src={emp.photo} />} />
                          ));
                        } catch (e) {
                          return <span className="text-sm text-[var(--muted)]">Funcionários não encontrados.</span>;
                        }
                      })()}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={selectedMachine.image}
                        className="w-24 h-24 border-4 border-[var(--primary)]"
                      />
                      <div>
  <h3 className="text-xl font-bold text-[var(--text)] mb-2">
  {selectedMachine.name}
</h3>
<h5 className="text-md font-semibold text-[var(--primary)] mb-1">Operadores / Funcionários</h5>
<div className="flex flex-wrap gap-2 mb-2">
  {(() => {
    const operadores = employeesData.filter(emp => emp.machineIds && emp.machineIds.includes(selectedMachine.id));
    if (operadores.length === 0) return <span className="text-sm text-[var(--muted)]">Nenhum operador associado.</span>;
    return operadores.map(emp => (
      <Chip key={emp.id} label={emp.name} avatar={<Avatar src={emp.photo} />} />
    ));
  })()}
</div>
<Chip 
  label={selectedMachine.status}
  color={getStatusColor(selectedMachine.status) as any}
/>
</div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FaChartLine className="text-[var(--primary)]" />
                          <span className="text-sm font-medium text-[var(--text)]">OEE (Overall Equipment Effectiveness)</span>
                        </div>
                        <p className="text-sm text-[var(--muted)]">{selectedMachine.oee}%</p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FaIndustry className="text-[var(--primary)]" />
                          <span className="text-sm font-medium text-[var(--text)]">Vazão</span>
                        </div>
                        <p className="text-sm text-[var(--muted)]">{selectedMachine.throughput} unidades/hora</p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCog className="text-[var(--primary)]" />
                          <span className="text-sm font-medium text-[var(--text)]">Status</span>
                        </div>
                        <p className="text-sm text-[var(--muted)]">{selectedMachine.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--primary)]">Gráfico de Performance</h4>
<div className="flex flex-wrap gap-2 mb-2">
  {(() => {
    const operadores = employeesData.filter(emp => emp.machineIds && emp.machineIds.includes(selectedMachine.id));
    if (operadores.length === 0) return <span className="text-sm text-[var(--muted)]">Nenhum operador associado.</span>;
    return operadores.map(emp => (
      <Chip key={emp.id} label={emp.name} avatar={<Avatar src={emp.photo} />} />
    ));
  })()}
</div>
                    <div className="h-48 bg-gradient-to-br from-[var(--accent)] to-white rounded-lg flex items-center justify-center border border-gray-100">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaChartLine className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Performance da Máquina</h3>
                        <p className="text-sm text-[var(--muted)]">Gráfico de eficiência e produção</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-[var(--primary)]">Alertas Recentes</h4>
                      <div className="space-y-2">
                        {selectedMachine.status === 'Parada' && (
                          <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
                            <FaExclamationTriangle className="text-red-500" />
                            <span className="text-sm text-red-700">Máquina parada - Verificar equipamento</span>
                          </div>
                        )}
                        {selectedMachine.status === 'Manutenção' && (
                          <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                            <FaTools className="text-yellow-500" />
                            <span className="text-sm text-yellow-700">Manutenção em andamento</span>
                          </div>
                        )}
                        {selectedMachine.status === 'Operando' && (
                          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-sm text-green-700">Máquina operando normalmente</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>

              <DialogActions className="p-6">
                <div className="flex gap-2 w-full justify-end">
                  <Button
                    variant="contained"
                    startIcon={<FaEdit />}
                    size="small"
                    onClick={() => handleOpenEdit(selectedMachine)}
                    sx={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'var(--primary-dark)',
                      },
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FaTrash />}
                    size="small"
                    onClick={handleDeleteMachine}
                    sx={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#b91c1c',
                      },
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Modal de Formulário */}
                  <CUDModal
            open={showFormModal}
            onClose={() => setShowFormModal(false)}
            mode={formMode}
            title={formMode === 'create' ? 'Adicionar Nova Máquina' : 'Editar Máquina'}
            fields={machineFields}
            initialData={selectedMachineForEdit || {}}
            onSubmit={handleSubmitMachine}
            entityType="machine"
          />
      </main>
    </div>
  );
};

export default Maquinas;
