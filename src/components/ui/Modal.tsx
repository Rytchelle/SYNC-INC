import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ActionButton from './ActionButton';
import { FaEye } from 'react-icons/fa';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  visible, 
  onClose, 
  title, 
  children, 
  actions,
  maxWidth = 'md',
  fullWidth = true 
}) => {
  if (!visible) return null;

  return (
    <Dialog open={visible} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
        {title}
      </DialogTitle>
      <DialogContent className="p-6">
        {children}
      </DialogContent>
      <DialogActions className="p-6">
        {actions || (
          <ActionButton
            icon={<FaEye />}
            label="Fechar"
            onClick={onClose}
            variant="outlined"
            size="small"
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal; 