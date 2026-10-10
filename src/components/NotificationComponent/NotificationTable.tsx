import { useState, useMemo, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTable } from "@/common/Datatable";
import { TableSearch } from "@/common/TableSearch";
import { Pagination } from "@/common/Pagination";
import CustomPanel from "@/common/CustomPanel";
import TableToolbarActions from "@/common/TableToolbarActions";
import { exportToCsv } from "@/lib/utils";
import { Field, SelectField } from "@/components/FormPrimitives";
import { useTable } from "@/hooks/useTable";
import type { SystemNotification } from "@/mocks/notifications.mock";

const getTypeColor = (type: string) => {
  switch (type) {
    case "Referral Request":
      return "bg-blue-100 text-blue-700";
    case "New Referral Request":
      return "bg-purple-100 text-purple-700";
    case "Nomination Approval Required":
      return "bg-yellow-100 text-yellow-700";
    case "Nomination Approved":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const typeOptions = [
  "Referral Request",
  "New Referral Request",
  "Nomination Approval Required",
  "Nomination Approved",
];

import { nominationService } from "@/services/nominationService";

const NotificationTable = () => {
  const [notifications, setNotifications] = useState<SystemNotification[]>(() =>
    nominationService.getNotifications()
  );

  useEffect(() => {
    const handleUpdate = () => {
      setNotifications(nominationService.getNotifications());
    };
    window.addEventListener("easyapprove_notifications_updated", handleUpdate);
    return () => {
      window.removeEventListener("easyapprove_notifications_updated", handleUpdate);
    };
  }, []);

  const {
    search,
    setSearch,
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
    paginatedData,
    totalRecords,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  } = useTable<SystemNotification>({
    data: notifications,
    searchFields: ["title", "message", "type"],
    initialPageSize: 10,
    filterPredicate: (item, filters) => {
      if (filters.type && item.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
      return true;
    },
  });

  const columns = useMemo<ColumnDef<SystemNotification>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: (info) => {
          const type = String(info.getValue());
          return (
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                type
              )}`}
            >
              {type}
            </span>
          );
        },
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: (info) => (
          <span className="text-sm text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "time",
        header: "Time",
        cell: (info) => (
          <span className="text-sm text-gray-500 whitespace-nowrap">{String(info.getValue())}</span>
        ),
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden m-6 p-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {totalRecords} Total
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search notification message..."
            className="w-full sm:w-72"
            inputClassName="py-1.5"
          />
          {/* Standardized Toolbar Actions (Filter / Export / Print) */}
          <TableToolbarActions
            onOpenFilter={openFilter}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={resetFilters}
            onExport={() => exportToCsv(paginatedData as unknown as Record<string, unknown>[], "notifications.csv")}
            exportTitle="Export Notifications"
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-xs text-gray-500 font-medium">Filters:</span>
          {Object.entries(appliedFilters).map(([key, val]) => {
            if (!val) return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200"
              >
                <span className="capitalize">{key}:</span>
                <span className="font-semibold">{val}</span>
                <button
                  type="button"
                  onClick={() => clearSingleFilter(key)}
                  className="hover:text-red-500 ml-0.5 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={paginatedData}
        headerClassName="bg-gray-50"
        headCellClassName="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
        cellClassName="px-6 py-4"
        rowClassName="hover:bg-gray-50 transition-colors"
      />

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>

      {/* Shared CustomPanel for Filters */}
      <CustomPanel
        isOpen={isFilterOpen}
        onClose={closeFilter}
        title="Filter Notifications"
        width="400px"
        footer={
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={resetFilters}
              className="px-3.5 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeFilter}
                className="px-3.5 py-2 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Notification Type">
            <SelectField
              placeholder="All Types"
              value={tempFilters.type ?? ""}
              onChange={(val) => setFilterField("type", val)}
              options={typeOptions}
            />
          </Field>
        </div>
      </CustomPanel>
    </div>
  );
};

export default NotificationTable;
