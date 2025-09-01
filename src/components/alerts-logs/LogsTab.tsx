import React from 'react';
import { FaClipboardList, FaTimes, FaExclamationTriangle, FaInfoCircle, FaEye } from 'react-icons/fa';
import StatsCard from '../common/StatsCard';
import FilterSection from '../common/FilterSection';
import ItemCard from '../common/ItemCard';
import type { LogEntry } from '../../../shared/alertsLogsData';
import type { LogStats, FilterConfig } from './types';

interface LogsTabProps {
  logsStats: LogStats;
  filteredLogs: LogEntry[];
  logSearchTerm: string;
  onLogSearchChange: (value: string) => void;
  logFilterConfigs: FilterConfig[];
  onLogDetails: (log: LogEntry) => void;
}

const LogsTab: React.FC<LogsTabProps> = ({
  logsStats,
  filteredLogs,
  logSearchTerm,
  onLogSearchChange,
  logFilterConfigs,
  onLogDetails
}) => {
  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <FaTimes className="text-red-500 text-lg" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500 text-lg" />;
      case 'info': return <FaInfoCircle className="text-blue-500 text-lg" />;
      case 'debug': return <FaClipboardList className="text-gray-500 text-lg" />;
      case 'critical': return <FaTimes className="text-red-600 text-lg" />;
      default: return <FaInfoCircle className="text-gray-500 text-lg" />;
    }
  };

  const getLogCardFields = (log: LogEntry) => [
    { label: 'Origem', value: log.source },
    { label: 'Nível', value: log.level },
    { label: 'Categoria', value: log.category },
    { label: 'Usuário', value: log.userName || 'Sistema' },
    { label: 'Data', value: new Date(log.timestamp).toLocaleString() }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total de Logs" 
          value={logsStats.total} 
          icon={<FaClipboardList className="text-blue-600" />} 
          color="blue" 
        />
        <StatsCard 
          title="Logs de Erro" 
          value={logsStats.errors} 
          icon={<FaTimes className="text-red-600" />} 
          color="red" 
        />
        <StatsCard 
          title="Avisos" 
          value={logsStats.warnings} 
          icon={<FaExclamationTriangle className="text-orange-600" />} 
          color="orange" 
        />
        <StatsCard 
          title="Informativos" 
          value={logsStats.info} 
          icon={<FaInfoCircle className="text-green-600" />} 
          color="green" 
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <FilterSection
          title="Filtrar Logs"
          searchValue={logSearchTerm}
          onSearchChange={onLogSearchChange}
          searchPlaceholder="Buscar por mensagem, origem ou usuário..."
          filters={logFilterConfigs}
        />
      </div>

      {/* Logs Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Histórico de Logs ({filteredLogs.length})
          </h3>
          <div className="text-sm text-gray-500">
            {filteredLogs.length === 0 ? 'Nenhum log encontrado' : `${filteredLogs.length} log(s) encontrado(s)`}
          </div>
        </div>
        
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <FaClipboardList className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum log encontrado com os filtros aplicados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLogs.map((log) => (
              <ItemCard
                key={log.id}
                title={log.message}
                subtitle={`${log.source} - ${log.category}`}
                headerIcon={getLogIcon(log.level)}
                fields={getLogCardFields(log)}
                actions={[
                  { 
                    label: 'Ver Detalhes', 
                    onClick: () => onLogDetails(log), 
                    variant: 'outlined' as const, 
                    icon: <FaEye /> 
                  }
                ]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsTab;
