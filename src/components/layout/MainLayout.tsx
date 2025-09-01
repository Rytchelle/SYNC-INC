import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar, Breadcrumbs } from '../navigation';
import { Header } from './';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showBreadcrumbs?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showSidebar = true, 
  showBreadcrumbs = true 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {showSidebar && (
        <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
      )}
      
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: showSidebar ? 0 : 0,
        transition: 'margin-left 0.3s ease'
      }}>
        <Header />
        
        {showBreadcrumbs && <Breadcrumbs />}
        
        <Box sx={{ 
          flexGrow: 1,
          backgroundColor: 'var(--bg)',
          minHeight: 'calc(100vh - 64px - 48px)' // Header height - Breadcrumbs height
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
