# Componentes de Alertas e Logs

Esta pasta contém os componentes modulares para a página de Alertas e Logs, organizados de forma lógica e reutilizável.

## 📁 Estrutura dos Arquivos

```
src/components/alerts-logs/
├── AlertasLogsHeader.tsx      # Header da página com título e descrição
├── AlertasLogsTabs.tsx        # Navegação por abas (Alertas/Logs)
├── AlertasTab.tsx             # Conteúdo da aba de Alertas
├── LogsTab.tsx                # Conteúdo da aba de Logs
├── AlertasLogsContainer.tsx   # Container principal que gerencia o estado
├── types.ts                   # Tipos TypeScript compartilhados
├── index.ts                   # Arquivo de exportações
└── README.md                  # Este arquivo
```

## 🧩 Componentes

### AlertasLogsHeader
- **Responsabilidade**: Exibe o cabeçalho da página com título, descrição e ícone
- **Props**: Nenhuma
- **Reutilização**: Pode ser usado em outras páginas que precisem de header similar

### AlertasLogsTabs
- **Responsabilidade**: Gerencia a navegação entre as abas de Alertas e Logs
- **Props**:
  - `activeTab`: Número da aba ativa
  - `onTabChange`: Callback para mudança de aba
- **Reutilização**: Pode ser usado em outras páginas com navegação por abas

### AlertasTab
- **Responsabilidade**: Renderiza todo o conteúdo da aba de Alertas
- **Props**:
  - `alertsStats`: Estatísticas dos alertas
  - `filteredAlerts`: Lista filtrada de alertas
  - `alertSearchTerm`: Termo de busca
  - `onAlertSearchChange`: Callback para mudança de busca
  - `alertFilterConfigs`: Configuração dos filtros
  - `onAlertDetails`: Callback para visualizar detalhes
  - `onAcknowledgeAlert`: Callback para reconhecer alerta
  - `onResolveAlert`: Callback para resolver alerta
- **Reutilização**: Pode ser usado independentemente em outras páginas

### LogsTab
- **Responsabilidade**: Renderiza todo o conteúdo da aba de Logs
- **Props**:
  - `logsStats`: Estatísticas dos logs
  - `filteredLogs`: Lista filtrada de logs
  - `logSearchTerm`: Termo de busca
  - `onLogSearchChange`: Callback para mudança de busca
  - `logFilterConfigs`: Configuração dos filtros
  - `onLogDetails`: Callback para visualizar detalhes
- **Reutilização**: Pode ser usado independentemente em outras páginas

### AlertasLogsContainer
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

### ✅ **Tipagem**
- Interfaces TypeScript bem definidas
- Props tipadas corretamente
- Melhor IntelliSense e detecção de erros

## 🔄 Como Usar

### Uso Completo da Página
```tsx
import { AlertasLogsContainer } from '../../components/alerts-logs';

const AlertasLogs: React.FC = () => {
  return <AlertasLogsContainer />;
};
```

### Uso de Componentes Individuais
```tsx
import { AlertasTab, LogsTab } from '../../components/alerts-logs';

// Usar apenas a aba de alertas
<AlertasTab 
  alertsStats={stats}
  filteredAlerts={alerts}
  // ... outras props
/>

// Usar apenas a aba de logs
<LogsTab 
  logsStats={stats}
  filteredLogs={logs}
  // ... outras props
/>
```

## 🎨 Visual

**Importante**: Todos os componentes mantêm exatamente o mesmo visual da implementação original. A refatoração foi feita apenas na estrutura do código, sem alterações visuais.

## 🚀 Próximos Passos

- Implementar testes unitários para cada componente
- Adicionar Storybook para documentação visual
- Considerar extrair hooks customizados para lógica reutilizável
- Implementar sistema de temas para personalização visual
