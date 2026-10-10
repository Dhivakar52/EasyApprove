export interface FilterOptionItem {
  label: string;
  value: string;
}

export interface FilterFieldConfig {
  key: string;
  label: string;
  type: "text" | "select" | "date";
  options?: FilterOptionItem[] | string[];
  placeholder?: string;
}

export interface TablePaginationState {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
