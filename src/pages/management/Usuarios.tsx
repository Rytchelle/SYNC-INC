import React, { useState } from 'react';
import { FaUsers, FaUserShield, FaBuilding } from 'react-icons/fa';
import { MainLayout } from '../../components/layout';
import { StatsCard, FilterSection, DetailModal, FormModal, ItemCard } from '../../components/common';
import { useFilters, useModal, useForm } from '../../hooks';
import { usersData, type User } from '../../shared/userData';

const Usuarios: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const detailModal = useModal();
  const formModal = useModal();

  // Filtros e busca
  const { searchTerm, setSearchTerm, filters, updateFilter, filteredData: filteredUsers } = useFilters({
    data: usersData,
    searchFields: ['name', 'email', 'role', 'department'],
    filterFields: {
      department: (user: User) => user.department,
      role: (user: User) => user.role,
      status: (user: User) => user.status
    }
  });

  // Formulário
  const { values: formData, updateValue, handleSubmit, resetForm, setValues } = useForm({
    initialValues: {} as Partial<User>,
    onSubmit: (values) => {
      console.log('Salvando usuário:', values);
      formModal.closeModal();
      resetForm();
    }
  });

  // Handlers
  const handleCreateUser = () => {
    resetForm();
    setIsEditing(false);
    formModal.openModal();
  };

  const handleEditUser = (user: User) => {
    setValues(user);
    setIsEditing(true);
    formModal.openModal(user);
  };

  const handleViewDetails = (user: User) => {
    detailModal.openModal(user);
  };

  // Dados para estatísticas
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter((user: User) => user.status === "Active").length;
  const adminUsers = usersData.filter((user: User) => user.role === "Administrador").length;
  const departments = [...new Set(usersData.map((user: User) => user.department))];

  // Configuração dos filtros
  const filterConfigs = [
    {
      name: 'department',
      label: 'Departamento',
      value: filters.department || 'all',
      options: departments.map((dept: string) => ({ value: dept, label: dept })),
      onChange: (value: string) => updateFilter('department', value)
    },
    {
      name: 'role',
      label: 'Cargo',
      value: filters.role || 'all',
      options: [
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Gerente', label: 'Gerente' },
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Operador', label: 'Operador' }
      ],
      onChange: (value: string) => updateFilter('role', value)
    },
    {
      name: 'status',
      label: 'Status',
      value: filters.status || 'all',
      options: [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Inativo', label: 'Inativo' }
      ],
      onChange: (value: string) => updateFilter('status', value)
    }
  ];

  // Campos do formulário
  const formFields = [
    {
      name: 'name',
      label: 'Nome Completo',
      type: 'text' as const,
      value: formData.name || '',
      required: true,
      placeholder: 'Digite o nome completo'
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email' as const,
      value: formData.email || '',
      required: true,
      placeholder: 'Digite o e-mail'
    },
    {
      name: 'role',
      label: 'Cargo',
      type: 'select' as const,
      value: formData.role || '',
      required: true,
      options: [
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Gerente', label: 'Gerente' },
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Operador', label: 'Operador' }
      ]
    },
    {
      name: 'department',
      label: 'Departamento',
      type: 'select' as const,
      value: formData.department || '',
      required: true,
      options: departments.map((dept: string) => ({ value: dept, label: dept }))
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      value: formData.status || '',
      required: true,
      options: [
        { value: 'Active', label: 'Ativo' },
        { value: 'Inactive', label: 'Inativo' }
      ]
    }
  ];

  // Campos para exibição de detalhes
  const getDetailFields = (user: User) => [
    { label: 'Nome', value: user.name },
    { label: 'E-mail', value: user.email },
    { label: 'Cargo', value: user.role, type: 'chip' as const, chipColor: '#3b82f6' },
    { label: 'Departamento', value: user.department },
    { label: 'Status', value: user.status, type: 'chip' as const, chipColor: user.status === 'Active' ? '#10b981' : '#ef4444' },
    { label: 'Data de Cadastro', value: user.createdAt },
    { label: 'Último Acesso', value: user.lastLogin }
  ];

  // Campos para cards de usuários
  const getUserCardFields = (user: User) => [
    { label: 'E-mail', value: user.email },
    { label: 'Cargo', value: user.role, type: 'chip' as const, chipColor: '#3b82f6' },
    { label: 'Departamento', value: user.department },
    { label: 'Status', value: user.status, type: 'chip' as const, chipColor: user.status === 'Active' ? '#10b981' : '#ef4444' }
  ];

  // Ações dos cards
  const getCardActions = (user: User) => [
    {
      icon: <FaUsers />,
      label: 'Detalhes',
      onClick: () => handleViewDetails(user),
      color: 'var(--primary)'
    },
    {
      icon: <FaUserShield />,
      label: 'Editar',
      onClick: () => handleEditUser(user),
      color: '#f59e0b'
    }
  ];

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Gestão de Usuários</h1>
          <p className="text-[var(--muted)]">Gerencie usuários, permissões e controle de acesso</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Total de Usuários"
            value={totalUsers}
            icon={<FaUsers />}
            color="#3b82f6"
          />
          <StatsCard
            title="Usuários Ativos"
            value={activeUsers}
            icon={<FaUserShield />}
            color="#10b981"
          />
          <StatsCard
            title="Administradores"
            value={adminUsers}
            icon={<FaUserShield />}
            color="#f59e0b"
          />
          <StatsCard
            title="Departamentos"
            value={departments.length}
            icon={<FaBuilding />}
            color="#8b5cf6"
          />
        </div>

        {/* Filtros */}
        <FilterSection
          title="Filtros e Busca"
          searchValue={searchTerm}
          searchPlaceholder="Buscar por nome, email, cargo ou departamento..."
          onSearchChange={setSearchTerm}
          filters={filterConfigs}
          onCreateNew={handleCreateUser}
          createButtonText="Novo Usuário"
        />

        {/* Lista de Usuários */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <ItemCard
              key={user.id}
              title={user.name}
              subtitle={user.email}
              fields={getUserCardFields(user)}
              actions={getCardActions(user)}
              headerIcon={<FaUsers />}
              headerColor="var(--primary)"
            />
          ))}
        </div>

        {/* Modal de Detalhes */}
        <DetailModal
          open={detailModal.isOpen}
          onClose={detailModal.closeModal}
          title="Detalhes do Usuário"
          fields={detailModal.selectedItem ? getDetailFields(detailModal.selectedItem) : []}
        />

        {/* Modal de Formulário */}
        <FormModal
          open={formModal.isOpen}
          onClose={formModal.closeModal}
          title={isEditing ? 'Editar Usuário' : 'Novo Usuário'}
          fields={formFields}
          onFieldChange={(name: string, value: string) => updateValue(name as keyof User, value)}
          onSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </div>
    </MainLayout>
  );
};

export default Usuarios;
