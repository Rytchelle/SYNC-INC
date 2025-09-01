import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FaTimes, FaSave } from 'react-icons/fa';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'number' | 'password' | 'textarea';
  value: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  onFieldChange: (name: string, value: string) => void;
  onSubmit: () => void;
  submitText?: string;
  isEditing?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const FormModal: React.FC<FormModalProps> = ({
  open,
  onClose,
  title,
  fields,
  onFieldChange,
  onSubmit,
  submitText,
  isEditing = false,
  maxWidth = 'md'
}) => {
  const defaultSubmitText = isEditing ? 'Atualizar' : 'Criar';

  const renderField = (field: FormField) => {
    if (field.type === 'select') {
      return (
        <FormControl fullWidth required={field.required}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            label={field.label}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth
        label={field.label}
        type={field.type}
        value={field.value}
        onChange={(e) => onFieldChange(field.name, e.target.value)}
        required={field.required}
        placeholder={field.placeholder}
        multiline={field.type === 'textarea'}
        rows={field.type === 'textarea' ? 4 : 1}
      />
    );
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
        <div className="grid grid-cols-1 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              {renderField(field)}
            </div>
          ))}
        </div>
      </DialogContent>
      
      <DialogActions className="border-t border-gray-200 pt-3">
        <Button
          onClick={onClose}
          sx={{ color: 'var(--muted)' }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          startIcon={<FaSave />}
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'var(--primary-dark)',
            },
          }}
        >
          {submitText || defaultSubmitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
