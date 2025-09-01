export interface FilterConfig {
  name: string;
  label: string;
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChange: (value: string) => void;
}

export interface AlertStats {
  total: number;
  active: number;
  critical: number;
  resolved: number;
}

export interface LogStats {
  total: number;
  errors: number;
  warnings: number;
  info: number;
}
