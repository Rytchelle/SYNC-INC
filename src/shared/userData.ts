// Dados de usuários do sistema

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
  photo: string;
}

export const usersData: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'Administrador',
    department: 'TI',
    status: 'Active',
    permissions: ['admin', 'users', 'machines', 'reports', 'settings'],
    lastLogin: '2024-01-15 08:30:00',
    createdAt: '2023-06-15',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'Gerente de Produção',
    department: 'Produção',
    status: 'Active',
    permissions: ['machines', 'employees', 'reports'],
    lastLogin: '2024-01-15 07:45:00',
    createdAt: '2023-08-20',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Carlos Pereira',
    email: 'carlos.pereira@empresa.com',
    role: 'Supervisor',
    department: 'Manutenção',
    status: 'Active',
    permissions: ['machines', 'maintenance'],
    lastLogin: '2024-01-14 16:20:00',
    createdAt: '2023-09-10',
    photo: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    role: 'Analista de Qualidade',
    department: 'Qualidade',
    status: 'Active',
    permissions: ['reports', 'quality'],
    lastLogin: '2024-01-15 09:15:00',
    createdAt: '2023-07-05',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 5,
    name: 'Roberto Lima',
    email: 'roberto.lima@empresa.com',
    role: 'Operador',
    department: 'Produção',
    status: 'Inactive',
    permissions: ['machines'],
    lastLogin: '2024-01-10 14:30:00',
    createdAt: '2023-11-12',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    id: 6,
    name: 'Fernanda Oliveira',
    email: 'fernanda.oliveira@empresa.com',
    role: 'Coordenadora RH',
    department: 'Recursos Humanos',
    status: 'Active',
    permissions: ['employees', 'reports'],
    lastLogin: '2024-01-15 08:00:00',
    createdAt: '2023-05-30',
    photo: 'https://randomuser.me/api/portraits/women/72.jpg'
  },
  {
    id: 7,
    name: 'Pedro Souza',
    email: 'pedro.souza@empresa.com',
    role: 'Técnico',
    department: 'Manutenção',
    status: 'Suspended',
    permissions: ['machines'],
    lastLogin: '2024-01-08 10:45:00',
    createdAt: '2023-10-18',
    photo: 'https://randomuser.me/api/portraits/men/77.jpg'
  },
  {
    id: 8,
    name: 'Lucia Ferreira',
    email: 'lucia.ferreira@empresa.com',
    role: 'Estagiária',
    department: 'TI',
    status: 'Pending',
    permissions: ['reports'],
    lastLogin: 'Nunca logou',
    createdAt: '2024-01-10',
    photo: 'https://randomuser.me/api/portraits/women/28.jpg'
  }
];

export const availableRoles = [
  'Administrador',
  'Gerente de Produção',
  'Supervisor',
  'Analista de Qualidade',
  'Operador',
  'Coordenadora RH',
  'Técnico',
  'Estagiário'
];

export const availablePermissions = [
  { value: 'admin', label: 'Administração Completa' },
  { value: 'users', label: 'Gestão de Usuários' },
  { value: 'machines', label: 'Gestão de Máquinas' },
  { value: 'employees', label: 'Gestão de Funcionários' },
  { value: 'reports', label: 'Relatórios' },
  { value: 'settings', label: 'Configurações' },
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'quality', label: 'Controle de Qualidade' }
];
