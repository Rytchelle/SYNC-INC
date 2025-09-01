export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  source: string;
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  category: 'system' | 'user' | 'security' | 'maintenance' | 'production';
  message: string;
  source: string;
  userId?: string;
  userName?: string;
  details?: Record<string, any>;
}

export const alertsData: Alert[] = [
  {
    id: '1',
    title: 'Temperatura Alta - Máquina 001',
    message: 'A temperatura da máquina 001 excedeu o limite de 85°C',
    type: 'error',
    priority: 'critical',
    status: 'active',
    source: 'Sensor Térmico',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Manutenção Preventiva Agendada',
    message: 'Manutenção preventiva da máquina 003 agendada para amanhã',
    type: 'info',
    priority: 'medium',
    status: 'acknowledged',
    source: 'Sistema de Manutenção',
    createdAt: '2024-01-15T09:15:00Z',
    acknowledgedAt: '2024-01-15T09:20:00Z',
    assignedTo: 'João Silva'
  },
  {
    id: '3',
    title: 'Falha na Conexão - Sensor 15',
    message: 'Perda de comunicação com sensor de pressão 15',
    type: 'warning',
    priority: 'high',
    status: 'active',
    source: 'Sistema de Monitoramento',
    createdAt: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    title: 'Produção Meta Atingida',
    message: 'Meta de produção diária atingida com 2 horas de antecedência',
    type: 'success',
    priority: 'low',
    status: 'resolved',
    source: 'Sistema de Produção',
    createdAt: '2024-01-15T14:00:00Z',
    resolvedAt: '2024-01-15T14:05:00Z'
  },
  {
    id: '5',
    title: 'Nível Baixo de Matéria Prima',
    message: 'Estoque de matéria prima A abaixo de 20%',
    type: 'warning',
    priority: 'medium',
    status: 'acknowledged',
    source: 'Sistema de Estoque',
    createdAt: '2024-01-15T07:30:00Z',
    acknowledgedAt: '2024-01-15T08:00:00Z',
    assignedTo: 'Maria Santos'
  }
];

export const logsData: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:15Z',
    level: 'error',
    category: 'system',
    message: 'Falha na conexão com banco de dados',
    source: 'DatabaseService',
    details: { error: 'Connection timeout', duration: '30s' }
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:25:42Z',
    level: 'info',
    category: 'user',
    message: 'Usuário realizou login no sistema',
    source: 'AuthService',
    userId: 'user123',
    userName: 'João Silva',
    details: { ip: '192.168.1.100', browser: 'Chrome' }
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:20:33Z',
    level: 'warning',
    category: 'production',
    message: 'Velocidade de produção abaixo do esperado',
    source: 'ProductionMonitor',
    details: { expected: '100 units/h', actual: '85 units/h' }
  },
  {
    id: '4',
    timestamp: '2024-01-15T10:15:18Z',
    level: 'critical',
    category: 'security',
    message: 'Tentativa de acesso não autorizado detectada',
    source: 'SecurityService',
    details: { ip: '10.0.0.50', attempts: 5, blocked: true }
  },
  {
    id: '5',
    timestamp: '2024-01-15T10:10:05Z',
    level: 'info',
    category: 'maintenance',
    message: 'Manutenção preventiva concluída',
    source: 'MaintenanceService',
    userId: 'tech456',
    userName: 'Carlos Oliveira',
    details: { machine: 'M001', duration: '2h 30m' }
  },
  {
    id: '6',
    timestamp: '2024-01-15T10:05:22Z',
    level: 'debug',
    category: 'system',
    message: 'Cache limpo automaticamente',
    source: 'CacheService',
    details: { size: '150MB', items: 1250 }
  }
];

export const alertsStats = {
  total: alertsData.length,
  active: alertsData.filter(a => a.status === 'active').length,
  critical: alertsData.filter(a => a.priority === 'critical').length,
  resolved: alertsData.filter(a => a.status === 'resolved').length
};

export const logsStats = {
  total: logsData.length,
  errors: logsData.filter(l => l.level === 'error' || l.level === 'critical').length,
  warnings: logsData.filter(l => l.level === 'warning').length,
  info: logsData.filter(l => l.level === 'info' || l.level === 'debug').length
};
