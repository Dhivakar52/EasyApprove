import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { X, Eye } from "lucide-react";
import type Nomination from "../../dataTypes/nomination";
import { Outlet } from "react-router-dom";
import { DataTable } from "@/common/Datatable";
import { TableSearch } from "@/common/TableSearch";
import { Pagination } from "@/common/Pagination";
import { ActionMenu } from "@/common/ActionMenu";
import CustomPanel from "@/common/CustomPanel";
import TableToolbarActions from "@/common/TableToolbarActions";
import { exportToCsv } from "@/lib/utils";
import { Field, SelectField } from "@/components/FormPrimitives";
import { useTable } from "@/hooks/useTable";
import NominationDetailsModal from "./NominationDetailsModal ";

interface TableProps {
  nominations: Nomination[];
  onAdd?: () => void;
}

const mockDetailData = {
  nominationId: "SELF-0851",
  nominee: "Ravi Kumar",
  entity: "SRMAP",
  category: "Business Excellence",
  nominatedBy: "Sathish Kumar",
  submissionDate: "07/20/2025",
  contestType: "Other Nomination",
  status: "Pending",
  managerEmail: "manager@gmail.com",
  referrals: ["sathish28@gmail.com", "kumar12@gmail.com"],
  description: "Implemented auto-scheduling system that improved efficiency by 40%",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-orange-100 text-orange-700";
    case "Approved":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-[#EEFFF3] text-[#16A34A]";
    case "Rejected":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-red-100 text-red-700";
    case "Under Review":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-yellow-100 text-yellow-700";
    default:
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-700";
  }
};

const getProgressColor = (progress: string) => {
  switch (progress) {
    case "Stage 1":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-[#FFF7ED] text-[#C2410C]";
    case "Stage 2":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-yellow-100 text-yellow-700";
    case "Stage 3":
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-green-100 text-green-700";
    default:
      return "text-[14px] font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-700";
  }
};

const statusOptions = ["Pending", "Approved", "Rejected", "Under Review"];
const progressOptions = ["Stage 1", "Stage 2", "Stage 3"];

const NominationTable = ({ nominations, onAdd }: TableProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(mockDetailData);

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
  } = useTable<Nomination>({
    data: nominations,
    searchFields: ["id", "nominee", "entity", "category"],
    initialPageSize: 10,
    filterPredicate: (item, filters) => {
      if (filters.status && item.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      if (filters.progress && item.progress.toLowerCase() !== filters.progress.toLowerCase()) {
        return false;
      }
      return true;
    },
  });

  const handleOpenDetails = (nomination: Nomination) => {
    setSelectedData({
      ...mockDetailData,
      nominationId: nomination.id,
      nominee: nomination.nominee,
      entity: nomination.entity,
      category: nomination.category,
      status: nomination.status,
    });
    setModalOpen(true);
  };

  const columns = useMemo<ColumnDef<Nomination>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Nomination ID",
        cell: (info) => (
          <span className="text-sm font-medium text-gray-900">
            {String(info.getValue())}
          </span>
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
        accessorKey: "category",
        header: "Category",
        cell: (info) => (
          <span className="text-sm text-gray-900">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = String(info.getValue());
          return (
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "progress",
        header: "Progress",
        cell: (info) => {
          const progress = String(info.getValue());
          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${getProgressColor(
                progress
              )}`}
            >
              {progress}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const nomination = row.original;
          return (
            <ActionMenu
              item={nomination}
              actions={[
                {
                  label: "View Details",
                  icon: <Eye className="w-4 h-4 mr-2 text-blue-600" />,
                  onClick: () => handleOpenDetails(nomination),
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
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">
              Total: {totalRecords} records
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TableSearch
              value={search}
              onChange={setSearch}
              placeholder="Search ID, Nominee, Entity..."
              className="w-full sm:w-72"
              inputClassName="py-1.5"
            />
            {/* Standardized Toolbar Actions (Filter / Export / Print + Add) */}
            <TableToolbarActions
              onOpenFilter={openFilter}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={resetFilters}
              onExport={() => exportToCsv(paginatedData as unknown as Record<string, unknown>[], "nominations.csv")}
              exportTitle="Export Nominations"
              onAdd={onAdd}
              addTitle="Add Nomination"
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

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={paginatedData}
          headerClassName="bg-gray-50"
          headCellClassName="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          cellClassName="px-6 py-4"
          rowClassName="hover:bg-gray-50 transition-colors"
        />

        {/* Pagination Toolbar */}
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

      {/* Slide-out details modal */}
      <NominationDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedData}
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
          <Field label="Status">
            <SelectField
              placeholder="All Statuses"
              value={tempFilters.status ?? ""}
              onChange={(val) => setFilterField("status", val)}
              options={statusOptions}
            />
          </Field>
          <Field label="Progress">
            <SelectField
              placeholder="All Progress Stages"
              value={tempFilters.progress ?? ""}
              onChange={(val) => setFilterField("progress", val)}
              options={progressOptions}
            />
          </Field>
        </div>
      </CustomPanel>

      <Outlet />
    </>
  );
};

export default NominationTable;