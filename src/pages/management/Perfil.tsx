import React, { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, CardContent, Avatar, Button, TextField, Switch } from '@mui/material';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaBell, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaCalendar, FaUserTie, FaUsers } from 'react-icons/fa';
import styles from '../../styles/modules/Dashboard.module.css';

const Perfil: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const [userStatus, setUserStatus] = useState('online'); 

  const [userData, setUserData] = useState({
    name: 'Carlos Silva',
    email: 'carlos.silva@empresa.com',
    phone: '+55 (11) 99999-9999',
    position: 'Supervisor de Produção',
    department: 'Produção',
    location: 'São Paulo, SP',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    employeeId: 'EMP-2024-001',
    startDate: '15/03/2020',
    manager: 'Ana Costa',
    team: 'Equipe de Produção A'
  });

  const [editData, setEditData] = useState(userData);

  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handleStatusChange = (newStatus: string) => {
    setUserStatus(newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'var(--success)';
      case 'busy': return 'var(--warning)';
      case 'away': return 'var(--primary)';
      case 'offline': return 'var(--muted)';
      default: return 'var(--success)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Ocupado';
      case 'away': return 'Ausente';
      case 'offline': return 'Offline';
      default: return 'Online';
    }
  };



  const handleLogout = () => {
    console.log('Logout realizado');
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">Meu Perfil</h1>
            <p className="text-[var(--muted)]">Gerencie suas informações pessoais e configurações</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

            <div className="xl:col-span-3 space-y-6">

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[var(--primary)] flex items-center gap-2">
                      <FaUser className="text-[var(--primary)]" />
                      Informações Pessoais
                    </h2>
                    {!isEditing ? (
                      <Button
                        variant="outlined"
                        startIcon={<FaEdit />}
                        onClick={handleEdit}
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
                        Editar
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="contained"
                          startIcon={<FaSave />}
                          onClick={handleSave}
                          sx={{
                            backgroundColor: 'var(--primary)',
                            '&:hover': {
                              backgroundColor: 'var(--primary-dark)',
                            },
                          }}
                        >
                          Salvar
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<FaTimes />}
                          onClick={handleCancel}
                          sx={{
                            color: 'var(--muted)',
                            borderColor: 'var(--muted)',
                            '&:hover': {
                              backgroundColor: 'var(--muted)',
                              color: 'white',
                              borderColor: 'var(--muted)',
                            },
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaUser className="text-[var(--primary)]" />
                          Nome Completo
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        ) : (
                          <p className="text-[var(--text)] font-medium">{userData.name}</p>
                        )}
                      </div>

                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaEnvelope className="text-[var(--primary)]" />
                          Email
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            variant="outlined"
                            size="small"
                            type="email"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        ) : (
                          <p className="text-[var(--text)] font-medium">{userData.email}</p>
                        )}
                      </div>

                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaPhone className="text-[var(--primary)]" />
                          Telefone
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        ) : (
                          <p className="text-[var(--text)] font-medium">{userData.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaUser className="text-[var(--primary)]" />
                          Cargo
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        ) : (
                          <p className="text-[var(--text)] font-medium">{userData.position}</p>
                        )}
                      </div>

                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaBuilding className="text-[var(--primary)]" />
                          Departamento
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        ) : (
                          <p className="text-[var(--text)] font-medium">{userData.department}</p>
                        )}
                      </div>

                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-[var(--primary)]" />
                          Localização
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={editData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                              },
                            }}
                          />
                        ) : (
                          <p className="text-[var(--text)] font-medium">{userData.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[var(--primary)] mb-6 flex items-center gap-2">
                    <FaBuilding className="text-[var(--primary)]" />
                    Informações Profissionais
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaUser className="text-[var(--primary)]" />
                          ID do Funcionário
                        </label>
                        <p className="text-[var(--text)] font-medium">{userData.employeeId}</p>
                      </div>

                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaCalendar className="text-[var(--primary)]" />
                          Data de Admissão
                        </label>
                        <p className="text-[var(--text)] font-medium">{userData.startDate}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaUserTie className="text-[var(--primary)]" />
                          Gerente
                        </label>
                        <p className="text-[var(--text)] font-medium">{userData.manager}</p>
                      </div>

                      <div className="p-4 bg-[var(--accent)] rounded-lg">
                        <label className="block text-sm font-medium text-[var(--muted)] mb-2 flex items-center gap-2">
                          <FaUsers className="text-[var(--primary)]" />
                          Equipe
                        </label>
                        <p className="text-[var(--text)] font-medium">{userData.team}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 xl:col-span-1">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-[var(--accent)] to-white">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar
                      src={userData.avatar}
                      alt={userData.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        margin: '0 auto',
                        border: '4px solid white',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-1">{userData.name}</h3>
                  <p className="text-[var(--muted)] mb-3">{userData.position}</p>
                  
  
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getStatusColor(userStatus) }}
                      ></div>
                      <span className="text-sm font-medium text-[var(--text)]">
                        {getStatusText(userStatus)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      Clique no indicador para alterar
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-[var(--muted)]">
                    <FaBuilding className="text-[var(--primary)]" />
                    <span>{userData.department}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                    <FaUser className="text-[var(--primary)]" />
                    Status
                  </h3>

                  <div className="space-y-3">
                    {['online', 'busy', 'away', 'offline'].map((status) => (
                      <div
                        key={status}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          userStatus === status 
                            ? 'bg-[var(--primary)] text-white' 
                            : 'bg-[var(--accent)] hover:bg-[var(--primary)] hover:text-white'
                        }`}
                        onClick={() => handleStatusChange(status)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ 
                              backgroundColor: userStatus === status ? 'white' : getStatusColor(status)
                            }}
                          ></div>
                          <div>
                            <div className="font-medium">{getStatusText(status)}</div>
                            <div className="text-xs opacity-80">
                              {status === 'online' && 'Disponível para contato'}
                              {status === 'busy' && 'Em reunião ou ocupado'}
                              {status === 'away' && 'Temporariamente ausente'}
                              {status === 'offline' && 'Indisponível'}
                            </div>
                          </div>
                        </div>
                        {userStatus === status && (
                          <div className="text-xs opacity-80">✓ Ativo</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                    <FaBell className="text-[var(--primary)]" />
                    Notificações
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[var(--accent)] rounded-lg">
                      <div>
                        <div className="font-medium text-[var(--text)]">Email</div>
                        <div className="text-sm text-[var(--muted)]">Receber notificações por email</div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'var(--primary)',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'var(--primary)',
                          },
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--accent)] rounded-lg">
                      <div>
                        <div className="font-medium text-[var(--text)]">Push</div>
                        <div className="text-sm text-[var(--muted)]">Notificações no navegador</div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'var(--primary)',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'var(--primary)',
                          },
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--accent)] rounded-lg">
                      <div>
                        <div className="font-medium text-[var(--text)]">SMS</div>
                        <div className="text-sm text-[var(--muted)]">Alertas por mensagem</div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'var(--primary)',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'var(--primary)',
                          },
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-[var(--danger)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaSignOutAlt className="text-white text-lg" />
                    </div>
                    <h4 className="font-semibold text-[var(--text)] mb-1">Sair da Conta</h4>
                    <p className="text-sm text-[var(--muted)]">Encerrar sessão atual</p>
                  </div>
                  <Button
                    variant="outlined"
                    startIcon={<FaSignOutAlt />}
                    onClick={handleLogout}
                    fullWidth
                    sx={{
                      color: 'var(--danger)',
                      borderColor: 'var(--danger)',
                      '&:hover': {
                        backgroundColor: 'var(--danger)',
                        color: 'white',
                        borderColor: 'var(--danger)',
                      },
                    }}
                  >
                    Sair da Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil; 