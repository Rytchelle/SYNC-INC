import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Drawer, List, ListItem, ListItemIcon, ListItemText, 
  Divider, IconButton, Tooltip, Collapse, Badge, Box
} from '@mui/material';
import { 
  FaHome, FaUsers, FaUserShield, FaIndustry, FaBuilding, 
  FaTools, FaBell, FaCog, FaChartBar, FaTachometerAlt,
  FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp,
  FaStar, FaHistory, FaPlus, FaTimes
} from 'react-icons/fa';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  children?: MenuItem[];
}

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>(['management']);
  const [favorites, setFavorites] = useState<string[]>(['admin', 'dashboard']);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'admin',
      label: 'Painel Admin',
      icon: <FaCog />,
      path: '/admin'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaTachometerAlt />,
      path: '/dashboard'
    },
    {
      id: 'management',
      label: 'Gestão',
      icon: <FaUsers />,
      path: '',
      children: [
        {
          id: 'usuarios',
          label: 'Usuários',
          icon: <FaUsers />,
          path: '/usuarios',
          badge: 142
        },
        {
          id: 'funcionarios',
          label: 'Funcionários',
          icon: <FaUserShield />,
          path: '/funcionarios',
          badge: 89
        },
        {
          id: 'departamentos',
          label: 'Departamentos',
          icon: <FaBuilding />,
          path: '/departamentos'
        }
      ]
    },
    {
      id: 'operations',
      label: 'Operações',
      icon: <FaIndustry />,
      path: '',
      children: [
        {
          id: 'maquinas',
          label: 'Máquinas',
          icon: <FaIndustry />,
          path: '/maquinas',
          badge: 24
        },
        {
          id: 'manutencao',
          label: 'Manutenção',
          icon: <FaTools />,
          path: '/manutencao',
          badge: 15
        },
        {
          id: 'alertas-logs',
          label: 'Alertas & Logs',
          icon: <FaBell />,
          path: '/alertas-logs',
          badge: 8
        }
      ]
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: <FaChartBar />,
      path: '/estatisticas'
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: <FaCog />,
      path: '/configuracoes'
    }
  ];

  // Atualizar histórico de navegação
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== '/' && !navigationHistory.includes(currentPath)) {
      setNavigationHistory(prev => [currentPath, ...prev.slice(0, 4)]);
    }
  }, [location.pathname]);

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.children) {
      toggleExpanded(item.id);
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isFavorite = (itemId: string) => favorites.includes(itemId);

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.path);

    return (
      <React.Fragment key={item.id}>
        <ListItem
          button
          onClick={() => handleItemClick(item)}
          sx={{
            pl: 2 + level * 2,
            backgroundColor: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'inherit',
            '&:hover': {
              backgroundColor: active ? 'var(--primary)' : 'rgba(0,0,0,0.04)',
            },
            borderRadius: '8px',
            margin: '2px 8px',
          }}
        >
          <ListItemIcon sx={{ color: active ? 'white' : 'var(--primary)', minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          
          {open && (
            <>
              <ListItemText 
                primary={item.label}
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontSize: '14px',
                    fontWeight: active ? 600 : 400
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.badge && (
                  <Badge 
                    badgeContent={item.badge} 
                    color="error" 
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '10px',
                        height: '16px',
                        minWidth: '16px'
                      }
                    }}
                  />
                )}
                
                <Tooltip title={isFavorite(item.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    sx={{ 
                      color: isFavorite(item.id) ? '#fbbf24' : 'rgba(0,0,0,0.3)',
                      '&:hover': { color: '#fbbf24' }
                    }}
                  >
                    <FaStar size={12} />
                  </IconButton>
                </Tooltip>
                
                {hasChildren && (
                  <IconButton size="small" sx={{ color: active ? 'white' : 'inherit' }}>
                    {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </IconButton>
                )}
              </Box>
            </>
          )}
        </ListItem>

        {hasChildren && (
          <Collapse in={isExpanded && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const favoriteItems = menuItems
    .flatMap(item => item.children ? [item, ...item.children] : [item])
    .filter(item => isFavorite(item.id) && item.path);

  const historyItems = navigationHistory
    .map(path => {
      const item = menuItems
        .flatMap(item => item.children ? [item, ...item.children] : [item])
        .find(item => item.path === path);
      return item;
    })
    .filter(Boolean) as MenuItem[];

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }
      }}
      sx={{
        width: open ? 280 : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 280 : 64,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          borderRight: '1px solid rgba(0,0,0,0.12)',
          backgroundColor: '#fafafa',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: open ? 'space-between' : 'center',
        p: 2,
        borderBottom: '1px solid rgba(0,0,0,0.12)'
      }}>
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FaIndustry className="text-[var(--primary)] text-xl" />
            <span className="font-bold text-[var(--primary)]">Sistema Industrial</span>
          </Box>
        )}
        <IconButton onClick={onToggle} size="small">
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </IconButton>
      </Box>

      {/* Favoritos */}
      {open && favoriteItems.length > 0 && (
        <>
          <Box sx={{ p: 2, pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <FaStar className="text-yellow-500 text-sm" />
              <span className="text-sm font-semibold text-gray-600">Favoritos</span>
            </Box>
            <List dense>
              {favoriteItems.map(item => (
                <ListItem
                  key={`fav-${item.id}`}
                  button
                  onClick={() => navigate(item.path)}
                  sx={{
                    py: 0.5,
                    borderRadius: '6px',
                    backgroundColor: isActive(item.path) ? 'var(--primary)' : 'transparent',
                    color: isActive(item.path) ? 'white' : 'inherit',
                    '&:hover': {
                      backgroundColor: isActive(item.path) ? 'var(--primary)' : 'rgba(0,0,0,0.04)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive(item.path) ? 'white' : 'var(--primary)', 
                    minWidth: 32 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        fontSize: '13px',
                        fontWeight: isActive(item.path) ? 600 : 400
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider />
        </>
      )}

      {/* Menu Principal */}
      <List sx={{ flex: 1, pt: 1 }}>
        {menuItems.map(item => renderMenuItem(item))}
      </List>

      {/* Histórico */}
      {open && historyItems.length > 0 && (
        <>
          <Divider />
          <Box sx={{ p: 2, pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <FaHistory className="text-gray-500 text-sm" />
              <span className="text-sm font-semibold text-gray-600">Recentes</span>
            </Box>
            <List dense>
              {historyItems.slice(0, 3).map((item, index) => (
                <ListItem
                  key={`history-${index}`}
                  button
                  onClick={() => navigate(item.path)}
                  sx={{
                    py: 0.5,
                    borderRadius: '6px',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                  }}
                >
                  <ListItemIcon sx={{ color: 'var(--primary)', minWidth: 32 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    sx={{ 
                      '& .MuiListItemText-primary': { fontSize: '13px' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default Sidebar;
