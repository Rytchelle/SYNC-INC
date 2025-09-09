import React from 'react';
import { FaBell, FaExclamationTriangle, FaTimes, FaCheckCircle, FaEye, FaCheck } from 'react-icons/fa';
import StatsCard from '../common/StatsCard';
import FilterSection from '../common/FilterSection';
import ItemCard from '../common/ItemCard';
import type { Alert } from '../../../shared/alertsLogsData';
import type { AlertStats, FilterConfig } from './types';

interface AlertasTabProps {
  alertsStats: AlertStats;
  filteredAlerts: Alert[];
  alertSearchTerm: string;
  onAlertSearchChange: (value: string) => void;
  alertFilterConfigs: FilterConfig[];
  onAlertDetails: (alert: Alert) => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onResolveAlert: (alertId: string) => void;
}

const AlertasTab: React.FC<AlertasTabProps> = ({
  alertsStats,
  filteredAlerts,
  alertSearchTerm,
  onAlertSearchChange,
  alertFilterConfigs,
  onAlertDetails,
  onAcknowledgeAlert,
  onResolveAlert
}) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <FaTimes className="text-red-500 text-lg" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500 text-lg" />;
      case 'info': return <FaBell className="text-blue-500 text-lg" />;
      case 'success': return <FaCheckCircle className="text-green-500 text-lg" />;
      default: return <FaBell className="text-gray-500 text-lg" />;
    }
  };

  const getAlertCardFields = (alert: Alert) => [
    { label: 'Origem', value: alert.source },
    { label: 'Tipo', value: alert.type },
    { label: 'Prioridade', value: alert.priority },
    { label: 'Status', value: alert.status },
    { label: 'Data', value: new Date(alert.createdAt).toLocaleString() }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total de Alertas" 
          value={alertsStats.total} 
          icon={<FaBell className="text-blue-600" />} 
          color="blue" 
        />
        <StatsCard 
          title="Alertas Ativos" 
          value={alertsStats.active} 
          icon={<FaExclamationTriangle className="text-orange-600" />} 
          color="orange" 
        />
        <StatsCard 
          title="Alertas Críticos" 
          value={alertsStats.critical} 
          icon={<FaTimes className="text-red-600" />} 
          color="red" 
        />
        <StatsCard 
          title="Alertas Resolvidos" 
          value={alertsStats.resolved} 
          icon={<FaCheckCircle className="text-green-600" />} 
          color="green" 
        />
      </div>

      {/* Filters Section */}
      <div className="bg-transparent backdrop-blur-md rounded-lg shadow-sm border border-gray-200/30 p-6">
        <FilterSection
          title="Filtrar Alertas"
          searchValue={alertSearchTerm}
          onSearchChange={onAlertSearchChange}
          searchPlaceholder="Buscar por título, mensagem ou origem..."
          filters={alertFilterConfigs}
        />
      </div>

      {/* Alerts Grid */}
      <div className="bg-transparent backdrop-blur-md rounded-lg shadow-sm border border-gray-200/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Lista de Alertas ({filteredAlerts.length})
          </h3>
          <div className="text-sm text-gray-500">
            {filteredAlerts.length === 0 ? 'Nenhum alerta encontrado' : `${filteredAlerts.length} alerta(s) encontrado(s)`}
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <FaBell className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum alerta encontrado com os filtros aplicados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAlerts.map((alert) => (
              <ItemCard
                key={alert.id}
                title={alert.title}
                subtitle={alert.message}
                headerIcon={getAlertIcon(alert.type)}
                fields={getAlertCardFields(alert)}
                actions={[
                  {
                    label: 'Ver Detalhes',
                    onClick: () => onAlertDetails(alert),
                    variant: 'outlined' as const,
                    icon: <FaEye />
                  },
                  ...(alert.status === 'active' ? [
                    {
                      label: 'Reconhecer',
                      onClick: () => onAcknowledgeAlert(alert.id),
                      variant: 'contained' as const,
                      icon: <FaCheck />
                    },
                    {
                      label: 'Resolver',
                      onClick: () => onResolveAlert(alert.id),
                      variant: 'contained' as const,
                      icon: <FaCheckCircle />
                    }
                  ] : [])
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertasTab;
