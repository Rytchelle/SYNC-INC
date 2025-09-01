import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

interface Notification {
  id: string;
  message: string;
  type: AlertColor;
  duration?: number;
  title?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  maxNotifications?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  position = 'top-right',
  maxNotifications = 5
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      return updated.slice(0, maxNotifications);
    });
  }, [maxNotifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getIcon = (type: AlertColor) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'error':
        return <FaTimesCircle />;
      case 'info':
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      
      <Box className={`fixed z-50 ${getPositionClasses()} space-y-2`}>
        {notifications.map((notification) => (
          <Snackbar
            key={notification.id}
            open={true}
            autoHideDuration={notification.duration || 6000}
            onClose={() => removeNotification(notification.id)}
            anchorOrigin={{
              vertical: position.includes('top') ? 'top' : 'bottom',
              horizontal: position.includes('right') ? 'right' : 'left',
            }}
          >
            <Alert
              onClose={() => removeNotification(notification.id)}
              severity={notification.type}
              icon={getIcon(notification.type)}
              className="shadow-lg min-w-80"
              title={notification.title}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    </NotificationContext.Provider>
  );
};

// Hook para facilitar o uso
export const useNotification = () => {
  const { addNotification } = useNotifications();
  
  return {
    success: (message: string, title?: string, duration?: number) => 
      addNotification({ message, type: 'success', title, duration }),
    error: (message: string, title?: string, duration?: number) => 
      addNotification({ message, type: 'error', title, duration }),
    warning: (message: string, title?: string, duration?: number) => 
      addNotification({ message, type: 'warning', title, duration }),
    info: (message: string, title?: string, duration?: number) => 
      addNotification({ message, type: 'info', title, duration }),
  };
};

export { NotificationProvider as NotificationSystem }; 