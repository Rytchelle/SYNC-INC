import React, { useState } from 'react';
import { MainLayout } from '../../components/layout';
import { configCategories } from '../../shared/configData';
import type { SystemConfig } from '../../shared/configData';
import { 
  Card, CardContent, Button, TextField, FormControl, 
  Select, MenuItem, Switch, FormControlLabel, Tabs, Tab, Box,
  Chip, Alert, Snackbar
} from '@mui/material';
import { 
  FaCog, FaIndustry, FaBell, FaShieldAlt, FaPalette, FaSave, 
  FaUndo, FaDownload, FaUpload, FaCheck, FaExclamationTriangle 
} from 'react-icons/fa';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`config-tabpanel-${index}`}
      aria-labelledby={`config-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Configuracoes: React.FC = () => {
  console.log('Configuracoes component is rendering');
  
  const [activeTab, setActiveTab] = useState(0);
  const [configs, setConfigs] = useState<SystemConfig[]>(() => {
    return configCategories.flatMap(category => category.configs);
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleConfigChange = (configId: string, newValue: any) => {
    setConfigs(prevConfigs => 
      prevConfigs.map(config => 
        config.id === configId 
          ? { ...config, value: newValue }
          : config
      )
    );
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    console.log('Salvando configurações:', configs);
    setHasChanges(false);
    setShowSuccessAlert(true);
  };

  const handleResetChanges = () => {
    // Reset to original values
    const originalConfigs = configCategories.flatMap(category => category.configs);
    setConfigs(originalConfigs);
    setHasChanges(false);
  };

  const handleExportConfig = () => {
    const configData = JSON.stringify(configs, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `configuracoes-sistema-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    console.log('Configurações exportadas com sucesso');
  };

  const handleImportConfig = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedConfigs = JSON.parse(e.target?.result as string);
            if (Array.isArray(importedConfigs)) {
              setConfigs(importedConfigs);
              setHasChanges(true);
              console.log('Configurações importadas com sucesso');
            } else {
              console.error('Formato de arquivo inválido');
            }
          } catch (error) {
            console.error('Erro ao importar configurações:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaCog': return <FaCog />;
      case 'FaIndustry': return <FaIndustry />;
      case 'FaBell': return <FaBell />;
      case 'FaShield': return <FaShieldAlt />;
      case 'FaPalette': return <FaPalette />;
      default: return <FaCog />;
    }
  };

  const renderConfigField = (config: SystemConfig) => {
    const currentConfig = configs.find(c => c.id === config.id) || config;

    switch (config.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            value={currentConfig.value}
            onChange={(e) => handleConfigChange(config.id, e.target.value)}
            size="small"
            required={config.required}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'var(--primary)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--primary)',
                },
              },
            }}
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            value={currentConfig.value}
            onChange={(e) => handleConfigChange(config.id, Number(e.target.value))}
            size="small"
            inputProps={{ min: config.min, max: config.max }}
            required={config.required}
            helperText={config.unit ? `Unidade: ${config.unit}` : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'var(--primary)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--primary)',
                },
              },
            }}
          />
        );

      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={currentConfig.value}
                onChange={(e) => handleConfigChange(config.id, e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'var(--primary)',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--primary)',
                  },
                }}
              />
            }
            label={
              <span className={`font-medium ${currentConfig.value ? 'text-[var(--primary)]' : 'text-[var(--muted)]'}`}>
                {currentConfig.value ? 'Habilitado' : 'Desabilitado'}
              </span>
            }
          />
        );

      case 'select':
        return (
          <FormControl fullWidth size="small">
            <Select
              value={currentConfig.value}
              onChange={(e) => handleConfigChange(config.id, e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)',
                  },
                },
              }}
            >
              {config.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'color':
        return (
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={currentConfig.value}
              onChange={(e) => handleConfigChange(config.id, e.target.value)}
              className="w-12 h-8 rounded-lg border-2 border-gray-300 hover:border-[var(--primary)] cursor-pointer transition-colors"
            />
            <TextField
              value={currentConfig.value}
              onChange={(e) => handleConfigChange(config.id, e.target.value)}
              size="small"
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)',
                  },
                },
              }}
            />
          </div>
        );

      default:
        return (
          <TextField
            fullWidth
            value={currentConfig.value}
            onChange={(e) => handleConfigChange(config.id, e.target.value)}
            size="small"
          />
        );
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Configurações do Sistema</h1>
          <p className="text-[var(--muted)]">Gerencie as configurações globais da plataforma</p>
        </div>

        {/* Action Buttons */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {hasChanges && (
                    <Chip 
                      icon={<FaExclamationTriangle />}
                      label="Alterações não salvas"
                      color="warning"
                      size="small"
                    />
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    startIcon={<FaDownload />}
                    onClick={handleExportConfig}
                    size="small"
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
                    Exportar
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FaUpload />}
                    onClick={handleImportConfig}
                    size="small"
                    sx={{
                      color: '#10b981',
                      borderColor: '#10b981',
                      '&:hover': {
                        backgroundColor: '#10b981',
                        color: 'white',
                        borderColor: '#10b981',
                      },
                    }}
                  >
                    Importar
                  </Button>
                  
                  {hasChanges && (
                    <Button
                      variant="outlined"
                      startIcon={<FaUndo />}
                      onClick={handleResetChanges}
                      size="small"
                      sx={{
                        color: '#f59e0b',
                        borderColor: '#f59e0b',
                        '&:hover': {
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          borderColor: '#f59e0b',
                        },
                      }}
                    >
                      Desfazer
                    </Button>
                  )}
                  
                  <Button
                    variant="contained"
                    startIcon={<FaSave />}
                    onClick={handleSaveChanges}
                    disabled={!hasChanges}
                    sx={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'var(--primary-dark)',
                      },
                    }}
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Tabs */}
          <Card className="shadow-lg">
            <Box sx={{ borderBottom: 1, borderColor: 'var(--primary)/20' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    color: 'var(--muted)',
                    fontWeight: 500,
                    textTransform: 'none',
                    minHeight: '60px',
                    '&.Mui-selected': {
                      color: 'var(--primary)',
                      fontWeight: 600,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'var(--primary)',
                    height: '3px',
                  },
                }}
              >
                {configCategories.map((category, index) => (
                  <Tab
                    key={category.id}
                    label={
                      <div className="flex items-center gap-2 py-2">
                        <div className={`text-lg ${activeTab === index ? 'text-[var(--primary)]' : 'text-[var(--muted)]'}`}>
                          {getIconComponent(category.icon)}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                    }
                    id={`config-tab-${index}`}
                    aria-controls={`config-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>

            {configCategories.map((category, index) => (
              <TabPanel key={category.id} value={activeTab} index={index}>
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">
                      {category.name}
                    </h3>
                    <p className="text-[var(--muted)]">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.configs.map((config) => (
                      <Card 
                        key={config.id} 
                        className="p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-[var(--primary)]/30"
                        sx={{
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #ffffff 0%, var(--accent) 100%)',
                          }
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="space-y-4">
                            <div className="pb-3 border-b border-gray-100">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-[var(--text)] text-base">
                                  {config.name}
                                </h4>
                                {config.required && (
                                  <Chip 
                                    label="Obrigatório" 
                                    size="small" 
                                    sx={{
                                      backgroundColor: '#ef4444',
                                      color: 'white',
                                      fontSize: '0.75rem',
                                      height: '20px'
                                    }}
                                  />
                                )}
                              </div>
                              <p className="text-sm text-[var(--muted)] leading-relaxed">
                                {config.description}
                              </p>
                            </div>
                            
                            <div className="pt-1">
                              {renderConfigField(config)}
                            </div>

                            {(config.min !== undefined || config.max !== undefined) && (
                              <div className="text-xs text-[var(--muted)] bg-gray-50 px-3 py-2 rounded-md">
                                <span className="font-medium">Limites: </span>
                                {config.min !== undefined && `Mín: ${config.min}`}
                                {config.min !== undefined && config.max !== undefined && ' • '}
                                {config.max !== undefined && `Máx: ${config.max}`}
                                {config.unit && ` (${config.unit})`}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabPanel>
            ))}
          </Card>

          {/* System Status */}
          <Card className="mt-6 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
                Status do Sistema
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-700">Configurações</span>
                  <Chip 
                    icon={<FaCheck />}
                    label="Válidas" 
                    sx={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      '& .MuiChip-icon': { color: 'white' }
                    }}
                    size="small" 
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[var(--accent)] to-gray-100 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-[var(--text)]">Última Atualização</span>
                  <span className="text-sm text-[var(--muted)]">
                    {new Date().toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/20 rounded-lg border border-[var(--primary)]/30">
                  <span className="text-sm font-medium text-[var(--primary)]">Versão</span>
                  <span className="text-sm text-[var(--primary)] font-semibold">v1.0.0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Alert */}
          <Snackbar
            open={showSuccessAlert}
            autoHideDuration={3000}
            onClose={() => setShowSuccessAlert(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={() => setShowSuccessAlert(false)} 
              severity="success"
              variant="filled"
            >
              Configurações salvas com sucesso!
            </Alert>
          </Snackbar>
        </div>
    </MainLayout>
  );
};

export default Configuracoes;
