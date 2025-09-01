// Dados de manutenções do sistema

export interface MaintenanceRecord {
  id: number;
  machineId: number;
  machineName: string;
  type: 'preventive' | 'corrective' | 'emergency';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  estimatedDuration: number; // em horas
  actualDuration?: number; // em horas
  technician: string;
  cost?: number;
  parts?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceStats {
  totalMaintenance: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  overdue: number;
  preventiveCount: number;
  correctiveCount: number;
  emergencyCount: number;
  averageCost: number;
  averageDuration: number;
}

export const maintenanceData: MaintenanceRecord[] = [
  {
    id: 1,
    machineId: 1,
    machineName: 'Corte Laser',
    type: 'preventive',
    status: 'scheduled',
    priority: 'medium',
    title: 'Manutenção Preventiva Mensal',
    description: 'Limpeza dos componentes ópticos, verificação do sistema de refrigeração e calibração dos eixos',
    scheduledDate: '2024-01-20T09:00:00',
    estimatedDuration: 4,
    technician: 'Carlos Silva',
    cost: 850,
    parts: ['Filtro de ar', 'Óleo hidráulico'],
    createdAt: '2024-01-10T08:00:00',
    updatedAt: '2024-01-10T08:00:00'
  },
  {
    id: 2,
    machineId: 2,
    machineName: 'Prensa Hidráulica',
    type: 'corrective',
    status: 'in_progress',
    priority: 'high',
    title: 'Reparo do Sistema Hidráulico',
    description: 'Vazamento identificado no cilindro principal. Necessária substituição dos vedantes',
    scheduledDate: '2024-01-18T14:00:00',
    estimatedDuration: 6,
    actualDuration: 4,
    technician: 'Roberto Santos',
    cost: 1200,
    parts: ['Kit de vedantes', 'Fluido hidráulico'],
    notes: 'Vazamento mais extenso que o previsto inicialmente',
    createdAt: '2024-01-17T10:30:00',
    updatedAt: '2024-01-18T16:00:00'
  },
  {
    id: 3,
    machineId: 3,
    machineName: 'Injetora Plástica',
    type: 'emergency',
    status: 'completed',
    priority: 'critical',
    title: 'Parada de Emergência - Superaquecimento',
    description: 'Sistema de aquecimento apresentou falha crítica causando superaquecimento',
    scheduledDate: '2024-01-15T11:30:00',
    completedDate: '2024-01-15T18:45:00',
    estimatedDuration: 8,
    actualDuration: 7.25,
    technician: 'Ana Costa',
    cost: 2500,
    parts: ['Resistência de aquecimento', 'Sensor de temperatura', 'Controlador PID'],
    notes: 'Substituição completa do sistema de controle de temperatura',
    createdAt: '2024-01-15T11:30:00',
    updatedAt: '2024-01-15T19:00:00'
  },
  {
    id: 4,
    machineId: 4,
    machineName: 'Montadora Automática',
    type: 'preventive',
    status: 'completed',
    priority: 'low',
    title: 'Lubrificação e Ajustes',
    description: 'Lubrificação geral dos componentes móveis e ajuste de tensões',
    scheduledDate: '2024-01-12T08:00:00',
    completedDate: '2024-01-12T11:30:00',
    estimatedDuration: 3,
    actualDuration: 3.5,
    technician: 'João Oliveira',
    cost: 300,
    parts: ['Graxa industrial', 'Óleo lubrificante'],
    notes: 'Manutenção realizada conforme cronograma',
    createdAt: '2024-01-05T09:00:00',
    updatedAt: '2024-01-12T12:00:00'
  },
  {
    id: 5,
    machineId: 5,
    machineName: 'Torno CNC',
    type: 'corrective',
    status: 'overdue',
    priority: 'high',
    title: 'Substituição do Fuso Principal',
    description: 'Fuso apresentando vibração excessiva e ruído anormal',
    scheduledDate: '2024-01-16T13:00:00',
    estimatedDuration: 12,
    technician: 'Pedro Lima',
    cost: 4500,
    parts: ['Fuso principal', 'Rolamentos', 'Kit de ferramentas'],
    notes: 'Aguardando chegada das peças',
    createdAt: '2024-01-10T14:00:00',
    updatedAt: '2024-01-17T09:00:00'
  },
  {
    id: 6,
    machineId: 6,
    machineName: 'Fresa Industrial',
    type: 'preventive',
    status: 'scheduled',
    priority: 'medium',
    title: 'Revisão Trimestral',
    description: 'Inspeção completa, troca de filtros e verificação de alinhamento',
    scheduledDate: '2024-01-25T10:00:00',
    estimatedDuration: 5,
    technician: 'Maria Fernandes',
    cost: 950,
    parts: ['Filtros diversos', 'Correias'],
    createdAt: '2024-01-08T15:00:00',
    updatedAt: '2024-01-08T15:00:00'
  },
  {
    id: 7,
    machineId: 7,
    machineName: 'Soldadora Robótica',
    type: 'corrective',
    status: 'scheduled',
    priority: 'medium',
    title: 'Calibração do Sistema de Soldagem',
    description: 'Ajuste dos parâmetros de soldagem e substituição do bico',
    scheduledDate: '2024-01-22T15:00:00',
    estimatedDuration: 3,
    technician: 'Lucas Martins',
    cost: 600,
    parts: ['Bico de soldagem', 'Gás de proteção'],
    createdAt: '2024-01-18T11:00:00',
    updatedAt: '2024-01-18T11:00:00'
  },
  {
    id: 8,
    machineId: 8,
    machineName: 'Empacotadora',
    type: 'preventive',
    status: 'completed',
    priority: 'low',
    title: 'Limpeza e Inspeção Semanal',
    description: 'Limpeza dos sensores e verificação do sistema de embalagem',
    scheduledDate: '2024-01-14T16:00:00',
    completedDate: '2024-01-14T17:30:00',
    estimatedDuration: 2,
    actualDuration: 1.5,
    technician: 'Sandra Costa',
    cost: 150,
    parts: ['Material de limpeza'],
    notes: 'Todos os sistemas funcionando perfeitamente',
    createdAt: '2024-01-13T09:00:00',
    updatedAt: '2024-01-14T18:00:00'
  }
];

export const maintenanceStats: MaintenanceStats = {
  totalMaintenance: maintenanceData.length,
  scheduled: maintenanceData.filter(m => m.status === 'scheduled').length,
  inProgress: maintenanceData.filter(m => m.status === 'in_progress').length,
  completed: maintenanceData.filter(m => m.status === 'completed').length,
  overdue: maintenanceData.filter(m => m.status === 'overdue').length,
  preventiveCount: maintenanceData.filter(m => m.type === 'preventive').length,
  correctiveCount: maintenanceData.filter(m => m.type === 'corrective').length,
  emergencyCount: maintenanceData.filter(m => m.type === 'emergency').length,
  averageCost: Math.round(maintenanceData.reduce((sum, m) => sum + (m.cost || 0), 0) / maintenanceData.length),
  averageDuration: Math.round((maintenanceData.reduce((sum, m) => sum + (m.actualDuration || m.estimatedDuration), 0) / maintenanceData.length) * 10) / 10
};

export const availableTechnicians = [
  'Carlos Silva',
  'Roberto Santos', 
  'Ana Costa',
  'João Oliveira',
  'Pedro Lima',
  'Maria Fernandes',
  'Lucas Martins',
  'Sandra Costa'
];

export const commonParts = [
  'Filtro de ar',
  'Óleo hidráulico',
  'Kit de vedantes',
  'Fluido hidráulico',
  'Resistência de aquecimento',
  'Sensor de temperatura',
  'Controlador PID',
  'Graxa industrial',
  'Óleo lubrificante',
  'Rolamentos',
  'Correias',
  'Filtros diversos',
  'Bico de soldagem',
  'Gás de proteção',
  'Material de limpeza'
];
