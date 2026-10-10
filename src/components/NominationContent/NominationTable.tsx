import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  X,
  Eye,
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  Plane,
  FolderGit2,
  Calendar,
  Building,
  User,
  History,
} from "lucide-react";
import type Nomination from "@/dataTypes/nomination";
import type { NominationStatus } from "@/dataTypes/nomination";
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
import ProjectReassignModal from "./ProjectReassignModal";
import { nominationService, DEPARTMENTS } from "@/services/nominationService";
import type { UserRole } from "@/dataTypes/roles";

interface TableProps {
  nominations: Nomination[];
  onAdd?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "text-orange-700 bg-orange-100/90 border border-orange-200";
    case "In Review":
    case "Under Review":
      return "text-blue-700 bg-blue-100/90 border border-blue-200";
    case "Approved":
      return "text-emerald-700 bg-emerald-100/90 border border-emerald-200";
    case "Rejected":
      return "text-red-700 bg-red-100/90 border border-red-200";
    default:
      return "text-gray-700 bg-gray-100 border border-gray-200";
  }
};

const statusOptions = ["Pending", "In Review", "Approved", "Rejected"];
const nominationTypeOptions = ["Travel Expenses", "Project"];

const NominationTable = ({ nominations, onAdd }: TableProps) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);

  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [reassignNomination, setReassignNomination] = useState<Nomination | null>(null);

  const currentRole = (localStorage.getItem("userRole") as UserRole) || "user";
  const isAuthorizedApprover =
    currentRole === "manager" ||
    currentRole === "admin" ||
    currentRole === "jury" ||
    currentRole === "presidentUnit";

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
    searchFields: [
      "id",
      "title",
      "department",
      "entity",
      "nominee",
      "assignedEmployee",
      "nominationType",
      "status",
    ],
    initialPageSize: 10,
    filterPredicate: (item, filters) => {
      if (
        filters.department &&
        item.department?.toLowerCase() !== filters.department.toLowerCase() &&
        item.entity?.toLowerCase() !== filters.department.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.nominationType &&
        item.nominationType?.toLowerCase() !== filters.nominationType.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.status &&
        item.status?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
      return true;
    },
  });

  const handleOpenDetails = (nomination: Nomination) => {
    setSelectedNomination(nomination);
    setDetailsModalOpen(true);
  };

  const handleOpenReassign = (nomination: Nomination) => {
    setReassignNomination(nomination);
    setReassignModalOpen(true);
  };

  const handleQuickStatusChange = (
    nomination: Nomination,
    newStatus: NominationStatus
  ) => {
    const reviewer =
      currentRole === "admin"
        ? "Administrator"
        : currentRole === "manager"
        ? "Manager Approver"
        : `${currentRole.toUpperCase()}`;
    nominationService.updateNominationStatus(
      nomination.id,
      newStatus,
      "Quick status update from table action",
      reviewer
    );
  };

  // Define Columns matching Requirement 8:
  // Nomination ID, title, department, nomination type, submitted date, assigned employee, and status
  const columns = useMemo<ColumnDef<Nomination>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Nomination ID",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 font-mono">
                {item.id}
              </span>
              <span className="text-[10px] text-gray-400">
                {item.progress || "Stage 1"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="max-w-[220px]">
              <p
                className="text-xs font-semibold text-gray-900 truncate hover:text-emerald-700 cursor-pointer"
                onClick={() => handleOpenDetails(item)}
                title={item.title}
              >
                {item.title}
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                by {item.nominee}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => {
          const dept = row.original.department || row.original.entity;
          return (
            <div className="flex items-center gap-1.5 text-xs text-gray-800">
              <Building size={13} className="text-gray-400 shrink-0" />
              <span className="truncate max-w-[140px]">{dept}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "nominationType",
        header: "Nomination Type",
        cell: ({ row }) => {
          const type = row.original.nominationType;
          const isProject = type === "Project";
          return (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border ${
                isProject
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-blue-50 text-blue-800 border-blue-200"
              }`}
            >
              {isProject ? (
                <FolderGit2 size={12} className="text-emerald-600" />
              ) : (
                <Plane size={12} className="text-blue-600" />
              )}
              {type || "Project"}
            </span>
          );
        },
      },
      {
        accessorKey: "submittedDate",
        header: "Submitted Date",
        cell: ({ row }) => {
          const date = row.original.submittedDate;
          return (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Calendar size={13} className="text-gray-400" />
              <span>{date || "07/20/2025"}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "assignedEmployee",
        header: "Assigned Employee",
        cell: ({ row }) => {
          const item = row.original;
          const isReassigned =
            item.reassignmentHistory && item.reassignmentHistory.length > 0;
          return (
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-900">
                <User size={13} className="text-gray-400" />
                <span className="font-semibold text-emerald-800 truncate max-w-[150px]">
                  {item.assignedEmployee || item.nominee}
                </span>
              </div>
              {isReassigned && (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 font-medium">
                  <History size={10} /> Reassigned ({item.reassignmentHistory?.length})
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                status
              )}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  status === "Approved"
                    ? "bg-emerald-600"
                    : status === "Rejected"
                    ? "bg-red-600"
                    : status === "In Review" || status === "Under Review"
                    ? "bg-blue-600"
                    : "bg-orange-500"
                }`}
              />
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          const isProject = item.nominationType === "Project";

          const actionList = [
            {
              label: "View Details",
              icon: <Eye className="w-4 h-4 mr-2 text-blue-600" />,
              onClick: () => handleOpenDetails(item),
            },
          ];

          // Project Reassignment action if nomination is project-related
          if (isProject) {
            actionList.push({
              label: "Reassign Employee",
              icon: <UserCheck className="w-4 h-4 mr-2 text-purple-600" />,
              onClick: () => handleOpenReassign(item),
            });
          }

          // Approval workflow quick actions for authorized roles
          if (isAuthorizedApprover) {
            if (item.status !== "Approved") {
              actionList.push({
                label: "Approve",
                icon: <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />,
                onClick: () => handleQuickStatusChange(item, "Approved"),
              });
            }
            if (item.status !== "In Review") {
              actionList.push({
                label: "Mark In Review",
                icon: <Clock className="w-4 h-4 mr-2 text-blue-600" />,
                onClick: () => handleQuickStatusChange(item, "In Review"),
              });
            }
            if (item.status !== "Rejected") {
              actionList.push({
                label: "Reject",
                icon: <XCircle className="w-4 h-4 mr-2 text-red-600" />,
                onClick: () => handleQuickStatusChange(item, "Rejected"),
              });
            }
          }

          return <ActionMenu item={item} actions={actionList} />;
        },
      },
    ],
    [isAuthorizedApprover]
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-xs overflow-hidden">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">
              Showing {paginatedData.length} of {totalRecords} records
            </span>
          </div>

          <div className="flex items-center gap-2">
            <TableSearch
              value={search}
              onChange={setSearch}
              placeholder="Search ID, Title, Dept, Employee..."
              className="w-full sm:w-80"
              inputClassName="py-1.5 text-xs"
            />
            {/* Standardized Toolbar Actions */}
            <TableToolbarActions
              onOpenFilter={openFilter}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={resetFilters}
              onExport={() =>
                exportToCsv(
                  paginatedData as unknown as Record<string, unknown>[],
                  "my-nominations.csv"
                )
              }
              exportTitle="Export Nominations"
              onAdd={onAdd}
              addTitle="Self Nominate"
            />
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-xs text-gray-500 font-medium">Active Filters:</span>
            {Object.entries(appliedFilters).map(([key, val]) => {
              if (!val) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
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
          headerClassName="bg-gray-50/80 border-b border-gray-200"
          headCellClassName="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
          cellClassName="px-4 py-3 border-b border-gray-100"
          rowClassName="hover:bg-slate-50/60 transition-colors"
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
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        nomination={selectedNomination}
        onOpenReassign={(nom) => {
          setDetailsModalOpen(false);
          handleOpenReassign(nom);
        }}
        onStatusUpdated={() => {
          // Re-sync selected nomination
          if (selectedNomination) {
            const updated = nominationService.getNominationById(selectedNomination.id);
            if (updated) setSelectedNomination(updated);
          }
        }}
      />

      {/* Project Reassignment Modal */}
      <ProjectReassignModal
        isOpen={reassignModalOpen}
        onClose={() => setReassignModalOpen(false)}
        nomination={reassignNomination}
        onSuccess={() => {
          setReassignModalOpen(false);
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
          <Field label="Department">
            <SelectField
              placeholder="All Departments"
              value={tempFilters.department ?? ""}
              onChange={(val) => setFilterField("department", val)}
              options={DEPARTMENTS as unknown as string[]}
            />
          </Field>
          <Field label="Nomination Type">
            <SelectField
              placeholder="All Types"
              value={tempFilters.nominationType ?? ""}
              onChange={(val) => setFilterField("nominationType", val)}
              options={nominationTypeOptions}
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
    </>
  );
};

export default NominationTable;