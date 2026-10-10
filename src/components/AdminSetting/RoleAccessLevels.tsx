import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import BackToSetting from "../BackToSetting";
import { DataTable } from "@/common/Datatable";
import { TableSearch } from "@/common/TableSearch";
import { Pagination } from "@/common/Pagination";
import { DeleteConfirmationDialog } from "@/common/DeleteConfirmationDialog";
import CustomPanel from "@/common/CustomPanel";
import TableToolbarActions from "@/common/TableToolbarActions";
import { exportToCsv } from "@/lib/utils";
import { Field, TextField } from "@/components/FormPrimitives";
import { useTable } from "@/hooks/useTable";
import { MOCK_ROLES, type SystemRoleItem } from "@/mocks/adminMaster.mock";

const RoleAccessLevels = () => {
  const [roles, setRoles] = useState<SystemRoleItem[]>(MOCK_ROLES);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const {
    search,
    setSearch,
    paginatedData,
    totalRecords,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    isFilterOpen,
    openFilter,
    closeFilter,
    tempFilters,
    appliedFilters,
    setFilterField,
    applyFilters,
    resetFilters,
    hasActiveFilters,
    clearSingleFilter,
  } = useTable<SystemRoleItem>({
    data: roles,
    searchFields: ["name", "description"],
    initialPageSize: 10,
    filterPredicate: (item, filters) => {
      if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      return true;
    },
  });

  const handleEdit = (id: string) => {
    console.log("Edit role:", id);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      setRoles((prev) => prev.filter((role) => role.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  const handleAddRole = () => {
    console.log("Add new role");
  };

  const columns = useMemo<ColumnDef<SystemRoleItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Existing Roles",
        cell: (info) => (
          <span className="text-sm text-gray-900 font-semibold">
            {String(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => (
          <span className="text-sm text-gray-600">{String(info.getValue())}</span>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const role = row.original;
          return (
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => handleEdit(role.id)}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 text-sm font-medium cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTargetId(role.id)}
                className="text-red-600 hover:text-red-700 flex items-center gap-1.5 text-sm font-medium cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <div>
        {/* Back Button */}
        <BackToSetting />

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                Role List & Access Levels
              </h1>
              <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                {totalRecords} Roles
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TableSearch
                value={search}
                onChange={setSearch}
                placeholder="Search roles..."
                className="w-64"
              />
              <TableToolbarActions
                onOpenFilter={openFilter}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={resetFilters}
                onExport={() => exportToCsv(paginatedData as unknown as Record<string, unknown>[], "system-roles.csv")}
                exportTitle="Export Roles"
                onAdd={handleAddRole}
                addTitle="Add Role"
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
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Reusable DataTable */}
          <DataTable
            columns={columns}
            data={paginatedData}
            headerClassName="border-b border-gray-200 bg-white"
            headCellClassName="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            cellClassName="px-4 py-4"
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
        </div>
      </div>

      {/* Filter Panel (CustomPanel) */}
      <CustomPanel
        isOpen={isFilterOpen}
        title="Filter Roles"
        onClose={closeFilter}
        onSave={applyFilters}
        saveLabel="Apply Filters"
        cancelLabel="Reset"
      >
        <div className="space-y-4">
          <Field label="Role Name">
            <TextField
              value={tempFilters.name || ""}
              onChange={(val) => setFilterField("name", val)}
              placeholder="e.g. Admin, Manager..."
            />
          </Field>
        </div>
      </CustomPanel>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteTargetId !== null}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        title="Delete Role"
        description="Are you sure you want to delete this role? This action cannot be undone."
      />
    </div>
  );
};

export default RoleAccessLevels;