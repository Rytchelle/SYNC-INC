import React from 'react';
import { FaBell } from 'react-icons/fa';

const AlertasLogsHeader: React.FC = () => {
  return (
    <div className="bg-transparent backdrop-blur-md shadow-sm border-b border-gray-200/30 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaBell className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alertas & Logs</h1>
            <p className="text-gray-600 mt-1">Monitoramento em tempo real do sistema e histórico de atividades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertasLogsHeader;
