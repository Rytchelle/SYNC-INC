import React, { useState, useEffect } from 'react';
import { Header } from '../../components/layout';
import { Card, CardContent, Button, Chip } from '@mui/material';
import { 
  FaIndustry, FaUsers, FaChartLine, FaCog, FaTools, FaCheckCircle, 
  FaExclamationTriangle, FaClock, FaBuilding, FaDollarSign, FaArrowUp, 
  FaEye, FaPlus 
} from 'react-icons/fa';
import { BasicChart } from '../../components/charts';

interface DashboardStats {
  totalMachines: number;
  operatingMachines: number;
  maintenanceMachines: number;
  totalEmployees: number;
  activeEmployees: number;
  averageOEE: number;
  totalDepartments: number;
  activeDepartments: number;
  totalBudget: number;
  monthlyProduction: number;
}

interface RecentActivity {
  id: number;
  type: 'machine' | 'employee' | 'department' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const Dashboard: React.FC = () => {
  console.log('Dashboard component is rendering');
  
  const [stats] = useState<DashboardStats>({
    totalMachines: 24,
    operatingMachines: 18,
    maintenanceMachines: 3,
    totalEmployees: 156,
    activeEmployees: 142,
    averageOEE: 87,
    totalDepartments: 8,
    activeDepartments: 7,
    totalBudget: 2500000,
    monthlyProduction: 12500
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'machine',
      title: 'Máquina Corte Laser',
      description: 'Iniciou operação - Turno Manhã',
      time: '2 min atrás',
      status: 'success'
    },
    {
      id: 2,
      type: 'employee',
      title: 'João Silva',
      description: 'Entrou no sistema - Login realizado',
      time: '5 min atrás',
      status: 'info'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Alerta de Manutenção',
      description: 'Prensa Hidráulica precisa de manutenção preventiva',
      time: '15 min atrás',
      status: 'warning'
    },
    {
      id: 4,
      type: 'department',
      title: 'Departamento Produção',
      description: 'Meta mensal atingida - 105% da meta',
      time: '1 hora atrás',
      status: 'success'
    },
    {
      id: 5,
      type: 'machine',
      title: 'Injetora Plástica',
      description: 'Parada programada - Manutenção',
      time: '2 horas atrás',
      status: 'warning'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  const chartData = {
    production: [
      { label: 'Jan', value: 1200, color: '#3B82F6' },
      { label: 'Fev', value: 1350, color: '#10B981' },
      { label: 'Mar', value: 1100, color: '#F59E0B' },
      { label: 'Abr', value: 1600, color: '#EF4444' },
      { label: 'Mai', value: 1450, color: '#8B5CF6' },
      { label: 'Jun', value: 1800, color: '#06B6D4' }
    ],
    departments: [
      { label: 'Produção', value: 45, color: '#3B82F6' },
      { label: 'Manutenção', value: 25, color: '#10B981' },
      { label: 'Qualidade', value: 20, color: '#F59E0B' },
      { label: 'Logística', value: 10, color: '#EF4444' }
    ],
    machines: [
      { label: 'Operando', value: 18, color: '#10B981' },
      { label: 'Manutenção', value: 3, color: '#F59E0B' },
      { label: 'Parada', value: 3, color: '#EF4444' }
    ]
  };

  console.log('Chart data:', chartData);



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'machine': return <FaIndustry />;
      case 'employee': return <FaUsers />;
      case 'department': return <FaBuilding />;
      case 'alert': return <FaExclamationTriangle />;
      default: return <FaChartLine />;
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10]">
        <div className="w-full max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">Dashboard</h1>
            <p className="text-[var(--muted)] mb-4">Visão geral do sistema de produção</p>
            <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <FaClock className="text-[var(--primary)]" />
                <span>{currentTime.toLocaleTimeString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Sistema Operacional</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Máquinas Ativas</p>
                    <p className="text-3xl font-bold text-blue-800">{stats.operatingMachines}/{stats.totalMachines}</p>
                    <p className="text-xs text-blue-600 flex items-center gap-1">
                      <FaArrowUp className="text-green-500" />
                      +2 este mês
                    </p>
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
                    <p className="text-sm font-medium text-green-600">Funcionários Ativos</p>
                    <p className="text-3xl font-bold text-green-800">{stats.activeEmployees}/{stats.totalEmployees}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <FaArrowUp className="text-green-500" />
                      +5 este mês
                    </p>
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
                    <p className="text-sm font-medium text-yellow-600">OEE Médio</p>
                    <p className="text-3xl font-bold text-yellow-800">{stats.averageOEE}%</p>
                    <p className="text-xs text-yellow-600 flex items-center gap-1">
                      <FaArrowUp className="text-green-500" />
                      +3.2% vs mês anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Produção Mensal</p>
                    <p className="text-3xl font-bold text-purple-800">{stats.monthlyProduction.toLocaleString()}</p>
                    <p className="text-xs text-purple-600 flex items-center gap-1">
                      <FaArrowUp className="text-green-500" />
                      +8.5% vs mês anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaCog className="text-purple-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTools className="text-orange-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Em Manutenção</h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">{stats.maintenanceMachines}</p>
                  <p className="text-sm text-[var(--muted)]">Máquinas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBuilding className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Departamentos</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{stats.activeDepartments}/{stats.totalDepartments}</p>
                  <p className="text-sm text-[var(--muted)]">Ativos</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaDollarSign className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Orçamento</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">R$ {(stats.totalBudget / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-[var(--muted)]">Total Anual</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <BasicChart
              title="Produção Mensal"
              data={chartData.production}
              type="bar"
              height={300}
            />
            <BasicChart
              title="Distribuição por Departamento"
              data={chartData.departments}
              type="pie"
              height={300}
            />
            <BasicChart
              title="Status das Máquinas"
              data={chartData.machines}
              type="bar"
              height={300}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[var(--text)]">Atividades Recentes</h2>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FaEye />}
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
                      Ver Todas
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'warning' ? 'bg-yellow-100' :
                          activity.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <div className={`${
                            activity.status === 'success' ? 'text-green-600' :
                            activity.status === 'warning' ? 'text-yellow-600' :
                            activity.status === 'error' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-[var(--text)] mb-1">{activity.title}</h4>
                          <p className="text-sm text-[var(--muted)] mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-[var(--muted)]">{activity.time}</span>
                            <Chip 
                              label={activity.status === 'success' ? 'Sucesso' : 
                                     activity.status === 'warning' ? 'Aviso' : 
                                     activity.status === 'error' ? 'Erro' : 'Info'}
                              color={getStatusColor(activity.status) as any}
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[var(--text)] mb-6">Ações Rápidas</h2>
                  
                  <div className="space-y-4">
                    <Button
                      variant="contained"
                      startIcon={<FaPlus />}
                      fullWidth
                      sx={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'var(--primary-dark)',
                        },
                      }}
                    >
                      Nova Máquina
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<FaUsers />}
                      fullWidth
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
                      Adicionar Funcionário
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<FaBuilding />}
                      fullWidth
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
                      Novo Departamento
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<FaChartLine />}
                      fullWidth
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
                      Gerar Relatório
                    </Button>
                  </div>

                  <div className="mt-8 p-4 bg-[var(--accent)] rounded-lg">
                    <h3 className="font-semibold text-[var(--text)] mb-2">Status do Sistema</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--muted)]">Servidor</span>
                        <Chip label="Online" color="success" size="small" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--muted)]">Banco de Dados</span>
                        <Chip label="Conectado" color="success" size="small" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--muted)]">Backup</span>
                        <Chip label="Atualizado" color="success" size="small" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

