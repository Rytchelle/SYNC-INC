# 🏭 Sync - Sistema de Gestão Industrial Inteligente

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.0-orange.svg)](https://mui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Sistema moderno e inteligente para gestão industrial completa, desenvolvido com as melhores práticas e tecnologias atuais.**

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias](#-tecnologias)
- [📦 Instalação](#-instalação)
- [🏗️ Arquitetura](#️-arquitetura)
- [🎨 Design System](#-design-system)
- [📊 Módulos do Sistema](#-módulos-do-sistema)
- [🔧 Configuração](#-configuração)
- [📝 Convenções](#-convenções)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🎯 Visão Geral

O **Sync** é uma solução completa de gestão industrial que integra controle de funcionários, máquinas, departamentos e métricas de performance em uma interface moderna e intuitiva. Desenvolvido com foco em usabilidade, performance e escalabilidade.

### 🎯 Objetivos

- **Otimização de Processos**: Automatização e controle de operações industriais
- **Gestão Inteligente**: Dashboard com métricas em tempo real
- **Interface Moderna**: UX/UI profissional e responsiva
- **Escalabilidade**: Arquitetura preparada para crescimento
- **Manutenibilidade**: Código limpo e bem documentado

## ✨ Funcionalidades

### ✅ **Módulos Implementados**

#### 🏠 **Dashboard Inteligente**
- Visão geral consolidada do sistema
- Cards de métricas em tempo real
- Gráficos de performance interativos
- Alertas e notificações inteligentes
- Filtros avançados com componentes reutilizáveis

#### 👥 **Gestão de Funcionários**
- CRUD completo com interface moderna
- Filtros avançados por departamento, turno e status
- Modal de visualização com ações integradas
- Formulários validados e responsivos
- Sistema de busca inteligente

#### ⚙️ **Gestão de Máquinas**
- Monitoramento em tempo real
- Controle de status operacional
- Métricas de OEE (Overall Equipment Effectiveness)
- Gráficos de performance
- Sistema de alertas automáticos

#### 🏢 **Gestão de Departamentos**
- Organização hierárquica completa
- Gestão de setores e subdivisões
- Controle de orçamentos
- Indicadores de performance departamental
- Integração com funcionários e máquinas

#### 📊 **Sistema de Estatísticas**
- Métricas de OEE das máquinas
- Indicadores de eficiência dos funcionários
- Performance departamental
- Relatórios customizáveis
- Filtros avançados com componentes reutilizáveis

### 🔄 **Em Desenvolvimento**
- **Sistema de Autenticação**: Login, autorização e controle de acesso
- **Relatórios Avançados**: Gráficos interativos e exportação
- **Upload de Arquivos**: Gestão de documentos e imagens
- **Temas Dinâmicos**: Modo claro/escuro
- **API Integration**: Backend robusto e escalável

## 🚀 Tecnologias

### **Frontend Core**
- **[React 19](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática avançada
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rápido

### **UI/UX Framework**
- **[Material-UI 5](https://mui.com/)** - Componentes de UI profissionais
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[React Icons](https://react-icons.github.io/react-icons/)** - Biblioteca de ícones

### **Roteamento e Estado**
- **[React Router 6](https://reactrouter.com/)** - Roteamento declarativo
- **[React Hooks](https://reactjs.org/docs/hooks-intro.html)** - Gerenciamento de estado

### **Animações e UX**
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas
- **[Recharts](https://recharts.org/)** - Gráficos interativos

### **Qualidade e Desenvolvimento**
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação automática
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 📦 Instalação

### **Pré-requisitos**
```bash
Node.js >= 18.0.0
npm >= 8.0.0 ou yarn >= 1.22.0
```

### **Passo a Passo**

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sync-industrial.git
cd sync-industrial

# 2. Instale as dependências
npm install
# ou
yarn install

# 3. Execute em modo desenvolvimento
npm run dev
# ou
yarn dev

# 4. Acesse a aplicação
# http://localhost:5173
```

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # Verificação ESLint
npm run lint:fix     # Correção automática
npm run type-check   # Verificação TypeScript

# Testes (futuro)
npm run test         # Executar testes
npm run test:watch   # Testes em modo watch
```

## 🏗️ Arquitetura

### **Estrutura de Diretórios**

```
src/
├── components/              # Componentes reutilizáveis
│   ├── forms/              # Formulários e inputs
│   │   ├── CUDModal.tsx    # Modal de CRUD genérico
│   │   ├── FilterPanel.tsx # Sistema de filtros
│   │   └── FormField.tsx   # Campos de formulário
│   ├── data/               # Componentes de dados
│   │   ├── MetricsCard.tsx # Cards de métricas
│   │   └── DataTable.tsx   # Tabelas de dados
│   ├── ui/                 # Componentes de UI
│   │   ├── ActionButton.tsx
│   │   └── StatusChip.tsx
│   └── layout/             # Layout e navegação
│       ├── Header.tsx
│       └── PageHeader.tsx
├── pages/                  # Páginas da aplicação
│   ├── dashboard/          # Dashboard e estatísticas
│   ├── management/         # Gestão (funcionários, máquinas, etc.)
│   └── auth/              # Autenticação (futuro)
├── hooks/                  # Hooks customizados
├── types/                  # Tipos TypeScript
├── utils/                  # Utilitários e helpers
├── styles/                 # Estilos globais
└── assets/                 # Recursos estáticos
```

### **Padrões Arquiteturais**

- **Component-Based Architecture**: Componentes modulares e reutilizáveis
- **Type-Safe Development**: TypeScript em todo o projeto
- **Responsive Design**: Mobile-first approach
- **Performance Optimization**: Lazy loading e code splitting
- **Accessibility**: WCAG 2.1 compliance

## 🎨 Design System

### **Paleta de Cores**

```css
/* Cores Principais */
--primary: #f38220        /* Laranja principal */
--primary-dark: #d96c0a   /* Laranja escuro */
--accent: #f4ede7         /* Bege claro */
--background: #fcfaf8     /* Branco suave */
--text: #1c140d           /* Marrom escuro */
--muted: #9c7049          /* Marrom médio */

/* Estados */
--success: #10b981        /* Verde */
--warning: #f59e0b        /* Amarelo */
--error: #ef4444          /* Vermelho */
--info: #3b82f6           /* Azul */
```

### **Tipografia**

```css
/* Hierarquia de Texto */
--font-family: 'Inter', system-ui, sans-serif
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-lg: 1.125rem   /* 18px */
--font-size-xl: 1.25rem    /* 20px */
--font-size-2xl: 1.5rem    /* 24px */
```

### **Componentes Base**

#### **FilterPanel**
- Sistema de filtros expansível
- Contador de filtros ativos
- Chips removíveis
- Animações suaves

#### **MetricsCard**
- Cards de métricas interativos
- Status coloridos
- Hover effects
- Responsivo

#### **CUDModal**
- Modal genérico para CRUD
- Validação integrada
- Design moderno
- Reutilizável

## 📊 Módulos do Sistema

### **Dashboard Principal**
```
📈 Métricas em Tempo Real
├── OEE Médio: 82.1%
├── Eficiência: 91.2%
├── Produção: 12.5K
└── Qualidade: 97.8%

🎛️ Controles Rápidos
├── Adicionar Funcionário
├── Registrar Máquina
├── Criar Departamento
└── Ver Estatísticas
```

### **Gestão de Funcionários**
```
👥 Funcionários
├── Lista com Filtros
├── Modal de Detalhes
├── Formulário CRUD
└── Status e Turnos

📊 Métricas
├── Eficiência Individual
├── Produtividade
├── Qualidade
└── Presença
```

### **Gestão de Máquinas**
```
⚙️ Máquinas
├── Monitoramento OEE
├── Status Operacional
├── Controles de Produção
└── Alertas Automáticos

📈 Indicadores
├── Disponibilidade
├── Performance
├── Qualidade
└── OEE Total
```

### **Sistema de Estatísticas**
```
📊 Estatísticas Avançadas
├── Filtros Inteligentes
├── Métricas OEE
├── Eficiência Funcionários
└── Performance Departamentos

🎯 Componentes
├── FilterPanel Reutilizável
├── MetricsCard Moderno
├── Gráficos Interativos
└── Relatórios Customizáveis
```

## 🔧 Configuração

### **Variáveis de Ambiente**

```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Sync Industrial
VITE_APP_VERSION=1.0.0
```

### **Tailwind CSS**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
}
```

### **TypeScript**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 📝 Convenções

### **Nomenclatura**

```typescript
// Componentes: PascalCase
const UserProfile = () => {};

// Funções: camelCase
const handleUserSubmit = () => {};

// Constantes: UPPER_SNAKE_CASE
const API_ENDPOINTS = {};

// Interfaces: PascalCase com I
interface IUserData {}

// Tipos: PascalCase
type UserStatus = 'active' | 'inactive';
```

### **Estrutura de Componentes**

```typescript
// 1. Imports
import React from 'react';
import { ComponentProps } from './types';

// 2. Interface
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Componente
export const Component: React.FC<ComponentProps> = ({
  title,
  onAction
}) => {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Handlers
  const handleClick = () => {};

  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
```

### **Comentários**

```typescript
/**
 * Calcula a eficiência operacional de uma máquina
 * @param availability - Disponibilidade em porcentagem
 * @param performance - Performance em porcentagem
 * @param quality - Qualidade em porcentagem
 * @returns OEE total em porcentagem
 */
const calculateOEE = (
  availability: number,
  performance: number,
  quality: number
): number => {
  return (availability * performance * quality) / 10000;
};
```

## 🤝 Contribuição

### **Como Contribuir**

1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
4. **Desenvolva** seguindo as convenções
5. **Teste** suas mudanças
6. **Commit** com mensagens claras
7. **Push** para sua branch
8. **Abra** um Pull Request

### **Padrões de Commit**

```bash
# Estrutura
<type>(<scope>): <description>

# Exemplos
feat(auth): adiciona sistema de login
fix(ui): corrige alinhamento dos cards
docs(readme): atualiza documentação
style(components): formata código
refactor(api): reorganiza chamadas
test(utils): adiciona testes para helpers
```

### **Checklist de Pull Request**

- [ ] Código segue as convenções
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Responsivo em mobile
- [ ] Acessível (WCAG)
- [ ] Performance otimizada

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2024 Sync Industrial

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🆘 Suporte

### **Recursos de Ajuda**

- 📖 **[Documentação Completa](docs/)** - Guias detalhados
- 🐛 **[Issues](https://github.com/seu-usuario/sync-industrial/issues)** - Reportar bugs
- 💡 **[Discussions](https://github.com/seu-usuario/sync-industrial/discussions)** - Discussões e ideias
- 📧 **Email**: suporte@sync-industrial.com

### **Comunidade**

- 🌐 **Website**: [sync-industrial.com](https://sync-industrial.com)
- 📱 **LinkedIn**: [Sync Industrial](https://linkedin.com/company/sync-industrial)
- 🐦 **Twitter**: [@sync_industrial](https://twitter.com/sync_industrial)

---

<div align="center">

**Desenvolvido com ❤️ para revolucionar a gestão industrial**

[![Made with Love](https://img.shields.io/badge/Made%20with-Love-red.svg)](https://github.com/seu-usuario/sync-industrial)

</div>
