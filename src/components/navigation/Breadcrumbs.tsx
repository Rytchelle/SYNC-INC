import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography, Chip } from '@mui/material';
import { FaHome, FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const routeLabels: Record<string, string> = {
  '': 'Início',
  'admin': 'Painel Administrativo',
  'dashboard': 'Dashboard',
  'usuarios': 'Usuários',
  'funcionarios': 'Funcionários',
  'maquinas': 'Máquinas',
  'departamentos': 'Departamentos',
  'manutencao': 'Manutenção',
  'alertas-logs': 'Alertas & Logs',
  'configuracoes': 'Configurações',
  'estatisticas': 'Estatísticas',
  'perfil': 'Perfil',
  'login': 'Login',
  'esqueceu-senha': 'Esqueceu Senha',
  'sobre': 'Sobre',
  'contato': 'Contato',
  'diferenciais': 'Diferenciais'
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Início',
        path: '/',
        icon: <FaHome className="text-sm" />
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        label,
        path: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-10 py-3">
      <MuiBreadcrumbs
        separator={<FaChevronRight className="text-gray-400 text-xs" />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            margin: '0 8px',
          }
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          if (isLast) {
            return (
              <Chip
                key={breadcrumb.path}
                label={breadcrumb.label}
                icon={breadcrumb.icon}
                size="small"
                sx={{
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  fontWeight: 600,
                  '& .MuiChip-icon': {
                    color: 'white'
                  }
                }}
              />
            );
          }

          return (
            <Link
              key={breadcrumb.path}
              to={breadcrumb.path}
              className="flex items-center gap-2 text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 text-sm font-medium"
            >
              {breadcrumb.icon}
              {breadcrumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
