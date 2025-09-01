# 📚 Documentação dos Componentes

## 🎯 Visão Geral

Esta documentação descreve todos os componentes reutilizáveis do sistema Sync Industrial, incluindo suas props, exemplos de uso e casos de aplicação.

## 📋 Índice

- [🏗️ Componentes de Layout](#️-componentes-de-layout)
- [📝 Componentes de Formulário](#-componentes-de-formulário)
- [📊 Componentes de Dados](#-componentes-de-dados)
- [🎨 Componentes de UI](#-componentes-de-ui)
- [🔧 Hooks Customizados](#-hooks-customizados)

---

## 🏗️ Componentes de Layout

### **Header**

Componente principal de navegação do sistema.

```typescript
import { Header } from '../components/layout';

// Uso básico
<Header />

// Props disponíveis
interface HeaderProps {
  title?: string;           // Título personalizado
  showNotifications?: boolean; // Mostrar notificações
  onMenuClick?: () => void; // Callback do menu mobile
}
```

**Características:**
- Navegação responsiva
- Sistema de notificações
- Menu mobile adaptativo
- Integração com React Router

### **PageHeader**

Cabeçalho de página com título e ações.

```typescript
import { PageHeader } from '../components/layout';

<PageHeader 
  title="Gestão de Funcionários"
  subtitle="Gerencie todos os funcionários da empresa"
  actions={[
    <Button key="add" variant="contained">Adicionar</Button>
  ]}
/>

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode[];
  breadcrumbs?: BreadcrumbItem[];
}
```

---

## 📝 Componentes de Formulário

### **CUDModal**

Modal genérico para operações Create, Update e Delete.

```typescript
import CUDModal from '../components/forms/CUDModal';

<CUDModal
  open={showModal}
  onClose={() => setShowModal(false)}
  mode="create"
  title="Novo Funcionário"
  fields={employeeFields}
  initialData={{}}
  onSubmit={handleSubmit}
  entityType="employee"
/>

interface CUDModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'update' | 'delete';
  title: string;
  fields: FormFieldConfig[];
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  entityType: 'employee' | 'machine' | 'department';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
```

**Configuração de Campos:**

```typescript
const employeeFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text',
    required: true,
    placeholder: 'Digite o nome completo'
  },
  {
    name: 'department',
    label: 'Departamento',
    type: 'select',
    required: true,
    options: [
      { value: 'production', label: 'Produção' },
      { value: 'quality', label: 'Qualidade' }
    ]
  },
  {
    name: 'salary',
    label: 'Salário',
    type: 'number',
    required: true,
    placeholder: '0.00'
  }
];
```

### **FilterPanel**

Sistema de filtros avançados e reutilizável.

```typescript
import FilterPanel from '../components/forms/FilterPanel';

<FilterPanel
  title="Filtros Avançados"
  filters={{
    date: {
      label: "Data",
      value: filterDate,
      onChange: setFilterDate
    },
    status: {
      label: "Status",
      value: filterStatus,
      options: [
        { value: 'all', label: 'Todos' },
        { value: 'active', label: 'Ativo' }
      ],
      onChange: setFilterStatus
    },
    department: {
      label: "Departamento",
      value: filterDepartment,
      options: departmentOptions,
      onChange: setFilterDepartment
    }
  }}
  onFilter={handleFilter}
  onClear={handleClear}
  className="mb-6"
/>

interface FilterPanelProps {
  title?: string;
  filters: {
    date?: FilterDateConfig;
    status?: FilterSelectConfig;
    department?: FilterSelectConfig;
    machine?: FilterSelectConfig;
    employee?: FilterSelectConfig;
  };
  onFilter: () => void;
  onClear?: () => void;
  showClearButton?: boolean;
  className?: string;
}
```

**Características:**
- Expansão/contração automática
- Contador de filtros ativos
- Chips removíveis
- Animações suaves
- Responsivo

### **FormField**

Campo de formulário genérico com validação.

```typescript
import FormField from '../components/forms/FormField';

<FormField
  type="text"
  label="Nome"
  value={name}
  onChange={(value) => setName(value)}
  required={true}
  placeholder="Digite o nome"
  error={errors.name}
  size="small"
  fullWidth={true}
/>

interface FormFieldProps {
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  error?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}
```

---

## 📊 Componentes de Dados

### **MetricsCard**

Card moderno para exibição de métricas e indicadores.

```typescript
import MetricsCard from '../components/data/MetricsCard';

<MetricsCard
  title="Máquina CNC-001"
  value={85.2}
  unit="%"
  status="success"
  icon={<FaCog />}
  metrics={[
    { label: 'Disponibilidade', value: 92.5, unit: '%' },
    { label: 'Performance', value: 88.3, unit: '%' },
    { label: 'Qualidade', value: 98.1, unit: '%' }
  ]}
  footer={{
    status: 'Operando',
    date: '2024-01-15'
  }}
  onClick={() => handleCardClick()}
/>

interface MetricsCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  unit?: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon: React.ReactNode;
  metrics?: Array<{
    label: string;
    value: string | number;
    unit?: string;
  }>;
  footer?: {
    status: string;
    date: string;
  };
  onClick?: () => void;
  className?: string;
}
```

**Estados de Status:**
- `success`: Verde (≥85% OEE, ≥90% eficiência)
- `warning`: Amarelo (70-84% OEE, 75-89% eficiência)
- `error`: Vermelho (<70% OEE, <75% eficiência)
- `info`: Azul (informações neutras)

### **DataTable**

Tabela de dados com funcionalidades avançadas.

```typescript
import DataTable from '../components/data/DataTable';

<DataTable
  data={employees}
  columns={employeeColumns}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onView={handleView}
  loading={loading}
  pagination={{
    page: currentPage,
    pageSize: pageSize,
    total: totalItems,
    onPageChange: setCurrentPage
  }}
  filters={{
    search: searchTerm,
    status: selectedStatus,
    department: selectedDepartment
  }}
/>

interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  pagination?: PaginationConfig;
  filters?: FilterConfig;
  className?: string;
}
```

---

## 🎨 Componentes de UI

### **ActionButton**

Botão de ação customizado com ícones e estados.

```typescript
import ActionButton from '../components/ui/ActionButton';

<ActionButton
  icon={<FaPlus />}
  label="Adicionar"
  onClick={handleAdd}
  variant="contained"
  size="small"
  disabled={loading}
  loading={loading}
/>

interface ActionButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  className?: string;
}
```

### **StatusChip**

Indicador de status com cores e ícones.

```typescript
import StatusChip from '../components/ui/StatusChip';

<StatusChip
  status="operating"
  label="Operando"
  size="small"
  showIcon={true}
/>

interface StatusChipProps {
  status: 'operating' | 'maintenance' | 'stopped' | 'active' | 'absent' | 'operational' | 'closed';
  label: string;
  size?: 'small' | 'medium';
  showIcon?: boolean;
  onClick?: () => void;
  className?: string;
}
```

**Mapeamento de Status:**
- `operating/active/operational` → Verde
- `maintenance` → Amarelo
- `stopped/absent/closed` → Vermelho

---

## 🔧 Hooks Customizados

### **useLocalStorage**

Hook para gerenciar dados no localStorage.

```typescript
import { useLocalStorage } from '../hooks/useLocalStorage';

const [theme, setTheme] = useLocalStorage('theme', 'light');
const [userPreferences, setUserPreferences] = useLocalStorage('preferences', {});

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementação...
}
```

### **useDebounce**

Hook para debounce de valores.

```typescript
import { useDebounce } from '../hooks/useDebounce';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

function useDebounce<T>(value: T, delay: number): T {
  // Implementação...
}
```

### **useNotification**

Hook para gerenciar notificações.

```typescript
import { useNotification } from '../hooks/useNotification';

const { showNotification, hideNotification } = useNotification();

showNotification({
  type: 'success',
  title: 'Sucesso!',
  message: 'Funcionário adicionado com sucesso.'
});

interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}
```

---

## 🎯 Padrões de Uso

### **Composição de Componentes**

```typescript
// Exemplo de composição para uma página
const FuncionariosPage = () => {
  return (
    <div>
      <PageHeader 
        title="Funcionários"
        actions={[
          <ActionButton 
            key="add"
            icon={<FaPlus />}
            label="Adicionar"
            onClick={handleAdd}
          />
        ]}
      />
      
      <FilterPanel 
        filters={filterConfig}
        onFilter={handleFilter}
      />
      
      <DataTable 
        data={employees}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <CUDModal 
        open={showModal}
        fields={employeeFields}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
```

### **Estilização Consistente**

```typescript
// Usando classes Tailwind consistentes
const cardClasses = "bg-white rounded-xl shadow-lg p-6";
const buttonClasses = "bg-gradient-to-r from-primary to-primary-dark text-white";
const inputClasses = "border border-gray-300 rounded-lg px-4 py-2";

// Usando CSS Variables
const primaryColor = "var(--primary)";
const accentColor = "var(--accent)";
```

---

## 🔍 Troubleshooting

### **Problemas Comuns**

1. **Modal não fecha**
   - Verificar se `onClose` está sendo chamado
   - Confirmar se `open` está sendo atualizado

2. **Filtros não funcionam**
   - Verificar se `onChange` está sendo passado
   - Confirmar se `options` estão no formato correto

3. **Cards não responsivos**
   - Verificar classes Tailwind
   - Confirmar grid responsivo

### **Performance**

- Use `React.memo` para componentes que não mudam frequentemente
- Implemente `useCallback` para funções passadas como props
- Use `useMemo` para cálculos complexos

---

## 📚 Recursos Adicionais

- [Material-UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Best Practices](https://reactjs.org/docs/hooks-faq.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última atualização**: Janeiro 2024
**Versão**: 1.0.0 