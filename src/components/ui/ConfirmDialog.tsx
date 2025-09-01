import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import ActionButton from './ActionButton';
import { FaExclamationTriangle, FaQuestionCircle, FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'info' | 'question';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'question',
  maxWidth = 'sm',
  fullWidth = true
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      case 'question':
      default:
        return <FaQuestionCircle className="text-[var(--primary)]" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      case 'question':
      default:
        return 'text-[var(--primary)]';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <Box className="flex items-center gap-3">
          <div className={`text-xl ${getIconColor()}`}>
            {getIcon()}
          </div>
          <Typography variant="h6" className="font-semibold">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent className="p-6">
        <Typography variant="body1" className="text-[var(--text)]">
          {message}
        </Typography>
      </DialogContent>
      
      <DialogActions className="p-6 gap-3">
        <ActionButton
          label={cancelText}
          icon={<FaTimes />}
          onClick={onCancel}
          variant="outlined"
          color="error"
          size="medium"
        />
        <ActionButton
          label={confirmText}
          icon={<FaCheck />}
          onClick={onConfirm}
          variant="contained"
          color="success"
          size="medium"
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 