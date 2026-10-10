import { useState, useMemo, useCallback } from "react";

export interface UseTableOptions<T> {
  data: T[];
  searchFields?: (keyof T)[];
  searchPredicate?: (item: T, query: string) => boolean;
  initialPageSize?: number;
  filterPredicate?: (item: T, appliedFilters: Record<string, string>) => boolean;
}

export function useTable<T extends object>({
  data,
  searchFields,
  searchPredicate,
  initialPageSize = 10,
  filterPredicate,
}: UseTableOptions<T>) {
  // Search state
  const [search, setSearch] = useState("");

  // Filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<Record<string, string>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(appliedFilters).filter((v) => v != null && v.trim() !== "").length;
  }, [appliedFilters]);

  const hasActiveFilters = activeFilterCount > 0;

  // Filter & Search dataset
  const filteredData = useMemo(() => {
    let result = data;

    // 1. Search Query
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((item) => {
        if (searchPredicate) {
          return searchPredicate(item, query);
        }
        if (searchFields && searchFields.length > 0) {
          return searchFields.some((field) => {
            const val = (item as Record<string, unknown>)[field as string];
            return val != null && String(val).toLowerCase().includes(query);
          });
        }
        // Fallback: search across all string / number values
        return Object.values(item as Record<string, unknown>).some((val) => {
          return val != null && String(val).toLowerCase().includes(query);
        });
      });
    }

    // 2. Applied Filters
    if (hasActiveFilters) {
      result = result.filter((item) => {
        if (filterPredicate) {
          return filterPredicate(item, appliedFilters);
        }
        // Default matching
        for (const [key, filterVal] of Object.entries(appliedFilters)) {
          if (!filterVal || filterVal.trim() === "") continue;
          const itemVal = (item as Record<string, unknown>)[key];
          if (itemVal == null) return false;
          if (String(itemVal).toLowerCase() !== filterVal.toLowerCase()) {
            return false;
          }
        }
        return true;
      });
    }

    return result;
  }, [data, search, searchPredicate, searchFields, hasActiveFilters, appliedFilters, filterPredicate]);

  // Paginated slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // Search handler (resets page)
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  // Filter handlers
  const openFilter = useCallback(() => {
    setTempFilters({ ...appliedFilters });
    setIsFilterOpen(true);
  }, [appliedFilters]);

  const closeFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const setFilterField = useCallback((key: string, value: string) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters({ ...tempFilters });
    setCurrentPage(1);
    setIsFilterOpen(false);
  }, [tempFilters]);

  const resetFilters = useCallback(() => {
    setTempFilters({});
    setAppliedFilters({});
    setCurrentPage(1);
  }, []);

  const clearSingleFilter = useCallback((key: string) => {
    setAppliedFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setTempFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setCurrentPage(1);
  }, []);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  return {
    // Search
    search,
    setSearch: handleSearchChange,

    // Filters
    isFilterOpen,
    openFilter,
    closeFilter,
    tempFilters,
    appliedFilters,
    setFilterField,
    applyFilters,
    resetFilters,
    clearSingleFilter,
    hasActiveFilters,
    activeFilterCount,

    // Data
    filteredData,
    paginatedData,
    totalRecords,
    totalPages,

    // Pagination
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
}
