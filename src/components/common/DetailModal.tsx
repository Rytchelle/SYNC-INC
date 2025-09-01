import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

interface DetailField {
  label: string;
  value: string | React.ReactNode;
  type?: 'text' | 'chip' | 'custom';
  chipColor?: string;
}

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: DetailField[];
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onClose,
  title,
  fields,
  actions,
  maxWidth = 'md'
}) => {
  const renderFieldValue = (field: DetailField) => {
    switch (field.type) {
      case 'chip':
        return (
          <Chip
            label={field.value}
            size="small"
            sx={{
              backgroundColor: field.chipColor || 'var(--primary)',
              color: 'white',
              fontWeight: 600
            }}
          />
        );
      case 'custom':
        return field.value;
      default:
        return <span className="text-gray-700">{field.value}</span>;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      <DialogTitle className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="text-xl font-bold text-[var(--primary)]">{title}</span>
        <Button
          onClick={onClose}
          sx={{ 
            minWidth: 'auto', 
            p: 1,
            color: 'var(--muted)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          <FaTimes />
        </Button>
      </DialogTitle>
      
      <DialogContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium text-[var(--primary)]">
                {field.label}
              </p>
              {renderFieldValue(field)}
            </div>
          ))}
        </div>
      </DialogContent>
      
      {actions && (
        <DialogActions className="border-t border-gray-200 pt-3">
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DetailModal;
