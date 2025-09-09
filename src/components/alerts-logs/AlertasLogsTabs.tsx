import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { FaBell, FaClipboardList } from 'react-icons/fa';

interface AlertasLogsTabsProps {
  activeTab: number;
  onTabChange: (newValue: number) => void;
}

const AlertasLogsTabs: React.FC<AlertasLogsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-transparent backdrop-blur-md rounded-lg shadow-sm border border-gray-200/30 mb-8">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => onTabChange(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              padding: '16px 24px',
              color: '#6B7280',
              '&.Mui-selected': {
                color: '#2563EB',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2563EB',
              height: '3px'
            }
          }}
        >
          <Tab 
            label={
              <div className="flex items-center space-x-2">
                <FaBell className="text-lg" />
                <span>Alertas</span>
              </div>
            } 
          />
          <Tab 
            label={
              <div className="flex items-center space-x-2">
                <FaClipboardList className="text-lg" />
                <span>Logs</span>
              </div>
            } 
          />
        </Tabs>
      </Box>
    </div>
  );
};

export default AlertasLogsTabs;
