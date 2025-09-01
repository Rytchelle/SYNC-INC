import React, { useState } from 'react';
import { Header, PageHeader } from '../../components/layout';
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import {
  FaUsers, FaChartLine, FaPlus, FaEdit, FaTrash, FaEye,
  FaUserTie, FaUserCog, FaFilter, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt,
  FaBuilding, FaTools, FaIndustry
} from 'react-icons/fa';
import CUDModal from '../../components/forms/CUDModal';
import { 
  departments, 
  departmentFields, 
  sectorFields, 
  getDepartmentIcon 
} from '../../data/departamentosData';
import type { Department } from '../../data/departamentosData';



const Departamentos: React.FC = () => {
  console.log('Departamentos component is rendering');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedDepartmentForEdit, setSelectedDepartmentForEdit] = useState<Department | null>(null);
  const [showSectorModal, setShowSectorModal] = useState(false);



  const handleSubmitDepartment = (data: Record<string, any>) => {
    console.log('Dados do departamento:', data);
    if (formMode === 'create') {
      console.log('Criando novo departamento');
    } else {
      console.log('Editando departamento:', selectedDepartmentForEdit?.name);
    }
    setShowFormModal(false);
  };



  const handleSubmitSector = (data: Record<string, any>) => {
    console.log('Dados do setor:', data);
    console.log('Criando novo setor para o departamento:', selectedDepartment?.name);
    setShowSectorModal(false);
  };

  
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeDepartments = departments.filter(dept => dept.status === 'active').length;
  const maintenanceDepartments = departments.filter(dept => dept.status === 'maintenance').length;
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);



  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedDepartmentForEdit(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (department: Department) => {
    setFormMode('edit');
    setSelectedDepartmentForEdit(department);
    setShowFormModal(true);
  };

  const handleDeleteDepartment = () => {
    if (selectedDepartment) {
      console.log('Deletando departamento:', selectedDepartment.name);
      setSelectedDepartment(null);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10]">
        <div className="w-full max-w-7xl">
          <PageHeader 
            title="Departamentos"
            subtitle="Gestão e monitoramento dos departamentos da empresa"
          />

          {/* Filtros */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaFilter className="text-[var(--primary)] text-lg" />
                <h2 className="text-lg font-semibold text-[var(--primary)]">Filtros e Controles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField
                  placeholder="Buscar departamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  fullWidth
                />
                
                <FormControl size="small" fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="active">Ativos</MenuItem>
                    <MenuItem value="inactive">Inativos</MenuItem>
                    <MenuItem value="maintenance">Em Manutenção</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  startIcon={<FaPlus />}
                  onClick={handleOpenCreate}
                  sx={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'var(--primary-dark)',
                    },
                  }}
                >
                  Novo Departamento
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total de Departamentos</p>
                    <p className="text-3xl font-bold text-blue-800">{departments.length}</p>
                    <p className="text-xs text-blue-600">{activeDepartments} ativos</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaBuilding className="text-blue-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Total de Funcionários</p>
                    <p className="text-3xl font-bold text-green-800">{totalEmployees}</p>
                    <p className="text-xs text-green-600">+12 este mês</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-green-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Orçamento Total</p>
                    <p className="text-3xl font-bold text-yellow-800">R$ {(totalBudget / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-yellow-600">+5.2% vs mês anterior</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaDollarSign className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Em Manutenção</p>
                    <p className="text-3xl font-bold text-red-800">{maintenanceDepartments}</p>
                    <p className="text-xs text-red-600">1 departamento</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTools className="text-red-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <Card key={department.id} className="shadow-lg border-0 bg-gradient-to-br from-white to-[var(--accent)] hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center">
                        <div className="text-white text-xl">
                          {(() => { const Icon = getDepartmentIcon(department.name); return <Icon />; })()}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text)]">{department.name}</h3>
                        <p className="text-sm text-[var(--muted)]">{department.location}</p>
                      </div>
                    </div>
                    <Chip 
                      label={department.status === 'active' ? 'Ativo' : department.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
                      color={department.status === 'active' ? 'success' : department.status === 'maintenance' ? 'warning' : 'error' as any}
                      size="small"
                    />
                  </div>

                  <p className="text-sm text-[var(--text)] mb-4 line-clamp-2">
                    {department.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-[var(--primary)]">{department.employees}</p>
                      <p className="text-xs text-[var(--muted)]">Funcionários</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-[var(--primary)]">{department.sectors.length}</p>
                      <p className="text-xs text-[var(--muted)]">Setores</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outlined"
                      startIcon={<FaEye />}
                      size="small"
                      onClick={() => setSelectedDepartment(department)}
                      sx={{
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        '&:hover': {
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          borderColor: 'var(--primary)',
                        },
                      }}
                      fullWidth
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Dialog
          open={!!selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedDepartment && (
            <>
              <DialogTitle className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="text-white text-lg">
                      {(() => { const Icon = getDepartmentIcon(selectedDepartment.name); return <Icon />; })()}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedDepartment.name}</h2>
                    <p className="text-sm opacity-90">{selectedDepartment.location}</p>
                  </div>
                </div>
              </DialogTitle>

              <DialogContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUserTie className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Gerente</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">João Silva</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaMapMarkerAlt className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Localização</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{selectedDepartment.location}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUsers className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Funcionários</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{selectedDepartment.employees} colaboradores</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaDollarSign className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Orçamento</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">R$ {selectedDepartment.budget.toLocaleString()}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCalendarAlt className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Criado em</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{new Date(selectedDepartment.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  <div>
                    <div className="p-4 bg-[var(--accent)] rounded-lg mb-4">
                      <h4 className="font-semibold text-[var(--text)] mb-2">Descrição</h4>
                      <p className="text-sm text-[var(--text)]">{selectedDepartment.description}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-[var(--primary)]">Setores</h4>
                        <Button
                          variant="outlined"
                          startIcon={<FaPlus />}
                          size="small"
                          onClick={() => setShowSectorModal(true)}
                          sx={{
                            color: 'var(--primary)',
                            borderColor: 'var(--primary)',
                            '&:hover': {
                              backgroundColor: 'var(--primary)',
                              color: 'white',
                              borderColor: 'var(--primary)',
                            },
                          }}
                        >
                          Novo Setor
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {selectedDepartment.sectors.map((sector) => (
                          <div key={sector.id} className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-[var(--text)]">{sector.name}</h5>
                              <Chip label="Ativo" color="success" size="small" />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <FaUserCog className="text-[var(--primary)] text-xs" />
                                  <span className="text-xs text-[var(--muted)]">Funcionários</span>
                                </div>
                                <p className="text-sm font-semibold text-[var(--text)]">{sector.employees}</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <FaChartLine className="text-[var(--primary)] text-xs" />
                                  <span className="text-xs text-[var(--muted)]">Eficiência</span>
                                </div>
                                <p className="text-sm font-semibold text-[var(--text)]">{sector.efficiency}%</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <FaIndustry className="text-[var(--primary)] text-xs" />
                                  <span className="text-xs text-[var(--muted)]">Produção</span>
                                </div>
                                <p className="text-sm font-semibold text-[var(--text)]">{sector.production}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>

              <DialogActions className="p-6">
                <div className="flex gap-2 w-full justify-end">
                  <Button
                    variant="contained"
                    startIcon={<FaEdit />}
                    size="small"
                    onClick={() => {
                      handleOpenEdit(selectedDepartment);
                      setSelectedDepartment(null);
                    }}
                    sx={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'var(--primary-dark)',
                      },
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FaTrash />}
                    size="small"
                    onClick={handleDeleteDepartment}
                    sx={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#b91c1c',
                      },
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </DialogActions>
            </>
          )}
        </Dialog>

        <CUDModal
          open={showFormModal}
          onClose={() => setShowFormModal(false)}
          mode={formMode}
          title={formMode === 'create' ? 'Novo Departamento' : 'Editar Departamento'}
          fields={departmentFields}
          initialData={selectedDepartmentForEdit || {}}
          onSubmit={handleSubmitDepartment}
          entityType="department"
        />

        <CUDModal
          open={showSectorModal}
          onClose={() => setShowSectorModal(false)}
          mode="create"
          title="Novo Setor"
          fields={sectorFields}
          initialData={{}}
          onSubmit={handleSubmitSector}
          entityType="department"
        />
      </main>
    </div>
  );
};

export default Departamentos;
