# Estilos

Esta pasta contém todos os estilos da aplicação, organizados por categoria.

## 📁 Estrutura das Pastas

```
src/styles/
├── base/              # Estilos base da aplicação
│   ├── globals.css    # Estilos globais
│   ├── reset.css      # Reset CSS
│   └── index.ts       # Exportações base
├── modules/           # Estilos modulares por componente
│   ├── Dashboard.module.css
│   ├── LandingPage.module.css
│   ├── Login.module.css
│   └── index.ts       # Exportações modulares
├── components/        # Estilos específicos de componentes (futuro)
└── index.ts          # Exportações centralizadas
```

## 🎯 Categorias de Estilos

### Base Styles (`/base`)
Estilos fundamentais da aplicação:
- **globals.css** - Variáveis CSS, estilos globais e utilitários
- **reset.css** - Reset CSS e normalização

### Module Styles (`/modules`)
Estilos modulares por página/componente:
- **Dashboard.module.css** - Estilos específicos do dashboard
- **LandingPage.module.css** - Estilos da página inicial
- **Login.module.css** - Estilos da página de login

### Components Styles (`/components`)
Estilos específicos de componentes (preparado para futuro):
- Estilos isolados para componentes reutilizáveis
- CSS Modules para componentes específicos

## 📦 Como Usar

### Importação de Estilos Base
```tsx
// Importar estilos globais
import '../../styles/base/globals.css';

// Importar reset CSS
import '../../styles/base/reset.css';
```

### Importação de Estilos Modulares
```tsx
// Importar estilos de módulo
import styles from '../../styles/modules/Dashboard.module.css';

// Usar classes CSS
<div className={styles.container}>
  <div className={styles.content}>
    {/* conteúdo */}
  </div>
</div>
```

### Importação Centralizada
```tsx
// Importar todos os estilos (futuro)
import { globalStyles, resetStyles } from '../../styles';
```

## 🎨 Convenções

### Nomenclatura
- **kebab-case** para nomes de arquivos CSS
- **camelCase** para classes CSS Modules
- **Descriptivo** e claro

### Organização
- **Um arquivo por página/componente** para CSS Modules
- **Estilos globais** centralizados
- **Variáveis CSS** no :root

### Responsividade
- **Mobile-first** approach
- **Breakpoints** consistentes
- **Flexbox/Grid** para layouts

## 🔧 Desenvolvimento

### Criando Novos Estilos
1. Identifique a categoria apropriada
2. Crie o arquivo na pasta correta
3. Use CSS Modules para isolamento
4. Documente variáveis e classes importantes

### Variáveis CSS
```css
:root {
  --primary: #f38220;
  --primary-dark: #d96c0a;
  --accent: #f4ede7;
  --bg: #fcfaf8;
  --text: #1c140d;
  --muted: #9c7049;
  --success: #07880e;
  --danger: #e71008;
  --warning: #f38524;
}
```

### CSS Modules
```css
/* Dashboard.module.css */
.container {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 2rem;
}
```

## 📚 Documentação

Cada arquivo de estilo deve ter:
- **Descrição** clara do propósito
- **Variáveis** documentadas
- **Classes** principais explicadas
- **Responsividade** considerada
- **Acessibilidade** implementada

---

**Estrutura organizada para facilitar a manutenção e escalabilidade dos estilos! 🎨** 