import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Chip
} from '@mui/material';
import { FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  pagination?: boolean;
  sorting?: boolean;
  searchable?: boolean;
  searchFields?: string[];
  rowsPerPageOptions?: number[];
  className?: string;
  onRowClick?: (row: any) => void;
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: (row: any) => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  }>;
}

type Order = 'asc' | 'desc';

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  pagination = true,
  sorting = true,
  searchable = true,
  searchFields = [],
  rowsPerPageOptions = [5, 10, 25, 50],
  className = '',
  onRowClick,
  actions = []
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Função para ordenar dados
  const sortedData = useMemo(() => {
    if (!sorting || !orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, orderBy, order, sorting]);

  // Função para filtrar dados por busca
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return sortedData;

    const searchLower = searchTerm.toLowerCase();
    return sortedData.filter(row => {
      if (searchFields.length > 0) {
        return searchFields.some(field => 
          String(row[field]).toLowerCase().includes(searchLower)
        );
      }
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchLower)
      );
    });
  }, [sortedData, searchTerm, searchable, searchFields]);

  // Dados paginados
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage, pagination]);

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSortIcon = (columnId: string) => {
    if (orderBy !== columnId) return <FaSort />;
    return order === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const renderCellValue = (column: Column, row: any) => {
    const value = row[column.id];
    
    if (column.render) {
      return column.render(value, row);
    }

    if (typeof value === 'boolean') {
      return (
        <Chip
          label={value ? 'Sim' : 'Não'}
          color={value ? 'success' : 'default'}
          size="small"
        />
      );
    }

    if (value === null || value === undefined) {
      return <span className="text-gray-400">-</span>;
    }

    return String(value);
  };

  return (
    <div className={className}>
      {searchable && (
        <Box className="mb-4">
          <TextField
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <FaSearch className="text-[var(--muted)] mr-2" />,
            }}
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
            size="small"
            fullWidth
          />
        </Box>
      )}

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className="text-white font-semibold"
                  style={{ width: column.width }}
                >
                  {sorting && column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                      className="text-white"
                      IconComponent={() => getSortIcon(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell className="text-white font-semibold">
                  Ações
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
              >
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {renderCellValue(column, row)}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <div className="flex gap-2">
                      {actions.map((action, actionIndex) => (
                        <Chip
                          key={actionIndex}
                          label={action.label}
                          icon={action.icon as React.ReactElement}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}
                          color={action.color || 'primary'}
                          size="small"
                          variant="outlined"
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      )}
    </div>
  );
};

export default DataTable; 