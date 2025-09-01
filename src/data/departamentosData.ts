
import { FaBuilding, FaIndustry, FaTruck, FaTools, FaFlask, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { FormFieldConfig } from '../components/forms/CUDModal';

export interface Sector {
  id: number;
  name: string;
  employees: number;
  efficiency: number;
  production: number;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  location: string;
  employees: number;
  budget: number;
  status: string;
  sectors: Sector[];
  createdAt: string;
}

export const departmentFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Nome do Departamento',
    type: 'text',
    required: true,
    placeholder: 'Digite o nome do departamento'
  },
  {
    name: 'description',
    label: 'Descrição',
    type: 'textarea',
    required: true,
    placeholder: 'Digite a descrição do departamento'
  },
  {
    name: 'location',
    label: 'Localização',
    type: 'text',
    required: true,
    placeholder: 'Digite a localização'
  },
  {
    name: 'employees',
    label: 'Número de Funcionários',
    type: 'number',
    required: true,
    placeholder: 'Digite o número de funcionários'
  },
  {
    name: 'budget',
    label: 'Orçamento (R$)',
    type: 'number',
    required: true,
    placeholder: 'Digite o orçamento'
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { value: 'active', label: 'Ativo' },
      { value: 'inactive', label: 'Inativo' },
      { value: 'maintenance', label: 'Em Manutenção' }
    ]
  }
];

export const sectorFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Nome do Setor',
    type: 'text',
    required: true,
    placeholder: 'Digite o nome do setor'
  },
  {
    name: 'employees',
    label: 'Número de Funcionários',
    type: 'number',
    required: true,
    placeholder: 'Digite o número de funcionários'
  },
  {
    name: 'efficiency',
    label: 'Eficiência (%)',
    type: 'number',
    required: true,
    placeholder: 'Digite a eficiência em %'
  },
  {
    name: 'production',
    label: 'Produção (un/h)',
    type: 'number',
    required: true,
    placeholder: 'Digite a produção por hora'
  }
];

export const departments: Department[] = [
  {
    id: 1,
    name: 'Produção',
    description: 'Responsável pela fabricação e montagem dos produtos principais da empresa, garantindo qualidade e eficiência em todos os processos produtivos.',
    location: 'Prédio A - 1º Andar',
    employees: 45,
    budget: 250000,
    status: 'active',
    createdAt: '2023-01-15',
    sectors: [
      { id: 1, name: 'Corte e Preparação', employees: 12, efficiency: 94, production: 320 },
      { id: 2, name: 'Montagem', employees: 18, efficiency: 89, production: 210 },
      { id: 3, name: 'Acabamento', employees: 15, efficiency: 91, production: 180 }
    ]
  },
  {
    id: 2,
    name: 'Qualidade',
    description: 'Controla e monitora a qualidade dos produtos em todas as etapas do processo, implementando melhorias contínuas e garantindo conformidade com padrões.',
    location: 'Prédio B - 2º Andar',
    employees: 12,
    budget: 80000,
    status: 'active',
    createdAt: '2023-02-20',
    sectors: [
      { id: 4, name: 'Controle de Qualidade', employees: 8, efficiency: 96, production: 150 },
      { id: 5, name: 'Inspeção Final', employees: 4, efficiency: 98, production: 120 }
    ]
  },
  {
    id: 3,
    name: 'Logística',
    description: 'Gerencia o fluxo de materiais, armazenamento e distribuição, otimizando processos de supply chain e garantindo entrega eficiente.',
    location: 'Galpão C',
    employees: 28,
    budget: 120000,
    status: 'active',
    createdAt: '2023-03-10',
    sectors: [
      { id: 6, name: 'Recebimento', employees: 8, efficiency: 92, production: 200 },
      { id: 7, name: 'Armazenamento', employees: 6, efficiency: 95, production: 180 },
      { id: 8, name: 'Expedição', employees: 14, efficiency: 88, production: 250 }
    ]
  },
  {
    id: 4,
    name: 'Manutenção',
    description: 'Responsável pela manutenção preventiva e corretiva de equipamentos, garantindo disponibilidade e eficiência operacional.',
    location: 'Prédio A - Subsolo',
    employees: 15,
    budget: 95000,
    status: 'maintenance',
    createdAt: '2023-01-30',
    sectors: [
      { id: 9, name: 'Manutenção Preventiva', employees: 8, efficiency: 85, production: 90 },
      { id: 10, name: 'Manutenção Corretiva', employees: 7, efficiency: 82, production: 75 }
    ]
  },
  {
    id: 5,
    name: 'P&D',
    description: 'Desenvolve novos produtos e processos, realizando pesquisas e inovações tecnológicas para manter a competitividade da empresa.',
    location: 'Prédio D - 3º Andar',
    employees: 8,
    budget: 180000,
    status: 'active',
    createdAt: '2023-04-05',
    sectors: [
      { id: 11, name: 'Pesquisa', employees: 4, efficiency: 78, production: 60 },
      { id: 12, name: 'Desenvolvimento', employees: 4, efficiency: 81, production: 85 }
    ]
  },
  {
    id: 6,
    name: 'Segurança',
    description: 'Garante a segurança dos colaboradores e instalações, implementando políticas e procedimentos de segurança do trabalho.',
    location: 'Prédio Central',
    employees: 6,
    budget: 45000,
    status: 'active',
    createdAt: '2023-02-15',
    sectors: [
      { id: 13, name: 'Segurança do Trabalho', employees: 4, efficiency: 95, production: 100 },
      { id: 14, name: 'Patrulhamento', employees: 2, efficiency: 92, production: 80 }
    ]
  }
];

export const getDepartmentIcon = (name: string): IconType => {
  switch (name.toLowerCase()) {
    case 'produção':
      return FaIndustry;
    case 'qualidade':
      return FaCheckCircle;
    case 'logística':
      return FaTruck;
    case 'manutenção':
      return FaTools;
    case 'p&d':
      return FaFlask;
    case 'segurança':
      return FaShieldAlt;
    default:
      return FaBuilding;
  }
};

// Status options for filtering
export const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'maintenance', label: 'Em Manutenção' }
];
