import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  skeletonRows?: number;
  onRowClick?: (row: TData) => void;
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  headCellClassName?: string;
  rowClassName?: string | ((row: TData, index: number) => string);
  cellClassName?: string;
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  skeletonRows = 5,
  onRowClick,
  containerClassName,
  tableClassName,
  headerClassName = "bg-gray-100",
  headCellClassName,
  rowClassName,
  cellClassName,
  emptyMessage = "No results found.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const renderSkeletonRows = () => {
    return Array.from({ length: skeletonRows }).map((_, index) => (
      <tr key={`skeleton-${index}`} className="border-b border-gray-100">
        {columns.map((_, colIndex) => (
          <td
            key={`skeleton-cell-${index}-${colIndex}`}
            className="px-6 py-4"
          >
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className={cn("overflow-x-auto", containerClassName)}>
      <table className={cn("w-full border-collapse table-auto", tableClassName)}>
        <thead className={headerClassName}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className={cn(
                      "px-6 py-3 text-left text-sm font-semibold text-gray-600",
                      headCellClassName
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-1.5",
                          isSortable && "cursor-pointer select-none hover:text-gray-900"
                        )}
                        onClick={
                          isSortable ? header.column.getToggleSortingHandler() : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSortable && (
                          <span className="shrink-0 text-gray-400">
                            {sortDirection === "asc" ? (
                              <ArrowUp className="h-3.5 w-3.5 text-gray-800" />
                            ) : sortDirection === "desc" ? (
                              <ArrowDown className="h-3.5 w-3.5 text-gray-800" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            renderSkeletonRows()
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, idx) => {
              const customRowClass =
                typeof rowClassName === "function"
                  ? rowClassName(row.original, idx)
                  : rowClassName;

              return (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    onRowClick && "cursor-pointer",
                    customRowClass
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn("px-6 py-3 text-sm text-gray-900", cellClassName)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;