import React, { useState } from 'react';
import { Header, PageHeader } from '../../components/layout';
import { SummaryCard, FilterCard } from '../../components/cards';
import { Card, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FaChartLine, FaEye, FaFilter, FaIndustry, FaChartBar, FaChartPie, FaCog, FaPrint, FaShare, FaFileExport } from 'react-icons/fa';

type ProductionData = {
  mes: string;
  meta: number;
  realizado: number;
  eficiencia: number;
};

type EfficiencyData = {
  setor: string;
  eficiencia: number;
  producao: number;
  meta: number;
};

type QualityData = {
  categoria: string;
  quantidade: number;
  percentual: number;
};

type MaintenanceData = {
  maquina: string;
  horas: number;
  manutencoes: number;
  status: string;
};

type ReportData = ProductionData | EfficiencyData | QualityData | MaintenanceData;

const Relatorios: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('producao');
  const [dateRange, setDateRange] = useState('7d');
  const [department, setDepartment] = useState('todos');

  const productionData = [
    { mes: 'Jan', meta: 1000, realizado: 950, eficiencia: 95 },
    { mes: 'Fev', meta: 1000, realizado: 1020, eficiencia: 102 },
    { mes: 'Mar', meta: 1000, realizado: 980, eficiencia: 98 },
    { mes: 'Abr', meta: 1000, realizado: 1050, eficiencia: 105 },
    { mes: 'Mai', meta: 1000, realizado: 990, eficiencia: 99 },
    { mes: 'Jun', meta: 1000, realizado: 1030, eficiencia: 103 },
  ];

  const efficiencyByDepartment = [
    { setor: 'Corte', eficiencia: 94, producao: 320, meta: 300 },
    { setor: 'Montagem', eficiencia: 89, producao: 210, meta: 250 },
    { setor: 'Embalagem', eficiencia: 91, producao: 180, meta: 180 },
    { setor: 'Expedição', eficiencia: 96, producao: 140, meta: 140 },
  ];

  const qualityData = [
    { categoria: 'Aprovado', quantidade: 1850, percentual: 92.5 },
    { categoria: 'Reprovado', quantidade: 100, percentual: 5.0 },
    { categoria: 'Em Análise', quantidade: 50, percentual: 2.5 },
  ];

  const maintenanceData = [
    { maquina: 'Prensa 1', horas: 720, manutencoes: 3, status: 'Operacional' },
    { maquina: 'Prensa 2', horas: 680, manutencoes: 5, status: 'Manutenção' },
    { maquina: 'Cortadora', horas: 750, manutencoes: 2, status: 'Operacional' },
    { maquina: 'Empacotadora', horas: 690, manutencoes: 4, status: 'Operacional' },
  ];

  const getReportData = () => {
    switch (selectedReport) {
      case 'producao':
        return productionData;
      case 'eficiencia':
        return efficiencyByDepartment;
      case 'qualidade':
        return qualityData;
      case 'manutencao':
        return maintenanceData;
      default:
        return productionData;
    }
  };

  const getItemDisplayName = (item: ReportData): string => {
    if ('mes' in item) return item.mes;
    if ('setor' in item) return item.setor;
    if ('categoria' in item) return item.categoria;
    if ('maquina' in item) return item.maquina;
    return 'Item';
  };

  const getItemDescription = (item: ReportData): string => {
    if ('meta' in item) return `Meta: ${item.meta}`;
    if ('eficiencia' in item) return `Eficiência: ${item.eficiencia}%`;
    if ('quantidade' in item) return `${item.quantidade} unidades`;
    if ('horas' in item) return `${item.horas}h operação`;
    return '';
  };

  const getItemValue = (item: ReportData): number => {
    if ('realizado' in item) return item.realizado;
    if ('producao' in item) return item.producao;
    if ('percentual' in item) return item.percentual;
    if ('manutencoes' in item) return item.manutencoes;
    return 0;
  };

  const getItemSubValue = (item: ReportData): string => {
    if ('eficiencia' in item) return `${item.eficiencia}%`;
    if ('percentual' in item) return `${item.percentual}%`;
    if ('status' in item) return item.status;
    return 'Unidades';
  };

  const handleExport = (format: string) => {
    console.log(`Exportando relatório em ${format}`);
  };

  const getReportTitle = () => {
    switch (selectedReport) {
      case 'producao': return 'Relatório de Produção';
      case 'eficiencia': return 'Relatório de Eficiência';
      case 'qualidade': return 'Relatório de Qualidade';
      case 'manutencao': return 'Relatório de Manutenção';
      default: return 'Relatório';
    }
  };

  const getReportDescription = () => {
    switch (selectedReport) {
      case 'producao': return 'Análise detalhada da produção mensal e metas atingidas';
      case 'eficiencia': return 'Eficiência por departamento e indicadores de performance';
      case 'qualidade': return 'Controle de qualidade e taxa de aprovação';
      case 'manutencao': return 'Status das máquinas e histórico de manutenções';
      default: return 'Relatório detalhado';
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full px-4 md:px-10 py-8 flex flex-col items-center bg-gradient-to-br from-[var(--bg)] via-[var(--accent)] to-[var(--primary)/10] fade-in">
        <div className="w-full max-w-7xl">
          <PageHeader 
            title="Relatórios"
            subtitle="Análise detalhada de dados e performance"
          />

          <FilterCard title="Filtros e Controles">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'var(--muted)' }}>Tipo de Relatório</InputLabel>
                <Select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  label="Tipo de Relatório"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--primary)',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="producao">Produção</MenuItem>
                  <MenuItem value="eficiencia">Eficiência</MenuItem>
                  <MenuItem value="qualidade">Qualidade</MenuItem>
                  <MenuItem value="manutencao">Manutenção</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel sx={{ color: 'var(--muted)' }}>Período</InputLabel>
                <Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  label="Período"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--primary)',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="7d">Últimos 7 dias</MenuItem>
                  <MenuItem value="30d">Últimos 30 dias</MenuItem>
                  <MenuItem value="90d">Últimos 90 dias</MenuItem>
                  <MenuItem value="1y">Último ano</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel sx={{ color: 'var(--muted)' }}>Departamento</InputLabel>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  label="Departamento"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--primary)',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="corte">Corte</MenuItem>
                  <MenuItem value="montagem">Montagem</MenuItem>
                  <MenuItem value="embalagem">Embalagem</MenuItem>
                  <MenuItem value="expedicao">Expedição</MenuItem>
                </Select>
              </FormControl>

              <div className="flex gap-2">
                <Button
                  variant="contained"
                  startIcon={<FaFilter />}
                  sx={{
                    backgroundColor: 'var(--primary)',
                    '&:hover': {
                      backgroundColor: 'var(--primary-dark)',
                    },
                    boxShadow: '0 2px 8px rgba(243,130,32,0.2)',
                  }}
                  fullWidth
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </FilterCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              title="Produção Total"
              value="2.450"
              icon={<FaIndustry />}
              color="blue"
              trend={{ value: "+5.2% vs mês anterior", direction: "up" }}
            />

            <SummaryCard
              title="Eficiência"
              value="94.2%"
              icon={<FaChartLine />}
              color="green"
              trend={{ value: "+2.1% vs mês anterior", direction: "up" }}
            />

            <SummaryCard
              title="Qualidade"
              value="98.5%"
              icon={<FaChartPie />}
              color="yellow"
              trend={{ value: "+0.8% vs mês anterior", direction: "up" }}
            />

            <SummaryCard
              title="Tempo Ativo"
              value="92.3%"
              icon={<FaCog />}
              color="purple"
              trend={{ value: "-1.2% vs mês anterior", direction: "down" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-[var(--accent)]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FaChartBar className="text-[var(--primary)] text-xl" />
                        <h2 className="text-xl font-semibold text-[var(--primary)]">{getReportTitle()}</h2>
                      </div>
                      <p className="text-sm text-[var(--muted)]">{getReportDescription()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        startIcon={<FaEye />}
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
                        Visualizar
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FaPrint />}
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
                        Imprimir
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<FaShare />}
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
                        Compartilhar
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[var(--accent)] to-white rounded-xl p-8 h-80 flex items-center justify-center border border-gray-100">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaChartBar className="text-white text-3xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-[var(--text)] mb-3">Gráfico de {getReportTitle()}</h3>
                      <p className="text-sm text-[var(--muted)] mb-4">Visualização interativa dos dados</p>
                      <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted)]">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div>
                          <span>Dados Reais</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-[var(--accent)] rounded-full"></div>
                          <span>Projeções</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-[var(--accent)] to-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                    <FaFileExport className="text-[var(--primary)]" />
                    Exportar Relatório
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outlined"
                      startIcon={<FaFileExport />}
                      fullWidth
                      onClick={() => handleExport('pdf')}
                      sx={{
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          borderColor: 'var(--primary)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(243,130,32,0.3)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Exportar PDF
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FaFileExport />}
                      fullWidth
                      onClick={() => handleExport('excel')}
                      sx={{
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          borderColor: 'var(--primary)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(243,130,32,0.3)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Exportar Excel
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<FaFileExport />}
                      fullWidth
                      onClick={() => handleExport('csv')}
                      sx={{
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          borderColor: 'var(--primary)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(243,130,32,0.3)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Exportar CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-[var(--accent)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                    <FaChartLine className="text-[var(--primary)]" />
                    Dados Rápidos
                  </h3>
                  <div className="space-y-4">
                    {getReportData().slice(0, 3).map((item: ReportData, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div>
                          <p className="text-sm font-medium text-[var(--text)]">
                            {getItemDisplayName(item)}
                          </p>
                          <p className="text-xs text-[var(--muted)]">
                            {getItemDescription(item)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[var(--primary)]">
                            {getItemValue(item)}
                          </p>
                          <p className="text-xs text-[var(--muted)]">
                            {getItemSubValue(item)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Relatorios;