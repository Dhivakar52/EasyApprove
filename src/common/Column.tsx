import { useState, useEffect, useRef } from "react";
import type { Table } from "@tanstack/react-table";
import { Settings, Search } from "lucide-react";

interface ColumnToggleProps<TData> {
  table: Table<TData>;
  excludeColumns?: string[];
  label?: string;
}

export default function ColumnToggle<TData>({ 
  table, 
  excludeColumns = ["actions", "select"],
  label = "Show / Hide Columns"
}: ColumnToggleProps<TData>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get all leaf columns (excluding actions)
  const allColumns = table.getAllLeafColumns().filter(
    (col) => !excludeColumns.includes(col.id)
  );

  // Filter columns based on search
  const filteredColumns = allColumns.filter((column) => 
    column.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get visible columns count
  const visibleCount = allColumns.filter((col) => col.getIsVisible()).length;
  const totalCount = allColumns.length;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Format column label
  const getColumnLabel = (id: string) => {
    return id.split(/(?=[A-Z])/).join(" ").replace(/^./, (str) => str.toUpperCase());
  };

  // Handle Show All
  const handleShowAll = () => {
    allColumns.forEach((col) => col.toggleVisibility(true));
  };

  // Handle Hide All
  const handleHideAll = () => {
    allColumns.forEach((col) => col.toggleVisibility(false));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700"
      >
        <Settings size={16} className="text-gray-600" />
        <span>{label}</span>
        <span className="ml-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
          {visibleCount}/{totalCount}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 max-h-[400px] flex flex-col">
          {/* Header with Search and Actions */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Columns
              </span>
              <div className="flex gap-1">
                <button
                  onClick={handleShowAll}
                  className="text-xs text-blue-600 hover:text-blue-800 px-2 py-0.5 hover:bg-blue-50 rounded"
                >
                  All
                </button>
                <button
                  onClick={handleHideAll}
                  className="text-xs text-red-600 hover:text-red-800 px-2 py-0.5 hover:bg-red-50 rounded"
                >
                  None
                </button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                placeholder="Search columns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
              <span>{visibleCount} visible</span>
              <span>•</span>
              <span>{totalCount - visibleCount} hidden</span>
            </div>
          </div>

          {/* Column List */}
          <div className="flex-1 overflow-y-auto space-y-0.5">
            {filteredColumns.length === 0 ? (
              <div className="text-center text-sm text-gray-500 py-4">
                No columns found
              </div>
            ) : (
              filteredColumns.map((column) => {
                const isVisible = column.getIsVisible();
                return (
                  <label
                    key={column.id}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded text-sm cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={column.getToggleVisibilityHandler()}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="flex-1 text-gray-700">
                      {getColumnLabel(column.id)}
                    </span>
                    {!isVisible && (
                      <span className="text-xs text-gray-400">hidden</span>
                    )}
                  </label>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <button
              onClick={() => {
                table.resetColumnVisibility();
                setOpen(false);
              }}
              className="w-full text-xs text-gray-500 hover:text-gray-700 text-center py-1 hover:bg-gray-50 rounded transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}