// Constantes globais do projeto

export const APP_NAME = 'Sync';
export const APP_VERSION = '1.0.0';

// Status constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  OPERATING: 'Operando',
  STOPPED: 'Parada',
  MAINTENANCE_MACHINE: 'Manutenção',
} as const;

// Employee status
export const EMPLOYEE_STATUS = {
  ACTIVE: 'Active',
  ON_LEAVE: 'On Leave',
  MEDICAL_LEAVE: 'Medical Leave',
  ABSENT: 'Absent',
  NEXT_SHIFT: 'Next Shift',
} as const;

// Machine status
export const MACHINE_STATUS = {
  OPERATING: 'Operando',
  STOPPED: 'Parada',
  MAINTENANCE: 'Manutenção',
} as const;

// Colors for different status
export const STATUS_COLORS = {
  [STATUS.ACTIVE]: 'success',
  [STATUS.INACTIVE]: 'error',
  [STATUS.MAINTENANCE]: 'warning',
  [MACHINE_STATUS.OPERATING]: 'success',
  [MACHINE_STATUS.STOPPED]: 'error',
  [MACHINE_STATUS.MAINTENANCE]: 'warning',
  [EMPLOYEE_STATUS.ACTIVE]: 'success',
  [EMPLOYEE_STATUS.ON_LEAVE]: 'warning',
  [EMPLOYEE_STATUS.MEDICAL_LEAVE]: 'warning',
  [EMPLOYEE_STATUS.ABSENT]: 'error',
  [EMPLOYEE_STATUS.NEXT_SHIFT]: 'info',
} as const;

// API endpoints (quando implementar backend)
export const API_ENDPOINTS = {
  EMPLOYEES: '/api/employees',
  MACHINES: '/api/machines',
  DEPARTMENTS: '/api/departments',
  SECTORS: '/api/sectors',
  REPORTS: '/api/reports',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
} as const;

// Notification duration
export const NOTIFICATION_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;

// Form validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PERFORMANCE: 0,
  MAX_PERFORMANCE: 100,
  MIN_OEE: 0,
  MAX_OEE: 100,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  EMPLOYEES: '/funcionarios',
  MACHINES: '/maquinas',
  DEPARTMENTS: '/departamentos',
  REPORTS: '/relatorios',
  PROFILE: '/perfil',
  FORGOT_PASSWORD: '/esqueceu-senha',
  ABOUT: '/sobre',
  CONTACT: '/contato',
  DIFFERENTIALS: '/diferenciais',
} as const; 