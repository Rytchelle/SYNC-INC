// Tipos globais do projeto

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  shift: string;
  status: string;
  performance: number;
  photo?: string;
}

export interface Machine {
  id: number;
  name: string;
  status: string;
  oee: number;
  throughput: number;
  image?: string;
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

export interface Sector {
  id: number;
  name: string;
  employees: number;
  efficiency: number;
  production: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  duration?: number;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'url' | 'date';
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ value: string; label: string }>;
}

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

export interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium' | 'large';
}

export interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: (event?: React.MouseEvent) => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
}

export interface CUDModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
} 