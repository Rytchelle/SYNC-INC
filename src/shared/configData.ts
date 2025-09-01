// Dados de configurações do sistema

export interface SystemConfig {
  id: string;
  category: string;
  name: string;
  description: string;
  value: any;
  type: 'text' | 'number' | 'boolean' | 'select' | 'color' | 'time';
  options?: { value: any; label: string }[];
  unit?: string;
  min?: number;
  max?: number;
  required: boolean;
}

export interface ConfigCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  configs: SystemConfig[];
}

export const configCategories: ConfigCategory[] = [
  {
    id: 'general',
    name: 'Configurações Gerais',
    description: 'Configurações básicas do sistema',
    icon: 'FaCog',
    configs: [
      {
        id: 'company_name',
        category: 'general',
        name: 'Nome da Empresa',
        description: 'Nome da empresa exibido no sistema',
        value: 'Indústria SYNC',
        type: 'text',
        required: true
      },
      {
        id: 'system_language',
        category: 'general',
        name: 'Idioma do Sistema',
        description: 'Idioma padrão da interface',
        value: 'pt-BR',
        type: 'select',
        options: [
          { value: 'pt-BR', label: 'Português (Brasil)' },
          { value: 'en-US', label: 'English (US)' },
          { value: 'es-ES', label: 'Español' }
        ],
        required: true
      },
      {
        id: 'timezone',
        category: 'general',
        name: 'Fuso Horário',
        description: 'Fuso horário do sistema',
        value: 'America/Sao_Paulo',
        type: 'select',
        options: [
          { value: 'America/Sao_Paulo', label: 'Brasília (UTC-3)' },
          { value: 'America/New_York', label: 'New York (UTC-5)' },
          { value: 'Europe/London', label: 'London (UTC+0)' }
        ],
        required: true
      },
      {
        id: 'auto_backup',
        category: 'general',
        name: 'Backup Automático',
        description: 'Habilitar backup automático diário',
        value: true,
        type: 'boolean',
        required: false
      }
    ]
  },
  {
    id: 'production',
    name: 'Configurações de Produção',
    description: 'Parâmetros operacionais e de produção',
    icon: 'FaIndustry',
    configs: [
      {
        id: 'shift_duration',
        category: 'production',
        name: 'Duração do Turno',
        description: 'Duração padrão de cada turno de trabalho',
        value: 8,
        type: 'number',
        unit: 'horas',
        min: 4,
        max: 12,
        required: true
      },
      {
        id: 'oee_target',
        category: 'production',
        name: 'Meta de OEE',
        description: 'Meta de Overall Equipment Effectiveness',
        value: 85,
        type: 'number',
        unit: '%',
        min: 50,
        max: 100,
        required: true
      },
      {
        id: 'maintenance_interval',
        category: 'production',
        name: 'Intervalo de Manutenção',
        description: 'Intervalo padrão para manutenção preventiva',
        value: 30,
        type: 'number',
        unit: 'dias',
        min: 7,
        max: 365,
        required: true
      },
      {
        id: 'quality_threshold',
        category: 'production',
        name: 'Limite de Qualidade',
        description: 'Percentual mínimo de qualidade aceitável',
        value: 95,
        type: 'number',
        unit: '%',
        min: 80,
        max: 100,
        required: true
      }
    ]
  },
  {
    id: 'notifications',
    name: 'Notificações',
    description: 'Configurações de alertas e notificações',
    icon: 'FaBell',
    configs: [
      {
        id: 'email_notifications',
        category: 'notifications',
        name: 'Notificações por E-mail',
        description: 'Enviar notificações por e-mail',
        value: true,
        type: 'boolean',
        required: false
      },
      {
        id: 'sms_notifications',
        category: 'notifications',
        name: 'Notificações por SMS',
        description: 'Enviar notificações por SMS',
        value: false,
        type: 'boolean',
        required: false
      },
      {
        id: 'alert_threshold',
        category: 'notifications',
        name: 'Limite de Alerta',
        description: 'Percentual de OEE para disparar alertas',
        value: 70,
        type: 'number',
        unit: '%',
        min: 50,
        max: 90,
        required: true
      },
      {
        id: 'notification_frequency',
        category: 'notifications',
        name: 'Frequência de Notificações',
        description: 'Frequência de envio de notificações',
        value: 'immediate',
        type: 'select',
        options: [
          { value: 'immediate', label: 'Imediato' },
          { value: 'hourly', label: 'A cada hora' },
          { value: 'daily', label: 'Diário' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'security',
    name: 'Segurança',
    description: 'Configurações de segurança e acesso',
    icon: 'FaShield',
    configs: [
      {
        id: 'session_timeout',
        category: 'security',
        name: 'Timeout de Sessão',
        description: 'Tempo limite para sessões inativas',
        value: 30,
        type: 'number',
        unit: 'minutos',
        min: 15,
        max: 480,
        required: true
      },
      {
        id: 'password_expiry',
        category: 'security',
        name: 'Expiração de Senha',
        description: 'Dias até a senha expirar',
        value: 90,
        type: 'number',
        unit: 'dias',
        min: 30,
        max: 365,
        required: true
      },
      {
        id: 'two_factor_auth',
        category: 'security',
        name: 'Autenticação de Dois Fatores',
        description: 'Exigir autenticação de dois fatores',
        value: false,
        type: 'boolean',
        required: false
      },
      {
        id: 'login_attempts',
        category: 'security',
        name: 'Tentativas de Login',
        description: 'Número máximo de tentativas de login',
        value: 5,
        type: 'number',
        min: 3,
        max: 10,
        required: true
      }
    ]
  },
  {
    id: 'appearance',
    name: 'Aparência',
    description: 'Configurações visuais e de interface',
    icon: 'FaPalette',
    configs: [
      {
        id: 'theme_mode',
        category: 'appearance',
        name: 'Modo do Tema',
        description: 'Tema claro ou escuro',
        value: 'light',
        type: 'select',
        options: [
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Escuro' },
          { value: 'auto', label: 'Automático' }
        ],
        required: true
      },
      {
        id: 'primary_color',
        category: 'appearance',
        name: 'Cor Primária',
        description: 'Cor principal da interface',
        value: '#1976d2',
        type: 'color',
        required: true
      },
      {
        id: 'dashboard_refresh',
        category: 'appearance',
        name: 'Atualização do Dashboard',
        description: 'Intervalo de atualização automática',
        value: 30,
        type: 'number',
        unit: 'segundos',
        min: 10,
        max: 300,
        required: true
      },
      {
        id: 'show_animations',
        category: 'appearance',
        name: 'Mostrar Animações',
        description: 'Habilitar animações na interface',
        value: true,
        type: 'boolean',
        required: false
      }
    ]
  }
];

export const getConfigByCategory = (categoryId: string): SystemConfig[] => {
  const category = configCategories.find(cat => cat.id === categoryId);
  return category ? category.configs : [];
};

export const getConfigById = (configId: string): SystemConfig | undefined => {
  for (const category of configCategories) {
    const config = category.configs.find(cfg => cfg.id === configId);
    if (config) return config;
  }
  return undefined;
};
