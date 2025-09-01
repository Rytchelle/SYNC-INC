import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/layout";
import { Card, CardContent, Button } from '@mui/material';
import { 
  FaUsers, FaCog, FaTools, FaBell, FaUserShield,
  FaIndustry, FaBuilding, FaChartBar, FaArrowRight, FaTachometerAlt,
  FaShieldAlt, FaDatabase, FaNetworkWired, FaClipboardList
} from 'react-icons/fa';

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
  bgGradient: string;
  stats?: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ 
  title, description, icon, route, color, bgGradient, stats 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(route);
  };

  return (
    <Card 
      className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
      onClick={handleCardClick}
      sx={{
        background: bgGradient,
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none'
        }
      }}
    >
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white shadow-lg"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <FaArrowRight className="text-white/70 text-xl" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">{description}</p>
        
        {stats && (
          <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-white/90 text-sm font-medium">{stats}</p>
          </div>
        )}
        
        <Button
          variant="contained"
          endIcon={<FaArrowRight />}
          onClick={handleCardClick}
          sx={{
            mt: 2,
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
              transform: 'translateX(4px)',
            },
            transition: 'all 0.3s ease',
            textTransform: 'none',
            fontWeight: 600
          }}
          fullWidth
        >
          Acessar
        </Button>
      </CardContent>
    </Card>
  );
};

const AdminDashboard: React.FC = () => {
  const adminSections = [
    {
      title: "Gestão de Usuários",
      description: "Gerenciar usuários do sistema, permissões e controle de acesso",
      icon: <FaUsers />,
      route: "/usuarios",
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      stats: "142 usuários ativos"
    },
    {
      title: "Funcionários",
      description: "Cadastro e gestão de funcionários da empresa",
      icon: <FaUserShield />,
      route: "/funcionarios",
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      stats: "89 funcionários"
    },
    {
      title: "Máquinas",
      description: "Controle e monitoramento de máquinas industriais",
      icon: <FaIndustry />,
      route: "/maquinas",
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      stats: "24 máquinas ativas"
    },
    {
      title: "Departamentos",
      description: "Organização e estrutura departamental da empresa",
      icon: <FaBuilding />,
      route: "/departamentos",
      color: "#8b5cf6",
      bgGradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      stats: "12 departamentos"
    },
    {
      title: "Manutenção",
      description: "Gestão de manutenções preventivas, corretivas e emergenciais",
      icon: <FaTools />,
      route: "/manutencao",
      color: "#ef4444",
      bgGradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      stats: "15 manutenções agendadas"
    },
    {
      title: "Alertas & Logs",
      description: "Monitoramento de alertas do sistema e logs de auditoria",
      icon: <FaBell />,
      route: "/alertas-logs",
      color: "#f97316",
      bgGradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      stats: "8 alertas ativos"
    },
    {
      title: "Configurações",
      description: "Configurações gerais do sistema e personalização",
      icon: <FaCog />,
      route: "/configuracoes",
      color: "#6b7280",
      bgGradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
      stats: "Sistema configurado"
    },
    {
      title: "Dashboard Principal",
      description: "Visão geral com métricas e indicadores principais",
      icon: <FaTachometerAlt />,
      route: "/dashboard",
      color: "#06b6d4",
      bgGradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      stats: "Dados em tempo real"
    },
    {
      title: "Relatórios",
      description: "Relatórios detalhados e análises de desempenho",
      icon: <FaChartBar />,
      route: "/relatorios",
      color: "#84cc16",
      bgGradient: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
      stats: "25 relatórios disponíveis"
    }
  ];

  const systemStats = [
    {
      title: "Sistema Online",
      value: "99.9%",
      icon: <FaNetworkWired />,
      color: "#10b981"
    },
    {
      title: "Usuários Ativos",
      value: "142",
      icon: <FaUsers />,
      color: "#3b82f6"
    },
    {
      title: "Alertas Pendentes",
      value: "8",
      icon: <FaBell />,
      color: "#f59e0b"
    },
    {
      title: "Backup Atualizado",
      value: "Hoje",
      icon: <FaDatabase />,
      color: "#8b5cf6"
    }
  ];

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Painel Administrativo</h1>
          <p className="text-[var(--muted)]">Central de controle e gestão do sistema industrial</p>
        </div>

          {/* Estatísticas do Sistema */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStats.map((stat, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: stat.color }}>
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                      style={{ backgroundColor: stat.color }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Seção de Acesso Rápido */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FaClipboardList className="text-[var(--primary)] text-2xl" />
                <h2 className="text-2xl font-bold text-[var(--primary)]">Acesso Rápido às Funcionalidades</h2>
              </div>
              <p className="text-[var(--muted)] mb-6">
                Selecione uma das opções abaixo para acessar rapidamente as principais funcionalidades do sistema administrativo.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminSections.map((section, index) => (
                  <AdminCard key={index} {...section} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seção de Ações Rápidas */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FaShieldAlt className="text-[var(--primary)] text-2xl" />
                <h2 className="text-2xl font-bold text-[var(--primary)]">Ações Administrativas</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outlined"
                  startIcon={<FaDatabase />}
                  sx={{
                    p: 3,
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                    },
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                  fullWidth
                >
                  Backup do Sistema
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<FaNetworkWired />}
                  sx={{
                    p: 3,
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                    },
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                  fullWidth
                >
                  Status da Rede
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<FaShieldAlt />}
                  sx={{
                    p: 3,
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                    },
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                  fullWidth
                >
                  Auditoria de Segurança
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </MainLayout>
  );
};

export default AdminDashboard;
