import React, { useState } from 'react';
import { MainLayout } from '../layout';
import AlertasLogsHeader from './AlertasLogsHeader';
import AlertasLogsTabs from './AlertasLogsTabs';
import AlertasTab from './AlertasTab';
import LogsTab from './LogsTab';
import DetailModal from '../common/DetailModal';
import { useFilters } from '../../hooks/useFilters';
import { useModal } from '../../hooks/useModal';
import { alertsData, logsData, alertsStats, logsStats } from '../../shared/alertsLogsData';
import type { Alert, LogEntry } from '../../shared/alertsLogsData';
import type { FilterConfig } from './types';

const AlertasLogsContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const alertModal = useModal();
  const logModal = useModal();

  // Filtros para alertas
  const {
    searchTerm: alertSearchTerm,
    setSearchTerm: setAlertSearchTerm,
    filteredData: filteredAlerts
  } = useFilters({
    data: alertsData,
    searchFields: ['title', 'message', 'source'],
    filterFields: {
      type: (alert: Alert) => alert.type,
      status: (alert: Alert) => alert.status,
      priority: (alert: Alert) => alert.priority
    }
  });

  // Filtros para logs
  const {
    searchTerm: logSearchTerm,
    setSearchTerm: setLogSearchTerm,
    filteredData: filteredLogs
  } = useFilters({
    data: logsData,
    searchFields: ['message', 'source', 'userName'],
    filterFields: {
      level: (log: LogEntry) => log.level,
      category: (log: LogEntry) => log.category
    }
  });

  // Handlers para ações dos alertas
  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
  };

  const handleResolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
  };

  // Handlers para abrir modais de detalhes
  const handleAlertDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    alertModal.openModal();
  };

  const handleLogDetails = (log: LogEntry) => {
    setSelectedLog(log);
    logModal.openModal();
  };

  // Configuração dos filtros para alertas
  const alertFilterConfigs: FilterConfig[] = [
    {
      name: 'type',
      label: 'Tipo',
      value: 'all',
      options: [
        { value: 'error', label: 'Erro' },
        { value: 'warning', label: 'Aviso' },
        { value: 'info', label: 'Info' },
        { value: 'success', label: 'Sucesso' }
      ],
      onChange: (value: string) => console.log('Type filter changed:', value)
    },
    {
      name: 'status',
      label: 'Status',
      value: 'all',
      options: [
        { value: 'active', label: 'Ativo' },
        { value: 'acknowledged', label: 'Reconhecido' },
        { value: 'resolved', label: 'Resolvido' }
      ],
      onChange: (value: string) => console.log('Status filter changed:', value)
    },
    {
      name: 'priority',
      label: 'Prioridade',
      value: 'all',
      options: [
        { value: 'low', label: 'Baixa' },
        { value: 'medium', label: 'Média' },
        { value: 'high', label: 'Alta' },
        { value: 'critical', label: 'Crítica' }
      ],
      onChange: (value: string) => console.log('Priority filter changed:', value)
    }
  ];

  // Configuração dos filtros para logs
  const logFilterConfigs: FilterConfig[] = [
    {
      name: 'level',
      label: 'Nível',
      value: 'all',
      options: [
        { value: 'debug', label: 'Debug' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Aviso' },
        { value: 'error', label: 'Erro' },
        { value: 'critical', label: 'Crítico' }
      ],
      onChange: (value: string) => console.log('Level filter changed:', value)
    },
    {
      name: 'category',
      label: 'Categoria',
      value: 'all',
      options: [
        { value: 'system', label: 'Sistema' },
        { value: 'user', label: 'Usuário' },
        { value: 'security', label: 'Segurança' },
        { value: 'maintenance', label: 'Manutenção' },
        { value: 'production', label: 'Produção' }
      ],
      onChange: (value: string) => console.log('Category filter changed:', value)
    }
  ];

  const getAlertCardFields = (alert: Alert) => [
    { label: 'Origem', value: alert.source },
    { label: 'Tipo', value: alert.type },
    { label: 'Prioridade', value: alert.priority },
    { label: 'Status', value: alert.status },
    { label: 'Data', value: new Date(alert.createdAt).toLocaleString() }
  ];

  const getLogCardFields = (log: LogEntry) => [
    { label: 'Origem', value: log.source },
    { label: 'Nível', value: log.level },
    { label: 'Categoria', value: log.category },
    { label: 'Usuário', value: log.userName || 'Sistema' },
    { label: 'Data', value: new Date(log.timestamp).toLocaleString() }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <AlertasLogsHeader />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <AlertasLogsTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* Alertas Tab Content */}
          {activeTab === 0 && (
            <AlertasTab
              alertsStats={alertsStats}
              filteredAlerts={filteredAlerts}
              alertSearchTerm={alertSearchTerm}
              onAlertSearchChange={setAlertSearchTerm}
              alertFilterConfigs={alertFilterConfigs}
              onAlertDetails={handleAlertDetails}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onResolveAlert={handleResolveAlert}
            />
          )}

          {/* Logs Tab Content */}
          {activeTab === 1 && (
            <LogsTab
              logsStats={logsStats}
              filteredLogs={filteredLogs}
              logSearchTerm={logSearchTerm}
              onLogSearchChange={setLogSearchTerm}
              logFilterConfigs={logFilterConfigs}
              onLogDetails={handleLogDetails}
            />
          )}
        </div>

        {/* Modals */}
        <DetailModal
          open={alertModal.isOpen}
          onClose={alertModal.closeModal}
          title={selectedAlert?.title || 'Detalhes do Alerta'}
          fields={selectedAlert ? getAlertCardFields(selectedAlert) : []}
        />

        <DetailModal
          open={logModal.isOpen}
          onClose={logModal.closeModal}
          title="Detalhes do Log"
          fields={selectedLog ? getLogCardFields(selectedLog) : []}
        />
      </div>
    </MainLayout>
  );
};

export default AlertasLogsContainer;
