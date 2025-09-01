import React from 'react';
import { Card, CardContent, Button, Chip } from '@mui/material';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface CardAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
  variant?: 'text' | 'outlined' | 'contained';
}

interface CardField {
  label: string;
  value: string | React.ReactNode;
  type?: 'text' | 'chip' | 'custom';
  chipColor?: string;
}

interface ItemCardProps {
  title: string;
  subtitle?: string;
  fields: CardField[];
  actions?: CardAction[];
  className?: string;
  headerIcon?: React.ReactNode;
  headerColor?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  subtitle,
  fields,
  actions = [],
  className = "",
  headerIcon,
  headerColor = "var(--primary)"
}) => {
  const defaultActions: CardAction[] = [
    {
      icon: <FaEye />,
      label: "Ver Detalhes",
      onClick: () => {},
      color: "var(--primary)",
      variant: "outlined"
    },
    {
      icon: <FaEdit />,
      label: "Editar",
      onClick: () => {},
      color: "var(--secondary)",
      variant: "outlined"
    },
    {
      icon: <FaTrash />,
      label: "Excluir",
      onClick: () => {},
      color: "#ef4444",
      variant: "outlined"
    }
  ];

  const finalActions = actions.length > 0 ? actions : defaultActions;

  const renderFieldValue = (field: CardField) => {
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
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {headerIcon && (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: headerColor }}
              >
                {headerIcon}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-[var(--text)]">{title}</h3>
              {subtitle && (
                <p className="text-sm text-[var(--muted)]">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-3 mb-4">
          {fields.map((field, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm font-medium text-[var(--primary)]">
                {field.label}:
              </span>
              {renderFieldValue(field)}
            </div>
          ))}
        </div>

        {/* Actions */}
        {finalActions.length > 0 && (
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            {finalActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outlined"}
                size="small"
                startIcon={action.icon}
                onClick={action.onClick}
                sx={{
                  color: action.color || 'var(--primary)',
                  borderColor: action.color || 'var(--primary)',
                  '&:hover': {
                    backgroundColor: action.variant === 'contained' 
                      ? action.color 
                      : `${action.color}20`,
                    borderColor: action.color || 'var(--primary)',
                  },
                  textTransform: 'none',
                  fontSize: '12px'
                }}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
