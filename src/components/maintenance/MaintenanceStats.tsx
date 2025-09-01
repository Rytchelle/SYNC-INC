import React from 'react';
import { Card, CardContent } from '@mui/material';
import { FaTools, FaCheckCircle, FaExclamationTriangle, FaDollarSign } from 'react-icons/fa';

interface MaintenanceStatsProps {
  stats: {
    totalMaintenance: number;
    completed: number;
    overdue: number;
    averageCost: number;
  };
}

const MaintenanceStats: React.FC<MaintenanceStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total de Manutenções</p>
              <p className="text-3xl font-bold text-blue-800">{stats.totalMaintenance}</p>
              <p className="text-xs text-blue-600">Este mês</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaTools className="text-blue-600 text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Concluídas</p>
              <p className="text-3xl font-bold text-green-800">{stats.completed}</p>
              <p className="text-xs text-green-600">
                {Math.round((stats.completed / stats.totalMaintenance) * 100)}% do total
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Atrasadas</p>
              <p className="text-3xl font-bold text-red-800">{stats.overdue}</p>
              <p className="text-xs text-red-600">Requer atenção</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Custo Médio</p>
              <p className="text-3xl font-bold text-purple-800">R$ {stats.averageCost}</p>
              <p className="text-xs text-purple-600">Por manutenção</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaDollarSign className="text-purple-600 text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceStats;
