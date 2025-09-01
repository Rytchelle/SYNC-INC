import React, { useState } from "react";
import { employeesData, machinesData } from '../../shared/sharedData';
import type { Employee } from '../../shared/sharedData';
import { Header, PageHeader } from "../../components/layout";
import { Card, CardContent, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { FaUsers, FaPlus, FaEdit, FaEye, FaUserTie, FaBuilding, FaChartLine, FaTrash, FaClock, FaSearch } from 'react-icons/fa';
import CUDModal from '../../components/forms/CUDModal';
import type { FormFieldConfig } from '../../components/forms/CUDModal';

const Funcionarios: React.FC = () => {
  console.log('Funcionarios component is rendering');
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterShift, setFilterShift] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState<Employee | null>(null);

  const handleCardClick = (emp: Employee) => {
    setSelectedEmployee(emp);
    setShowEmployeeModal(true);
  };

  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedEmployeeForEdit(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (employee: Employee) => {
    setFormMode('edit');
    setSelectedEmployeeForEdit(employee);
    setShowFormModal(true);
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      console.log('Deletando funcionário:', selectedEmployee.name);
      setSelectedEmployee(null);
      setShowEmployeeModal(false);
    }
  };

  const handleSubmitEmployee = (data: Record<string, any>) => {
    console.log('Dados do funcionário:', data);
    if (formMode === 'create') {
      console.log('Criando novo funcionário');
    } else {
      console.log('Editando funcionário:', selectedEmployeeForEdit?.name);
    }
    setShowFormModal(false);
  };

  const filteredEmployees = employeesData.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    const matchesShift = filterShift === "all" || emp.shift === filterShift;
    const matchesStatus = filterStatus === "all" || emp.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesShift && matchesStatus;
  });

  const totalEmployees = employeesData.length;
  const activeEmployees = employeesData.filter(emp => emp.status === "Active").length;
  const averagePerformance = Math.round(employeesData.reduce((sum, emp) => sum + emp.performance, 0) / employeesData.length);
  const departments = [...new Set(employeesData.map(emp => emp.department))];
  const shifts = [...new Set(employeesData.map(emp => emp.shift))];
  const statuses = [...new Set(employeesData.map(emp => emp.status))];

  // Configuração dos campos do formulário
  const employeeFields: FormFieldConfig[] = [
    {
      name: 'name',
      label: 'Nome Completo',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome completo'
    },
    {
      name: 'role',
      label: 'Cargo',
      type: 'text',
      required: true,
      placeholder: 'Digite o cargo'
    },
    {
      name: 'department',
      label: 'Departamento',
      type: 'select',
      required: true,
      options: departments.map(dept => ({ value: dept, label: dept }))
    },
    {
      name: 'shift',
      label: 'Turno',
      type: 'select',
      required: true,
      options: shifts.map(shift => ({ value: shift, label: shift }))
    },
    {
      name: 'machineIds',
      label: 'Máquinas Operadas',
      type: 'multiselect',
      required: false,
      options: machinesData.map(machine => ({ value: machine.id, label: machine.name }))
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Leave': return 'warning';
      case 'Medical Leave': return 'warning';
      case 'Absent': return 'error';
      case 'Next Shift': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Active': return 'Ativo';
      case 'On Leave': return 'Em Licença';
      case 'Medical Leave': return 'Licença Médica';
      case 'Absent': return 'Ausente';
      case 'Next Shift': return 'Próximo Turno';
      default: return status;
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10]">
        <div className="w-full max-w-7xl">
          <PageHeader 
            title="Funcionários"
            subtitle="Gestão e acompanhamento da equipe de produção"
          />

          {/* Filtros */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaSearch className="text-[var(--primary)] text-lg" />
                <h2 className="text-lg font-semibold text-[var(--primary)]">Filtros e Busca</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <TextField
                  placeholder="Buscar funcionários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  fullWidth
                />
                
                <FormControl size="small" fullWidth>
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    label="Departamento"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" fullWidth>
                  <InputLabel>Turno</InputLabel>
                  <Select
                    value={filterShift}
                    onChange={(e) => setFilterShift(e.target.value)}
                    label="Turno"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    {shifts.map(shift => (
                      <MenuItem key={shift} value={shift}>{shift}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    {statuses.map(status => (
                      <MenuItem key={status} value={status}>{getStatusText(status)}</MenuItem>
                    ))}
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
                  Novo Funcionário
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total de Funcionários</p>
                    <p className="text-3xl font-bold text-blue-800">{totalEmployees}</p>
                    <p className="text-xs text-blue-600">+3 este mês</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-blue-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Funcionários Ativos</p>
                    <p className="text-3xl font-bold text-green-800">{activeEmployees}</p>
                    <p className="text-xs text-green-600">{Math.round((activeEmployees/totalEmployees)*100)}% da equipe</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaUserTie className="text-green-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Performance Média</p>
                    <p className="text-3xl font-bold text-yellow-800">{averagePerformance}%</p>
                    <p className="text-xs text-yellow-600">+2.1% vs mês anterior</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Departamentos</p>
                    <p className="text-3xl font-bold text-purple-800">{departments.length}</p>
                    <p className="text-xs text-purple-600">Distribuídos</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaBuilding className="text-purple-600 text-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid de Funcionários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <Card 
                key={employee.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleCardClick(employee)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src={employee.photo} 
                        alt={employee.name}
                        sx={{ width: 48, height: 48 }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--text)] mb-1">{employee.name}</h3>
                        <p className="text-sm text-[var(--muted)]">{employee.role}</p>
                      </div>
                    </div>
                    <Chip 
                      label={getStatusText(employee.status)}
                      color={getStatusColor(employee.status) as any}
                      size="small"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <FaBuilding className="text-[var(--primary)]" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <FaClock className="text-[var(--primary)]" />
                      <span>{employee.shift}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <FaChartLine className="text-[var(--primary)]" />
                      <span>{employee.performance}% Performance</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outlined"
                      startIcon={<FaEye />}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(employee);
                      }}
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
                    <Button
                      variant="outlined"
                      startIcon={<FaEdit />}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(employee);
                      }}
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
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal de Detalhes */}
        <Dialog
          open={showEmployeeModal}
          onClose={() => setShowEmployeeModal(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedEmployee && (
            <>
              <DialogTitle className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={selectedEmployee.photo}
                    className="w-10 h-10"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{selectedEmployee.name}</h2>
                    <p className="text-sm opacity-90">{selectedEmployee.role}</p>
                  </div>
                </div>
              </DialogTitle>

              <DialogContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUserTie className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Cargo</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{selectedEmployee.role}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBuilding className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Departamento</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{selectedEmployee.department}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaClock className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Turno</span>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{selectedEmployee.shift}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaChartLine className="text-[var(--primary)]" />
                        <span className="text-sm font-medium text-[var(--text)]">Status</span>
                      </div>
                      <Chip 
                        label={getStatusText(selectedEmployee.status)}
                        color={getStatusColor(selectedEmployee.status) as any}
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Máquinas associadas */}
                    <h4 className="text-lg font-semibold text-[var(--primary)]">Máquinas Operadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const maquinas = machinesData.filter(maq => selectedEmployee.machineIds.includes(maq.id));
                        if (maquinas.length === 0) return <span className="text-sm text-[var(--muted)]">Nenhuma máquina associada.</span>;
                        return maquinas.map(maq => (
                          <Chip key={maq.id} label={maq.name} avatar={<Avatar src={maq.image} />} />
                        ));
                      })()}
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 54}`}
                            strokeDashoffset={`${2 * Math.PI * 54 * (1 - selectedEmployee.performance / 100)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-[var(--primary)]">
                            {selectedEmployee.performance}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[var(--muted)]">Performance Geral</p>
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
                      handleOpenEdit(selectedEmployee);
                      setShowEmployeeModal(false);
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
                    onClick={handleDeleteEmployee}
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

        {/* Modal de Formulário */}
        <CUDModal
          open={showFormModal}
          onClose={() => setShowFormModal(false)}
          mode={formMode}
          title={formMode === 'create' ? 'Novo Funcionário' : 'Editar Funcionário'}
          fields={employeeFields}
          initialData={selectedEmployeeForEdit || {}}
          onSubmit={handleSubmitEmployee}
          entityType="employee"
        />

      </main>
    </div>
  );
};

export default Funcionarios;