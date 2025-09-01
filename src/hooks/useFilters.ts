import { useState, useMemo } from 'react';

interface FilterState {
  [key: string]: string;
}

interface UseFiltersProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  filterFields: {
    [K in keyof FilterState]: (item: T) => string;
  };
}

export const useFilters = <T>({ data, searchFields, filterFields }: UseFiltersProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({});

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        searchFields.some(field => 
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Other filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === 'all' || value === '') return true;
        const filterFn = filterFields[key];
        return filterFn ? filterFn(item) === value : true;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters, searchFields, filterFields]);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({});
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    resetFilters,
    filteredData
  };
};
