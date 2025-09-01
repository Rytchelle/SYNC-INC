import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout";
import { Card, CardContent, Button } from '@mui/material';
import { 
  FaExclamationTriangle, FaHome, FaArrowLeft, FaSearch,
  FaCog, FaUsers, FaTools
} from 'react-icons/fa';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoAdmin = () => {
    navigate('/admin');
  };

  const quickLinks = [
    {
      title: "Painel Administrativo",
      description: "Acesse todas as funcionalidades do sistema",
      icon: <FaCog />,
      route: "/admin",
      color: "#3b82f6"
    },
    {
      title: "Dashboard",
      description: "Visão geral do sistema",
      icon: <FaHome />,
      route: "/dashboard",
      color: "#10b981"
    },
    {
      title: "Usuários",
      description: "Gestão de usuários",
      icon: <FaUsers />,
      route: "/usuarios",
      color: "#f59e0b"
    },
    {
      title: "Manutenção",
      description: "Sistema de manutenções",
      icon: <FaTools />,
      route: "/manutencao",
      color: "#ef4444"
    }
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10]">
        <div className="w-full max-w-4xl text-center">
          {/* Erro 404 Principal */}
          <div className="mb-12">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <FaExclamationTriangle className="text-white text-6xl" />
              </div>
              <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-4">
                404
              </h1>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-4">
                Página Não Encontrada
              </h2>
              <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
                Oops! A página que você está procurando não existe ou foi movida. 
                Verifique se o endereço está correto ou navegue para uma das opções abaixo.
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="contained"
                startIcon={<FaHome />}
                onClick={handleGoHome}
                sx={{
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  px: 4,
                  py: 2,
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'var(--primary-dark)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Página Inicial
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<FaArrowLeft />}
                onClick={handleGoBack}
                sx={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  px: 4,
                  py: 2,
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Voltar
              </Button>

              <Button
                variant="outlined"
                startIcon={<FaCog />}
                onClick={handleGoAdmin}
                sx={{
                  borderColor: '#10b981',
                  color: '#10b981',
                  px: 4,
                  py: 2,
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: '#10b981',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Painel Admin
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaSearch className="text-[var(--primary)] text-2xl" />
                <h3 className="text-2xl font-bold text-[var(--primary)]">
                  Acesso Rápido
                </h3>
              </div>
              <p className="text-[var(--muted)] mb-8">
                Talvez você esteja procurando por uma dessas páginas:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((link, index) => (
                  <Card 
                    key={index}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                    onClick={() => navigate(link.route)}
                    sx={{
                      background: `linear-gradient(135deg, ${link.color}15 0%, ${link.color}25 100%)`,
                      border: `1px solid ${link.color}30`,
                      borderRadius: '16px',
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div 
                        className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: link.color }}
                      >
                        {link.icon}
                      </div>
                      <h4 className="font-semibold text-[var(--text)] mb-2">
                        {link.title}
                      </h4>
                      <p className="text-sm text-[var(--muted)] mb-4">
                        {link.description}
                      </p>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(link.route);
                        }}
                        sx={{
                          borderColor: link.color,
                          color: link.color,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: link.color,
                            color: 'white',
                          },
                        }}
                      >
                        Acessar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              Precisa de Ajuda?
            </h4>
            <p className="text-blue-600 mb-4">
              Se você continuar tendo problemas para encontrar o que procura, 
              entre em contato com o suporte técnico.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm text-blue-600">
              <span>📧 suporte@empresa.com</span>
              <span className="hidden sm:inline">•</span>
              <span>📞 (11) 1234-5678</span>
              <span className="hidden sm:inline">•</span>
              <span>🕒 Seg-Sex: 8h às 18h</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
