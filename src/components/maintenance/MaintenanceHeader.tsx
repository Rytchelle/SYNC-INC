import React from 'react';

const MaintenanceHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Gestão de Manutenção</h1>
      <p className="text-[var(--muted)]">Controle de manutenções preventivas, corretivas e emergenciais</p>
    </div>
  );
};

export default MaintenanceHeader;
