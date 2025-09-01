// Dados compartilhados de funcionários e máquinas

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  performance: number;
  status: string;
  shift: string;
  photo: string;
  machineIds: number[];
}

export interface Machine {
  id: number;
  name: string;
  status: string;
  oee: number;
  throughput: number;
  image: string;
}

export const machinesData: Machine[] = [
  {
    id: 1,
    name: 'Corte Laser',
    status: 'Operando',
    oee: 92,
    throughput: 150,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Prensa Hidráulica',
    status: 'Parada',
    oee: 0,
    throughput: 0,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Injetora Plástica',
    status: 'Manutenção',
    oee: 0,
    throughput: 0,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Montadora Automática',
    status: 'Operando',
    oee: 88,
    throughput: 120,
    image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Torno CNC',
    status: 'Operando',
    oee: 95,
    throughput: 80,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Fresa Industrial',
    status: 'Operando',
    oee: 89,
    throughput: 95,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 7,
    name: 'Soldadora Robótica',
    status: 'Manutenção',
    oee: 0,
    throughput: 0,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 8,
    name: 'Empacotadora',
    status: 'Operando',
    oee: 91,
    throughput: 200,
    image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80',
  },
  // Novos exemplos
  {
    id: 9,
    name: 'Impressora 3D',
    status: 'Operando',
    oee: 85,
    throughput: 60,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 10,
    name: 'Esteira Transportadora',
    status: 'Operando',
    oee: 93,
    throughput: 300,
    image: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=400&q=80',
  },
];

export const employeesData: Employee[] = [
  {
    id: 1,
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Ethan Harper',
    role: 'Production Manager',
    department: 'Manufacturing',
    performance: 85,
    status: 'Active',
    shift: 'Manhã',
    machineIds: [1, 4, 8, 10],
  },
  {
    id: 2,
    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: 'Bruno Silva',
    role: 'Operador de Empilhadeira',
    department: 'Logística',
    performance: 82,
    status: 'Active',
    shift: 'Manhã',
    machineIds: [10],
  },
  {
    id: 3,
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Olivia Bennett',
    role: 'Automation Engineer',
    department: 'Engineering',
    performance: 92,
    status: 'Active',
    shift: 'Manhã',
    machineIds: [4, 7, 9],
  },
  {
    id: 4,
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Lucas Almeida',
    role: 'Operador de Máquinas',
    department: 'Produção',
    performance: 78,
    status: 'On Leave',
    shift: 'Tarde',
    machineIds: [2, 5, 6],
  },
  {
    id: 5,
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Marina Souza',
    role: 'Analista de Qualidade',
    department: 'Qualidade',
    performance: 88,
    status: 'Medical Leave',
    shift: 'Tarde',
    machineIds: [3],
  },
  // Novos exemplos
  {
    id: 6,
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    name: 'Carlos Pereira',
    role: 'Supervisor de Logística',
    department: 'Logística',
    performance: 80,
    status: 'Active',
    shift: 'Noite',
    machineIds: [10],
  },
  {
    id: 7,
    photo: 'https://randomuser.me/api/portraits/women/72.jpg',
    name: 'Ana Paula',
    role: 'Técnica de Impressão 3D',
    department: 'P&D',
    performance: 90,
    status: 'Active',
    shift: 'Manhã',
    machineIds: [9],
  },
  {
    id: 8,
    photo: 'https://randomuser.me/api/portraits/men/77.jpg',
    name: 'João Pedro',
    role: 'Operador de Esteira',
    department: 'Produção',
    performance: 83,
    status: 'Active',
    shift: 'Tarde',
    machineIds: [10],
  },
];
