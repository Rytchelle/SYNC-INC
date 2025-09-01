# Componentes

Esta pasta contém todos os componentes reutilizáveis do projeto, organizados por categoria em subpastas.

## 📁 Estrutura das Pastas

```
src/components/
├── ui/              # Componentes básicos de interface
├── layout/          # Componentes de layout e navegação
├── cards/           # Componentes de cartões e cards
├── forms/           # Componentes de formulário
├── charts/          # Componentes de gráficos
├── data/            # Componentes de dados
├── system/          # Componentes do sistema
└── legacy/          # Componentes legados (para refatoração)
```

## 🎯 Categorias de Componentes

### UI Components (`/ui`)
Componentes básicos de interface do usuário:
- `ActionButton` - Botão de ação customizado
- `StatusChip` - Chip para mostrar status
- `StatusBadge` - Badge para mostrar status
- `EfficiencyChip` - Chip para mostrar eficiência
- `LoadingSpinner` - Spinner de carregamento
- `Modal` - Modal básico
- `ConfirmDialog` - Dialog de confirmação
- `EmptyState` - Estado vazio

### Layout Components (`/layout`)
Componentes de layout e navegação:
- `Header` - Cabeçalho autenticado
- `LandingHeader` - Cabeçalho da landing page
- `PageHeader` - Cabeçalho de página
- `Breadcrumb` - Navegação breadcrumb

### Card Components (`/cards`)
Componentes de cartões e cards:
- `SummaryCard` - Card de resumo
- `InfoCard` - Card de informação
- `EmployeeCard` - Card de funcionário
- `EntityCard` - Card de entidade
- `FilterCard` - Card de filtro

### Form Components (`/forms`)
Componentes de formulário:
- `FormField` - Campo de formulário
- `CUDModal` - Modal para Create/Update/Delete
- `FileUpload` - Upload de arquivo
- `SearchFilter` - Filtro de busca
- `SelectFilter` - Filtro de seleção

### Chart Components (`/charts`)
Componentes de gráficos:
- `ChartContainer` - Container de gráfico
- `DonutChart` - Gráfico de rosca
- `LineChart` - Gráfico de linha
- `OeeDonutChart` - Gráfico OEE
- `PerformanceCircle` - Círculo de performance

### Data Components (`/data`)
Componentes de dados:
- `DataTable` - Tabela de dados
- `EntityGrid` - Grid de entidades
- `StatisticsGrid` - Grid de estatísticas

### System Components (`/system`)
Componentes do sistema:
- `NotificationSystem` - Sistema de notificações
- `useNotifications` - Hook para notificações

## 📦 Como Usar

### Importação Simplificada
```tsx
// Importar todos os componentes de uma categoria
import { ActionButton, StatusChip, LoadingSpinner } from '../components/ui';
import { Header, PageHeader } from '../components/layout';
import { SummaryCard, InfoCard } from '../components/cards';
import { CUDModal, FormField } from '../components/forms';
import { DonutChart, LineChart } from '../components/charts';
import { DataTable, EntityGrid } from '../components/data';
import { NotificationSystem, useNotifications } from '../components/system';
```

### Importação Direta
```tsx
// Importar componente específico
import ActionButton from '../components/ui/ActionButton';
import SummaryCard from '../components/cards/SummaryCard';
import CUDModal from '../components/forms/CUDModal';
```

### Importação Centralizada
```tsx
// Importar do arquivo de índice principal
import { 
  ActionButton, 
  SummaryCard, 
  Header, 
  useNotifications 
} from '../components';
```

## 🎨 Convenções

### Nomenclatura
- **PascalCase** para nomes de componentes
- **camelCase** para props e funções
- **kebab-case** para classes CSS

### Props
- Use TypeScript interfaces para definir props
- Props opcionais com valores padrão
- Props obrigatórias sem valores padrão

### Estilização
- **Tailwind CSS** como base
- **CSS Variables** para temas
- **Responsive Design** mobile-first
- **Acessibilidade** como prioridade

### Estrutura de Arquivo
```tsx
// 1. Imports
import React from 'react';
import { ComponentProps } from './types';

// 2. Interface
interface MyComponentProps {
  // props aqui
}

// 3. Componente
const MyComponent: React.FC<MyComponentProps> = ({ ... }) => {
  // lógica aqui
  return (
    // JSX aqui
  );
};

// 4. Export
export default MyComponent;
```

## 🔧 Desenvolvimento

### Criando Novos Componentes
1. Identifique a categoria apropriada
2. Crie o arquivo na pasta correta
3. Adicione a exportação no `index.ts` da pasta
4. Documente o componente
5. Teste em diferentes contextos

### Refatoração
- Componentes legados ficam em `/legacy`
- Migre gradualmente para as novas categorias
- Mantenha compatibilidade durante a transição

## 📚 Documentação

Cada componente deve ter:
- **Descrição** clara da funcionalidade
- **Props** documentadas com tipos
- **Exemplos** de uso
- **Variações** disponíveis
- **Acessibilidade** considerada 