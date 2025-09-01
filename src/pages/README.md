# Páginas

Esta pasta contém todas as páginas da aplicação, organizadas por categoria em subpastas.

## 📁 Estrutura das Pastas

```
src/pages/
├── auth/            # Páginas de autenticação
├── dashboard/       # Páginas do dashboard
├── management/      # Páginas de gestão
└── public/          # Páginas públicas
```

## 🎯 Categorias de Páginas

### Auth Pages (`/auth`)
Páginas relacionadas à autenticação:
- `Login` - Tela de login
- `EsqueceuSenha` - Recuperação de senha

### Dashboard Pages (`/dashboard`)
Páginas do painel principal:
- `Dashboard` - Página principal do sistema
- `Relatorios` - Relatórios e análises
- `RelatoriosRefactored` - Versão refatorada dos relatórios

### Management Pages (`/management`)
Páginas de gestão de dados:
- `Funcionarios` - Gestão de funcionários
- `Maquinas` - Gestão de máquinas
- `Departamentos` - Gestão de departamentos
- `Perfil` - Perfil do usuário

### Public Pages (`/public`)
Páginas públicas do site:
- `LandingPage` - Página inicial
- `Sobre` - Página sobre a empresa
- `Contato` - Página de contato
- `Diferenciais` - Diferenciais da empresa

## 📦 Como Usar

### Importação por Categoria
```tsx
// Importar páginas de autenticação
import { Login, EsqueceuSenha } from '../pages/auth';

// Importar páginas do dashboard
import { Dashboard, Relatorios } from '../pages/dashboard';

// Importar páginas de gestão
import { Funcionarios, Maquinas, Departamentos } from '../pages/management';

// Importar páginas públicas
import { LandingPage, Sobre, Contato } from '../pages/public';
```

### Importação Centralizada
```tsx
// Importar todas as páginas
import {
  Login,
  Dashboard,
  Funcionarios,
  Maquinas,
  Departamentos,
  LandingPage
} from '../pages';
```

### Importação Direta
```tsx
// Importar página específica
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Funcionarios from '../pages/management/Funcionarios';
```

## 🎨 Convenções

### Nomenclatura
- **PascalCase** para nomes de páginas
- **Descriptivo** e claro
- **Consistente** com a funcionalidade

### Estrutura de Página
```tsx
// 1. Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, PageHeader } from '../components/layout';

// 2. Interface (se necessário)
interface PageProps {
  // props aqui
}

// 3. Componente da Página
const PageName: React.FC<PageProps> = () => {
  // Hooks e lógica
  const navigate = useNavigate();

  // Handlers
  const handleAction = () => {
    // lógica aqui
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Título da Página"
          subtitle="Subtítulo da página"
        />
        {/* Conteúdo da página */}
      </main>
    </div>
  );
};

// 4. Export
export default PageName;
```

### Organização de Conteúdo
1. **Header** - Cabeçalho da página
2. **PageHeader** - Título e descrição
3. **Filtros** - Controles de busca/filtro
4. **Conteúdo Principal** - Dados e funcionalidades
5. **Modais** - Popups e diálogos
6. **Footer** - Rodapé (se necessário)

## 🔧 Desenvolvimento

### Criando Novas Páginas
1. Identifique a categoria apropriada
2. Crie o arquivo na pasta correta
3. Adicione a exportação no `index.ts` da pasta
4. Configure a rota no `App.tsx`
5. Teste a navegação e funcionalidades

### Padrões de Navegação
- Use `react-router-dom` para navegação
- Implemente breadcrumbs quando necessário
- Mantenha URLs consistentes
- Considere estados de loading e erro

### Responsividade
- Design mobile-first
- Teste em diferentes tamanhos de tela
- Use componentes responsivos
- Considere acessibilidade

## 📚 Documentação

Cada página deve ter:
- **Descrição** clara da funcionalidade
- **Rota** definida no roteamento
- **Dependências** listadas
- **Estados** possíveis (loading, erro, vazio)
- **Interações** principais documentadas 