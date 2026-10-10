import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { X, Eye, Check, XCircle } from "lucide-react";
import { DataTable } from "@/common/Datatable";
import { TableSearch } from "@/common/TableSearch";
import { Pagination } from "@/common/Pagination";
import { ActionMenu } from "@/common/ActionMenu";
import CustomPanel from "@/common/CustomPanel";
import TableToolbarActions from "@/common/TableToolbarActions";
import { exportToCsv } from "@/lib/utils";
import { Field, SelectField } from "@/components/FormPrimitives";
import { useTable } from "@/hooks/useTable";
import { MOCK_APPROVAL_NOMINATIONS, type ApprovalNomination } from "@/mocks/nominations.mock";
import ApprovalPanel from "./ApprovalPanel";

const statusColors: Record<ApprovalNomination["status"], string> = {
  Pending: "bg-orange-100 text-orange-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const entityOptions = [
  "SRMAP",
  "SRM MHS",
  "SRM Tech",
  "PT",
  "SRM Sikkim",
  "SRM Holdings",
  "SRM University",
  "SRM Hospital",
  "SRM Research",
  "SRM Global",
];

const contestOptions = ["Self Nomination", "Nominate Others"];
const statusOptions = ["Pending", "Approved", "Rejected"];

const ApprovalComponent = () => {
  const [nominations] = useState<ApprovalNomination[]>(MOCK_APPROVAL_NOMINATIONS);
  const [selectedNomination, setSelectedNomination] = useState<ApprovalNomination | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
  } = useTable<ApprovalNomination>({
    data: nominations,
    searchFields: ["nominee", "entity", "contest", "id"],
    initialPageSize: 10,
    filterPredicate: (item, filters) => {
      if (filters.entity && item.entity.toLowerCase() !== filters.entity.toLowerCase()) {
        return false;
      }
      if (filters.contest && item.contest.toLowerCase() !== filters.contest.toLowerCase()) {
        return false;
      }
      if (filters.status && item.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      return true;
    },
  });

  const columns = useMemo<ColumnDef<ApprovalNomination>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Nominate ID",
        cell: (info) => (
          <span className="text-sm font-medium text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "nominee",
        header: "Nominee",
        cell: (info) => (
          <span className="text-sm text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "entity",
        header: "Entity",
        cell: (info) => (
          <span className="text-sm text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "contest",
        header: "Contest Type",
        cell: (info) => (
          <span className="text-sm text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Submitted Date",
        cell: (info) => (
          <span className="text-sm text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as ApprovalNomination["status"];
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const nom = row.original;
          return (
            <ActionMenu
              item={nom}
              actions={[
                {
                  label: "View",
                  icon: <Eye className="w-4 h-4 mr-2" />,
                  onClick: () => {
                    setSelectedNomination(nom);
                    setIsDetailOpen(true);
                  },
                },
                {
                  label: "Approve",
                  icon: <Check className="w-4 h-4 mr-2 text-green-600" />,
                  onClick: () => {},
                },
                {
                  label: "Reject",
                  icon: <XCircle className="w-4 h-4 mr-2 text-red-600" />,
                  onClick: () => {},
                  variant: "danger",
                },
              ]}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <div className="p-6 m-5 bg-white rounded-xl shadow-md relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-baseline sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Nominations for Review</h2>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {totalRecords} Records
          </span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search Nominee / ID / Entity..."
            className="w-full sm:w-72"
            inputClassName="py-1.5"
          />
          {/* Standardized Toolbar Actions (Filter / Export / Print) */}
          <TableToolbarActions
            onOpenFilter={openFilter}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={resetFilters}
            onExport={() => exportToCsv(paginatedData as unknown as Record<string, unknown>[], "approval-nominations.csv")}
            exportTitle="Export Nominations"
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
        headerClassName="bg-gray-100"
        headCellClassName="px-6 py-3 text-left text-sm font-semibold text-gray-600"
        cellClassName="px-6 py-3"
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

      {/* Detail Slide Panel */}
      <ApprovalPanel
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        nomination={selectedNomination}
      />

      {/* Shared CustomPanel for Filters */}
      <CustomPanel
        isOpen={isFilterOpen}
        onClose={closeFilter}
        title="Filter Nominations"
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
          <Field label="Entity">
            <SelectField
              placeholder="All Entities"
              value={tempFilters.entity ?? ""}
              onChange={(val) => setFilterField("entity", val)}
              options={entityOptions}
            />
          </Field>
          <Field label="Contest Type">
            <SelectField
              placeholder="All Contest Types"
              value={tempFilters.contest ?? ""}
              onChange={(val) => setFilterField("contest", val)}
              options={contestOptions}
            />
          </Field>
          <Field label="Status">
            <SelectField
              placeholder="All Statuses"
              value={tempFilters.status ?? ""}
              onChange={(val) => setFilterField("status", val)}
              options={statusOptions}
            />
          </Field>
        </div>
      </CustomPanel>
    </div>
  );
};

export default ApprovalComponent;
