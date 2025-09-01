# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Sync Industrial**! Este documento fornece diretrizes e informações importantes para contribuições.

## 📋 Índice

- [🎯 Como Contribuir](#-como-contribuir)
- [🚀 Configuração do Ambiente](#-configuração-do-ambiente)
- [📝 Padrões de Código](#-padrões-de-código)
- [🎨 Padrões de Design](#-padrões-de-design)
- [🧪 Testes](#-testes)
- [📚 Documentação](#-documentação)
- [🔍 Processo de Review](#-processo-de-review)
- [📞 Comunicação](#-comunicação)

---

## 🎯 Como Contribuir

### **Tipos de Contribuição**

#### 🐛 **Reportar Bugs**
- Use o template de issue para bugs
- Inclua passos para reproduzir
- Adicione screenshots quando relevante
- Especifique ambiente e versões

#### 💡 **Sugerir Melhorias**
- Descreva a funcionalidade desejada
- Explique o benefício para os usuários
- Considere a implementação técnica
- Verifique se já não foi sugerido

#### 🔧 **Correções de Código**
- Fork o repositório
- Crie uma branch para sua correção
- Implemente a solução
- Teste suas mudanças
- Abra um Pull Request

#### ✨ **Novas Funcionalidades**
- Discuta a ideia primeiro (issue)
- Planeje a implementação
- Siga os padrões do projeto
- Documente adequadamente

---

## 🚀 Configuração do Ambiente

### **Pré-requisitos**
```bash
Node.js >= 18.0.0
npm >= 8.0.0 ou yarn >= 1.22.0
Git >= 2.30.0
```

### **Setup Local**
```bash
# 1. Fork o repositório
# 2. Clone seu fork
git clone https://github.com/seu-usuario/sync-industrial.git
cd sync-industrial

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/original/sync-industrial.git

# 4. Instale dependências
npm install

# 5. Execute o projeto
npm run dev
```

### **Scripts Úteis**
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run lint         # Verificação de código
npm run lint:fix     # Correção automática
npm run type-check   # Verificação TypeScript
```

---

## 📝 Padrões de Código

### **TypeScript**

#### **Configuração**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### **Nomenclatura**
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

#### **Estrutura de Componentes**
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

### **React**

#### **Hooks**
```typescript
// Use hooks customizados quando possível
const { data, loading, error } = useApiData();

// Use useCallback para funções passadas como props
const handleSubmit = useCallback((data) => {
  // lógica
}, [dependencies]);

// Use useMemo para cálculos complexos
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

#### **Performance**
```typescript
// Use React.memo para componentes que não mudam frequentemente
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// Use lazy loading para componentes grandes
const LazyComponent = lazy(() => import('./LazyComponent'));
```

### **ESLint e Prettier**

#### **Configuração**
```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "react-hooks/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

---

## 🎨 Padrões de Design

### **Tailwind CSS**

#### **Classes Consistentes**
```typescript
// Cards
const cardClasses = "bg-white rounded-xl shadow-lg p-6";

// Botões
const buttonClasses = "bg-gradient-to-r from-primary to-primary-dark text-white";

// Inputs
const inputClasses = "border border-gray-300 rounded-lg px-4 py-2";
```

#### **Responsividade**
```typescript
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  <div className="p-4 md:p-6 lg:p-8">
    {/* conteúdo */}
  </div>
</div>
```

### **Material-UI**

#### **Integração**
```typescript
// Use sx prop para customizações
<Button
  sx={{
    backgroundColor: 'var(--primary)',
    '&:hover': {
      backgroundColor: 'var(--primary-dark)',
    },
  }}
>
  Botão
</Button>
```

### **Cores e Temas**

#### **CSS Variables**
```css
:root {
  --primary: #f38220;
  --primary-dark: #d96c0a;
  --accent: #f4ede7;
  --background: #fcfaf8;
  --text: #1c140d;
  --muted: #9c7049;
}
```

---

## 🧪 Testes

### **Estrutura de Testes**
```
src/
├── components/
│   └── __tests__/
│       ├── Component.test.tsx
│       └── Component.spec.tsx
├── hooks/
│   └── __tests__/
│       └── useHook.test.ts
└── utils/
    └── __tests__/
        └── utils.test.ts
```

### **Exemplo de Teste**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from '../Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call onAction when clicked', () => {
    const mockAction = jest.fn();
    render(<Component title="Test" onAction={mockAction} />);
    
    fireEvent.click(screen.getByText('Test'));
    expect(mockAction).toHaveBeenCalled();
  });
});
```

### **Cobertura de Testes**
- Mínimo 80% de cobertura
- Teste todos os caminhos críticos
- Teste edge cases
- Teste acessibilidade

---

## 📚 Documentação

### **Comentários de Código**
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

### **README de Componentes**
```markdown
# ComponentName

Descrição breve do componente.

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| title | string | Sim | Título do componente |
| onAction | function | Não | Callback executado ao clicar |

## Exemplo

```tsx
<ComponentName 
  title="Exemplo"
  onAction={() => console.log('clicked')}
/>
```
```

---

## 🔍 Processo de Review

### **Checklist de Pull Request**

#### **Código**
- [ ] Segue os padrões de nomenclatura
- [ ] Passa nos testes
- [ ] Não tem warnings/errors
- [ ] Cobertura de testes adequada
- [ ] Performance otimizada

#### **Funcionalidade**
- [ ] Funciona conforme especificado
- [ ] Responsivo em mobile
- [ ] Acessível (WCAG 2.1)
- [ ] Compatível com navegadores

#### **Documentação**
- [ ] README atualizado
- [ ] Comentários adequados
- [ ] Changelog atualizado
- [ ] Exemplos de uso

### **Template de Pull Request**
```markdown
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Testes
- [ ] Testes unitários passam
- [ ] Testes de integração passam
- [ ] Testado manualmente

## Screenshots (se aplicável)
Adicione screenshots das mudanças visuais.

## Checklist
- [ ] Código segue os padrões
- [ ] Documentação atualizada
- [ ] Changelog atualizado
```

---

## 📞 Comunicação

### **Canais de Comunicação**
- **Issues**: Para bugs e melhorias
- **Discussions**: Para discussões gerais
- **Pull Requests**: Para contribuições de código
- **Email**: suporte@sync-industrial.com

### **Etiquetas de Issues**
- `bug`: Problemas no código
- `enhancement`: Melhorias
- `feature`: Novas funcionalidades
- `documentation`: Documentação
- `good first issue`: Para iniciantes
- `help wanted`: Precisa de ajuda

### **Código de Conduta**
- Seja respeitoso e inclusivo
- Ajude outros contribuidores
- Mantenha discussões construtivas
- Reporte comportamentos inadequados

---

## 🏆 Reconhecimento

### **Contribuidores**
- Seu nome será adicionado ao README
- Badge de contribuidor no perfil
- Agradecimento em releases

### **Níveis de Contribuição**
- **Bronze**: 1-5 contribuições
- **Prata**: 6-15 contribuições
- **Ouro**: 16+ contribuições
- **Diamante**: Contribuições excepcionais

---

## 📋 Checklist Rápido

Antes de submeter uma contribuição:

- [ ] Código segue os padrões
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Responsivo testado
- [ ] Acessibilidade verificada
- [ ] Performance otimizada
- [ ] Changelog atualizado

---

**Obrigado por contribuir com o Sync Industrial! 🚀**

---

**Última atualização**: Janeiro 2024
**Versão**: 1.0.0 