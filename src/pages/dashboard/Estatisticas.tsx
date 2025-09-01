import React, { useState } from 'react';
import { Header, PageHeader } from '../../components/layout';
import { Card, CardContent, Button, Chip } from '@mui/material';
import {
  FaChartLine, FaCog, FaUsers, FaIndustry, FaPlus, FaTachometerAlt,
  FaBuilding
} from 'react-icons/fa';
import CUDModal from '../../components/forms/CUDModal';
import type { FormFieldConfig } from '../../components/forms/CUDModal';

import FilterPanel from '../../components/forms/FilterPanel';
import MetricsCard from '../../components/data/MetricsCard';

interface MachineOEE {
  id: number;
  machineId: number;
  machineName: string;
  date: string;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  downtime: number;
  production: number;
  target: number;
  status: 'operating' | 'maintenance' | 'stopped';
}

interface EmployeeEfficiency {
  id: number;
  employeeId: number;
  employeeName: string;
  department: string;
  date: string;
  efficiency: number;
  productivity: number;
  quality: number;
  attendance: number;
  overtime: number;
  status: 'active' | 'absent' | 'overtime';
}

interface DepartmentMetrics {
  id: number;
  departmentId: number;
  departmentName: string;
  date: string;
  efficiency: number;
  production: number;
  quality: number;
  cost: number;
  employees: number;
  status: 'operational' | 'maintenance' | 'closed';
}

const Estatisticas: React.FC = () => {
  console.log('Estatisticas component is rendering');

  const [showOEEModal, setShowOEEModal] = useState(false);
  const [showEfficiencyModal, setShowEfficiencyModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  // The 'selectedMetric' and 'metricType' state variables were not being used, so they have been removed.
  // const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const machineOEEData: MachineOEE[] = [
    {
      id: 1,
      machineId: 1,
      machineName: 'Máquina de Corte CNC',
      date: '2024-01-15',
      availability: 95.2,
      performance: 87.8,
      quality: 98.5,
      oee: 82.1,
      downtime: 2.3,
      production: 1250,
      target: 1400,
      status: 'operating'
    },
    {
      id: 2,
      machineId: 2,
      machineName: 'Prensa Hidráulica',
      date: '2024-01-15',
      availability: 88.5,
      performance: 92.1,
      quality: 96.8,
      oee: 79.2,
      downtime: 5.2,
      production: 890,
      target: 1000,
      status: 'maintenance'
    }
  ];

  const employeeEfficiencyData: EmployeeEfficiency[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'João Silva',
      department: 'Produção',
      date: '2024-01-15',
      efficiency: 94.2,
      productivity: 88.5,
      quality: 96.8,
      attendance: 100,
      overtime: 2.5,
      status: 'active'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Maria Santos',
      department: 'Qualidade',
      date: '2024-01-15',
      efficiency: 91.8,
      productivity: 85.2,
      quality: 98.5,
      attendance: 100,
      overtime: 1.8,
      status: 'active'
    }
  ];

  const departmentMetricsData: DepartmentMetrics[] = [
    {
      id: 1,
      departmentId: 1,
      departmentName: 'Produção',
      date: '2024-01-15',
      efficiency: 92.5,
      production: 2500,
      quality: 97.2,
      cost: 45000,
      employees: 25,
      status: 'operational'
    },
    {
      id: 2,
      departmentId: 2,
      departmentName: 'Qualidade',
      date: '2024-01-15',
      efficiency: 89.8,
      production: 1200,
      quality: 99.1,
      cost: 28000,
      employees: 12,
      status: 'operational'
    }
  ];


const oeeFields: FormFieldConfig[] = [
    {
      name: 'machineId',
      label: 'Máquina',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: 'Máquina de Corte CNC' },
        { value: '2', label: 'Prensa Hidráulica' },
        { value: '3', label: 'Máquina de Solda' }
      ]
    },
    {
      name: 'date',
      label: 'Data',
      type: 'text',
      required: true,
      placeholder: 'YYYY-MM-DD'
    },
    {
      name: 'availability',
      label: 'Disponibilidade (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 95.2'
    },
    {
      name: 'performance',
      label: 'Performance (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 87.8'
    },
    {
      name: 'quality',
      label: 'Qualidade (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 98.5'
    },
    {
      name: 'downtime',
      label: 'Tempo de Parada (h)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 2.3'
    },
    {
      name: 'production',
      label: 'Produção Real (un)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 1250'
    },
    {
      name: 'target',
      label: 'Meta de Produção (un)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 1400'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'operating', label: 'Operando' },
        { value: 'maintenance', label: 'Manutenção' },
        { value: 'stopped', label: 'Parada' }
      ]
    }
  ];

  const efficiencyFields: FormFieldConfig[] = [
    {
      name: 'employeeId',
      label: 'Funcionário',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: 'João Silva' },
        { value: '2', label: 'Maria Santos' },
        { value: '3', label: 'Pedro Costa' }
      ]
    },
    {
      name: 'date',
      label: 'Data',
      type: 'text',
      required: true,
      placeholder: 'YYYY-MM-DD'
    },
    {
      name: 'efficiency',
      label: 'Eficiência (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 94.2'
    },
    {
      name: 'productivity',
      label: 'Produtividade (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 88.5'
    },
    {
      name: 'quality',
      label: 'Qualidade (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 96.8'
    },
    {
      name: 'attendance',
      label: 'Presença (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 100'
    },
    {
      name: 'overtime',
      label: 'Hora Extra (h)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 2.5'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'active', label: 'Ativo' },
        { value: 'absent', label: 'Ausente' },
        { value: 'overtime', label: 'Hora Extra' }
      ]
    }
  ];

  const departmentMetricsFields: FormFieldConfig[] = [
    {
      name: 'departmentId',
      label: 'Departamento',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: 'Produção' },
        { value: '2', label: 'Qualidade' },
        { value: '3', label: 'Logística' }
      ]
    },
    {
      name: 'date',
      label: 'Data',
      type: 'text',
      required: true,
      placeholder: 'YYYY-MM-DD'
    },
    {
      name: 'efficiency',
      label: 'Eficiência (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 92.5'
    },
    {
      name: 'production',
      label: 'Produção (un)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 2500'
    },
    {
      name: 'quality',
      label: 'Qualidade (%)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 97.2'
    },
    {
      name: 'cost',
      label: 'Custo (R$)',
      type: 'number',
      required: true,
      placeholder: 'Ex: 45000'
    },
    {
      name: 'employees',
      label: 'Funcionários',
      type: 'number',
      required: true,
      placeholder: 'Ex: 25'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'operational', label: 'Operacional' },
        { value: 'maintenance', label: 'Manutenção' },
        { value: 'closed', label: 'Fechado' }
      ]
    }
  ];

  const handleSubmitOEE = (data: Record<string, any>) => {
    console.log('Dados OEE:', data);
  };

  const handleSubmitEfficiency = (data: Record<string, any>) => {
    console.log('Dados Eficiência:', data);
  };

  const handleSubmitDepartmentMetrics = (data: Record<string, any>) => {
    console.log('Dados Departamento:', data);
  };

  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'operating': return 'Operando';
      case 'maintenance': return 'Manutenção';
      case 'stopped': return 'Parada';
      case 'active': return 'Ativo';
      case 'absent': return 'Ausente';
      case 'overtime': return 'Hora Extra';
      case 'operational': return 'Operacional';
      case 'closed': return 'Fechado';
      default: return status;
    }
  };
  
  // The 'getOEEStatus' and 'getEfficiencyStatus' functions were not used, so they have been removed.
  // const getOEEStatus = (oee: number) => {
  //   if (oee >= 85) return { color: 'success', icon: <FaCheckCircle /> };
  //   if (oee >= 70) return { color: 'warning', icon: <FaExclamationTriangle /> };
  //   return { color: 'error', icon: <FaExclamationTriangle /> };
  // };

  // const getEfficiencyStatus = (efficiency: number) => {
  //   if (efficiency >= 90) return { color: 'success', icon: <FaArrowUp /> };
  //   if (efficiency >= 75) return { color: 'warning', icon: <FaThermometerHalf /> };
  //   return { color: 'error', icon: <FaArrowDown /> };
  // };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10]">
        <div className="w-full max-w-7xl">
          <PageHeader 
            title="Estatísticas e Métricas"
            subtitle="Cadastro e acompanhamento de indicadores de performance"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">OEE Médio</p>
                    <p className="text-3xl font-bold text-blue-800">82.1%</p>
                    <p className="text-xs text-blue-600">+2.3% este mês</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaTachometerAlt className="text-blue-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Eficiência Média</p>
                    <p className="text-3xl font-bold text-green-800">91.2%</p>
                    <p className="text-xs text-green-600">+1.8% este mês</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-green-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Produção Total</p>
                    <p className="text-3xl font-bold text-purple-800">12.5K</p>
                    <p className="text-xs text-purple-600">+8.5% este mês</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaIndustry className="text-purple-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Qualidade Média</p>
                    <p className="text-3xl font-bold text-orange-800">97.8%</p>
                    <p className="text-xs text-orange-600">+0.5% este mês</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-orange-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaPlus className="text-[var(--primary)] text-lg" />
                <h2 className="text-lg font-semibold text-[var(--primary)]">Cadastrar Métricas</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="contained"
                  startIcon={<FaCog />}
                  onClick={() => setShowOEEModal(true)}
                  sx={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'var(--primary-dark)',
                    },
                  }}
                >
                  OEE da Máquina
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FaUsers />}
                  onClick={() => setShowEfficiencyModal(true)}
                  sx={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'var(--primary-dark)',
                    },
                  }}
                >
                  Eficiência do Funcionário
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FaBuilding />}
                  onClick={() => setShowDepartmentModal(true)}
                  sx={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'var(--primary-dark)',
                    },
                  }}
                >
                  Métricas do Departamento
                </Button>
              </div>
            </CardContent>
          </Card>

          <FilterPanel
            title="Filtros Avançados"
            filters={{
              date: {
                label: "Data",
                value: filterDate,
                onChange: setFilterDate
              },
              status: {
                label: "Status",
                value: filterStatus,
                options: [
                  { value: 'all', label: 'Todos' },
                  { value: 'operating', label: 'Operando' },
                  { value: 'maintenance', label: 'Manutenção' },
                  { value: 'stopped', label: 'Parada' },
                  { value: 'active', label: 'Ativo' },
                  { value: 'absent', label: 'Ausente' },
                  { value: 'operational', label: 'Operacional' },
                  { value: 'closed', label: 'Fechado' }
                ],
                onChange: setFilterStatus
              },
              department: {
                label: "Departamento",
                value: filterDepartment,
                options: [
                  { value: 'all', label: 'Todos' },
                  { value: 'production', label: 'Produção' },
                  { value: 'quality', label: 'Qualidade' },
                  { value: 'logistics', label: 'Logística' },
                  { value: 'maintenance', label: 'Manutenção' }
                ],
                onChange: setFilterDepartment
              }
            }}
            onFilter={() => {
              console.log('Aplicando filtros:', { filterDate, filterStatus, filterDepartment });
            }}
            onClear={() => {
              setFilterDate('');
              setFilterStatus('all');
              setFilterDepartment('all');
            }}
            className="mb-6"
          />

          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-white">
                    <FaCog className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--primary)]">OEE das Máquinas</h2>
                    <p className="text-sm text-gray-600">Indicadores de eficiência operacional</p>
                  </div>
                </div>
                <Chip label={`${machineOEEData.length} registros`} color="primary" size="small" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {machineOEEData.map((oee) => {
                  const oeeStatus = oee.oee >= 85 ? 'success' : oee.oee >= 70 ? 'warning' : 'error';
                  return (
                    <MetricsCard
                      key={oee.id}
                      title={oee.machineName}
                      value={oee.oee}
                      unit="%"
                      status={oeeStatus}
                      icon={<FaCog />}
                      metrics={[
                        { label: 'Disponibilidade', value: oee.availability, unit: '%' },
                        { label: 'Performance', value: oee.performance, unit: '%' },
                        { label: 'Qualidade', value: oee.quality, unit: '%' },
                        { label: 'Produção', value: `${oee.production}/${oee.target}` }
                      ]}
                      footer={{
                        status: getStatusText(oee.status),
                        date: oee.date
                      }}
                      onClick={() => console.log('Clicou na máquina:', oee.machineName)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-white">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--primary)]">Eficiência dos Funcionários</h2>
                    <p className="text-sm text-gray-600">Indicadores de performance individual</p>
                  </div>
                </div>
                <Chip label={`${employeeEfficiencyData.length} registros`} color="primary" size="small" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employeeEfficiencyData.map((efficiency) => {
                  const efficiencyStatus = efficiency.efficiency >= 90 ? 'success' : efficiency.efficiency >= 75 ? 'warning' : 'error';
                  return (
                    <MetricsCard
                      key={efficiency.id}
                      title={efficiency.employeeName}
                      subtitle={efficiency.department}
                      value={efficiency.efficiency}
                      unit="%"
                      status={efficiencyStatus}
                      icon={<FaUsers />}
                      metrics={[
                        { label: 'Produtividade', value: efficiency.productivity, unit: '%' },
                        { label: 'Qualidade', value: efficiency.quality, unit: '%' },
                        { label: 'Presença', value: efficiency.attendance, unit: '%' },
                        { label: 'Hora Extra', value: efficiency.overtime, unit: 'h' }
                      ]}
                      footer={{
                        status: getStatusText(efficiency.status),
                        date: efficiency.date
                      }}
                      onClick={() => console.log('Clicou no funcionário:', efficiency.employeeName)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-white">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--primary)]">Métricas dos Departamentos</h2>
                    <p className="text-sm text-gray-600">Indicadores de performance departamental</p>
                  </div>
                </div>
                <Chip label={`${departmentMetricsData.length} registros`} color="primary" size="small" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentMetricsData.map((metric) => {
                  const departmentStatus = metric.efficiency >= 90 ? 'success' : metric.efficiency >= 75 ? 'warning' : 'error';
                  return (
                    <MetricsCard
                      key={metric.id}
                      title={metric.departmentName}
                      value={metric.efficiency}
                      unit="%"
                      status={departmentStatus}
                      icon={<FaBuilding />}
                      metrics={[
                        { label: 'Produção', value: metric.production.toLocaleString() },
                        { label: 'Qualidade', value: metric.quality, unit: '%' },
                        { label: 'Custo', value: `R$ ${metric.cost.toLocaleString()}` },
                        { label: 'Funcionários', value: metric.employees }
                      ]}
                      footer={{
                        status: getStatusText(metric.status),
                        date: metric.date
                      }}
                      onClick={() => console.log('Clicou no departamento:', metric.departmentName)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <CUDModal
          open={showOEEModal}
          onClose={() => setShowOEEModal(false)}
          mode="create"
          title="Cadastrar OEE da Máquina"
          fields={oeeFields}
          initialData={{}}
          onSubmit={handleSubmitOEE}
          entityType="department"
        />

        <CUDModal
          open={showEfficiencyModal}
          onClose={() => setShowEfficiencyModal(false)}
          mode="create"
          title="Cadastrar Eficiência do Funcionário"
          fields={efficiencyFields}
          initialData={{}}
          onSubmit={handleSubmitEfficiency}
          entityType="department"
        />

        <CUDModal
          open={showDepartmentModal}
          onClose={() => setShowDepartmentModal(false)}
          mode="create"
          title="Cadastrar Métricas do Departamento"
          fields={departmentMetricsFields}
          initialData={{}}
          onSubmit={handleSubmitDepartmentMetrics}
          entityType="department"
        />
      </main>
    </div>
  );
};

export default Estatisticas;