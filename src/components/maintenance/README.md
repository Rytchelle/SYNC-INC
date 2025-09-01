# Componentes de Manutenção

Esta pasta contém os componentes modulares para a página de Gestão de Manutenção, organizados de forma lógica e reutilizável.

## 📁 Estrutura dos Arquivos

```
src/components/maintenance/
├── MaintenanceHeader.tsx           # Header da página com título e descrição
├── MaintenanceStats.tsx            # Cards de estatísticas (total, concluídas, atrasadas, custo)
├── MaintenanceFilters.tsx          # Filtros de busca e botão de nova manutenção
├── MaintenanceCard.tsx             # Card individual de cada manutenção
├── MaintenanceGrid.tsx             # Grid responsivo dos cards de manutenção
├── MaintenanceDetailModal.tsx      # Modal de detalhes da manutenção
├── MaintenanceContainer.tsx        # Container principal que gerencia o estado
├── index.ts                        # Arquivo de exportações
└── README.md                       # Este arquivo
```

## 🧩 Componentes

### MaintenanceHeader
- **Responsabilidade**: Exibe o cabeçalho da página com título e descrição
- **Props**: Nenhuma
- **Reutilização**: Pode ser usado em outras páginas que precisem de header similar

### MaintenanceStats
- **Responsabilidade**: Renderiza os 4 cards de estatísticas principais
- **Props**:
  - `stats`: Objeto com estatísticas (totalMaintenance, completed, overdue, averageCost)
- **Reutilização**: Pode ser usado em dashboards ou outras páginas que precisem das mesmas métricas

### MaintenanceFilters
- **Responsabilidade**: Gerencia todos os filtros e busca, incluindo botão de nova manutenção
- **Props**:
  - `searchTerm`: Termo de busca atual
  - `filterStatus`: Status selecionado
  - `filterType`: Tipo selecionado
  - `filterPriority`: Prioridade selecionada
  - `onSearchChange`: Callback para mudança de busca
  - `onStatusChange`: Callback para mudança de status
  - `onTypeChange`: Callback para mudança de tipo
  - `onPriorityChange`: Callback para mudança de prioridade
  - `onCreateNew`: Callback para criar nova manutenção
- **Reutilização**: Pode ser usado em outras páginas que precisem de filtros similares

### MaintenanceCard
- **Responsabilidade**: Renderiza um card individual de manutenção com todas as informações
- **Props**:
  - `maintenance`: Objeto com dados da manutenção
  - `onCardClick`: Callback para clicar no card
  - `onEdit`: Callback para editar a manutenção
- **Reutilização**: Pode ser usado em listas, dashboards ou outras visualizações

### MaintenanceGrid
- **Responsabilidade**: Organiza os cards de manutenção em um grid responsivo
- **Props**:
  - `maintenanceRecords`: Array de manutenções
  - `onCardClick`: Callback para clicar em um card
  - `onEdit`: Callback para editar uma manutenção
- **Reutilização**: Pode ser usado em outras páginas que precisem de grid similar

### MaintenanceDetailModal
- **Responsabilidade**: Modal que exibe detalhes completos de uma manutenção
- **Props**:
  - `open`: Estado de abertura do modal
  - `onClose`: Callback para fechar o modal
  - `maintenance`: Objeto com dados da manutenção selecionada
- **Reutilização**: Pode ser usado em outras páginas que precisem exibir detalhes similares

### MaintenanceContainer
- **Responsabilidade**: Container principal que gerencia todo o estado e lógica
- **Props**: Nenhuma
- **Reutilização**: Componente de página completo

## 🎯 Benefícios da Refatoração

### ✅ **Separação de Responsabilidades**
- Cada componente tem uma responsabilidade específica e bem definida
- Lógica de negócio separada da apresentação
- Estado gerenciado no nível apropriado

### ✅ **Reutilização**
- Componentes podem ser usados independentemente
- Fácil de testar individualmente
- Configuráveis através de props

### ✅ **Manutenibilidade**
- Código mais fácil de entender e modificar
- Mudanças isoladas em componentes específicos
- Estrutura clara e organizada

### ✅ **Flexibilidade**
- Fácil de customizar cada componente individualmente
- Possibilidade de reordenar ou remover componentes
- Adaptável a diferentes layouts

## 🔄 Como Usar

### Uso Completo da Página
```tsx
import { MaintenanceContainer } from '../../components/maintenance';

const Manutencao: React.FC = () => {
  return <MaintenanceContainer />;
};
```

### Uso de Componentes Individuais
```tsx
import { 
  MaintenanceStats, 
  MaintenanceFilters, 
  MaintenanceGrid 
} from '../../components/maintenance';

// Usar apenas as estatísticas
<MaintenanceStats stats={maintenanceStats} />

// Usar apenas os filtros
<MaintenanceFilters 
  searchTerm={searchTerm}
  filterStatus={filterStatus}
  // ... outras props
/>

// Usar apenas o grid
<MaintenanceGrid 
  maintenanceRecords={maintenanceRecords}
  onCardClick={handleCardClick}
  onEdit={handleEdit}
/>
```

## 🎨 Visual

**Importante**: Todos os componentes mantêm exatamente o mesmo visual da implementação original. A refatoração foi feita apenas na estrutura do código, sem alterações visuais.

## 🚀 Próximos Passos

- Implementar testes unitários para cada componente
- Adicionar Storybook para documentação visual
- Considerar extrair hooks customizados para lógica reutilizável
- Implementar sistema de temas para personalização visual
- Adicionar animações e transições para melhor UX
