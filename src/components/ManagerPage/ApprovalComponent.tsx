import { useState, useMemo, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { X, Eye, Check, XCircle, Clock, CheckCircle2 } from "lucide-react";
import { DataTable } from "@/common/Datatable";
import { TableSearch } from "@/common/TableSearch";
import { Pagination } from "@/common/Pagination";
import { ActionMenu } from "@/common/ActionMenu";
import CustomPanel from "@/common/CustomPanel";
import TableToolbarActions from "@/common/TableToolbarActions";
import { exportToCsv } from "@/lib/utils";
import { Field, SelectField } from "@/components/FormPrimitives";
import { useTable } from "@/hooks/useTable";
import ApprovalPanel, { type ApprovalNominationItem } from "./ApprovalPanel";
import { nominationService, DEPARTMENTS } from "@/services/nominationService";
import type { NominationStatus } from "@/dataTypes/nomination";
import type { UserRole } from "@/dataTypes/roles";

const statusColors: Record<string, string> = {
  Pending: "bg-orange-100 text-orange-800",
  "In Review": "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
};

const contestOptions = ["Project", "Travel Expenses"];
const statusOptions = ["Pending", "In Review", "Approved", "Rejected"];

const ApprovalComponent = () => {
  const mapNominationsToApproval = (): ApprovalNominationItem[] => {
    const list = nominationService.getNominations();
    return list.map((item) => ({
      id: item.id,
      nominee: item.assignedEmployee || item.nominee,
      entity: item.department || item.entity,
      contest: item.nominationType || "Project",
      date: item.submittedDate || "07/20/2025",
      status: item.status,
    }));
  };

  const [nominations, setNominations] = useState<ApprovalNominationItem[]>(
    mapNominationsToApproval
  );
  const [selectedNomination, setSelectedNomination] =
    useState<ApprovalNominationItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setNominations(mapNominationsToApproval());
    };
    window.addEventListener("easyapprove_nominations_updated", handleUpdate);
    return () => {
      window.removeEventListener("easyapprove_nominations_updated", handleUpdate);
    };
  }, []);

  const currentRole = (localStorage.getItem("userRole") as UserRole) || "manager";
  const reviewerName =
    currentRole === "admin"
      ? "Administrator"
      : currentRole === "manager"
      ? "Manager Approver"
      : `${currentRole.toUpperCase()}`;

  const handleQuickStatus = (id: string, status: NominationStatus) => {
    nominationService.updateNominationStatus(
      id,
      status,
      "Quick status update from approvals table",
      reviewerName
    );
  };

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
  } = useTable<ApprovalNominationItem>({
    data: nominations,
    searchFields: ["nominee", "entity", "contest", "id", "status"],
    initialPageSize: 10,
    filterPredicate: (item, filters) => {
      if (
        filters.entity &&
        item.entity.toLowerCase() !== filters.entity.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.contest &&
        item.contest.toLowerCase() !== filters.contest.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.status &&
        item.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
      return true;
    },
  });

  const columns = useMemo<ColumnDef<ApprovalNominationItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Nominate ID",
        cell: (info) => (
          <span className="text-xs font-bold text-gray-900 font-mono">
            {String(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "nominee",
        header: "Assigned Employee",
        cell: (info) => (
          <span className="text-xs font-semibold text-emerald-800">
            {String(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "entity",
        header: "Entity / Department",
        cell: (info) => (
          <span className="text-xs text-gray-800">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "contest",
        header: "Nomination Type",
        cell: (info) => (
          <span className="text-xs text-gray-800">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Submitted Date",
        cell: (info) => (
          <span className="text-xs text-gray-600">{String(info.getValue())}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = String(info.getValue());
          return (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                statusColors[status] || "bg-gray-100 text-gray-800"
              }`}
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
                  label: "Review Details",
                  icon: <Eye className="w-4 h-4 mr-2 text-blue-600" />,
                  onClick: () => {
                    setSelectedNomination(nom);
                    setIsDetailOpen(true);
                  },
                },
                ...(nom.status !== "Approved"
                  ? [
                      {
                        label: "Approve",
                        icon: <Check className="w-4 h-4 mr-2 text-emerald-600" />,
                        onClick: () => handleQuickStatus(nom.id, "Approved"),
                      },
                    ]
                  : []),
                ...(nom.status !== "In Review"
                  ? [
                      {
                        label: "Move to In Review",
                        icon: <Clock className="w-4 h-4 mr-2 text-blue-600" />,
                        onClick: () => handleQuickStatus(nom.id, "In Review"),
                      },
                    ]
                  : []),
                ...(nom.status !== "Rejected"
                  ? [
                      {
                        label: "Reject",
                        icon: <XCircle className="w-4 h-4 mr-2 text-red-600" />,
                        onClick: () => handleQuickStatus(nom.id, "Rejected"),
                        variant: "danger" as const,
                      },
                    ]
                  : []),
              ]}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <div className="p-6 m-5 bg-white rounded-xl shadow-xs border border-gray-100 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-baseline sm:items-center mb-4 gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Nominations for Review
          </h2>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {totalRecords} Submissions
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search Nominee / ID / Entity..."
            className="w-full sm:w-72"
            inputClassName="py-1.5 text-xs"
          />
          <TableToolbarActions
            onOpenFilter={openFilter}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={resetFilters}
            onExport={() =>
              exportToCsv(
                paginatedData as unknown as Record<string, unknown>[],
                "approval-nominations.csv"
              )
            }
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
        headerClassName="bg-gray-50 border-b border-gray-200"
        headCellClassName="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase"
        cellClassName="px-6 py-3 border-b border-gray-100"
        rowClassName="hover:bg-slate-50/60 transition-colors"
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
        onStatusUpdated={() => {
          setNominations(mapNominationsToApproval());
        }}
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
                className="px-4 py-2 text-xs font-semibold text-white btn-theme hover:opacity-90 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Department / Entity">
            <SelectField
              placeholder="All Departments"
              value={tempFilters.entity ?? ""}
              onChange={(val) => setFilterField("entity", val)}
              options={DEPARTMENTS as unknown as string[]}
            />
          </Field>
          <Field label="Nomination Type">
            <SelectField
              placeholder="All Types"
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
